export interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  priceChange: number;
  volume: number;
  favorite: boolean;
}

export interface ChartData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Timeframe = '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w';