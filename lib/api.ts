const BASE_URL = "https://assignment-todolist-api.vercel.app/api/gamja";
const TENANT_ID = "gamja";

export type TodoItem = {
  id: string;
  text: string;
  checked: boolean;
  memo?: string;
  image?: string;
};

export async function addTodoApi(item: TodoItem): Promise<TodoItem> {
  console.log("추가 요청:", item);

  const res = await fetch(`${BASE_URL}/${TENANT_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("할 일 추가 실패");
  return res.json();
}

export async function fetchTodos(): Promise<TodoItem[]> {
  const res = await fetch(`${BASE_URL}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("할 일 목록 불러오기 실패");

  return res.json();
}

export async function updateTodoApi(id: string, updated: Partial<TodoItem>) {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  if (!res.ok) throw new Error("할 일 수정 실패");
  return res.json();
}

export async function deleteTodoApi(id: string) {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("할 일 삭제 실패");
  return res.json();
}
