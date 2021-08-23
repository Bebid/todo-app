import TodoItem from "./TodoItem";

function Todo(props) {
  return (
    <div>
      <h2>{props.type}</h2>
      <ul>
        {props.data.map((todo, key) => (
          <TodoItem data={todo} key={key}></TodoItem>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
