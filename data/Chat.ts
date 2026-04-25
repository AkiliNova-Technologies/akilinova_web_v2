import type { AIAgent } from "../types/chat";

export const aiAgentConfig: AIAgent = {
  id: "akilinova-ai-assistant",
  name: "AkiliBot",
  description:
    "AI assistant for AkiliNova business inquiries and customer support",
  avatar: "/images/ai-agent.png",
  welcomeMessage:
    "Hello, welcome to AkiliNova Technologies. I can help you explore our services, request a quote, or talk through a project idea. What would you like to build?",
  responseDelay: 1000,
};

export const intentPatterns = {
  human_handoff:
    /\b(human|person|agent|talk to someone|speak to someone|call me|whatsapp|phone|contact person)\b/i,

  quote_request:
    /\b(quote|quotation|estimate|proposal|request a quote|get a quote)\b/i,

  pricing:
    /\b(price|pricing|cost|how much|budget|fee|rate|charge|expensive|affordable|payment)\b/i,

  services:
    /\b(service|services|offer|offers|provide|solution|solutions|what do you do|what can you do|capabilities|tell me about your services)\b/i,

  consultation:
    /\b(consult|consultation|meet|meeting|talk|discuss|demo|presentation|appointment|book)\b/i,

  support:
    /\b(support|maintenance|help|assist|post-launch|warranty|bug|issue|fix|error|problem)\b/i,

  portfolio:
    /\b(portfolio|work|project example|examples|case study|previous work|past work|built|created|sample)\b/i,

  technology:
    /\b(tech|technology|stack|framework|language|tool|platform|infrastructure|code|programming)\b/i,

  timeline:
    /\b(timeline|duration|how long|deadline|delivery|schedule|fast|quick|urgent|asap|immediately)\b/i,

  businessHours:
    /\b(hour|hours|open|available|availability|business hour|working time|working hours)\b/i,

  industries:
    /\b(industry|industries|sector|domain|experience|worked with|client|vertical)\b/i,

  process:
    /\b(process|methodology|approach|workflow|method|steps|procedure|how do you work)\b/i,

  team: /\b(team|staff|people|developer|designer|expertise|experience|skill|who are you)\b/i,

  partnership:
    /\b(partner|partnership|collaborate|collaboration|invest|investment|reseller|joint venture)\b/i,

  internship:
    /\b(internship|job|career|employment|cv|resume|hiring|work with you|vacancy)\b/i,

  project:
    /\b(build|create|develop|need|want|interested|project|system|systems|app|apps|mobile app|mobile apps|website|websites|platform|software)\b/i,

  greeting:
    /\b(hello|hi|hey|greetings|good morning|good afternoon|good evening|howdy|sup)\b/i,

  fallback: /.^/,
};

