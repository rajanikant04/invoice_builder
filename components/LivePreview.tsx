import React from 'react';

const LivePreview: React.FC = () => {
  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold">Client Details</h3>
          <p>Client Name: [Client Name]</p>
          <p>Client Email: [Client Email]</p>
          <p>Client Address: [Client Address]</p>
        </div>
        <div>
          <h3 className="font-bold">Invoice Details</h3>
          <p>Invoice Number: [Invoice Number]</p>
          <p>Invoice Date: [Invoice Date]</p>
          <p>Due Date: [Due Date]</p>
          <p>Notes: [Notes]</p>
        </div>
        <div>
          <h3 className="font-bold">Invoice Items</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Item Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Unit Price</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder for invoice items */}
              <tr>
                <td className="border p-2">[Item Name]</td>
                <td className="border p-2">[Description]</td>
                <td className="border p-2">[Quantity]</td>
                <td className="border p-2">[Unit Price]</td>
                <td className="border p-2">[Total]</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="font-bold">Tax & Discount</h3>
          <p>Tax: [Tax %]</p>
          <p>Discount: [Discount Amount]</p>
        </div>
        <div>
          <h3 className="font-bold">Grand Total</h3>
          <p>[Grand Total]</p>
        </div>
      </div>
    </div>
  );
};

export default LivePreview; 