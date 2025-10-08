import cv2
import numpy as np
import pytesseract
import re
from datetime import datetime
from typing import List, Dict, Optional, Tuple
from PIL import Image


class OCRService:
    """OCR service for receipt image processing."""

    def __init__(self):
        # Configure tesseract if needed
        # pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'
        pass

    def preprocess_image(self, image_path: str) -> np.ndarray:
        """
        Preprocess receipt image for better OCR results.

        Steps:
        1. Convert to grayscale
        2. Denoise
        3. Threshold
        4. Deskew
        """
        # Read image
        img = cv2.imread(image_path)

        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Denoise
        denoised = cv2.fastNlMeansDenoising(gray, None, 10, 7, 21)

        # Threshold (binary)
        _, thresh = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # Deskew
        coords = np.column_stack(np.where(thresh > 0))
        if len(coords) > 0:
            angle = cv2.minAreaRect(coords)[-1]
            if angle < -45:
                angle = 90 + angle
            elif angle > 45:
                angle = angle - 90

            if abs(angle) > 0.5:  # Only rotate if angle is significant
                (h, w) = thresh.shape[:2]
                center = (w // 2, h // 2)
                M = cv2.getRotationMatrix2D(center, angle, 1.0)
                thresh = cv2.warpAffine(thresh, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)

        return thresh

    def extract_text(self, image_path: str) -> str:
        """Extract text from preprocessed image."""
        preprocessed = self.preprocess_image(image_path)

        # Use pytesseract to extract text
        custom_config = r'--oem 3 --psm 6'
        text = pytesseract.image_to_string(preprocessed, config=custom_config)

        return text

    def parse_receipt(self, text: str) -> Dict:
        """
        Parse OCR text to extract receipt information.

        Returns:
            Dict with vendor, date, line_items, total, and confidence scores
        """
        lines = [line.strip() for line in text.split('\n') if line.strip()]

        result = {
            'vendor': None,
            'vendor_confidence': 0.0,
            'date': None,
            'date_confidence': 0.0,
            'line_items': [],
            'total': None,
            'total_confidence': 0.0,
            'raw_text': text
        }

        # Extract vendor (usually first non-empty line)
        if lines:
            result['vendor'] = lines[0]
            result['vendor_confidence'] = 0.8  # Higher confidence for first line

        # Extract date
        date_pattern = r'\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}[/-]\d{1,2}[/-]\d{1,2})\b'
        for line in lines:
            date_match = re.search(date_pattern, line)
            if date_match:
                date_str = date_match.group(1)
                parsed_date = self._parse_date(date_str)
                if parsed_date:
                    result['date'] = parsed_date
                    result['date_confidence'] = 0.85
                    break

        # Extract line items and total
        line_items, total = self._extract_items_and_total(lines)
        result['line_items'] = line_items
        result['total'] = total

        if total:
            result['total_confidence'] = 0.9

        # Calculate overall confidence
        confidences = [
            result['vendor_confidence'],
            result['date_confidence'],
            result['total_confidence']
        ]
        result['confidence'] = sum(confidences) / len(confidences) if confidences else 0.0

        return result

    def _parse_date(self, date_str: str) -> Optional[datetime]:
        """Parse date string from receipt."""
        formats = [
            "%m/%d/%Y", "%d/%m/%Y", "%Y/%m/%d",
            "%m-%d-%Y", "%d-%m-%Y", "%Y-%m-%d",
            "%m/%d/%y", "%d/%m/%y", "%y/%m/%d",
        ]

        for fmt in formats:
            try:
                return datetime.strptime(date_str, fmt)
            except ValueError:
                continue

        return None

    def _extract_items_and_total(self, lines: List[str]) -> Tuple[List[Dict], Optional[float]]:
        """Extract line items and total from receipt lines."""
        line_items = []
        total = None

        # Pattern for line items: description ... price
        # Looking for lines with prices
        price_pattern = r'(\d+[.,]\d{2})'

        # Pattern for total line
        total_patterns = [
            r'total[:\s]+\$?(\d+[.,]\d{2})',
            r'amount[:\s]+\$?(\d+[.,]\d{2})',
            r'balance[:\s]+\$?(\d+[.,]\d{2})',
        ]

        for line in lines:
            line_lower = line.lower()

            # Check for total
            for pattern in total_patterns:
                match = re.search(pattern, line_lower)
                if match:
                    total_str = match.group(1).replace(',', '.')
                    try:
                        total = float(total_str)
                    except ValueError:
                        pass
                    break

            # Extract line items (items with prices)
            prices = re.findall(price_pattern, line)
            if prices and not any(keyword in line_lower for keyword in ['total', 'subtotal', 'tax', 'amount']):
                # Extract description (text before the price)
                for price_str in prices:
                    desc_end = line.rfind(price_str)
                    description = line[:desc_end].strip()

                    # Clean up description
                    description = re.sub(r'^\d+\s*[xX]?\s*', '', description)  # Remove leading quantity

                    if description:
                        price_val = float(price_str.replace(',', '.'))
                        line_items.append({
                            'description': description,
                            'quantity': 1.0,
                            'price': price_val,
                            'confidence': 0.75
                        })

        return line_items, total

    def process_receipt(self, image_path: str) -> Dict:
        """
        Full pipeline: preprocess -> OCR -> parse.

        Returns structured receipt data.
        """
        # Extract text
        text = self.extract_text(image_path)

        # Parse receipt
        parsed = self.parse_receipt(text)

        return parsed
