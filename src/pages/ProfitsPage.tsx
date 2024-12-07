import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function ProfitsPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">투자손익</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm text-gray-500 mb-2">총 수익</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">+12.5%</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Add profit chart here */}
      </div>
    </div>
  );
}