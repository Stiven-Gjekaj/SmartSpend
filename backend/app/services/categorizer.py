import pickle
import os
from typing import Optional, List
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline


class Categorizer:
    """Rule-based + ML categorization for transactions."""

    # Rule-based keyword mappings
    CATEGORY_KEYWORDS = {
        'Groceries': ['grocery', 'supermarket', 'whole foods', 'trader joe', 'safeway', 'kroger', 'walmart', 'target'],
        'Dining': ['restaurant', 'cafe', 'coffee', 'starbucks', 'mcdonald', 'pizza', 'burger', 'taco'],
        'Transportation': ['uber', 'lyft', 'gas', 'fuel', 'parking', 'transit', 'subway', 'train', 'metro'],
        'Utilities': ['electric', 'water', 'gas bill', 'internet', 'phone', 'cable', 'utility'],
        'Entertainment': ['netflix', 'spotify', 'hulu', 'cinema', 'movie', 'theater', 'game', 'steam'],
        'Shopping': ['amazon', 'ebay', 'shop', 'store', 'mall', 'clothing', 'apparel'],
        'Healthcare': ['pharmacy', 'doctor', 'hospital', 'medical', 'clinic', 'cvs', 'walgreens'],
        'Income': ['salary', 'paycheck', 'deposit', 'payment received', 'transfer in'],
        'Other': []
    }

    def __init__(self, model_path: str = '/app/uploads/ml_model.pkl'):
        self.model_path = model_path
        self.model: Optional[Pipeline] = None
        self._load_model()

    def _load_model(self):
        """Load trained ML model if exists."""
        if os.path.exists(self.model_path):
            try:
                with open(self.model_path, 'rb') as f:
                    self.model = pickle.load(f)
            except Exception:
                self.model = None
        else:
            self.model = None

    def categorize_by_rules(self, description: str) -> Optional[str]:
        """Categorize using keyword rules."""
        description_lower = description.lower()

        for category, keywords in self.CATEGORY_KEYWORDS.items():
            for keyword in keywords:
                if keyword in description_lower:
                    return category

        return None

    def categorize_by_ml(self, description: str) -> Optional[str]:
        """Categorize using ML model."""
        if self.model is None:
            return None

        try:
            prediction = self.model.predict([description])
            return prediction[0]
        except Exception:
            return None

    def categorize(self, description: str) -> str:
        """
        Categorize transaction using rules first, then ML fallback.

        Returns category name.
        """
        # Try rule-based first
        category = self.categorize_by_rules(description)
        if category:
            return category

        # Fall back to ML
        category = self.categorize_by_ml(description)
        if category:
            return category

        # Default
        return 'Other'

    def train_model(self, descriptions: List[str], categories: List[str]):
        """Train ML model on user's transaction data."""
        if len(descriptions) < 10:
            raise ValueError("Need at least 10 transactions to train model")

        # Create pipeline
        self.model = Pipeline([
            ('tfidf', TfidfVectorizer(max_features=100, ngram_range=(1, 2))),
            ('clf', LogisticRegression(max_iter=1000, random_state=42))
        ])

        # Train
        self.model.fit(descriptions, categories)

        # Save model
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
        with open(self.model_path, 'wb') as f:
            pickle.dump(self.model, f)

    def suggest_category(self, description: str) -> str:
        """Alias for categorize method."""
        return self.categorize(description)
