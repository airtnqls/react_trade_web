import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface OrderFormProps {
  symbol: string;
}

export function OrderForm({ symbol }: OrderFormProps) {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('limit');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const percentageButtons = ['10%', '25%', '50%', '100%'];
  const [selectedPercentage, setSelectedPercentage] = useState<string | null>(null);

  return (
    <div className="flex-1 bg-white">
      <div className="p-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">주문</h3>
      </div>

      <div className="p-4">
        {/* Order Type Selector */}
        <div className="flex mb-4 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setOrderType('limit')}
            className={`flex-1 py-2 text-sm font-medium rounded ${
              orderType === 'limit'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            지정가
          </button>
          <button
            onClick={() => setOrderType('market')}
            className={`flex-1 py-2 text-sm font-medium rounded ${
              orderType === 'market'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            시장가
          </button>
        </div>

        {/* Buy/Sell Selector */}
        <div className="flex mb-6 space-x-2">
          <button
            onClick={() => setSide('buy')}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
              side === 'buy'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            매수
          </button>
          <button
            onClick={() => setSide('sell')}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
              side === 'sell'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            매도
          </button>
        </div>

        <div className="space-y-4">
          {/* Price Input */}
          {orderType === 'limit' && (
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">주문가격</label>
                <span className="text-sm text-gray-500">KRW</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right pr-12"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <Calculator className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          )}
          
          {/* Amount Input */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">주문수량</label>
              <span className="text-sm text-gray-500">{symbol.split('/')[0]}</span>
            </div>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              placeholder="0"
            />
          </div>

          {/* Percentage Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {percentageButtons.map((percentage) => (
              <button
                key={percentage}
                onClick={() => setSelectedPercentage(percentage)}
                className={`py-2 text-sm font-medium rounded ${
                  selectedPercentage === percentage
                    ? 'bg-gray-200 text-gray-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {percentage}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            className={`w-full py-4 rounded-lg font-medium text-white transition-colors ${
              side === 'buy'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {side === 'buy' ? '매수' : '매도'}
          </button>
        </div>
      </div>
    </div>
  );
}