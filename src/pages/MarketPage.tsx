import React, { useState } from 'react';
import { MarketList } from '../components/market/MarketList';
import { ChartHeader } from '../components/market/ChartHeader';
import { TradingChart } from '../components/market/TradingChart';
import { OrderBook } from '../components/market/OrderBook';
import { OrderForm } from '../components/market/OrderForm';
import type { MarketItem } from '../types/market';

const mockMarkets: MarketItem[] = [
  { symbol: 'BTC/KRW', name: '비트코인', price: 139099000, priceChange: 0.10, volume: 298077623413, favorite: true },
  { symbol: 'ETH/KRW', name: '이더리움', price: 5536000, priceChange: -0.47, volume: 164194000000, favorite: true },
  { symbol: 'XRP/KRW', name: '리플', price: 3527, priceChange: -2.89, volume: 2136443000000, favorite: false },
  { symbol: 'DOGE/KRW', name: '도지코인', price: 632.8, priceChange: 0.46, volume: 1547813000000, favorite: false },
];

export function MarketPage() {
  const [selectedMarket, setSelectedMarket] = useState('BTC/KRW');
  const [timeframe, setTimeframe] = useState('30m');
  const selectedMarketData = mockMarkets.find(m => m.symbol === selectedMarket) || mockMarkets[0];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* 차트와 주문 영역 */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-white border-b border-gray-200">
          <ChartHeader
            symbol={selectedMarketData.symbol}
            price={selectedMarketData.price}
            priceChange={selectedMarketData.priceChange}
            volume={selectedMarketData.volume}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
          <TradingChart
            data={[]}
            timeframe={timeframe}
          />
        </div>
        
        {/* 주문 영역 */}
        <div className="h-80 flex border-t border-gray-200">
          <OrderBook symbol={selectedMarket} />
          <OrderForm symbol={selectedMarket} />
        </div>
      </div>

      {/* 마켓 리스트 */}
      <div className="w-96 bg-white border-l border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="검색"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="h-[calc(100%-4rem)] overflow-auto">
          <MarketList
            markets={mockMarkets}
            selectedMarket={selectedMarket}
            onSelectMarket={setSelectedMarket}
          />
        </div>
      </div>
    </div>
  );
}