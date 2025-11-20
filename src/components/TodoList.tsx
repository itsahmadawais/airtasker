import { type FC } from 'react';
import type { Todo } from '../types/todo';
import type { ViewType } from './ViewToggle';
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
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-xl text-zinc-500">No todos yet. Add one above!</p>
      </div>
    );
  }

  if (view === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onAddSubTask={onAddSubTask}
            onToggleSubTask={onToggleSubTask}
            onDeleteSubTask={onDeleteSubTask}
            onUpdateSubTask={onUpdateSubTask}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onAddSubTask={onAddSubTask}
          onToggleSubTask={onToggleSubTask}
          onDeleteSubTask={onDeleteSubTask}
          onUpdateSubTask={onUpdateSubTask}
        />
      ))}
    </div>
  );
};

