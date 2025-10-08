from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False)
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="transactions")
    receipt = relationship("Receipt", back_populates="transaction", uselist=False)


class Receipt(Base):
    __tablename__ = "receipts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    transaction_id = Column(Integer, ForeignKey("transactions.id"), nullable=True)
    file_path = Column(String, nullable=True)
    vendor = Column(String)
    date = Column(Date)
    total = Column(Float)
    confidence = Column(Float)
    is_manual = Column(Boolean, default=False)
    raw_ocr_text = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="receipts")
    transaction = relationship("Transaction", back_populates="receipt")
    line_items = relationship("ReceiptLineItem", back_populates="receipt", cascade="all, delete-orphan")


class ReceiptLineItem(Base):
    __tablename__ = "receipt_line_items"

    id = Column(Integer, primary_key=True, index=True)
    receipt_id = Column(Integer, ForeignKey("receipts.id"), nullable=False)
    description = Column(String)
    quantity = Column(Float)
    price = Column(Float)
    confidence = Column(Float)

    receipt = relationship("Receipt", back_populates="line_items")


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    period = Column(String, default="monthly")  # monthly, weekly, yearly
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="budgets")
