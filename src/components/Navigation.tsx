import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  Bot,
  MessageSquare,
  History,
  TrendingUp,
  FileText,
  Key
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: '대시보드' },
  { path: '/assets', icon: Wallet, label: '자산현황' },
  { path: '/bots', icon: Bot, label: '거래봇' },
  { path: '/chatbot', icon: MessageSquare, label: '챗봇' },
  { path: '/trades', icon: History, label: '거래내역' },
  { path: '/profits', icon: TrendingUp, label: '투자손익' },
  { path: '/logs', icon: FileText, label: '로그' },
  { path: '/api', icon: Key, label: 'API현황' },
];

export function Navigation() {
  return (
    <nav className="bg-white border-r border-gray-200 w-64 min-h-screen fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-900 mb-8">트레이딩 봇</h1>
        <div className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}