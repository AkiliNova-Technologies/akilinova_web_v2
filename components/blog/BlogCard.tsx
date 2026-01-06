"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Eye, Clock, User, Heart, MessageCircle } from "lucide-react";

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="
      bg-white rounded-2xl border border-gray-200
      hover:border-[#FF6B00]/50 transition-all duration-300 
      group overflow-hidden flex flex-col h-full
      hover:-translate-y-1 shadow-sm hover:shadow-lg
    ">
      {/* Blog Image */}
      <div className="relative h-48 overflow-hidden shrink-0">
        {!imageError ? (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="
            w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 
            flex items-center justify-center text-gray-700 text-4xl font-bold
          ">
            {blog.title.split(" ").map((word) => word[0]).join("")}
          </div>
        )}

        {/* Featured Badge */}
        {blog.isFeatured && (
          <div className="absolute top-4 left-4 animate-fade-in">
            <span className="
              px-3 py-1 rounded-full text-xs font-semibold 
              bg-[#FF6B00] text-white border border-[#FF6B00]
              shadow-md
            ">
              Featured
            </span>
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="
          absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        " />
      </div>

      {/* Blog Content */}
      <div className="p-6 flex flex-col grow">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.categories.slice(0, 2).map((category, catIndex) => (
            <span
              key={category.id}
              className="
                px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700 
                border border-gray-200 transition-all duration-300
                hover:scale-105 hover:bg-[#FF6B00]/10 hover:border-[#FF6B00]/30 hover:text-[#FF6B00]
              "
            >
              {category.name}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="
          text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 
          line-clamp-2 group-hover:text-[#FF6B00]
        ">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 grow line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blog.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
        </div>

        {/* Stats and Action */}
        <div className="flex items-center justify-between mt-auto">
          {/* Stats */}
          <div className="flex items-center gap-4 text-gray-500 text-sm">
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

          {/* Read More Button */}
          <Link
            href={`/blog/${blog.slug}`}
            className="
              bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white! 
              px-4 py-2 rounded-lg font-semibold text-sm 
              transition-all duration-300 flex items-center gap-2 
              hover:shadow-lg hover:shadow-orange-500/25
              active:scale-95
            "
          >
            Read More
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}