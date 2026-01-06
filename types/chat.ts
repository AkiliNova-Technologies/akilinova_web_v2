export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  isTyping?: boolean;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AIAgentConfig {
  name: string;
  avatar: string;
  welcomeMessage: string;
  responseDelay?: number;
}

export interface AIAgent {
  id: string;
  name: string;
  avatar?: string;
  description: string;
}