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
        <div
            className="text-black border border-white border-opacity-25 rounded-2xl 
            backdrop-filter backdrop-blur-md self-center p-8 
            bg-white bg-opacity-25"
        >
            <form className="mb-4 flex flex-row" onSubmit={addTodo}>
                <input className="border-2 flex-grow bg-transparent rounded-md border-black py-2 px-4 mr-3 placeholder-black placeholder-opacity-50"
                    type="text"
                    placeholder="To do"
                    ref={refTodoInput}
                />
                <button className="bg-black py-2 px-4 rounded-md text-white" onClick={addTodo}>List</button>
            </form>
            <div className="divide-y divide-black divide-opacity-25">
                <Todos data={oTodosContext.aNewTodos} type="new"></Todos>
                <Todos data={oTodosContext.aDoneTodos} type="done"></Todos>
            </div>
        </div>
    );
}

export default Home;
