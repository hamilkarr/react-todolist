import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod 스키마 정의
const formSchema = z.object({
  todo: z.string().min(1, { message: "할 일을 입력해주세요" })
})

type FormSchema = z.infer<typeof formSchema>;

const ToDoList = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
    setValue('todo', '');
  };

  return (
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
  );
};

export default ToDoList;
