export const TASK_STATUS_TODO = "todo";
export const TASK_STATUS_DOING = "doing";
export const TASK_STATUS_DONE = "done";

type TaskStatus =
  | typeof TASK_STATUS_TODO
  | typeof TASK_STATUS_DOING
  | typeof TASK_STATUS_DONE;

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  urgency: string;
  impact: string;
  obt: boolean;
}
