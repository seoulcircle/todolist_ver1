import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import TodoItem from "./TodoItem";
import styled from "styled-components";

const DroppableDiv = styled.div`
  width: 200px;
  height: 300px;
  padding: 20px;
  border-right: 1px solid white;
  overflow: scroll;
`;

const TodoUl = styled.ul``;

const Droppable = ({ id, items, title }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <DroppableDiv>
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
    </DroppableDiv>
  );
};

export default Droppable;
