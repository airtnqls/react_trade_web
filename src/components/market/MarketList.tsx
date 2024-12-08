import React from 'react';
import { Star } from 'lucide-react';
import type { MarketItem } from '../../types/market';

interface MarketListProps {
  markets: MarketItem[];
  selectedMarket: string;
  onSelectMarket: (market: string) => void;
}

export function MarketList({ markets, selectedMarket, onSelectMarket }: MarketListProps) {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="sticky top-0 px-3 py-2 text-left text-xs font-medium text-gray-500 bg-gray-50">관심</th>
            <th className="sticky top-0 px-3 py-2 text-left text-xs font-medium text-gray-500 bg-gray-50">자산</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-gray-50">현재가</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-gray-50">변동률</th>
            <th className="sticky top-0 px-3 py-2 text-right text-xs font-medium text-gray-500 bg-gray-50">거래대금</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {markets.map((market) => (
            <tr
              key={market.symbol}
              onClick={() => onSelectMarket(market.symbol)}
              className={`cursor-pointer hover:bg-gray-50 ${
                selectedMarket === market.symbol ? 'bg-blue-50' : ''
              }`}
            >
              <td className="px-3 py-2 whitespace-nowrap">
                <Star className={`w-4 h-4 ${market.favorite ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">{market.symbol}</span>
                  <span className="text-xs text-gray-500">{market.name}</span>
                </div>
              </td>
              <td className="px-3 py-2 text-right whitespace-nowrap">
                <span className={`text-sm font-medium ${market.priceChange >= 0 ? 'text-red-600' : 'text-blue-600'}`}>
                  {market.price.toLocaleString()}
                </span>
              </td>
              <td className="px-3 py-2 text-right whitespace-nowrap">
                <span className={`text-sm ${market.priceChange >= 0 ? 'text-red-600' : 'text-blue-600'}`}>
                  {market.priceChange >= 0 ? '+' : ''}{market.priceChange}%
                </span>
              </td>
              <td className="px-3 py-2 text-right whitespace-nowrap">
                <span className="text-sm text-gray-900">{(market.volume / 1000000).toFixed(0)}M</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}