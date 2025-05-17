"use client";

import {useParams} from "next/navigation";
import Image from "next/image";
import { FileUploader } from "@/components/imageFile";
import { useTodoStore } from "@/store/todoStore";


const metadata = {
  title: "do it;",
  description: "Making a to do list",
  icons: { icon: "/favicon.svg" },
};

export default function DetailPage() {
 const params = useParams();
  const id = params.todoDetail as string;
 
  const { todos, toggleChecked, updateText } = useTodoStore();
const todo = todos.find((t) => t.id === params.todoDetail);

if (!todo) return <div>존재하지 않는 항목입니다.</div>;
  return (
    <>
      <header>
        <a href="/">
          <Image
            id="logo"
            alt="logo"
            src="/Size=Small.png"
            width={71}
            height={40}
          />
        </a>
      </header>
      <main>
        <div className="todoDiv">
          <div className={`todoList ${todo.checked ? "checked" : ""}`}>
            <input
              className="checkbox"
              type="checkbox"
              id={todo.id}
              checked={todo.checked}
              onChange={()=> toggleChecked(todo.id)}
            />
            <span className="checkmark" onClick={()=>toggleChecked(todo.id)} />
            <input
              className="todoBar"
              type="text"
              value={todo.text}
              onChange={(e) => updateText(todo.id, e.target.value)}
            />
          </div>
        </div>
        <FileUploader todoId={todo.id} />
      </main>
    </>
  );
}
