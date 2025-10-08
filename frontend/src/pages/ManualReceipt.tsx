import React, { useState } from 'react';
import { receiptsApi } from '../services/api';
import { Receipt } from '../types';
import { useNavigate } from 'react-router-dom';

export const ManualReceipt: React.FC = () => {
  const [formData, setFormData] = useState<Receipt>({
    vendor: '',
    date: '',
    total: null,
    line_items: [{ description: '', quantity: 1, price: 0 }],
  });
  const [preview, setPreview] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleFieldChange = (field: keyof Receipt, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleLineItemChange = (index: number, field: string, value: any) => {
    const newItems = [...formData.line_items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, line_items: newItems });
  };

  const addLineItem = () => {
    setFormData({
      ...formData,
      line_items: [...formData.line_items, { description: '', quantity: 1, price: 0 }],
    });
  };

  const removeLineItem = (index: number) => {
    const newItems = formData.line_items.filter((_, i) => i !== index);
    setFormData({ ...formData, line_items: newItems });
  };

  const handlePreview = async () => {
    if (!formData.vendor || !formData.date || !formData.total) {
      alert('Please fill in vendor, date, and total');
      return;
    }

    setLoading(true);
    try {
      const response = await receiptsApi.manual({
        vendor: formData.vendor,
        date: formData.date,
        total: formData.total,
        line_items: formData.line_items.filter(item => item.description),
      });
      setPreview(response.data);
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to preview receipt');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!preview) return;

    setImporting(true);
    try {
      await receiptsApi.import({
        vendor: preview.vendor,
        date: preview.date!,
        total: preview.total!,
        line_items: preview.line_items,
        attach_to_transaction_id: selectedMatch,
      });

      alert('Receipt imported successfully!');
      navigate('/transactions');
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to import receipt');
    } finally {
      setImporting(false);
    }
  };

  const handleBack = () => {
    setPreview(null);
    setSelectedMatch(null);
  };

  if (preview) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Manual Receipt - Preview</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Receipt Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Receipt Details</h3>

            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Vendor:</span>
                <p className="font-medium">{preview.vendor}</p>
              </div>

              <div>
                <span className="text-sm text-gray-500">Date:</span>
                <p className="font-medium">{preview.date}</p>
              </div>

              <div>
                <span className="text-sm text-gray-500">Total:</span>
                <p className="font-medium text-lg">${preview.total?.toFixed(2)}</p>
              </div>

              {preview.suggested_category && (
                <div>
                  <span className="text-sm text-gray-500">Suggested Category:</span>
                  <p className="font-medium">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {preview.suggested_category}
                    </span>
                  </p>
                </div>
              )}

              {preview.line_items.length > 0 && (
                <div>
                  <span className="text-sm text-gray-500 block mb-2">Line Items:</span>
                  <div className="space-y-2">
                    {preview.line_items.map((item, idx) => (
                      <div key={idx} className="text-sm border-l-2 border-indigo-200 pl-3">
                        <p className="font-medium">{item.description}</p>
                        <p className="text-gray-600">
                          {item.quantity} × ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Matching Transactions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Suggested Matches</h3>

            {preview.suggested_matches && preview.suggested_matches.length > 0 ? (
              <div className="space-y-2 mb-4">
                {preview.suggested_matches.map((txn) => (
                  <div
                    key={txn.id}
                    onClick={() => setSelectedMatch(txn.id === selectedMatch ? null : txn.id)}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedMatch === txn.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{txn.description}</p>
                        <p className="text-sm text-gray-500">{txn.date}</p>
                        {txn.category && (
                          <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {txn.category}
                          </span>
                        )}
                      </div>
                      <p className="font-semibold">${Math.abs(txn.amount).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mb-4">No matching transactions found</p>
            )}

            {selectedMatch && (
              <div className="bg-green-50 p-3 rounded mb-4">
                <p className="text-sm text-green-800">
                  Receipt will be attached to selected transaction
                </p>
              </div>
            )}

            <button
              onClick={handleImport}
              disabled={importing}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50 mb-2"
            >
              {importing ? 'Importing...' : selectedMatch ? 'Attach to Transaction' : 'Import as New Transaction'}
            </button>

            <button
              onClick={handleBack}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200"
            >
              Back to Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manual Receipt Entry</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Enter Receipt Details</h3>

        <div className="space-y-4">
          {/* Vendor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vendor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.vendor || ''}
              onChange={(e) => handleFieldChange('vendor', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Walmart, Starbucks"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date || ''}
              onChange={(e) => handleFieldChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Total */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.total || ''}
              onChange={(e) => handleFieldChange('total', parseFloat(e.target.value) || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0.00"
              required
            />
          </div>

          {/* Line Items */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Line Items <span className="text-gray-500">(optional)</span>
              </label>
              <button
                onClick={addLineItem}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                + Add Item
              </button>
            </div>

            <div className="space-y-2">
              {formData.line_items.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start border p-2 rounded">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleLineItemChange(idx, 'description', e.target.value)}
                      placeholder="Item description"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleLineItemChange(idx, 'quantity', parseFloat(e.target.value) || 0)}
                    placeholder="Qty"
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleLineItemChange(idx, 'price', parseFloat(e.target.value) || 0)}
                    placeholder="Price"
                    className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  {formData.line_items.length > 1 && (
                    <button
                      onClick={() => removeLineItem(idx)}
                      className="text-red-600 hover:text-red-700 text-sm font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePreview}
            disabled={loading || !formData.vendor || !formData.date || !formData.total}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Preview & Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};
