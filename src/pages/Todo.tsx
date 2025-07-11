import { useState } from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

type TodoItemType = {
  id: number;
  text: string;
  completed: boolean;
};

const Todo = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  const addTodo = (text: string) => {
    const newTodo: TodoItemType = {
      id: Date.now(), // quick unique id
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Todo App</h1>
      <TodoForm onAddTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todo;
