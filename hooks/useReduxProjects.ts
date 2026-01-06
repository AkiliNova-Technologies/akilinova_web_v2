import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getProjects,
  getProjectById,
  getFeaturedProjects,
  setCurrentProject,
  updateProjectLocal,

  clearProjectError,
  clearProjects,
  refreshProjects,
  loadProjectsFromCache,
  removeProjectFromState,
} from "../redux/slices/projectSlice";
import type { RootState } from "@/redux/store";
import { useCallback, useEffect, useRef } from "react";
import type { Project } from "@/types/project";

interface UseReduxProjectsOptions {
  autoLoad?: boolean;
  featuredOnly?: boolean;
}

export function useReduxProjects(options: UseReduxProjectsOptions = {}) {
  const { autoLoad = true, featuredOnly = false } = options;

  const dispatch = useAppDispatch();
  const projectState = useAppSelector((state: RootState) => state.project);
  const hasInitialized = useRef(false);

  const {
    projects = [],
    currentProject = null,
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
  } = projectState;

  // Load from cache on mount
  useEffect(() => {
    if (autoLoad && !hasInitialized.current) {
      console.log("🔄 Loading projects from cache...");
      dispatch(loadProjectsFromCache());
      hasInitialized.current = true;
    }
  }, [dispatch, autoLoad]);

  // Fetch actions
  const fetchProjects = useCallback(
    (params?: {
      page?: number;
      limit?: number;
      forceRefresh?: boolean;
    }) => {
      console.log("📦 Fetching projects with params:", params);
      return dispatch(getProjects(params || {}));
    },
    [dispatch]
  );

  const fetchProjectById = useCallback(
    (projectId: string) => {
      console.log("📦 Fetching project by ID:", projectId);
      return dispatch(getProjectById(projectId));
    },
    [dispatch]
  );

  const fetchFeaturedProjects = useCallback(
    (params?: { forceRefresh?: boolean }) => {
      console.log("📦 Fetching featured projects");
      return dispatch(getFeaturedProjects(params || {}));
    },
    [dispatch]
  );

  // Local state actions
  const setCurrentProjectData = useCallback(
    (project: Project | null) => dispatch(setCurrentProject(project)),
    [dispatch]
  );

  const updateProjectLocally = useCallback(
    (projectData: Partial<Project>) => dispatch(updateProjectLocal(projectData)),
    [dispatch]
  );

  const clearProjectErrorState = useCallback(
    () => dispatch(clearProjectError()),
    [dispatch]
  );

  const clearProjectsData = useCallback(
    () => dispatch(clearProjects()),
    [dispatch]
  );

  const refreshProjectsData = useCallback(
    () => dispatch(refreshProjects()),
    [dispatch]
  );

  const removeProjectFromLocalState = useCallback(
    (projectId: string) => dispatch(removeProjectFromState(projectId)),
    [dispatch]
  );

  // Smart fetch based on featuredOnly option
  const fetchData = useCallback(
    (params?: {
      page?: number;
      limit?: number;
      forceRefresh?: boolean;
    }) => {
      if (featuredOnly) {
        return fetchFeaturedProjects(params);
      }
      return fetchProjects(params);
    },
    [featuredOnly, fetchFeaturedProjects, fetchProjects]
  );

  // Filtered projects
  const featuredProjects = projects.filter((project) => project.featured);
  const completedProjects = projects.filter((project) => project.status === "Completed");
  const inProgressProjects = projects.filter((project) => project.status === "In Progress");

  return {
    // State
    projects,
    currentProject,
    loading,
    error,
    pagination,
    lastFetched,

    // Filtered projects
    featuredProjects,
    completedProjects,
    inProgressProjects,

    // Fetch actions
    getProjects: fetchData,
    fetchProjects: fetchData,
    fetchProjectById,
    fetchFeaturedProjects,

    // Local state actions
    setCurrentProject: setCurrentProjectData,
    updateProjectLocal: updateProjectLocally,
    clearError: clearProjectErrorState,
    clearProjects: clearProjectsData,
    refreshProjects: refreshProjectsData,
    removeProjectFromState: removeProjectFromLocalState,

    // Status flags
    hasData: projects.length > 0,
    hasFeaturedProjects: featuredProjects.length > 0,
    hasCompletedProjects: completedProjects.length > 0,
    hasInProgressProjects: inProgressProjects.length > 0,
  };
}