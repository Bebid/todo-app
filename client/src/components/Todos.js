import TodoItem from "./TodoItem";

function Todos(oProps) {
    return (
        <div className="py-4">
            <ul>
                {oProps.data.map((sTodo, iKey) => {
                    return <TodoItem data={sTodo} key={iKey}></TodoItem>;
                })}
            </ul>
        </div>
    );
}

export default Todos;
