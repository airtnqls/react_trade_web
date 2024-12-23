export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Prompt {
  date: string;
  title: string;
  content: string;
}