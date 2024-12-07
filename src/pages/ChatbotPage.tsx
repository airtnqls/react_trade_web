import React, { useState, useRef, useEffect } from 'react';
import { Save, Send } from 'lucide-react';
import { ChatMessage } from '../components/chatbot/ChatMessage';
import { PromptList } from '../components/chatbot/PromptList';
import type { ChatMessage as ChatMessageType, Prompt } from '../types/chatbot';
import { savePromptToFile, loadPromptsFromFile } from '../utils/filePromptManager';

export function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [promptTitle, setPromptTitle] = useState('');
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const updatePromptsList = async () => {
    try {
      const updatedPrompts = await loadPromptsFromFile();
      setPrompts(updatedPrompts);
    } catch (error) {
      console.error('Failed to update prompts list:', error);
    }
  };

  useEffect(() => {
    updatePromptsList();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!currentPrompt.trim()) return;

    const newMessage: ChatMessageType = {
      id: Date.now().toString(),
      content: currentPrompt,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setCurrentPrompt('');
  };

  const handleSavePrompt = async () => {
    if (!currentPrompt.trim() || !promptTitle.trim()) return;

    try {
      const newPrompt: Prompt = {
        date: Date.now().toString(),
        title: promptTitle,
        content: currentPrompt,
      };
      await savePromptToFile(newPrompt);
      await updatePromptsList();
      setPromptTitle('');
    } catch (error) {
      console.error('Failed to save prompt to file:', error);
    }
  };

  const handleSelectPrompt = (prompt: Prompt) => {
    setCurrentPrompt(prompt.content);
    setPromptTitle(prompt.title);
  };

  return (
    <div className="p-6 h-[calc(100vh-theme(spacing.16))]">
      <div className="bg-white rounded-lg shadow-md h-full flex">
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                value={promptTitle}
                onChange={(e) => setPromptTitle(e.target.value)}
                placeholder="프롬프트 제목"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSavePrompt}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700"
              >
                <Save className="w-5 h-5" />
                <span>저장</span>
              </button>
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-4">
              <textarea
                value={currentPrompt}
                onChange={(e) => setCurrentPrompt(e.target.value)}
                placeholder="프롬프트를 입력하세요..."
                className="flex-1 px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-6 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
              >
                <Send className="w-5 h-5" />
                <span>전송</span>
              </button>
            </div>
          </div>
        </div>

        <PromptList
          prompts={prompts}
          onSelectPrompt={handleSelectPrompt}
          onUpdatePrompts={updatePromptsList}
        />
      </div>
    </div>
  );
}