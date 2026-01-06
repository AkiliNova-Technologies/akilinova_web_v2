export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: string;
  assignee?: User;
  tags: string[];
  dueDate?: Date;
  attachments: number;
  comments: number;
  storyPoints?: number;
  createdAt: Date;
  updatedAt: Date;
  columnId: string;
  position: number;
  subtasks?: Subtask[];
  labels?: Label[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Column {
  id: string;
  title: string;
  description?: string;
  color: string;
  taskLimit?: number;
  tasks: Task[];
  wipLimit?: number;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description?: string;
  columns: Column[];
  members: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FilterOptions {
  assignee?: string;
  priority?: string[];
  tags?: string[];
  search?: string;
  dueDate?: {
    from?: Date;
    to?: Date;
  };
}

export interface ViewMode {
  type: 'board' | 'list' | 'calendar' | 'timeline';
  groupBy?: 'status' | 'assignee' | 'priority' | 'label';
}