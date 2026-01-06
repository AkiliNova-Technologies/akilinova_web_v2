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


const mockAIResponses = {
  greeting: [
    "Hello! I'm your AkiliNova AI assistant. I'm here to help you explore our technology solutions and answer any questions about our services. What brings you here today?",
    "Hi there! Welcome to AkiliNova. I can help you with information about our web development, mobile apps, AI solutions, and cloud services. How can I assist you?",
    "Hey! Great to see you. I'm here to help you discover how AkiliNova can transform your business with custom technology solutions. What would you like to know?",
  ],
  services: [
    "AkiliNova offers a comprehensive suite of services:\n\n🌐 **Web Development** - Custom websites and web applications\n📱 **Mobile Apps** - iOS & Android native and cross-platform apps\n🤖 **AI/ML Solutions** - Intelligent automation and data analytics\n☁️ **Cloud Services** - Scalable infrastructure and migration\n💼 **Digital Transformation** - Strategic consulting and implementation\n\nWhich area interests you most?",
    "We specialize in end-to-end digital solutions:\n\n• **Custom Software Development** - Tailored to your business needs\n• **E-commerce Platforms** - Powerful online stores with seamless checkout\n• **SaaS Applications** - Multi-tenant cloud-based solutions\n• **API Development & Integration** - Connect your systems efficiently\n• **UI/UX Design** - Beautiful, intuitive user experiences\n\nWould you like details on any specific service?",
  ],
  pricing: [
    "Our pricing is flexible and tailored to your needs. We offer three engagement models:\n\n💰 **Fixed Price** - Best for well-defined projects ($10K - $100K+)\n⏱️ **Time & Materials** - Ideal for evolving requirements ($80-150/hour)\n👥 **Dedicated Team** - For long-term partnerships (from $8K/month)\n\nEach project is unique, so I'd recommend scheduling a free consultation to get an accurate quote. Would that work for you?",
    "Great question! Our pricing depends on several factors:\n\n• Project complexity and scope\n• Technology stack requirements\n• Timeline and urgency\n• Team size needed\n• Ongoing support needs\n\nTypical projects range from $15K for MVP development to $200K+ for enterprise solutions. We always provide transparent estimates with no hidden costs. Want to discuss your specific project?",
  ],
  technology: [
    "We work with cutting-edge technologies to build robust, scalable solutions:\n\n**Frontend:** React, Next.js, Vue, Angular, TypeScript\n**Backend:** Node.js, Python (Django/FastAPI), Java, .NET\n**Mobile:** React Native, Flutter, Swift, Kotlin\n**Cloud:** AWS, Google Cloud, Azure, DigitalOcean\n**AI/ML:** TensorFlow, PyTorch, OpenAI, Hugging Face\n**Database:** PostgreSQL, MongoDB, Redis, MySQL\n\nWe select the best tech stack based on your specific requirements. What type of solution are you looking to build?",
    "Our technology expertise spans the entire stack:\n\n🎨 Modern frameworks for responsive UIs\n⚡ High-performance backend architectures\n📊 Advanced data processing and analytics\n🔒 Enterprise-grade security implementations\n🚀 CI/CD pipelines for rapid deployment\n\nWe stay current with industry trends while prioritizing stability and maintainability. Interested in learning about our approach for your project?",
  ],
  timeline: [
    "Project timelines vary based on complexity:\n\n⚡ **Simple Landing Page/MVP:** 2-4 weeks\n🏗️ **Standard Web Application:** 6-10 weeks\n📱 **Mobile App:** 8-12 weeks\n🏢 **Enterprise Solution:** 12-24+ weeks\n\nWe follow agile methodology with:\n• Weekly sprint reviews\n• Continuous client feedback\n• Incremental feature delivery\n• Transparent progress tracking\n\nWhat type of project do you have in mind?",
    "Our delivery approach ensures quality without unnecessary delays:\n\n**Discovery & Planning:** 1-2 weeks\n**Design & Prototyping:** 2-3 weeks\n**Development Sprints:** 4-16 weeks (depending on scope)\n**Testing & QA:** Ongoing throughout + 1-2 weeks final\n**Deployment & Training:** 1 week\n\nWe can accelerate timelines for urgent projects. Would you like to discuss your specific deadline?",
  ],
  industries: [
    "We've delivered successful projects across diverse industries:\n\n🏥 **Healthcare** - HIPAA-compliant patient portals, telemedicine platforms\n🛒 **E-commerce** - Multi-vendor marketplaces, B2B/B2C stores\n💳 **Fintech** - Payment systems, trading platforms, digital wallets\n🚚 **Logistics** - Fleet management, route optimization, tracking systems\n📚 **Education** - Learning management systems, online course platforms\n🏭 **Manufacturing** - Inventory management, supply chain solutions\n\nOur experience helps us understand domain-specific challenges. What industry are you in?",
    "We've partnered with companies in:\n\n• SaaS & Technology startups\n• Retail & E-commerce businesses\n• Healthcare & Medical services\n• Financial services & Insurance\n• Real estate & Property management\n• Professional services firms\n\nEach industry has unique requirements, and we bring battle-tested solutions to address them. Tell me about your business!",
  ],
  support: [
    "Yes! We provide comprehensive post-launch support:\n\n🛠️ **Maintenance & Updates** - Regular security patches and upgrades\n🐛 **Bug Fixes** - Priority resolution of any issues\n📈 **Performance Monitoring** - Proactive system health checks\n🆕 **Feature Enhancement** - Continuous improvement based on feedback\n📞 **Technical Support** - Dedicated support channels (email, chat, phone)\n\nWe offer flexible support plans from basic maintenance to full managed services. Interested in learning more?",
    "Absolutely! Our support doesn't end at launch:\n\n**Warranty Period:** 3-6 months of free bug fixes\n**SLA Options:** Bronze, Silver, Gold support tiers\n**Response Times:** From 24 hours to 2 hours depending on tier\n**Monitoring:** 24/7 uptime monitoring and alerts\n**Training:** User and admin training sessions\n**Documentation:** Comprehensive technical and user guides\n\nWould you like to know about our support packages?",
  ],
  consultation: [
    "I'd love to connect you with our experts! Here's how it works:\n\n1️⃣ **Free 30-min Consultation** - Discuss your vision and requirements\n2️⃣ **Technical Assessment** - We analyze feasibility and provide recommendations\n3️⃣ **Proposal & Quote** - Detailed scope, timeline, and transparent pricing\n4️⃣ **Project Kickoff** - Once approved, we begin immediately\n\nWould you like to schedule your free consultation? I can help you book a time that works for you.",
    "Let's get you started! Our consultation process is simple:\n\n✅ No obligations, completely free\n✅ 30-45 minute video or phone call\n✅ Discuss your goals, challenges, and ideas\n✅ Get expert technical recommendations\n✅ Receive a preliminary timeline and cost estimate\n\nWe have availability this week. What day works best for you?",
  ],
  businessHours: [
    "Our team is available:\n\n🕐 **Monday - Friday:** 9:00 AM - 6:00 PM EAT (East Africa Time)\n🕐 **For reference:** That's 1:00 AM - 10:00 AM EST / 6:00 AM - 3:00 PM GMT\n\n📧 **Email Support:** 24/7 (responses within 24 hours)\n💬 **Live Chat:** During business hours\n📞 **Phone:** +254 XXX XXX XXX (business hours)\n\nFor urgent matters, we offer premium support with extended hours. When would you like to connect?",
    "We're here to help during:\n\n**Office Hours:** Monday to Friday, 9 AM - 6 PM EAT\n**Emergency Support:** Available for premium clients\n**Online Inquiry:** 24/7 through this chat or our contact form\n\nEven outside business hours, feel free to leave a message and we'll respond first thing in the morning!",
  ],
  portfolio: [
    "We've delivered 100+ successful projects! Some highlights:\n\n🎯 **E-commerce Platform** - Scaled to 100K+ monthly users\n🏥 **Healthcare SaaS** - Serving 50+ clinics across East Africa\n📱 **Fintech Mobile App** - Processing $1M+ in monthly transactions\n🚚 **Logistics Management** - Optimizing 500+ daily deliveries\n📚 **Learning Platform** - 10K+ active students\n\nWould you like to see case studies relevant to your industry?",
    "Our portfolio showcases diverse expertise:\n\n• Web applications with complex business logic\n• Mobile apps with millions of downloads\n• AI-powered analytics dashboards\n• Real-time collaboration tools\n• Payment gateway integrations\n• Multi-tenant SaaS platforms\n\nI can share specific case studies that match your interests. What type of solution are you considering?",
  ],
  process: [
    "Our proven development process ensures success:\n\n**Phase 1: Discovery** 🔍\n• Requirements gathering\n• Technical feasibility analysis\n• User research & personas\n\n**Phase 2: Design** 🎨\n• Wireframes & prototypes\n• UI/UX design\n• Client feedback & iterations\n\n**Phase 3: Development** 💻\n• Agile sprints (2-week cycles)\n• Regular demos & feedback\n• Continuous integration\n\n**Phase 4: Testing** 🧪\n• Automated & manual QA\n• Performance optimization\n• Security audits\n\n**Phase 5: Launch** 🚀\n• Deployment & monitoring\n• User training\n• Post-launch support\n\nWant to dive deeper into any phase?",
  ],
  team: [
    "Our team brings together diverse expertise:\n\n👨‍💻 **Senior Developers** - 5-10+ years experience\n🎨 **UI/UX Designers** - Award-winning design talent\n🏗️ **Solution Architects** - Enterprise-scale expertise\n🔬 **QA Engineers** - Comprehensive testing specialists\n📊 **Project Managers** - Agile certified professionals\n🤝 **Business Analysts** - Requirements & strategy experts\n\nAll team members are carefully vetted and trained in latest technologies and best practices. We match the right expertise to your project needs.",
  ],
  default: [
    "That's an interesting question! At AkiliNova, we specialize in custom technology solutions that drive business growth. Could you tell me more about what you're looking for? I can provide information about:\n\n• Our services and capabilities\n• Pricing and engagement models\n• Technologies we work with\n• Project timelines\n• Our previous work\n• Scheduling a consultation",
    "I want to make sure I give you the most relevant information. Could you clarify what aspect of AkiliNova's services you'd like to know more about? I'm here to help with:\n\n✓ Technical questions\n✓ Project planning\n✓ Cost estimates\n✓ Service details\n✓ Booking consultations",
  ],
};

