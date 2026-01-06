import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatMessage, ChatSession, AIAgentConfig } from "../../types/chat";
import { aiAgentConfig } from "../../data/Chat";

interface ChatState {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  isOpen: boolean;
  isMinimized: boolean;
  loading: boolean;
  error: string | null;
  aiAgent: AIAgentConfig;
  isConnected: boolean;
}

const initialState: ChatState = {
  sessions: [],
  currentSession: null,
  isOpen: false,
  isMinimized: false,
  loading: false,
  error: null,
  aiAgent: aiAgentConfig,
  isConnected: false, // Track backend connection status
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Session management
    createNewSession: (state) => {
      const newSession: ChatSession = {
        id: generateId(),
        messages: [{
          id: generateId(),
          content: state.aiAgent.welcomeMessage,
          sender: 'ai',
          timestamp: new Date().toISOString(),
        }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      state.sessions.unshift(newSession);
      state.currentSession = newSession;
      state.isOpen = true;
      state.isMinimized = false;
    },

    setCurrentSession: (state, action: PayloadAction<string>) => {
      const session = state.sessions.find(s => s.id === action.payload);
      if (session) {
        state.currentSession = session;
      }
    },

    // Message management
    addUserMessage: (state, action: PayloadAction<string>) => {
      if (!state.currentSession) return;

      const userMessage: ChatMessage = {
        id: generateId(),
        content: action.payload,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };

      state.currentSession.messages.push(userMessage);
      state.currentSession.updatedAt = new Date().toISOString();
    },

    addAIMessage: (state, action: PayloadAction<string>) => {
      if (!state.currentSession) return;

      const aiMessage: ChatMessage = {
        id: generateId(),
        content: action.payload,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };

      state.currentSession.messages.push(aiMessage);
      state.currentSession.updatedAt = new Date().toISOString();
    },

    setAITyping: (state, action: PayloadAction<boolean>) => {
      if (!state.currentSession) return;

      if (action.payload) {
        const typingMessage: ChatMessage = {
          id: 'typing',
          content: '',
          sender: 'ai',
          timestamp: new Date().toISOString(),
          isTyping: true,
        };
        state.currentSession.messages.push(typingMessage);
      } else {
        state.currentSession.messages = state.currentSession.messages.filter(
          msg => msg.id !== 'typing'
        );
      }
    },

    // Connection management
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // UI state management
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
      if (state.isOpen) {
        state.isMinimized = false;
      }
    },

    openChat: (state) => {
      state.isOpen = true;
      state.isMinimized = false;
    },

    closeChat: (state) => {
      state.isOpen = false;
    },

    toggleMinimize: (state) => {
      state.isMinimized = !state.isMinimized;
    },

    minimizeChat: (state) => {
      state.isMinimized = true;
    },

    maximizeChat: (state) => {
      state.isMinimized = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearCurrentSession: (state) => {
      state.currentSession = null;
    },
  },
});

export const {
  createNewSession,
  setCurrentSession,
  addUserMessage,
  addAIMessage,
  setAITyping,
  setConnectionStatus,
  setLoading,
  setError,
  toggleChat,
  openChat,
  closeChat,
  toggleMinimize,
  minimizeChat,
  maximizeChat,
  clearError,
  clearCurrentSession,
} = chatSlice.actions;

export default chatSlice.reducer;

// Selectors
export const selectChatState = (state: { chat: ChatState }) => state.chat;
export const selectIsChatOpen = (state: { chat: ChatState }) => state.chat.isOpen;
export const selectIsChatMinimized = (state: { chat: ChatState }) => state.chat.isMinimized;
export const selectCurrentSession = (state: { chat: ChatState }) => state.chat.currentSession;
export const selectAIAgent = (state: { chat: ChatState }) => state.chat.aiAgent;
export const selectIsConnected = (state: { chat: ChatState }) => state.chat.isConnected;
export const selectChatLoading = (state: { chat: ChatState }) => state.chat.loading;
export const selectChatError = (state: { chat: ChatState }) => state.chat.error;