from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from ..core.database import get_db
from ..core.security import get_current_user
from ..models.user import User
from ..models.transaction import Transaction, Budget
from ..schemas.transaction import DashboardSummary, TransactionResponse

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/summary", response_model=DashboardSummary)
def get_dashboard_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get dashboard summary with stats and breakdowns."""
    # Get all user transactions
    transactions = db.query(Transaction).filter(
        Transaction.user_id == current_user.id
    ).all()

    # Calculate totals
    total_spent = sum(t.amount for t in transactions if t.amount < 0)
    total_income = sum(t.amount for t in transactions if t.amount > 0)

    # Category breakdown
    category_breakdown = {}
    for txn in transactions:
        if txn.amount < 0:  # Only expenses
            category = txn.category or 'Other'
            category_breakdown[category] = category_breakdown.get(category, 0) + abs(txn.amount)

    # Recent transactions (last 10)
    recent = db.query(Transaction).filter(
        Transaction.user_id == current_user.id
    ).order_by(Transaction.date.desc()).limit(10).all()

    recent_transactions = [TransactionResponse.from_orm(t) for t in recent]

    # Calculate balance for different periods
    now = datetime.now()
    balance_periods = []

    # Daily balance (today)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0).date()
    daily_txns = [t for t in transactions if t.date >= today_start]
    daily_income = sum(t.amount for t in daily_txns if t.amount > 0)
    daily_expenses = sum(t.amount for t in daily_txns if t.amount < 0)
    balance_periods.append({
        'period': 'daily',
        'income': daily_income,
        'expenses': abs(daily_expenses),
        'balance': daily_income + daily_expenses
    })

    # Weekly balance (this week)
    week_start = (now - timedelta(days=now.weekday())).replace(hour=0, minute=0, second=0, microsecond=0).date()
    weekly_txns = [t for t in transactions if t.date >= week_start]
    weekly_income = sum(t.amount for t in weekly_txns if t.amount > 0)
    weekly_expenses = sum(t.amount for t in weekly_txns if t.amount < 0)
    balance_periods.append({
        'period': 'weekly',
        'income': weekly_income,
        'expenses': abs(weekly_expenses),
        'balance': weekly_income + weekly_expenses
    })

    # Monthly balance (this month)
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0).date()
    monthly_txns = [t for t in transactions if t.date >= month_start]
    monthly_income = sum(t.amount for t in monthly_txns if t.amount > 0)
    monthly_expenses = sum(t.amount for t in monthly_txns if t.amount < 0)
    balance_periods.append({
        'period': 'monthly',
        'income': monthly_income,
        'expenses': abs(monthly_expenses),
        'balance': monthly_income + monthly_expenses
    })

    # Budget status
    budgets = db.query(Budget).filter(Budget.user_id == current_user.id).all()

    budget_status = []
    for budget in budgets:
        # Calculate spending in current period (includes all spending from period start)
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
        percentage = (spent / budget.amount * 100) if budget.amount > 0 else 0

        budget_status.append({
            'category': budget.category,
            'budget': budget.amount,
            'spent': spent,
            'remaining': max(0, budget.amount - spent),
            'percentage': round(percentage, 1),
            'period': budget.period
        })

    return DashboardSummary(
        total_transactions=len(transactions),
        total_spent=abs(total_spent),
        total_income=total_income,
        category_breakdown=category_breakdown,
        recent_transactions=recent_transactions,
        budget_status=budget_status,
        balance_periods=balance_periods
    )
