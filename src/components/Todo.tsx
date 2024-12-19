import { IToDo } from "./atoms";

const Todo = ({text}: IToDo) => {
    return (
        <li>
            <span>{text}</span>
            <button>To Do</button>
            <button>Doing</button>
            <button>Done</button>

        </li>
    )
}

export default Todo;