import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import '../components/Todo.css';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = 'all' | 'active' | 'completed';

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<Filter>('all');

  function handleAdd(text: string) {
    const newTodo: TodoItem = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  }

  function handleToggle(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDelete(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function handleUpdate(id: number, newText: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }

  function handleClearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  })

  return (
    <div className='todo-container'>
      <h1>To-Do List</h1>
      <TodoForm onAdd={handleAdd} />

      <div className="filters">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>

      {todos.some((todo) => todo.completed) && (
        <button className="clear-completed" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      )}

      {filteredTodos.length === 0 ? (
        <p className="no-todos">Nothing on the To-Do List! 😎</p>
      ) : (
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
