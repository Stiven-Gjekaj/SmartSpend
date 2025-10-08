import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { receiptsApi } from '../services/api';
import { Receipt, Transaction } from '../types';
import { useNavigate } from 'react-router-dom';

export const UploadReceipt: React.FC = () => {
  const [ocrResult, setOcrResult] = useState<Receipt | null>(null);
  const [verifiedData, setVerifiedData] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
    maxSize: 20 * 1024 * 1024,
    onDrop: async (files) => {
      if (files.length === 0) return;

      setLoading(true);
      try {
        const response = await receiptsApi.upload(files[0]);
        setOcrResult(response.data);
        setVerifiedData(response.data);
      } catch (error: any) {
        alert(error.response?.data?.detail || 'Failed to process receipt');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFieldChange = (field: keyof Receipt, value: any) => {
    if (!verifiedData) return;
    setVerifiedData({ ...verifiedData, [field]: value });
  };

  const handleLineItemChange = (index: number, field: string, value: any) => {
    if (!verifiedData) return;
    const newItems = [...verifiedData.line_items];
    newItems[index] = { ...newItems[index], [field]: value };
    setVerifiedData({ ...verifiedData, line_items: newItems });
  };

  const addLineItem = () => {
    if (!verifiedData) return;
    setVerifiedData({
      ...verifiedData,
      line_items: [...verifiedData.line_items, { description: '', quantity: 1, price: 0 }],
    });
  };

  const removeLineItem = (index: number) => {
    if (!verifiedData) return;
    const newItems = verifiedData.line_items.filter((_, i) => i !== index);
    setVerifiedData({ ...verifiedData, line_items: newItems });
  };

  const handleVerify = async () => {
    if (!verifiedData) return;

    setLoading(true);
    try {
      const response = await receiptsApi.verify(verifiedData);
      setVerifiedData(response.data);
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to verify receipt');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!verifiedData) return;

    setImporting(true);
    try {
      await receiptsApi.import({
        vendor: verifiedData.vendor,
        date: verifiedData.date!,
        total: verifiedData.total!,
        line_items: verifiedData.line_items,
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

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-gray-500';
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Upload Receipt</h1>

      {!ocrResult ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
          }`}
        >
          <input {...getInputProps()} />
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-4 text-lg text-gray-600">
            {isDragActive ? 'Drop receipt image here' : 'Drag & drop receipt image, or click to select'}
          </p>
          <p className="mt-2 text-sm text-gray-500">Supports JPG, PNG • Max 20MB</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verification Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Verify Receipt Details</h3>
              <span className={`text-sm font-medium ${getConfidenceColor(ocrResult.confidence)}`}>
                Confidence: {((ocrResult.confidence || 0) * 100).toFixed(0)}%
              </span>
            </div>

            <div className="space-y-4">
              {/* Vendor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                <input
                  type="text"
                  value={verifiedData?.vendor || ''}
                  onChange={(e) => handleFieldChange('vendor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={verifiedData?.date || ''}
                  onChange={(e) => handleFieldChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Total */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                <input
                  type="number"
                  step="0.01"
                  value={verifiedData?.total || ''}
                  onChange={(e) => handleFieldChange('total', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Line Items */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Line Items</label>
                  <button
                    onClick={addLineItem}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    + Add Item
                  </button>
                </div>

                <div className="space-y-2">
                  {verifiedData?.line_items.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-start border p-2 rounded">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleLineItemChange(idx, 'description', e.target.value)}
                          placeholder="Description"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleLineItemChange(idx, 'quantity', parseFloat(e.target.value))}
                        placeholder="Qty"
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => handleLineItemChange(idx, 'price', parseFloat(e.target.value))}
                        placeholder="Price"
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <button
                        onClick={() => removeLineItem(idx)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Category */}
              {verifiedData?.suggested_category && (
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    Suggested Category: <span className="font-medium">{verifiedData.suggested_category}</span>
                  </p>
                </div>
              )}

              <button
                onClick={handleVerify}
                disabled={loading}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Re-verify & Update Suggestions'}
              </button>
            </div>
          </div>

          {/* Matching Transactions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Suggested Matches</h3>

            {verifiedData?.suggested_matches && verifiedData.suggested_matches.length > 0 ? (
              <div className="space-y-2 mb-4">
                {verifiedData.suggested_matches.map((txn) => (
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
              disabled={importing || !verifiedData?.date || !verifiedData?.total}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {importing ? 'Importing...' : selectedMatch ? 'Attach to Transaction' : 'Import as New Transaction'}
            </button>

            <button
              onClick={() => {
                setOcrResult(null);
                setVerifiedData(null);
                setSelectedMatch(null);
              }}
              className="w-full mt-2 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200"
            >
              Cancel
            </button>

            {/* Raw OCR Text (for debugging) */}
            {ocrResult.raw_text && (
              <details className="mt-4">
                <summary className="text-sm text-gray-600 cursor-pointer">View Raw OCR Text</summary>
                <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-auto max-h-40">
                  {ocrResult.raw_text}
                </pre>
              </details>
            )}
          </div>
        </div>
      )}

      {loading && !ocrResult && (
        <div className="text-center py-8">
          <p className="text-gray-600">Processing receipt...</p>
        </div>
      )}
    </div>
  );
};
