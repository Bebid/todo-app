import { createContext, useState } from "react";
import axios from "axios";

const TodosContext = createContext({
    aTodos: [],
    aNewTodos: [],
    aDoneTodos: [],
    getTodos: () => {},
    addTodo: (aTodo) => {},
    removeTodo: (sId) => {},
    toggleTodoStatus: (sId, sStatus) => {},
});

export function TodosContextProvider(oProps) {
    const [aTodos, setTodos] = useState([]);

    const aNewTodos = aTodos.filter((oTodo) => oTodo.status === "new");
    const aDoneTodos = aTodos.filter((oTodo) => oTodo.status === "done");

    function getTodos() {
        axios
            .get(
                "http://localhost:3001/api/todos/" +
                    localStorage.getItem("userId")
            )
            .then((oResponse) => {
                setTodos(oResponse.data);
            });
    }

    function addTodo(oTodo) {
        axios
            .post("http://localhost:3001/api/todos/insert", oTodo)
            .then((oResponse) => {
                oTodo.id = oResponse.data.insertId;
                setTodos((aPrevTodos) => {
                    return aPrevTodos.concat(oTodo);
                });
            });
    }

    function removeTodo(sId) {
        axios.delete("http://localhost:3001/api/todos/" + sId);
        setTodos((aPrevTodos) => {
            return aPrevTodos.filter((aTodo) => aTodo.id !== sId);
        });
    }

    function toggleTodoStatus(oTodo) {
        const sStatus = oTodo.status === "new" ? "done" : "new";
        axios.put("http://localhost:3001/api/todos", {
            status: sStatus,
            id: oTodo.id,
        });
        setTodos((aPrevTodos) => {
            return aPrevTodos.map((oPrevTodo) => {
                return oPrevTodo.id === oTodo.id
                    ? { ...oPrevTodo, status: sStatus }
                    : oPrevTodo;
            });
        });
    }

    const oContext = {
        aTodos: aTodos,
        aNewTodos: aNewTodos,
        aDoneTodos: aDoneTodos,
        getTodos: getTodos,
        addTodo: addTodo,
        removeTodo: removeTodo,
        toggleTodoStatus: toggleTodoStatus,
    };

    return (
        <TodosContext.Provider value={oContext}>
            {oProps.children}
        </TodosContext.Provider>
    );
}

export default TodosContext;
