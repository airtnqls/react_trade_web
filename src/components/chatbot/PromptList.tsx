import React from 'react';
import { FileText } from 'lucide-react';
import type { Prompt } from '../../types/chatbot';

interface PromptListProps {
  prompts: Prompt[];
  onSelectPrompt: (prompt: Prompt) => void;
}

export function PromptList({ prompts, onSelectPrompt }: PromptListProps) {
  return (
    <div className="w-64 bg-gray-50 border-l border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4">저장된 프롬프트</h3>
      <div className="space-y-2">
        {prompts.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => onSelectPrompt(prompt)}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-100 flex items-center space-x-2"
          >
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700 truncate">{prompt.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}