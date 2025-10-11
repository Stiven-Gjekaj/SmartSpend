import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../services/api';
import { DashboardSummary } from '../types';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { cn, formatCurrency } from '../lib/utils';

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
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="h-8 bg-neutral-200 rounded w-48 skeleton" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-32 skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <Card className="text-center py-12">
        <div className="empty-state">
          <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Failed to Load Dashboard</h3>
          <p className="text-neutral-600 mb-4">We couldn't retrieve your data. Please try again.</p>
          <button onClick={loadSummary} className="text-primary-600 hover:text-primary-700 font-medium">
            Retry
          </button>
        </div>
      </Card>
    );
  }

  const categoryData = Object.entries(summary.category_breakdown).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600 mt-1">Welcome back! Here's your financial overview.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="elevated" className="hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-600 uppercase tracking-wider">
              Total Transactions
            </h3>
            <div className="p-2 bg-primary-50 rounded-lg">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{summary.total_transactions}</p>
          <p className="text-sm text-neutral-500 mt-2">All time</p>
        </Card>

        <Card variant="elevated" className="hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-600 uppercase tracking-wider">
              Total Spent
            </h3>
            <div className="p-2 bg-error-50 rounded-lg">
              <svg className="w-5 h-5 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-error-600">{formatCurrency(summary.total_spent)}</p>
          <p className="text-sm text-neutral-500 mt-2">Total expenses</p>
        </Card>

        <Card variant="elevated" className="hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-600 uppercase tracking-wider">
              Total Income
            </h3>
            <div className="p-2 bg-success-50 rounded-lg">
              <svg className="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-success-600">{formatCurrency(summary.total_income)}</p>
          <p className="text-sm text-neutral-500 mt-2">Total received</p>
        </Card>
      </div>

      {/* Balance Periods */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-neutral-900">Balance by Period</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summary.balance_periods.map((period) => (
              <div
                key={period.period}
                className="border border-neutral-200 rounded-xl p-4 hover:border-primary-300 transition-colors"
              >
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  {period.period}
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Income:</span>
                    <span className="font-semibold text-success-600">+{formatCurrency(period.income)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Expenses:</span>
                    <span className="font-semibold text-error-600">-{formatCurrency(period.expenses)}</span>
                  </div>
                  <div className="pt-3 border-t border-neutral-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-neutral-700">Balance:</span>
                      <span
                        className={cn(
                          'text-xl font-bold',
                          period.balance >= 0 ? 'text-success-600' : 'text-error-600'
                        )}
                      >
                        {period.balance >= 0 ? '+' : ''}{formatCurrency(Math.abs(period.balance))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-neutral-900">Spending by Category</h3>
          </CardHeader>
          <CardBody>
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
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-state">
                <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <p className="text-sm text-neutral-500">No data available</p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Budget Status */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-neutral-900">Budget Status</h3>
          </CardHeader>
          <CardBody>
            {summary.budget_status.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={summary.budget_status}>
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="spent" fill="#ef4444" name="Spent" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="remaining" fill="#22c55e" name="Remaining" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-state">
                <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-sm text-neutral-500">No budgets set</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900">Recent Transactions</h3>
            <a href="/transactions" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all →
            </a>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-y border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {summary.recent_transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-neutral-900 whitespace-nowrap">{txn.date}</td>
                  <td className="px-6 py-4 text-sm text-neutral-900">{txn.description}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant={txn.category ? 'primary' : 'neutral'}>
                      {txn.category || 'Uncategorized'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <span
                      className={cn(
                        'font-semibold',
                        txn.amount < 0 ? 'text-error-600' : 'text-success-600'
                      )}
                    >
                      {txn.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(txn.amount))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
