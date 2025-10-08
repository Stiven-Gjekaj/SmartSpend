from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..core.security import get_current_user
from ..core.config import settings
from ..models.user import User
from ..models.transaction import Transaction
from ..schemas.transaction import (
    TransactionResponse,
    TransactionCreate,
    TransactionUpdate,
    CSVPreviewResponse,
    CSVPreviewRow,
    CSVImportRequest
)
from ..services.parser import CSVParser
from ..services.categorizer import Categorizer

router = APIRouter(prefix="/api/transactions", tags=["transactions"])
categorizer = Categorizer()


@router.post("/upload", response_model=CSVPreviewResponse)
async def upload_csv(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload CSV and preview transactions."""
    # Check file size
    content = await file.read()
    if len(content) > settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large. Max size: {settings.MAX_UPLOAD_SIZE_MB}MB"
        )

    # Parse CSV
    try:
        content_str = content.decode('utf-8')
        preview_data = CSVParser.preview_csv(content_str, max_rows=10)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to parse CSV: {str(e)}"
        )

    # Add suggested categories
    preview_rows = []
    for row in preview_data['preview']:
        suggested_category = categorizer.suggest_category(row['description'])
        preview_rows.append(CSVPreviewRow(
            row_number=row['row_number'],
            date=row['date'],
            description=row['description'],
            amount=row['amount'],
            suggested_category=suggested_category
        ))

    return CSVPreviewResponse(
        total_rows=preview_data['total_rows'],
        preview=preview_rows,
        delimiter=preview_data['delimiter']
    )


@router.post("/import", response_model=dict)
async def import_transactions(
    data: CSVImportRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Import transactions from CSV preview."""
    imported_count = 0

    for txn_data in data.transactions:
        # Suggest category if not provided
        if not txn_data.category:
            txn_data.category = categorizer.suggest_category(txn_data.description)

        # Create transaction
        transaction = Transaction(
            user_id=current_user.id,
            date=txn_data.date,
            description=txn_data.description,
            amount=txn_data.amount,
            category=txn_data.category
        )
        db.add(transaction)
        imported_count += 1

    db.commit()

    return {
        "message": f"Successfully imported {imported_count} transactions",
        "count": imported_count
    }


@router.get("", response_model=List[TransactionResponse])
def get_transactions(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's transactions."""
    transactions = db.query(Transaction).filter(
        Transaction.user_id == current_user.id
    ).order_by(Transaction.date.desc()).offset(skip).limit(limit).all()

    return transactions


@router.patch("/{transaction_id}", response_model=TransactionResponse)
def update_transaction(
    transaction_id: int,
    update_data: TransactionUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update transaction."""
    transaction = db.query(Transaction).filter(
        Transaction.id == transaction_id,
        Transaction.user_id == current_user.id
    ).first()

    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )

    # Update fields
    if update_data.category is not None:
        transaction.category = update_data.category
    if update_data.description is not None:
        transaction.description = update_data.description
    if update_data.amount is not None:
        transaction.amount = update_data.amount

    db.commit()
    db.refresh(transaction)

    return transaction
