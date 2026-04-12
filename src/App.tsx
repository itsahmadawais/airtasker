import { type FC, useState, useEffect } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { ViewToggle, type ViewType } from './components/ViewToggle';
import { ThemeToggle, type Theme } from './components/ThemeToggle';
import { useTodos } from './hooks/useTodos';

const App: FC = () => {
  const [view, setView] = useState<ViewType>(() => {
    const saved = localStorage.getItem('todo-view-preference');
    return (saved === 'list' || saved === 'grid') ? saved : 'list';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('todo-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleViewChange = (newView: ViewType) => {
    setView(newView);
    localStorage.setItem('todo-view-preference', newView);
  };

  const handleThemeToggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('todo-theme', next);
  };

  const {
    todos,
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
    updateTodoColor,
    reorderTodos,
    reorderSubTasks,
    clearCompleted,
    deleteAll,
    stats,
  } = useTodos();

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-6 lg:px-8 h-14"
        style={{
          backgroundColor: 'var(--color-header-bg)',
          borderBottom: '1px solid var(--color-header-border)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold tracking-tight" style={{ color: 'var(--color-header-text)', fontFamily: 'var(--font-display)' }}>
            AirTasker
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {stats.total > 0 && (
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-header-muted)' }}>
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: 'var(--color-header-badge-bg)',
                  color: 'var(--color-header-badge-text)',
                }}
              >
                {stats.active} active
              </span>
              <span style={{ color: 'var(--color-header-dim)' }}>/</span>
              <span>{stats.total} total</span>
            </div>
          )}
          <a
            href="https://github.com/itsahmadawais/airtasker"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg transition-all duration-150"
            style={{ color: 'var(--color-header-muted)', backgroundColor: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.color = 'var(--color-header-text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-header-muted)';
            }}
            aria-label="View on GitHub"
            title="View on GitHub"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full px-6 lg:px-8 py-6">
            {/* Add task */}
            <TodoForm onAddTodo={addTodo} />

            {/* Toolbar */}
            {stats.total > 0 && (
              <div
                className="flex items-center justify-between gap-4 mb-5 pb-4"
                style={{ borderBottom: '1px solid var(--color-border-light)' }}
              >
                <TodoFilters
                  currentFilter={filter}
                  onFilterChange={setFilter}
                  stats={stats}
                  onClearCompleted={clearCompleted}
                  onDeleteAll={deleteAll}
                />
                <ViewToggle currentView={view} onViewChange={handleViewChange} />
              </div>
            )}

            {/* Task list */}
            <TodoList
              todos={todos}
              view={view}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
              onAddSubTask={addSubTask}
              onToggleSubTask={toggleSubTask}
              onDeleteSubTask={deleteSubTask}
              onUpdateSubTask={updateSubTask}
              onColorChange={updateTodoColor}
              onReorderTodos={reorderTodos}
              onReorderSubTasks={reorderSubTasks}
            />
          </div>
        </div>

        {/* Footer */}
        <footer
          className="flex-shrink-0 flex items-center justify-center h-10 text-sm"
          style={{
            color: 'var(--color-text-tertiary)',
            borderTop: '1px solid var(--color-border-light)',
            backgroundColor: 'var(--color-bg)',
          }}
        >
          Made with ❤️ by{' '}
          <a
            href="https://github.com/itsahmadawais/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 font-medium hover:underline"
            style={{ color: 'var(--color-accent)' }}
          >
            Awais Ahmad
          </a>
        </footer>
      </div>
    </div>
  );
};

export default App;
