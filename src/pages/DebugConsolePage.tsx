import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Download } from 'lucide-react';

export function DebugConsolePage() {
  const [messages, setMessages] = useState<string[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/print');
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data)) {
          setMessages(prev => [...prev, ...data]);
        }
      } catch (error) {
        // Silently handle errors
      }
    };

    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClear = () => {
    setMessages([]);
  };

  const handleDownload = () => {
    const blob = new Blob([messages.join('\n')], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'debug-log.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">디버그 콘솔</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleClear}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            >
              <div className="flex items-center space-x-1">
                <X className="w-4 h-4" />
                <span>Clear</span>
              </div>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            >
              <div className="flex items-center space-x-1">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </div>
            </button>
          </div>
        </div>
        <div
          ref={consoleRef}
          className="h-[calc(100vh-12rem)] overflow-y-auto bg-gray-900 p-4 font-mono text-sm"
        >
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className="text-gray-100">
                <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>{' '}
                {message}
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">No messages to display</div>
          )}
        </div>
      </div>
    </div>
  );
}