import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../services/api';
import { DashboardSummary } from '../types';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const response = await dashboardApi.getSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Failed to load dashboard', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!summary) {
    return <div className="p-8">Failed to load dashboard</div>;
  }

  const categoryData = Object.entries(summary.category_breakdown).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Transactions</h3>
          <p className="text-3xl font-bold mt-2">{summary.total_transactions}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Spent</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">${summary.total_spent.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Income</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">${summary.total_income.toFixed(2)}</p>
        </div>
      </div>

      {/* Balance Periods */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Balance by Period</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {summary.balance_periods.map((period) => (
            <div key={period.period} className="border rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">{period.period}</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Income:</span>
                  <span className="font-semibold text-green-600">+${period.income.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Expenses:</span>
                  <span className="font-semibold text-red-600">-${period.expenses.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Balance:</span>
                    <span className={`text-xl font-bold ${period.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {period.balance >= 0 ? '+' : ''}${period.balance.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </div>

        {/* Budget Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Budget Status</h3>
          {summary.budget_status.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={summary.budget_status}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="spent" fill="#ef4444" name="Spent" />
                <Bar dataKey="remaining" fill="#10b981" name="Remaining" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No budgets set</p>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {summary.recent_transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{txn.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{txn.description}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {txn.category || 'Uncategorized'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm text-right font-medium ${
                    txn.amount < 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    ${Math.abs(txn.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
