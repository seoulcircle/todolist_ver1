import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import TodoItem from "./TodoItem";
import styled from "styled-components";

const TodoUl = styled.ul`
  margin: 10px;
  width: 100%;
  min-width: 100px;
  height: 100%;
  padding: 20px;
  border-right: 1px solid white;
`;

const Droppable = ({ id, items, title }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div>
      <h2>{title}</h2>
      <SortableContext
        id={id}
        items={items.map((todo) => todo.id)}
        strategy={rectSortingStrategy}
      >
        <TodoUl className="droppable" ref={setNodeRef}>
          {items.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </TodoUl>
      </SortableContext>
    </div>
  );
};

export default Droppable;