// Enhanced keyword patterns for better intent detection
const intentPatterns = {
  greeting: /\b(hello|hi|hey|greetings|good\s?(morning|afternoon|evening)|howdy|sup)\b/i,
  services: /\b(service|offer|provide|what\s+do|what\s+can|capability|capabilities|solutions?|what\s+you)\b/i,
  pricing: /\b(price|pricing|cost|how\s+much|budget|fee|rate|charge|expensive|affordable|payment)\b/i,
  technology: /\b(tech|technology|stack|framework|language|tool|platform|infrastructure|code|programming)\b/i,
  timeline: /\b(timeline|time|duration|how\s+long|when|deadline|delivery|schedule|fast|quick)\b/i,
  industries: /\b(industry|industries|sector|domain|experience|worked\s+with|client|vertical)\b/i,
  support: /\b(support|maintenance|help|assist|post-launch|after|warranty|bug|issue|fix)\b/i,
  consultation: /\b(consult|consultation|meet|talk|discuss|contact|call|demo|presentation|appointment)\b/i,
  businessHours: /\b(hour|time|open|available|when|schedule|availability|business\s+hour)\b/i,
  portfolio: /\b(portfolio|work|project|example|case\s+study|previous|past|built|created|sample)\b/i,
  process: /\b(process|methodology|approach|how\s+do\s+you|workflow|method|steps|procedure)\b/i,
  team: /\b(team|staff|people|developer|designer|who|expertise|experience|skill)\b/i,
};

