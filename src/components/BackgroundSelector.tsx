import React from 'react';
import { Check, RotateCcw } from 'lucide-react';
import {
  useBackgroundStore,
  backgroundOptions,
  BackgroundOption,
} from '../store/useBackgroundStore';

interface BackgroundSelectorProps {
  className?: string;
}

// Prevent drag events from bubbling up to parent draggable panel
const stopDragPropagation = (e: React.DragEvent | React.MouseEvent) => {
  e.stopPropagation();
};

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ className = '' }) => {
  const {
    selectedBackgroundId,
    backgroundOpacity,
    backgroundBlur,
    setBackground,
    setOpacity,
    setBlur,
    reset,
  } = useBackgroundStore();

  const getPreviewStyle = (bg: BackgroundOption): React.CSSProperties => {
    if (bg.type === 'none') {
      return {
        background:
          'linear-gradient(45deg, #1a1a2e 25%, transparent 25%, transparent 75%, #1a1a2e 75%)',
        backgroundSize: '8px 8px',
      };
    }
    if (bg.type === 'image') {
      return {
        backgroundImage: `url(${bg.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    if (bg.type === 'pattern') {
      return {
        background: `#1a1a2e`,
        backgroundImage: bg.value,
        backgroundSize: '20px 20px',
      };
    }
    return {
      background: bg.value,
    };
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Background Grid */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Hintergrundbild wählen</h4>
        <div className="grid grid-cols-4 gap-3">
          {backgroundOptions.map((bg) => {
            const isSelected = selectedBackgroundId === bg.id;
            return (
              <button
                key={bg.id}
                onClick={() => setBackground(bg.id)}
                className={`
                  relative aspect-video rounded-lg overflow-hidden border-2 transition-all
                  ${
                    isSelected
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-border hover:border-primary/50'
                  }
                `}
              >
                <div className="absolute inset-0" style={getPreviewStyle(bg)} />
                {bg.type === 'none' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-text-secondary bg-bg-secondary/80 px-2 py-1 rounded">
                      Keins
                    </span>
                  </div>
                )}
                {isSelected && (
                  <div className="absolute top-1 right-1 bg-primary text-primary-text rounded-full p-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                  <span className="text-[10px] text-white font-medium truncate block">
                    {bg.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Opacity Slider */}
      {selectedBackgroundId !== 'none' && (
        <div
          className="p-4 rounded-xl bg-bg-secondary/50 border border-border"
          draggable={false}
          onDragStart={stopDragPropagation}
          onMouseDown={stopDragPropagation}
        >
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground">Deckkraft</label>
            <span className="text-sm font-mono bg-bg-secondary px-2 py-0.5 rounded text-foreground">
              {backgroundOpacity}%
            </span>
          </div>
          <div className="relative h-8 flex items-center">
            <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-gray-400 dark:from-gray-600 to-primary rounded-full shadow-inner" />
            <input
              type="range"
              min="10"
              max="100"
              value={backgroundOpacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="relative w-full h-2 bg-transparent rounded-full appearance-none cursor-pointer z-10
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:cursor-grab
                [&::-webkit-slider-thumb]:active:cursor-grabbing
                [&::-webkit-slider-thumb]:hover:scale-110
                [&::-webkit-slider-thumb]:transition-transform
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-primary
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-white
                [&::-moz-range-thumb]:shadow-lg
                [&::-moz-range-thumb]:cursor-grab
              "
            />
          </div>
          <div className="flex justify-between text-xs text-text-secondary mt-2">
            <span>Subtil</span>
            <span>Voll</span>
          </div>
        </div>
      )}

      {/* Blur Slider */}
      {selectedBackgroundId !== 'none' && (
        <div
          className="p-4 rounded-xl bg-bg-secondary/50 border border-border"
          draggable={false}
          onDragStart={stopDragPropagation}
          onMouseDown={stopDragPropagation}
        >
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground">Unschärfe</label>
            <span className="text-sm font-mono bg-bg-secondary px-2 py-0.5 rounded text-foreground">
              {backgroundBlur}px
            </span>
          </div>
          <div className="relative h-8 flex items-center">
            <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-gray-400 dark:from-gray-600 to-primary rounded-full shadow-inner" />
            <input
              type="range"
              min="0"
              max="20"
              value={backgroundBlur}
              onChange={(e) => setBlur(Number(e.target.value))}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="relative w-full h-2 bg-transparent rounded-full appearance-none cursor-pointer z-10
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:cursor-grab
                [&::-webkit-slider-thumb]:active:cursor-grabbing
                [&::-webkit-slider-thumb]:hover:scale-110
                [&::-webkit-slider-thumb]:transition-transform
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-primary
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-white
                [&::-moz-range-thumb]:shadow-lg
                [&::-moz-range-thumb]:cursor-grab
              "
            />
          </div>
          <div className="flex justify-between text-xs text-text-secondary mt-2">
            <span>Scharf</span>
            <span>Unscharf</span>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={reset}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition-colors"
      >
        <RotateCcw className="h-4 w-4" />
        Auf Standard zurücksetzen
      </button>
    </div>
  );
};
