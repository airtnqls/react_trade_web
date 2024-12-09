import React, { useState, useMemo } from 'react';
import { ProfitsTable } from '../components/profits/ProfitsTable';
import { DateRangeFilter } from '../components/profits/DateRangeFilter';
import { ProfitSummary } from '../components/profits/ProfitSummary';
import type { ProfitRecord } from '../types/profits';

export function ProfitsPage() {
  const [startDate, setStartDate] = useState('2024-02-01');
  const [endDate, setEndDate] = useState('2024-02-28');

  // Mock data - replace with actual data from your API
  const allRecords: ProfitRecord[] = [
    {
      date: '2024-02-01',
      amount: 10000000,
      profit: 150000,
      growthRate: 1.5,
      tradeCount: 25,
      deposit: 0,
      predictedGrowthRate3000: 4500000,
      averageGrowthRate: 1.2,
      averageGrowthRate3000: 3600000,
      actualAmount: 10150000,
      recoveryRate: 101.5,
    },
    {
      date: '2024-02-02',
      amount: 10150000,
      profit: -203000,
      growthRate: -2.0,
      tradeCount: 30,
      deposit: 1000000,
      predictedGrowthRate3000: 6000000,
      averageGrowthRate: -1.75,
      averageGrowthRate3000: 5250000,
      actualAmount: 10947000,
      recoveryRate: 98.2,
    },
    // Add more mock data as needed
  ];

  const filteredRecords = useMemo(() => {
    return allRecords.filter(record => {
      const recordDate = record.date;
      return recordDate >= startDate && recordDate <= endDate;
    });
  }, [allRecords, startDate, endDate]);

  const summary = useMemo(() => {
    return filteredRecords.reduce((acc, record) => ({
      totalProfit: acc.totalProfit + record.profit,
      averageGrowthRate: acc.averageGrowthRate + record.growthRate,
      totalTrades: acc.totalTrades + record.tradeCount,
      recoveryRate: acc.recoveryRate + record.recoveryRate,
    }), {
      totalProfit: 0,
      averageGrowthRate: 0,
      totalTrades: 0,
      recoveryRate: 0,
    });
  }, [filteredRecords]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">투자 수익 기록</h2>
        <p className="text-sm text-gray-500">일별 투자 수익과 예측 데이터를 확인하세요.</p>
      </div>

      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <ProfitSummary
        totalProfit={summary.totalProfit}
        averageGrowthRate={summary.averageGrowthRate / filteredRecords.length}
        totalTrades={summary.totalTrades}
        recoveryRate={summary.recoveryRate / filteredRecords.length}
      />

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <ProfitsTable records={filteredRecords} />
        </div>
      </div>
    </div>
  );
}