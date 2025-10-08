import csv
import re
from datetime import datetime
from typing import List, Tuple
from io import StringIO


class CSVParser:
    """Parse and normalize CSV bank statements."""

    DATE_FORMATS = [
        "%Y-%m-%d",
        "%d/%m/%Y",
        "%m/%d/%Y",
        "%Y/%m/%d",
        "%d-%m-%Y",
        "%m-%d-%Y",
    ]

    @staticmethod
    def detect_delimiter(content: str) -> str:
        """Detect CSV delimiter from content."""
        first_line = content.split('\n')[0] if content else ""

        # Count occurrences of common delimiters
        delimiters = {',': 0, ';': 0, '\t': 0}
        for delim in delimiters:
            delimiters[delim] = first_line.count(delim)

        # Return most common delimiter
        return max(delimiters, key=delimiters.get) if max(delimiters.values()) > 0 else ','

    @staticmethod
    def parse_date(date_str: str) -> datetime | None:
        """Parse date string using multiple formats."""
        date_str = date_str.strip()

        for fmt in CSVParser.DATE_FORMATS:
            try:
                return datetime.strptime(date_str, fmt)
            except ValueError:
                continue

        return None

    @staticmethod
    def parse_amount(amount_str: str) -> float | None:
        """Parse amount handling various formats."""
        amount_str = amount_str.strip()

        # Handle negative amounts in parentheses: (4.50) -> -4.50
        if amount_str.startswith('(') and amount_str.endswith(')'):
            amount_str = '-' + amount_str[1:-1]

        # Remove currency symbols
        amount_str = re.sub(r'[$€£¥]', '', amount_str)

        # Handle European format (comma as decimal): 4,50 -> 4.50
        # Only if there's no dot and comma appears once
        if ',' in amount_str and '.' not in amount_str:
            if amount_str.count(',') == 1:
                amount_str = amount_str.replace(',', '.')

        # Remove thousands separators
        amount_str = amount_str.replace(',', '')

        try:
            return float(amount_str)
        except ValueError:
            return None

    @staticmethod
    def parse_csv(content: str) -> Tuple[List[dict], str]:
        """
        Parse CSV content and return normalized rows.

        Returns:
            Tuple of (parsed_rows, delimiter_used)
        """
        delimiter = CSVParser.detect_delimiter(content)

        # Parse CSV
        csv_file = StringIO(content)
        reader = csv.DictReader(csv_file, delimiter=delimiter)

        rows = []
        for idx, row in enumerate(reader, start=1):
            # Try to find date, description, and amount columns
            # Common column names
            date_col = None
            desc_col = None
            amount_col = None

            # Find columns (case-insensitive)
            for key in row.keys():
                key_lower = key.lower().strip()
                if not date_col and any(d in key_lower for d in ['date', 'transaction date', 'posted']):
                    date_col = key
                elif not desc_col and any(d in key_lower for d in ['description', 'memo', 'payee', 'merchant']):
                    desc_col = key
                elif not amount_col and any(a in key_lower for a in ['amount', 'value', 'debit', 'credit']):
                    amount_col = key

            if not (date_col and desc_col and amount_col):
                continue

            # Parse values
            parsed_date = CSVParser.parse_date(row[date_col])
            parsed_amount = CSVParser.parse_amount(row[amount_col])

            if parsed_date and parsed_amount is not None:
                rows.append({
                    'row_number': idx,
                    'date': parsed_date.date(),
                    'description': row[desc_col].strip(),
                    'amount': parsed_amount,
                })

        return rows, delimiter

    @staticmethod
    def preview_csv(content: str, max_rows: int = 10) -> dict:
        """Generate a preview of CSV content."""
        rows, delimiter = CSVParser.parse_csv(content)

        preview_rows = []
        for row in rows[:max_rows]:
            preview_rows.append({
                'row_number': row['row_number'],
                'date': row['date'].isoformat(),
                'description': row['description'],
                'amount': str(row['amount']),
            })

        return {
            'total_rows': len(rows),
            'preview': preview_rows,
            'delimiter': delimiter,
            'all_rows': rows  # For import
        }
