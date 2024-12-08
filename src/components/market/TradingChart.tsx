import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import type { ChartData } from '../../types/market';

interface TradingChartProps {
  data: ChartData[];
  timeframe: string;
}

export function TradingChart({ data, timeframe }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  const generateMockData = () => {
    const now = new Date();
    const data: ChartData[] = [];
    let price = 139000000;
    
    for (let i = 0; i < 100; i++) {
      const time = new Date(now.getTime() - (100 - i) * 60000);
      const open = price;
      const high = price * (1 + Math.random() * 0.02);
      const low = price * (1 - Math.random() * 0.02);
      const close = price * (1 + (Math.random() - 0.5) * 0.01);
      const volume = Math.floor(Math.random() * 100);
      
      data.push({
        timestamp: time.getTime() / 1000,
        open,
        high,
        low,
        close,
        volume,
      });
      
      price = close;
    }
    return data;
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const mockData = generateMockData();
    const chartOptions = {
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: '#f0f0f0',
      },
      timeScale: {
        borderColor: '#f0f0f0',
        timeVisible: true,
        secondsVisible: false,
      },
    };

    // Create main chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      ...chartOptions,
    });

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#ff5252',
      downColor: '#1976d2',
      borderVisible: false,
      wickUpColor: '#ff5252',
      wickDownColor: '#1976d2',
    });

    // Add MA lines
    const ma20Series = chart.addLineSeries({
      color: '#2196F3',
      lineWidth: 2,
      title: 'MA20',
    });

    const ma50Series = chart.addLineSeries({
      color: '#FF9800',
      lineWidth: 2,
      title: 'MA50',
    });

    // Calculate and set MA data
    const ma20Data = mockData.map((d, i, arr) => {
      if (i < 19) return null;
      const slice = arr.slice(i - 19, i + 1);
      const average = slice.reduce((sum, curr) => sum + curr.close, 0) / 20;
      return { time: d.timestamp, value: average };
    }).filter(d => d !== null);

    const ma50Data = mockData.map((d, i, arr) => {
      if (i < 49) return null;
      const slice = arr.slice(i - 49, i + 1);
      const average = slice.reduce((sum, curr) => sum + curr.close, 0) / 50;
      return { time: d.timestamp, value: average };
    }).filter(d => d !== null);

    ma20Series.setData(ma20Data);
    ma50Series.setData(ma50Data);

    // Create volume chart
    const volumeChart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 100,
      ...chartOptions,
      layout: {
        ...chartOptions.layout,
        fontFamily: 'Roboto',
      },
    });

    // Add volume series
    const volumeSeries = volumeChart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
    });

    // Set data
    candlestickSeries.setData(mockData.map(d => ({
      time: d.timestamp,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    })));

    volumeSeries.setData(mockData.map(d => ({
      time: d.timestamp,
      value: d.volume,
      color: d.close > d.open ? '#ff5252' : '#1976d2',
    })));

    // Sync charts
    chart.timeScale().subscribeVisibleTimeRangeChange(timeRange => {
      volumeChart.timeScale().setVisibleRange(timeRange);
    });

    volumeChart.timeScale().subscribeVisibleTimeRangeChange(timeRange => {
      chart.timeScale().setVisibleRange(timeRange);
    });

    chart.timeScale().fitContent();
    volumeChart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        const width = chartContainerRef.current.clientWidth;
        chart.applyOptions({ width });
        volumeChart.applyOptions({ width });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      volumeChart.remove();
    };
  }, [timeframe]);

  return (
    <div ref={chartContainerRef} className="w-full" />
  );
}