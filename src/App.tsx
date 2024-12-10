import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { BotCard } from './components/BotCard';
import { RecentTrades } from './components/RecentTrades';
import { AssetsPage } from './pages/AssetsPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { LogsPage } from './pages/LogsPage';
import { ApiPage } from './pages/ApiPage';
import { ProfitsPage } from './pages/ProfitsPage';
import { TradebotPage } from './pages/TradebotPage';
import { OrderPage } from './pages/OrderPage';
import { MarketPage } from './pages/MarketPage';
import { DebugConsolePage } from './pages/DebugConsolePage';
import { RecentTradesPage } from './pages/RecentTradesPage';

function Dashboard() {
  const stats = {
    dailyProfit: 2.5,
    weeklyProfit: 8.3,
    monthlyProfit: 15.7,
    totalTrades: 1234,
    successRate: 68,
  };

  const bots = [
    {
      id: '1',
      name: 'BTC/USDT 스캘핑',
      status: 'active' as const,
      strategy: 'Scalping',
      profit: 3.2,
      trades: 156,
      lastActive: new Date(),
    },
    {
      id: '2',
      name: 'ETH/USDT 그리드',
      status: 'paused' as const,
      strategy: 'Grid',
      profit: -1.5,
      trades: 89,
      lastActive: new Date(),
    },
    {
      id: '3',
      name: 'SOL/USDT DCA',
      status: 'stopped' as const,
      strategy: 'DCA',
      profit: 5.7,
      trades: 45,
      lastActive: new Date(),
    },
  ];

  const trades = [
    {
      id: '1',
      pair: 'BTC/USDT',
      type: 'buy' as const,
      amount: 0.05,
      price: 65000,
      timestamp: new Date(),
      status: 'completed' as const,
    },
    {
      id: '2',
      pair: 'ETH/USDT',
      type: 'sell' as const,
      amount: 1.2,
      price: 3500,
      timestamp: new Date(),
      status: 'pending' as const,
    },
    {
      id: '3',
      pair: 'SOL/USDT',
      type: 'buy' as const,
      amount: 10,
      price: 120,
      timestamp: new Date(),
      status: 'completed' as const,
    },
  ];

  const handleToggleStatus = (botId: string) => {
    console.log('Toggling status for bot:', botId);
  };

  return (
    <div className="p-6">
      <StatsOverview stats={stats} />
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">활성 봇</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <BotCard
              key={bot.id}
              bot={bot}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      </div>

      <RecentTrades trades={trades} />
    </div>
  );
}

export function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation isCollapsed={isCollapsed} />
        <div className={isCollapsed ? 'pl-24' : 'pl-64'}> 
          <Header />
          <main className="container mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/assets" element={<AssetsPage />} />
              <Route path="/markets" element={<MarketPage />} />
              <Route path="/tradebot" element={<TradebotPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/trades" element={<RecentTradesPage />} />
              <Route path="/profits" element={<ProfitsPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/logs" element={<LogsPage />} />
              <Route path="/api" element={<ApiPage />} />
              <Route path="/debug" element={<DebugConsolePage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;