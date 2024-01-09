"use client";
import { fetchTodo, fetchTodos } from "@/api/todo";
import Image from "next/image";
import Link from "next/link";
import { useQuery, useQueryClient } from "react-query";
import OfflineTodos from "../OfflineTodos";

export const Todos = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const queryClient = useQueryClient();

  const loadTodo = async (todoId: number) => {
    const data = await fetchTodo(todoId);

    queryClient.setQueryData(["todo", todoId], data);
    const offlineData = queryClient.getQueryData(["offline-todos"]) as unknown[];

    // Replacing the title for offline reference
    queryClient.setQueryData(["offline-todos"], [...offlineData, { id: data, title: `Offline - ${data.title}` }]);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 gap-2">
      <section id="todo" className="border p-2 rounded">
        <h1 className="text-2xl underline ml-2">Todos</h1>
        {data?.map((todo) => (
          <Link key={todo.id} className="border p-2 my-2 rounded flex" href={`/todo/${todo.id}`}>
            <p>{todo.title}</p>
            <Image
              className="ml-auto w-5 h-5 cursor-pointer"
              width={20}
              height={20}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                loadTodo(todo.id);
              }}
              src="https://img.icons8.com/ios/50/000000/download-from-cloud.png"
              alt="download"
            />
          </Link>
        ))}
      </section>
      <section className="border rounded p-2">
        <h2>Offline</h2>
        <OfflineTodos />
      </section>
    </div>
  );
};
