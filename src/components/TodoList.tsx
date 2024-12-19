import { useRecoilValue, useRecoilState } from "recoil";
import { toDoSelector, categoryState, Categories, IToDo } from "./atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

const ToDoList = () => {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { currentTarget: { value } } = event;
        setCategory(value as IToDo["category"]);
    }
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <select value={category} onChange={onChange}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
            </select>
            <CreateTodo />
            <hr />
            {toDos.map((toDo) => (
                <Todo key={toDo.id} {...toDo} />
            ))}
        </div>
    );
};

export default ToDoList;
