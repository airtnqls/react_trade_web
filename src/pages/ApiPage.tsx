import React, { useState, useEffect } from 'react';
import { Key, RefreshCw, Save } from 'lucide-react';
import { fetchApi, putApi } from '../utils/api';
import type { ApiConfig } from '../types/api';

export function ApiPage() {
  const [config, setConfig] = useState<ApiConfig>({
    exchange: {
      UPBIT_ACCESS_KEY: '',
      UPBIT_SECRET_KEY: '',
    },
    chatbot: {
      GEMINI_API_KEY: '',
      GEMINI_MODEL: '',
      TEMPERATURE: 1.0,
      TOP_P: 1.0,
      TOP_K: 36,
      MAX_TOKEN: 4000,
    },
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    const data = await fetchApi<ApiConfig>('/config');
    if (data) {
      setConfig(data);
    }
  };

  const handleSave = async () => {
    await putApi('/config', config);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">API 설정</h2>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="w-4 h-4" />
          <span>저장</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">거래소 API</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Access Key
              </label>
              <input
                type="text"
                value={config.exchange.UPBIT_ACCESS_KEY}
                onChange={(e) => setConfig({
                  ...config,
                  exchange: { ...config.exchange, UPBIT_ACCESS_KEY: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secret Key
              </label>
              <input
                type="password"
                value={config.exchange.UPBIT_SECRET_KEY}
                onChange={(e) => setConfig({
                  ...config,
                  exchange: { ...config.exchange, UPBIT_SECRET_KEY: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">챗봇 API</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gemini API Key
              </label>
              <input
                type="text"
                value={config.chatbot.GEMINI_API_KEY}
                onChange={(e) => setConfig({
                  ...config,
                  chatbot: { ...config.chatbot, GEMINI_API_KEY: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                value={config.chatbot.GEMINI_MODEL}
                onChange={(e) => setConfig({
                  ...config,
                  chatbot: { ...config.chatbot, GEMINI_MODEL: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={config.chatbot.TEMPERATURE}
                  onChange={(e) => setConfig({
                    ...config,
                    chatbot: { ...config.chatbot, TEMPERATURE: parseFloat(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Top P
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={config.chatbot.TOP_P}
                  onChange={(e) => setConfig({
                    ...config,
                    chatbot: { ...config.chatbot, TOP_P: parseFloat(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Top K
                </label>
                <input
                  type="number"
                  value={config.chatbot.TOP_K}
                  onChange={(e) => setConfig({
                    ...config,
                    chatbot: { ...config.chatbot, TOP_K: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Token
                </label>
                <input
                  type="number"
                  value={config.chatbot.MAX_TOKEN}
                  onChange={(e) => setConfig({
                    ...config,
                    chatbot: { ...config.chatbot, MAX_TOKEN: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}