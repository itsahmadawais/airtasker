import { type FC, useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { ViewToggle, type ViewType } from './components/ViewToggle';
import { useTodos } from './hooks/useTodos';

const App: FC = () => {
  const [view, setView] = useState<ViewType>('list');
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
    clearCompleted,
    deleteAll,
    stats,
  } = useTodos();

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#2c3e50', overflow: 'hidden' }}>
      <header className="flex items-center justify-between px-6 sm:px-8 lg:px-12 py-3 flex-shrink-0" style={{ backgroundColor: '#2c3e50', borderBottom: '2px solid rgba(22, 160, 133, 0.2)' }}>
        <h1 className="text-2xl sm:text-3xl font-bold font-['Poppins']" style={{ color: '#16a085' }}>
          Todo App
        </h1>
        {stats.total > 0 && (
          <div className="text-sm font-['Inter']" style={{ color: '#ecf0f1' }}>
            <span className="font-semibold" style={{ color: '#16a085' }}>{stats.active}</span>
            <span className="mx-1">/</span>
            <span>{stats.total}</span>
          </div>
        )}
      </header>

      <div 
        className="flex-1 flex flex-col min-h-0"
        style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        }}
      >
        <div className="flex-shrink-0 px-6 sm:px-8 lg:px-12 py-3">
          <TodoForm onAddTodo={addTodo} />
        </div>
        
        {stats.total > 0 && (
          <div className="flex-shrink-0 px-6 sm:px-8 lg:px-12 py-2 border-b border-zinc-200">
            <div className="flex items-center justify-between gap-4">
              <TodoFilters
                currentFilter={filter}
                onFilterChange={setFilter}
                stats={stats}
                onClearCompleted={clearCompleted}
                onDeleteAll={deleteAll}
              />
              <ViewToggle currentView={view} onViewChange={setView} />
            </div>
          </div>
        )}
        
        <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 lg:px-12 pb-4 pt-4">
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
          />
        </div>

        <footer className="text-center py-4 border-t border-zinc-200 flex-shrink-0 text-xs sm:text-sm px-6 sm:px-8 lg:px-12" style={{ color: '#95a5a6' }}>
          <p>
            Made with ❤️ by{' '}
            <a
              href="https://github.com/itsahmadawais/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline transition-all duration-200"
              style={{ color: '#16a085' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#138d75';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#16a085';
              }}
            >
              Awais Ahmad
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
