import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CategoryType = "todo" | "doing" | "done";

export interface ITodo {
  id: number;
  text: string;
  category: CategoryType;
}

interface TodoStore {
  todos: ITodo[]; // 할 일 목록 "배열"
  addTodo: (text: string, category: CategoryType) => void; // 할 일 추가 함수
  updateCategory: (id: number, category: CategoryType) => void; // category 상태 변경 함수
  deleteTodo: (id: number) => void; // todo 삭제 함수
  updateTodos: (newArray: ITodo[]) => void; // 한 카테고리 안에서 todo 이동시 업데이트
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [], // 상태: 초깃값

      // 받은 text와 category, 지금 시간으로 id 지정하여 기존 todo list에 새로운 todo 추가
      addTodo: (text, category) =>
        set((state) => ({
          todos: [...state.todos, { id: Date.now(), text, category }],
        })),

      // 받은 id로 li를 찾고 받은 category로 상태 변경
      updateCategory: (id, category) =>
        set((state) => {
          const updatedTodos = state.todos.map((todo) =>
            todo.id === id ? { ...todo, category } : todo
          );
          return { todos: [...updatedTodos] }; // ✅ 상태 변경 감지
        }),

      // 기존 배열에서 id값이 같은 todo 삭제
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id), //선택된 id가 아닌 todo만 거름
        })),

      // 순서 바뀐 todos 업데이트
      // updateTodos: (newArray) =>
      //   set({
      //     todos: newArray,
      //   }),

      updateTodos: (newTodos) =>
        set(() => {
          // console.log("🔄 Before updateTodos:", state.todos);
          // console.log("✅ New todos:", newTodos);

          return { todos: [...newTodos] }; // ✅ 새로운 배열을 반환하여 상태 변경 감지
        }),
    }),

    {
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
