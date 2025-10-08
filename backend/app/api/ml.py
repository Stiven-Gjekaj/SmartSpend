from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..core.security import get_current_user
from ..models.user import User
from ..models.transaction import Transaction
from ..services.categorizer import Categorizer
from pydantic import BaseModel

router = APIRouter(prefix="/api/ml", tags=["ml"])
categorizer = Categorizer()


class PredictRequest(BaseModel):
    description: str


class PredictResponse(BaseModel):
    category: str


@router.post("/train")
def train_model(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Train ML model on user's categorized transactions."""
    # Get all categorized transactions
    transactions = db.query(Transaction).filter(
        Transaction.user_id == current_user.id,
        Transaction.category.isnot(None)
    ).all()

    if len(transactions) < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Need at least 10 categorized transactions to train model"
        )

    descriptions = [t.description for t in transactions]
    categories = [t.category for t in transactions]

    try:
        categorizer.train_model(descriptions, categories)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to train model: {str(e)}"
        )

    return {
        "message": "Model trained successfully",
        "transactions_used": len(transactions)
    }


@router.post("/predict", response_model=PredictResponse)
def predict_category(data: PredictRequest):
    """Predict category for a transaction description."""
    category = categorizer.categorize(data.description)
    return PredictResponse(category=category)
