import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";

// context
import TodosContext from "../store/todos-context";

function TodoItem(oProps) {
    const oTodosContext = useContext(TodosContext);
    const [bRemoveButtonDisplay, setRemoveButtonDisplay] = useState(false);

    const oCheckBox =
        oProps.data.status === "done" ? (
            <FontAwesomeIcon
                icon={faCheckCircle}
                className="self-center"
            ></FontAwesomeIcon>
        ) : (
            <FontAwesomeIcon
                icon={faCircle}
                className="self-center"
            ></FontAwesomeIcon>
        );

    const sDoneColor =
        oProps.data.status === "done" ? "text-black text-opacity-50" : "";

    function showRemoveButton() {
        setRemoveButtonDisplay(true);
    }

    function hideRemoveButton() {
        setRemoveButtonDisplay(false);
    }

    function deleteTodo() {
        oTodosContext.removeTodo(oProps.data.id);
    }

    function toggleTodoStatus(oEvent) {
        oEvent.preventDefault();
        oTodosContext.toggleTodoStatus(oProps.data);
    }

    return (
        <li
            className={"rounded-md flex flex-row p-2 gap-2 hover:bg-white hover:bg-opacity-25 cursor-pointer " + sDoneColor}
            onMouseOver={showRemoveButton}
            onMouseLeave={hideRemoveButton}
        >
            {oCheckBox}
            <input
                className="hidden self-center bg-transparent"
                type="checkbox"
                id={"todo" + oProps.data.id}
                defaultChecked={oProps.data.status === "done"}
                onClick={toggleTodoStatus}
            />
            <label
                className={
                    "flex-grow cursor-pointer " +
                    (oProps.data.status === "done" ? "line-through" : "")
                }
                htmlFor={"todo" + oProps.data.id}
            >
                {oProps.data.text}
            </label>
            {bRemoveButtonDisplay && (
                <a onClick={deleteTodo}>
                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </a>
            )}
        </li>
    );
}

export default TodoItem;
