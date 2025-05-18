"use client"
import { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, FileText, Mail, Download, Camera, Check, X, Heading1 } from 'lucide-react';

const InvoiceGenerator = () => {
  const [activeTab, setActiveTab] = useState('editor');
  const [invoiceTitle, setInvoiceTitle] = useState('Invoice');
  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const invoiceRef = useRef(null);
  const fileInputRef = useRef(null);
  const signatureInputRef = useRef(null);
  
  // Default signature - a simple base64 encoded signature SVG
  const defaultSignature = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iNTAiPjxwYXRoIGQ9Ik0xMCw0MCBDMzAsMTAgNTAsMTAgNzAsNDAgQzgwLDYwIDEwMCwxMCAxMjAsNDAgQzE0MCwxMCAxNjAsMTAgMTgwLDQwIiBzdHJva2U9IiMwMDY2RkYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+";
  
  // Sender details
  const [senderDetails, setSenderDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    businessNumber: '',
  });

  // Recipient details
  const [recipientDetails, setRecipientDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    mobile: '',
    fax: '',
  });

  // Invoice details
  const [invoiceDetails, setInvoiceDetails] = useState({
    number: '',
    date: formatDate(new Date()),
    terms: '30 days net',
    notes: '',
  });

  // Line items
  const [items, setItems] = useState([
    { id: 1, description: '', qty: 1, rate: 0 }
  ]);

  // Color theme
  const [selectedColor, setSelectedColor] = useState('#3366FF');
  
  // Tax, discount, and currency
  const [taxType, setTaxType] = useState('Fixed');
  const [taxValue, setTaxValue] = useState(100);
  const [discountType, setDiscountType] = useState('Fixed');
  const [discountValue, setDiscountValue] = useState(50);
  const [currency, setCurrency] = useState('INR');
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  
  // Reviews
  const [reviewsEnabled, setReviewsEnabled] = useState(false);
  const [reviewWebsite, setReviewWebsite] = useState('');

  // Set default signature when component mounts
  useEffect(() => {
    setSignature(defaultSignature);
  }, []);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.rate * item.qty), 0);
  const taxAmount = taxType === 'None' ? 0 : 
                   taxType === 'Fixed' ? taxValue : 
                   (subtotal * (taxValue / 100));
  const discountAmount = discountType === 'None' ? 0 : 
                        discountType === 'Fixed' ? discountValue : 
                        (subtotal * (discountValue / 100));
  const total = subtotal + taxAmount - discountAmount;
  const balance = total;

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const handleSenderChange = (field, value) => {
    setSenderDetails({ ...senderDetails, [field]: value });
  };

  const handleRecipientChange = (field, value) => {
    setRecipientDetails({ ...recipientDetails, [field]: value });
  };

  const handleInvoiceDetailsChange = (field, value) => {
    setInvoiceDetails({ ...invoiceDetails, [field]: value });
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: field === 'qty' || field === 'rate' ? parseFloat(value) || 0 : value } : item
    ));
  };

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    setItems([...items, { id: newId, description: '', qty: 1, rate: 0 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const colorOptions = [
    '#1E90FF', '#000000', '#333333', '#555555', '#FF0000', '#CC0000', '#990099',
    '#0000FF', '#3366FF', '#00AAFF', '#00CC00', '#669900', '#FFCC00', '#FF6600'
  ];

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignature(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const triggerSignatureInput = () => {
    signatureInputRef.current.click();
  };

  const handleCurrencyChange = (value) => {
    setCurrency(value);
    switch (value) {
      case 'USD':
        setCurrencySymbol('$');
        break;
      case 'EUR':
        setCurrencySymbol('€');
        break;
      case 'GBP':
        setCurrencySymbol('£');
        break;
      default:
        setCurrencySymbol('₹');
    }
  };

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const generatePDF = () => {
    // Since we can't use PDF libraries, we'll open a print dialog instead
    // that allows saving as PDF
    if (!invoiceRef.current) return;
    
    const printContent = document.createElement('div');
    printContent.innerHTML = invoiceRef.current.innerHTML;
    
    // Apply some basic styles for printing
    const style = document.createElement('style');
    style.textContent = `
      body { font-family: Arial, sans-serif; padding: 20px; }
      input, select, button { border: none; background: none; font-size: inherit; }
      textarea { border: none; background: none; font-size: inherit; }
      .print-only { display: block !important; }
    `;
    printContent.prepend(style);
    
    // Create a new window for printing
    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) {
      alert("Please allow popups to print/save as PDF");
      return;
    }
    
    printWindow.document.write('<html><head><title>' + invoiceTitle + '</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.focus();
    
    // Give a moment for content to load before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const sendEmail = () => {
    if (!recipientDetails.email) {
      showToastNotification('Please add recipient email address');
      return;
    }
    
    const subject = encodeURIComponent(`${invoiceTitle} ${invoiceDetails.number}`);
    const body = encodeURIComponent(`Dear ${recipientDetails.name},\n\nPlease find attached invoice ${invoiceDetails.number} for your review.\n\nTotal Amount: ${currencySymbol}${balance.toFixed(2)}\nDue Date: Based on terms: ${invoiceDetails.terms}\n\nThank you for your business.\n\nRegards,\n${senderDetails.name}`);
    
    window.location.href = `mailto:${recipientDetails.email}?subject=${subject}&body=${body}`;
    showToastNotification('Email client opened with invoice details');
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg">
          <div className="p-1 bg-blue-400 rounded-full">
            <Mail size={16} />
          </div>
          <span>{toastMessage}</span>
          <button onClick={() => setShowToast(false)} className="ml-2 p-1 hover:bg-blue-600 rounded-full">
            <X size={16} />
          </button>
        </div>
      )}
      
      <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'editor' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('editor')}
          >
            Preview
          </button>
          <div className="ml-auto flex p-2 gap-2">
            <button onClick={generatePDF} className="px-4 py-1 text-sm bg-green-500 text-white rounded flex items-center gap-1">
              <Download size={14} /> Save/Print
            </button>
            <button onClick={sendEmail} className="px-4 py-1 text-sm bg-blue-500 text-white rounded flex items-center gap-1">
              <Mail size={14} /> Email Invoice
            </button>
          </div>
        </div>

        {/* Invoice Editor */}
        <div className="p-6" ref={invoiceRef}>
          {/* Invoice Title */}
          <div className="flex justify-between mb-8">
            <h1>Invoice</h1>
            <div 
              className="border border-gray-300 rounded w-32 h-16 flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={triggerFileInput}
            >
              {logo ? (
                <img src={logo} alt="Logo" className="max-w-full max-h-full object-contain" />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <Camera size={16} />
                  <span className="text-xs mt-1">+ Add Logo</span>
                </div>
              )}
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleLogoUpload}
              />
            </div>
          </div>

          {/* From and Bill To */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* From */}
            <div className="flex-1">
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

            {/* Bill To */}
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-2">Bill To</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-500">Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-1 text-sm"
                    value={recipientDetails.name}
                    onChange={(e) => handleRecipientChange('name', e.target.value)}
                    placeholder="Client Name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded p-1 text-sm"
                    value={recipientDetails.email}
                    onChange={(e) => handleRecipientChange('email', e.target.value)}
                    placeholder="name@client.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Address</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-1 text-sm"
                    value={recipientDetails.address}
                    onChange={(e) => handleRecipientChange('address', e.target.value)}
                    placeholder="Street"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Phone</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-1 text-sm"
                    value={recipientDetails.phone}
                    onChange={(e) => handleRecipientChange('phone', e.target.value)}
                    placeholder="(123) 456-789"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Mobile</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-1 text-sm"
                    value={recipientDetails.mobile}
                    onChange={(e) => handleRecipientChange('mobile', e.target.value)}
                    placeholder="(123) 456-789"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Fax</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-1 text-sm"
                    value={recipientDetails.fax}
                    onChange={(e) => handleRecipientChange('fax', e.target.value)}
                    placeholder="(123) 456-789"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-48">
                <label className="block text-xs text-gray-500 mb-1">Number</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-1 text-sm"
                    value={invoiceDetails.number}
                    onChange={(e) => handleInvoiceDetailsChange('number', e.target.value)}
                    placeholder="INV-0001"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <label className="block text-xs text-gray-500 mb-1">Date</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-1 text-sm"
                  value={invoiceDetails.date}
                  onChange={(e) => handleInvoiceDetailsChange('date', e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <label className="block text-xs text-gray-500 mb-1">Terms</label>
                <select
                  className="w-full border border-gray-300 rounded p-1 text-sm"
                  value={invoiceDetails.terms}
                  onChange={(e) => handleInvoiceDetailsChange('terms', e.target.value)}
                >
                  <option value="30 days net">30 days net</option>
                  <option value="14 days net">14 days net</option>
                  <option value="Due on receipt">Due on receipt</option>
                </select>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-xs uppercase text-gray-500">
                    <th className="px-2 py-1 text-left w-8"></th>
                    <th className="px-2 py-1 text-left">Description</th>
                    <th className="px-2 py-1 text-right w-16">QTY</th>
                    <th className="px-2 py-1 text-right w-20">RATE</th>
                    <th className="px-2 py-1 text-right w-24">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-2 py-2">
                        <button 
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded p-1 text-sm"
                          value={item.description}
                          onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                          placeholder="Item Description"
                        />
                        <textarea 
                          className="w-full border border-gray-300 rounded p-1 text-xs mt-1"
                          placeholder="Additional details"
                          rows={2}
                        ></textarea>
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded p-1 text-sm text-right"
                          value={item.qty}
                          onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded p-1 text-sm text-right"
                          value={item.rate}
                          onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                        />
                      </td>
                      <td className="px-2 py-2 text-right">
                        {currencySymbol}{(item.qty * item.rate).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button 
                className="flex items-center gap-1 text-white bg-gray-600 px-2 py-1 rounded text-sm"
                onClick={addItem}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-48">
              <div className="flex justify-between py-1">
                <span className="text-sm">Subtotal</span>
                <span className="text-sm">{currencySymbol}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sm">
                  Tax ({taxType === 'Fixed' ? currencySymbol + taxValue : taxValue + '%'})
                </span>
                <span className="text-sm">{currencySymbol}{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sm">
                  Discount ({discountType === 'Fixed' ? currencySymbol + discountValue : discountValue + '%'})
                </span>
                <span className="text-sm">-{currencySymbol}{discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-t border-gray-300">
                <span className="text-sm font-bold">Balance Due</span>
                <span className="text-sm font-bold">{currencySymbol}{balance.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-8">
            <h3 className="text-sm font-medium mb-2">Notes</h3>
            <textarea
              className="w-full border border-gray-300 rounded p-2 text-sm"
              rows={4}
              value={invoiceDetails.notes}
              onChange={(e) => handleInvoiceDetailsChange('notes', e.target.value)}
              placeholder="Notes – any relevant information not covered, additional terms and conditions"
            />
          </div>

          {/* Signature */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-blue-500 mb-2">Signature</h3>
            <div className="flex items-center">
              <div 
                className="border border-gray-300 rounded w-64 h-20 flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={triggerSignatureInput}
              >
                {signature ? (
                  <img src={signature} alt="Signature" className="max-w-full max-h-full object-contain" />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Plus size={16} />
                    <span className="text-xs mt-1">+ Add Signature</span>
                  </div>
                )}
                <input 
                  ref={signatureInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleSignatureUpload}
                />
              </div>
              <div className="ml-2">
                <button 
                  onClick={() => setSignature(defaultSignature)} 
                  className="text-xs text-blue-500 hover:underline"
                >
                  Use default signature
                </button>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500">{senderDetails.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sidebar */}
      <div className="w-full md:w-1/4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="font-medium text-sm mb-4">REVIEWS</h2>
          <div className="flex items-center mb-2">
            <span className="text-xs mr-2">Request reviews</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={reviewsEnabled}
                onChange={() => setReviewsEnabled(!reviewsEnabled)}
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-1 text-sm mb-4"
            value={reviewWebsite}
            onChange={(e) => setReviewWebsite(e.target.value)}
            placeholder="Review website link"
          />
          <p className="text-xs text-gray-500 mb-4">Grow your business by collecting rating and reviews</p>

          <h2 className="font-medium text-sm mb-2">COLOR</h2>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {colorOptions.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border border-gray-300 ${selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          <h2 className="font-medium text-sm mb-2">TAX</h2>
          <div className="flex gap-2 mb-4">
            <select
              className="w-1/2 border border-gray-300 rounded p-1 text-sm"
              value={taxType}
              onChange={(e) => setTaxType(e.target.value)}
            >
              <option value="None">None</option>
              <option value="Percentage">Percentage</option>
              <option value="Fixed">Fixed</option>
            </select>
            {taxType !== 'None' && (
              <input
                type="number"
                className="w-1/2 border border-gray-300 rounded p-1 text-sm"
                value={taxValue}
                onChange={(e) => setTaxValue(parseFloat(e.target.value) || 0)}
                placeholder={taxType === 'Fixed' ? "Amount" : "Percentage"}
              />
            )}
          </div>

          <h2 className="font-medium text-sm mb-2">DISCOUNT</h2>
          <div className="flex gap-2 mb-4">
            <select
              className="w-1/2 border border-gray-300 rounded p-1 text-sm"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="None">None</option>
              <option value="Percentage">Percentage</option>
              <option value="Fixed">Fixed</option>
            </select>
            {discountType !== 'None' && (
              <input
                type="number"
                className="w-1/2 border border-gray-300 rounded p-1 text-sm"
                value={discountValue}
                onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                placeholder={discountType === 'Fixed' ? "Amount" : "Percentage"}
              />
            )}
          </div>

          <h2 className="font-medium text-sm mb-2">CURRENCY</h2>
          <div className="relative mb-4">
            <select
              className="w-full border border-gray-300 rounded p-1 pl-8 text-sm appearance-none"
              value={currency}
              onChange={(e) => handleCurrencyChange(e.target.value)}
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
            <span className="absolute inset-y-0 left-2 flex items-center">{currencySymbol}</span>
          </div>
        </div>
      </div>
    </div>
  );
};