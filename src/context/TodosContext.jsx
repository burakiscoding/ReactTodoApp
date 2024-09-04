import { createContext, useReducer } from "react";

const initialTodos = [
    { id: 0, text: 'Play some fortnite', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink water', done: true }
];
let nextId = 3;

function todosReducer(todos, action) {
    switch (action.type) {
        case 'onAdded':
            return [
                {
                    id: nextId++,
                    text: action.text,
                    done: false
                },
                ...todos
            ];
        case 'onUpdated':
            return todos.map(t => {
                if (t.id === action.todo.id) {
                    return action.todo
                } else {
                    return t;
                }
            });
        case 'onDeleted':
            return todos.filter(t => t.id !== action.id);
        default:
            throw new Error('Unknown action ' + action.type);
    }
}

export const TodosContext = createContext(null);
export const TodosDispatchContext = createContext(null);

export function TodoProvider({ children }) {
    const [todos, dispatch] = useReducer(todosReducer, initialTodos);

    return (
        <TodosContext.Provider value={todos}>
            <TodosDispatchContext.Provider value={dispatch}>
                {children}
            </TodosDispatchContext.Provider>
        </TodosContext.Provider>
    );
}
