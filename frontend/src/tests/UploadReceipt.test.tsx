import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UploadReceipt } from '../pages/UploadReceipt';
import { receiptsApi } from '../services/api';

// Mock the API
vi.mock('../services/api', () => ({
  receiptsApi: {
    upload: vi.fn(),
    verify: vi.fn(),
    import: vi.fn(),
  },
}));

// Mock react-router-dom navigation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('UploadReceipt', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders upload dropzone initially', () => {
    render(
      <BrowserRouter>
        <UploadReceipt />
      </BrowserRouter>
    );

    expect(screen.getByText(/Upload Receipt/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag & drop receipt image/i)).toBeInTheDocument();
  });

  it('displays OCR results after upload', async () => {
    const mockOCRResult = {
      vendor: 'Test Store',
      date: '2024-01-15',
      total: 25.50,
      line_items: [
        { description: 'Item 1', quantity: 1, price: 10.00, confidence: 0.9 },
        { description: 'Item 2', quantity: 2, price: 7.75, confidence: 0.85 },
      ],
      confidence: 0.87,
      raw_text: 'Test OCR text',
      suggested_matches: [],
    };

    vi.mocked(receiptsApi.upload).mockResolvedValue({ data: mockOCRResult });

    const { container } = render(
      <BrowserRouter>
        <UploadReceipt />
      </BrowserRouter>
    );

    // Simulate file drop
    const file = new File(['test'], 'receipt.jpg', { type: 'image/jpeg' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(receiptsApi.upload).toHaveBeenCalledWith(file);
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Store')).toBeInTheDocument();
      expect(screen.getByDisplayValue('25.5')).toBeInTheDocument();
    });
  });

  it('allows editing verified data', async () => {
    const mockOCRResult = {
      vendor: 'Test Store',
      date: '2024-01-15',
      total: 25.50,
      line_items: [],
      confidence: 0.9,
      raw_text: 'Test',
      suggested_matches: [],
    };

    vi.mocked(receiptsApi.upload).mockResolvedValue({ data: mockOCRResult });

    const { container } = render(
      <BrowserRouter>
        <UploadReceipt />
      </BrowserRouter>
    );

    // Simulate upload
    const file = new File(['test'], 'receipt.jpg', { type: 'image/jpeg' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Store')).toBeInTheDocument();
    });

    // Edit vendor field
    const vendorInput = screen.getByDisplayValue('Test Store');
    fireEvent.change(vendorInput, { target: { value: 'Updated Store' } });

    expect(screen.getByDisplayValue('Updated Store')).toBeInTheDocument();
  });

  it('shows suggested matching transactions', async () => {
    const mockOCRResult = {
      vendor: 'Test Store',
      date: '2024-01-15',
      total: 25.50,
      line_items: [],
      confidence: 0.9,
      raw_text: 'Test',
      suggested_matches: [
        {
          id: 1,
          date: '2024-01-15',
          description: 'Test Store',
          amount: -25.50,
          category: 'Shopping',
          user_id: 1,
          created_at: '2024-01-15T10:00:00',
        },
      ],
    };

    vi.mocked(receiptsApi.upload).mockResolvedValue({ data: mockOCRResult });

    const { container } = render(
      <BrowserRouter>
        <UploadReceipt />
      </BrowserRouter>
    );

    const file = new File(['test'], 'receipt.jpg', { type: 'image/jpeg' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByText('Suggested Matches')).toBeInTheDocument();
      expect(screen.getByText('Test Store')).toBeInTheDocument();
      expect(screen.getByText('$25.50')).toBeInTheDocument();
    });
  });

  it('handles import action', async () => {
    const mockOCRResult = {
      vendor: 'Test Store',
      date: '2024-01-15',
      total: 25.50,
      line_items: [],
      confidence: 0.9,
      raw_text: 'Test',
      suggested_matches: [],
    };

    vi.mocked(receiptsApi.upload).mockResolvedValue({ data: mockOCRResult });
    vi.mocked(receiptsApi.import).mockResolvedValue({ data: {} });

    const { container } = render(
      <BrowserRouter>
        <UploadReceipt />
      </BrowserRouter>
    );

    const file = new File(['test'], 'receipt.jpg', { type: 'image/jpeg' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Store')).toBeInTheDocument();
    });

    // Click import button
    const importButton = screen.getByText(/Import as New Transaction/i);
    fireEvent.click(importButton);

    await waitFor(() => {
      expect(receiptsApi.import).toHaveBeenCalled();
    });
  });
});
