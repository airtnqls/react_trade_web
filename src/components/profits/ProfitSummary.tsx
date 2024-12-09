import React from 'react';
import { TrendingUp, TrendingDown, Activity, Percent } from 'lucide-react';

interface ProfitSummaryProps {
  totalProfit: number;
  averageGrowthRate: number;
  totalTrades: number;
  recoveryRate: number;
}

export function ProfitSummary({
  totalProfit,
  averageGrowthRate,
  totalTrades,
  recoveryRate,
}: ProfitSummaryProps) {
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">총 수익</p>
            <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalProfit >= 0 ? '+' : ''}{formatCurrency(totalProfit)}
            </p>
          </div>
          {totalProfit >= 0 ? (
            <TrendingUp className="w-8 h-8 text-green-500" />
          ) : (
            <TrendingDown className="w-8 h-8 text-red-500" />
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">평균 증가율</p>
            <p className={`text-2xl font-bold ${averageGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {averageGrowthRate >= 0 ? '+' : ''}{averageGrowthRate.toFixed(2)}%
            </p>
          </div>
          <Percent className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">총 거래 횟수</p>
            <p className="text-2xl font-bold text-purple-600">{totalTrades.toLocaleString()}</p>
          </div>
          <Activity className="w-8 h-8 text-purple-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">평균 회수율</p>
            <p className={`text-2xl font-bold ${recoveryRate >= 100 ? 'text-green-600' : 'text-red-600'}`}>
              {recoveryRate.toFixed(2)}%
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className={`text-sm font-bold ${recoveryRate >= 100 ? 'text-green-600' : 'text-red-600'}`}>
              {recoveryRate >= 100 ? '↑' : '↓'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}