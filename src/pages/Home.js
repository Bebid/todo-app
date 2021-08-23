import { useRef } from "react";
import { useState } from "react";

import Todo from "../components/Todo";

function Home() {
  var [Todos, setTodos] = useState(["Learn React", "Master React"]);
  const inputTodoRef = useRef();
  function addTodo(event) {}

  return (
    <div>
      <input type="text" placeholder="List a to do" ref={inputTodoRef} />
      <button onClick={addTodo}>Submit</button>
      <Todo data={Todos} type="todo"></Todo>
      <Todo data={Todos} type="done"></Todo>
    </div>
  );
}

export default Home;
