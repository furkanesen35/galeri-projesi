import React, { useState, useRef, useEffect } from 'react';
import { 
  Palette, 
  X, 
  RotateCcw,
  Type,
  Square,
  Sun,
  Droplets,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { PanelStyle } from '../store/usePanelLayoutStore';

// Calculate relative luminance of a color to determine if it's light or dark
export function getLuminance(hexColor: string): number {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

// Returns true if the color is considered "light" (needs dark text)
export function isLightColor(hexColor: string): boolean {
  return getLuminance(hexColor) > 0.35;
}

// Get contrasting text color for a background
export function getContrastText(bgColor: string): string {
  return isLightColor(bgColor) ? '#000000' : '#ffffff';
}

// Color wheel component for precise color picking
interface ColorWheelPickerProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
}

const ColorWheelPicker: React.FC<ColorWheelPickerProps> = ({ value, onChange, label }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-text-secondary">{label}</span>
      <div className="flex items-center gap-2">
        <div 
          className="w-6 h-6 rounded border border-white/30 shadow-sm"
          style={{ backgroundColor: value || 'transparent' }}
        />
        <input
          type="color"
          value={value || '#ffffff'}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="p-1 rounded hover:bg-white/10 text-text-secondary hover:text-foreground"
            title="Zurücksetzen"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};

// Quick color presets - text color will be calculated automatically based on contrast
const quickColors = [
  { name: 'Rot', bg: '#ef4444' },
  { name: 'Orange', bg: '#f97316' },
  { name: 'Gelb', bg: '#eab308' },
  { name: 'Grün', bg: '#22c55e' },
  { name: 'Blau', bg: '#3b82f6' },
  { name: 'Lila', bg: '#8b5cf6' },
  { name: 'Pink', bg: '#ec4899' },
  { name: 'Dunkel', bg: '#1e293b' },
  { name: 'Hell', bg: '#f8fafc' },
];

interface InlinePanelStylerProps {
  panelId: string;
  panelTitle: string;
  style: PanelStyle | undefined;
  onStyleChange: (style: Partial<PanelStyle>) => void;
  onReset: () => void;
  iconColor?: string;
  onClose: () => void;
}

export const InlinePanelStyler: React.FC<InlinePanelStylerProps> = ({
  panelId,
  panelTitle,
  style = {},
  onStyleChange,
  onReset,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<'quick' | 'background' | 'text' | 'border' | 'effects'>('quick');

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const applyQuickColor = (bg: string) => {
    const textColor = getContrastText(bg);
    onStyleChange({
      bgColor: bg,
      textColor: textColor,
      headerBgColor: bg,
      headerTextColor: textColor,
      iconColor: textColor,
      inheritColors: true, // Enable inheritance by default for quick colors
    });
  };

  const sections = [
    { id: 'quick', label: 'Schnell', icon: <Sparkles className="h-3 w-3" /> },
    { id: 'background', label: 'Hintergrund', icon: <Square className="h-3 w-3" /> },
    { id: 'text', label: 'Text', icon: <Type className="h-3 w-3" /> },
    { id: 'border', label: 'Rahmen', icon: <Square className="h-3 w-3" /> },
    { id: 'effects', label: 'Effekte', icon: <Droplets className="h-3 w-3" /> },
  ] as const;

  return (
    <div 
      ref={popupRef}
      className="absolute right-0 top-full mt-2 w-72 bg-surface border border-border rounded-xl shadow-2xl z-[100] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-bg-secondary border-b border-border">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground truncate max-w-[180px]">
            {panelTitle}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onReset}
            className="p-1.5 rounded hover:bg-surface text-text-secondary hover:text-foreground transition-colors"
            title="Stil zurücksetzen"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface text-text-secondary hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-border overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`
              flex-1 flex items-center justify-center gap-1 px-2 py-2 text-xs font-medium transition-colors whitespace-nowrap
              ${activeSection === section.id 
                ? 'text-primary border-b-2 border-primary bg-primary/5' 
                : 'text-text-secondary hover:text-foreground hover:bg-bg-secondary'
              }
            `}
          >
            {section.icon}
            <span className="hidden sm:inline">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-3 max-h-64 overflow-y-auto">
        {activeSection === 'quick' && (
          <div className="space-y-3">
            <p className="text-xs text-text-secondary">Schnelle Farbauswahl:</p>
            <div className="grid grid-cols-3 gap-2">
              {quickColors.map((color) => {
                const textColor = getContrastText(color.bg);
                return (
                  <button
                    key={color.name}
                    onClick={() => applyQuickColor(color.bg)}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg border border-border hover:border-primary transition-colors"
                    style={{ backgroundColor: color.bg }}
                  >
                    <span 
                      className="text-xs font-medium"
                      style={{ color: textColor }}
                    >
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>
            
            {/* Gradient presets */}
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-text-secondary mb-2">Kombinationen:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onStyleChange({
                    bgColor: '#1e40af',
                    headerBgColor: '#1e3a8a',
                    textColor: '#fef08a',
                    headerTextColor: '#fef08a',
                    iconColor: '#fef08a',
                    inheritColors: true,
                  })}
                  className="p-2 rounded-lg text-xs font-medium"
                  style={{ backgroundColor: '#1e40af', color: '#fef08a' }}
                >
                  Blau/Gelb
                </button>
                <button
                  onClick={() => onStyleChange({
                    bgColor: '#dc2626',
                    headerBgColor: '#b91c1c',
                    textColor: '#ffffff',
                    headerTextColor: '#ffffff',
                    iconColor: '#ffffff',
                    inheritColors: true,
                  })}
                  className="p-2 rounded-lg text-xs font-medium"
                  style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                >
                  Rot/Weiß
                </button>
                <button
                  onClick={() => onStyleChange({
                    bgColor: '#065f46',
                    headerBgColor: '#047857',
                    textColor: '#ffffff',
                    headerTextColor: '#ffffff',
                    iconColor: '#ffffff',
                    inheritColors: true,
                  })}
                  className="p-2 rounded-lg text-xs font-medium"
                  style={{ backgroundColor: '#065f46', color: '#ffffff' }}
                >
                  Smaragd
                </button>
                <button
                  onClick={() => onStyleChange({
                    bgColor: '#7c3aed',
                    headerBgColor: '#6d28d9',
                    textColor: '#ffffff',
                    headerTextColor: '#ffffff',
                    iconColor: '#ffffff',
                    inheritColors: true,
                  })}
                  className="p-2 rounded-lg text-xs font-medium"
                  style={{ backgroundColor: '#7c3aed', color: '#ffffff' }}
                >
                  Violett
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'background' && (
          <div className="space-y-3">
            <ColorWheelPicker
              label="Panel-Hintergrund"
              value={style?.bgColor || ''}
              onChange={(color) => onStyleChange({ bgColor: color })}
            />
            <ColorWheelPicker
              label="Header-Hintergrund"
              value={style?.headerBgColor || ''}
              onChange={(color) => onStyleChange({ headerBgColor: color })}
            />
            
            {/* Opacity */}
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">Deckkraft</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={style?.opacity ?? 100}
                    onChange={(e) => onStyleChange({ opacity: parseInt(e.target.value) })}
                    className="w-20 accent-primary"
                  />
                  <span className="text-xs text-foreground w-8">{style?.opacity ?? 100}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'text' && (
          <div className="space-y-3">
            <ColorWheelPicker
              label="Inhaltstext"
              value={style?.textColor || ''}
              onChange={(color) => onStyleChange({ textColor: color })}
            />
            <ColorWheelPicker
              label="Header-Text"
              value={style?.headerTextColor || ''}
              onChange={(color) => onStyleChange({ headerTextColor: color })}
            />
            <ColorWheelPicker
              label="Icon-Farbe"
              value={style?.iconColor || ''}
              onChange={(color) => onStyleChange({ iconColor: color })}
            />
            
            {/* Inherit colors toggle */}
            <div className="pt-2 border-t border-border space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-foreground">Farben vererben</span>
                  <p className="text-xs text-text-secondary">An alle Inhalte weitergeben</p>
                </div>
                <button
                  onClick={() => onStyleChange({ inheritColors: !style?.inheritColors })}
                  className={`
                    relative w-10 h-5 rounded-full transition-colors
                    ${style?.inheritColors ? 'bg-primary' : 'bg-text-secondary/30'}
                  `}
                >
                  <span 
                    className={`
                      absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform
                      ${style?.inheritColors ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>
              <p className="text-xs text-text-secondary">
                💡 Aktivieren Sie dies, damit die Textfarbe auf alle Komponenten im Panel angewendet wird
              </p>
            </div>
          </div>
        )}

        {activeSection === 'border' && (
          <div className="space-y-3">
            <ColorWheelPicker
              label="Rahmenfarbe"
              value={style?.borderColor || ''}
              onChange={(color) => onStyleChange({ borderColor: color })}
            />
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">Rahmenbreite</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={style?.borderWidth ?? 1}
                  onChange={(e) => onStyleChange({ borderWidth: parseInt(e.target.value) })}
                  className="w-20 accent-primary"
                />
                <span className="text-xs text-foreground w-8">{style?.borderWidth ?? 1}px</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">Eckenradius</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={style?.borderRadius ?? 12}
                  onChange={(e) => onStyleChange({ borderRadius: parseInt(e.target.value) })}
                  className="w-20 accent-primary"
                />
                <span className="text-xs text-foreground w-8">{style?.borderRadius ?? 12}px</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'effects' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">Schatten</span>
              <select
                value={style?.shadowSize || 'none'}
                onChange={(e) => onStyleChange({ shadowSize: e.target.value as PanelStyle['shadowSize'] })}
                className="px-2 py-1 bg-bg-secondary border border-border rounded text-xs text-foreground"
              >
                <option value="none">Keiner</option>
                <option value="sm">Klein</option>
                <option value="md">Mittel</option>
                <option value="lg">Groß</option>
                <option value="xl">Extra Groß</option>
              </select>
            </div>
            
            {style?.shadowSize && style.shadowSize !== 'none' && (
              <ColorWheelPicker
                label="Schattenfarbe"
                value={style?.shadowColor || ''}
                onChange={(color) => onStyleChange({ shadowColor: color })}
              />
            )}
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="p-3 border-t border-border bg-bg-secondary">
        <p className="text-xs text-text-secondary mb-2">Vorschau:</p>
        <div 
          className="p-3 rounded-lg transition-all text-sm"
          style={{
            backgroundColor: style?.bgColor || 'var(--surface)',
            color: style?.textColor || 'var(--foreground)',
            borderColor: style?.borderColor || 'var(--border)',
            borderWidth: `${style?.borderWidth ?? 1}px`,
            borderStyle: 'solid',
            borderRadius: `${style?.borderRadius ?? 8}px`,
            opacity: (style?.opacity ?? 100) / 100,
          }}
        >
          <div 
            className="text-xs font-semibold mb-1"
            style={{ color: style?.headerTextColor || style?.textColor || 'inherit' }}
          >
            {panelTitle}
          </div>
          <span className="text-xs opacity-80">Beispielinhalt</span>
        </div>
      </div>
    </div>
  );
};

// Trigger button for the inline styler
interface StyleTriggerButtonProps {
  onClick: () => void;
  hasCustomStyle: boolean;
  headerTextColor?: string;
}

export const StyleTriggerButton: React.FC<StyleTriggerButtonProps> = ({
  onClick,
  hasCustomStyle,
  headerTextColor,
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`
        p-1.5 rounded-lg hover:bg-black/10 transition-colors relative
        ${hasCustomStyle ? 'text-primary' : ''}
      `}
      style={{ color: headerTextColor || 'inherit', opacity: 0.7 }}
      title="Stil anpassen"
    >
      <Palette className="h-4 w-4" />
      {hasCustomStyle && (
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full" />
      )}
    </button>
  );
};
