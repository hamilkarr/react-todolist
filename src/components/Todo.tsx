import { Categories, IToDo, toDoState } from "./atoms";
import { useSetRecoilState } from "recoil";

const Todo = ({ text, category, id }: IToDo) => {
    const setTodo = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget: { name } } = event;
        setTodo((oldToDos) => {
            const targetIndex = oldToDos.findIndex(todo => todo.id === id);
            const newToDo = { text, id, category: name as IToDo["category"] };
            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
        })
    }
    
    const handleDelete = () => {
        setTodo((oldToDos) => {
            return oldToDos.filter(todo => todo.id !== id);
        });
    };

    return (
        <li>
            <span>{text}</span>
            {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
            {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
            {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
            <button onClick={handleDelete}>Delete</button>
        </li>
    )
}

export default Todo;