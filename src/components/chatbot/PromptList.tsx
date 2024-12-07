import React, { useState } from 'react';
import { FileText, Edit, Trash2 } from 'lucide-react';
import type { Prompt } from '../../types/chatbot';
import { deletePromptFromFile, updatePromptInFile } from '../../utils/filePromptManager';

interface PromptListProps {
  prompts: Prompt[];
  onSelectPrompt: (prompt: Prompt) => void;
  onUpdatePrompts: (prompts: Prompt[]) => void;
}

export function PromptList({ prompts, onSelectPrompt, onUpdatePrompts }: PromptListProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleDelete = async (promptId: string) => {
    try {
      // 프롬프트 ID가 undefined인지 확인하고, undefined인 경우 함수를 종료합니다.
      if (!promptId) {
        console.error('Prompt ID is undefined');
        return;
      }

      await deletePromptFromFile(promptId);
      const updatedPrompts = prompts.filter((p) => p.title !== promptId);
      onUpdatePrompts(updatedPrompts);
    } catch (error) {
      console.error('Failed to delete prompt:', error);
    }
  };

  const handleEditStart = (prompt: Prompt) => {
    setIsEditing(prompt.title);
    setEditTitle(prompt.title);
    setEditContent(prompt.content);
  };

  const handleEditCancel = () => {
    setIsEditing(null);
    setEditTitle('');
    setEditContent('');
  };

  const handleEditSave = async (promptId: string) => {
    try {
      const updatedPrompt: Prompt = {
        date: Date.now().toString(),
        title: editTitle,
        content: editContent,
      };
      await updatePromptInFile(updatedPrompt);
      const updatedPrompts = prompts.map((p) => (p.title === promptId ? updatedPrompt : p));
      onUpdatePrompts(updatedPrompts);
      setIsEditing(null);
      setEditTitle('');
      setEditContent('');
    } catch (error) {
      console.error('Failed to update prompt:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(parseInt(dateString, 10));
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className="w-64 bg-gray-50 border-l border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4">저장된 프롬프트</h3>
      <div className="space-y-2">
        {prompts.map((prompt) => (
          <div key={prompt.title} className="p-3 rounded-lg hover:bg-gray-100">
            {isEditing === prompt.title ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-end space-x-2">
                  <button onClick={handleEditCancel} className="text-gray-500">
                    취소
                  </button>
                  <button onClick={() => handleEditSave(prompt.title)} className="text-blue-500">
                    저장
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-left flex flex-col space-y-1 w-full">
                <div
                  onClick={() => onSelectPrompt(prompt)}
                  className="flex items-center justify-between w-full cursor-pointer"
                >
                  <div className="flex items-center space-x-2 flex-grow truncate">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 truncate font-bold">{prompt.title}</span>
                  </div>
                  <div className="flex space-x-2 ml-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditStart(prompt);
                      }}
                      className="text-gray-500"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(prompt.title);
                      }}
                      className="text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div
                  onClick={() => onSelectPrompt(prompt)}
                  className="flex flex-col items-start text-xs text-gray-500 cursor-pointer"
                >
                  <span className="whitespace-nowrap">{formatDate(prompt.date)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}