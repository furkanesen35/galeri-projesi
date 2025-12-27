import React, { useState } from 'react';
import { 
  Settings2, 
  Eye, 
  EyeOff, 
  GripVertical, 
  RotateCcw, 
  X,
  ChevronUp,
  ChevronDown,
  Layout,
  Palette,
  Sparkles
} from 'lucide-react';
import { usePanelLayoutStore, ViewId, PanelConfig, PanelStyle } from '../store/usePanelLayoutStore';
import { PanelStyleEditor, stylePresets } from './PanelStyleEditor';

interface PanelCustomizerProps {
  viewId: ViewId;
  className?: string;
}

export const PanelCustomizer: React.FC<PanelCustomizerProps> = ({
  viewId,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'layout' | 'style'>('layout');
  const [selectedPanelForStyle, setSelectedPanelForStyle] = useState<string | null>(null);
  const { 
    getPanels, 
    togglePanelVisibility, 
    reorderPanels, 
    resetLayout,
    updatePanelStyle,
    resetPanelStyle,
    applyStyleToAllPanels
  } = usePanelLayoutStore();

  const panels = getPanels(viewId);

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      reorderPanels(viewId, index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < panels.length - 1) {
      reorderPanels(viewId, index, index + 1);
    }
  };

  const handleReset = () => {
    resetLayout(viewId);
  };

  const visibleCount = panels.filter(p => p.visible).length;
  const hiddenCount = panels.length - visibleCount;

  return (
    <div className={`relative ${className}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg border transition-all
          ${isOpen 
            ? 'bg-primary text-primary-text border-primary' 
            : 'bg-surface text-foreground border-border hover:border-primary hover:bg-bg-secondary'
          }
        `}
        title="Panels anpassen"
      >
        <Layout className="h-4 w-4" />
        <span className="text-sm font-medium">Ansicht anpassen</span>
        {hiddenCount > 0 && (
          <span className="px-1.5 py-0.5 text-xs rounded bg-amber-500/20 text-amber-500">
            {hiddenCount} ausgeblendet
          </span>
        )}
      </button>

      {/* Customizer Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => {
              setIsOpen(false);
              setSelectedPanelForStyle(null);
            }}
          />
          
          {/* Panel */}
          <div className="absolute right-0 top-full mt-2 w-[420px] bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-bg-secondary flex-shrink-0">
              <div className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Panel-Einstellungen</h3>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSelectedPanelForStyle(null);
                }}
                className="p-1 rounded hover:bg-surface transition-colors text-text-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border flex-shrink-0">
              <button
                onClick={() => {
                  setActiveTab('layout');
                  setSelectedPanelForStyle(null);
                }}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors
                  ${activeTab === 'layout' 
                    ? 'text-primary border-b-2 border-primary bg-primary/5' 
                    : 'text-text-secondary hover:text-foreground hover:bg-bg-secondary'
                  }
                `}
              >
                <Layout className="h-4 w-4" />
                Layout
              </button>
              <button
                onClick={() => setActiveTab('style')}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors
                  ${activeTab === 'style' 
                    ? 'text-primary border-b-2 border-primary bg-primary/5' 
                    : 'text-text-secondary hover:text-foreground hover:bg-bg-secondary'
                  }
                `}
              >
                <Palette className="h-4 w-4" />
                Stil
              </button>
            </div>

            {/* Tab Content */}
            <div className="overflow-y-auto flex-1">
              {activeTab === 'layout' ? (
                <>
                  {/* Info */}
                  <div className="px-4 py-3 bg-blue-500/10 border-b border-blue-500/20">
                    <p className="text-xs text-blue-400">
                      Ziehen Sie Panels um sie neu anzuordnen, oder blenden Sie sie ein/aus. 
                      Ihre Einstellungen werden automatisch gespeichert.
                    </p>
                  </div>

                  {/* Panel List */}
                  <div>
                    {panels.map((panel, index) => (
                      <PanelCustomizerItem
                        key={panel.id}
                        panel={panel}
                        index={index}
                        isFirst={index === 0}
                        isLast={index === panels.length - 1}
                        onToggleVisibility={() => togglePanelVisibility(viewId, panel.id)}
                        onMoveUp={() => handleMoveUp(index)}
                        onMoveDown={() => handleMoveDown(index)}
                        onEditStyle={() => {
                          setSelectedPanelForStyle(panel.id);
                          setActiveTab('style');
                        }}
                        hasCustomStyle={!!panel.style && Object.keys(panel.style).length > 0}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-4 space-y-4">
                  {/* Style Presets */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="h-3 w-3" />
                      Vorlagen für alle Panels
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(stylePresets).map(([key, preset]) => (
                        <button
                          key={key}
                          onClick={() => applyStyleToAllPanels(viewId, preset.style)}
                          className="px-3 py-2 text-xs font-medium rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-foreground"
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Panel Style Selection */}
                  {!selectedPanelForStyle ? (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Panel auswählen
                      </h4>
                      <div className="space-y-1">
                        {panels.map((panel) => (
                          <button
                            key={panel.id}
                            onClick={() => setSelectedPanelForStyle(panel.id)}
                            className={`
                              w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors
                              ${panel.style && Object.keys(panel.style).length > 0
                                ? 'border-primary/50 bg-primary/5 hover:bg-primary/10'
                                : 'border-border hover:border-primary hover:bg-bg-secondary'
                              }
                            `}
                          >
                            <span className="text-sm font-medium text-foreground">{panel.title}</span>
                            {panel.style && Object.keys(panel.style).length > 0 && (
                              <span className="px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded">
                                Angepasst
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Back button */}
                      <button
                        onClick={() => setSelectedPanelForStyle(null)}
                        className="flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition-colors"
                      >
                        <ChevronUp className="h-4 w-4 rotate-[-90deg]" />
                        Zurück zur Übersicht
                      </button>
                      
                      {/* Style Editor */}
                      {panels.find(p => p.id === selectedPanelForStyle) && (
                        <PanelStyleEditor
                          panelTitle={panels.find(p => p.id === selectedPanelForStyle)!.title}
                          style={panels.find(p => p.id === selectedPanelForStyle)!.style}
                          onChange={(style) => updatePanelStyle(viewId, selectedPanelForStyle, style)}
                          onReset={() => resetPanelStyle(viewId, selectedPanelForStyle)}
                        />
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border bg-bg-secondary flex-shrink-0">
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-foreground hover:bg-surface rounded-lg transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Auf Standard zurücksetzen
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Individual Panel Item in the customizer
interface PanelCustomizerItemProps {
  panel: PanelConfig;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onToggleVisibility: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEditStyle?: () => void;
  hasCustomStyle?: boolean;
}

const PanelCustomizerItem: React.FC<PanelCustomizerItemProps> = ({
  panel,
  index,
  isFirst,
  isLast,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
  onEditStyle,
  hasCustomStyle,
}) => {
  return (
    <div 
      className={`
        flex items-center gap-3 px-4 py-3 border-b border-border last:border-0
        ${panel.visible ? 'bg-surface' : 'bg-bg-secondary/50'}
        hover:bg-bg-secondary transition-colors
      `}
    >
      {/* Drag Handle */}
      <div className="text-text-secondary cursor-grab active:cursor-grabbing">
        <GripVertical className="h-4 w-4" />
      </div>

      {/* Order Number */}
      <div className={`
        w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
        ${panel.visible 
          ? 'bg-primary/20 text-primary' 
          : 'bg-text-secondary/20 text-text-secondary'
        }
      `}>
        {index + 1}
      </div>

      {/* Panel Title */}
      <span className={`
        flex-1 text-sm font-medium truncate
        ${panel.visible ? 'text-foreground' : 'text-text-secondary line-through'}
      `}>
        {panel.title}
        {hasCustomStyle && (
          <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-primary" title="Angepasster Stil" />
        )}
      </span>

      {/* Style Button */}
      {onEditStyle && (
        <button
          onClick={onEditStyle}
          className={`
            p-1.5 rounded-lg transition-colors
            ${hasCustomStyle 
              ? 'text-primary hover:bg-primary/10' 
              : 'text-text-secondary hover:bg-surface hover:text-foreground'
            }
          `}
          title="Stil anpassen"
        >
          <Palette className="h-4 w-4" />
        </button>
      )}

      {/* Move Up/Down Buttons */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className="p-1 rounded hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-text-secondary hover:text-foreground"
          title="Nach oben"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className="p-1 rounded hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-text-secondary hover:text-foreground"
          title="Nach unten"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Visibility Toggle */}
      <button
        onClick={onToggleVisibility}
        className={`
          p-1.5 rounded-lg transition-colors
          ${panel.visible 
            ? 'text-primary hover:bg-primary/10' 
            : 'text-text-secondary hover:bg-surface'
          }
        `}
        title={panel.visible ? 'Ausblenden' : 'Einblenden'}
      >
        {panel.visible ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

// Compact version for inline use
interface PanelCustomizerInlineProps {
  viewId: ViewId;
  className?: string;
}

export const PanelCustomizerInline: React.FC<PanelCustomizerInlineProps> = ({
  viewId,
  className = '',
}) => {
  const { getPanels, togglePanelVisibility } = usePanelLayoutStore();
  const panels = getPanels(viewId);

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {panels.map((panel) => (
        <button
          key={panel.id}
          onClick={() => togglePanelVisibility(viewId, panel.id)}
          className={`
            flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all
            ${panel.visible 
              ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20' 
              : 'bg-bg-secondary text-text-secondary border-border hover:border-primary/30 hover:text-foreground'
            }
          `}
        >
          {panel.visible ? (
            <Eye className="h-3 w-3" />
          ) : (
            <EyeOff className="h-3 w-3" />
          )}
          {panel.title}
        </button>
      ))}
    </div>
  );
};
