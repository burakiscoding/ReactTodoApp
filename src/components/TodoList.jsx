import { useContext, useState } from "react";
import { TodosContext, TodosDispatchContext } from "../context/TodosContext";

export default function TodoList() {
    const todos = useContext(TodosContext);

    return (
        <ul>
            {todos.map(t => <Todo key={t.id} todo={t} />)}
        </ul>
    );
}

function Todo({ todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useContext(TodosDispatchContext);

    function handleChangeTitle(e) {
        dispatch({
            type: 'onUpdated',
            todo: {
                ...todo,
                text: e.target.value
            }
        });
    }

    function handleChangeDone(e) {
        dispatch({
            type: 'onUpdated',
            todo: {
                ...todo,
                done: e.target.checked
            }
        });
    }

    function handleDeleteTodo() {
        dispatch({
            type: 'onDeleted',
            id: todo.id
        });
    }

    let content;
    if (isEditing) {
        content = (
            <div className="editing-container">
                <input
                    value={todo.text}
                    autoFocus={true}
                    onChange={handleChangeTitle}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setIsEditing(false);
                        }
                    }}
                />
                <button onClick={() => setIsEditing(false)}>
                    Save
                </button>
            </div >
        );
    } else {
        content = (
            <li>
                <label>
                    <input
                        type="checkbox"
                        value={todo.done}
                        defaultChecked={todo.done}
                        onChange={handleChangeDone}
                    />
                    {todo.text}
                </label>
                <div className="buttons-container">
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDeleteTodo}>Delete</button>
                </div>
            </li>
        );
    }

    return content;
}