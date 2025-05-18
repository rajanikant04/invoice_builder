import React, { Dispatch, SetStateAction } from 'react';

export interface InvoiceItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  setItems: Dispatch<SetStateAction<InvoiceItem[]>>;
}

const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({ items, setItems }) => {
  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', description: '', quantity: 0, unitPrice: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => (item.id === id ? { ...item, [field]: value } : item)));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Invoice Items</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Item Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Unit Price</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="border p-2">
                <input type="text" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} className="w-full" />
              </td>
              <td className="border p-2">
                <input type="text" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} className="w-full" />
              </td>
              <td className="border p-2">
                <input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))} className="w-full" />
              </td>
              <td className="border p-2">
                <input type="number" value={item.unitPrice} onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))} className="w-full" />
              </td>
              <td className="border p-2">{item.quantity * item.unitPrice}</td>
              <td className="border p-2">
                <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white p-1">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addItem} className="mt-4 bg-green-500 text-white p-2">Add Item</button>
    </div>
  );
};

export default InvoiceItemsTable; 