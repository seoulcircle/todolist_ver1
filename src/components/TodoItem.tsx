import { useTodoStore, ITodo, CategoryType } from "../useTodoStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";

const TodoLi = styled.li`
  margin: 8px 0;
  color: ${(props) => props.theme.bgColor};
  padding: 10px 20px;
  border-radius: 15px;
`;

interface TodoItemProps extends ITodo {
  dragOverlay?: boolean; // ✅ 드래그 오버레이용 prop 추가 (선택적)
}

function TodoItem({ text, category, id, dragOverlay = false }: TodoItemProps) {
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
    marginRight: "10px",
    cursor: dragOverlay ? "grabbing" : "grab",
    backgroundColor: dragOverlay ? "yellow" : "black",
  };

  return (
    <TodoLi ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners}>
        <span>{text}</span>
        <button value="todo" onClick={onClick} disabled={category === "todo"}>
          todo
        </button>
        <button value="doing" onClick={onClick} disabled={category === "doing"}>
          doing
        </button>
        <button value="done" onClick={onClick} disabled={category === "done"}>
          done
        </button>
        <button value="delete" onClick={onClick}>
          delete
        </button>
      </div>
    </TodoLi>
  );
}

export default TodoItem;
