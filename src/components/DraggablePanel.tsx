import React, { useState, useRef, createContext, useContext, useEffect, useCallback, useMemo } from 'react';
import { 
  GripVertical, 
  Eye, 
  EyeOff, 
  Minimize2,
  Maximize2,
  RotateCcw
} from 'lucide-react';
import { usePanelLayoutStore, ViewId, PanelStyle } from '../store/usePanelLayoutStore';
import { getShadowStyle } from './PanelStyleEditor';
import { InlinePanelStyler, StyleTriggerButton } from './InlinePanelStyler';

// ============================================
// Drag Context for sharing state
// ============================================
interface DragContextType {
  draggedPanelId: string | null;
  setDraggedPanelId: (id: string | null) => void;
}

const DragContext = createContext<DragContextType>({
  draggedPanelId: null,
  setDraggedPanelId: () => {},
});

// Helper to build inline styles from PanelStyle
function buildContainerStyles(style?: PanelStyle): React.CSSProperties {
  if (!style) return {};
  
  return {
    backgroundColor: style.bgColor || undefined,
    color: style.textColor || undefined,
    borderColor: style.borderColor || undefined,
    borderWidth: style.borderWidth !== undefined ? `${style.borderWidth}px` : undefined,
    borderRadius: style.borderRadius !== undefined ? `${style.borderRadius}px` : undefined,
    opacity: style.opacity !== undefined ? style.opacity / 100 : undefined,
    boxShadow: getShadowStyle(style.shadowSize, style.shadowColor),
  };
}

function buildHeaderStyles(style?: PanelStyle): React.CSSProperties {
  if (!style) return {};
  
  return {
    backgroundColor: style.headerBgColor || undefined,
    color: style.headerTextColor || undefined,
    borderRadius: style.borderRadius !== undefined 
      ? `${Math.max(0, style.borderRadius - 1)}px ${Math.max(0, style.borderRadius - 1)}px 0 0` 
      : undefined,
  };
}

function buildContentStyles(style?: PanelStyle): React.CSSProperties {
  if (!style) return {};
  
  return {
    color: style.textColor || undefined,
  };
}

interface DraggablePanelProps {
  id: string;
  viewId: ViewId;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  collapsible?: boolean;
  showDragHandle?: boolean;
  variant?: 'default' | 'primary' | 'danger' | 'success' | 'warning';
}

const variantStyles = {
  default: {
    container: 'border-border bg-surface',
    header: 'bg-surface',
  },
  primary: {
    container: 'border-2 border-primary bg-primary/5',
    header: 'bg-primary/5',
  },
  danger: {
    container: 'border border-red-500/30 bg-red-500/5',
    header: 'bg-red-500/5',
  },
  success: {
    container: 'border-2 border-green-500/30 bg-green-500/5',
    header: 'bg-green-500/5',
  },
  warning: {
    container: 'border border-amber-500/30 bg-amber-500/5',
    header: 'bg-amber-500/5',
  },
};