// Get random item from array
const getRandomItem = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Enhanced AI response selection with multi-keyword detection
const getMockAIResponse = (userMessage: string): Promise<string> => {
  return new Promise((resolve) => {
    const message = userMessage.toLowerCase().trim();
    
    // Check for empty or very short messages
    if (message.length < 2) {
      resolve(getRandomItem(mockAIResponses.default));
      return;
    }

    // Score each intent based on pattern matching
    const intentScores: { [key: string]: number } = {};
    
    Object.entries(intentPatterns).forEach(([intent, pattern]) => {
      const matches = message.match(pattern);
      if (matches) {
        intentScores[intent] = matches.length;
      }
    });

    // Get the highest scoring intent
    const bestIntent = Object.entries(intentScores).reduce(
      (best, [intent, score]) => score > best.score ? { intent, score } : best,
      { intent: 'default', score: 0 }
    );

    // Get appropriate response based on detected intent
    let response: string;
    const responseCategory = mockAIResponses[bestIntent.intent as keyof typeof mockAIResponses];
    
    if (Array.isArray(responseCategory) && responseCategory.length > 0) {
      response = getRandomItem(responseCategory);
    } else {
      response = getRandomItem(mockAIResponses.default);
    }

    // Add context-aware follow-ups for specific patterns
    if (message.includes('urgent') || message.includes('asap') || message.includes('quickly')) {
      response += "\n\n⚡ I noticed you mentioned urgency. We do offer expedited project timelines for time-sensitive requirements. Let's discuss your specific needs!";
    }
    
    if (message.includes('budget') && !bestIntent.intent.includes('pricing')) {
      response += "\n\n💡 Regarding budget, we work with various budget ranges and can structure solutions to maximize value within your constraints.";
    }

    // Simulate realistic AI thinking time (varied for natural feel)
    const thinkingTime = 600 + Math.random() * 1000;
    setTimeout(() => resolve(response), thinkingTime);
  });
};

