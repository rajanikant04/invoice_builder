"use client"

import { useState } from 'react';

interface SenderDetailsProps {
  // Add any props needed from parent
}

const SenderDetails = () => {
  const [senderDetails, setSenderDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    businessNumber: '',
  });

  const handleSenderChange = (field: string, value: string) => {
    setSenderDetails({ ...senderDetails, [field]: value });
  };

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium mb-2">From</h3>
      <div className="space-y-2">
        <div>
          <label className="block text-xs text-gray-500">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-1 text-sm"
            value={senderDetails.name}
            onChange={(e) => handleSenderChange('name', e.target.value)}
            placeholder="Business Name"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded p-1 text-sm"
            value={senderDetails.email}
            onChange={(e) => handleSenderChange('email', e.target.value)}
            placeholder="name@business.com"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Address</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-1 text-sm"
            value={senderDetails.address}
            onChange={(e) => handleSenderChange('address', e.target.value)}
            placeholder="Street"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Phone</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-1 text-sm"
            value={senderDetails.phone}
            onChange={(e) => handleSenderChange('phone', e.target.value)}
            placeholder="(123) 456-789"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Business Number</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-1 text-sm"
            value={senderDetails.businessNumber}
            onChange={(e) => handleSenderChange('businessNumber', e.target.value)}
            placeholder="123-45-6789"
          />
        </div>
        <div>
          <a href="#" className="text-xs text-blue-500">View additional business details</a>
        </div>
      </div>
    </div>
  );
};

export default SenderDetails;
