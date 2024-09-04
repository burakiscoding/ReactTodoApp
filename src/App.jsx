import './App.css'
import AddTodo from './components/AddTodo';
import { TodoProvider } from './context/TodosContext';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="todo-container">
      <TodoProvider>
        <h1>Todos</h1>
        <AddTodo />
        <TodoList />
      </TodoProvider>
    </div>
  )
}

export default App




