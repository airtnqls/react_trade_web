import React from 'react';
import { AlertCircle } from 'lucide-react';

interface NoticeBarProps {
  message: string;
}

export function NoticeBar({ message }: NoticeBarProps) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg flex items-center">
      <AlertCircle className="w-5 h-5 text-blue-500 mr-3" />
      <p className="text-blue-700">{message}</p>
    </div>
  );
}