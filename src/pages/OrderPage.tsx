import React, { useState, useEffect } from 'react';
import { fetchApi } from '../utils/api';
import { DateRangeFilter } from '../components/common/DateRangeFilter';
import type { Order } from '../types/api';

export function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    fetchOrders();
  }, [startDate, endDate]);

  const fetchOrders = async () => {
    const data = await fetchApi<Order[]>(`/orders?start=${startDate}&end=${endDate}`);
    if (data) {
      setOrders(data);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">미체결 주문</h2>

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
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">체결</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.pair}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.type === 'buy' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.type === 'buy' ? '매수' : '매도'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {order.price.toLocaleString()} KRW
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {order.amount.toFixed(8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {order.filled.toFixed(8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'filled' ? 'bg-green-100 text-green-800' :
                      order.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status === 'filled' ? '체결완료' :
                       order.status === 'partial' ? '부분체결' :
                       order.status === 'cancelled' ? '취소됨' :
                       '미체결'}
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