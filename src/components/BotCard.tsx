import React from 'react';
import { Play, Pause, Power, Settings } from 'lucide-react';
import type { Bot } from '../types';

interface BotCardProps {
  bot: Bot;
  onToggleStatus: (id: string) => void;
}

export function BotCard({ bot, onToggleStatus }: BotCardProps) {
  const statusColor = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    stopped: 'bg-red-100 text-red-800',
  }[bot.status];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{bot.name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
            {bot.status}
          </span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onToggleStatus(bot.id)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {bot.status === 'active' ? (
              <Pause className="w-5 h-5 text-gray-600" />
            ) : (
              <Play className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5 text-gray-600" />
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
  );
}