import { useTodoStore } from "../useTodoStore";
import { SortableContext } from "@dnd-kit/sortable";

import TodoItem from "./TodoItem";

//DndContext와 sortableContext 추가 필요

function TodoList() {
  const todos = useTodoStore((state) => state.todos); // todo list 배열

  const todoList = todos.filter((todo) => todo.category === "todo");
  const doingList = todos.filter((doing) => doing.category === "doing");
  const doneList = todos.filter((done) => done.category === "done");

  return (
    <div>
      <h2>To Do</h2>
      {/* ✅ items를 doneList의 id 배열로 설정 */}
      <SortableContext items={todoList.map((todo) => todo.id)}>
        <ul>
          {todoList?.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      </SortableContext>
      <hr />
      <h2>Doing</h2>
      <SortableContext items={doingList.map((todo) => todo.id)}>
        <ul>
          {doingList?.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      </SortableContext>

      <hr />
      <h2>Done</h2>
      <SortableContext items={doneList.map((todo) => todo.id)}>
        <ul>
          {doneList?.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      </SortableContext>
      <hr />
    </div>
  );
}

export default TodoList;
