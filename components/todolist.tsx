type TodoListProps = {
  id: string;
  text: string;
  checked: boolean;
  onToggle: () => void;
};

export default function TodoList({
  id,
  text,
  checked,
  onToggle,
}: TodoListProps) {
  return (
    <div className="todoList">
      <input
        className="checkbox"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onToggle}
      />
      <label className="todoCheckbox" htmlFor={id}>
        <span className="checkmark" />
        <span className="todoText">{text}</span>
      </label>
    </div>
  );
}
