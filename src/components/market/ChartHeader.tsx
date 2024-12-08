import React from 'react';
import { Clock } from 'lucide-react';

interface ChartHeaderProps {
  symbol: string;
  price: number;
  priceChange: number;
  volume: number;
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

export function ChartHeader({
  symbol,
  price,
  priceChange,
  volume,
  timeframe,
  onTimeframeChange,
}: ChartHeaderProps) {
  const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w'];

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{symbol}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-3xl font-bold text-gray-900">{price.toLocaleString()} KRW</span>
            <span className={`text-lg ${priceChange >= 0 ? 'text-red-600' : 'text-blue-600'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange}%
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">거래대금</div>
          <div className="text-lg font-semibold">{volume.toLocaleString()} KRW</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-gray-400" />
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => onTimeframeChange(tf)}
            className={`px-3 py-1 rounded ${
              timeframe === tf
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>
    </div>
  );
}