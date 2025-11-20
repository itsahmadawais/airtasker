import { type FC, useState, FormEvent } from 'react';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

export const TodoForm: FC<TodoFormProps> = ({ onAddTodo }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTodo(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 text-lg rounded-lg transition-all todo-input"
          style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            border: '2px solid #d0d0d0',
            boxShadow: 'inset 2px 2px 5px rgba(0, 0, 0, 0.1), inset -2px -2px 5px rgba(255, 255, 255, 0.8)',
            color: '#2c3e50',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#16a085';
            e.target.style.boxShadow = 'inset 2px 2px 5px rgba(0, 0, 0, 0.1), inset -2px -2px 5px rgba(255, 255, 255, 0.8), 0 0 0 3px rgba(22, 160, 133, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d0d0d0';
            e.target.style.boxShadow = 'inset 2px 2px 5px rgba(0, 0, 0, 0.1), inset -2px -2px 5px rgba(255, 255, 255, 0.8)';
          }}
          autoFocus
        />
        <button
          type="submit"
          className="px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: input.trim() 
              ? 'linear-gradient(145deg, #16a085 0%, #138d75 100%)'
              : 'linear-gradient(145deg, #95a5a6 0%, #7f8c8d 100%)',
            boxShadow: input.trim()
              ? '0 4px 15px rgba(22, 160, 133, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
              : '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            transform: input.trim() ? 'translateY(0)' : 'translateY(0)',
          }}
          onMouseDown={(e) => {
            if (input.trim()) {
              e.currentTarget.style.transform = 'translateY(2px)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(22, 160, 133, 0.3), inset 0 1px 0 rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseUp={(e) => {
            if (input.trim()) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(22, 160, 133, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (input.trim()) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(22, 160, 133, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)';
            }
          }}
          disabled={!input.trim()}
        >
          Add
        </button>
      </div>
    </form>
  );
};

