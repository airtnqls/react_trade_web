import React from 'react';
import { NoticeBar } from '../components/assets/NoticeBar';
import { BalanceCard } from '../components/assets/BalanceCard';
import { AssetsTable } from '../components/assets/AssetsTable';
import type { AssetsOverview, AssetBalance } from '../types/assets';

export function AssetsPage() {
  // 실제 구현시 API에서 데이터를 가져와야 합니다
  const overview: AssetsOverview = {
    krwBalance: 1000000,
    totalAssets: 15000000,
    totalPurchase: 13500000,
    totalEvaluation: 15000000,
    totalProfitLoss: 1500000,
    profitRate: 11.11,
    availableOrder: 1000000,
  };

  const assets: AssetBalance[] = [
    {
      symbol: 'BTC',
      amount: 0.5,
      averagePrice: 50000000,
      purchaseAmount: 25000000,
      evaluationAmount: 28000000,
      profitLoss: 3000000,
      profitLossPercentage: 12,
    },
    // Add more assets as needed
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <NoticeBar 
        message="공지: 케이뱅크 시스템 정기 점검에 따른 원화 입출금 및 관련 서비스 일시 중단 안내 (12/07 23:50~)"
      />

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <BalanceCard title="보유 KRW" amount={overview.krwBalance} isHighlighted />
          <BalanceCard title="총 자산" amount={overview.totalAssets} isHighlighted />
        </div>

        <div className="h-px bg-gray-200 my-6" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <BalanceCard title="총 매수" amount={overview.totalPurchase} />
          <BalanceCard title="총 평가" amount={overview.totalEvaluation} />
          <BalanceCard 
            title="총 평가손익" 
            amount={overview.totalProfitLoss} 
            isProfit={overview.totalProfitLoss >= 0} 
          />
          <BalanceCard 
            title="수익률" 
            amount={overview.profitRate} 
            isProfit={overview.profitRate >= 0} 
          />
          <BalanceCard title="주문가능" amount={overview.availableOrder} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">보유자산 현황</h2>
        </div>
        <AssetsTable assets={assets} />
      </div>
    </div>
  );
}