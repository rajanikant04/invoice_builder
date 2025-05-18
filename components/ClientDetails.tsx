import React from 'react';

interface ClientDetailsProps {
  clientDetails: {
    name: string;
    email: string;
    address: string;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    notes: string;
  };
  updateClientDetails: (field: string, value: string) => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ clientDetails, updateClientDetails }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Client & Invoice Details</h2>
      <form className="space-y-4">
        <div>
          <label className="block">Client Name</label>
          <input type="text" className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Client Email</label>
          <input type="email" className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Client Address</label>
          <textarea className="border p-2 w-full" rows={3}></textarea>
        </div>
        <div>
          <label className="block">Invoice Number</label>
          <input type="text" className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Invoice Date</label>
          <input type="date" className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Due Date</label>
          <input type="date" className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Notes</label>
          <textarea className="border p-2 w-full" rows={3}></textarea>
        </div>
      </form>
    </div>
  );
};

export default ClientDetails; 