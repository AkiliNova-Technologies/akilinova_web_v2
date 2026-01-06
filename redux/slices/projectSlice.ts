import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../utils/api";
import type { Project, ProjectListResponse } from "../../types/project";
import { dummyProjects } from "../../data/Projects";

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
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

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
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
const projectStorage = {
  getCachedProjects: (): {
    data: ProjectListResponse;
    timestamp: number;
  } | null => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("projects_cache");
        return cached ? JSON.parse(cached) : null;
      } catch (error) {
        console.error("Error reading projects cache:", error);
        return null;
      }
    }
    return null;
  },

  setCachedProjects: (data: ProjectListResponse) => {
    if (typeof window !== "undefined") {
      try {
        const cacheData = {
          data,
          timestamp: Date.now(),
        };
        localStorage.setItem("projects_cache", JSON.stringify(cacheData));
      } catch (error) {
        console.error("Error saving projects cache:", error);
      }
    }
  },

  clearCachedProjects: () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("projects_cache");
      } catch (error) {
        console.error("Error clearing projects cache:", error);
      }
    }
  },

  isCacheValid: (timestamp: number): boolean => {
    const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
    return Date.now() - timestamp < CACHE_DURATION;
  },
};

// Helper function to get projects (API or dummy data)
const getProjectsData = async (): Promise<ProjectListResponse> => {
  try {
    // Try to fetch from API first
    const response = await api.get("/api/v1/projects");
    return response.data;
  } catch (error) {
    console.log("🌐 API unavailable, using dummy projects data");
    // Fallback to dummy data
    return {
      data: dummyProjects,
      page: 1,
      limit: dummyProjects.length,
      total: dummyProjects.length,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    };
  }
};

// Async thunks
export const getProjects = createAsyncThunk(
  "project/getProjects",
  async ({
    forceRefresh = false,
  }: { page?: number; limit?: number; forceRefresh?: boolean } = {}) => {
    try {
      if (!forceRefresh) {
        const cached = projectStorage.getCachedProjects();
        if (cached && projectStorage.isCacheValid(cached.timestamp)) {
          console.log("📦 Using cached projects data");
          return cached.data;
        }
      }

      console.log("🌐 Fetching fresh projects data");
      const data = await getProjectsData();

      projectStorage.setCachedProjects(data);
      console.log("✅ Projects data loaded successfully");

      return data;
    } catch (error: unknown) {
      const cached = projectStorage.getCachedProjects();
      if (cached && projectStorage.isCacheValid(cached.timestamp)) {
        console.log("🔄 Using cached projects data as fallback");
        return cached.data;
      }

      // Final fallback to dummy data
      console.log("🔄 Using dummy projects data as final fallback");
      return {
        data: dummyProjects,
        page: 1,
        limit: dummyProjects.length,
        total: dummyProjects.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      };
    }
  }
);

export const getProjectById = createAsyncThunk(
  "project/getProjectById",
  async (projectId: string, { rejectWithValue }) => {
    try {
      // Try API first
      const response = await api.get(`/api/v1/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.log("🌐 API unavailable, searching dummy projects data");
      // Fallback to dummy data
      const project = dummyProjects.find((p) => p.id === projectId);
      if (project) {
        return project;
      }

      const err = error as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Project not found";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getFeaturedProjects = createAsyncThunk(
  "project/getFeaturedProjects",
  async ({ forceRefresh = false }: { forceRefresh?: boolean } = {}) => {
    try {
      if (!forceRefresh) {
        const cached = projectStorage.getCachedProjects();
        if (cached && projectStorage.isCacheValid(cached.timestamp)) {
          console.log("📦 Using cached featured projects data");
          const featured = cached.data.data.filter(
            (project) => project.featured
          );
          return {
            ...cached.data,
            data: featured,
            total: featured.length,
          };
        }
      }

      console.log("🌐 Fetching fresh featured projects data");
      const data = await getProjectsData();
      const featured = data.data.filter((project) => project.featured);

      const featuredData = {
        ...data,
        data: featured,
        total: featured.length,
      };

      projectStorage.setCachedProjects(data); // Cache full data
      console.log("✅ Featured projects data loaded successfully");

      return featuredData;
    } catch (error: unknown) {
      const cached = projectStorage.getCachedProjects();
      if (cached && projectStorage.isCacheValid(cached.timestamp)) {
        console.log("🔄 Using cached featured projects data as fallback");
        const featured = cached.data.data.filter((project) => project.featured);
        return {
          ...cached.data,
          data: featured,
          total: featured.length,
        };
      }

      // Final fallback to dummy data
      console.log("🔄 Using dummy featured projects data as final fallback");
      const featured = dummyProjects.filter((project) => project.featured);
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

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    updateProjectLocal: (state, action: PayloadAction<Partial<Project>>) => {
      if (state.currentProject) {
        state.currentProject = { ...state.currentProject, ...action.payload };
      }
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (projectIndex !== -1) {
        state.projects[projectIndex] = {
          ...state.projects[projectIndex],
          ...action.payload,
        };
      }
      projectStorage.clearCachedProjects();
    },
    clearProjectError: (state) => {
      state.error = null;
    },
    clearProjects: (state) => {
      state.projects = [];
      state.pagination = initialState.pagination;
      state.lastFetched = null;
      projectStorage.clearCachedProjects();
    },
    refreshProjects: (state) => {
      state.lastFetched = null;
      projectStorage.clearCachedProjects();
    },
    loadProjectsFromCache: (state) => {
      const cached = projectStorage.getCachedProjects();
      if (cached && projectStorage.isCacheValid(cached.timestamp)) {
        state.projects = cached.data.data;
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
        console.log("📦 Loaded projects from cache");
      }
    },
    removeProjectFromState: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
      if (state.currentProject?.id === action.payload) {
        state.currentProject = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all projects
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data;
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
        console.log("✅ Projects loaded successfully");
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("❌ Failed to load projects:", action.payload);
      })
      // Get project by ID
      .addCase(getProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
        state.error = null;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get featured projects
      .addCase(getFeaturedProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeaturedProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data;
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
        console.log("✅ Featured projects loaded successfully");
      })
      .addCase(getFeaturedProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("❌ Failed to load featured projects:", action.payload);
      });
  },
});

export const {
  setCurrentProject,
  updateProjectLocal,
  clearProjectError,
  clearProjects,
  refreshProjects,
  loadProjectsFromCache,
  removeProjectFromState,
} = projectSlice.actions;

export default projectSlice.reducer;

// Selectors
export const selectProjects = (state: { project: ProjectState }) =>
  state.project.projects;
export const selectCurrentProject = (state: { project: ProjectState }) =>
  state.project.currentProject;
export const selectProjectLoading = (state: { project: ProjectState }) =>
  state.project.loading;
export const selectProjectError = (state: { project: ProjectState }) =>
  state.project.error;
export const selectProjectPagination = (state: { project: ProjectState }) =>
  state.project.pagination;
export const selectLastFetched = (state: { project: ProjectState }) =>
  state.project.lastFetched;

export const selectFeaturedProjects = (state: { project: ProjectState }) =>
  state.project.projects.filter((project) => project.featured);
export const selectCompletedProjects = (state: { project: ProjectState }) =>
  state.project.projects.filter((project) => project.status === "Completed");
export const selectInProgressProjects = (state: { project: ProjectState }) =>
  state.project.projects.filter((project) => project.status === "In Progress");
