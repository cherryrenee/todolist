"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FileUploader } from "@/components/imageFile";
import { useTodoStore } from "@/store/todoStore";
import { useState, useEffect } from "react";

export default function DetailPage() {
  const params = useParams();
  const id = params.todoDetail as string;
  const router = useRouter();
  const [largeScreen, setLaregeScreen] = useState<boolean>(false);
  useEffect(() => {
    const updateSize = () => {
      setLaregeScreen(window.innerWidth >= 744);
    };

    updateSize(); // 초기 화면 크기 설정
    window.addEventListener("resize", updateSize); // 리사이즈 이벤트 리스너 등록

    return () => {
      window.removeEventListener("resize", updateSize); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

  const { todos, toggleChecked, updateText } = useTodoStore();
  const todo = todos.find((t) => t.id === id);

  if (!todo) return <div>존재하지 않는 항목입니다.</div>;
  return (
    <>
      <header>
        <div className="doIt">
          <a href="/">
            {largeScreen ? (
              <Image src="/largesize.svg" width={151} height={40} alt="logo" />
            ) : (
              <Image
                id="logo"
                alt="logo"
                src="/smallsize.svg"
                width={71}
                height={40}
              />
            )}
          </a>
        </div>
      </header>
      <main>
        <div className="todoDiv">
          <div className={`todoList ${todo.checked ? "checked" : ""}`}>
            <input
              className="checkbox"
              type="checkbox"
              id={todo.id}
              checked={todo.checked}
              onChange={() => toggleChecked(todo.id)}
            />
            <span
              className="checkmark"
              onClick={() => toggleChecked(todo.id)}
            />
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
