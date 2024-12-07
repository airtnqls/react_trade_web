import React from 'react';

interface BalanceCardProps {
  title: string;
  amount: number;
  isHighlighted?: boolean;
  isProfit?: boolean;
}

export function BalanceCard({ title, amount, isHighlighted, isProfit }: BalanceCardProps) {
  const getAmountColor = () => {
    if (isProfit === undefined) return 'text-gray-900';
    return isProfit ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className={`p-4 rounded-lg ${isHighlighted ? 'bg-blue-50' : 'bg-white'}`}>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className={`text-lg font-bold ${getAmountColor()}`}>
        {isProfit && amount > 0 && '+'}
        {amount.toLocaleString('ko-KR')} {title.includes('률') ? '%' : 'KRW'}
      </p>
    </div>
  );
}