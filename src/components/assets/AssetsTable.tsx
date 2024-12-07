import React from 'react';
import type { AssetBalance } from '../../types/assets';

interface AssetsTableProps {
  assets: AssetBalance[];
}

export function AssetsTable({ assets }: AssetsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">보유자산</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">보유수량</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매수평균가</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매수금액</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">평가금액</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">평가손익</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assets.map((asset) => (
            <tr key={asset.symbol}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {asset.symbol}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {asset.amount.toLocaleString('ko-KR')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {asset.averagePrice.toLocaleString('ko-KR')} KRW
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {asset.purchaseAmount.toLocaleString('ko-KR')} KRW
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {asset.evaluationAmount.toLocaleString('ko-KR')} KRW
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className={asset.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {asset.profitLoss >= 0 ? '+' : ''}{asset.profitLoss.toLocaleString('ko-KR')} KRW
                  <span className="ml-1 text-xs">
                    ({asset.profitLossPercentage >= 0 ? '+' : ''}{asset.profitLossPercentage.toFixed(2)}%)
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}