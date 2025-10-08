from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.database import engine, Base
from .api import auth, transactions, receipts, dashboard, budgets, ml

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SmartSpend API",
    version="1.0.0",
    description="Smart Expense Tracker with Receipt OCR"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(transactions.router)
app.include_router(receipts.router)
app.include_router(dashboard.router)
app.include_router(budgets.router)
app.include_router(ml.router)


@app.get("/")
def root():
    return {
        "message": "SmartSpend API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
