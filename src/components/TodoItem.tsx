import { useTodoStore, ITodo, CATEGORY, CategoryType } from "../useTodoStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import { useState } from "react";

const TodoLi = styled.li`
  margin: 8px 0;
  color: ${(props) => props.theme.textColor};
  padding: 10px 20px;
  border-radius: 15px;
  position: relative;
  list-style: none;
  &:hover {
    color: aqua;
  }
`;
const TodoLiDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ButtonMore = styled.button`
  color: ${(props) => props.theme.textColor};
  background-color: inherit;
  border: none;
  cursor: pointer;
`;

const ButtonTodo = styled.div`
  position: absolute;
  z-index: 20;
`;
interface TodoItemProps extends ITodo {
  dragOverlay?: boolean; // dragOverlay prop 추가 (선택적)
}

function TodoItem({ text, category, id, dragOverlay = false }: TodoItemProps) {
  const [isVisible, setIsVisible] = useState(false);

  // updateCategory 함수 가져오기
  const updateCategory = useTodoStore((state) => {
    return state.updateCategory;
  });
  const deleteTodo = useTodoStore((state) => {
    return state.deleteTodo;
  });

  // 버튼 클릭 시 해당 li의 id, 클릭한 버튼의 value -> zustand로
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newCategory = event.currentTarget.value as CategoryType | "delete";

    if (newCategory === "delete") {
      deleteTodo(id);
    } else {
      updateCategory(id, newCategory);
    }
  };

  // useSortable()을 사용해서 드래그 가능한 상태로 만들기
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  // 드래그 시 자연스럽게 움직이도록 스타일 설정
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: dragOverlay ? "grabbing" : "grab",
    backgroundColor: dragOverlay ? "#253d86" : "black",
  };

  return (
    <TodoLi ref={setNodeRef} style={style}>
      <TodoLiDiv {...attributes} {...listeners}>
        <span>{text}</span>
        <div>
          <ButtonMore
            onClick={() => setIsVisible((prev) => !prev)}
            onPointerDown={(e) => e.stopPropagation()}
          >
            ···
          </ButtonMore>
          {isVisible && (
            <ButtonTodo onPointerDown={(e) => e.stopPropagation()}>
              <button
                value={CATEGORY.TODO}
                onClick={onClick}
                disabled={category === CATEGORY.TODO}
              >
                TODO
              </button>
              <button
                value={CATEGORY.DOING}
                onClick={onClick}
                disabled={category === CATEGORY.DOING}
              >
                DOING
              </button>
              <button
                value={CATEGORY.DONE}
                onClick={onClick}
                disabled={category === CATEGORY.DONE}
              >
                DONE
              </button>
              <button value="delete" onClick={onClick}>
                삭제
              </button>
            </ButtonTodo>
          )}
        </div>
      </TodoLiDiv>
    </TodoLi>
  );
}

export default TodoItem;
