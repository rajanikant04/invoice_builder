import React, { useState, Dispatch, SetStateAction } from 'react';

interface TaxDiscountSectionProps {
  tax: number;
  setTax: Dispatch<SetStateAction<number>>;
  discount: number;
  setDiscount: Dispatch<SetStateAction<number>>;
}

const TaxDiscountSection: React.FC<TaxDiscountSectionProps> = ({ tax, setTax, discount, setDiscount }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Tax & Discount</h2>
      <div className="space-y-4">
        <div>
          <label className="block">Tax %</label>
          <input type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Flat Discount Amount</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="border p-2 w-full" />
        </div>
      </div>
    </div>
  );
};

export default TaxDiscountSection; 