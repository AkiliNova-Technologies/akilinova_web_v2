"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconDotsVertical,
  IconUser,
  IconCalendar,
  IconMessage,
  IconPaperclip,
  IconStar,
  IconStarFilled,
  IconClock,
  IconFlag,
  IconExternalLink,
  IconLayoutGrid,
  IconList,
  IconCalendarEvent,
  IconTimeline,
  IconEye,
  IconEyeOff,
  IconUsers,
  IconTag,
  IconChevronDown,
  IconTrash,
  IconEdit,
  IconCopy,
  IconArchive,
  IconCheck,
  IconX,
  IconGripVertical,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  Task,
  Column,
  User,
  FilterOptions,
  ViewMode,
} from "@/types/kanban";
import Button from "../ui/button";

interface KanbanBoardProps {
  initialColumns?: Column[];
  users?: User[];
  onTaskUpdate?: (task: Task) => void;
  onTaskCreate?: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  onTaskDelete?: (taskId: string) => void;
  onColumnUpdate?: (column: Column) => void;
  onColumnCreate?: (column: Omit<Column, "id" | "tasks">) => void;
  onColumnDelete?: (columnId: string) => void;
  className?: string;
}

const defaultUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar: "/avatars/01.png",
    role: "Product Manager",
  },
  {
    id: "2",
    name: "Alex Rivera",
    email: "alex@example.com",
    avatar: "/avatars/02.png",
    role: "UX Designer",
  },
  {
    id: "3",
    name: "Jordan Kim",
    email: "jordan@example.com",
    avatar: "/avatars/03.png",
    role: "Frontend Dev",
  },
  {
    id: "4",
    name: "Maya Patel",
    email: "maya@example.com",
    avatar: "/avatars/04.png",
    role: "Backend Dev",
  },
  {
    id: "5",
    name: "Chris Wong",
    email: "chris@example.com",
    avatar: "/avatars/05.png",
    role: "QA Engineer",
  },
];

const defaultLabels = [
  { id: "1", name: "Bug", color: "#ef4444" },
  { id: "2", name: "Feature", color: "#3b82f6" },
  { id: "3", name: "Improvement", color: "#10b981" },
  { id: "4", name: "Documentation", color: "#8b5cf6" },
  { id: "5", name: "Design", color: "#f59e0b" },
];

