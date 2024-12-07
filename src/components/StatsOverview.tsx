import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import type { BotStats } from '../types';

interface StatsOverviewProps {
  stats: BotStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">일일 수익</p>
            <p className={`text-2xl font-bold ${stats.dailyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.dailyProfit >= 0 ? '+' : ''}{stats.dailyProfit}%
            </p>
          </div>
          {stats.dailyProfit >= 0 ? (
            <TrendingUp className="w-8 h-8 text-green-500" />
          ) : (
            <TrendingDown className="w-8 h-8 text-red-500" />
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">총 거래량</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalTrades}</p>
          </div>
          <Activity className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">성공률</p>
            <p className="text-2xl font-bold text-green-600">{stats.successRate}%</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 font-semibold">{stats.successRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}