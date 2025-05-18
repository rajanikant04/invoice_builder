import React from 'react';

const ExportOptions: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Placeholder for download functionality
    alert('Download functionality will be implemented here.');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Export Options</h2>
      <div className="space-x-4">
        <button onClick={handlePrint} className="bg-blue-500 text-white p-2">Print Invoice</button>
        <button onClick={handleDownload} className="bg-green-500 text-white p-2">Download Invoice</button>
      </div>
    </div>
  );
};

export default ExportOptions; 