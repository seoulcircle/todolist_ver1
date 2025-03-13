import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import styled from "styled-components";

const TodoDiv = styled.div`
  margin: 20px;
`;

function Todo() {
  return (
    <TodoDiv>
      <h1>To Do</h1>
      <TodoForm />
      <TodoList />
    </TodoDiv>
  );
}

export default Todo;
