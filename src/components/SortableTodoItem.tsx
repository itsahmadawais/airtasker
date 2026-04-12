import { type FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface SortableTodoItemProps {
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
}

export const SortableTodoItem: FC<SortableTodoItemProps> = ({
  todo,
  ...props
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : undefined,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TodoItem
        todo={todo}
        dragListeners={listeners}
        {...props}
      />
    </div>
  );
};
