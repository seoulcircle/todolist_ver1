import { useTodoStore } from "../useTodoStore";

import TodoItem from "./TodoItem";

function TodoList() {
  const todos = useTodoStore((state) => state.todos); // todo list 배열

  const todoList = todos.filter((todo) => todo.category === "todo");
  const doingList = todos.filter((doing) => doing.category === "doing");
  const doneList = todos.filter((done) => done.category === "done");

  return (
    <div>
      <h2>To Do</h2>
      <ul>
        {todoList?.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doingList?.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {doneList?.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
    </div>
  );
}

export default TodoList;
