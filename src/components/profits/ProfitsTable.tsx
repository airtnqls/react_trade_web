import React from 'react';
import type { ProfitRecord } from '../../types/profits';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ProfitsTableProps {
  records: ProfitRecord[];
}

export function ProfitsTable({ records }: ProfitsTableProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatPercentage = (num: number, withColor = true) => {
    const formatted = `${num >= 0 ? '+' : ''}${formatNumber(num)}%`;
    if (!withColor) return formatted;
    return (
      <span className={`flex items-center justify-end space-x-1 ${num >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {num >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
        <span>{formatted}</span>
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th colSpan={7} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50/50">
              기록
            </th>
            <th colSpan={4} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-green-50/50">
              예측
            </th>
          </tr>
          <tr className="bg-white">
            <th className="sticky top-0 px-3 py-2 text-left text-xs font-medium text-gray-500 bg-blue-50/50">날짜</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-blue-50/50">금액</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-blue-50/50">수익</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-blue-50/50">증가율</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-blue-50/50">매매횟수</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-blue-50/50">입출금</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-blue-50/50 border-r border-gray-200">회수율</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-green-50/50">증가율x3000</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-green-50/50">평균 증가율</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-green-50/50">평균 증가율x3000</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-green-50/50">실수령액</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.map((record, index) => (
            <tr key={record.date} className={`
              ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
              hover:bg-blue-50/30 transition-colors duration-150
            `}>
              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{record.date}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-medium text-gray-900">{formatCurrency(record.amount)}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-right">
                <span className={record.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(record.profit)}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-right">{formatPercentage(record.growthRate)}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">{record.tradeCount}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-right">{formatCurrency(record.deposit)}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-right border-r border-gray-200">
                {formatPercentage(record.recoveryRate)}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-right">{formatCurrency(record.predictedGrowthRate3000)}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-right">{formatPercentage(record.averageGrowthRate)}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-right">{formatCurrency(record.averageGrowthRate3000)}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-medium">
                <span className={record.actualAmount >= record.amount ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(record.actualAmount)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}