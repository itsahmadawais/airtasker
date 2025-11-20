import { type FC } from 'react';

export type ViewType = 'list' | 'grid';

interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewToggle: FC<ViewToggleProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
          currentView === 'list' ? 'text-white' : 'text-zinc-700'
        }`}
        style={{
          background: currentView === 'list'
            ? 'linear-gradient(145deg, #16a085 0%, #138d75 100%)'
            : 'linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 100%)',
          boxShadow: currentView === 'list'
            ? 'inset 1px 1px 2px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(22, 160, 133, 0.3)'
            : 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(0, 0, 0, 0.1)',
        }}
        aria-label="List view"
        title="List view"
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
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
          currentView === 'grid' ? 'text-white' : 'text-zinc-700'
        }`}
        style={{
          background: currentView === 'grid'
            ? 'linear-gradient(145deg, #16a085 0%, #138d75 100%)'
            : 'linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 100%)',
          boxShadow: currentView === 'grid'
            ? 'inset 1px 1px 2px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(22, 160, 133, 0.3)'
            : 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(0, 0, 0, 0.1)',
        }}
        aria-label="Grid view"
        title="Grid view"
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
          <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
        </svg>
      </button>
    </div>
  );
};

