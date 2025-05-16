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
    <div>
      <input type="checkbox" id={id} checked={checked} onChange={onToggle} />
      <label htmlFor={id}>{text}</label>
    </div>
  );
}
