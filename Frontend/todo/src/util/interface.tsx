export interface TodoData {
  id?: number;
  name: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  tags: string[];
  completed: boolean;
}
