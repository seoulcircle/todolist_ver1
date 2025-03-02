import { useTodoStore, ITodo, CategoryType } from "../useTodoStore";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import TodoItem from "./TodoItem";
import styled from "styled-components";
import { idText } from "typescript";

const TodoUl = styled.ul`
  margin: 10px;
`;

interface IForm {
  todo: string;
  category: CategoryType;
}

function TodoList() {
  const todos = useTodoStore((state) => state.todos); // todo list 배열
  const updateTodos = useTodoStore((state) => state.updateTodos); // todo list 순서 업데이트 함수
  const updateCategory = useTodoStore((state) => state.updateCategory); // todo list 순서 업데이트 함수

  const todoList = todos.filter((todo) => todo.category === "todo");
  const doingList = todos.filter((doing) => doing.category === "doing");
  const doneList = todos.filter((done) => done.category === "done");

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event; // 드래그 한 요소, 드랍 된 위치

    if (!over || active.id === over.id) return; // 사용자가 리스트 바깥에 드롭한 경우, 또는 같은 위치라면 변경하지 않음

    // const newArray = arrayMove(originalArray, oldIndex, newIndex);
    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);
    const newCategory = over?.data.current?.sortable.containerId;
    console.log(newCategory);
    const newArray: ITodo[] = arrayMove(todos, oldIndex, newIndex);
    updateCategory(active.id as number, newCategory);
    updateTodos(newArray);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div>
        <h2>To Do</h2>
        {/* ✅ items를 doneList의 id 배열로 설정 */}
        <SortableContext id="todo" items={todoList.map((todo) => todo.id)}>
          <TodoUl>
            {todoList?.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </TodoUl>
        </SortableContext>

        <hr />
        <h2>Doing</h2>
        <SortableContext id="doing" items={doingList.map((todo) => todo.id)}>
          <TodoUl>
            {doingList?.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </TodoUl>
        </SortableContext>

        <hr />
        <h2>Done</h2>
        <SortableContext id="done" items={doneList.map((todo) => todo.id)}>
          <TodoUl>
            {doneList?.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </TodoUl>
        </SortableContext>
        <hr />
      </div>
    </DndContext>
  );
}

export default TodoList;
