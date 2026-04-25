export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  isTyping?: boolean;
}

export type ChatIntent =
  | "greeting"
  | "services"
  | "pricing"
  | "quote_request"
  | "consultation"
  | "support"
  | "portfolio"
  | "technology"
  | "timeline"
  | "businessHours"
  | "human_handoff"
  | "partnership"
  | "internship"
  | "project"
  | "fallback";

export type ChatStage =
  | "idle"
  | "discovering_service"
  | "collecting_project_details"
  | "collecting_budget_timeline"
  | "collecting_contact"
  | "handoff_ready"
  | "completed";

export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  projectType?: string;
  budgetRange?: string;
  timeline?: string;
  projectDescription?: string;
  preferredContactMethod?: "phone" | "email" | "whatsapp";
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;

  currentIntent?: ChatIntent;
  stage: ChatStage;
  leadData: LeadData;
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