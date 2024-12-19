import { useRecoilValue } from "recoil";
import { toDoState } from "./atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

const ToDoList = () => {
  const toDo = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateTodo />  
      <ul>
        {toDo.map((toDo) => (
          <Todo key={toDo.id} {...toDo} /> 
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
