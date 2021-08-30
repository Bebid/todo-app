import { useContext } from "react";

// context
import TodosContext from "../store/todos-context";

function TodoItem(oProps) {
    const oTodosContext = useContext(TodosContext);

    function deleteTodo() {
        oTodosContext.removeTodo(oProps.data.id);
    }

    function toggleTodoStatus() {
        oTodosContext.toggleTodoStatus(oProps.data);
    }

    return (
        <li>
            <input type="checkbox" id="todo" onClick={toggleTodoStatus} />
            <label htmlFor="todo">{oProps.data.text}</label>
            <button onClick={deleteTodo}>Delete</button>
        </li>
    );
}

export default TodoItem;
