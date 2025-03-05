import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
// import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
// import { arrayMove } from "@dnd-kit/sortable";
// import { useTodoStore, ITodo } from "../useTodoStore";
import styled from "styled-components";

const TodoDiv = styled.div`
  margin: 20px;
`;

function Todo() {
  // 기존 배열을 받고 새로운 배열(newArray)을 zustand로 반환해야함
  // const todos = useTodoStore((state) => state.todos); // todo list 배열
  // const updateTodos = useTodoStore((state) => state.updateTodos); // todo list 순서 업데이트 함수
  // 드래그가 끝났을 때 실행되는 함수

  // const onDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event; // 드래그 한 요소, 드랍 된 위치

  //   if (!over || active.id === over.id) return; // 사용자가 리스트 바깥에 드롭한 경우, 또는 같은 위치라면 변경하지 않음

  //   // const newArray = arrayMove(originalArray, oldIndex, newIndex);
  //   const oldIndex = todos.findIndex((todo) => todo.id === active.id);
  //   const newIndex = todos.findIndex((todo) => todo.id === over.id);

  //   const newArray: ITodo[] = arrayMove(todos, oldIndex, newIndex);
  //   updateTodos(newArray);
  //   console.log(newArray);
  // };

  return (
    <TodoDiv>
      <h1>To Do</h1>
      <TodoForm />
      <TodoList />
    </TodoDiv>
  );
}

export default Todo;
