import { type FC, useState, useRef, useEffect } from 'react';
import type { SubTask } from '../types/todo';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface SubTaskItemProps {
  subTask: SubTask;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (text: string) => void;
  dragListeners?: SyntheticListenerMap;
}

export const SubTaskItem: FC<SubTaskItemProps> = ({
  subTask,
  onToggle,
  onDelete,
  onUpdate,
  dragListeners,
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
    if (e.key === 'Enter') handleSave();
    else if (e.key === 'Escape') handleCancel();
  };

  return (
    <div className="group/sub flex items-center gap-2 pl-3 pr-1 py-1.5">
      {/* Drag handle */}
      <button
        className="flex-shrink-0 p-0.5 rounded cursor-grab active:cursor-grabbing touch-none opacity-0 group-hover/sub:opacity-100 transition-opacity duration-150"
        style={{ color: 'var(--color-text-tertiary)' }}
        aria-label="Drag to reorder"
        {...dragListeners}
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
          <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
          <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
        </svg>
      </button>

      {/* Checkbox */}
      <button
        onClick={onToggle}
        className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center transition-all duration-150 cursor-pointer"
        style={{
          backgroundColor: subTask.completed ? 'var(--color-accent)' : 'transparent',
          border: subTask.completed ? 'none' : '1.5px solid var(--color-border)',
        }}
        onMouseEnter={(e) => {
          if (!subTask.completed) e.currentTarget.style.borderColor = 'var(--color-accent)';
        }}
        onMouseLeave={(e) => {
          if (!subTask.completed) e.currentTarget.style.borderColor = 'var(--color-border)';
        }}
        aria-label={subTask.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {subTask.completed && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Text */}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-0.5 text-sm rounded-md outline-none"
          style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-accent)',
            boxShadow: '0 0 0 3px var(--color-accent-ring)',
            color: 'var(--color-text-primary)',
          }}
        />
      ) : (
        <span
          onClick={handleEdit}
          className={`flex-1 text-sm cursor-text select-none transition-colors duration-150 ${
            subTask.completed ? 'line-through' : ''
          }`}
          style={{
            color: subTask.completed ? 'var(--color-text-tertiary)' : 'var(--color-text-secondary)',
          }}
        >
          {subTask.text}
        </span>
      )}

      {/* Delete */}
      <button
        onClick={onDelete}
        className="flex-shrink-0 p-1 rounded-md transition-all duration-150 opacity-0 group-hover/sub:opacity-100 cursor-pointer"
        style={{ color: 'var(--color-text-tertiary)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-danger-subtle)';
          e.currentTarget.style.color = 'var(--color-danger)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--color-text-tertiary)';
        }}
        aria-label="Delete sub-task"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
