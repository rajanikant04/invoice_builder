"use client"

import { useState } from 'react';

interface InvoiceDetailsProps {
  // Add any props needed from parent
}

const InvoiceDetails = () => {
  const [invoiceDetails, setInvoiceDetails] = useState({
    number: '',
    date: formatDate(new Date()),
    terms: '30 days net',
    notes: '',
  });

  const handleInvoiceDetailsChange = (field: string, value: string) => {
    setInvoiceDetails({ ...invoiceDetails, [field]: value });
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium mb-2">Invoice Details</h3>
      <div className="space-y-2">
        <div>
          <label className="block text-xs text-gray-500">Invoice Number</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-1 text-sm"
            value={invoiceDetails.number}
            onChange={(e) => handleInvoiceDetailsChange('number', e.target.value)}
            placeholder="INV-001"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Invoice Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded p-1 text-sm"
            value={invoiceDetails.date}
            onChange={(e) => handleInvoiceDetailsChange('date', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Payment Terms</label>
          <select
            className="w-full border border-gray-300 rounded p-1 text-sm"
            value={invoiceDetails.terms}
            onChange={(e) => handleInvoiceDetailsChange('terms', e.target.value)}
          >
            <option value="30 days net">30 days net</option>
            <option value="15 days net">15 days net</option>
            <option value="Due on receipt">Due on receipt</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500">Notes</label>
          <textarea
            className="w-full border border-gray-300 rounded p-1 text-sm"
            value={invoiceDetails.notes}
            onChange={(e) => handleInvoiceDetailsChange('notes', e.target.value)}
            rows={3}
            placeholder="Add any notes or terms here..."
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
