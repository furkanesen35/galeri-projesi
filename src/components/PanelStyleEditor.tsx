import React, { useState, useCallback } from 'react';
import { 
  Palette, 
  Type, 
  Square, 
  Sun,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Droplets
} from 'lucide-react';
import { PanelStyle } from '../store/usePanelLayoutStore';

// Predefined color palette
const colorPresets = {
  backgrounds: [
    { name: 'Default', value: '' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Lime', value: '#84cc16' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Sky', value: '#0ea5e9' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Fuchsia', value: '#d946ef' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Slate', value: '#64748b' },
    { name: 'Gray', value: '#6b7280' },
    { name: 'Zinc', value: '#71717a' },
    { name: 'Stone', value: '#78716c' },
    { name: 'Dark', value: '#1e293b' },
    { name: 'Darker', value: '#0f172a' },
  ],
  text: [
    { name: 'Default', value: '' },
    { name: 'White', value: '#ffffff' },
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Gray Light', value: '#9ca3af' },
    { name: 'Gray Dark', value: '#374151' },
  ],
};

// Shadow presets
const shadowPresets = [
  { name: 'None', value: 'none' as const },
  { name: 'Small', value: 'sm' as const },
  { name: 'Medium', value: 'md' as const },
  { name: 'Large', value: 'lg' as const },
  { name: 'Extra Large', value: 'xl' as const },
];

interface ColorPickerProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (color: string) => void;
  presets: { name: string; value: string }[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  icon,
  value,
  onChange,
  presets,
}) => {
  const [showPresets, setShowPresets] = useState(false);
  const [customColor, setCustomColor] = useState(value || '');

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomColor(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          {icon}
          {label}
        </label>
        <div className="flex items-center gap-2">
          {/* Color preview */}
          <div 
            className="w-6 h-6 rounded border border-border"
            style={{ backgroundColor: value || 'transparent' }}
          />
          {/* Custom color input */}
          <input
            type="color"
            value={value || '#ffffff'}
            onChange={handleCustomColorChange}
            className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
            title="Farbe auswählen"
          />
        </div>
      </div>
      
      {/* Preset colors */}
      <button
        onClick={() => setShowPresets(!showPresets)}
        className="flex items-center gap-1 text-xs text-text-secondary hover:text-foreground transition-colors"
      >
        {showPresets ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        Vorlagen anzeigen
      </button>
      
      {showPresets && (
        <div className="grid grid-cols-8 gap-1 p-2 bg-bg-secondary rounded-lg">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onChange(preset.value)}
              className={`
                w-6 h-6 rounded border-2 transition-all hover:scale-110
                ${value === preset.value 
                  ? 'border-primary ring-2 ring-primary/30' 
                  : 'border-border hover:border-primary/50'
                }
                ${!preset.value ? 'bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-600 dark:to-gray-800' : ''}
              `}
              style={{ backgroundColor: preset.value || undefined }}
              title={preset.name}
            >
              {value === preset.value && (
                <Check className="h-4 w-4 mx-auto text-white drop-shadow-md" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface PanelStyleEditorProps {
  panelTitle: string;
  style: PanelStyle | undefined;
  onChange: (style: Partial<PanelStyle>) => void;
  onReset: () => void;
  onCopy?: () => void;
  className?: string;
}

export const PanelStyleEditor: React.FC<PanelStyleEditorProps> = ({
  panelTitle,
  style = {},
  onChange,
  onReset,
  onCopy,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleStyleChange = useCallback((key: keyof PanelStyle, value: string | number) => {
    onChange({ [key]: value });
  }, [onChange]);

  const hasCustomStyles = style && Object.keys(style).some(key => 
    style[key as keyof PanelStyle] !== undefined && style[key as keyof PanelStyle] !== ''
  );

  return (
    <div className={`bg-surface border border-border rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 bg-bg-secondary cursor-pointer hover:bg-bg-secondary/80 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {panelTitle} - Stil anpassen
          </span>
          {hasCustomStyles && (
            <span className="px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded">
              Angepasst
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-text-secondary" />
        ) : (
          <ChevronDown className="h-4 w-4 text-text-secondary" />
        )}
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Background Colors */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Hintergrund
            </h4>
            
            <ColorPicker
              label="Panel-Hintergrund"
              icon={<Square className="h-4 w-4" />}
              value={style?.bgColor || ''}
              onChange={(color) => handleStyleChange('bgColor', color)}
              presets={colorPresets.backgrounds}
            />
            
            <ColorPicker
              label="Header-Hintergrund"
              icon={<Square className="h-4 w-4" />}
              value={style?.headerBgColor || ''}
              onChange={(color) => handleStyleChange('headerBgColor', color)}
              presets={colorPresets.backgrounds}
            />
          </div>

          {/* Text Colors */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Text & Icons
            </h4>
            
            <ColorPicker
              label="Textfarbe"
              icon={<Type className="h-4 w-4" />}
              value={style?.textColor || ''}
              onChange={(color) => handleStyleChange('textColor', color)}
              presets={colorPresets.text}
            />
            
            <ColorPicker
              label="Header-Textfarbe"
              icon={<Type className="h-4 w-4" />}
              value={style?.headerTextColor || ''}
              onChange={(color) => handleStyleChange('headerTextColor', color)}
              presets={colorPresets.text}
            />
            
            <ColorPicker
              label="Icon-Farbe"
              icon={<Type className="h-4 w-4" />}
              value={style?.iconColor || ''}
              onChange={(color) => handleStyleChange('iconColor', color)}
              presets={colorPresets.text}
            />
          </div>

          {/* Border */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Rahmen
            </h4>
            
            <ColorPicker
              label="Rahmenfarbe"
              icon={<Square className="h-4 w-4" />}
              value={style?.borderColor || ''}
              onChange={(color) => handleStyleChange('borderColor', color)}
              presets={colorPresets.backgrounds}
            />
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Rahmenbreite</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={style?.borderWidth ?? 1}
                  onChange={(e) => handleStyleChange('borderWidth', parseInt(e.target.value))}
                  className="w-24 accent-primary"
                />
                <span className="text-sm text-text-secondary w-8">{style?.borderWidth ?? 1}px</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Eckenradius</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={style?.borderRadius ?? 12}
                  onChange={(e) => handleStyleChange('borderRadius', parseInt(e.target.value))}
                  className="w-24 accent-primary"
                />
                <span className="text-sm text-text-secondary w-8">{style?.borderRadius ?? 12}px</span>
              </div>
            </div>
          </div>

          {/* Effects */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Effekte
            </h4>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Droplets className="h-4 w-4" />
                Schatten
              </label>
              <select
                value={style?.shadowSize || 'none'}
                onChange={(e) => handleStyleChange('shadowSize', e.target.value)}
                className="px-3 py-1.5 bg-bg-secondary border border-border rounded-lg text-sm text-foreground"
              >
                {shadowPresets.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.name}
                  </option>
                ))}
              </select>
            </div>
            
            {style?.shadowSize && style.shadowSize !== 'none' && (
              <ColorPicker
                label="Schattenfarbe"
                icon={<Droplets className="h-4 w-4" />}
                value={style?.shadowColor || ''}
                onChange={(color) => handleStyleChange('shadowColor', color)}
                presets={colorPresets.backgrounds}
              />
            )}
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Sun className="h-4 w-4" />
                Deckkraft
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={style?.opacity ?? 100}
                  onChange={(e) => handleStyleChange('opacity', parseInt(e.target.value))}
                  className="w-24 accent-primary"
                />
                <span className="text-sm text-text-secondary w-8">{style?.opacity ?? 100}%</span>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Vorschau
            </h4>
            <div 
              className="p-4 transition-all"
              style={{
                backgroundColor: style?.bgColor || undefined,
                color: style?.textColor || undefined,
                borderColor: style?.borderColor || 'var(--border)',
                borderWidth: `${style?.borderWidth ?? 1}px`,
                borderStyle: 'solid',
                borderRadius: `${style?.borderRadius ?? 12}px`,
                opacity: (style?.opacity ?? 100) / 100,
                boxShadow: getShadowStyle(style?.shadowSize, style?.shadowColor),
              }}
            >
              <div 
                className="p-2 rounded-t-lg mb-2"
                style={{
                  backgroundColor: style?.headerBgColor || 'rgba(0,0,0,0.1)',
                  color: style?.headerTextColor || undefined,
                }}
              >
                <span className="font-semibold">Header: {panelTitle}</span>
              </div>
              <p className="text-sm">Dies ist eine Vorschau des Panel-Stils.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <button
              onClick={onReset}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-foreground hover:bg-bg-secondary rounded-lg transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Zurücksetzen
            </button>
            {onCopy && (
              <button
                onClick={onCopy}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Copy className="h-4 w-4" />
                Stil kopieren
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to generate box-shadow CSS
function getShadowStyle(size?: PanelStyle['shadowSize'], color?: string): string {
  const shadowColor = color || 'rgba(0, 0, 0, 0.1)';
  
  switch (size) {
    case 'sm':
      return `0 1px 2px 0 ${shadowColor}`;
    case 'md':
      return `0 4px 6px -1px ${shadowColor}, 0 2px 4px -2px ${shadowColor}`;
    case 'lg':
      return `0 10px 15px -3px ${shadowColor}, 0 4px 6px -4px ${shadowColor}`;
    case 'xl':
      return `0 20px 25px -5px ${shadowColor}, 0 8px 10px -6px ${shadowColor}`;
    default:
      return 'none';
  }
}

// Export helper for use in DraggablePanel
export { getShadowStyle };

// Style preset templates
export const stylePresets = {
  professional: {
    name: 'Professionell',
    style: {
      bgColor: '#1e293b',
      textColor: '#e2e8f0',
      headerBgColor: '#334155',
      headerTextColor: '#ffffff',
      borderColor: '#475569',
      borderWidth: 1,
      borderRadius: 8,
      shadowSize: 'md' as const,
    }
  },
  vibrant: {
    name: 'Lebhaft',
    style: {
      bgColor: '#3b82f6',
      textColor: '#ffffff',
      headerBgColor: '#2563eb',
      headerTextColor: '#ffffff',
      borderColor: '#1d4ed8',
      borderWidth: 2,
      borderRadius: 16,
      shadowSize: 'lg' as const,
    }
  },
  warning: {
    name: 'Warnung',
    style: {
      bgColor: '#fef3c7',
      textColor: '#92400e',
      headerBgColor: '#f59e0b',
      headerTextColor: '#ffffff',
      borderColor: '#d97706',
      borderWidth: 2,
      borderRadius: 12,
      shadowSize: 'sm' as const,
    }
  },
  success: {
    name: 'Erfolg',
    style: {
      bgColor: '#d1fae5',
      textColor: '#065f46',
      headerBgColor: '#10b981',
      headerTextColor: '#ffffff',
      borderColor: '#059669',
      borderWidth: 2,
      borderRadius: 12,
      shadowSize: 'sm' as const,
    }
  },
  danger: {
    name: 'Gefahr',
    style: {
      bgColor: '#fee2e2',
      textColor: '#991b1b',
      headerBgColor: '#ef4444',
      headerTextColor: '#ffffff',
      borderColor: '#dc2626',
      borderWidth: 2,
      borderRadius: 12,
      shadowSize: 'sm' as const,
    }
  },
  elegant: {
    name: 'Elegant',
    style: {
      bgColor: '#18181b',
      textColor: '#fafafa',
      headerBgColor: '#27272a',
      headerTextColor: '#fafafa',
      borderColor: '#3f3f46',
      borderWidth: 1,
      borderRadius: 6,
      shadowSize: 'xl' as const,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    }
  },
  glass: {
    name: 'Glas',
    style: {
      bgColor: 'rgba(255, 255, 255, 0.1)',
      textColor: '#ffffff',
      headerBgColor: 'rgba(255, 255, 255, 0.2)',
      headerTextColor: '#ffffff',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 1,
      borderRadius: 16,
      shadowSize: 'lg' as const,
      opacity: 90,
    }
  },
};
