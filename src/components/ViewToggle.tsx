import { type FC } from 'react';

export type ViewType = 'list' | 'grid';

interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewToggle: FC<ViewToggleProps> = ({ currentView, onViewChange }) => {
  return (
    <div
      className="inline-flex items-center p-0.5 rounded-lg"
      style={{
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-border-light)',
      }}
    >
      <button
        onClick={() => onViewChange('list')}
        className="p-1.5 rounded-md transition-all duration-150 cursor-pointer"
        style={{
          backgroundColor: currentView === 'list' ? 'var(--color-surface)' : 'transparent',
          color: currentView === 'list' ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
          boxShadow: currentView === 'list' ? 'var(--shadow-xs)' : 'none',
        }}
        aria-label="List view"
        title="List view"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
      <button
        onClick={() => onViewChange('grid')}
        className="p-1.5 rounded-md transition-all duration-150 cursor-pointer"
        style={{
          backgroundColor: currentView === 'grid' ? 'var(--color-surface)' : 'transparent',
          color: currentView === 'grid' ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
          boxShadow: currentView === 'grid' ? 'var(--shadow-xs)' : 'none',
        }}
        aria-label="Grid view"
        title="Grid view"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      </button>
    </div>
  );
};
