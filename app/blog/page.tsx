"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogsHeroSection from "@/components/blog/BlogsHeroSection";
import BlogsFilterSection from "@/components/blog/BlogFilterSection";
import BlogsGrid from "@/components/blog/BlogsGrid";
import { dummyBlogs } from "@/data/Blogs"; // Import directly

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use dummy data directly
  const blogs = dummyBlogs.filter(blog => blog.isPublished);
  
  // Extract unique categories from dummy data
  const categories = Array.from(
    new Map(
      blogs.flatMap(blog => 
        blog.categories.map(cat => [cat.id, cat])
      )
    ).values()
  );

  // Category options
  const categoryOptions = [
    { id: "all", name: "All Articles", count: blogs.length },
    ...categories.map(cat => ({
      id: cat.slug,
      name: cat.name,
      count: blogs.filter(blog => 
        blog.categories.some(c => c.slug === cat.slug)
      ).length
    }))
  ];

  // Filter blogs based on active category
  const filteredBlogs = activeCategory === "all" 
    ? blogs 
    : blogs.filter(blog => 
        blog.categories.some(cat => cat.slug === activeCategory)
      );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white"> {/* Changed from dark gradient to white */}
        <BlogsHeroSection />
        
        {/* Blogs Content */}
        <div className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogsFilterSection
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              categories={categoryOptions}
              loading={loading}
            />
            
            {loading ? (
              <div className="text-center py-20">
                <div className="text-gray-700 text-xl animate-pulse">Loading blogs...</div> {/* Changed text color */}
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="text-red-600 text-xl mb-4">Error loading blogs</div> {/* Changed text color */}
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-[#FF6B00] text-white px-6 py-2 rounded-lg hover:bg-[#FF8A33] transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                <BlogsGrid 
                  blogs={filteredBlogs}
                  activeCategory={activeCategory}
                />
                
                {/* Empty State */}
                {filteredBlogs.length === 0 && (
                  <div className="text-center py-20">
                    <div className="text-gray-500 text-lg"> {/* Changed text color */}
                      No blogs found in this category.
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}