
import { 
  getBlogs, 
  getBlogBySlug, 
  getFeaturedBlogs,
  getBlogsByCategory,
  setCurrentBlog,
  updateBlogLocal,
  clearBlogError,
  clearBlogs,
  refreshBlogs,
  loadBlogsFromCache,
  removeBlogFromState,
  incrementViewCount
} from "../redux/slices/blogSlice";
;
import { useCallback, useEffect, useRef } from "react";
import type { BlogPost } from "../types/blog";
import type { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface UseReduxBlogsOptions {
  autoLoad?: boolean;
  featuredOnly?: boolean;
  categorySlug?: string;
}

export function useReduxBlogs(options: UseReduxBlogsOptions = {}) {
  const { autoLoad = true, featuredOnly = false, categorySlug } = options;

  const dispatch = useAppDispatch();
  const blogState = useAppSelector((state: RootState) => state.blog);
  const hasInitialized = useRef(false);

  const {
    blogs = [],
    currentBlog = null,
    loading = false,
    error = null,
    pagination = {
      page: 0,
      limit: 0,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
    lastFetched = null,
  } = blogState;

  // Load from cache on mount
  useEffect(() => {
    if (autoLoad && !hasInitialized.current) {
      console.log("🔄 Loading blogs from cache...");
      dispatch(loadBlogsFromCache());
      hasInitialized.current = true;
    }
  }, [dispatch, autoLoad]);

  // Fetch actions
  const fetchBlogs = useCallback(
    (params?: { forceRefresh?: boolean }) => {
      console.log("📦 Fetching blogs");
      return dispatch(getBlogs(params || {}));
    },
    [dispatch]
  );

  const fetchBlogBySlug = useCallback(
    (slug: string) => {
      console.log("📦 Fetching blog by slug:", slug);
      return dispatch(getBlogBySlug(slug));
    },
    [dispatch]
  );

  const fetchFeaturedBlogs = useCallback(
    (params?: { forceRefresh?: boolean }) => {
      console.log("📦 Fetching featured blogs");
      return dispatch(getFeaturedBlogs(params || {}));
    },
    [dispatch]
  );

  const fetchBlogsByCategory = useCallback(
    (slug: string) => {
      console.log("📦 Fetching blogs by category:", slug);
      return dispatch(getBlogsByCategory(slug));
    },
    [dispatch]
  );

  // Local state actions
  const setCurrentBlogData = useCallback(
    (blog: BlogPost | null) => dispatch(setCurrentBlog(blog)),
    [dispatch]
  );

  const updateBlogLocally = useCallback(
    (blogData: Partial<BlogPost>) => dispatch(updateBlogLocal(blogData)),
    [dispatch]
  );

  const clearBlogErrorState = useCallback(
    () => dispatch(clearBlogError()),
    [dispatch]
  );

  const clearBlogsData = useCallback(
    () => dispatch(clearBlogs()),
    [dispatch]
  );

  const refreshBlogsData = useCallback(
    () => dispatch(refreshBlogs()),
    [dispatch]
  );

  const removeBlogFromLocalState = useCallback(
    (blogId: string) => dispatch(removeBlogFromState(blogId)),
    [dispatch]
  );

  const incrementBlogViewCount = useCallback(
    (blogId: string) => dispatch(incrementViewCount(blogId)),
    [dispatch]
  );

  // Smart fetch based on options
  const fetchData = useCallback(
    (params?: { forceRefresh?: boolean }) => {
      if (categorySlug) {
        return fetchBlogsByCategory(categorySlug);
      }
      if (featuredOnly) {
        return fetchFeaturedBlogs(params);
      }
      return fetchBlogs(params);
    },
    [categorySlug, featuredOnly, fetchBlogsByCategory, fetchFeaturedBlogs, fetchBlogs]
  );

  // Filtered blogs
  const featuredBlogs = blogs.filter((blog) => blog.isFeatured);
  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);
  const popularBlogs = [...blogs]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);

  // Get unique categories
  const categories = Array.from(
    new Map(
      blogs.flatMap(blog => 
        blog.categories.map(cat => [cat.id, cat])
      )
    ).values()
  );

  return {
    // State
    blogs,
    currentBlog,
    loading,
    error,
    pagination,
    lastFetched,

    // Filtered blogs
    featuredBlogs,
    recentBlogs,
    popularBlogs,
    categories,

    // Fetch actions
    getBlogs: fetchData,
    fetchBlogs: fetchData,
    fetchBlogBySlug,
    fetchFeaturedBlogs,
    fetchBlogsByCategory,

    // Local state actions
    setCurrentBlog: setCurrentBlogData,
    updateBlogLocal: updateBlogLocally,
    clearError: clearBlogErrorState,
    clearBlogs: clearBlogsData,
    refreshBlogs: refreshBlogsData,
    removeBlogFromState: removeBlogFromLocalState,
    incrementViewCount: incrementBlogViewCount,

    // Status flags
    hasData: blogs.length > 0,
    hasFeaturedBlogs: featuredBlogs.length > 0,
    hasRecentBlogs: recentBlogs.length > 0,
    hasPopularBlogs: popularBlogs.length > 0,
  };
}