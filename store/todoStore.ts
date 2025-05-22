import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  fetchTodos,
  addTodoApi,
  updateTodoApi,
  deleteTodoApi,
  TodoItem,
} from "@/lib/api";

// TodoItem 타입 정의
interface TodoStore {
  todos: TodoItem[];
  loadTodos: () => Promise<void>;
  addTodo: (todo: TodoItem) => Promise<void>;
  toggleChecked: (id: string) => void;
  updateText: (id: string, newText: string) => void;
  updateMemo: (id: string, newMemo: string) => void;
  updateImage: (id: string, newImage: string) => void;
  removeImage: (id: string) => void;
  removeTodo: (id: string) => void;
  setTodos: (newTodos: TodoItem[]) => void;
}

// Zustand 스토어 생성
export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  setTodos: (newTodos) => set({ todos: newTodos }),
  loadTodos: async () => {
    const todos = await fetchTodos();
    set({ todos });
  },

  addTodo: async (todo) => {
    set((state) => ({
      todos: [...state.todos, todo],
    }));
    await addTodoApi(todo);
  },

  toggleChecked: (id) => {
    const updatedTodos = get().todos.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    set({ todos: updatedTodos });

    const updated = updatedTodos.find((item) => item.id === id);
    if (updated) {
      updateTodoApi(id, { checked: updated.checked });
    }
  },

  updateText: (id, newText) => {
    const updatedTodos = get().todos.map((item) =>
      item.id === id ? { ...item, text: newText } : item
    );
    set({ todos: updatedTodos });
    updateTodoApi(id, { text: newText });
  },

  updateMemo: (id, newMemo) => {
    const updatedTodos = get().todos.map((item) =>
      item.id === id ? { ...item, memo: newMemo } : item
    );
    set({ todos: updatedTodos });
    updateTodoApi(id, { memo: newMemo });
  },

  updateImage: (id, newImage) => {
    const updatedTodos = get().todos.map((item) =>
      item.id === id ? { ...item, image: newImage } : item
    );
    set({ todos: updatedTodos });
    updateTodoApi(id, { image: newImage });
  },

  removeImage: (id) => {
    const updatedTodos = get().todos.map((item) =>
      item.id === id ? { ...item, image: undefined } : item
    );
    set({ todos: updatedTodos });
    updateTodoApi(id, { image: "" });
  },

  removeTodo: (id) => {
    const updatedTodos = get().todos.filter((item) => item.id !== id);
    set({ todos: updatedTodos });
    deleteTodoApi(id);
  },
}));
