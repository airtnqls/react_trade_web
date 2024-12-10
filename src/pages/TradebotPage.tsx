import React, { useState, useEffect } from 'react';
import { fetchApi } from '../utils/api';
import type { Bot } from '../types';

export function TradebotPage() {
  const [bots, setBots] = useState<Bot[]>([]);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    const data = await fetchApi<Bot[]>('/bots');
    if (data) {
      setBots(data);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">거래 봇</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map((bot) => (
          <div key={bot.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{bot.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  bot.status === 'active' ? 'bg-green-100 text-green-800' :
                  bot.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {bot.status}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  {bot.status === 'active' ? '정지' : '시작'}
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  설정
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">수익률</p>
                <p className={`text-lg font-semibold ${bot.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {bot.profit >= 0 ? '+' : ''}{bot.profit}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">거래 횟수</p>
                <p className="text-lg font-semibold text-gray-900">{bot.trades}</p>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              마지막 활동: {new Date(bot.lastActive).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}