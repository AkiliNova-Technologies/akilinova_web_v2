"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, Eye, Clock, User, Heart, MessageCircle, Calendar, BookOpen } from "lucide-react";

interface BlogCardProps {
  blog: {
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
  };
  index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial value
    setIsMobile(window.innerWidth < 640);

    // Optional: Add resize listener for responsive behavior
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="
      bg-white rounded-xl sm:rounded-2xl border border-gray-200
      hover:border-[#FF6B00]/50 transition-all duration-300 
      group overflow-hidden flex flex-col h-full
      hover:-translate-y-0.5 sm:hover:-translate-y-1 shadow-sm hover:shadow-md sm:hover:shadow-lg
    ">
      {/* Blog Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden shrink-0">
        {!imageError ? (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="
            w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 
            flex items-center justify-center text-gray-700 text-2xl sm:text-4xl font-bold
          ">
            {blog.title.split(" ").map((word) => word[0]).join("").slice(0, 3)}
          </div>
        )}

        {/* Featured Badge - Only show on larger screens if it's featured */}
        {blog.isFeatured && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 animate-fade-in">
            <span className="
              px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold 
              bg-[#FF6B00] text-white border border-[#FF6B00]
              shadow-sm sm:shadow-md
            ">
              Featured
            </span>
          </div>
        )}

        {/* Overlay Gradient - Only on hover for larger screens */}
        <div className="
          absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
          opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300
          hidden sm:block
        " />

        {/* Mobile Date Badge */}
        <div className="absolute bottom-2 right-2 sm:hidden">
          <div className="flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md">
            <Calendar className="h-3 w-3 text-white" />
            <span className="text-xs text-white font-medium">
              {formatShortDate(blog.publishedAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-4 sm:p-6 flex flex-col grow">
        {/* Categories - Hide on mobile if too many */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          {blog.categories.slice(0, isMobile ? 1 : 2).map((category, catIndex) => (
            <span
              key={category.id}
              className="
                px-2 py-0.5 sm:px-2 sm:py-1 bg-gray-100 rounded-full text-xs text-gray-700 
                border border-gray-200 transition-all duration-300
                hover:scale-105 hover:bg-[#FF6B00]/10 hover:border-[#FF6B00]/30 hover:text-[#FF6B00]
              "
            >
              {category.name}
            </span>
          ))}
          {blog.categories.length > 1 && isMobile && (
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-500 border border-gray-200">
              +{blog.categories.length - 1}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="
          text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 transition-colors duration-300 
          line-clamp-2 sm:group-hover:text-[#FF6B00]
        ">
          {blog.title}
        </h3>

        {/* Excerpt - Hidden on mobile, shown on tablet and desktop */}
        <p className="hidden sm:block text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 grow line-clamp-2 sm:line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Author and Read Time - Compact on mobile */}
        <div className="flex items-center gap-3 text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="truncate max-w-[80px] sm:max-w-none">{blog.author.name.split(' ')[0]}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{blog.readTime} min</span>
            </div>
          </div>
          
          {/* Mobile Read Time */}
          <div className="sm:hidden flex items-center gap-1 ml-auto">
            <BookOpen className="h-3 w-3" />
            <span>{blog.readTime}m</span>
          </div>
        </div>

        {/* Desktop Date - Hidden on mobile (shown in image badge) */}
        <div className="hidden sm:flex items-center justify-between text-gray-500 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
        </div>

        {/* Stats and Action */}
        <div className="flex items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-gray-100">
          {/* Stats - Simplified on mobile */}
          <div className="flex items-center gap-2 sm:gap-4 text-gray-500 text-xs sm:text-sm">
            {/* Mobile: Show only view count */}
            <div className="sm:hidden flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{blog.viewCount > 999 ? `${(blog.viewCount / 1000).toFixed(1)}k` : blog.viewCount}</span>
            </div>
            
            {/* Desktop: Show all stats */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{blog.viewCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{blog.likeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{blog.commentCount}</span>
              </div>
            </div>
          </div>

          {/* Read More Button - Responsive size */}
          <Link
            href={`/blog/${blog.slug}`}
            className="
              bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white 
              px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm 
              transition-all duration-300 flex items-center gap-1 sm:gap-2 
              hover:shadow-lg hover:shadow-orange-500/25
              active:scale-95
            "
          >
            <span>Read More</span>
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}