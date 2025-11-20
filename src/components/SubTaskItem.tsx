import { type FC, useState, useRef, useEffect } from 'react';
import type { SubTask } from '../types/todo';

interface SubTaskItemProps {
  subTask: SubTask;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (text: string) => void;
}

export const SubTaskItem: FC<SubTaskItemProps> = ({
  subTask,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(subTask.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(subTask.text);
  };

  const handleSave = () => {
    if (editText.trim() && editText !== subTask.text) {
      onUpdate(editText);
    } else if (!editText.trim()) {
      setEditText(subTask.text);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(subTask.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="group flex items-center gap-2 pl-8 pr-2 py-2">
      <button
        onClick={onToggle}
        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
        style={{
          background: subTask.completed
            ? 'linear-gradient(145deg, #16a085 0%, #138d75 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          border: subTask.completed ? 'none' : '2px solid #d0d0d0',
          boxShadow: subTask.completed
            ? 'inset 1px 1px 2px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(22, 160, 133, 0.3)'
            : 'inset 1px 1px 3px rgba(0, 0, 0, 0.1), inset -1px -1px 3px rgba(255, 255, 255, 0.8)',
        }}
        aria-label={subTask.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {subTask.completed && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        )}
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-1 text-sm border-2 border-zinc-400 rounded focus:outline-none focus:ring-2 focus:ring-zinc-200"
        />
      ) : (
        <span
          onClick={handleEdit}
          className={`flex-1 text-sm cursor-text select-none transition-all ${
            subTask.completed
              ? 'line-through text-zinc-400'
              : 'text-zinc-700 hover:text-zinc-600'
          }`}
        >
          {subTask.text}
        </span>
      )}

      <button
        onClick={onDelete}
        className="flex-shrink-0 p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Delete sub-task"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    </div>
  );
};

