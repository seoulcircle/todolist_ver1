import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTodoStore, CategoryType } from "../useTodoStore";

interface IForm {
  todo: string;
  category: CategoryType;
}

function TodoForm() {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const [category, setCategory] = useState<CategoryType>("todo");

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
    <div>
      <div>
        <select value={category} onChange={onChange}>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("todo", {
            required: "write todo",
          })}
          placeholder="write to do"
        />
        <button>ADD</button>
      </form>
    </div>
  );
}

export default TodoForm;
