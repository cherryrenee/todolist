import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TodoItem = {
  id: string;
  text: string;
  checked: boolean;
  memo?: string;
  image?: string;
};

interface TodoStore {
  todos: TodoItem[];
  addTodo: (todo: TodoItem) => void;
  toggleChecked: (id: string) => void;
  updateText: (id: string, newText: string) => void;
  updateMemo: (id: string, newMemo: string) => void;
  updateImage: (id: string, newImage: string) => void;
  removeImage: (id: string) => void;
   removeTodo: (id: string) => void;
}

export const useTodoStore = create(persist<TodoStore>((set) => ({
  todos: [],

  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),

  toggleChecked: (id) =>
    set((state) => ({
      todos: state.todos.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    })),

  updateText: (id, newText) =>
    set((state) => ({
      todos: state.todos.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      ),
    })),

  updateMemo: (id, newMemo) =>
    set((state) => ({
      todos: state.todos.map((item) =>
        item.id === id ? { ...item, memo: newMemo } : item
      ),
    })),

  updateImage: (id, newImage) =>
    set((state) => ({
      todos: state.todos.map((item) =>
        item.id === id ? { ...item, image: newImage } : item
      ),
    })),

  removeImage: (id) =>
    set((state) => ({
      todos: state.todos.map((item) =>
        item.id === id ? { ...item, image: undefined } : item
      ),
    })),
    removeTodo: (id) =>
        set((state)=>({
            todos:state.todos.filter((item)=> item.id !==id),
        })),
}),
{name:"todo-storage",}
)
);
