import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Request interceptor - token from localStorage:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization header set:', config.headers.Authorization);
  } else {
    console.warn('No token found in localStorage');
  }
  return config;
});

// Auth API
export const authApi = {
  register: (data: { email: string; password: string; full_name?: string }) =>
    api.post('/api/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data),
};

// Transactions API
export const transactionsApi = {
  uploadCSV: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/transactions/upload', formData);
  },
  import: (transactions: any[]) =>
    api.post('/api/transactions/import', { transactions }),
  getAll: () => api.get('/api/transactions'),
  update: (id: number, data: any) => api.patch(`/api/transactions/${id}`, data),
};

// Receipts API
export const receiptsApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/receipts/upload', formData);
  },
  verify: (data: any) => api.post('/api/receipts/verify', data),
  import: (data: any) => api.post('/api/receipts/import', data),
  manual: (data: any) => api.post('/api/receipts/manual', data),
  getAll: () => api.get('/api/receipts'),
};

// Dashboard API
export const dashboardApi = {
  getSummary: () => api.get('/api/dashboard/summary'),
};

// Budgets API
export const budgetsApi = {
  create: (data: { category: string; amount: number; period: string }) =>
    api.post('/api/budgets', data),
  getAll: () => api.get('/api/budgets'),
  delete: (id: number) => api.delete(`/api/budgets/${id}`),
};

// ML API
export const mlApi = {
  train: () => api.post('/api/ml/train'),
  predict: (description: string) =>
    api.post('/api/ml/predict', { description }),
};
