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


export type AIAgent = {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  welcomeMessage: string;
  responseDelay: number;
};

export type AIAgentConfig = AIAgent; 