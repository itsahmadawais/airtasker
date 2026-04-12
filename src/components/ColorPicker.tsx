import { type FC, useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { COLOR_SCHEMES } from '../constants/colorSchemes';

interface ColorPickerProps {
  isOpen: boolean;
  selectedColorSchemeId: string;
  onColorChange: (colorSchemeId: string) => void;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  isOpen,
  selectedColorSchemeId,
  onColorChange,
  onClose,
  triggerRef,
}) => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [isReady, setIsReady] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback((width: number, height: number) => {
    if (!triggerRef.current) return null;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = triggerRect.bottom + 6;
    let left = triggerRect.right - width;

    if (left + width > viewportWidth) left = triggerRect.left - width;
    if (left < 8) left = triggerRect.left;
    if (left + width > viewportWidth) left = viewportWidth - width - 8;
    if (top + height > viewportHeight) top = triggerRect.top - height - 6;
    if (top < 8) top = 8;

    return { top, left };
  }, [triggerRef]);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      setIsReady(false);
      setPosition({ top: -9999, left: -9999 });

      const timer = setTimeout(() => {
        if (popoverRef.current && triggerRef.current) {
          const calculatedPosition = calculatePosition(
            popoverRef.current.offsetWidth,
            popoverRef.current.offsetHeight
          );
          if (calculatedPosition) {
            setPosition(calculatedPosition);
            setIsReady(true);
          }
        }
      }, 0);

      return () => clearTimeout(timer);
    } else {
      setPosition(null);
      setIsReady(false);
    }
  }, [isOpen, triggerRef, calculatePosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, triggerRef, onClose]);

  const handleColorSelect = (colorSchemeId: string) => {
    onColorChange(colorSchemeId);
    onClose();
  };

  if (!isOpen || !position) return null;

  const popoverContent = (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        ref={popoverRef}
        className="fixed z-50 p-3 rounded-xl"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          visibility: isReady ? 'visible' : 'hidden',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-overlay)',
        }}
      >
        <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
          Label Color
        </p>
        <div className="flex flex-wrap gap-1.5" style={{ minWidth: '180px' }}>
          {COLOR_SCHEMES.map((scheme) => {
            const isSelected = scheme.id === selectedColorSchemeId;
            return (
              <button
                key={scheme.id}
                onClick={() => handleColorSelect(scheme.id)}
                className="relative w-8 h-8 rounded-lg transition-all duration-150 cursor-pointer"
                style={{
                  backgroundColor: scheme.circleColor,
                  border: isSelected ? `2px solid ${scheme.foreground}` : '1px solid var(--color-border)',
                  boxShadow: isSelected ? `0 0 0 2px ${scheme.foreground}30` : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.borderColor = scheme.foreground;
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
                aria-label={`Select ${scheme.name} color`}
                title={scheme.name}
              >
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ color: scheme.foreground }}>
                    <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );

  return createPortal(popoverContent, document.body);
};
