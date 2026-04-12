import { type FC, useState, type FormEvent } from 'react';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

export const TodoForm: FC<TodoFormProps> = ({ onAddTodo }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTodo(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: `1px solid ${isFocused ? 'var(--color-accent)' : 'var(--color-border)'}`,
          boxShadow: isFocused
            ? 'var(--shadow-sm), 0 0 0 3px var(--color-accent-ring)'
            : 'var(--shadow-xs)',
        }}
      >
        <svg
          className="w-5 h-5 flex-shrink-0"
          style={{ color: isFocused ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Add a new task..."
          className="flex-1 bg-transparent outline-none text-base"
          style={{ color: 'var(--color-text-primary)' }}
          autoFocus
        />
        {input.trim() && (
          <button
            type="submit"
            className="flex-shrink-0 px-4 py-1.5 text-sm font-medium text-white rounded-lg transition-all duration-150 cursor-pointer"
            style={{
              backgroundColor: 'var(--color-accent)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)';
            }}
          >
            Add Task
          </button>
        )}
      </div>
    </form>
  );
};
