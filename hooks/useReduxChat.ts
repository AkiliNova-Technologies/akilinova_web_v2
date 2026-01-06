import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  createNewSession,
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
} from "../redux/slices/chatSlice";
import type { RootState } from "../redux/store";
import { useCallback } from "react";
import api from "../utils/api";


const mockAIResponses = [
  "That's a great question! At AkiliNova, we specialize in creating custom web and mobile applications that drive business growth.",
  "I'd be happy to tell you more about our services. We offer web development, mobile apps, AI solutions, and digital transformation consulting.",
  "Our typical project timeline ranges from 4-12 weeks depending on complexity. We follow an agile methodology to ensure timely delivery.",
  "We've worked with businesses across various industries including healthcare, e-commerce, fintech, and logistics.",
  "Our team uses cutting-edge technologies like React, Node.js, Python, React Native, and AWS to build scalable solutions.",
  "Pricing depends on project requirements. We offer flexible engagement models - fixed price, time & materials, or dedicated teams.",
  "Yes, we provide ongoing support and maintenance to ensure your application continues to perform optimally.",
  "We'd love to discuss your project! Would you like to schedule a free consultation with our experts?",
  "Our business hours are Monday to Friday, 9 AM to 6 PM EST.",
  "You can book an appointment by providing your preferred date and time. I'll check availability and confirm your booking.",
  "We offer consulting services, product demonstrations, and technical support. Would you like more details about any specific service?",
  "Our pricing depends on the specific service and duration. I can provide detailed pricing once you tell me which service you're interested in."
];

// Enhanced keyword-based response selection
const getMockAIResponse = (userMessage: string): Promise<string> => {
  return new Promise((resolve) => {
    const message = userMessage.toLowerCase();
    let response = mockAIResponses[Math.floor(Math.random() * 4)]; // Default random response

    // Enhanced keyword matching
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      response = "Hello! I'm your AI business assistant. How can I help you today?";
    } else if (message.includes('hour') || message.includes('open') || message.includes('time') || message.includes('business')) {
      response = mockAIResponses[8]; // Business hours
    } else if (message.includes('book') || message.includes('appointment') || message.includes('schedule') || message.includes('meeting')) {
      response = mockAIResponses[9]; // Booking
    } else if (message.includes('service') || message.includes('offer') || message.includes('provide') || message.includes('do')) {
      response = mockAIResponses[10]; // Services
    } else if (message.includes('price') || message.includes('cost') || message.includes('how much') || message.includes('budget')) {
      response = mockAIResponses[11]; // Pricing
    } else if (message.includes('technology') || message.includes('tech') || message.includes('stack') || message.includes('framework')) {
      response = mockAIResponses[4]; // Technology
    } else if (message.includes('support') || message.includes('maintenance') || message.includes('help')) {
      response = mockAIResponses[6]; // Support
    } else if (message.includes('contact') || message.includes('meet') || message.includes('consult') || message.includes('talk')) {
      response = mockAIResponses[7]; // Contact
    }

    // Simulate AI thinking time
    setTimeout(() => resolve(response), 800 + Math.random() * 800);
  });
};

// Backend API call using axios
const getBackendAIResponse = async (message: string, sessionId: string): Promise<string> => {
  try {
    const response = await api.post('/api/v1/chat', {
      message: message,
      session_id: sessionId,
    });

    return response.data.response || "I apologize, but I didn't receive a proper response.";
  } catch (error: any) {
    // Handle specific axios errors
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - backend is not responding');
    } else if (error.response) {
      // Server responded with error status
      throw new Error(`Backend error: ${error.response.status}`);
    } else if (error.request) {
      // No response received
      throw new Error('No response from backend server');
    } else {
      throw new Error('Backend connection failed');
    }
  }
};

// Check backend health using axios
const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health');
    return response.data.status === 'healthy' && response.data.database === 'connected';
  } catch (error: any) {
    console.warn('Health check failed:', error.message);
    return false;
  }
};

