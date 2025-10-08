from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from typing import List
import os
import uuid
from datetime import datetime
from ..core.database import get_db
from ..core.security import get_current_user
from ..core.config import settings
from ..models.user import User
from ..models.transaction import Receipt, ReceiptLineItem, Transaction
from ..schemas.transaction import (
    ReceiptOCRResponse,
    ReceiptVerifyRequest,
    ReceiptVerifyResponse,
    ReceiptImportRequest,
    ReceiptResponse,
    ManualReceiptCreate,
    TransactionResponse,
    ReceiptLineItemBase
)
from ..services.ocr import OCRService
from ..services.matcher import TransactionMatcher
from ..services.categorizer import Categorizer

router = APIRouter(prefix="/api/receipts", tags=["receipts"])
ocr_service = OCRService()
categorizer = Categorizer()


@router.post("/upload", response_model=ReceiptOCRResponse)
async def upload_receipt(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload receipt image, perform OCR, and return structured data."""
    # Validate file type
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.pdf']
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type. Allowed: {', '.join(allowed_extensions)}"
        )

    # Check file size
    content = await file.read()
    if len(content) > settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large. Max size: {settings.MAX_UPLOAD_SIZE_MB}MB"
        )

    # Save file
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    file_id = str(uuid.uuid4())
    file_path = os.path.join(settings.UPLOAD_DIR, f"{file_id}{file_ext}")

    with open(file_path, 'wb') as f:
        f.write(content)

    # Process OCR
    try:
        ocr_result = ocr_service.process_receipt(file_path)
    except Exception as e:
        # Clean up file on error
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"OCR processing failed: {str(e)}"
        )

    # Find matching transactions
    suggested_matches = []
    if ocr_result['total'] and ocr_result['date']:
        matches = TransactionMatcher.find_matching_transactions(
            db=db,
            user_id=current_user.id,
            amount=ocr_result['total'],
            transaction_date=ocr_result['date'].date(),
        )
        suggested_matches = [TransactionResponse.from_orm(m) for m in matches[:5]]

    # Build response
    line_items = [
        ReceiptLineItemBase(
            description=item['description'],
            quantity=item['quantity'],
            price=item['price'],
            confidence=item['confidence']
        )
        for item in ocr_result['line_items']
    ]

    return ReceiptOCRResponse(
        vendor=ocr_result['vendor'],
        date=ocr_result['date'].date() if ocr_result['date'] else None,
        total=ocr_result['total'],
        line_items=line_items,
        confidence=ocr_result['confidence'],
        raw_text=ocr_result['raw_text'],
        suggested_matches=suggested_matches
    )


@router.post("/verify", response_model=ReceiptVerifyResponse)
def verify_receipt(
    data: ReceiptVerifyRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Verify/edit OCR results and get categorization + match suggestions."""
    # Suggest category based on vendor
    suggested_category = None
    if data.vendor:
        suggested_category = categorizer.suggest_category(data.vendor)

    # Find matching transactions
    suggested_matches = []
    if data.total and data.date:
        matches = TransactionMatcher.find_matching_transactions(
            db=db,
            user_id=current_user.id,
            amount=data.total,
            transaction_date=data.date,
        )
        suggested_matches = [TransactionResponse.from_orm(m) for m in matches[:5]]

    return ReceiptVerifyResponse(
        vendor=data.vendor,
        date=data.date,
        total=data.total,
        line_items=data.line_items,
        suggested_category=suggested_category,
        suggested_matches=suggested_matches
    )


@router.post("/import", response_model=ReceiptResponse)
def import_receipt(
    data: ReceiptImportRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Import verified receipt as transaction or attach to existing."""
    # If attaching to existing transaction
    if data.attach_to_transaction_id:
        transaction = db.query(Transaction).filter(
            Transaction.id == data.attach_to_transaction_id,
            Transaction.user_id == current_user.id
        ).first()

        if not transaction:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Transaction not found"
            )

        # Create receipt linked to transaction
        receipt = Receipt(
            user_id=current_user.id,
            transaction_id=transaction.id,
            file_path=data.file_path,
            vendor=data.vendor,
            date=data.date,
            total=data.total,
            confidence=1.0,  # User verified
            is_manual=False
        )
    else:
        # Create new transaction from receipt
        category = categorizer.suggest_category(data.vendor) if data.vendor else 'Other'
        transaction = Transaction(
            user_id=current_user.id,
            date=data.date,
            description=data.vendor or "Receipt",
            amount=data.total,
            category=category
        )
        db.add(transaction)
        db.flush()

        # Create receipt
        receipt = Receipt(
            user_id=current_user.id,
            transaction_id=transaction.id,
            file_path=data.file_path,
            vendor=data.vendor,
            date=data.date,
            total=data.total,
            confidence=1.0,
            is_manual=False
        )

    db.add(receipt)
    db.flush()

    # Add line items
    for item_data in data.line_items:
        line_item = ReceiptLineItem(
            receipt_id=receipt.id,
            description=item_data.description,
            quantity=item_data.quantity,
            price=item_data.price,
            confidence=item_data.confidence or 1.0
        )
        db.add(line_item)

    db.commit()
    db.refresh(receipt)

    return receipt


@router.post("/manual", response_model=ReceiptVerifyResponse)
def manual_receipt_entry(
    data: ManualReceiptCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Manual receipt entry - returns same preview as OCR verification."""
    # Suggest category
    suggested_category = categorizer.suggest_category(data.vendor)

    # Find matching transactions
    matches = TransactionMatcher.find_matching_transactions(
        db=db,
        user_id=current_user.id,
        amount=data.total,
        transaction_date=data.date,
    )
    suggested_matches = [TransactionResponse.from_orm(m) for m in matches[:5]]

    return ReceiptVerifyResponse(
        vendor=data.vendor,
        date=data.date,
        total=data.total,
        line_items=data.line_items,
        suggested_category=suggested_category,
        suggested_matches=suggested_matches
    )


@router.get("", response_model=List[ReceiptResponse])
def get_receipts(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's receipts."""
    receipts = db.query(Receipt).filter(
        Receipt.user_id == current_user.id
    ).order_by(Receipt.created_at.desc()).all()

    return receipts
