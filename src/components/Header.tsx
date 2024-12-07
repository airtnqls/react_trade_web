import React from 'react';
import { useLocation } from 'react-router-dom';
import { Settings, Moon, Bell } from 'lucide-react';

export function Header() {
  const location = useLocation();
  let title = "트레이딩 봇 대시보드";

  switch (location.pathname) {
    case "/assets":
      title = "자산";
      break;
    case "/markets":
      title = "마켓";
      break;
    case "/tradebot":
      title = "거래 봇";
      break;
    case "/chatbot":
      title = "챗봇";
      break;
    case "/trades":
      title = "최근 거래";
      break;
    case "/profits":
      title = "투자 손익";
      break;
    case "/orders":
      title = "주문";
      break;
    case "/logs":
      title = "로그";
      break;
    case "/api":
      title = "API";
      break;
    default:
      title = "트레이딩 봇 대시보드";
  }


  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Moon className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}