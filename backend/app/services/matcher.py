from datetime import date, timedelta
from typing import List
from sqlalchemy.orm import Session
from ..models.transaction import Transaction


class TransactionMatcher:
    """Fuzzy matching service for receipts to transactions."""

    @staticmethod
    def find_matching_transactions(
        db: Session,
        user_id: int,
        amount: float,
        transaction_date: date,
        amount_tolerance: float = 0.05,
        date_tolerance_days: int = 3
    ) -> List[Transaction]:
        """
        Find transactions that match receipt by amount and date.

        Args:
            db: Database session
            user_id: User ID
            amount: Receipt total
            transaction_date: Receipt date
            amount_tolerance: Amount tolerance (default ±5%)
            date_tolerance_days: Date tolerance in days (default ±3 days)

        Returns:
            List of matching transactions, ranked by similarity
        """
        # Calculate amount range
        amount_min = amount * (1 - amount_tolerance)
        amount_max = amount * (1 + amount_tolerance)

        # Calculate date range
        date_min = transaction_date - timedelta(days=date_tolerance_days)
        date_max = transaction_date + timedelta(days=date_tolerance_days)

        # Query matching transactions
        matches = db.query(Transaction).filter(
            Transaction.user_id == user_id,
            Transaction.amount >= amount_min,
            Transaction.amount <= amount_max,
            Transaction.date >= date_min,
            Transaction.date <= date_max
        ).all()

        # Sort by similarity (closer amount and date = better match)
        def similarity_score(txn: Transaction) -> float:
            # Amount similarity (0-1, 1 is exact match)
            amount_diff = abs(txn.amount - amount) / amount if amount != 0 else 0
            amount_score = max(0, 1 - amount_diff)

            # Date similarity (0-1, 1 is exact match)
            date_diff = abs((txn.date - transaction_date).days)
            date_score = max(0, 1 - (date_diff / date_tolerance_days))

            # Combined score
            return (amount_score * 0.6) + (date_score * 0.4)

        matches.sort(key=similarity_score, reverse=True)

        return matches
