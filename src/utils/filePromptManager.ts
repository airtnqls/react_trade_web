import type { Prompt } from '../types/chatbot';

const promptDir = 'prompts'; // 서버 측 경로

export const savePromptToFile = async (prompt: Prompt) => {
  const response = await fetch('http://localhost:8000/api/savePrompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prompt),
  });

  if (!response.ok) {
    throw new Error('Failed to save prompt');
  }
};

export const loadPromptsFromFile = async (): Promise<Prompt[]> => {
  const response = await fetch('http://localhost:8000/api/loadPrompts');

  if (!response.ok) {
    throw new Error('Failed to load prompts');
  }

  return await response.json();
};

export const updatePromptInFile = async (prompt: Prompt) => {
  const response = await fetch(`http://localhost:8000/api/updatePrompt/${prompt.title}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prompt),
  });

  if (!response.ok) {
    throw new Error('Failed to update prompt');
  }
};

export const deletePromptFromFile = async (promptId: string) => {
  const response = await fetch(`http://localhost:8000/api/deletePrompt/${promptId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete prompt');
  }
};