// Enhanced connection check with timeout
const checkConnectionWithTimeout = async (): Promise<boolean> => {
  try {
    // Create a timeout promise
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Connection timeout')), 5000)
    );

    // Race between health check and timeout
    const healthCheckPromise = checkBackendHealth();
    const result = await Promise.race([healthCheckPromise, timeoutPromise]);
    
    return result as boolean;
  } catch (error) {
    return false;
  }
};

export function useReduxChat() {
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state: RootState) => state.chat);

  // Check backend connection on hook initialization
  const checkConnection = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const isHealthy = await checkConnectionWithTimeout();
      dispatch(setConnectionStatus(isHealthy));
      
      if (!isHealthy) {
        console.warn('Backend connection failed, using mock responses');
        dispatch(setError('Using offline mode - some features may be limited'));
      } else {
        dispatch(clearError());
        console.log('Backend connection successful');
      }
    } catch (error) {
      dispatch(setConnectionStatus(false));
      dispatch(setError('Connection failed - using offline mode'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const startNewChat = useCallback(() => {
    dispatch(createNewSession());
    // Check connection when starting a new chat
    checkConnection();
  }, [dispatch, checkConnection]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !chatState.currentSession) return;

    // Add user message
    dispatch(addUserMessage(content));

    // Show typing indicator
    dispatch(setAITyping(true));

    try {
      let aiResponse: string;

      if (chatState.isConnected) {
        // Try backend first with axios
        try {
          aiResponse = await getBackendAIResponse(content, chatState.currentSession.id);
          // If backend succeeds, clear any previous errors
          dispatch(clearError());
        } catch (error: any) {
          // If backend fails, fall back to mock responses
          console.warn('Backend request failed:', error.message);
          dispatch(setConnectionStatus(false));
          dispatch(setError(`Backend unavailable: ${error.message}. Using offline mode.`));
          aiResponse = await getMockAIResponse(content);
        }
      } else {
        // Use mock responses when backend is not connected
        aiResponse = await getMockAIResponse(content);
      }

      // Remove typing indicator and add AI response
      dispatch(setAITyping(false));
      dispatch(addAIMessage(aiResponse));

    } catch (error) {
      // Final fallback
      dispatch(setAITyping(false));
      dispatch(setConnectionStatus(false));
      dispatch(addAIMessage("I apologize, but I'm having trouble responding right now. Please try again later."));
      dispatch(setError('Connection issue - using offline responses'));
    }
  }, [dispatch, chatState.currentSession, chatState.isConnected]);

  const toggleChatWindow = useCallback(() => {
    dispatch(toggleChat());
  }, [dispatch]);

  const openChatWindow = useCallback(() => {
    dispatch(openChat());
    // Check connection when opening chat
    if (!chatState.isConnected) {
      checkConnection();
    }
  }, [dispatch, chatState.isConnected, checkConnection]);

  const closeChatWindow = useCallback(() => {
    dispatch(closeChat());
  }, [dispatch]);

  const toggleChatMinimize = useCallback(() => {
    dispatch(toggleMinimize());
  }, [dispatch]);

  const minimizeChatWindow = useCallback(() => {
    dispatch(minimizeChat());
  }, [dispatch]);

  const maximizeChatWindow = useCallback(() => {
    dispatch(maximizeChat());
  }, [dispatch]);

  const clearChatError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const clearCurrentChatSession = useCallback(() => {
    dispatch(clearCurrentSession());
  }, [dispatch]);

  const retryConnection = useCallback(() => {
    dispatch(clearError());
    checkConnection();
  }, [checkConnection, dispatch]);

  // Auto-check connection when hook mounts
  const initializeConnection = useCallback(() => {
    if (!chatState.isConnected && !chatState.loading) {
      checkConnection();
    }
  }, [chatState.isConnected, chatState.loading, checkConnection]);

  return {
    // State
    ...chatState,

    // Actions
    startNewChat,
    sendMessage,
    toggleChat: toggleChatWindow,
    openChat: openChatWindow,
    closeChat: closeChatWindow,
    toggleMinimize: toggleChatMinimize,
    minimizeChat: minimizeChatWindow,
    maximizeChat: maximizeChatWindow,
    clearError: clearChatError,
    clearCurrentSession: clearCurrentChatSession,
    retryConnection,
    checkConnection,
    initializeConnection,
  };
}