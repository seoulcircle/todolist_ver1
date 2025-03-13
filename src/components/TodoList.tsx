import { useState } from "react";
import { useTodoStore, ITodo, CATEGORY } from "../useTodoStore";
import { arrayMove } from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import Droppable from "./Droppable";
import TodoItem from "./TodoItem";
import styled from "styled-components";

const TodoLists = styled.div`
  display: flex;
  flex-direction: row;
`;

function TodoList() {
  const todos = useTodoStore((state) => state.todos); // 기존 todo list 배열
  const updateTodos = useTodoStore((state) => state.updateTodos); // todo list 순서 업데이트 함수
  const updateCategory = useTodoStore((state) => state.updateCategory); // 카테고리 변경 시 todo list 순서 업데이트 함수
  // const { todos, updateTodos, updateCategory } = useTodoStore();
  const [activeTodo, setActiveTodo] = useState<ITodo | null>(null);

  const lists = [
    {
      id: CATEGORY.TODO,
      title: "To Do",
      items: todos.filter((todo) => todo.category === CATEGORY.TODO),
    },
    {
      id: CATEGORY.DOING,
      title: "Doing",
      items: todos.filter((todo) => todo.category === CATEGORY.DOING),
    },
    {
      id: CATEGORY.DONE,
      title: "Done",
      items: todos.filter((todo) => todo.category === CATEGORY.DONE),
    },
  ];

  // Pick<Type, Keys> => 새로운 타입 만드는 유틸리티 타입
  const onDragStart = ({ active }: Pick<DragStartEvent, "active">) => {
    setActiveTodo(todos.find((todo) => todo.id === active.id) || null);
  };
  const onDragEnd = ({
    active,
    over,
  }: Pick<DragEndEvent, "active" | "over">) => {
    setActiveTodo(null);
    if (!over || active.id === over.id) return;

    // 1. 드롭한 위치의 새로운 카테고리 찾기
    const newCategory = over.data.current?.sortable?.containerId || over.id;

    // 2. `newCategory`가 유효한 리스트 id인지 확인
    const VALID_CATEGORIES = new Set(Object.values(CATEGORY)); //CATEGORY의 값들을 상수로
    if (!VALID_CATEGORIES.has(newCategory)) return; // newCategory가 "todo", "doing", "done"이 아니면 return으로 함수 종료

    // 3. 카테고리 변경
    const id = typeof active.id === "string" ? Number(active.id) : active.id;
    updateCategory(id, newCategory); // id가 숫자인지 타입 체크 후 변환

    // 4. 변경된 상태에서 최신 todos 가져오기
    const updatedTodos = useTodoStore.getState().todos; // 변경된 최신 상태의 todos
    // 5. 새로운 카테고리 내에서 정렬하기
    const filteredTodos = updatedTodos.filter(
      (todo) => todo.category === newCategory
    );
    const oldIndex = filteredTodos.findIndex((todo) => todo.id === active.id);
    const newIndex = filteredTodos.findIndex((todo) => todo.id === over?.id);
    const newArray: ITodo[] = arrayMove(filteredTodos, oldIndex, newIndex); // 옮겨진 categoty의 요소가 순서대로 정렬

    // 6. 새로운 정렬 상태를 업데이트
    updateTodos([
      ...updatedTodos.filter((todo) => todo.category !== newCategory), //
      ...newArray,
    ]);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div>{todos.length}개의 할 일이 있어요.</div>
      <TodoLists>
        {lists.map(({ id, title, items }) => (
          <Droppable key={id} id={id} items={items} title={title} />
        ))}
        <DragOverlay>
          {activeTodo ? <TodoItem {...activeTodo} dragOverlay /> : null}
        </DragOverlay>
      </TodoLists>
    </DndContext>
  );
}

export default TodoList;
