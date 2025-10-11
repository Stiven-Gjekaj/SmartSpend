import React, { useEffect, useState } from 'react';
import { budgetsApi } from '../services/api';
import { Budget } from '../types';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { cn, formatCurrency } from '../lib/utils';

export const Budgets: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly',
  });

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    try {
      const response = await budgetsApi.getAll();
      setBudgets(response.data);
    } catch (error) {
      console.error('Failed to load budgets', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await budgetsApi.create({
        category: formData.category,
        amount: parseFloat(formData.amount),
        period: formData.period,
      });

      await loadBudgets();
      setShowForm(false);
      setFormData({ category: '', amount: '', period: 'monthly' });
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to create budget');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this budget?')) return;

    try {
      await budgetsApi.delete(id);
      await loadBudgets();
    } catch (error) {
      alert('Failed to delete budget');
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage > 100) return 'error';
    if (percentage > 80) return 'warning';
    return 'success';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage > 100) return 'bg-error-500';
    if (percentage > 80) return 'bg-warning-500';
    return 'bg-success-500';
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-neutral-200 rounded skeleton" />
          <div className="h-10 w-32 bg-neutral-200 rounded skeleton" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-64 skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Budgets</h1>
          <p className="text-neutral-600 mt-1">
            {budgets.length} budget{budgets.length !== 1 ? 's' : ''} configured
          </p>
        </div>
        <Button
          variant={showForm ? 'ghost' : 'primary'}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Budget
            </>
          )}
        </Button>
      </div>

      {/* Create Form */}
      {showForm && (
        <Card className="animate-slide-down">
          <CardHeader>
            <h3 className="text-lg font-semibold text-neutral-900">Create Budget</h3>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Category"
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                placeholder="e.g., Groceries, Dining, Entertainment"
              />

              <Input
                label="Amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                placeholder="0.00"
                helperText="Set your spending limit for this category"
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-900">
                  Period
                </label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900 transition-all duration-100 focus:outline-none focus:ring-3 focus:ring-primary-500/30 focus:border-primary-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <Button type="submit" variant="primary" fullWidth>
                Create Budget
              </Button>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Budget Cards */}
      {budgets.length === 0 && !showForm ? (
        <Card className="py-16">
          <div className="empty-state">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Budgets Yet</h3>
            <p className="text-neutral-600 mb-6 max-w-md">
              Create your first budget to track spending and stay within your financial goals.
            </p>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Budget
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <Card key={budget.id} variant="elevated" className="hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900">{budget.category}</h3>
                  <Badge variant="neutral" className="mt-1.5 capitalize">
                    {budget.period}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(budget.id)}
                  className="text-error-600 hover:text-error-700 hover:bg-error-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Budget:</span>
                  <span className="font-semibold text-neutral-900">{formatCurrency(budget.amount)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Spent:</span>
                  <span className="font-semibold text-error-600">{formatCurrency(budget.spent)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Remaining:</span>
                  <span
                    className={cn(
                      'font-semibold',
                      budget.remaining > 0 ? 'text-success-600' : 'text-error-600'
                    )}
                  >
                    {formatCurrency(budget.remaining)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="pt-3 border-t border-neutral-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-neutral-600">Progress</span>
                  <Badge variant={getProgressColor(budget.percentage)}>
                    {budget.percentage.toFixed(1)}%
                  </Badge>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={cn(
                      'h-2.5 rounded-full transition-all duration-500',
                      getProgressBarColor(budget.percentage)
                    )}
                    style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                  />
                </div>
                {budget.percentage > 100 && (
                  <p className="text-xs text-error-600 mt-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Over budget by {formatCurrency(Math.abs(budget.remaining))}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
