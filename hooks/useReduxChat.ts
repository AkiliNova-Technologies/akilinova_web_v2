import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import type { AppDispatch } from "../redux/store";
import type { RootState } from "../redux/store";
import type { ChatIntent, ChatSession, LeadData } from "../types/chat";
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
  setChatIntent,
  setChatStage,
  updateLeadData,
} from "../redux/slices/chatSlice";
import api from "../utils/api";
import {
  intentPatterns,
  mockAIResponses,
  conversationFlows,
} from "@/data/Chat";

type FlowKey = keyof typeof conversationFlows;
type ResponseKey = keyof typeof mockAIResponses;

type SmartAIResult = {
  response: string;
  intent: ChatIntent;
  leadDataPatch?: Partial<LeadData>;
};

const intentPriority: Partial<Record<ChatIntent, number>> = {
  human_handoff: 100,
  quote_request: 95,
  pricing: 90,
  services: 85,
  consultation: 80,
  support: 75,
  portfolio: 70,
  technology: 65,
  timeline: 60,
  businessHours: 55,
  partnership: 50,
  internship: 45,
  project: 40,
  greeting: 10,
  fallback: 0,
};

const getRandomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const isFlowKey = (value: unknown): value is FlowKey => {
  return typeof value === "string" && value in conversationFlows;
};

const getResponseByIntent = (intent: string): string => {
  const key = intent in mockAIResponses ? (intent as ResponseKey) : "fallback";
  return getRandomItem(mockAIResponses[key]);
};

const detectIntent = (message: string): ChatIntent => {
  const text = message.toLowerCase().trim();

  const matches = Object.entries(intentPatterns)
    .filter(([, pattern]) => pattern.test(text))
    .map(([intent]) => intent as ChatIntent);

  if (matches.length === 0) return "fallback";

  return matches.sort(
    (a, b) => (intentPriority[b] ?? 0) - (intentPriority[a] ?? 0),
  )[0];
};

const detectFlowKey = (message: string): FlowKey | null => {
  const text = message.toLowerCase();

  if (
    /\b(ecommerce|e-commerce|online store|shop|store|sell online)\b/.test(text)
  ) {
    return "ecommerce";
  }

  if (
    /\b(web app|web apps|portal|dashboard|saas|marketplace|crm)\b/.test(text)
  ) {
    return "webApp";
  }

  if (
    /\b(mobile app|mobile apps|app|apps|android|ios|flutter|react native)\b/.test(
      text,
    )
  ) {
    return "mobileApp";
  }

  if (
    /\b(website|websites|site|landing page|business website|portfolio)\b/.test(
      text,
    )
  ) {
    return "website";
  }

  if (
    /\b(system|software|pos|inventory|sacco|school system|hr|finance system|booking system|hospital system)\b/.test(
      text,
    )
  ) {
    return "businessSystem";
  }

  if (/\b(ai|automation|automate|chatbot|machine learning|ml)\b/.test(text)) {
    return "aiAutomation";
  }

  if (
    /\b(cloud|server|hosting|deployment|devops|docker|ci\/cd|backup|migration)\b/.test(
      text,
    )
  ) {
    return "cloudDevOps";
  }

  if (
    /\b(data|analytics|report|reports|bi|dashboard|pipeline|database)\b/.test(
      text,
    )
  ) {
    return "dataAnalytics";
  }

  if (
    /\b(security|cybersecurity|audit|penetration|compliance|hacked|breach)\b/.test(
      text,
    )
  ) {
    return "cybersecurity";
  }

  if (
    /\b(support|maintenance|fix|bug|issue|error|update existing|repair)\b/.test(
      text,
    )
  ) {
    return "supportMaintenance";
  }

  if (/\b(consult|consultation|advice|guidance|planning)\b/.test(text)) {
    return "consultation";
  }

  if (/\b(partner|partnership|collaborate|invest|reseller)\b/.test(text)) {
    return "partnership";
  }

  if (/\b(internship|job|career|employment|cv|resume|hiring)\b/.test(text)) {
    return "internshipCareer";
  }

  if (/\b(quote|quotation|estimate|proposal)\b/.test(text)) {
    return "generalQuote";
  }

  return null;
};

