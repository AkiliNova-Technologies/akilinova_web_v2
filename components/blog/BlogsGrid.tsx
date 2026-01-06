"use client";

import BlogCard from "./BlogCard";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  author: {
    name: string;
  };
  readTime: number;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFeatured?: boolean;
  slug: string;
}

interface BlogsGridProps {
  blogs: Blog[];
  activeCategory: string;
}

export default function BlogsGrid({ blogs, activeCategory }: BlogsGridProps) {
  return (
    <div 
      key={activeCategory}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
      style={{ animation: 'fade-in 0.6s ease-out forwards' }}
    >
      {blogs.map((blog, index) => (
        <div 
          key={blog.id}
          style={{ 
            animation: `slide-up 0.5s ease-out ${index * 100}ms forwards`,
            opacity: 0 
          }}
        >
          <BlogCard blog={blog} index={index} />
        </div>
      ))}

      <style jsx global>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}