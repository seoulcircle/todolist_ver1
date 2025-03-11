import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTodoStore, CategoryType, CATEGORY } from "../useTodoStore";
import styled from "styled-components";

interface IForm {
  todo: string;
  category: CategoryType;
}

const TodoFormDiv = styled.div`
  margin: 10px 0;
`;
function TodoForm() {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const [category, setCategory] = useState<CategoryType>(CATEGORY.TODO);

  //addTodo 함수 가져오기
  const addTodo = useTodoStore((state) => {
    return state.addTodo;
  });

  //select 된 category value 넘기기
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as CategoryType);
  };

  // add 버튼 클릭 시 사용자가 입력한 text, category 값을 zustand에 저장
  const onSubmit = (newTodo: IForm) => {
    addTodo(newTodo.todo, category);
    reset();
  };

  return (
    <TodoFormDiv>
      <div>
        <select value={category} onChange={onChange}>
          <option value={CATEGORY.TODO}>To Do</option>
          <option value={CATEGORY.DOING}>Doing</option>
          <option value={CATEGORY.DONE}>Done</option>
        </select>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register(CATEGORY.TODO, {
            required: "write todo",
          })}
          placeholder="write to do"
        />
        <button>ADD</button>
      </form>
    </TodoFormDiv>
  );
}

export default TodoForm;
