import { useState, FormEvent } from 'react';

type TodoFormProps = {
  onAddTodo: (text: string) => void;
};

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    onAddTodo(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
        className="todo-input"
      />
      <button type="submit" className="todo-button">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
