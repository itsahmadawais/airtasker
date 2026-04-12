import { type FC, useState, useRef, useEffect, type FormEvent } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Todo } from '../types/todo';
import { SortableSubTaskItem } from './SortableSubTaskItem';
import { ColorPicker } from './ColorPicker';
import { getColorSchemeById } from '../constants/colorSchemes';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onAddSubTask: (todoId: string, text: string) => void;
  onToggleSubTask: (todoId: string, subTaskId: string) => void;
  onDeleteSubTask: (todoId: string, subTaskId: string) => void;
  onUpdateSubTask: (todoId: string, subTaskId: string, text: string) => void;
  onColorChange: (id: string, colorScheme: string) => void;
  onReorderSubTasks: (todoId: string, activeId: string, overId: string) => void;
  dragListeners?: SyntheticListenerMap;
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
  onColorChange,
  onReorderSubTasks,
  dragListeners,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showSubTaskForm, setShowSubTaskForm] = useState(false);
  const [subTaskInput, setSubTaskInput] = useState('');
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const subTaskInputRef = useRef<HTMLInputElement>(null);
  const colorPickerTriggerRef = useRef<HTMLButtonElement>(null);

  const colorScheme = getColorSchemeById(todo.colorScheme);

  const subTaskSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

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
    if (e.key === 'Enter') handleSave();
    else if (e.key === 'Escape') handleCancel();
  };

  const handleAddSubTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (subTaskInput.trim()) {
      onAddSubTask(todo.id, subTaskInput);
      setSubTaskInput('');
      setShowSubTaskForm(false);
    }
  };

  const handleSubTaskDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorderSubTasks(todo.id, active.id as string, over.id as string);
    }
  };

  useEffect(() => {
    if (showSubTaskForm && subTaskInputRef.current) {
      subTaskInputRef.current.focus();
    }
  }, [showSubTaskForm]);

  const accentColor = colorScheme.foreground;

  return (
    <div
      className="group/card rounded-xl transition-all duration-150 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-xs)',
        opacity: todo.completed ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'var(--color-border-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      {/* Left accent stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors duration-200"
        style={{ backgroundColor: todo.completed ? 'var(--color-completed-accent)' : accentColor }}
      />

      {/* Main row */}
      <div
        className="flex items-center gap-2 pl-1.5 pr-3 py-3"
        style={{
          backgroundColor: todo.completed ? undefined : `${colorScheme.foreground}06`,
        }}
      >
        {/* Drag handle */}
        <button
          className="flex-shrink-0 p-0.5 rounded cursor-grab active:cursor-grabbing touch-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-150"
          style={{ color: 'var(--color-text-tertiary)' }}
          aria-label="Drag to reorder"
          {...dragListeners}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
            <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
            <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
          </svg>
        </button>

        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className="flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer"
          style={{
            backgroundColor: todo.completed ? 'var(--color-accent)' : 'transparent',
            border: todo.completed ? 'none' : `2px solid ${accentColor}40`,
          }}
          onMouseEnter={(e) => {
            if (!todo.completed) e.currentTarget.style.borderColor = accentColor;
          }}
          onMouseLeave={(e) => {
            if (!todo.completed) e.currentTarget.style.borderColor = `${accentColor}40`;
          }}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Title */}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="flex-1 px-2 py-1 text-base rounded-md outline-none"
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
            className={`flex-1 text-base cursor-text select-none transition-colors duration-150 ${
              todo.completed ? 'line-through' : ''
            }`}
            style={{
              color: todo.completed ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
            }}
          >
            {todo.text}
          </span>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-0.5 flex-shrink-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-150">
          {!showSubTaskForm && (
            <button
              onClick={() => setShowSubTaskForm(true)}
              className="p-1.5 rounded-md transition-all duration-150 cursor-pointer"
              style={{ color: 'var(--color-text-tertiary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                e.currentTarget.style.color = 'var(--color-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-text-tertiary)';
              }}
              aria-label="Add sub-task"
              title="Add sub-task"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          )}

          <button
            ref={colorPickerTriggerRef}
            onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
            className="p-1.5 rounded-md transition-all duration-150 cursor-pointer"
            style={{ color: 'var(--color-text-tertiary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg)';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-tertiary)';
            }}
            aria-label="Change color"
            title="Change color"
          >
            <div
              className="w-3.5 h-3.5 rounded-full"
              style={{
                backgroundColor: colorScheme.circleColor,
                border: `1.5px solid ${colorScheme.foreground}`,
              }}
            />
          </button>

          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 rounded-md transition-all duration-150 cursor-pointer"
            style={{ color: 'var(--color-text-tertiary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-danger-subtle)';
              e.currentTarget.style.color = 'var(--color-danger)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-tertiary)';
            }}
            aria-label="Delete task"
            title="Delete task"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sub-tasks */}
      {todo.subTasks.length > 0 && (
        <div className="pl-1.5 pr-3 pb-2" style={{ borderTop: '1px solid var(--color-border-light)' }}>
          <DndContext sensors={subTaskSensors} collisionDetection={closestCenter} onDragEnd={handleSubTaskDragEnd}>
            <SortableContext items={todo.subTasks.map((st) => st.id)} strategy={verticalListSortingStrategy}>
              <div>
                {todo.subTasks.map((subTask) => (
                  <SortableSubTaskItem
                    key={subTask.id}
                    subTask={subTask}
                    onToggle={() => onToggleSubTask(todo.id, subTask.id)}
                    onDelete={() => onDeleteSubTask(todo.id, subTask.id)}
                    onUpdate={(text) => onUpdateSubTask(todo.id, subTask.id, text)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* Add sub-task form */}
      {showSubTaskForm && (
        <div className="pl-1.5 pr-3 pb-3 pt-2" style={{ borderTop: '1px solid var(--color-border-light)' }}>
          <form onSubmit={handleAddSubTask} className="flex items-center gap-2">
            <input
              ref={subTaskInputRef}
              type="text"
              value={subTaskInput}
              onChange={(e) => setSubTaskInput(e.target.value)}
              placeholder="Sub-task title..."
              className="flex-1 px-2.5 py-1.5 text-sm rounded-md outline-none transition-all duration-150"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-accent)';
                e.target.style.boxShadow = '0 0 0 3px var(--color-accent-ring)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
                e.target.style.boxShadow = 'none';
                if (!subTaskInput.trim()) setShowSubTaskForm(false);
              }}
            />
            <button
              type="submit"
              className="px-2.5 py-1.5 text-sm font-medium text-white rounded-md transition-all duration-150 cursor-pointer"
              style={{ backgroundColor: 'var(--color-accent)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent)'; }}
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => { setShowSubTaskForm(false); setSubTaskInput(''); }}
              className="px-2.5 py-1.5 text-sm font-medium rounded-md transition-all duration-150 cursor-pointer"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Color Picker Popover */}
      {isColorPickerOpen && (
        <ColorPicker
          isOpen={isColorPickerOpen}
          selectedColorSchemeId={todo.colorScheme}
          onColorChange={(colorSchemeId) => onColorChange(todo.id, colorSchemeId)}
          onClose={() => setIsColorPickerOpen(false)}
          triggerRef={colorPickerTriggerRef}
        />
      )}
    </div>
  );
};
