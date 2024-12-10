import React, { useState, useEffect } from 'react';
import { fetchApi } from '../utils/api';
import { DateRangeFilter } from '../components/common/DateRangeFilter';
import type { TradeHistory } from '../types/api';

export function RecentTradesPage() {
  const [trades, setTrades] = useState<TradeHistory[]>([]);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    fetchTrades();
  }, [startDate, endDate]);

  const fetchTrades = async () => {
    const data = await fetchApi<TradeHistory[]>(`/trades?start=${startDate}&end=${endDate}`);
    if (data) {
      setTrades(data);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">거래 내역</h2>

      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시간</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">페어</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">타입</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">가격</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">수량</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">총액</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trades.map((trade) => (
                <tr key={trade.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(trade.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {trade.pair}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      trade.type === 'buy' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {trade.type === 'buy' ? '매수' : '매도'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {trade.price.toLocaleString()} KRW
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {trade.amount.toFixed(8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {trade.total.toLocaleString()} KRW
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      trade.status === 'completed' ? 'bg-green-100 text-green-800' :
                      trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {trade.status === 'completed' ? '완료' :
                       trade.status === 'pending' ? '진행중' : '취소됨'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}