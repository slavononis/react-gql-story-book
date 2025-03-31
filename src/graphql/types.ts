export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodosData {
  todos: {
    data: Todo[];
    meta: {
      totalCount: number;
    };
  };
}
export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface CreateTodoData {
  createTodo: Todo;
}

export interface UpdateTodoData {
  updateTodo: Todo;
}

export interface DeleteTodoData {
  deleteTodo: boolean;
}

export interface TodoVariables {
  id: string;
}

export interface CreateTodoVariables {
  title: string;
  completed: boolean;
}

export interface UpdateTodoVariables {
  id: string;
  completed: boolean;
}
