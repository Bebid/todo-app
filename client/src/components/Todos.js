import TodoItem from "./TodoItem";

function Todos(oProps) {
    return (
        <div>
            <h2>{oProps.type}</h2>
            <ul>
                {oProps.data.map((sTodo, iKey) => {
                    return <TodoItem data={sTodo} key={iKey}></TodoItem>;
                })}
            </ul>
        </div>
    );
}

export default Todos;
