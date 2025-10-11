import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { receiptsApi } from '../services/api';
import { Receipt, Transaction } from '../types';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { cn, formatCurrency } from '../lib/utils';

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
    if (!confidence) return 'neutral';
    if (confidence >= 0.8) return 'success';
    if (confidence >= 0.6) return 'warning';
    return 'error';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Upload Receipt</h1>
        <p className="text-neutral-600 mt-1">
          Scan and extract data from receipt images using OCR
        </p>
      </div>

      {!ocrResult ? (
        <>
          <Card className="border-2 border-dashed">
            <div
              {...getRootProps()}
              className={cn(
                'p-12 text-center cursor-pointer transition-all duration-200',
                isDragActive ? 'bg-primary-50' : 'hover:bg-neutral-50'
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors',
                    isDragActive ? 'bg-primary-100' : 'bg-neutral-100'
                  )}
                >
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {isDragActive ? 'Drop your receipt here' : 'Upload Receipt Image'}
                </h3>
                <p className="text-neutral-600 mb-1">
                  Drag and drop your receipt image, or click to browse
                </p>
                <p className="text-sm text-neutral-500">
                  Supported formats: JPG, PNG • Max file size: 20MB
                </p>
              </div>
            </div>
          </Card>

          {/* Help Section */}
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
                  <h4 className="text-sm font-semibold text-primary-900 mb-1">Tips for Best Results</h4>
                  <ul className="text-sm text-primary-800 space-y-1">
                    <li>• Make sure the receipt is clearly visible and well-lit</li>
                    <li>• Flatten any creases or folds</li>
                    <li>• Capture the entire receipt including the total amount</li>
                    <li>• AI will automatically extract vendor, date, items, and total</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verification Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900">Verify Receipt Details</h3>
                <Badge variant={getConfidenceColor(ocrResult.confidence)}>
                  {((ocrResult.confidence || 0) * 100).toFixed(0)}% Confidence
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <Input
                  label="Vendor"
                  type="text"
                  value={verifiedData?.vendor || ''}
                  onChange={(e) => handleFieldChange('vendor', e.target.value)}
                  placeholder="Store or restaurant name"
                />

                <Input
                  label="Date"
                  type="date"
                  value={verifiedData?.date || ''}
                  onChange={(e) => handleFieldChange('date', e.target.value)}
                />

                <Input
                  label="Total Amount"
                  type="number"
                  step="0.01"
                  value={verifiedData?.total || ''}
                  onChange={(e) => handleFieldChange('total', parseFloat(e.target.value))}
                  placeholder="0.00"
                />

                {/* Line Items */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-neutral-900">Line Items</label>
                    <Button variant="ghost" size="sm" onClick={addLineItem}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Item
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {verifiedData?.line_items.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-start p-3 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors">
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleLineItemChange(idx, 'description', e.target.value)}
                            placeholder="Item description"
                            className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleLineItemChange(idx, 'quantity', parseFloat(e.target.value))}
                              placeholder="Qty"
                              className="w-20 px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <input
                              type="number"
                              step="0.01"
                              value={item.price}
                              onChange={(e) => handleLineItemChange(idx, 'price', parseFloat(e.target.value))}
                              placeholder="Price"
                              className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLineItem(idx)}
                          className="text-error-600 hover:text-error-700 hover:bg-error-50"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Category */}
                {verifiedData?.suggested_category && (
                  <div className="bg-primary-50 border border-primary-200 p-3 rounded-lg">
                    <p className="text-sm text-primary-900">
                      <span className="font-medium">Suggested Category:</span>{' '}
                      <Badge variant="primary" className="ml-1">{verifiedData.suggested_category}</Badge>
                    </p>
                  </div>
                )}

                <Button
                  variant="secondary"
                  fullWidth
                  onClick={handleVerify}
                  loading={loading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Re-verify & Update Suggestions
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Matching Transactions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-neutral-900">Suggested Matches</h3>
            </CardHeader>
            <CardBody>
              {verifiedData?.suggested_matches && verifiedData.suggested_matches.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {verifiedData.suggested_matches.map((txn) => (
                    <div
                      key={txn.id}
                      onClick={() => setSelectedMatch(txn.id === selectedMatch ? null : txn.id)}
                      className={cn(
                        'p-4 border-2 rounded-xl cursor-pointer transition-all',
                        selectedMatch === txn.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
                      )}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="font-medium text-neutral-900">{txn.description}</p>
                          <p className="text-sm text-neutral-500 mt-1">{txn.date}</p>
                          {txn.category && (
                            <Badge variant="primary" className="mt-2">
                              {txn.category}
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-neutral-900">{formatCurrency(Math.abs(txn.amount))}</p>
                          {selectedMatch === txn.id && (
                            <Badge variant="success" className="mt-2">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Selected
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state py-8">
                  <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm text-neutral-500">No matching transactions found</p>
                </div>
              )}

              {selectedMatch && (
                <div className="bg-success-50 border border-success-200 p-3 rounded-lg mb-4">
                  <p className="text-sm text-success-800 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Receipt will be attached to selected transaction
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleImport}
                  loading={importing}
                  disabled={!verifiedData?.date || !verifiedData?.total}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {selectedMatch ? 'Attach to Transaction' : 'Import as New Transaction'}
                </Button>

                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => {
                    setOcrResult(null);
                    setVerifiedData(null);
                    setSelectedMatch(null);
                  }}
                >
                  Cancel
                </Button>
              </div>

              {/* Raw OCR Text */}
              {ocrResult.raw_text && (
                <details className="mt-4">
                  <summary className="text-sm text-neutral-600 cursor-pointer hover:text-neutral-900 font-medium">
                    View Raw OCR Text
                  </summary>
                  <pre className="mt-2 text-xs bg-neutral-50 p-3 rounded-lg overflow-auto max-h-40 text-neutral-700 border border-neutral-200">
                    {ocrResult.raw_text}
                  </pre>
                </details>
              )}
            </CardBody>
          </Card>
        </div>
      )}

      {loading && !ocrResult && (
        <Card className="py-12">
          <div className="flex flex-col items-center">
            <div className="spinner w-12 h-12 border-4 mb-4"></div>
            <p className="text-neutral-600 font-medium">Processing receipt image...</p>
            <p className="text-sm text-neutral-500 mt-1">Extracting text using OCR</p>
          </div>
        </Card>
      )}
    </div>
  );
};
