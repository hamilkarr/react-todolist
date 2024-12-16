import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { atom,  useRecoilState } from "recoil";

interface IToDo { 
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

// Zod 스키마 정의
const formSchema = z.object({
  todo: z.string().min(1, { message: "할 일을 입력해주세요" })
})

type FormSchema = z.infer<typeof formSchema>;

const ToDoList = () => {
  const [toDo, setToDo] = useRecoilState(toDoState);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormSchema) => {
    setToDo((prev) => [{ text: data.todo, id: Date.now(), category: "TO_DO" }, ...prev]);
    setValue('todo', '');
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "50vw",
          margin: "50px auto",
        }}
      >
        <input
          {...register('todo', { required: true })}
          placeholder="Write a to do"
        />
        {errors.todo && <span style={{ color: "red" }}>{errors.todo.message}</span>}
        <button type="submit">Add</button>
      </form>
      <ul>
        {toDo.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
