import React from 'react';
import { Key, RefreshCw } from 'lucide-react';

export function ApiPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">API 설정</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">API 키</h3>
            <button className="text-blue-600 hover:text-blue-700">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value="*******************"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secret Key
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value="*******************"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}