export const mockAIResponses = {
  greeting: [
    "Hello, welcome to AkiliNova Technologies. What would you like to build or improve?",
    "Hi, I’m AkiliBot. Are you looking for a website, app, system, AI automation, cloud support, data analytics, or security help?",
    "Welcome to AkiliNova. Tell me what you need, and I’ll guide you step by step.",
  ],

  services: [
    "We help with:\n\n• Custom websites & web apps\n• Mobile apps\n• Business systems\n• Cloud & DevOps\n• AI and automation\n• Data analytics dashboards\n• Cybersecurity and compliance\n\nWhich one are you interested in?",
  ],

  pricing: [
    "Pricing depends on scope, features, and timeline.\n\nAs a guide:\n• Simple websites: from UGX 1M\n• Business websites: UGX 1.5M – 3M\n• Apps, systems, AI, cloud, and data projects: quoted after requirements\n\nWhat type of project do you want priced?",
  ],

  quote_request: [
    "Sure. I can help gather the details for a quote. What type of project do you need: website, app, business system, AI automation, cloud, data, or security?",
  ],

  technology: [
    "We choose technology based on the project, not hype.\n\nCommon stacks include React, Next.js, Node.js, Python, PostgreSQL, MongoDB, Flutter, React Native, AWS, Docker, and AI APIs.\n\nWhat are you planning to build?",
  ],

  timeline: [
    "Timelines depend on complexity.\n\nTypical ranges:\n• Simple website: 1–3 weeks\n• Business website: 3–6 weeks\n• Custom system/app: 6–12+ weeks\n• AI, data, or cloud work: depends on scope\n\nDo you have a deadline in mind?",
  ],

  industries: [
    "We can support education, retail, finance, logistics, health, real estate, hospitality, NGOs, and professional services.\n\nWhich industry is your project for?",
  ],

  support: [
    "Yes. We support projects after launch through maintenance, bug fixes, updates, monitoring, backups, performance checks, and feature improvements.\n\nDo you need support for an existing system or a new project?",
  ],

  consultation: [
    "Sure. To prepare a useful consultation, I’ll need the project type, your goal, timeline, and contact details.\n\nWhat are you trying to build or improve?",
  ],

  businessHours: [
    "AkiliNova works on East Africa Time. You can send an inquiry anytime, and the team can follow up by phone, email, or WhatsApp.\n\nWould you like to leave your contact details?",
  ],

  portfolio: [
    "We can share relevant examples depending on what you want to build.\n\nAre you interested in websites, business systems, mobile apps, dashboards, AI automation, or cloud work?",
  ],

  process: [
    "Our process is simple:\n\n1. Understand your needs\n2. Define scope and budget\n3. Design the solution\n4. Build and test\n5. Launch and support\n\nWhat stage are you currently at?",
  ],

  team: [
    "AkiliNova brings together software development, UI/UX, cloud, automation, data, and security expertise.\n\nWhat kind of expertise do you need for your project?",
  ],

  human_handoff: [
    "Absolutely. Please share your name, phone or email, and a short note about what you need. The team will follow up.",
  ],

  partnership: [
    "We’re open to serious partnerships where technology can create real business value.\n\nWhat kind of partnership are you proposing?",
  ],

  internship: [
    "Thanks for your interest. Please share your name, area of interest, skills, and contact details so the team can review.",
  ],

  project: [
    "Great. What are you looking to build: website, mobile app, business system, AI automation, cloud setup, data dashboard, or security solution?",
  ],

  fallback: [
    "I want to guide you properly. Are you looking for a website, mobile app, business system, AI automation, cloud support, data analytics, or cybersecurity help?",
  ],

  default: [
    "I want to guide you properly. Are you looking for a website, mobile app, business system, AI automation, cloud support, data analytics, or cybersecurity help?",
  ],
};

