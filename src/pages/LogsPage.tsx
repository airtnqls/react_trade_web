import React, { useState, useEffect } from 'react';
import { fetchApi } from '../utils/api';
import { DateRangeFilter } from '../components/common/DateRangeFilter';
import type { SystemLog } from '../types/api';

export function LogsPage() {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    fetchLogs();
  }, [startDate, endDate]);

  const fetchLogs = async () => {
    const data = await fetchApi<SystemLog[]>(`/logs?start=${startDate}&end=${endDate}`);
    if (data) {
      setLogs(data);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">시스템 로그</h2>
      
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">레벨</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">메시지</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상세</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${log.level === 'error' ? 'bg-red-100 text-red-800' :
                        log.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.message}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}