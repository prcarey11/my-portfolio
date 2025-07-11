type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="todo-item">
      <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        {todo.text}
      </label>
      <button onClick={() => onDelete(todo.id)} className="delete-button">
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
