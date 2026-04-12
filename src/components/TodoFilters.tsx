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
  const filters: { label: string; value: FilterType; count: number }[] = [
    { label: 'All', value: 'all', count: stats.total },
    { label: 'Active', value: 'active', count: stats.active },
    { label: 'Done', value: 'completed', count: stats.completed },
  ];

  return (
    <div className="flex items-center gap-3">
      {/* Segmented filter */}
      <div
        className="inline-flex items-center p-0.5 rounded-lg"
        style={{
          backgroundColor: 'var(--color-bg)',
          border: '1px solid var(--color-border-light)',
        }}
      >
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className="relative px-3.5 py-1.5 text-sm font-medium rounded-md transition-all duration-150 cursor-pointer"
            style={{
              backgroundColor: currentFilter === f.value ? 'var(--color-surface)' : 'transparent',
              color: currentFilter === f.value ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              boxShadow: currentFilter === f.value ? 'var(--shadow-xs)' : 'none',
            }}
          >
            {f.label}
            <span
              className="ml-1.5 text-xs tabular-nums"
              style={{ color: currentFilter === f.value ? 'var(--color-text-tertiary)' : 'var(--color-text-tertiary)' }}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 ml-1">
        {stats.completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="px-2.5 py-1.5 text-sm font-medium rounded-md transition-all duration-150 cursor-pointer"
            style={{ color: 'var(--color-text-tertiary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-danger-subtle)';
              e.currentTarget.style.color = 'var(--color-danger)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-tertiary)';
            }}
          >
            Clear done
          </button>
        )}
        <button
          onClick={onDeleteAll}
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
          title="Delete all tasks"
          aria-label="Delete all tasks"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  );
};
