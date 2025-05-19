"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

type TodoListProps = {
  id: string;
  text: string;
  checked: boolean;
  onToggle: () => void;
};

// TodoList 컴포넌트
export default function TodoList({
  id,
  text,
  checked,
  onToggle,
}: TodoListProps) {
  const router = useRouter();

  return (
    <div className="todoDiv">
      {/* 헤더 부분 */}
      <div className={`todoList ${checked ? " checked" : ""}`}>
        <input
          className="checkbox"
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onToggle}
        />
        <span className="checkmark" onClick={onToggle} />
        <div
          className="todoBar"
          onClick={() => {
            router.push(`/detail/${id}`);
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
