import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Maximize2, Minimize2, Download } from 'lucide-react';

export function DebugConsole() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/print');
        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        setMessages(prev => [...prev, ...data]);
      } catch (error) {
        console.error('Failed to fetch debug messages:', error);
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

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700"
      >
        <Terminal className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-0 right-0 bg-gray-900 text-gray-100 font-mono text-sm ${
        isExpanded ? 'w-full h-1/2' : 'w-96 h-48'
      } transition-all duration-200 ease-in-out shadow-xl`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4" />
          <span className="font-semibold">Debug Console</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClear}
            className="p-1 hover:bg-gray-700 rounded"
            title="Clear console"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            className="p-1 hover:bg-gray-700 rounded"
            title="Download logs"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-700 rounded"
            title={isExpanded ? 'Minimize' : 'Maximize'}
          >
            {isExpanded ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-700 rounded"
            title="Hide console"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div
        ref={consoleRef}
        className="p-4 h-[calc(100%-2.5rem)] overflow-y-auto space-y-1"
      >
        {messages.map((message, index) => (
          <div key={index} className="font-mono">
            <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>{' '}
            {message}
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-gray-500 italic">No messages to display</div>
        )}
      </div>
    </div>
  );
}