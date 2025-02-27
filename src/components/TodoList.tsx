import React from "react";
import TodoForm from "./TodoForm";

function TodoList() {
  return (
    <div>
      <h1>To Do</h1>
      <select>
        <option value="ToDo">To Do</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </select>
      <TodoForm />
    </div>
  );
}

export default TodoList;
