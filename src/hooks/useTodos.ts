import { useState, useCallback, useEffect } from 'react';
import type { Todo, SubTask, FilterType } from '../types/todo';

const STORAGE_KEY = 'todos';

const loadTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const todos = JSON.parse(stored);
      return todos.map((todo: any) => ({
        ...todo,
        subTasks: (todo.subTasks || []).map((subTask: any) => ({
          ...subTask,
          createdAt: new Date(subTask.createdAt),
          updatedAt: new Date(subTask.updatedAt),
        })),
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      })).map((todo: any) => ({
        ...todo,
        subTasks: todo.subTasks || [],
      }));
    }
  } catch (error) {
    console.error('Failed to load todos from storage:', error);
  }
  return [];
};

const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos to storage:', error);
  }
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodosFromStorage());
  const [filter, setFilter] = useState<FilterType>('all');

  // Save to localStorage whenever todos change
  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      subTasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const newCompleted = !todo.completed;
          return {
            ...todo,
            completed: newCompleted,
            subTasks: todo.subTasks.map((subTask) => ({
              ...subTask,
              completed: newCompleted,
              updatedAt: new Date(),
            })),
            updatedAt: new Date(),
          };
        }
        return todo;
      })
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id: string, text: string) => {
    if (!text.trim()) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, text: text.trim(), updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const addSubTask = useCallback((todoId: string, text: string) => {
    if (!text.trim()) return;

    const newSubTask: SubTask = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subTasks: [...todo.subTasks, newSubTask],
              updatedAt: new Date(),
            }
          : todo
      )
    );
  }, []);

  const toggleSubTask = useCallback((todoId: string, subTaskId: string) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === todoId) {
          const updatedSubTasks = todo.subTasks.map((subTask) =>
            subTask.id === subTaskId
              ? { ...subTask, completed: !subTask.completed, updatedAt: new Date() }
              : subTask
          );
          
          // Check if all sub-tasks are completed to auto-complete parent
          const allSubTasksCompleted = updatedSubTasks.length > 0 && 
            updatedSubTasks.every((st) => st.completed);
          
          return {
            ...todo,
            subTasks: updatedSubTasks,
            completed: allSubTasksCompleted ? true : todo.completed,
            updatedAt: new Date(),
          };
        }
        return todo;
      })
    );
  }, []);

  const deleteSubTask = useCallback((todoId: string, subTaskId: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subTasks: todo.subTasks.filter((st) => st.id !== subTaskId),
              updatedAt: new Date(),
            }
          : todo
      )
    );
  }, []);

  const updateSubTask = useCallback((todoId: string, subTaskId: string, text: string) => {
    if (!text.trim()) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subTasks: todo.subTasks.map((st) =>
                st.id === subTaskId
                  ? { ...st, text: text.trim(), updatedAt: new Date() }
                  : st
              ),
              updatedAt: new Date(),
            }
          : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const deleteAll = useCallback(() => {
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      setTodos([]);
    }
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    addSubTask,
    toggleSubTask,
    deleteSubTask,
    updateSubTask,
    clearCompleted,
    deleteAll,
    stats,
  };
};

