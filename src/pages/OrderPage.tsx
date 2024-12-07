import React from 'react';

export function OrderPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">미체결 주문</h2>
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시간</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">레벨</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">메시지</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Add log entries here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}