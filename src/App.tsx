import React from 'react';
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
      status: 'active',
      strategy: 'Scalping',
      profit: 3.2,
      trades: 156,
      lastActive: new Date(),
    },
    {
      id: '2',
      name: 'ETH/USDT 그리드',
      status: 'paused',
      strategy: 'Grid',
      profit: -1.5,
      trades: 89,
      lastActive: new Date(),
    },
    {
      id: '3',
      name: 'SOL/USDT DCA',
      status: 'stopped',
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
      type: 'buy',
      amount: 0.05,
      price: 65000,
      timestamp: new Date(),
      status: 'completed',
    },
    {
      id: '2',
      pair: 'ETH/USDT',
      type: 'sell',
      amount: 1.2,
      price: 3500,
      timestamp: new Date(),
      status: 'pending',
    },
    {
      id: '3',
      pair: 'SOL/USDT',
      type: 'buy',
      amount: 10,
      price: 120,
      timestamp: new Date(),
      status: 'completed',
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

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pl-64">
          <Header />
          <main className="container mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/assets" element={<AssetsPage />} />
              <Route path="/bots" element={<Dashboard />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/trades" element={<RecentTrades trades={[]} />} />
              <Route path="/profits" element={<ProfitsPage />} />
              <Route path="/logs" element={<LogsPage />} />
              <Route path="/api" element={<ApiPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;