import pytest
from app.services.ocr import OCRService


class TestOCRService:
    def setup_method(self):
        self.ocr_service = OCRService()

    def test_parse_receipt_basic(self):
        """Test parsing OCR text with basic receipt structure."""
        ocr_text = """
        Walmart Supercenter
        Store #1234

        Date: 01/15/2024

        Item 1                  $5.99
        Item 2                  $3.50
        Item 3                  $12.00

        Subtotal               $21.49
        Tax                     $1.50
        Total                  $22.99
        """

        result = self.ocr_service.parse_receipt(ocr_text)

        assert result['vendor'] is not None
        assert 'Walmart' in result['vendor']
        assert result['date'] is not None
        assert result['total'] is not None
        assert len(result['line_items']) > 0

    def test_parse_receipt_extracts_vendor(self):
        """Test vendor extraction (first line)."""
        ocr_text = """
        Starbucks Coffee
        Location: Main St

        Total: $5.50
        """

        result = self.ocr_service.parse_receipt(ocr_text)

        assert result['vendor'] == 'Starbucks Coffee'
        assert result['vendor_confidence'] > 0

    def test_parse_receipt_extracts_date(self):
        """Test date extraction."""
        ocr_text = """
        Store Name
        Date: 12/25/2023
        Total: $10.00
        """

        result = self.ocr_service.parse_receipt(ocr_text)

        assert result['date'] is not None
        assert result['date'].month == 12
        assert result['date'].day == 25
        assert result['date'].year == 2023

    def test_parse_receipt_extracts_total(self):
        """Test total extraction."""
        ocr_text = """
        Store Name
        Item 1                  $5.00
        Total:                 $15.50
        """

        result = self.ocr_service.parse_receipt(ocr_text)

        assert result['total'] == 15.50
        assert result['total_confidence'] > 0

    def test_parse_receipt_line_items(self):
        """Test line item extraction."""
        ocr_text = """
        Store Name

        Milk                    $3.99
        Bread                   $2.50
        Eggs                    $4.25

        Total                  $10.74
        """

        result = self.ocr_service.parse_receipt(ocr_text)

        assert len(result['line_items']) >= 3
        # Check that we extracted some items
        descriptions = [item['description'] for item in result['line_items']]
        assert any('Milk' in desc or 'Bread' in desc or 'Eggs' in desc for desc in descriptions)

    def test_parse_date_multiple_formats(self):
        """Test date parsing with different formats."""
        service = OCRService()

        date1 = service._parse_date("01/15/2024")
        assert date1 is not None
        assert date1.year == 2024

        date2 = service._parse_date("2024-01-15")
        assert date2 is not None
        assert date2.year == 2024

        date3 = service._parse_date("15/01/2024")
        assert date3 is not None

    def test_extract_items_and_total(self):
        """Test item and total extraction logic."""
        lines = [
            "Store Name",
            "Coffee                  $3.50",
            "Sandwich                $7.99",
            "Total                  $11.49",
        ]

        items, total = self.ocr_service._extract_items_and_total(lines)

        assert total == 11.49
        assert len(items) >= 1

    def test_confidence_scoring(self):
        """Test that confidence scores are calculated."""
        ocr_text = """
        Store
        Date: 01/15/2024
        Total: $10.00
        """

        result = self.ocr_service.parse_receipt(ocr_text)

        assert 'confidence' in result
        assert 0 <= result['confidence'] <= 1