const extractContactData = (message: string): Partial<LeadData> => {
  const emailMatch = message.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const phoneMatch = message.match(/(?:\+?\d[\d\s-]{7,}\d)/);

  return {
    ...(emailMatch ? { email: emailMatch[0] } : {}),
    ...(phoneMatch ? { phone: phoneMatch[0].trim() } : {}),
  };
};

const waitForNaturalDelay = async () => {
  const delay = 600 + Math.random() * 700;
  await new Promise((resolve) => setTimeout(resolve, delay));
};

const getSmartAIResponse = async (
  message: string,
  session: ChatSession,
  dispatch: AppDispatch,
): Promise<SmartAIResult> => {
  await waitForNaturalDelay();

  const trimmedMessage = message.trim();
  const intent = detectIntent(trimmedMessage);
  const currentStage = session.stage ?? "idle";
  const currentFlowKey = session.leadData?.serviceInterest;

  dispatch(setChatIntent(intent));

  if (intent === "services" && currentStage === "idle") {
    return {
      response: getResponseByIntent("services"),
      intent,
    };
  }

  if (intent === "pricing" && currentStage === "idle") {
    return {
      response: getResponseByIntent("pricing"),
      intent,
    };
  }

  if (intent === "portfolio" && currentStage === "idle") {
    return {
      response: getResponseByIntent("portfolio"),
      intent,
    };
  }

  if (intent === "technology" && currentStage === "idle") {
    return {
      response: getResponseByIntent("technology"),
      intent,
    };
  }

  if (intent === "timeline" && currentStage === "idle") {
    return {
      response: getResponseByIntent("timeline"),
      intent,
    };
  }

  if (intent === "human_handoff") {
    dispatch(setChatStage("collecting_contact"));

    return {
      response:
        "Absolutely. Please share your name, phone or email, and a short note about what you need.",
      intent,
    };
  }

  const shouldDetectNewFlow =
    currentStage === "idle" ||
    currentStage === "completed" ||
    !currentFlowKey ||
    intent === "quote_request" ||
    intent === "project";

  const detectedFlowKey = shouldDetectNewFlow
    ? detectFlowKey(trimmedMessage)
    : null;

  if (detectedFlowKey) {
    dispatch(setChatStage("discovering_service"));
    dispatch(
      updateLeadData({
        serviceInterest: detectedFlowKey,
        projectDescription: trimmedMessage,
      }),
    );

    return {
      response: conversationFlows[detectedFlowKey].start,
      intent,
      leadDataPatch: {
        serviceInterest: detectedFlowKey,
        projectDescription: trimmedMessage,
      },
    };
  }

  if (intent === "quote_request" && currentStage === "idle") {
    dispatch(setChatStage("discovering_service"));
    dispatch(updateLeadData({ serviceInterest: "generalQuote" }));

    return {
      response: conversationFlows.generalQuote.start,
      intent,
      leadDataPatch: { serviceInterest: "generalQuote" },
    };
  }

  if (!isFlowKey(currentFlowKey)) {
    return {
      response: getResponseByIntent(intent),
      intent,
    };
  }

  const flow = conversationFlows[currentFlowKey];

  if (currentStage === "discovering_service") {
    dispatch(setChatStage("collecting_project_details"));
    dispatch(updateLeadData({ projectDescription: trimmedMessage }));

    return {
      response: flow.collectDetails,
      intent,
      leadDataPatch: { projectDescription: trimmedMessage },
    };
  }

  if (currentStage === "collecting_project_details") {
    dispatch(setChatStage("collecting_budget_timeline"));
    dispatch(updateLeadData({ projectDescription: trimmedMessage }));

    return {
      response: flow.collectTimeline,
      intent,
      leadDataPatch: { projectDescription: trimmedMessage },
    };
  }

  if (currentStage === "collecting_budget_timeline") {
    dispatch(setChatStage("collecting_contact"));
    dispatch(updateLeadData({ timeline: trimmedMessage }));

    return {
      response: flow.collectBudget,
      intent,
      leadDataPatch: { timeline: trimmedMessage },
    };
  }

  if (currentStage === "collecting_contact") {
    const contactData = extractContactData(trimmedMessage);

    dispatch(setChatStage("handoff_ready"));
    dispatch(
      updateLeadData({
        ...contactData,
        projectDescription:
          session.leadData?.projectDescription || trimmedMessage,
      }),
    );

    return {
      response:
        "Thanks. I’ve captured the details. The AkiliNova team can now review your request and follow up with the next step.",
      intent,
      leadDataPatch: contactData,
    };
  }

  if (currentStage === "handoff_ready") {
    dispatch(setChatStage("completed"));

    return {
      response:
        "Your request is already captured. You can add any extra detail here, or the team can follow up using the contact you shared.",
      intent,
    };
  }

  return {
    response: getResponseByIntent(intent),
    intent,
  };
};

