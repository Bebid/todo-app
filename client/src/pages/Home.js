import { useEffect, useRef, useContext } from "react";
import axios from "axios";

// components
import Todos from "../components/Todos";

// contexts
import TodosContext from "../store/todos-context";

function Home() {
    const oTodosContext = useContext(TodosContext);
    const refTodoInput = useRef();

    function addTodo(oEvent) {
        oEvent.preventDefault();
        const sText = refTodoInput.current.value;
        const oTodo = {
            text: sText,
            status: "new",
            user_id: localStorage.getItem("userId"),
        };
        oTodosContext.addTodo(oTodo);
        refTodoInput.current.value = "";
    }

    function setUserId() {
        if (localStorage.getItem("userId") === null) {
            axios.get("http://localhost:3001/api/users").then((oResponse) => {
                setUserId(oResponse.data);

                function setUserId(aUsers) {
                    const sUserId = Math.random().toString(36).slice(2);
                    const oUser = aUsers.filter((oUser) => {
                        return oUser.id === sUserId;
                    });

                    if (oUser.length === 0) {
                        localStorage.setItem("userId", sUserId);
                        axios.post("http://localhost:3001/api/users/" + sUserId);
                    } else {
                        setUserId(aUsers);
                    }
                }
            });
        }
    }

    useEffect(() => {
        setUserId();
        oTodosContext.getTodos();
    }, []);

    return (
        <div>
            <form onSubmit={addTodo}>
                <input
                    type="text"
                    placeholder="List your to do"
                    ref={refTodoInput}
                />
                <button onClick={addTodo}>Submit</button>
            </form>
            <Todos data={oTodosContext.aNewTodos} type="new"></Todos>
            <Todos data={oTodosContext.aDoneTodos} type="done"></Todos>
        </div>
    );
}

export default Home;
