import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod 스키마 정의
const formSchema = z.object({
  Email: z.string()
    .email("유효한 이메일 주소를 입력해주세요"),
  "First Name": z.string()
    .min(1, "이름을 입력해주세요"),
  "Last Name": z.string()
    .min(1, "성을 입력해주세요"),
  Password: z.string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
  "Confirm Password": z.string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
}).refine((data) => data.Password === data["Confirm Password"], {
  message: "비밀번호가 일치하지 않습니다",
  path: ["Confirm Password"]
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
        {...register("Email")}
        placeholder="Email"
      />
      {errors.Email && <span style={{ color: "red" }}>{errors.Email.message}</span>}
      
      <input
        {...register("First Name")}
        placeholder="First Name"
      />
      {errors["First Name"] && <span style={{ color: "red" }}>{errors["First Name"].message}</span>}
      
      <input
        {...register("Last Name")}
        placeholder="Last Name"
      />
      {errors["Last Name"] && <span style={{ color: "red" }}>{errors["Last Name"].message}</span>}
      
      <input
        type="password"
        {...register("Password")}
        placeholder="Password"
      />
      {errors.Password && <span style={{ color: "red" }}>{errors.Password.message}</span>}
      
      <input
        type="password"
        {...register("Confirm Password")}
        placeholder="Confirm Password"
      />
      {errors["Confirm Password"] && (
        <span style={{ color: "red" }}>{errors["Confirm Password"].message}</span>
      )}
      
      <button type="submit">Add</button>
    </form>
  );
};

export default ToDoList;
