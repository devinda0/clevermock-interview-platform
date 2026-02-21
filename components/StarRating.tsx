import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

const gapClasses = {
  sm: 'gap-1',
  md: 'gap-1.5',
  lg: 'gap-2',
};

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  maxStars = 5,
  size = 'md',
  readonly = false,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  const handleMouseEnter = (index: number) => {
    if (!readonly) {
      setHoverValue(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(null);
    }
  };

  const handleClick = (index: number) => {
    if (!readonly && onChange) {
      onChange(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (readonly) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (value < maxStars && onChange) {
        onChange(value + 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (value > 0 && onChange) {
        onChange(value - 1);
      }
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const starIndex = parseInt(target.getAttribute('data-index') || '0', 10);
      if (starIndex > 0 && onChange) {
        onChange(starIndex);
      }
    }
  };

  return (
    <div
      className={`flex items-center ${gapClasses[size]}`}
      role={readonly ? 'img' : 'slider'}
      aria-label={readonly ? `${value} out of ${maxStars} stars` : 'Rating generator'}
      aria-valuemin={1}
      aria-valuemax={maxStars}
      aria-valuenow={value}
      tabIndex={readonly ? -1 : 0}
      onKeyDown={handleKeyDown}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: maxStars }).map((_, i) => {
        const starIndex = i + 1;
        const isActive = starIndex <= displayValue;

        return (
          <button
            key={starIndex}
            type="button"
            data-index={starIndex}
            disabled={readonly}
            className={`
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm transition-all duration-200
              ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'}
              ${isActive ? 'text-emerald-500 hover:text-emerald-400' : 'text-slate-600 hover:text-slate-500'}
            `}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            aria-label={`Rate ${starIndex} stars`}
            tabIndex={readonly ? -1 : 0}
          >
            <Star
              className={`${sizeClasses[size]} transition-all duration-200 ${
                isActive ? 'fill-emerald-500' : 'fill-transparent'
              }`}
              strokeWidth={isActive ? 0 : 1.5}
            />
          </button>
        );
      })}
    </div>
  );
};
