from pydantic import BaseModel
from datetime import date, datetime
from typing import List, Optional


class TransactionBase(BaseModel):
    date: date
    description: str
    amount: float
    category: Optional[str] = None


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    category: Optional[str] = None
    description: Optional[str] = None
    amount: Optional[float] = None


class TransactionResponse(TransactionBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CSVPreviewRow(BaseModel):
    row_number: int
    date: str
    description: str
    amount: str
    suggested_category: Optional[str] = None


class CSVPreviewResponse(BaseModel):
    total_rows: int
    preview: List[CSVPreviewRow]
    delimiter: str


class CSVImportRequest(BaseModel):
    transactions: List[TransactionCreate]


class ReceiptLineItemBase(BaseModel):
    description: str
    quantity: float = 1.0
    price: float
    confidence: Optional[float] = None


class ReceiptLineItemResponse(ReceiptLineItemBase):
    id: int

    class Config:
        from_attributes = True


class ReceiptOCRResponse(BaseModel):
    vendor: Optional[str] = None
    date: Optional[date] = None
    total: Optional[float] = None
    line_items: List[ReceiptLineItemBase] = []
    confidence: float
    raw_text: str
    suggested_matches: List[TransactionResponse] = []


class ReceiptVerifyRequest(BaseModel):
    vendor: Optional[str] = None
    date: Optional[date] = None
    total: Optional[float] = None
    line_items: List[ReceiptLineItemBase] = []


class ReceiptVerifyResponse(BaseModel):
    vendor: Optional[str]
    date: Optional[date]
    total: Optional[float]
    line_items: List[ReceiptLineItemBase]
    suggested_category: Optional[str]
    suggested_matches: List[TransactionResponse]


class ReceiptImportRequest(BaseModel):
    vendor: Optional[str]
    date: date
    total: float
    line_items: List[ReceiptLineItemBase] = []
    attach_to_transaction_id: Optional[int] = None
    file_path: Optional[str] = None


class ReceiptResponse(BaseModel):
    id: int
    user_id: int
    transaction_id: Optional[int]
    vendor: Optional[str]
    date: Optional[date]
    total: Optional[float]
    confidence: Optional[float]
    is_manual: bool
    line_items: List[ReceiptLineItemResponse]
    created_at: datetime

    class Config:
        from_attributes = True


class ManualReceiptCreate(BaseModel):
    vendor: str
    date: date
    total: float
    line_items: List[ReceiptLineItemBase] = []


class BudgetCreate(BaseModel):
    category: str
    amount: float
    period: str = "monthly"


class BudgetResponse(BaseModel):
    id: int
    category: str
    amount: float
    period: str
    spent: float = 0.0
    remaining: float = 0.0
    percentage: float = 0.0
    created_at: datetime

    class Config:
        from_attributes = True


class BalancePeriod(BaseModel):
    period: str
    income: float
    expenses: float
    balance: float


class DashboardSummary(BaseModel):
    total_transactions: int
    total_spent: float
    total_income: float
    category_breakdown: dict
    recent_transactions: List[TransactionResponse]
    budget_status: List[dict]
    balance_periods: List[BalancePeriod]
