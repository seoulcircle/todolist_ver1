import { create } from "zustand";

export type CategoryType = "todo" | "doing" | "done";

export interface ITodo {
  id: number;
  text: string;
  category: CategoryType;
}

interface TodoStore {
  todos: ITodo[]; // 할 일 목록 "배열"
  addTodo: (text: string, category: CategoryType) => void; // 할 일 추가하는 "함수"
  updateCategory: (id: number, category: CategoryType) => void; // 할 일 추가하는 "함수"
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [], // 상태: 초깃값

  // 받은 text와 category, 지금 시간으로 id 지정하여 기존 todo list에 새로운 todo 추가
  addTodo: (text, category) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, category }],
    })),

  // 받은 id로 li를 찾고 받은 category로 상태 변경
  updateCategory: (id, category) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, category } : todo
      ),
    })),
}));