// Backend API call using axios with improved error handling
const getBackendAIResponse = async (message: string, sessionId: string): Promise<string> => {
  try {
    const response = await api.post('/api/v1/chat', {
      message: message,
      session_id: sessionId,
    });

    // Validate response structure
    if (!response.data || typeof response.data.response !== 'string') {
      throw new Error('Invalid response format from backend');
    }

    return response.data.response || "I apologize, but I didn't receive a proper response.";
  } catch (error: any) {
    // Enhanced error handling with specific error types
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - backend is not responding');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Connection refused - backend server is not running');
    } else if (error.code === 'ETIMEDOUT') {
      throw new Error('Connection timeout - network issue or backend overloaded');
    } else if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      if (status === 429) {
        throw new Error('Rate limit exceeded - too many requests');
      } else if (status === 503) {
        throw new Error('Service unavailable - backend is temporarily down');
      } else if (status >= 500) {
        throw new Error(`Backend server error: ${status}`);
      } else if (status >= 400) {
        throw new Error(`Client error: ${status}`);
      } else {
        throw new Error(`Backend error: ${status}`);
      }
    } else if (error.request) {
      // No response received
      throw new Error('No response from backend server - check your connection');
    } else {
      // Something else went wrong
      throw new Error(error.message || 'Backend connection failed');
    }
  }
};

// Check backend health using axios with timeout
const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health', { timeout: 5000 });
    
    // Enhanced health check validation
    if (!response.data) return false;
    
    const isHealthy = response.data.status === 'healthy' || response.data.status === 'ok';
    const isDatabaseConnected = response.data.database === 'connected' || 
                                 response.data.database === 'ok' || 
                                 response.data.database === undefined; // Some backends may not include DB status
    
    return isHealthy && isDatabaseConnected;
  } catch (error: any) {
    console.warn('Health check failed:', error.message);
    return false;
  }
};

