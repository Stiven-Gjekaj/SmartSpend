import pytest
from datetime import date
from app.services.parser import CSVParser


class TestCSVParser:
    def test_detect_delimiter_comma(self):
        csv_content = "Date,Description,Amount\n2024-01-01,Store,-10.50"
        delimiter = CSVParser.detect_delimiter(csv_content)
        assert delimiter == ','

    def test_detect_delimiter_semicolon(self):
        csv_content = "Date;Description;Amount\n2024-01-01;Store;-10.50"
        delimiter = CSVParser.detect_delimiter(csv_content)
        assert delimiter == ';'

    def test_detect_delimiter_tab(self):
        csv_content = "Date\tDescription\tAmount\n2024-01-01\tStore\t-10.50"
        delimiter = CSVParser.detect_delimiter(csv_content)
        assert delimiter == '\t'

    def test_parse_date_iso_format(self):
        parsed = CSVParser.parse_date("2024-01-15")
        assert parsed.date() == date(2024, 1, 15)

    def test_parse_date_us_format(self):
        parsed = CSVParser.parse_date("01/15/2024")
        assert parsed.date() == date(2024, 1, 15)

    def test_parse_date_eu_format(self):
        parsed = CSVParser.parse_date("15/01/2024")
        assert parsed.date() == date(2024, 1, 15)

    def test_parse_amount_negative(self):
        amount = CSVParser.parse_amount("-10.50")
        assert amount == -10.50

    def test_parse_amount_parentheses(self):
        amount = CSVParser.parse_amount("(10.50)")
        assert amount == -10.50

    def test_parse_amount_european_decimal(self):
        amount = CSVParser.parse_amount("10,50")
        assert amount == 10.50

    def test_parse_amount_with_currency(self):
        amount = CSVParser.parse_amount("$10.50")
        assert amount == 10.50

    def test_parse_csv_basic(self):
        csv_content = """Date,Description,Amount
2024-01-15,Grocery Store,-45.20
2024-01-16,Gas Station,-30.00"""

        rows, delimiter = CSVParser.parse_csv(csv_content)

        assert delimiter == ','
        assert len(rows) == 2
        assert rows[0]['description'] == 'Grocery Store'
        assert rows[0]['amount'] == -45.20
        assert rows[0]['date'] == date(2024, 1, 15)

    def test_preview_csv(self):
        csv_content = """Date,Description,Amount
2024-01-15,Store,-10.50"""

        preview = CSVParser.preview_csv(csv_content)

        assert preview['total_rows'] == 1
        assert len(preview['preview']) == 1
        assert preview['delimiter'] == ','
        assert preview['preview'][0]['description'] == 'Store'
