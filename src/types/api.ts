export interface TradeHistory {
  id: string;
  date: string;
  pair: string;
  type: 'buy' | 'sell';
  price: number;
  amount: number;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  details?: string;
}

export interface Order {
  id: string;
  date: string;
  pair: string;
  type: 'buy' | 'sell';
  price: number;
  amount: number;
  filled: number;
  status: 'open' | 'partial' | 'filled' | 'cancelled';
}

export interface ApiConfig {
  exchange: {
    UPBIT_ACCESS_KEY: string;
    UPBIT_SECRET_KEY: string;
  };
  chatbot: {
    GEMINI_API_KEY: string;
    GEMINI_MODEL: string;
    TEMPERATURE: number;
    TOP_P: number;
    TOP_K: number;
    MAX_TOKEN: number;
  };
}