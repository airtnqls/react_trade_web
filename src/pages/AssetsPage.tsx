import React, { useState, useEffect } from 'react';
import { NoticeBar } from '../components/assets/NoticeBar';
import { BalanceCard } from '../components/assets/BalanceCard';
import { AssetsTable } from '../components/assets/AssetsTable';
import type { AssetsOverview, AssetBalance } from '../types/assets';

export function AssetsPage() {
    // API에서 데이터를 가져오도록 상태를 추가합니다.
    const [overview, setOverview] = useState<AssetsOverview>({
      krwBalance: 0,
      totalAssets: 0,
      totalPurchase: 0,
      totalEvaluation: 0,
      totalProfitLoss: 0,
      profitRate: 0,
      availableOrder: 0,
    });
    const [assets, setAssets] = useState<AssetBalance[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/getAssets');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
  
          // overview 상태를 설정합니다.
          setOverview({
            krwBalance: data.krw_balance,
            totalAssets: data.total_assets_krw,
            totalPurchase: data.total_purchase_amount,
            totalEvaluation: data.total_evaluation_amount,
            totalProfitLoss: data.total_profit_loss,
            profitRate: data.profit_rate,
            availableOrder: data.available_order,
          });
  
          // assets 상태를 설정합니다.
          const formattedAssets = data.assets_list?.map((asset: any) => ({
            symbol: asset.name.toUpperCase(),
            amount: asset.balance,
            averagePrice: asset.avg_price,
            purchaseAmount: asset.purchase_amount,
            evaluationAmount: asset.evaluation_amount,
            profitLoss: asset.profit_loss,
            profitLossPercentage: asset.profit_rate,
          }));
          setAssets(formattedAssets);
        } catch (error) {
          console.error('Failed to fetch assets data:', error);
        } finally {
          setIsLoading(false); // 데이터 로딩 완료
        }
      };
  
      fetchData();
    }, []);
  
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