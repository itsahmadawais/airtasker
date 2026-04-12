import { type FC, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import type { Todo } from '../types/todo';
import type { ViewType } from './ViewToggle';
import { SortableTodoItem } from './SortableTodoItem';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  view: ViewType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onAddSubTask: (todoId: string, text: string) => void;
  onToggleSubTask: (todoId: string, subTaskId: string) => void;
  onDeleteSubTask: (todoId: string, subTaskId: string) => void;
  onUpdateSubTask: (todoId: string, subTaskId: string, text: string) => void;
  onColorChange: (id: string, colorScheme: string) => void;
  onReorderTodos: (activeId: string, overId: string) => void;
  onReorderSubTasks: (todoId: string, activeId: string, overId: string) => void;
}

export const TodoList: FC<TodoListProps> = ({
  todos,
  view,
  onToggle,
  onDelete,
  onUpdate,
  onAddSubTask,
  onToggleSubTask,
  onDeleteSubTask,
  onUpdateSubTask,
  onColorChange,
  onReorderTodos,
  onReorderSubTasks,
}) => {
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragId(null);
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorderTodos(active.id as string, over.id as string);
    }
  };

  const handleDragCancel = () => {
    setActiveDragId(null);
  };

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ backgroundColor: 'var(--color-accent-subtle)' }}
        >
          <svg
            className="w-7 h-7"
            style={{ color: 'var(--color-accent)' }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        </div>
        <p className="text-base font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          No tasks yet
        </p>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
          Add your first task to get started
        </p>
      </div>
    );
  }

  const activeTodo = activeDragId ? todos.find((t) => t.id === activeDragId) : null;
  const strategy = view === 'grid' ? rectSortingStrategy : verticalListSortingStrategy;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={todos.map((t) => t.id)} strategy={strategy}>
        <div
          className={
            view === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'
              : 'flex flex-col gap-2'
          }
        >
          {todos.map((todo) => (
            <SortableTodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onAddSubTask={onAddSubTask}
              onToggleSubTask={onToggleSubTask}
              onDeleteSubTask={onDeleteSubTask}
              onUpdateSubTask={onUpdateSubTask}
              onColorChange={onColorChange}
              onReorderSubTasks={onReorderSubTasks}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay dropAnimation={null}>
        {activeTodo ? (
          <div style={{ opacity: 0.9 }}>
            <TodoItem
              todo={activeTodo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onAddSubTask={onAddSubTask}
              onToggleSubTask={onToggleSubTask}
              onDeleteSubTask={onDeleteSubTask}
              onUpdateSubTask={onUpdateSubTask}
              onColorChange={onColorChange}
              onReorderSubTasks={onReorderSubTasks}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
