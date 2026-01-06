export interface Project {
  id: string;
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
    backend: string;
    infrastructure?: string;
    mobile?: string;
    security?: string;
  };
  keyFeatures: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
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