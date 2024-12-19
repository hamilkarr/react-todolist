import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atoms";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod 스키마 정의
const formSchema = z.object({
    todo: z.string().min(1, { message: "할 일을 입력해주세요" })
})

type FormSchema = z.infer<typeof formSchema>;

const CreateTodo = () => {
    const setToDo = useSetRecoilState(toDoState);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormSchema>({
        resolver: zodResolver(formSchema)
    });
    const handleValid = (data: FormSchema) => {
        setToDo((prev) => [{ text: data.todo, id: Date.now(), category: "TO_DO" }, ...prev]);
        setValue('todo', '');
    };
    return (
        <form
            onSubmit={handleSubmit(handleValid)}
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
    )
}

export default CreateTodo;