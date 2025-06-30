export type Notification = {
  task_id: string;
  sender: string;
  receiver: string;
  type: 'task_created' | 'task_updated' | 'task_updated_by_creator' | 'task_reassigned';
  message: string | null;
  updates: Partial<Record<string, any>> | null;
};
