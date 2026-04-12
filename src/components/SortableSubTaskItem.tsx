import { type FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { SubTask } from '../types/todo';
import { SubTaskItem } from './SubTaskItem';

interface SortableSubTaskItemProps {
  subTask: SubTask;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (text: string) => void;
}

export const SortableSubTaskItem: FC<SortableSubTaskItemProps> = ({
  subTask,
  ...props
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: subTask.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <SubTaskItem
        subTask={subTask}
        dragListeners={listeners}
        {...props}
      />
    </div>
  );
};
