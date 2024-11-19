import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod 스키마 정의
const formSchema = z.object({
  email: z.string()
    .email("유효한 이메일 주소를 입력해주세요"),
  firstName: z.string()
    .min(1, "이름을 입력해주세요"),
  lastName: z.string()
    .min(1, "성을 입력해주세요"),
  password: z.string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
  confirmPassword: z.string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"]
});

type FormSchema = z.infer<typeof formSchema>;

const ToDoList = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
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
        {...register("email")}
        placeholder="Email"
      />
      {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
      
      <input
        {...register("firstName")}
        placeholder="First Name"
      />
      {errors.firstName && <span style={{ color: "red" }}>{errors.firstName.message}</span>}
      
      <input
        {...register("lastName")}
        placeholder="Last Name"
      />
      {errors.lastName && <span style={{ color: "red" }}>{errors.lastName.message}</span>}
      
      <input
        type="password"
        {...register("password")}
        placeholder="Password"
      />
      {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
      
      <input
        type="password"
        {...register("confirmPassword")}
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && (
        <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
      )}
      
      <button type="submit">Add</button>
    </form>
  );
};

export default ToDoList;
