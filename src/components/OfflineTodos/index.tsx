import { useQuery } from "react-query";

const OfflineTodos = () => {
  const { data, isLoading } = useQuery<{ title: string; id: number }[]>({
    queryKey: ["offline-todos"],
    queryFn: () => {
      const offlineData = localStorage.getItem("offline-todos");
      if (offlineData) {
        return JSON.parse(offlineData);
      }
      return [];
    },
  });

  return (
    <div className="gap-y-2 flex flex-col">
      {data?.map((todo) => (
        <p key={todo.id} className="p-2 bg-blue-50">
          {todo.id} {todo.title}
        </p>
      ))}
    </div>
  );
};

export default OfflineTodos;
