import { TodoItem } from "@/components/ServerComponents";
import Form from "../components/addTodoForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const fetchTodo = async (token: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/mytasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-next-token": token,
      },
      cache: "no-cache",
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log(err);
    return [];
  }
};
export default async function Home() {
  const token: string = cookies().get("x-next-token")?.value || "";
  if (!token) redirect("/login");
  const tasks = await fetchTodo(token);
  console.log(tasks);
  return (
    <div className="container">
      <Form />
      <section className="todosContainer">
        {tasks.map((task: any) => (
          <TodoItem
            title={task.title}
            description={task.description}
            _id={task._id}
            completed={task.completed}
          />
        ))}
      </section>
    </div>
  );
}
