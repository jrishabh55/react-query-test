"use client";
import { fetchTodo } from "@/api/todo";
import Link from "next/link";
import { useQuery } from "react-query";

const TodoPage = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["todo", params.id],
    queryFn: () => fetchTodo(Number(params.id)),
    retryOnMount: false,
    refetchInterval: false,
    refetchOnMount: false,
  });
  console.log("🚀 ~ file: page.tsx:11 ~ TodoPage ~ data:", data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <Link href="/">
        <h1 className="flex">
          {/* Back icon */}
          <svg className="w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <title>Back</title>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Todo
        </h1>
      </Link>
      <div className="flex gap-4 p-2 bg-blue-50">
        <h2>{data?.id}</h2>
        <p>{data?.title}</p>
      </div>
    </div>
  );
};

export default TodoPage;
