import React, { useEffect, useState } from 'react';
import { budgetsApi } from '../services/api';
import { Budget } from '../types';

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

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {showForm ? 'Cancel' : '+ New Budget'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Create Budget</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Groceries, Dining"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
              <select
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Create Budget
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => (
          <div key={budget.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{budget.category}</h3>
                <p className="text-sm text-gray-500 capitalize">{budget.period}</p>
              </div>
              <button
                onClick={() => handleDelete(budget.id)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Budget:</span>
                <span className="font-semibold">${budget.amount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Spent:</span>
                <span className="font-semibold text-red-600">${budget.spent.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Remaining:</span>
                <span className={`font-semibold ${budget.remaining > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${budget.remaining.toFixed(2)}
                </span>
              </div>

              <div className="pt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className={`text-xs font-medium ${budget.percentage > 100 ? 'text-red-600' : budget.percentage > 80 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {budget.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${budget.percentage > 100 ? 'bg-red-500' : budget.percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {budgets.length === 0 && !showForm && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No budgets set. Create your first budget to track spending!</p>
        </div>
      )}
    </div>
  );
};
