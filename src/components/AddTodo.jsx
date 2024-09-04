import { useContext, useState } from "react";
import { TodosDispatchContext } from "../context/TodosContext";

export default function AddTodo() {
    const [text, setText] = useState('');
    const dispatch = useContext(TodosDispatchContext);

    function handleAddTodo() {
        dispatch({
            type: 'onAdded',
            text: text
        });
        setText('');
    }

    return (
        <div>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleAddTodo();
                    }
                }}
            />
            <button onClick={handleAddTodo}>Add</button>
        </div>
    );
}