const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get("/health", { timeout: 5000 });

    if (!response.data) return false;

    const isHealthy =
      response.data.status === "healthy" || response.data.status === "ok";

    const isDatabaseConnected =
      response.data.database === "connected" ||
      response.data.database === "ok" ||
      response.data.database === undefined;

    return isHealthy && isDatabaseConnected;
  } catch (error: any) {
    console.warn("Health check failed:", error.message);
    return false;
  }
};

const checkConnectionWithTimeout = async (
  retries: number = 2,
): Promise<boolean> => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Connection timeout")), 5000),
      );

      const result = await Promise.race([checkBackendHealth(), timeoutPromise]);

      if (result) return true;

      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.warn(`Connection attempt ${attempt + 1} failed:`, error);

      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  return false;
};

export function useReduxChat() {
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state: RootState) => state.chat);

  const checkConnection = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const isHealthy = await checkConnectionWithTimeout(2);
      dispatch(setConnectionStatus(isHealthy));

      if (!isHealthy) {
        dispatch(setError("Using offline mode - responses may be limited"));
      } else {
        dispatch(clearError());
      }

      return isHealthy;
    } catch (error) {
      console.error("Connection check error:", error);
      dispatch(setConnectionStatus(false));
      dispatch(setError("Connection failed - using offline mode"));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const startNewChat = useCallback(() => {
    dispatch(createNewSession());
    checkConnection();
  }, [dispatch, checkConnection]);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmedContent = content.trim();

      if (!trimmedContent || !chatState.currentSession) return;

      if (trimmedContent.length > 5000) {
        dispatch(
          setError(
            "Message too long. Please keep messages under 5000 characters.",
          ),
        );
        return;
      }

      dispatch(addUserMessage(trimmedContent));
      dispatch(setAITyping(true));

      try {
        const result = await getSmartAIResponse(
          trimmedContent,
          chatState.currentSession,
          dispatch,
        );

        dispatch(clearError());
        dispatch(setAITyping(false));
        dispatch(addAIMessage(result.response));
      } catch (error) {
        console.error("Message sending error:", error);

        dispatch(setAITyping(false));
        dispatch(setConnectionStatus(false));

        dispatch(
          addAIMessage(
            "I’m having trouble processing that right now. Please share your name, contact, and what you need, or reach us directly at akilinovatechnologies@gmail.com.",
          ),
        );

        dispatch(setError("Chat response failed"));
      }
    },
    [dispatch, chatState.currentSession],
  );

  const toggleChatWindow = useCallback(() => {
    dispatch(toggleChat());
  }, [dispatch]);

  const openChatWindow = useCallback(() => {
    dispatch(openChat());

    if (!chatState.isConnected && !chatState.loading) {
      checkConnection();
    }
  }, [dispatch, chatState.isConnected, chatState.loading, checkConnection]);

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

  const retryConnection = useCallback(async () => {
    dispatch(clearError());

    const isConnected = await checkConnection();

    if (isConnected) {
      dispatch(
        addAIMessage("Connection restored. I’m ready to help you continue."),
      );
    }

    return isConnected;
  }, [checkConnection, dispatch]);

  const initializeConnection = useCallback(() => {
    if (!chatState.isConnected && !chatState.loading) {
      checkConnection();
    }
  }, [chatState.isConnected, chatState.loading, checkConnection]);

  return {
    ...chatState,

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
