import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { transactionsApi } from '../services/api';
import { CSVPreview, CSVPreviewRow } from '../types';
import { useNavigate } from 'react-router-dom';

export const UploadCSV: React.FC = () => {
  const [preview, setPreview] = useState<CSVPreview | null>(null);
  const [editedRows, setEditedRows] = useState<Map<number, Partial<CSVPreviewRow>>>(new Map());
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'text/csv': ['.csv'] },
    maxSize: 20 * 1024 * 1024,
    onDrop: async (files) => {
      if (files.length === 0) return;

      setLoading(true);
      try {
        const response = await transactionsApi.uploadCSV(files[0]);
        setPreview(response.data);
        setEditedRows(new Map());
      } catch (error: any) {
        alert(error.response?.data?.detail || 'Failed to upload CSV');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCategoryChange = (rowNumber: number, category: string) => {
    const updated = new Map(editedRows);
    updated.set(rowNumber, { ...updated.get(rowNumber), suggested_category: category });
    setEditedRows(updated);
  };

  const handleImport = async () => {
    if (!preview) return;

    setImporting(true);
    try {
      const transactions = preview.preview.map((row) => {
        const edited = editedRows.get(row.row_number);
        return {
          date: row.date,
          description: row.description,
          amount: parseFloat(row.amount),
          category: edited?.suggested_category || row.suggested_category,
        };
      });

      await transactionsApi.import(transactions);
      alert(`Successfully imported ${transactions.length} transactions`);
      navigate('/transactions');
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to import transactions');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Upload CSV</h1>

      {!preview ? (
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
            {isDragActive ? 'Drop CSV file here' : 'Drag & drop CSV file here, or click to select'}
          </p>
          <p className="mt-2 text-sm text-gray-500">Max file size: 20MB</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">CSV Preview</h3>
              <p className="text-sm text-gray-500">Total rows: {preview.total_rows}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setPreview(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={importing}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                {importing ? 'Importing...' : `Import ${preview.total_rows} Transactions`}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {preview.preview.map((row) => {
                  const edited = editedRows.get(row.row_number);
                  const category = edited?.suggested_category || row.suggested_category || '';

                  return (
                    <tr key={row.row_number}>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.row_number}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{row.amount}</td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={category}
                          onChange={(e) => handleCategoryChange(row.row_number, e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Category"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Processing CSV...</p>
        </div>
      )}
    </div>
  );
};
