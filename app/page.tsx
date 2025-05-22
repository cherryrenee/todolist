//app/page.tsx
"use client";

import TodoList from "@/components/todolist";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTodoStore } from "@/store/todoStore";
import { addTodoApi, fetchTodos } from "@/lib/api";

type TodoItem = {
  id: string;
  text: string;
  checked: boolean;
};

// 메인 페이지
// 할일을 입력받고, 추가하고, 체크할 수 있는 페이지
export default function Home() {
  const [inputValue, setInputValue] = useState<string>(""); // 입력값
  const { todos, setTodos, addTodo, toggleChecked, loadTodos } = useTodoStore(); // 입력값 누적
  const [largeScreen, setLaregeScreen] = useState<boolean>(false); // 화면 크기에 따른 전환

  useEffect(() => {
    const load = async () => {
      try {
        const loaded = await fetchTodos();
        if (loaded.length === 0) {
          const newTodo = {
            id: `todo-${Date.now()}`,
            text: "할 일을 입력해주세요",
            checked: false,
          };
          const created = await addTodoApi(newTodo);
          setTodos([created]);
        } else {
          setTodos(loaded);
        }
      } catch (error) {
        console.error("로딩실패 감자똥:", error);
      }
    };
    loadTodos()=>{await addTodoApi({
  id: "test-1",
  text: "초기화용 할 일",
  checked: false,
});
const todos = await fetchTodos();};
  }, []);

  // 화면 크기에 따라 로고 변경
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

  // 할일을 체크한 것과 아닌 것 구분
  const completed = todos.filter((item) => item.checked);
  const uncompleted = todos.filter((item) => !item.checked);

  // 할일 추가
  const handleSubmit = () => {
    if (inputValue.trim() === "") return; // 빈값은 추가 안 함

    // 새로운 할일 객체 생성
    const newItem: TodoItem = {
      id: `todo-${Date.now()}`,
      text: inputValue,
      checked: false,
    };

    addTodo(newItem); // 이전 값에 새 값 추가
    setInputValue(""); // 입력창 비우기
  };

  // 할일 추가 버튼 아이콘 검정색으로 변경
  const PlusIcon = () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="#0f172a">
      <path
        d="M12 5v14M5 12h14"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <>
      {/* Head 태그로 메타데이터 설정 */}
      <Head>
        <title>do it;</title>
        <meta name="description" content="Making a to do list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      {/* 헤더 */}
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
      {/* 메인 컨텐츠 */}
      <main>
        {/* 할일 추가하는 부분 */}
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
            {/* 할일이 없을 때와 있을 때 버튼 아이콘 변경 */}
            {/* 화면 크기에 따른 버튼 아이콘 변경 */}
            {todos.length === 0 && largeScreen ? (
              <div className="emptyButtonDiv">
                <Image src="/plus.svg" alt="plus" width={18} height={18} />{" "}
                <p className="add">추가하기</p>
              </div>
            ) : todos.length === 0 && !largeScreen ? (
              <Image src="/plus.svg" alt="plus" width={18} height={18} />
            ) : largeScreen ? (
              <div className="filledButtonDiv">
                <PlusIcon />
                <p className="add">추가하기</p>
              </div>
            ) : (
              <PlusIcon />
            )}
          </button>
        </form>
        {/* 할일 리스트 */}
        {/* 할일 리스트가 없을 때와 있을 때 이미지 변경 */}
        <div className="contents">
          {/* 할일 리스트*/}
          {uncompleted.length === 0 && !largeScreen ? (
            <div className="todoSection">
              <div className="todoImg">
                <Image src="todo.svg" alt="todoTitle" width={97} height={36} />
              </div>
              <div className="todoEmpty">
                <Image
                  src="/todo-small.svg"
                  alt="빈 리스트"
                  width={120}
                  height={120}
                />
                <p>할일이 없어요.</p>
                <p>TODO를 새롭게 추가해주세요!</p>
              </div>
            </div>
          ) : uncompleted.length === 0 && largeScreen ? (
            <div className="todoSection">
              <div className="todoImg">
                <Image src="todo.svg" alt="todoTitle" width={97} height={36} />
              </div>
              <div className="todoEmpty">
                <Image
                  src="/todo-large.svg"
                  alt="빈 리스트"
                  width={240}
                  height={240}
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
          {/* 완료된 할일 리스트 */}
          {completed.length === 0 && !largeScreen ? (
            <div className="doneSection">
              <div className="doneImg">
                <Image src="done.svg" alt="donTitle" width={97} height={36} />
              </div>
              <div className="doneEmpty">
                <Image
                  src="/done-small.svg"
                  alt="빈 완료"
                  width={120}
                  height={120}
                />
                <p>아직 다 한 일이 없어요.</p>
                <p>해야할 일을 체크해보세요!</p>
              </div>
            </div>
          ) : completed.length === 0 && largeScreen ? (
            <div className="doneSection">
              <div className="doneImg">
                <Image src="done.svg" alt="donTitle" width={97} height={36} />
              </div>
              <div className="doneEmpty">
                <Image
                  src="/done-large.svg"
                  alt="빈 완료"
                  width={240}
                  height={240}
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
