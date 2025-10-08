import React, { useEffect, useState } from 'react';
import { transactionsApi } from '../services/api';
import { Transaction } from '../types';

export const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState('');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await transactionsApi.getAll();
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to load transactions', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (txn: Transaction) => {
    setEditingId(txn.id);
    setEditCategory(txn.category || '');
  };

  const handleSave = async (id: number) => {
    try {
      await transactionsApi.update(id, { category: editCategory });
      await loadTransactions();
      setEditingId(null);
    } catch (error) {
      alert('Failed to update transaction');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditCategory('');
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-gray-600">{transactions.length} total</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{txn.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{txn.description}</td>
                  <td className="px-6 py-4 text-sm">
                    {editingId === txn.id ? (
                      <input
                        type="text"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        autoFocus
                      />
                    ) : (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {txn.category || 'Uncategorized'}
                      </span>
                    )}
                  </td>
                  <td className={`px-6 py-4 text-sm text-right font-medium ${
                    txn.amount < 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {txn.amount < 0 ? '-' : '+'}${Math.abs(txn.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    {editingId === txn.id ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleSave(txn.id)}
                          className="text-green-600 hover:text-green-700 font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-600 hover:text-gray-700 font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(txn)}
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No transactions yet. Upload a CSV or add a receipt to get started!</p>
        </div>
      )}
    </div>
  );
};
