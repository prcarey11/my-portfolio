import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';

type TodoItemProps = {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newText: string) => void;
};

export default function TodoItem({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  onUpdate,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleEditStart() {
    setEditText(text);
    setIsEditing(true);
  }

  function handleEditSave() {
    const trimmed = editText.trim();
    if (trimmed.length === 0) {
      setEditText(text); // revert if empty
    } else {
      onUpdate(id, trimmed);
    }
    setIsEditing(false);
  }

  function handleEditCancel() {
    setEditText(text);
    setIsEditing(false);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEditText(e.target.value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        aria-label={`Toggle task ${text}`}
      />
      {isEditing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={handleChange}
          onBlur={handleEditSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          <span
            style={{
              textDecoration: completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
            onDoubleClick={handleEditStart}
          >
            {text}
          </span>
          <button onClick={handleEditStart}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </>
      )}
    </li>
  );
}
