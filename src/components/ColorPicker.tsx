import { type FC, useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { COLOR_SCHEMES, getColorSchemeById } from '../constants/colorSchemes';

interface ColorPickerProps {
  isOpen: boolean;
  selectedColorSchemeId: string;
  onColorChange: (colorSchemeId: string) => void;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
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

    // Start with position below and to the right of trigger
    let top = triggerRect.bottom + 8;
    let left = triggerRect.right - width;

    // Adjust if popover would go off screen to the right
    if (left + width > viewportWidth) {
      left = triggerRect.left - width;
    }
    // If still off screen, align to trigger left
    if (left < 8) {
      left = triggerRect.left;
    }
    // If still too wide, align to right edge
    if (left + width > viewportWidth) {
      left = viewportWidth - width - 8;
    }

    // Adjust if popover would go off screen to the bottom
    if (top + height > viewportHeight) {
      top = triggerRect.top - height - 8;
    }
    // If still off screen, align to top
    if (top < 8) {
      top = 8;
    }

    return { top, left };
  }, [triggerRef]);

  // Calculate position when opening - render off-screen first to measure, then position
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      setIsReady(false);
      // First render off-screen to measure actual dimensions
      setPosition({ top: -9999, left: -9999 });

      // Once rendered, measure and calculate correct position
      const timer = setTimeout(() => {
        if (popoverRef.current && triggerRef.current) {
          const actualWidth = popoverRef.current.offsetWidth;
          const actualHeight = popoverRef.current.offsetHeight;
          const calculatedPosition = calculatePosition(actualWidth, actualHeight);
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

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, triggerRef, onClose]);

  const handleColorSelect = (colorSchemeId: string) => {
    onColorChange(colorSchemeId);
    onClose();
  };

  if (!isOpen || !position) {
    return null;
  }

  const popoverContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      />
      {/* Popover */}
      <div
        ref={popoverRef}
        className="fixed z-50 p-3 rounded-lg shadow-lg"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          visibility: isReady ? 'visible' : 'hidden',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="flex flex-wrap gap-2" style={{ minWidth: '200px' }}>
          {COLOR_SCHEMES.map((scheme) => {
            const isSelected = scheme.id === selectedColorSchemeId;

            return (
              <button
                key={scheme.id}
                onClick={() => handleColorSelect(scheme.id)}
                className="relative w-10 h-10 rounded-full transition-all duration-200 cursor-pointer"
                style={{
                  background: scheme.circleColor,
                  border: isSelected ? `3px solid ${scheme.foreground}` : '2px solid rgba(0, 0, 0, 0.2)',
                  boxShadow: isSelected
                    ? `0 0 0 2px ${scheme.foreground}40, 0 4px 8px rgba(0, 0, 0, 0.2)`
                    : '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1.15)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                  }
                }}
                aria-label={`Select ${scheme.name} color scheme`}
                title={scheme.name}
              >
                {isSelected && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      color: scheme.foreground,
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
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

  // Render using portal to avoid overflow issues
  return createPortal(popoverContent, document.body);
};


