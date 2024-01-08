"use client";
import { Todos } from "@/components/todos";
import Image from "next/image";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-w-screen-lg">
      <Todos />
    </main>
  );
}
