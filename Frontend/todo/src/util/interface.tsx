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

export interface ApiContextType {
  getAllTodos: () => Promise<TodoData[]>;
  upcomingTodos: () => Promise<TodoData[]>;
}
