export type Task = {
  id: number;
  task_id: string;
  title: string;
  description: string | null;
  priority: 'High' | 'Medium' | 'Low' | string;
  status: 'Pending' | 'In Progress' | 'Completed' | string;
  due_date: string | null;
  assigned_to: string;
  created_by: string;
  audio_path: string | null;
  file_path: string | null;
  created_at: string;
  updated_at: string;
};

export type TaskUpdate = {
  id: number;
  task_id: string;
  updated_by: string;
  status?: string;
  title?: string;
  description?: string;
  assigned_to?: string;
  assigned_by?: string;
  due_date?: string;
  priority?: string;
  audio_path?: string;
  file_path?: string;
  comment?: string;
  is_system_generated: boolean;
  updated_at: string;

  updated_by_username?: string;
  assigned_to_username?: string;
  assigned_by_username?: string;
  previous_assigned_to?: string | null;
};

export type TaskProgress = {
  task: Task;
  updates: TaskUpdate[];
};

export type DashboardStats = {
  assignedToMe: number;
  assignedByMe: number;
  pending: number;
  inProgress: number;
  completed: number;
};

export interface TaskFilters {
  assigned_to: string;
  created_by: string;
  status: string;
  priority: string;
  due_date: string;
  created_at: string;
  last_updated_at_date: string;
  updated_hour_range: string;
  [key: string]: string; // ← this allows dynamic access via string key
}


export type TaskListFilters = {
  priority?: string;
  status?: string;
  due_date?: string;
  assigned_to?: string;
  created_by?: string;
};