export const conversationFlows = {
  website: {
    start:
      "Great. Is this for a business, school, NGO, portfolio, e-commerce store, booking platform, or something custom?",
    collectDetails:
      "What should the website do? For example: pages, blog, gallery, payments, booking, admin dashboard, forms, or user accounts.",
    collectTimeline: "When would you like it completed?",
    collectBudget: "Do you already have a budget range in mind?",
    collectContact:
      "Good. Please share your name and phone or email so the team can follow up with a proper estimate.",
  },

  webApp: {
    start:
      "Great. What kind of web app do you want to build? For example: dashboard, SaaS, portal, marketplace, CRM, or internal tool.",
    collectDetails: "What user roles and main features should it have?",
    collectTimeline: "Do you have a launch date or deadline?",
    collectBudget: "Do you have a budget range for the first version?",
    collectContact:
      "Please share your name and contact so we can prepare the next step.",
  },

  ecommerce: {
    start:
      "Great. Are you selling physical products, digital products, services, or subscriptions?",
    collectDetails:
      "Do you need product management, online payments, delivery tracking, coupons, customer accounts, or admin reports?",
    collectTimeline: "When do you want the store live?",
    collectBudget: "Do you have a budget range for the store?",
    collectContact:
      "Please share your name and contact so the team can follow up with a quote.",
  },

  mobileApp: {
    start: "Great. Do you need Android, iOS, or both?",
    collectDetails:
      "What are the main app features? For example: login, payments, chat, maps, notifications, offline mode, or admin dashboard.",
    collectTimeline: "Do you have a target launch timeline?",
    collectBudget: "Do you have a working budget for the app?",
    collectContact:
      "Please share your name and contact details so we can proceed with a consultation.",
  },

  businessSystem: {
    start:
      "Great. What kind of system do you need? For example: inventory, POS, SACCO, school, HR, finance, CRM, booking, or hospital system.",
    collectDetails: "What daily operations should the system handle?",
    collectTimeline: "When do you want the first usable version ready?",
    collectBudget: "Do you have a budget range?",
    collectContact:
      "Please share your name and contact so the team can follow up.",
  },

  aiAutomation: {
    start:
      "Great. What do you want to automate? Customer support, reports, document processing, marketing, sales, data entry, or internal workflows?",
    collectDetails: "What is currently taking too much time or causing errors?",
    collectTimeline: "When would you like the automation in place?",
    collectBudget: "Do you have a budget range for this automation?",
    collectContact:
      "Please share your name and contact so we can assess the automation opportunity.",
  },

  cloudDevOps: {
    start:
      "Great. Do you need hosting, deployment, server setup, CI/CD, cloud migration, backups, monitoring, or performance optimization?",
    collectDetails: "What platform or stack are you currently using?",
    collectTimeline: "Is this urgent or planned work?",
    collectBudget:
      "Do you have a budget range for setup or monthly operations?",
    collectContact:
      "Please share your name and contact so the technical team can follow up.",
  },

  dataAnalytics: {
    start:
      "Great. Are you looking for dashboards, reports, data pipelines, database design, or real-time analytics?",
    collectDetails:
      "What data sources do you currently use? For example: Excel, POS, website, app, database, or accounting system.",
    collectTimeline: "When do you need the first dashboard or report ready?",
    collectBudget: "Do you have a budget range for the analytics work?",
    collectContact:
      "Please share your name and contact so we can review your data needs.",
  },

  cybersecurity: {
    start:
      "Great. Do you need a security audit, penetration test, compliance review, system hardening, or incident support?",
    collectDetails: "What system or platform needs security review?",
    collectTimeline: "Is this urgent or preventive?",
    collectBudget: "Do you have a budget range for the security work?",
    collectContact:
      "Please share your name and contact so the security team can follow up.",
  },

  supportMaintenance: {
    start:
      "Sure. Is this for a website, app, server, database, or business system?",
    collectDetails:
      "What issue are you facing, or what kind of maintenance do you need?",
    collectTimeline: "How urgent is it?",
    collectBudget:
      "Do you already have a support budget or monthly maintenance plan?",
    collectContact:
      "Please share your name and contact so support can follow up.",
  },

  consultation: {
    start:
      "Sure. What do you want guidance on: idea validation, technical planning, pricing, architecture, or project rescue?",
    collectDetails: "Briefly describe the idea or challenge.",
    collectTimeline: "When would you like to move forward?",
    collectBudget: "Do you have a budget range or are you still exploring?",
    collectContact:
      "Please share your name and contact so we can arrange the consultation.",
  },

  partnership: {
    start:
      "Interesting. Is this a client project, product idea, investment opportunity, reseller partnership, or technical collaboration?",
    collectDetails: "What value would each side bring to the partnership?",
    collectTimeline: "When are you hoping to start?",
    collectBudget:
      "Is there already funding or revenue attached to the opportunity?",
    collectContact:
      "Please share your name and contact so the team can review the opportunity.",
  },

  internshipCareer: {
    start:
      "Thanks for your interest. Are you looking for internship, employment, mentorship, or collaboration?",
    collectDetails:
      "What skills do you currently have, and what role are you interested in?",
    collectTimeline: "When are you available to start?",
    collectBudget:
      "For career requests, budget may not apply. Please share whether you are seeking paid work, internship, or volunteer experience.",
    collectContact:
      "Please share your name, email, and portfolio or CV link if available.",
  },

  generalQuote: {
    start: "Sure. What type of project do you need a quote for?",
    collectDetails: "Briefly describe what you want built or improved.",
    collectTimeline: "When do you need it delivered?",
    collectBudget: "What budget range are you considering?",
    collectContact:
      "Please share your name and contact so we can prepare a proper quote.",
  },
};
