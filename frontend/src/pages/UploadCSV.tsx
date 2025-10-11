import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { transactionsApi } from '../services/api';
import { CSVPreview, CSVPreviewRow } from '../types';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Upload CSV</h1>
        <p className="text-neutral-600 mt-1">
          Import your bank transactions from a CSV file
        </p>
      </div>

      {!preview ? (
        <Card className="border-2 border-dashed">
          <div
            {...getRootProps()}
            className={cn(
              'p-12 text-center cursor-pointer transition-all duration-200',
              isDragActive
                ? 'bg-primary-50 border-primary-300'
                : 'hover:bg-neutral-50'
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
              <div className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors',
                isDragActive ? 'bg-primary-100' : 'bg-neutral-100'
              )}>
                <svg
                  className={cn(
                    'w-8 h-8 transition-colors',
                    isDragActive ? 'text-primary-600' : 'text-neutral-400'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                {isDragActive ? 'Drop your CSV file here' : 'Upload CSV File'}
              </h3>
              <p className="text-neutral-600 mb-1">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-sm text-neutral-500">
                Supported format: CSV • Max file size: 20MB
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">CSV Preview</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  {preview.total_rows} transaction{preview.total_rows !== 1 ? 's' : ''} ready to import
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setPreview(null)}
                  disabled={importing}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleImport}
                  loading={importing}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Import {preview.total_rows} Transaction{preview.total_rows !== 1 ? 's' : ''}
                </Button>
              </div>
            </div>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-y border-neutral-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {preview.preview.map((row) => {
                  const edited = editedRows.get(row.row_number);
                  const category = edited?.suggested_category || row.suggested_category || '';

                  return (
                    <tr key={row.row_number} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-neutral-500 font-mono">
                        {row.row_number}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900 whitespace-nowrap">
                        {row.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        {row.description}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900 text-right font-semibold">
                        {row.amount}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={category}
                          onChange={(e) => handleCategoryChange(row.row_number, e.target.value)}
                          className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter category"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {loading && (
        <Card className="py-12">
          <div className="flex flex-col items-center">
            <div className="spinner w-12 h-12 border-4 mb-4"></div>
            <p className="text-neutral-600 font-medium">Processing CSV file...</p>
            <p className="text-sm text-neutral-500 mt-1">This may take a moment</p>
          </div>
        </Card>
      )}

      {/* Help Section */}
      {!preview && !loading && (
        <Card className="bg-primary-50 border-primary-200">
          <CardBody>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-primary-900 mb-1">CSV Format Tips</h4>
                <ul className="text-sm text-primary-800 space-y-1">
                  <li>• Your CSV should include columns for: Date, Description, Amount</li>
                  <li>• Dates should be in YYYY-MM-DD format</li>
                  <li>• Negative amounts represent expenses, positive amounts represent income</li>
                  <li>• Categories will be auto-suggested but you can edit them before importing</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
