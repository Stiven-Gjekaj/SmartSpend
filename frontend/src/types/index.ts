export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string | null;
  user_id: number;
  created_at: string;
}

export interface ReceiptLineItem {
  description: string;
  quantity: number;
  price: number;
  confidence?: number;
}

export interface Receipt {
  id?: number;
  vendor: string | null;
  date: string | null;
  total: number | null;
  line_items: ReceiptLineItem[];
  confidence?: number;
  raw_text?: string;
  suggested_matches?: Transaction[];
  suggested_category?: string;
}

export interface Budget {
  id: number;
  category: string;
  amount: number;
  period: string;
  spent: number;
  remaining: number;
  percentage: number;
  created_at: string;
}

export interface BalancePeriod {
  period: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface DashboardSummary {
  total_transactions: number;
  total_spent: number;
  total_income: number;
  category_breakdown: Record<string, number>;
  recent_transactions: Transaction[];
  budget_status: {
    category: string;
    budget: number;
    spent: number;
    remaining: number;
    percentage: number;
    period: string;
  }[];
  balance_periods: BalancePeriod[];
}

export interface CSVPreviewRow {
  row_number: number;
  date: string;
  description: string;
  amount: string;
  suggested_category?: string;
}

export interface CSVPreview {
  total_rows: number;
  preview: CSVPreviewRow[];
  delimiter: string;
}
