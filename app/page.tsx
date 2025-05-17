"use client";

import TodoList from "@/components/todolist";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useTodoStore } from "@/store/todoStore";

type TodoItem = {
  id: string;
  text: string;
  checked: boolean;
};

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const {todos, addTodo, toggleChecked} = useTodoStore(); // 입력값 누적
  
  const completed = todos.filter((item) => item.checked);
  const uncompleted = todos.filter((item) => !item.checked);

  const handleSubmit = () => {
    if (inputValue.trim() === "") return; // 빈값은 추가 안 함

    const newItem: TodoItem = {
      id: `todo-${Date.now()}`,
      text: inputValue,
      checked: false,
    };

    addTodo(newItem); // 이전 값에 새 값 추가
    setInputValue(""); // 입력창 비우기
  };

  return (
    <>
      <Head>
        <title>do it;</title>
        <meta name="description" content="Making a to do list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

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
        <form
          className="forms"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            className="inputBar"
            placeholder="할 일을 입력해주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className={todos.length === 0 ? "buttonEmpty" : "buttonFilled"}
          >
            {todos.length === 0 ? (
              <Image src="/plus.svg" alt="plus" width={18} height={18} />
            ) : (
              "+"
            )}
          </button>
        </form>
        <div className="contents">
          {uncompleted.length === 0 ? (
            <div className="todoSection">
              <div className="todoImg">
                <Image src="todo.svg" alt="todoTitle" width={97} height={36} />
              </div>
              <div className="todoEmpty">
                <Image
                  src="/todo-small.png"
                  alt="빈 리스트"
                  width={120}
                  height={120}
                />
                <p>할일이 없어요.</p>
                <p>TODO를 새롭게 추가해주세요!</p>
              </div>
            </div>
          ) : (
            <div className="todoSection">
              <div className="todoImg">
                <Image src="todo.svg" alt="todoTitle" width={97} height={36} />
              </div>
              {uncompleted.map((item) => (
                <TodoList
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  checked={item.checked}
                  onToggle={() => toggleChecked(item.id)}
                />
              ))}
            </div>
          )}
          {completed.length === 0 ? (
            <div className="doneSection">
              <div className="doneImg">
                <Image src="done.svg" alt="donTitle" width={97} height={36} />
              </div>
              <div className="doneEmpty">
                <Image
                  src="/done-small.png"
                  alt="빈 완료"
                  width={120}
                  height={120}
                />
                <p>아직 다 한 일이 없어요.</p>
                <p>해야할 일을 체크해보세요!</p>
              </div>
            </div>
          ) : (
            <div className="doneSection">
              <div className="doneImg">
                <Image src="done.svg" alt="donTitle" width={97} height={36} />
              </div>
              {completed.map((item) => (
                <TodoList
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  checked={item.checked}
                  onToggle={() => toggleChecked(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
