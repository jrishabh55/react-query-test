export type Todo = {
  id: number;
  title: string;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return response.json();
};

export const fetchTodo = async (id: number): Promise<Todo> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return response.json();
};
