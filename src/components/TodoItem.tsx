import { useTodoStore, ITodo, CategoryType } from "../useTodoStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TodoItem({ text, category, id }: ITodo) {
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
  };

  return (
    <li ref={setNodeRef} {...attributes} {...listeners} style={style}>
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
    </li>
  );
}

export default TodoItem;
