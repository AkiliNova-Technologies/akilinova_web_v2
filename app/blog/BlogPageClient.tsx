"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogsHeroSection from "@/components/blog/BlogsHeroSection";
import BlogsFilterSection from "@/components/blog/BlogFilterSection";
import BlogsGrid from "@/components/blog/BlogsGrid";
import { TrendingUp, Clock, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { dummyBlogs } from "@/data/Blogs";
import Script from "next/script";
import { SITE_CONFIG } from "@/lib/seo-utils";

const ITEMS_PER_PAGE = 12;

export default function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Use your actual blog data
  const blogs = dummyBlogs.filter(blog => blog.isPublished);
  
  // Extract unique categories from your blog data
  const uniqueCategories = Array.from(
    new Map(
      blogs.flatMap(blog => 
        blog.categories.map(cat => [cat.slug, cat])
      )
    ).values()
  );

  // Create category options with unique IDs
  const categoryOptions = [
    { id: "all", name: "All Articles", count: blogs.length },
    ...uniqueCategories.map(cat => ({
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

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const blogGrid = document.getElementById('blog-grid');
    if (blogGrid) {
      blogGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      pageNumbers.push(1);
      
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // Blog Schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_CONFIG.name} Technology Blog`,
    description: "Expert insights on web development, mobile apps, AI, and cloud computing",
    url: `${SITE_CONFIG.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    blogPost: paginatedBlogs.map(blog => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      image: blog.featuredImage,
      datePublished: blog.publishedAt,
      dateModified: blog.updatedAt,
      author: {
        "@type": "Person",
        name: blog.author.name,
      },
      url: `${SITE_CONFIG.url}/blog/${blog.slug}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_CONFIG.url}/blog`,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <BlogsHeroSection />
        
        {/* Main Content Area */}
        <div className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              
              {/* Left Sidebar - Filter Section */}
              <div className="lg:w-1/4">
                <div className="sticky top-24">
                  <div className="bg-white max-h-[800px] rounded-2xl p-6 border border-gray-200 shadow-none">
                    <BlogsFilterSection
                      activeCategory={activeCategory}
                      onCategoryChange={setActiveCategory}
                      categories={categoryOptions}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
              
              {/* Main Content - Blog Grid */}
              <div className="lg:w-3/4" id="blog-grid">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {activeCategory === 'all' ? 'Latest Articles' : 
                       categoryOptions.find(c => c.id === activeCategory)?.name}
                    </h1>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Latest</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Zap className="w-4 h-4" />
                      <span>Popular</span>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-20">
                    <div className="text-gray-700 text-xl">Loading blogs...</div>
                  </div>
                ) : (
                  <>
                    <BlogsGrid 
                      blogs={paginatedBlogs}
                      activeCategory={activeCategory}
                    />
                    
                    {paginatedBlogs.length === 0 && (
                      <div className="text-center py-20 bg-gray-50 rounded-2xl">
                        <div className="text-gray-500 text-lg mb-4">
                          No blogs found in this category.
                        </div>
                        <button
                          onClick={() => setActiveCategory('all')}
                          className="bg-[#FF6B00] text-white px-6 py-2 rounded-lg hover:bg-[#FF8A33] transition-colors duration-300"
                        >
                          View All Articles
                        </button>
                      </div>
                    )}
                    
                    {/* Pagination Controls */}
                    {filteredBlogs.length > ITEMS_PER_PAGE && (
                      <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="text-gray-600 text-sm">
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredBlogs.length)} of {filteredBlogs.length} articles
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                                currentPage === 1
                                  ? 'text-gray-400 cursor-not-allowed'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <ChevronLeft className="w-4 h-4" />
                              Previous
                            </button>
                            
                            <div className="flex items-center gap-1">
                              {getPageNumbers().map((pageNumber, index) => (
                                <button
                                  key={index}
                                  onClick={() => typeof pageNumber === 'number' ? handlePageChange(pageNumber) : null}
                                  className={`min-w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 ${
                                    pageNumber === currentPage
                                      ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white shadow-sm'
                                      : typeof pageNumber === 'number'
                                      ? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                      : 'text-gray-400 cursor-default'
                                  }`}
                                  disabled={pageNumber === '...'}
                                >
                                  {pageNumber}
                                </button>
                              ))}
                            </div>
                            
                            <button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                                currentPage === totalPages
                                  ? 'text-gray-400 cursor-not-allowed'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              Next
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-gray-500 text-sm">
                            {ITEMS_PER_PAGE} articles per page
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {filteredBlogs.length <= ITEMS_PER_PAGE && filteredBlogs.length > 0 && (
                      <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex justify-end">
                          <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-[#FF6B00] text-sm font-medium hover:text-[#FF8A33] transition-colors duration-300 flex items-center gap-1"
                          >
                            Back to top
                            <ChevronRight className="w-4 h-4 -rotate-90" />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      {/* Structured Data - Blog Schema */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
      
      {/* Structured Data - Breadcrumb */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}