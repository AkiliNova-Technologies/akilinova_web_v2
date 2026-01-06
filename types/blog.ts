export interface BlogAuthor {
  id?: string; // Make id optional
  name: string;
  avatar?: string;
  role?: string;
  bio?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: BlogAuthor;
  categories: BlogCategory[];
  tags: string[];
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
  seoTitle?: string;
  allowComments?: boolean;
  status?: "draft" | "published" | "archived";
  scheduledAt?: string;
  [key: string]: any;
}

export interface BlogListResponse {
  data: BlogPost[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}