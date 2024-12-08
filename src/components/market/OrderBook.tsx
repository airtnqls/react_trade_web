import React from 'react';

interface OrderBookProps {
  symbol: string;
}

export function OrderBook({ symbol }: OrderBookProps) {
  // Mock data for demonstration
  const asks = Array.from({ length: 15 }, (_, i) => ({
    price: 139100000 + i * 100000,
    amount: Math.random() * 2,
    total: Math.random() * 100000000
  })).reverse();

  const bids = Array.from({ length: 15 }, (_, i) => ({
    price: 139000000 - i * 100000,
    amount: Math.random() * 2,
    total: Math.random() * 100000000
  }));

  const currentPrice = 139099000;

  return (
    <div className="w-1/3 border-r border-gray-200 bg-white">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">호가</h3>
        <div className="flex space-x-2">
          <button className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900">
            새로고침
          </button>
        </div>
      </div>

      <div className="flex text-xs font-medium text-gray-500 px-3 py-2 border-b border-gray-200">
        <span className="w-1/3 text-right">가격(KRW)</span>
        <span className="w-1/3 text-right">수량({symbol.split('/')[0]})</span>
        <span className="w-1/3 text-right">누적량</span>
      </div>

      <div className="h-[calc(100%-8.5rem)] overflow-hidden">
        {/* Asks (매도) */}
        <div className="h-[calc(50%-1rem)] overflow-auto scrollbar-thin">
          {asks.map((ask, i) => (
            <div 
              key={i} 
              className="flex text-xs py-1.5 px-3 hover:bg-red-50 group cursor-pointer"
              style={{
                background: `linear-gradient(to left, rgba(254, 226, 226, 0.2) ${Math.min((ask.total / asks[0].total) * 100, 100)}%, transparent 0%)`
              }}
            >
              <span className="w-1/3 text-right font-medium text-red-500 group-hover:text-red-600">
                {ask.price.toLocaleString()}
              </span>
              <span className="w-1/3 text-right text-gray-600">
                {ask.amount.toFixed(4)}
              </span>
              <span className="w-1/3 text-right text-gray-600">
                {(ask.total / 1000000).toFixed(2)}M
              </span>
            </div>
          ))}
        </div>

        {/* Current Price */}
        <div className="py-2 px-3 bg-gray-50 border-y border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">현재가</span>
            <span className="text-sm font-bold text-red-500">{currentPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Bids (매수) */}
        <div className="h-[calc(50%-1rem)] overflow-auto scrollbar-thin">
          {bids.map((bid, i) => (
            <div 
              key={i} 
              className="flex text-xs py-1.5 px-3 hover:bg-blue-50 group cursor-pointer"
              style={{
                background: `linear-gradient(to left, rgba(219, 234, 254, 0.2) ${Math.min((bid.total / bids[0].total) * 100, 100)}%, transparent 0%)`
              }}
            >
              <span className="w-1/3 text-right font-medium text-blue-500 group-hover:text-blue-600">
                {bid.price.toLocaleString()}
              </span>
              <span className="w-1/3 text-right text-gray-600">
                {bid.amount.toFixed(4)}
              </span>
              <span className="w-1/3 text-right text-gray-600">
                {(bid.total / 1000000).toFixed(2)}M
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}