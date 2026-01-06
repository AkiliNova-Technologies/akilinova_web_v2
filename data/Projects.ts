import type { Project } from "../types/project";

export const dummyProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    status: "Completed",
    category: "ecommerce",
    description:
      "A comprehensive e-commerce solution with advanced inventory management, payment processing, and analytics dashboard.",
    fullDescription:
      "This e-commerce platform revolutionizes online retail by providing a seamless shopping experience with advanced features like real-time inventory tracking, AI-powered recommendations, and multi-payment gateway integration. Built to handle high traffic volumes while maintaining optimal performance.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis", "AWS"],
    image: "/images/projects/ecommerce-platform.jpg",
    liveUrl: "https://demo-ecommerce.akilinova.com",
    githubUrl: "https://github.com/akilinova/ecommerce-platform",
    gradient: "from-[#122A44] to-[#0D1C2E]",
    timeline: "6 months",
    teamSize: "8 developers",
    launchDate: "2024-01-15",
    challenges: [
      "Handling 10,000+ concurrent users during peak sales",
      "Integrating multiple payment gateways securely",
      "Real-time inventory synchronization across multiple warehouses",
    ],
    solutions: [
      "Implemented microservices architecture for scalability",
      "Used Redis for caching and session management",
      "Developed custom webhook system for inventory updates",
    ],
    impact: [
      "Increased conversion rate by 35%",
      "Reduced page load time by 60%",
      "Handled Black Friday traffic of 1M+ users",
    ],
    stackExplanation: {
      frontend:
        "React was chosen for its component-based architecture and rich ecosystem. Next.js provided SSR for better SEO and performance.",
      backend:
        "Node.js with Express offered high I/O performance for handling multiple concurrent requests. MongoDB provided flexible data modeling for product catalogs.",
      infrastructure:
        "AWS EC2 with auto-scaling, CloudFront for CDN, and RDS for relational data. Redis for session storage and caching.",
    },
    keyFeatures: [
      "AI-powered product recommendations",
      "Real-time inventory management",
      "Multi-vendor support",
      "Advanced analytics dashboard",
      "Mobile-first responsive design",
    ],
    featured: true,
    createdAt: "2023-06-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Healthcare Mobile App",
    status: "Completed",
    category: "mobile",
    description:
      "Telemedicine platform connecting patients with healthcare providers for remote consultations and prescription management.",
    fullDescription:
      "This healthcare mobile application bridges the gap between patients and healthcare providers, enabling secure telemedicine consultations, electronic prescription management, and health record tracking. The platform ensures HIPAA compliance while providing an intuitive user experience.",
    technologies: [
      "React Native",
      "Firebase",
      "Node.js",
      "Twilio",
      "AWS",
      "MongoDB",
    ],
    image: "/images/projects/healthcare-app.jpg",
    liveUrl: "https://apps.apple.com/demo-healthcare",
    githubUrl: "https://github.com/akilinova/healthcare-app",
    gradient: "from-[#122A44] to-[#0D1C2E]",
    timeline: "8 months",
    teamSize: "6 developers + 2 healthcare consultants",
    launchDate: "2024-02-20",
    challenges: [
      "Ensuring HIPAA compliance for patient data",
      "Real-time video consultation with low latency",
      "Secure prescription and medical record management",
    ],
    solutions: [
      "End-to-end encryption for all communications",
      "Custom WebRTC implementation for video calls",
      "Blockchain-based prescription verification",
    ],
    impact: [
      "Reduced patient wait times by 80%",
      "Increased healthcare access in rural areas by 45%",
      "Improved prescription accuracy by 95%",
    ],
    stackExplanation: {
      mobile:
        "React Native enabled cross-platform development with native performance. Firebase provided real-time database and authentication.",
      backend:
        "Node.js with microservices architecture for different healthcare modules. Twilio for secure video and SMS communications.",
      security:
        "AWS KMS for encryption, HIPAA-compliant data storage, and regular security audits.",
    },
    keyFeatures: [
      "Secure video consultations",
      "Electronic prescription management",
      "Health record tracking",
      "Medication reminders",
      "Multi-language support",
    ],
    featured: true,
    createdAt: "2023-07-10T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "3",
    title: "AI Chat Assistant",
    status: "In Progress",
    category: "ai-ml",
    description:
      "An AI-driven virtual assistant designed for automated customer engagement and support across multiple platforms.",
    fullDescription:
      "This conversational AI platform provides real-time customer engagement powered by natural language processing. It integrates with websites, WhatsApp, and Telegram to handle inquiries, schedule appointments, and escalate complex cases to human agents seamlessly.",
    technologies: [
      "Python",
      "FastAPI",
      "OpenAI API",
      "PostgreSQL",
      "React",
      "Socket.io",
    ],
    image: "/images/projects/ai-chat-assistant.jpg",
    liveUrl: "https://demo-akilinova-ai-agent.com",
    githubUrl: "https://github.com/akilinova/ai-assistant",
    gradient: "from-[#1A1832] to-[#2D2B55]",
    timeline: "5 months",
    teamSize: "5 developers + 1 AI researcher",
    launchDate: "2025-04-10",
    challenges: [
      "Maintaining contextual understanding across long conversations",
      "Integrating NLP models into a scalable backend",
      "Ensuring privacy for chat data across clients",
    ],
    solutions: [
      "Used transformer-based memory chains for context retention",
      "Implemented modular NLP service with FastAPI and Redis caching",
      "Encrypted all chat logs with per-user keys",
    ],
    impact: [
      "Reduced support workload by 65%",
      "Improved response times from 3 minutes to 5 seconds",
      "Increased lead conversion rates by 40%",
    ],
    stackExplanation: {
      ai: "OpenAI API powers the NLP and conversation flow, fine-tuned for each client’s domain.",
      backend:
        "FastAPI with PostgreSQL for fast and scalable chat handling; Socket.io ensures real-time interactions.",
      frontend:
        "React-based dashboard for managing interactions, metrics, and logs.",
    },
    keyFeatures: [
      "Multi-platform chat integration",
      "Customizable conversational workflows",
      "Analytics and sentiment tracking",
      "Self-learning knowledge base",
      "Webhook support for external systems",
    ],
    featured: true,
    createdAt: "2024-12-05T00:00:00Z",
    updatedAt: "2025-04-10T00:00:00Z",
  },
  {
    id: "4",
    title: "Smart Home IoT Dashboard",
    status: "Completed",
    category: "dashboard",
    description:
      "Centralized dashboard for monitoring and controlling IoT-enabled home devices with real-time analytics.",
    fullDescription:
      "Developed a web-based control center for smart home systems. The dashboard provides live energy consumption stats, device automation rules, and AI-based suggestions to optimize efficiency.",
    technologies: ["Vue.js", "Python", "MQTT", "InfluxDB", "Docker", "AWS IoT"],
    image: "/images/projects/smart-home-dashboard.jpg",
    liveUrl: "https://smarthome.akilinova.com",
    githubUrl: "https://github.com/akilinova/smart-home-dashboard",
    gradient: "from-[#0D1F3A] to-[#163860]",
    timeline: "7 months",
    teamSize: "4 developers + 2 hardware engineers",
    launchDate: "2024-07-30",
    challenges: [
      "Real-time communication with low-latency devices",
      "Data synchronization across multiple smart hubs",
      "User-friendly visualization of complex IoT data",
    ],
    solutions: [
      "Used MQTT protocol with WebSockets for real-time updates",
      "Deployed time-series database for historical analytics",
      "Built AI engine for energy optimization suggestions",
    ],
    impact: [
      "Cut average household energy use by 20%",
      "Handled over 50,000 concurrent IoT events per second",
      "Enhanced customer satisfaction through improved control UX",
    ],
    stackExplanation: {
      frontend:
        "Vue.js for reactive UI components; real-time charts using Chart.js.",
      backend:
        "Python with Flask and MQTT broker for fast device communication.",
      infrastructure: "AWS IoT Core for managing connected devices.",
    },
    keyFeatures: [
      "Live device monitoring",
      "Energy optimization AI",
      "Custom automation rules",
      "Voice assistant integration",
      "Mobile responsive dashboard",
    ],
    featured: false,
    createdAt: "2023-12-10T00:00:00Z",
    updatedAt: "2024-07-30T00:00:00Z",
  },
  {
    id: "5",
    title: "Fintech Payment Gateway",
    status: "Completed",
    category: "web-app",
    description:
      "A secure fintech API for online businesses to process multi-currency transactions and payouts.",
    fullDescription:
      "This fintech solution allows businesses to handle payments in multiple currencies through a robust, PCI DSS-compliant gateway. It supports instant settlements, API-based integration, and real-time fraud detection.",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "Kafka", "AWS"],
    image: "/images/projects/fintech-gateway.jpg",
    liveUrl: "https://demo-pay.akilinova.com",
    githubUrl: "https://github.com/akilinova/fintech-gateway",
    gradient: "from-[#11223B] to-[#0C1727]",
    timeline: "9 months",
    teamSize: "7 developers",
    launchDate: "2024-09-05",
    challenges: [
      "Ensuring transaction reliability under heavy load",
      "Integrating AML/KYC verification",
      "Building cross-border payment compliance systems",
    ],
    solutions: [
      "Implemented Kafka-based event-driven transactions",
      "Integrated AML APIs for background checks",
      "Deployed fraud detection via machine learning models",
    ],
    impact: [
      "Processed over $10M in transactions in first 3 months",
      "Reduced fraudulent activities by 92%",
      "Enabled seamless payments across 5 countries",
    ],
    stackExplanation: {
      backend:
        "NestJS provided structure and scalability; PostgreSQL ensured reliable transactional integrity.",
      infrastructure:
        "Kafka managed high-volume event streaming for payments; AWS hosted secure environments.",
    },
    keyFeatures: [
      "Real-time transaction monitoring",
      "Multi-currency support",
      "Automated fraud detection",
      "Instant payouts",
      "Developer-friendly API",
    ],
    featured: true,
    createdAt: "2023-10-05T00:00:00Z",
    updatedAt: "2024-09-05T00:00:00Z",
  },
  {
    id: "6",
    title: "EdTech Learning Platform",
    status: "Completed",
    category: "web-app",
    description:
      "Interactive online learning system supporting live classes, AI grading, and student analytics.",
    fullDescription:
      "Developed a scalable e-learning platform offering personalized learning experiences. It supports real-time classroom sessions, content management for instructors, and analytics dashboards for performance insights.",
    technologies: [
      "Next.js",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Socket.io",
      "AWS S3",
    ],
    image: "/images/projects/edtech-platform.jpg",
    liveUrl: "https://learn.akilinova.com",
    githubUrl: "https://github.com/akilinova/edtech-platform",
    gradient: "from-[#102539] to-[#1B3B57]",
    timeline: "10 months",
    teamSize: "6 developers + 3 educators",
    launchDate: "2024-05-12",
    challenges: [
      "Handling high concurrent live sessions",
      "Building scalable content delivery architecture",
      "AI-based grading accuracy",
    ],
    solutions: [
      "Used WebRTC with Socket.io for low-latency live classes",
      "Implemented AI-assisted grading models using NLP",
      "Deployed content CDN using AWS CloudFront",
    ],
    impact: [
      "Enabled 100+ institutions to go digital",
      "Reduced grading time by 75%",
      "Improved student retention by 40%",
    ],
    stackExplanation: {
      frontend: "Next.js with SSR improved performance and SEO for courses.",
      backend:
        "Node.js and Prisma offered scalable APIs for content and user data.",
      infrastructure:
        "AWS S3 and CloudFront for reliable content delivery worldwide.",
    },
    keyFeatures: [
      "Live classes and recordings",
      "AI-powered grading system",
      "Gamified learning modules",
      "Instructor dashboards",
      "Multi-language interface",
    ],
    featured: false,
    createdAt: "2023-08-22T00:00:00Z",
    updatedAt: "2024-05-12T00:00:00Z",
  },
  {
    id: "7",
    title: "Real Estate Management System",
    status: "Completed",
    category: "web-app",
    description:
      "Property management system automating tenant, maintenance, and billing operations.",
    fullDescription:
      "Developed an integrated platform for real estate companies to manage tenants, leases, maintenance, and payments. The platform provides a 360° view of operations with automated notifications and reporting.",
    technologies: ["React", "NestJS", "MongoDB", "Stripe", "AWS", "Docker"],
    image: "/images/projects/real-estate-system.jpg",
    liveUrl: "https://realestate.akilinova.com",
    githubUrl: "https://github.com/akilinova/realestate-system",
    gradient: "from-[#112B44] to-[#0C1727]",
    timeline: "8 months",
    teamSize: "5 developers",
    launchDate: "2024-08-01",
    challenges: [
      "Automating rent invoicing and reminders",
      "Syncing real-time maintenance updates",
      "Managing diverse property data schemas",
    ],
    solutions: [
      "Used CRON-based billing automation system",
      "Integrated Twilio for instant maintenance alerts",
      "Adopted NoSQL schema flexibility for diverse property types",
    ],
    impact: [
      "Cut admin workload by 55%",
      "Reduced rent defaults by 30%",
      "Improved maintenance resolution time by 50%",
    ],
    stackExplanation: {
      backend:
        "NestJS with MongoDB provided structure for large-scale CRUD operations.",
      frontend:
        "React ensured dynamic user dashboards and analytics visualization.",
      infrastructure:
        "Deployed via AWS ECS with Docker containers for easy scaling.",
    },
    keyFeatures: [
      "Automated billing and rent tracking",
      "Maintenance scheduling",
      "Tenant communication hub",
      "Property analytics dashboard",
      "Multi-role access control",
    ],
    featured: false,
    createdAt: "2023-10-20T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
  {
    id: "8",
    title: "Event Management System",
    status: "In Progress",
    category: "web-app",
    description:
      "Comprehensive platform for event planning, ticketing, and attendee engagement.",
    fullDescription:
      "A digital solution for managing events, from registration to analytics. Features include custom event pages, ticket scanning, real-time updates, and engagement tracking via push notifications.",
    technologies: ["Next.js", "Express", "PostgreSQL", "Stripe", "Firebase"],
    image: "/images/projects/event-system.jpg",
    liveUrl: "https://events.akilinova.com",
    githubUrl: "https://github.com/akilinova/event-system",
    gradient: "from-[#142A40] to-[#0C1929]",
    timeline: "6 months",
    teamSize: "4 developers",
    launchDate: "2025-03-18",
    challenges: [
      "Handling high traffic during ticket launches",
      "Integrating secure payment and ticket validation",
      "Building mobile-friendly event dashboards",
    ],
    solutions: [
      "Implemented queue system for ticket sales",
      "Integrated QR-based ticket verification",
      "Optimized SSR with Next.js for better SEO and performance",
    ],
    impact: [
      "Handled over 100K ticket sales within minutes",
      "Improved event ROI tracking for organizers",
      "Enhanced attendee engagement via push alerts",
    ],
    stackExplanation: {
      frontend:
        "Next.js used for SEO-optimized event landing pages and dynamic content.",
      backend:
        "Express.js APIs connected to PostgreSQL for fast and reliable data.",
      infrastructure:
        "Firebase used for real-time updates and notification services.",
    },
    keyFeatures: [
      "Custom event page builder",
      "Ticket sales and validation",
      "Push notifications",
      "Organizer dashboards",
      "Analytics and reporting tools",
    ],
    featured: false,
    createdAt: "2024-09-10T00:00:00Z",
    updatedAt: "2025-03-18T00:00:00Z",
  },
  {
    id: "9",
    title: "AI-Powered Analytics Dashboard",
    status: "Completed",
    category: "dashboard",
    description:
      "Business intelligence dashboard leveraging AI to uncover actionable insights from company data.",
    fullDescription:
      "Built an advanced analytics platform capable of ingesting data from multiple sources, performing predictive analysis, and visualizing trends. Integrates AI models for anomaly detection and automated report generation.",
    technologies: ["React", "Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    image: "/images/projects/ai-analytics-dashboard.jpg",
    liveUrl: "https://analytics.akilinova.com",
    githubUrl: "https://github.com/akilinova/ai-analytics-dashboard",
    gradient: "from-[#0E1E30] to-[#1A3553]",
    timeline: "9 months",
    teamSize: "6 developers + 2 data scientists",
    launchDate: "2024-11-11",
    challenges: [
      "Aggregating data from multiple sources securely",
      "Building predictive models for business forecasting",
      "Ensuring dashboard scalability with large datasets",
    ],
    solutions: [
      "Implemented ETL pipeline for real-time data ingestion",
      "Developed TensorFlow models for predictive analytics",
      "Optimized PostgreSQL queries with partitioning",
    ],
    impact: [
      "Reduced analytics reporting time by 90%",
      "Increased business forecast accuracy by 82%",
      "Enabled executives to make data-driven decisions faster",
    ],
    stackExplanation: {
      ai: "TensorFlow for deep learning models and FastAPI for serving predictions.",
      backend:
        "Python-based microservices structure for modular analytics handling.",
      frontend:
        "React with D3.js for dynamic visualization of complex datasets.",
    },
    keyFeatures: [
      "Predictive analytics",
      "Custom data visualizations",
      "Automated reports",
      "Real-time KPI tracking",
      "Anomaly detection engine",
    ],
    featured: true,
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-11-11T00:00:00Z",
  },
];
