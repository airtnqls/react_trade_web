export interface Trade {
  id: string;
  pair: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

export interface Bot {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'stopped';
  strategy: string;
  profit: number;
  trades: number;
  lastActive: Date;
}

export interface BotStats {
  dailyProfit: number;
  weeklyProfit: number;
  monthlyProfit: number;
  totalTrades: number;
  successRate: number;
}