import { type FC, useState, useRef, useEffect, type FormEvent } from 'react';
import type { Todo } from '../types/todo';
import { SubTaskItem } from './SubTaskItem';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onAddSubTask: (todoId: string, text: string) => void;
  onToggleSubTask: (todoId: string, subTaskId: string) => void;
  onDeleteSubTask: (todoId: string, subTaskId: string) => void;
  onUpdateSubTask: (todoId: string, subTaskId: string, text: string) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onUpdate,
  onAddSubTask,
  onToggleSubTask,
  onDeleteSubTask,
  onUpdateSubTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showSubTaskForm, setShowSubTaskForm] = useState(false);
  const [subTaskInput, setSubTaskInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const subTaskInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim() && editText !== todo.text) {
      onUpdate(todo.id, editText);
    } else if (!editText.trim()) {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleAddSubTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (subTaskInput.trim()) {
      onAddSubTask(todo.id, subTaskInput);
      setSubTaskInput('');
      setShowSubTaskForm(false);
    }
  };

  useEffect(() => {
    if (showSubTaskForm && subTaskInputRef.current) {
      subTaskInputRef.current.focus();
    }
  }, [showSubTaskForm]);

  return (
    <div
      className="rounded-lg transition-all duration-200 mb-3 relative overflow-hidden"
      style={{
        background: todo.completed
          ? 'linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 100%)'
          : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        boxShadow: todo.completed
          ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1)'
          : '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
      }}
      onMouseEnter={(e) => {
        if (!todo.completed) {
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!todo.completed) {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div className="group flex items-center gap-3 p-4">
      <button
        onClick={() => onToggle(todo.id)}
        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
        style={{
          background: todo.completed
            ? 'linear-gradient(145deg, #16a085 0%, #138d75 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          border: todo.completed ? 'none' : '2px solid #d0d0d0',
          boxShadow: todo.completed
            ? 'inset 1px 1px 2px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(22, 160, 133, 0.3)'
            : 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)',
        }}
        onMouseEnter={(e) => {
          if (!todo.completed) {
            e.currentTarget.style.borderColor = '#16a085';
            e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8), 0 0 0 2px rgba(22, 160, 133, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          if (!todo.completed) {
            e.currentTarget.style.borderColor = '#d0d0d0';
            e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)';
          }
        }}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && (
          <svg
            className="w-4 h-4 text-white"
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
          className="flex-1 px-2 py-1 rounded"
          style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            border: '2px solid #16a085',
            boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8), 0 0 0 2px rgba(22, 160, 133, 0.2)',
            color: '#2c3e50',
          }}
        />
      ) : (
        <span
          onClick={handleEdit}
          className={`flex-1 text-lg cursor-text select-none transition-all ${
            todo.completed
              ? 'line-through text-zinc-400'
              : 'text-zinc-800 hover:text-zinc-600'
          }`}
        >
          {todo.text}
        </span>
      )}

      {!showSubTaskForm && (
        <button
          onClick={() => setShowSubTaskForm(true)}
          className="flex-shrink-0 p-2 rounded transition-all duration-200 cursor-pointer"
          style={{
            background: 'transparent',
            color: '#95a5a6',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(145deg, #16a085 0%, #138d75 100%)';
            e.currentTarget.style.boxShadow = '0 3px 8px rgba(22, 160, 133, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
            const svg = e.currentTarget.querySelector('svg');
            if (svg) svg.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'scale(1)';
            const svg = e.currentTarget.querySelector('svg');
            if (svg) svg.style.color = '#95a5a6';
          }}
          aria-label="Add sub-task"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: '#95a5a6' }}
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 p-2 rounded transition-all duration-200 cursor-pointer"
        style={{
          color: '#95a5a6',
          background: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#ef4444';
          e.currentTarget.style.background = '#fee2e2';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#95a5a6';
          e.currentTarget.style.background = 'transparent';
        }}
        aria-label="Delete todo"
      >
        <svg
          className="w-5 h-5"
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

      {/* Sub-tasks section */}
      {todo.subTasks.length > 0 && (
        <div className="px-4 pb-2 space-y-1">
          {todo.subTasks.map((subTask) => (
            <SubTaskItem
              key={subTask.id}
              subTask={subTask}
              onToggle={() => onToggleSubTask(todo.id, subTask.id)}
              onDelete={() => onDeleteSubTask(todo.id, subTask.id)}
              onUpdate={(text) => onUpdateSubTask(todo.id, subTask.id, text)}
            />
          ))}
        </div>
      )}

      {/* Add sub-task form */}
      {showSubTaskForm && (
        <div className="px-4 pb-3 pt-2 border-t border-zinc-200 mt-2">
          <form onSubmit={handleAddSubTask} className="flex flex-col sm:flex-row gap-2">
            <input
              ref={subTaskInputRef}
              type="text"
              value={subTaskInput}
              onChange={(e) => setSubTaskInput(e.target.value)}
              placeholder="Add sub-task..."
              className="flex-1 px-2 py-1.5 text-xs sm:text-sm rounded transition-all todo-input min-w-0"
              style={{
                background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                border: '2px solid #d0d0d0',
                boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)',
                color: '#2c3e50',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#16a085';
                e.target.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8), 0 0 0 2px rgba(22, 160, 133, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d0d0d0';
                e.target.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)';
                if (!subTaskInput.trim()) {
                  setShowSubTaskForm(false);
                }
              }}
            />
            <div className="flex gap-1.5 sm:flex-shrink-0">
              <button
                type="submit"
                className="px-2 py-1.5 text-xs sm:text-sm text-white font-medium rounded transition-all duration-200 cursor-pointer whitespace-nowrap"
                style={{
                  background: 'linear-gradient(145deg, #16a085 0%, #138d75 100%)',
                  boxShadow: '0 2px 8px rgba(22, 160, 133, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(1px)';
                  e.currentTarget.style.boxShadow = '0 1px 4px rgba(22, 160, 133, 0.2), inset 0 1px 0 rgba(0, 0, 0, 0.2)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(22, 160, 133, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(22, 160, 133, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)';
                }}
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubTaskForm(false);
                  setSubTaskInput('');
                }}
                className="px-2 py-1.5 text-xs sm:text-sm font-medium rounded transition-all duration-200 cursor-pointer whitespace-nowrap"
                style={{
                  background: 'linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 100%)',
                  color: '#34495e',
                  boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(0, 0, 0, 0.1)',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(1px)';
                  e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.15)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(0, 0, 0, 0.1)';
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

