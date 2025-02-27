import { useTodoStore, ITodo, CategoryType } from "../useTodoStore";

function TodoItem({ text, category, id }: ITodo) {
  // updateCategory 함수 가져오기
  const updateCategory = useTodoStore((state) => {
    return state.updateCategory;
  });

  // 버튼 클릭 시 해당 li의 id, 클릭한 버튼의 value -> zustand로
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newCategory = event.currentTarget.value as CategoryType;
    updateCategory(id, newCategory);
  };

  return (
    <li>
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
    </li>
  );
}

export default TodoItem;
