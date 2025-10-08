from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..core.security import get_current_user
from ..models.user import User
from ..models.transaction import Budget
from ..schemas.transaction import BudgetCreate, BudgetResponse

router = APIRouter(prefix="/api/budgets", tags=["budgets"])


@router.post("", response_model=BudgetResponse)
def create_budget(
    budget_data: BudgetCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new budget."""
    # Check if budget already exists for this category
    existing = db.query(Budget).filter(
        Budget.user_id == current_user.id,
        Budget.category == budget_data.category,
        Budget.period == budget_data.period
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Budget for {budget_data.category} ({budget_data.period}) already exists"
        )

    # Create budget
    budget = Budget(
        user_id=current_user.id,
        category=budget_data.category,
        amount=budget_data.amount,
        period=budget_data.period
    )
    db.add(budget)
    db.commit()
    db.refresh(budget)

    return budget


@router.get("", response_model=List[BudgetResponse])
def get_budgets(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's budgets with spending information."""
    from sqlalchemy import func
    from datetime import datetime, timedelta
    from ..models.transaction import Transaction

    budgets = db.query(Budget).filter(Budget.user_id == current_user.id).all()

    # Calculate spending for each budget
    budget_responses = []
    for budget in budgets:
        # Calculate spending in current period
        if budget.period == 'monthly':
            start_date = datetime.now().replace(day=1).date()
        elif budget.period == 'weekly':
            start_date = (datetime.now() - timedelta(days=datetime.now().weekday())).date()
        else:  # yearly
            start_date = datetime.now().replace(month=1, day=1).date()

        spent = db.query(func.sum(Transaction.amount)).filter(
            Transaction.user_id == current_user.id,
            Transaction.category == budget.category,
            Transaction.date >= start_date,
            Transaction.amount < 0
        ).scalar() or 0

        spent = abs(spent)
        remaining = max(0, budget.amount - spent)
        percentage = (spent / budget.amount * 100) if budget.amount > 0 else 0

        budget_response = BudgetResponse(
            id=budget.id,
            category=budget.category,
            amount=budget.amount,
            period=budget.period,
            spent=spent,
            remaining=remaining,
            percentage=round(percentage, 1),
            created_at=budget.created_at
        )
        budget_responses.append(budget_response)

    return budget_responses


@router.delete("/{budget_id}")
def delete_budget(
    budget_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a budget."""
    budget = db.query(Budget).filter(
        Budget.id == budget_id,
        Budget.user_id == current_user.id
    ).first()

    if not budget:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Budget not found"
        )

    db.delete(budget)
    db.commit()

    return {"message": "Budget deleted"}
