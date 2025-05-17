"use client";

import { useRouter } from "next/navigation";

type TodoListProps = {
  id: string;
  text: string;
  checked: boolean;
  onToggle: () => void;
};

export default function TodoList({
  id,
  text,
  checked,
  onToggle,
}: TodoListProps) {
  const router = useRouter();

  return (
    <div className="todoDiv">
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
