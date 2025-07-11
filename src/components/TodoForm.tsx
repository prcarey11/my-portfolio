import { useState, FormEvent } from 'react';

type TodoFormProps = {
  onAdd: (text: string) => void;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed.length > 0) {
      onAdd(trimmed);
      setText('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
