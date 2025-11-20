import { type FC } from 'react';
import type { FilterType } from '../types/todo';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
  onDeleteAll: () => void;
}

export const TodoFilters: FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  stats,
  onClearCompleted,
  onDeleteAll,
}) => {
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1.5">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className="px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 cursor-pointer"
            style={{
              background: currentFilter === filter.value
                ? 'linear-gradient(145deg, #16a085 0%, #138d75 100%)'
                : 'linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 100%)',
              color: currentFilter === filter.value ? '#ffffff' : '#34495e',
              boxShadow: currentFilter === filter.value
                ? 'inset 1px 1px 2px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(22, 160, 133, 0.3)'
                : 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(0, 0, 0, 0.1)',
            }}
            onMouseDown={(e) => {
              if (currentFilter === filter.value) {
                e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(22, 160, 133, 0.2)';
                e.currentTarget.style.transform = 'translateY(1px)';
              } else {
                e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.transform = 'translateY(1px)';
              }
            }}
            onMouseUp={(e) => {
              if (currentFilter === filter.value) {
                e.currentTarget.style.boxShadow = 'inset 1px 1px 2px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(22, 160, 133, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              } else {
                e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentFilter === filter.value) {
                e.currentTarget.style.boxShadow = 'inset 1px 1px 2px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(22, 160, 133, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              } else {
                e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {stats.completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="px-2 py-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded font-medium transition-all duration-200 cursor-pointer ml-2"
        >
          Clear ({stats.completed})
        </button>
      )}
      <button
        onClick={onDeleteAll}
        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200 cursor-pointer ml-2"
        title="Delete all tasks"
        aria-label="Delete all tasks"
      >
        <svg
          className="w-4 h-4"
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
  );
};

