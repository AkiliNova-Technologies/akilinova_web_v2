import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ChatMessage,
  ChatSession,
  AIAgentConfig,
  ChatIntent,
  ChatStage,
  LeadData,
} from "../../types/chat";
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
  isConnected: false,
};

const generateId = () => crypto.randomUUID?.() || Math.random().toString(36).slice(2, 11);

const syncCurrentSession = (state: ChatState) => {
  if (!state.currentSession) return;

  const index = state.sessions.findIndex(
    (session) => session.id === state.currentSession?.id
  );

  if (index !== -1) {
    state.sessions[index] = state.currentSession;
  }
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createNewSession: (state) => {
      const now = new Date().toISOString();

      const newSession: ChatSession = {
        id: generateId(),
        messages: [
          {
            id: generateId(),
            content: state.aiAgent.welcomeMessage,
            sender: "ai",
            timestamp: now,
          },
        ],
        createdAt: now,
        updatedAt: now,
        currentIntent: "greeting",
        stage: "idle",
        leadData: {},
      };

      state.sessions.unshift(newSession);
      state.currentSession = newSession;
      state.isOpen = true;
      state.isMinimized = false;
      state.error = null;
    },

    setCurrentSession: (state, action: PayloadAction<string>) => {
      const session = state.sessions.find((s) => s.id === action.payload);
      if (session) {
        state.currentSession = session;
      }
    },

    addUserMessage: (state, action: PayloadAction<string>) => {
      if (!state.currentSession) return;

      state.currentSession.messages.push({
        id: generateId(),
        content: action.payload,
        sender: "user",
        timestamp: new Date().toISOString(),
      });

      state.currentSession.updatedAt = new Date().toISOString();
      syncCurrentSession(state);
    },

    addAIMessage: (state, action: PayloadAction<string>) => {
      if (!state.currentSession) return;

      state.currentSession.messages.push({
        id: generateId(),
        content: action.payload,
        sender: "ai",
        timestamp: new Date().toISOString(),
      });

      state.currentSession.updatedAt = new Date().toISOString();
      syncCurrentSession(state);
    },

    setAITyping: (state, action: PayloadAction<boolean>) => {
      if (!state.currentSession) return;

      state.currentSession.messages = state.currentSession.messages.filter(
        (message) => message.id !== "typing"
      );

      if (action.payload) {
        state.currentSession.messages.push({
          id: "typing",
          content: "",
          sender: "ai",
          timestamp: new Date().toISOString(),
          isTyping: true,
        });
      }

      state.currentSession.updatedAt = new Date().toISOString();
      syncCurrentSession(state);
    },

    setChatIntent: (state, action: PayloadAction<ChatIntent>) => {
      if (!state.currentSession) return;

      state.currentSession.currentIntent = action.payload;
      state.currentSession.updatedAt = new Date().toISOString();
      syncCurrentSession(state);
    },

    setChatStage: (state, action: PayloadAction<ChatStage>) => {
      if (!state.currentSession) return;

      state.currentSession.stage = action.payload;
      state.currentSession.updatedAt = new Date().toISOString();
      syncCurrentSession(state);
    },

    updateLeadData: (state, action: PayloadAction<Partial<LeadData>>) => {
      if (!state.currentSession) return;

      state.currentSession.leadData = {
        ...state.currentSession.leadData,
        ...action.payload,
      };

      state.currentSession.updatedAt = new Date().toISOString();
      syncCurrentSession(state);
    },

    resetLeadData: (state) => {
      if (!state.currentSession) return;

      state.currentSession.leadData = {};
      state.currentSession.stage = "idle";
      state.currentSession.currentIntent = "greeting";
      state.currentSession.updatedAt = new Date().toISOString();
      syncCurrentSession(state);
    },

    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
      if (state.isOpen) state.isMinimized = false;
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
  setChatIntent,
  setChatStage,
  updateLeadData,
  resetLeadData,
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

export const selectChatState = (state: { chat: ChatState }) => state.chat;
export const selectIsChatOpen = (state: { chat: ChatState }) => state.chat.isOpen;
export const selectIsChatMinimized = (state: { chat: ChatState }) => state.chat.isMinimized;
export const selectCurrentSession = (state: { chat: ChatState }) => state.chat.currentSession;
export const selectAIAgent = (state: { chat: ChatState }) => state.chat.aiAgent;
export const selectIsConnected = (state: { chat: ChatState }) => state.chat.isConnected;
export const selectChatLoading = (state: { chat: ChatState }) => state.chat.loading;
export const selectChatError = (state: { chat: ChatState }) => state.chat.error;
export const selectLeadData = (state: { chat: ChatState }) =>
  state.chat.currentSession?.leadData;
export const selectChatStage = (state: { chat: ChatState }) =>
  state.chat.currentSession?.stage;
export const selectChatIntent = (state: { chat: ChatState }) =>
  state.chat.currentSession?.currentIntent;