// Generate unique ID
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export function KanbanBoard({
  initialColumns = [],
  users = defaultUsers,
  onTaskUpdate,
  onTaskCreate,
  onTaskDelete,
  onColumnUpdate,
  onColumnCreate,
  onColumnDelete,
  className,
}: KanbanBoardProps) {
  // State
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<Column | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>({
    type: "board",
    groupBy: "status",
  });
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showCompletedSubtasks, setShowCompletedSubtasks] = useState(true);

  // Refs
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize with sample data if no initialColumns
  useEffect(() => {
    if (initialColumns.length === 0) {
      setColumns([
        {
          id: "todo",
          title: "To Do",
          color: "#3b82f6",
          tasks: [
            {
              id: "1",
              title: "Design System Audit",
              description:
                "Review and update component library with new design tokens",
              priority: "high",
              status: "todo",
              assignee: users[0],
              tags: ["Design", "System", "UI"],
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              attachments: 3,
              comments: 7,
              storyPoints: 5,
              createdAt: new Date(),
              updatedAt: new Date(),
              columnId: "todo",
              position: 0,
              subtasks: [
                {
                  id: "1-1",
                  title: "Audit existing components",
                  completed: true,
                },
                { id: "1-2", title: "Create design tokens", completed: false },
                { id: "1-3", title: "Update documentation", completed: false },
              ],
              labels: [defaultLabels[1], defaultLabels[4]],
            },
            {
              id: "2",
              title: "User Research Analysis",
              description:
                "Analyze feedback from recent user interviews and surveys",
              priority: "medium",
              status: "todo",
              assignee: users[1],
              tags: ["Research", "UX", "Analytics"],
              dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
              comments: 4,
              attachments: 2,
              storyPoints: 8,
              createdAt: new Date(),
              updatedAt: new Date(),
              columnId: "todo",
              position: 1,
              labels: [defaultLabels[2]],
            },
          ],
        },
        {
          id: "progress",
          title: "In Progress",
          color: "#f59e0b",
          wipLimit: 3,
          tasks: [
            {
              id: "3",
              title: "Mobile App Redesign",
              description:
                "Implementing new navigation patterns and improved user flows",
              priority: "high",
              status: "progress",
              assignee: users[2],
              tags: ["Mobile", "UI", "Redesign"],
              attachments: 8,
              comments: 12,
              storyPoints: 13,
              createdAt: new Date(),
              updatedAt: new Date(),
              columnId: "progress",
              position: 0,
              subtasks: [
                { id: "3-1", title: "Design wireframes", completed: true },
                { id: "3-2", title: "Develop components", completed: false },
                { id: "3-3", title: "User testing", completed: false },
              ],
              labels: [defaultLabels[0], defaultLabels[1]],
            },
            {
              id: "4",
              title: "API Documentation",
              description: "Complete developer documentation for new endpoints",
              priority: "medium",
              status: "progress",
              assignee: users[3],
              tags: ["Documentation", "API", "Backend"],
              dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              comments: 2,
              attachments: 5,
              storyPoints: 3,
              createdAt: new Date(),
              updatedAt: new Date(),
              columnId: "progress",
              position: 1,
              labels: [defaultLabels[3]],
            },
          ],
        },
        {
          id: "review",
          title: "Review",
          color: "#8b5cf6",
          tasks: [
            {
              id: "5",
              title: "Performance Optimization",
              description: "Improve page load times and reduce bundle size",
              priority: "critical",
              status: "review",
              assignee: users[4],
              tags: ["Performance", "Optimization", "Frontend"],
              dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
              attachments: 4,
              comments: 6,
              storyPoints: 5,
              createdAt: new Date(),
              updatedAt: new Date(),
              columnId: "review",
              position: 0,
              subtasks: [
                {
                  id: "5-1",
                  title: "Analyze performance metrics",
                  completed: true,
                },
                {
                  id: "5-2",
                  title: "Implement optimizations",
                  completed: true,
                },
                { id: "5-3", title: "Run benchmarks", completed: false },
              ],
              labels: [defaultLabels[2]],
            },
          ],
        },
        {
          id: "done",
          title: "Done",
          color: "#10b981",
          tasks: [
            {
              id: "6",
              title: "Landing Page Optimization",
              description:
                "Improved conversion rate by 23% through A/B testing",
              priority: "low",
              status: "done",
              assignee: users[2],
              tags: ["Marketing", "Web", "Optimization"],
              attachments: 2,
              comments: 8,
              storyPoints: 3,
              createdAt: new Date(),
              updatedAt: new Date(),
              columnId: "done",
              position: 0,
              labels: [defaultLabels[2], defaultLabels[4]],
            },
          ],
        },
      ]);
    }
  }, []);

  // Filter tasks based on search and filters
  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          task.assignee?.name.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // Priority filter
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(task.priority)) return false;
      }

      // Assignee filter
      if (filters.assignee && filters.assignee !== "all") {
        if (task.assignee?.id !== filters.assignee) return false;
      }

      // Tag filter
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = task.tags.some((tag) =>
          filters.tags?.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }

      // Due date filter
      if (filters.dueDate) {
        if (
          filters.dueDate.from &&
          task.dueDate &&
          task.dueDate < filters.dueDate.from
        )
          return false;
        if (
          filters.dueDate.to &&
          task.dueDate &&
          task.dueDate > filters.dueDate.to
        )
          return false;
      }

      return true;
    }),
  }));

  // Drag and drop handlers
  const handleDragStart = (
    e: React.DragEvent,
    task: Task,
    columnId: string
  ) => {
    setDraggedTask(task);
    setDraggedColumn(columns.find((col) => col.id === columnId) || null);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.DragEvent,
    targetColumnId: string,
    position?: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedTask || !draggedColumn) return;

    const sourceColumnId = draggedColumn.id;

    // Don't do anything if dropping in the same place
    if (sourceColumnId === targetColumnId && position === undefined) {
      setDraggedTask(null);
      setDraggedColumn(null);
      return;
    }

    setColumns((prev) => {
      const newColumns = [...prev];
      const sourceColumn = newColumns.find((col) => col.id === sourceColumnId);
      const targetColumn = newColumns.find((col) => col.id === targetColumnId);

      if (!sourceColumn || !targetColumn) return prev;

      // Remove from source column
      sourceColumn.tasks = sourceColumn.tasks.filter(
        (task) => task.id !== draggedTask.id
      );

      // Add to target column
      const updatedTask = {
        ...draggedTask,
        columnId: targetColumnId,
        status: targetColumnId,
        updatedAt: new Date(),
      };

      if (position !== undefined) {
        targetColumn.tasks.splice(position, 0, updatedTask);
      } else {
        targetColumn.tasks.push(updatedTask);
      }

      // Update positions
      targetColumn.tasks = targetColumn.tasks.map((task, index) => ({
        ...task,
        position: index,
      }));

      // Update task via callback
      onTaskUpdate?.(updatedTask);

      return newColumns;
    });

    setDraggedTask(null);
    setDraggedColumn(null);
  };

  // Task handlers
  const handleCreateTask = (columnId: string) => {
    setSelectedColumn(columns.find((col) => col.id === columnId) || null);
    setIsCreating(true);
    setIsTaskDialogOpen(true);
  };

  const handleUpdateTask = (task: Task) => {
    setColumns((prev) =>
      prev.map((column) => ({
        ...column,
        tasks: column.tasks.map((t) =>
          t.id === task.id ? { ...task, updatedAt: new Date() } : t
        ),
      }))
    );
    onTaskUpdate?.(task);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setColumns((prev) =>
        prev.map((column) => ({
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        }))
      );
      onTaskDelete?.(taskId);
    }
  };

  // Column handlers
  const handleCreateColumn = () => {
    setIsColumnDialogOpen(true);
  };

  const handleUpdateColumn = (column: Column) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === column.id ? column : col))
    );
    onColumnUpdate?.(column);
  };

  const handleDeleteColumn = (columnId: string) => {
    if (
      confirm("Are you sure you want to delete this column and all its tasks?")
    ) {
      setColumns((prev) => prev.filter((col) => col.id !== columnId));
      onColumnDelete?.(columnId);
    }
  };

  // Priority badge color
  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/10 text-red-700 border-red-500/20";
      case "high":
        return "bg-orange-500/10 text-orange-700 border-orange-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
      case "low":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20";
    }
  };

  // Task card component
  const TaskCard = ({ task, column }: { task: Task; column: Column }) => {
    const completedSubtasks =
      task.subtasks?.filter((st) => st.completed).length || 0;
    const totalSubtasks = task.subtasks?.length || 0;
    const progress =
      totalSubtasks > 0
        ? Math.round((completedSubtasks / totalSubtasks) * 100)
        : 0;

    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, task, column.id)}
        onDragEnd={() => {
          setDraggedTask(null);
          setDraggedColumn(null);
        }}
        onClick={(e) => {
          // Only open dialog if we're not currently dragging
          if (!draggedTask) {
            setSelectedTask(task);
            setIsCreating(false);
            setIsTaskDialogOpen(true);
          }
        }}
        className={cn(
          "group relative bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800",
          "p-3 mb-2 cursor-move hover:shadow-lg transition-all duration-200",
          "hover:border-gray-300 dark:hover:border-gray-700",
          draggedTask?.id === task.id && "opacity-50"
        )}
      >
        {/* Drag handle indicator */}
        <div className="absolute left-1 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconGripVertical className="h-4 w-4 text-gray-400" />
        </div>

        {/* Labels */}
        {task.labels && task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {task.labels.map((label) => (
              <div
                key={label.id}
                className="h-2 w-8 rounded-full"
                style={{ backgroundColor: label.color }}
                title={label.name}
              />
            ))}
          </div>
        )}

        {/* Title and priority */}
        <div className="flex items-start justify-between mb-2 pl-4">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
            {task.title}
          </h4>
          <Badge
            variant="outline"
            className={cn(
              "text-xs capitalize shrink-0",
              getPriorityColor(task.priority)
            )}
          >
            {task.priority}
          </Badge>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {task.description}
          </p>
        )}

        {/* Progress bar */}
        {totalSubtasks > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>
                {completedSubtasks}/{totalSubtasks}
              </span>
            </div>
            <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Tags */}
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-1.5 py-0.5"
              >
                {tag}
              </Badge>
            ))}
            {task.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                +{task.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Assignee */}
            {task.assignee && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="h-6 w-6 border-2 border-white dark:border-gray-900">
                      <AvatarImage
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                      />
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                        {task.assignee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{task.assignee.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Due date */}
            {task.dueDate && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <IconCalendar className="h-3 w-3" />
                      <span>
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Due {new Date(task.dueDate).toLocaleDateString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2">
            {/* Story points */}
            {task.storyPoints && (
              <Badge
                variant="outline"
                className="text-xs bg-gray-100 dark:bg-gray-800"
              >
                {task.storyPoints} SP
              </Badge>
            )}

            {/* Comments */}
            {task.comments > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <IconMessage className="h-3 w-3" />
                <span>{task.comments}</span>
              </div>
            )}

            {/* Attachments */}
            {task.attachments > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <IconPaperclip className="h-3 w-3" />
                <span>{task.attachments}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Column component
  const ColumnComponent = ({ column }: { column: Column }) => {
    const taskCount = column.tasks.length;
    const isOverLimit = column.wipLimit && taskCount > column.wipLimit;

    return (
      <div
        ref={(el) => {
          if (el) columnRefs.current.push(el);
        }}
        className="flex flex-col w-full md:w-80 flex-shrink-0 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, column.id)}
      >
        {/* Column header */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {column.title}
              </h3>
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs",
                  isOverLimit && "bg-red-100 text-red-700 dark:bg-red-900/30"
                )}
              >
                {taskCount}
                {column.wipLimit && `/${column.wipLimit}`}
              </Badge>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <IconDotsVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleCreateTask(column.id)}>
                  <IconPlus className="h-4 w-4 mr-2" />
                  Add Task
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedColumn(column);
                    setIsColumnDialogOpen(true);
                  }}
                >
                  <IconEdit className="h-4 w-4 mr-2" />
                  Edit Column
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDeleteColumn(column.id)}
                  className="text-red-600 dark:text-red-400"
                >
                  <IconTrash className="h-4 w-4 mr-2" />
                  Delete Column
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {column.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {column.description}
            </p>
          )}

          {isOverLimit && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              ⚠️ WIP Limit Exceeded
            </p>
          )}
        </div>

        {/* Column tasks */}
        <ScrollArea className="flex-1 p-2 min-h-[400px]">
          <div className="space-y-2">
            {column.tasks.map((task, index) => (
              <div
                key={index}
                onDragOver={handleDragOver}
                onDrop={(e) => {
                  e.stopPropagation();
                  if (draggedTask && draggedTask.id !== task.id) {
                    handleDrop(e, column.id, index);
                  }
                }}
              >
                <TaskCard task={task} column={column} />
              </div>
            ))}

            {column.tasks.length === 0 && (
              <div
                className="h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className="text-center">
                  <IconPlus className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Drop tasks here
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Add task button */}
        <div className="p-2 border-t border-gray-200 dark:border-gray-800">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-500 hover:text-gray-700"
            onClick={() => handleCreateTask(column.id)}
          >
            <IconPlus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>
    );
  };

  // Board view
  const BoardView = () => (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {filteredColumns.map((column) => (
        <ColumnComponent key={column.id} column={column} />
      ))}
    </div>
  );

  // List view
  const ListView = () => (
    <div className="space-y-4">
      {filteredColumns.flatMap((column) =>
        column.tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: columns.find(
                        (c) => c.id === task.columnId
                      )?.color,
                    }}
                  />
                  <span className="text-sm text-gray-500">{task.columnId}</span>
                </div>
                <h4 className="font-semibold">{task.title}</h4>
              </div>
              <div className="flex items-center gap-4">
                {task.assignee && (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar} />
                    <AvatarFallback>
                      {task.assignee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedTask(task);
                    setIsTaskDialogOpen(true);
                  }}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Kanban Board
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Drag and drop to manage your tasks
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* View mode */}
          <Tabs
            value={viewMode.type}
            onValueChange={(value: any) =>
              setViewMode({ ...viewMode, type: value })
            }
          >
            <TabsList>
              <TabsTrigger value="board">
                <IconLayoutGrid className="h-4 w-4 mr-2" />
                Board
              </TabsTrigger>
              <TabsTrigger value="list">
                <IconList className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <IconCalendarEvent className="h-4 w-4 mr-2" />
                Calendar
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Filter button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <IconFilter className="h-4 w-4 mr-2" />
                Filter
                {(filters.priority?.length ||
                  filters.tags?.length ||
                  filters.assignee) && (
                  <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                    ✓
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Priority filter */}
              <div className="p-2">
                <Label className="text-xs">Priority</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(["low", "medium", "high", "critical"] as const).map(
                    (priority) => (
                      <Badge
                        key={priority}
                        variant={
                          filters.priority?.includes(priority)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer text-xs capitalize"
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            priority: prev.priority?.includes(priority)
                              ? prev.priority.filter((p) => p !== priority)
                              : [...(prev.priority || []), priority],
                          }));
                        }}
                      >
                        {priority}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              {/* Assignee filter */}
              <div className="p-2">
                <Label className="text-xs">Assignee</Label>
                <Select
                  value={filters.assignee || "all"}
                  onValueChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      assignee: value === "all" ? undefined : value,
                    }))
                  }
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear filters */}
              {(filters.priority?.length ||
                filters.tags?.length ||
                filters.assignee) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilters({})}>
                    <IconX className="h-4 w-4 mr-2" />
                    Clear Filters
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search and stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span>
              To Do: {columns.find((c) => c.id === "todo")?.tasks.length || 0}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <span>
              In Progress:{" "}
              {columns.find((c) => c.id === "progress")?.tasks.length || 0}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span>
              Done: {columns.find((c) => c.id === "done")?.tasks.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {viewMode.type === "board" ? <BoardView /> : <ListView />}
      </div>

      {/* Task Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <TaskDialog
            task={selectedTask}
            isCreating={isCreating}
            column={selectedColumn}
            users={users}
            labels={defaultLabels}
            onSave={(taskData) => {
              const taskUpdate = {
                title: taskData.title || "Untitled Task",
                description: taskData.description || "",
                priority: taskData.priority || "medium",
                tags: taskData.tags || [],
                dueDate: taskData.dueDate,
                attachments: taskData.attachments || 0,
                comments: taskData.comments || 0,
                storyPoints: taskData.storyPoints || 3,
                subtasks: taskData.subtasks || [],
                labels: taskData.labels || [],
                assignee: taskData.assignee,
              };

              if (isCreating) {
                const newTask: Task = {
                  ...taskUpdate,
                  id: generateId(),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  columnId: selectedColumn?.id || "todo",
                  status: selectedColumn?.id || "todo",
                  position: selectedColumn?.tasks.length || 0,
                };
                setColumns((prev) =>
                  prev.map((col) =>
                    col.id === selectedColumn?.id
                      ? { ...col, tasks: [...col.tasks, newTask] }
                      : col
                  )
                );
                onTaskCreate?.(newTask);
              } else if (selectedTask) {
                handleUpdateTask({ ...selectedTask, ...taskUpdate });
              }
              setIsTaskDialogOpen(false);
              setSelectedTask(null);
            }}
            onDelete={() => {
              if (selectedTask) {
                handleDeleteTask(selectedTask.id);
                setIsTaskDialogOpen(false);
                setSelectedTask(null);
              }
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Column Dialog */}
      <Dialog open={isColumnDialogOpen} onOpenChange={setIsColumnDialogOpen}>
        <DialogContent>
          <ColumnDialog
            column={selectedColumn}
            onSave={(columnData) => {
              const columnUpdate = {
                title: columnData.title || "Untitled Column",
                description: columnData.description || "",
                color: columnData.color || "#3b82f6",
                wipLimit: columnData.wipLimit,
                taskLimit: columnData.taskLimit,
              };

              if (selectedColumn) {
                handleUpdateColumn({ ...selectedColumn, ...columnUpdate });
              } else {
                const newColumn: Column = {
                  ...columnUpdate,
                  id: generateId(),
                  tasks: [],
                };
                setColumns([...columns, newColumn]);
                onColumnCreate?.(newColumn);
              }
              setIsColumnDialogOpen(false);
              setSelectedColumn(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Task Dialog Component
function TaskDialog({
  task,
  isCreating,
  column,
  users,
  labels,
  onSave,
  onDelete,
}: {
  task: Task | null;
  isCreating: boolean;
  column: Column | null;
  users: User[];
  labels: any[];
  onSave: (task: Partial<Task>) => void;
  onDelete: () => void;
}) {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    assignee: task?.assignee,
    tags: task?.tags || [],
    dueDate: task?.dueDate,
    storyPoints: task?.storyPoints || 3,
    subtasks: task?.subtasks || [],
    labels: task?.labels || [],
  });

  const [newTag, setNewTag] = useState("");
  const [newSubtask, setNewSubtask] = useState("");

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setFormData((prev) => ({
        ...prev,
        subtasks: [
          ...(prev.subtasks || []),
          {
            id: generateId(),
            title: newSubtask.trim(),
            completed: false,
          },
        ],
      }));
      setNewSubtask("");
    }
  };

  const toggleSubtask = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks?.map((st) =>
        st.id === id ? { ...st, completed: !st.completed } : st
      ),
    }));
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isCreating ? "Create Task" : "Edit Task"}</DialogTitle>
        <DialogDescription>
          {isCreating ? "Add a new task to the board" : "Update task details"}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Task title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Task description"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value: Task["priority"]) =>
                setFormData((prev) => ({ ...prev, priority: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Low
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    Medium
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    High
                  </div>
                </SelectItem>
                <SelectItem value="critical">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    Critical
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Assignee</Label>
            <Select
              value={formData.assignee?.id || "none"}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  assignee:
                    value === "none"
                      ? undefined
                      : users.find((u) => u.id === value),
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Unassigned" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Unassigned</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input
              type="date"
              value={
                formData.dueDate
                  ? new Date(formData.dueDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dueDate: e.target.value
                    ? new Date(e.target.value)
                    : undefined,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Story Points</Label>
            <Select
              value={formData.storyPoints?.toString() || "3"}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  storyPoints: parseInt(value),
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 5, 8, 13, 21].map((points) => (
                  <SelectItem key={points} value={points.toString()}>
                    {points} points
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Labels</Label>
          <div className="flex flex-wrap gap-2">
            {labels.map((label) => {
              const isSelected = formData.labels?.some(
                (l) => l.id === label.id
              );
              return (
                <Badge
                  key={label.id}
                  variant={isSelected ? "default" : "outline"}
                  className="cursor-pointer"
                  style={isSelected ? { backgroundColor: label.color } : {}}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      labels: isSelected
                        ? prev.labels?.filter((l) => l.id !== label.id)
                        : [...(prev.labels || []), label],
                    }));
                  }}
                >
                  {label.name}
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <Button type="button" onClick={addTag} size="sm">
              <IconPlus className="h-4 w-4" />
            </Button>
          </div>
          {formData.tags && formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        tags: prev.tags?.filter((t) => t !== tag),
                      }))
                    }
                    className="hover:text-red-600"
                  >
                    <IconX className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Subtasks</Label>
          <div className="flex gap-2">
            <Input
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder="Add subtask"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSubtask();
                }
              }}
            />
            <Button type="button" onClick={addSubtask} size="sm">
              <IconPlus className="h-4 w-4" />
            </Button>
          </div>
          {formData.subtasks && formData.subtasks.length > 0 && (
            <div className="space-y-2 mt-2">
              {formData.subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={() => toggleSubtask(subtask.id)}
                  />
                  <span
                    className={cn(
                      "flex-1 text-sm",
                      subtask.completed && "line-through text-gray-500"
                    )}
                  >
                    {subtask.title}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        subtasks: prev.subtasks?.filter(
                          (st) => st.id !== subtask.id
                        ),
                      }))
                    }
                  >
                    <IconTrash className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DialogFooter>
        {!isCreating && (
          <Button variant="destructive" onClick={onDelete}>
            <IconTrash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
        <Button variant="outline" onClick={() => onSave({})}>
          Cancel
        </Button>
        <Button onClick={() => onSave(formData)}>
          {isCreating ? "Create Task" : "Save Changes"}
        </Button>
      </DialogFooter>
    </>
  );
}

// Column Dialog Component
function ColumnDialog({
  column,
  onSave,
}: {
  column: Column | null;
  onSave: (column: Partial<Column>) => void;
}) {
  const [formData, setFormData] = useState<Partial<Column>>({
    title: column?.title || "",
    description: column?.description || "",
    color: column?.color || "#3b82f6",
    wipLimit: column?.wipLimit,
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{column ? "Edit Column" : "Create Column"}</DialogTitle>
        <DialogDescription>
          {column ? "Update column details" : "Add a new column to the board"}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Column title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Column description"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Color</Label>
            <Input
              type="color"
              value={formData.color}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, color: e.target.value }))
              }
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label>WIP Limit (optional)</Label>
            <Input
              type="number"
              min="1"
              value={formData.wipLimit || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  wipLimit: e.target.value
                    ? parseInt(e.target.value)
                    : undefined,
                }))
              }
              placeholder="No limit"
            />
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => onSave({})}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (!formData.title?.trim()) {
              alert("Title is required");
              return;
            }
            onSave(formData);
          }}
        >
          {column ? "Save Changes" : "Create Column"}
        </Button>
      </DialogFooter>
    </>
  );
}
