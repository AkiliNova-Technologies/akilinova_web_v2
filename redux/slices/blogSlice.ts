import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import type { BlogPost, BlogListResponse } from "@/types/blog";
import { dummyBlogs } from "@/data/Blogs";


interface BlogState {
  blogs: BlogPost[];
  currentBlog: BlogPost | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  lastFetched: number | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
  pagination: {
    page: 0,
    limit: 0,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  },
  lastFetched: null,
};

// Storage utilities
const blogStorage = {
  getCachedBlogs: (): {
    data: BlogListResponse;
    timestamp: number;
  } | null => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("blogs_cache");
        return cached ? JSON.parse(cached) : null;
      } catch (error) {
        console.error("Error reading blogs cache:", error);
        return null;
      }
    }
    return null;
  },

  setCachedBlogs: (data: BlogListResponse) => {
    if (typeof window !== "undefined") {
      try {
        const cacheData = {
          data,
          timestamp: Date.now(),
        };
        localStorage.setItem("blogs_cache", JSON.stringify(cacheData));
      } catch (error) {
        console.error("Error saving blogs cache:", error);
      }
    }
  },

  clearCachedBlogs: () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("blogs_cache");
      } catch (error) {
        console.error("Error clearing blogs cache:", error);
      }
    }
  },

  isCacheValid: (timestamp: number): boolean => {
    const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
    return Date.now() - timestamp < CACHE_DURATION;
  },
};

// Helper function to get blogs (API or dummy data)
const getBlogsData = async (): Promise<BlogListResponse> => {
  try {
    // Try to fetch from API first
    const response = await api.get("/api/v1/blogs");
    return response.data;
  } catch (error) {
    console.log("🌐 API unavailable, using dummy blogs data");
    // Fallback to dummy data
    return {
      data: dummyBlogs.filter(blog => blog.isPublished),
      page: 1,
      limit: dummyBlogs.length,
      total: dummyBlogs.length,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    };
  }
};

// Async thunks
export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async ({ forceRefresh = false }: { forceRefresh?: boolean } = {}) => {
    try {
      if (!forceRefresh) {
        const cached = blogStorage.getCachedBlogs();
        if (cached && blogStorage.isCacheValid(cached.timestamp)) {
          console.log("📦 Using cached blogs data");
          return cached.data;
        }
      }

      console.log("🌐 Fetching fresh blogs data");
      const data = await getBlogsData();

      blogStorage.setCachedBlogs(data);
      console.log("✅ Blogs data loaded successfully");

      return data;
    } catch (error: unknown) {
      const cached = blogStorage.getCachedBlogs();
      if (cached && blogStorage.isCacheValid(cached.timestamp)) {
        console.log("🔄 Using cached blogs data as fallback");
        return cached.data;
      }

      // Final fallback to dummy data
      console.log("🔄 Using dummy blogs data as final fallback");
      return {
        data: dummyBlogs.filter(blog => blog.isPublished),
        page: 1,
        limit: dummyBlogs.length,
        total: dummyBlogs.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      };
    }
  }
);

export const getBlogBySlug = createAsyncThunk(
  "blog/getBlogBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      // Try API first
      const response = await api.get(`/api/v1/blogs/${slug}`);
      return response.data;
    } catch (error) {
      console.log("🌐 API unavailable, searching dummy blogs data");
      // Fallback to dummy data
      const blog = dummyBlogs.find(b => b.slug === slug && b.isPublished);
      if (blog) {
        return blog;
      }
      
      const err = error as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Blog post not found";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getFeaturedBlogs = createAsyncThunk(
  "blog/getFeaturedBlogs",
  async ({ forceRefresh = false }: { forceRefresh?: boolean } = {}) => {
    try {
      if (!forceRefresh) {
        const cached = blogStorage.getCachedBlogs();
        if (cached && blogStorage.isCacheValid(cached.timestamp)) {
          console.log("📦 Using cached featured blogs data");
          const featured = cached.data.data.filter(blog => blog.isFeatured);
          return {
            ...cached.data,
            data: featured,
            total: featured.length,
          };
        }
      }

      console.log("🌐 Fetching fresh featured blogs data");
      const data = await getBlogsData();
      const featured = data.data.filter(blog => blog.isFeatured);

      const featuredData = {
        ...data,
        data: featured,
        total: featured.length,
      };

      blogStorage.setCachedBlogs(data); // Cache full data
      console.log("✅ Featured blogs data loaded successfully");

      return featuredData;
    } catch (error: unknown) {
      const cached = blogStorage.getCachedBlogs();
      if (cached && blogStorage.isCacheValid(cached.timestamp)) {
        console.log("🔄 Using cached featured blogs data as fallback");
        const featured = cached.data.data.filter(blog => blog.isFeatured);
        return {
          ...cached.data,
          data: featured,
          total: featured.length,
        };
      }

      // Final fallback to dummy data
      console.log("🔄 Using dummy featured blogs data as final fallback");
      const featured = dummyBlogs.filter(blog => blog.isFeatured && blog.isPublished);
      return {
        data: featured,
        page: 1,
        limit: featured.length,
        total: featured.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      };
    }
  }
);

