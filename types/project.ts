export interface Project {
  id: string;
  title: string;
  status: "Completed" | "In Progress" | "Planning";
  category: "ecommerce" | "mobile" | "ai-ml" | "dashboard" | "web-app" | string;
  description: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
  timeline: string;
  teamSize: string;
  launchDate: string;
  challenges: string[];
  solutions: string[];
  impact: string[];
  stackExplanation: {
    ai?: string;
    frontend?: string;
    backend?: string;
    infrastructure?: string;
    mobile?: string;
    security?: string;
    data?: string;
    search?: string;
    communication?: string;
    payments?: string;
    video?: string;
    cdn?: string;
    integrations?: string;
  };
  keyFeatures: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMetrics {
  users?: string;
  revenue?: string;
  transactions?: string;
  performance?: string;
  growth?: string;
  savings?: string;
  satisfaction?: string;
}

export interface ProjectTeamMember {
  role: string;
  count: number;
}

export interface ProjectTimeline {
  phase: string;
  duration: string;
  description?: string;
}

// Extended Project interface for detailed project pages
export interface ExtendedProject extends Project {
  metrics?: ProjectMetrics;
  teamBreakdown?: ProjectTeamMember[];
  detailedTimeline?: ProjectTimeline[];
  clientTestimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
  };
  relatedProjects?: string[]; // Array of project IDs
  tags?: string[];
  industry?: string;
  projectUrl?: string;
  caseStudyUrl?: string;
  videoUrl?: string;
  screenshots?: string[];
  awards?: string[];
}

export interface ProjectListResponse {
  data: Project[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProjectFilters {
  category?: string | string[];
  status?: "Completed" | "In Progress" | "Planning";
  featured?: boolean;
  technologies?: string[];
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "title" | "launchDate";
  sortOrder?: "asc" | "desc";
}

export interface ProjectStats {
  total: number;
  completed: number;
  inProgress: number;
  planning: number;
  featured: number;
  byCategory: Record<string, number>;
  byTechnology: Record<string, number>;
}

// For project cards/previews
export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  status: "Completed" | "In Progress" | "Planning";
  gradient: string;
  featured?: boolean;
}

// For project detail pages
export interface ProjectDetailProps extends Project {
  relatedProjects?: Project[];
  nextProject?: ProjectCardProps;
  prevProject?: ProjectCardProps;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  count: number;
}

export interface Technology {
  name: string;
  category: "frontend" | "backend" | "mobile" | "database" | "infrastructure" | "ai-ml" | "other";
  icon?: string;
  projectCount: number;
}

// API Response types
export interface SingleProjectResponse {
  data: Project | ExtendedProject;
  relatedProjects?: Project[];
  success: boolean;
  message?: string;
}

export interface ProjectCategoriesResponse {
  data: ProjectCategory[];
  success: boolean;
}

export interface TechnologiesResponse {
  data: Technology[];
  success: boolean;
}

export interface ProjectStatsResponse {
  data: ProjectStats;
  success: boolean;
}

// Form types for creating/editing projects
export interface CreateProjectInput {
  title: string;
  status: "Completed" | "In Progress" | "Planning";
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
  timeline: string;
  teamSize: string;
  launchDate: string;
  challenges: string[];
  solutions: string[];
  impact: string[];
  stackExplanation: {
    ai?: string;
    frontend?: string;
    backend?: string;
    infrastructure?: string;
    mobile?: string;
    security?: string;
    data?: string;
    search?: string;
    communication?: string;
    payments?: string;
    video?: string;
    cdn?: string;
    integrations?: string;
  };
  keyFeatures: string[];
  featured?: boolean;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string;
}

// Search and filter result types
export interface ProjectSearchResult {
  projects: Project[];
  totalResults: number;
  filters: {
    categories: Array<{ name: string; count: number }>;
    technologies: Array<{ name: string; count: number }>;
    status: Array<{ name: string; count: number }>;
  };
  query: string;
  page: number;
  limit: number;
}