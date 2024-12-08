// INSERT_YOUR_REWRITE_HERE

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  Bot,
  MessageSquare,
  History,
  TrendingUp,
  FileText,
  Key,
  ShoppingCart,
  Bitcoin,
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: '대시보드' },
  { path: '/assets', icon: Wallet, label: '자산현황' },
  { path: '/markets', icon: Bitcoin, label: '마켓' },
  { path: '/tradebot', icon: Bot, label: '거래봇' },
  { path: '/chatbot', icon: MessageSquare, label: '챗봇' },
  { path: '/trades', icon: History, label: '거래내역' },
  { path: '/profits', icon: TrendingUp, label: '투자손익' },
  { path: '/orders', icon: ShoppingCart, label: '주문' },
  { path: '/logs', icon: FileText, label: '로그' },
  { path: '/api', icon: Key, label: 'API현황' },
];

interface NavigationProps {
    isCollapsed: boolean;
  }

export function Navigation({ isCollapsed }: NavigationProps) {
  return (
    <nav className={`bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 ${isCollapsed ? 'w-24' : 'w-64'}`}> {/* 여기에 클래스를 추가합니다. */}
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8 justify-center">
          <Bot className="w-7 h-7 text-blue-500 " />
          {!isCollapsed && (
            <h1 className="text-2xl font-bold text-blue-900">BitBot</h1>
          )} 
        </div>
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
                } ${isCollapsed ? 'justify-center' : ''}`
              }
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">{label}</span>}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}