// Enhanced connection check with retry logic
const checkConnectionWithTimeout = async (retries: number = 2): Promise<boolean> => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout')), 5000)
      );

      // Race between health check and timeout
      const healthCheckPromise = checkBackendHealth();
      const result = await Promise.race([healthCheckPromise, timeoutPromise]);
      
      if (result) return true;
      
      // If not connected and not last retry, wait before retrying
      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.warn(`Connection attempt ${attempt + 1} failed:`, error);
      
      // If not last retry, wait before retrying
      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  return false;
};

export function useReduxChat() {
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state: RootState) => state.chat);

  // Check backend connection with improved error handling
  const checkConnection = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const isHealthy = await checkConnectionWithTimeout(2);
      dispatch(setConnectionStatus(isHealthy));
      
      if (!isHealthy) {
        console.warn('Backend connection failed, using mock responses');
        dispatch(setError('Using offline mode - responses may be limited'));
      } else {
        dispatch(clearError());
        console.log('Backend connection successful');
      }
      
      return isHealthy;
    } catch (error) {
      console.error('Connection check error:', error);
      dispatch(setConnectionStatus(false));
      dispatch(setError('Connection failed - using offline mode'));
      return false;
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
    // Enhanced input validation
    const trimmedContent = content.trim();
    if (!trimmedContent || !chatState.currentSession) return;
    
    // Prevent sending very long messages
    if (trimmedContent.length > 5000) {
      dispatch(setError('Message too long. Please keep messages under 5000 characters.'));
      return;
    }

    // Add user message
    dispatch(addUserMessage(trimmedContent));

    // Show typing indicator
    dispatch(setAITyping(true));

    try {
      let aiResponse: string;

      if (chatState.isConnected) {
        // Try backend first with axios
        try {
          aiResponse = await getBackendAIResponse(trimmedContent, chatState.currentSession.id);
          // If backend succeeds, clear any previous errors
          dispatch(clearError());
        } catch (error: any) {
          // If backend fails, fall back to mock responses
          console.warn('Backend request failed:', error.message);
          dispatch(setConnectionStatus(false));
          
          // Provide more informative error message
          const errorMsg = `Backend unavailable: ${error.message}. Switching to offline mode.`;
          dispatch(setError(errorMsg));
          
          // Use enhanced mock response
          aiResponse = await getMockAIResponse(trimmedContent);
          
          // Add helpful context that we're in offline mode
          aiResponse = "🔌 **(Offline Mode)** " + aiResponse;
        }
      } else {
        // Use mock responses when backend is not connected
        aiResponse = await getMockAIResponse(trimmedContent);
        
        // Indicate offline status if error isn't already showing
        if (!chatState.error) {
          aiResponse = "🔌 **(Offline Mode)** " + aiResponse;
        }
      }

      // Remove typing indicator and add AI response
      dispatch(setAITyping(false));
      dispatch(addAIMessage(aiResponse));

    } catch (error: any) {
      // Final fallback with better error message
      console.error('Message sending error:', error);
      dispatch(setAITyping(false));
      dispatch(setConnectionStatus(false));
      
      const fallbackMessage = "I apologize, but I'm experiencing technical difficulties. " +
                              "Please try again in a moment, or contact our support team if the issue persists.\n\n" +
                              "📧 Email: support@akilinova.com\n" +
                              "📞 Phone: +254 XXX XXX XXX";
      
      dispatch(addAIMessage(fallbackMessage));
      dispatch(setError('Connection issue - using offline responses'));
    }
  }, [dispatch, chatState.currentSession, chatState.isConnected, chatState.error]);

  const toggleChatWindow = useCallback(() => {
    dispatch(toggleChat());
  }, [dispatch]);

  const openChatWindow = useCallback(() => {
    dispatch(openChat());
    // Check connection when opening chat if not already connected
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
      // Optionally add a success message
      dispatch(addAIMessage("✅ Connection restored! I'm now connected to the backend and ready to provide enhanced assistance."));
    }
    
    return isConnected;
  }, [checkConnection, dispatch]);

  // Auto-check connection when hook mounts or when connection state changes
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