export const getBlogsByCategory = createAsyncThunk(
  "blog/getBlogsByCategory",
  async (categorySlug: string, { rejectWithValue }) => {
    try {
      // Try API first
      const response = await api.get(`/api/v1/blogs/category/${categorySlug}`);
      return response.data;
    } catch (error) {
      console.log("🌐 API unavailable, filtering dummy blogs data by category");
      // Fallback to dummy data
      const filteredBlogs = dummyBlogs.filter(blog => 
        blog.isPublished && blog.categories.some(cat => cat.slug === categorySlug)
      );
      
      if (filteredBlogs.length > 0) {
        return {
          data: filteredBlogs,
          page: 1,
          limit: filteredBlogs.length,
          total: filteredBlogs.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        };
      }
      
      const err = error as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "No blogs found for this category";
      return rejectWithValue(errorMessage);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setCurrentBlog: (state, action: PayloadAction<BlogPost | null>) => {
      state.currentBlog = action.payload;
    },
    updateBlogLocal: (state, action: PayloadAction<Partial<BlogPost>>) => {
      if (state.currentBlog) {
        state.currentBlog = { ...state.currentBlog, ...action.payload };
      }
      const blogIndex = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (blogIndex !== -1) {
        state.blogs[blogIndex] = {
          ...state.blogs[blogIndex],
          ...action.payload,
        };
      }
      blogStorage.clearCachedBlogs();
    },
    clearBlogError: (state) => {
      state.error = null;
    },
    clearBlogs: (state) => {
      state.blogs = [];
      state.pagination = initialState.pagination;
      state.lastFetched = null;
      blogStorage.clearCachedBlogs();
    },
    refreshBlogs: (state) => {
      state.lastFetched = null;
      blogStorage.clearCachedBlogs();
    },
    loadBlogsFromCache: (state) => {
      const cached = blogStorage.getCachedBlogs();
      if (cached && blogStorage.isCacheValid(cached.timestamp)) {
        state.blogs = cached.data.data;
        state.pagination = {
          page: cached.data.page,
          limit: cached.data.limit,
          total: cached.data.total,
          totalPages: cached.data.totalPages,
          hasNext: cached.data.hasNext,
          hasPrev: cached.data.hasPrev,
        };
        state.lastFetched = cached.timestamp;
        state.loading = false;
        console.log("📦 Loaded blogs from cache");
      }
    },
    removeBlogFromState: (state, action: PayloadAction<string>) => {
      state.blogs = state.blogs.filter(
        (blog) => blog.id !== action.payload
      );
      if (state.currentBlog?.id === action.payload) {
        state.currentBlog = null;
      }
    },
    incrementViewCount: (state, action: PayloadAction<string>) => {
      const blog = state.blogs.find(b => b.id === action.payload);
      if (blog) {
        blog.viewCount += 1;
      }
      if (state.currentBlog?.id === action.payload) {
        state.currentBlog.viewCount += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all blogs
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
          hasNext: action.payload.hasNext,
          hasPrev: action.payload.hasPrev,
        };
        state.lastFetched = Date.now();
        state.error = null;
        console.log("✅ Blogs loaded successfully");
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("❌ Failed to load blogs:", action.payload);
      })
      // Get blog by slug
      .addCase(getBlogBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
        state.error = null;
      })
      .addCase(getBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get featured blogs
      .addCase(getFeaturedBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeaturedBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
          hasNext: action.payload.hasNext,
          hasPrev: action.payload.hasPrev,
        };
        state.lastFetched = Date.now();
        state.error = null;
        console.log("✅ Featured blogs loaded successfully");
      })
      .addCase(getFeaturedBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("❌ Failed to load featured blogs:", action.payload);
      })
      // Get blogs by category
      .addCase(getBlogsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
          hasNext: action.payload.hasNext,
          hasPrev: action.payload.hasPrev,
        };
        state.lastFetched = Date.now();
        state.error = null;
        console.log("✅ Category blogs loaded successfully");
      })
      .addCase(getBlogsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("❌ Failed to load category blogs:", action.payload);
      });
  },
});

export const {
  setCurrentBlog,
  updateBlogLocal,
  clearBlogError,
  clearBlogs,
  refreshBlogs,
  loadBlogsFromCache,
  removeBlogFromState,
  incrementViewCount,
} = blogSlice.actions;

export default blogSlice.reducer;

// Selectors
export const selectBlogs = (state: { blog: BlogState }) =>
  state.blog.blogs;
export const selectCurrentBlog = (state: { blog: BlogState }) =>
  state.blog.currentBlog;
export const selectBlogLoading = (state: { blog: BlogState }) =>
  state.blog.loading;
export const selectBlogError = (state: { blog: BlogState }) =>
  state.blog.error;
export const selectBlogPagination = (state: { blog: BlogState }) =>
  state.blog.pagination;
export const selectLastFetched = (state: { blog: BlogState }) =>
  state.blog.lastFetched;

export const selectFeaturedBlogs = (state: { blog: BlogState }) =>
  state.blog.blogs.filter((blog) => blog.isFeatured);
export const selectRecentBlogs = (state: { blog: BlogState }) =>
  [...state.blog.blogs]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);
export const selectPopularBlogs = (state: { blog: BlogState }) =>
  [...state.blog.blogs]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);