export const DraggablePanel: React.FC<DraggablePanelProps> = ({
  id,
  viewId,
  title,
  icon,
  children,
  className = '',
  headerClassName = '',
  contentClassName = '',
  collapsible = true,
  showDragHandle = true,
  variant = 'default',
}) => {
  const { isPanelVisible, togglePanelCollapsed, togglePanelVisibility, layouts, updatePanelStyle, resetPanelStyle } = usePanelLayoutStore();
  const panelRef = useRef<HTMLDivElement>(null);
  const [showStyler, setShowStyler] = useState(false);

  // Get panel state from store
  const layout = layouts[viewId];
  const panelConfig = layout?.panels.find(p => p.id === id);
  const isCollapsed = panelConfig?.collapsed ?? false;
  const isVisible = isPanelVisible(viewId, id);
  const customStyle = panelConfig?.style;
  const hasCustomStyle = customStyle && Object.keys(customStyle).some(k => customStyle[k as keyof PanelStyle]);

  const variantClasses = variantStyles[variant];
  
  // Build inline styles for custom styling
  const containerInlineStyles = useMemo(() => buildContainerStyles(customStyle), [customStyle]);
  const headerInlineStyles = useMemo(() => buildHeaderStyles(customStyle), [customStyle]);
  const contentInlineStyles = useMemo(() => buildContentStyles(customStyle), [customStyle]);

  const handleToggleCollapse = () => {
    if (collapsible) {
      togglePanelCollapsed(viewId, id);
    }
  };

  const handleHide = () => {
    togglePanelVisibility(viewId, id);
  };

  const handleStyleChange = useCallback((style: Partial<PanelStyle>) => {
    updatePanelStyle(viewId, id, style);
  }, [viewId, id, updatePanelStyle]);

  const handleResetStyle = useCallback(() => {
    resetPanelStyle(viewId, id);
  }, [viewId, id, resetPanelStyle]);

  // If panel is hidden, return null (HiddenPanelsBar will show the restore button)
  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={panelRef}
      data-panel-id={id}
      className={`
        rounded-xl border transition-all duration-200 relative
        ${!hasCustomStyle ? variantClasses.container : 'border-solid'}
        ${className}
      `}
      style={containerInlineStyles}
    >
      {/* Panel Header */}
      <div
        className={`
          drag-handle cursor-grab active:cursor-grabbing
          flex items-center justify-between p-4 rounded-t-xl relative
          ${!hasCustomStyle ? variantClasses.header : ''}
          ${!isCollapsed ? 'border-b border-border' : 'rounded-b-xl'}
          ${headerClassName}
        `}
        style={headerInlineStyles}
      >
        <div className="flex items-center gap-3">
          {/* Drag Handle Icon */}
          {showDragHandle && (
            <div 
              className="p-1 -ml-1 rounded hover:bg-black/10 transition-colors"
              title="Ziehen zum Neuanordnen"
            >
              <GripVertical className="h-4 w-4" style={{ color: customStyle?.iconColor || customStyle?.headerTextColor || 'inherit', opacity: 0.6 }} />
            </div>
          )}
          
          {/* Icon */}
          {icon && (
            <div className="flex-shrink-0" style={{ color: customStyle?.iconColor || customStyle?.headerTextColor || 'inherit' }}>
              {icon}
            </div>
          )}
          
          {/* Title */}
          <h3 className="text-lg font-semibold" style={{ color: customStyle?.headerTextColor || 'inherit' }}>{title}</h3>
        </div>

        <div className="flex items-center gap-1 relative" onMouseDown={(e) => e.stopPropagation()}>
          {/* Style Button */}
          <StyleTriggerButton
            onClick={() => setShowStyler(!showStyler)}
            hasCustomStyle={!!hasCustomStyle}
            headerTextColor={customStyle?.headerTextColor}
          />

          {/* Inline Style Editor Popup */}
          {showStyler && (
            <InlinePanelStyler
              panelId={id}
              panelTitle={title}
              style={customStyle}
              onStyleChange={handleStyleChange}
              onReset={handleResetStyle}
              onClose={() => setShowStyler(false)}
            />
          )}

          {/* Hide Button */}
          <button
            onClick={handleHide}
            className="p-1.5 rounded-lg hover:bg-black/10 transition-colors"
            style={{ color: customStyle?.headerTextColor || 'inherit', opacity: 0.7 }}
            title="Panel ausblenden"
          >
            <Eye className="h-4 w-4" />
          </button>

          {/* Collapse/Expand Toggle */}
          {collapsible && (
            <button
              onClick={handleToggleCollapse}
              className="p-1.5 rounded-lg hover:bg-black/10 transition-colors"
              style={{ color: customStyle?.headerTextColor || 'inherit', opacity: 0.7 }}
              title={isCollapsed ? 'Panel erweitern' : 'Panel minimieren'}
            >
              {isCollapsed ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Panel Content */}
      <div
        className={`
          transition-all duration-200 overflow-hidden
          ${isCollapsed ? 'max-h-0' : 'max-h-[5000px]'}
          ${contentClassName}
          ${customStyle?.inheritColors && customStyle?.textColor ? 'panel-content-inherit' : ''}
        `}
        style={contentInlineStyles}
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// ============================================
// Drop Zone Component - shows between panels
// ============================================
interface DropZoneProps {
  index: number;
  isActive: boolean;
  onDrop: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({
  index,
  isActive,
  onDrop,
  onDragOver,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    onDragOver(e, index);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(index);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        transition-all duration-200 rounded-lg
        ${isActive 
          ? 'h-20 bg-primary/20 border-2 border-dashed border-primary my-3 flex items-center justify-center' 
          : 'h-3 my-0'
        }
      `}
    >
      {isActive && (
        <span className="text-sm text-primary font-medium">Hier ablegen</span>
      )}
    </div>
  );
};

// ============================================
// Draggable Panel Container with proper DnD
// ============================================
interface DraggablePanelContainerProps {
  viewId: ViewId;
  children: React.ReactNode;
  className?: string;
}

export const DraggablePanelContainer: React.FC<DraggablePanelContainerProps> = ({
  viewId,
  children,
  className = '',
}) => {
  const { reorderPanels, getPanels } = usePanelLayoutStore();
  const [draggedPanelId, setDraggedPanelId] = useState<string | null>(null);
  const [activeDropZone, setActiveDropZone] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const scrollIntervalRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const panels = getPanels(viewId);
  const visiblePanels = panels.filter(p => p.visible);

  // Auto-scroll function using document-level events
  const startAutoScroll = useCallback((clientY: number) => {
    const scrollMargin = 120;
    const scrollSpeed = 15;
    const viewportHeight = window.innerHeight;

    // Clear existing interval
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }

    if (clientY < scrollMargin) {
      // Scroll up - faster the closer to edge
      const speed = Math.max(5, scrollSpeed * (1 - clientY / scrollMargin));
      scrollIntervalRef.current = window.setInterval(() => {
        window.scrollBy(0, -speed);
      }, 16);
    } else if (clientY > viewportHeight - scrollMargin) {
      // Scroll down - faster the closer to edge
      const distanceFromBottom = viewportHeight - clientY;
      const speed = Math.max(5, scrollSpeed * (1 - distanceFromBottom / scrollMargin));
      scrollIntervalRef.current = window.setInterval(() => {
        window.scrollBy(0, speed);
      }, 16);
    }
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  }, []);

  // Document-level drag event handlers for smooth scrolling
  useEffect(() => {
    const handleDocumentDrag = (e: DragEvent) => {
      if (isDraggingRef.current) {
        startAutoScroll(e.clientY);
        
        // Calculate which panel we're over and set drop target
        if (containerRef.current) {
          const panelElements = Array.from(panelRefs.current.values());
          let newDropIndex = visiblePanels.length; // Default to end
          
          for (let i = 0; i < panelElements.length; i++) {
            const rect = panelElements[i]?.getBoundingClientRect();
            if (rect) {
              const midPoint = rect.top + rect.height / 2;
              if (e.clientY < midPoint) {
                newDropIndex = i;
                break;
              }
            }
          }
          
          setDropTargetIndex(newDropIndex);
        }
      }
    };

    const handleDocumentDragEnd = () => {
      stopAutoScroll();
      isDraggingRef.current = false;
    };

    document.addEventListener('drag', handleDocumentDrag);
    document.addEventListener('dragend', handleDocumentDragEnd);

    return () => {
      document.removeEventListener('drag', handleDocumentDrag);
      document.removeEventListener('dragend', handleDocumentDragEnd);
      stopAutoScroll();
    };
  }, [startAutoScroll, stopAutoScroll, visiblePanels.length]);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    setActiveDropZone(index);
  };

  const handleDrop = useCallback((dropIndex: number) => {
    stopAutoScroll();
    
    if (!draggedPanelId) {
      console.log('No dragged panel ID');
      return;
    }

    const fromIndex = visiblePanels.findIndex(p => p.id === draggedPanelId);
    console.log('Drop:', { draggedPanelId, dropIndex, fromIndex, visiblePanels: visiblePanels.map(p => p.id) });
    
    if (fromIndex === -1) {
      console.log('Panel not found in visible panels');
      return;
    }

    let targetIndex = dropIndex;
    if (fromIndex < dropIndex) {
      targetIndex = dropIndex - 1;
    }

    console.log('Reorder:', { fromIndex, targetIndex });

    if (fromIndex !== targetIndex && targetIndex >= 0) {
      reorderPanels(viewId, fromIndex, targetIndex);
    }

    setDraggedPanelId(null);
    setActiveDropZone(null);
    setDropTargetIndex(null);
  }, [draggedPanelId, visiblePanels, reorderPanels, viewId, stopAutoScroll]);

  const handleContainerDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop anywhere in the container (not just on drop zones)
  const handleContainerDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    stopAutoScroll();
    
    if (!draggedPanelId) {
      setDraggedPanelId(null);
      setActiveDropZone(null);
      setDropTargetIndex(null);
      return;
    }

    // Use the calculated drop target index if no specific drop zone was active
    const finalDropIndex = activeDropZone ?? dropTargetIndex ?? visiblePanels.length;
    
    const fromIndex = visiblePanels.findIndex(p => p.id === draggedPanelId);
    console.log('Container drop:', { draggedPanelId, finalDropIndex, fromIndex, activeDropZone, dropTargetIndex });
    
    if (fromIndex !== -1) {
      let targetIndex = finalDropIndex;
      if (fromIndex < finalDropIndex) {
        targetIndex = finalDropIndex - 1;
      }

      if (fromIndex !== targetIndex && targetIndex >= 0) {
        reorderPanels(viewId, fromIndex, targetIndex);
      }
    }

    setDraggedPanelId(null);
    setActiveDropZone(null);
    setDropTargetIndex(null);
  }, [draggedPanelId, activeDropZone, dropTargetIndex, visiblePanels, reorderPanels, viewId, stopAutoScroll]);

  // Filter and sort visible children
  const visibleChildren = React.Children.toArray(children)
    .filter((child): child is React.ReactElement => {
      if (!React.isValidElement(child)) return false;
      const panelId = child.props?.id;
      if (!panelId) return false;
      return visiblePanels.some(p => p.id === panelId);
    })
    .sort((a, b) => {
      const aId = a.props?.id;
      const bId = b.props?.id;
      const aIndex = visiblePanels.findIndex(p => p.id === aId);
      const bIndex = visiblePanels.findIndex(p => p.id === bId);
      return aIndex - bIndex;
    });

  // Register panel ref
  const registerPanelRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      panelRefs.current.set(id, el);
    } else {
      panelRefs.current.delete(id);
    }
  }, []);
  
  return (
    <DragContext.Provider value={{ draggedPanelId, setDraggedPanelId }}>
      <div 
        ref={containerRef}
        className={`${className}`}
        onDragOver={handleContainerDragOver}
        onDrop={handleContainerDrop}
      >
        {/* Initial drop zone */}
        {draggedPanelId && (
          <DropZone
            index={0}
            isActive={activeDropZone === 0 || (dropTargetIndex === 0 && activeDropZone === null)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        )}
        
        {visibleChildren.map((child, index) => {
          const panelId = child.props?.id;
          const isDropTarget = dropTargetIndex === index + 1 && activeDropZone === null;
          
          return (
            <React.Fragment key={panelId || index}>
              <DraggableWrapper
                panelId={panelId}
                isDragging={draggedPanelId === panelId}
                onDragStart={() => {
                  console.log('Drag start:', panelId);
                  isDraggingRef.current = true;
                  setDraggedPanelId(panelId);
                }}
                onDragEnd={() => {
                  console.log('Drag end');
                  isDraggingRef.current = false;
                  stopAutoScroll();
                  setDraggedPanelId(null);
                  setActiveDropZone(null);
                  setDropTargetIndex(null);
                }}
                registerRef={(el) => registerPanelRef(panelId, el)}
              >
                {child}
              </DraggableWrapper>
              
              {/* Drop zone after each panel */}
              {draggedPanelId && (
                <DropZone
                  index={index + 1}
                  isActive={activeDropZone === index + 1 || isDropTarget}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                />
              )}
              
              {/* Normal spacing when not dragging */}
              {!draggedPanelId && index < visibleChildren.length - 1 && (
                <div className="h-6" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </DragContext.Provider>
  );
};

// ============================================
// Draggable Wrapper - makes each panel draggable
// ============================================
interface DraggableWrapperProps {
  panelId: string;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  registerRef?: (el: HTMLDivElement | null) => void;
  children: React.ReactNode;
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  panelId,
  isDragging,
  onDragStart,
  onDragEnd,
  registerRef,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [canDrag, setCanDrag] = useState(false);

  useEffect(() => {
    if (registerRef) {
      registerRef(ref.current);
    }
    return () => {
      if (registerRef) {
        registerRef(null);
      }
    };
  }, [registerRef]);

  // Only allow dragging when mousedown started on the drag handle
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if mousedown is on drag handle or its children
      const isDragHandle = target.closest('.drag-handle');
      setCanDrag(!!isDragHandle);
    };

    const handleMouseUp = () => {
      // Reset after a short delay to allow drag to complete
      setTimeout(() => setCanDrag(false), 100);
    };

    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleDragStart = (e: React.DragEvent) => {
    if (!canDrag) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', panelId);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart();
  };

  const handleDragEnd = () => {
    setCanDrag(false);
    onDragEnd();
  };

  return (
    <div
      ref={ref}
      draggable={canDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        transition-all duration-200
        ${isDragging ? 'opacity-50 scale-[0.98]' : ''}
      `}
    >
      {children}
    </div>
  );
};

// ============================================
// Hidden Panels Bar - shows all hidden panels
// ============================================
interface HiddenPanelsBarProps {
  viewId: ViewId;
  className?: string;
  showResetButton?: boolean;
}

export const HiddenPanelsBar: React.FC<HiddenPanelsBarProps> = ({
  viewId,
  className = '',
  showResetButton = true,
}) => {
  const { getPanels, togglePanelVisibility, resetLayout } = usePanelLayoutStore();
  const panels = getPanels(viewId);
  const hiddenPanels = panels.filter(p => !p.visible);

  // Check if any panel order has changed from default (simple check)
  const hasCustomization = hiddenPanels.length > 0;

  if (!hasCustomization && !showResetButton) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 p-3 rounded-lg bg-bg-secondary/50 border border-dashed border-border ${className}`}>
      {hiddenPanels.length > 0 && (
        <>
          <span className="text-xs text-text-secondary mr-2">Ausgeblendete Panels:</span>
          {hiddenPanels.map((panel) => (
            <button
              key={panel.id}
              onClick={() => togglePanelVisibility(viewId, panel.id)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-border bg-surface hover:bg-bg-secondary hover:border-primary/50 transition-all group"
              title={`${panel.title} einblenden`}
            >
              <EyeOff className="h-3 w-3 text-text-secondary group-hover:text-primary transition-colors" />
              <span className="text-text-secondary group-hover:text-foreground transition-colors">
                {panel.title}
              </span>
            </button>
          ))}
        </>
      )}
      
      {/* Spacer */}
      {hiddenPanels.length > 0 && showResetButton && <div className="flex-1" />}
      
      {/* Reset Button */}
      {showResetButton && (
        <button
          onClick={() => resetLayout(viewId)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-border bg-surface hover:bg-bg-secondary hover:border-amber-500/50 transition-all group"
          title="Auf Standard zurücksetzen"
        >
          <RotateCcw className="h-3 w-3 text-text-secondary group-hover:text-amber-500 transition-colors" />
          <span className="text-text-secondary group-hover:text-foreground transition-colors">
            Zurücksetzen
          </span>
        </button>
      )}
    </div>
  );
};
