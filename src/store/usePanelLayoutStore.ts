import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Custom styling for individual panels
export interface PanelStyle {
  bgColor?: string;         // Background color (e.g., '#ff0000', 'rgb(255,0,0)', 'red')
  textColor?: string;       // Text color
  headerBgColor?: string;   // Header background color
  headerTextColor?: string; // Header text color
  iconColor?: string;       // Icon color (separate from text)
  borderColor?: string;     // Border color
  borderWidth?: number;     // Border width in pixels
  borderRadius?: number;    // Border radius in pixels
  shadowColor?: string;     // Box shadow color
  shadowSize?: 'none' | 'sm' | 'md' | 'lg' | 'xl';  // Shadow size preset
  opacity?: number;         // Panel opacity (0-100)
  inheritColors?: boolean;  // Whether child components should inherit the panel's colors
}

// Panel configuration for each view/page
export interface PanelConfig {
  id: string;
  title: string;
  icon?: string;
  visible: boolean;
  order: number;
  collapsed?: boolean;
  style?: PanelStyle;       // Custom panel styling
}

// Layout configuration for a specific view
export interface ViewLayout {
  panels: PanelConfig[];
}

// All available views in the application
export type ViewId = 
  | 'vehicle-detail-overview'
  | 'vehicle-detail-price'
  | 'vehicle-detail-documents'
  | 'vehicle-detail-history'
  | 'vehicle-detail-photos'
  | 'vehicle-detail-settings'
  | 'dashboard'
  | 'damage-assessment'
  | 'settings';

// Default panel configurations for each view
const defaultLayouts: Record<ViewId, ViewLayout> = {
  'vehicle-detail-overview': {
    panels: [
      { id: 'vehicle-data', title: 'Fahrzeugdaten', icon: 'Car', visible: true, order: 0 },
      { id: 'technical-data', title: 'Technische Daten', icon: 'Settings2', visible: true, order: 1 },
      { id: 'equipment-highlights', title: 'Ausstattung', icon: 'Zap', visible: true, order: 2 },
      { id: 'identification', title: 'Identifikation', icon: 'Hash', visible: true, order: 3 },
      { id: 'consumption-environment', title: 'Verbrauch & Emissionen', icon: 'Leaf', visible: true, order: 4 },
      { id: 'description', title: 'Beschreibung', icon: 'Info', visible: true, order: 5 },
      { id: 'timestamps', title: 'Zeitstempel', icon: 'Calendar', visible: true, order: 6 },
    ]
  },
  'vehicle-detail-price': {
    panels: [
      { id: 'base-price', title: 'Grundpreis', icon: 'Euro', visible: true, order: 0 },
      { id: 'price-adjustments', title: 'Preisanpassungen', icon: 'Calculator', visible: true, order: 1 },
      { id: 'damage-costs', title: 'Schaden / Mängel', icon: 'AlertTriangle', visible: true, order: 2 },
      { id: 'final-price', title: 'Endpreis', icon: 'Receipt', visible: true, order: 3 },
      { id: 'purchase-info', title: 'Einkauf', icon: 'PiggyBank', visible: true, order: 4 },
      { id: 'margin', title: 'Marge', icon: 'TrendingUp', visible: true, order: 5 },
      { id: 'quick-actions', title: 'Aktionen', icon: 'Zap', visible: true, order: 6 },
    ]
  },
  'vehicle-detail-documents': {
    panels: [
      { id: 'documents-list', title: 'Dokumente', icon: 'FileText', visible: true, order: 0 },
    ]
  },
  'vehicle-detail-history': {
    panels: [
      { id: 'history-timeline', title: 'Historie', icon: 'History', visible: true, order: 0 },
    ]
  },
  'vehicle-detail-photos': {
    panels: [
      { id: 'photo-gallery', title: 'Fotos', icon: 'Camera', visible: true, order: 0 },
    ]
  },
  'vehicle-detail-settings': {
    panels: [
      { id: 'vehicle-settings', title: 'Einstellungen', icon: 'Settings', visible: true, order: 0 },
    ]
  },
  'dashboard': {
    panels: [
      { id: 'kpi-cards', title: 'KPI-Karten', icon: 'BarChart', visible: true, order: 0 },
      { id: 'quick-stats', title: 'Schnellstatistiken', icon: 'Activity', visible: true, order: 1 },
      { id: 'stat-cards', title: 'Statistik-Karten', icon: 'PieChart', visible: true, order: 2 },
      { id: 'recent-activity', title: 'Letzte Aktivitäten', icon: 'Clock', visible: true, order: 3 },
      { id: 'quick-grid', title: 'Schnellzugriff', icon: 'Grid', visible: true, order: 4 },
    ]
  },
  'damage-assessment': {
    panels: [
      { id: 'status-timeline', title: 'Status-Timeline', icon: 'GitBranch', visible: true, order: 0 },
      { id: 'cases-table', title: 'Schadensfälle', icon: 'Table', visible: true, order: 1 },
    ]
  },
  'settings': {
    panels: [
      { id: 'appearance', title: 'Darstellung', icon: 'Palette', visible: true, order: 0 },
      { id: 'background', title: 'Hintergrundbild', icon: 'Image', visible: true, order: 1 },
      { id: 'language', title: 'Sprache', icon: 'Globe', visible: true, order: 2 },
      { id: 'api-settings', title: 'API-Einstellungen', icon: 'Server', visible: true, order: 3 },
    ]
  }
};

interface PanelLayoutState {
  layouts: Record<ViewId, ViewLayout>;
  
  // Get panels for a specific view (sorted by order)
  getPanels: (viewId: ViewId) => PanelConfig[];
  
  // Toggle panel visibility
  togglePanelVisibility: (viewId: ViewId, panelId: string) => void;
  
  // Toggle panel collapsed state
  togglePanelCollapsed: (viewId: ViewId, panelId: string) => void;
  
  // Reorder panels (drag and drop)
  reorderPanels: (viewId: ViewId, fromIndex: number, toIndex: number) => void;
  
  // Move a specific panel to a new position
  movePanelToPosition: (viewId: ViewId, panelId: string, newOrder: number) => void;
  
  // Reset layout to defaults
  resetLayout: (viewId: ViewId) => void;
  
  // Reset all layouts
  resetAllLayouts: () => void;
  
  // Check if a panel is visible
  isPanelVisible: (viewId: ViewId, panelId: string) => boolean;
  
  // Get panel order
  getPanelOrder: (viewId: ViewId, panelId: string) => number;
  
  // Update panel style
  updatePanelStyle: (viewId: ViewId, panelId: string, style: Partial<PanelStyle>) => void;
  
  // Reset panel style to default
  resetPanelStyle: (viewId: ViewId, panelId: string) => void;
  
  // Get panel style
  getPanelStyle: (viewId: ViewId, panelId: string) => PanelStyle | undefined;
  
  // Copy style from one panel to another
  copyPanelStyle: (fromViewId: ViewId, fromPanelId: string, toViewId: ViewId, toPanelId: string) => void;
  
  // Apply style to all panels in a view
  applyStyleToAllPanels: (viewId: ViewId, style: Partial<PanelStyle>) => void;
}

export const usePanelLayoutStore = create<PanelLayoutState>()(
  persist(
    (set, get) => ({
      layouts: defaultLayouts,
      
      getPanels: (viewId) => {
        const layout = get().layouts[viewId];
        if (!layout) return [];
        return [...layout.panels].sort((a, b) => a.order - b.order);
      },
      
      togglePanelVisibility: (viewId, panelId) => {
        set((state) => {
          const layout = state.layouts[viewId];
          if (!layout) return state;
          
          return {
            layouts: {
              ...state.layouts,
              [viewId]: {
                ...layout,
                panels: layout.panels.map((panel) =>
                  panel.id === panelId
                    ? { ...panel, visible: !panel.visible }
                    : panel
                ),
              },
            },
          };
        });
      },
      
      togglePanelCollapsed: (viewId, panelId) => {
        set((state) => {
          const layout = state.layouts[viewId];
          if (!layout) return state;
          
          return {
            layouts: {
              ...state.layouts,
              [viewId]: {
                ...layout,
                panels: layout.panels.map((panel) =>
                  panel.id === panelId
                    ? { ...panel, collapsed: !panel.collapsed }
                    : panel
                ),
              },
            },
          };
        });
      },
      
      reorderPanels: (viewId, fromIndex, toIndex) => {
        set((state) => {
          const layout = state.layouts[viewId];
          if (!layout) return state;
          
          // Get only VISIBLE panels sorted by order
          const visiblePanels = [...layout.panels]
            .filter(p => p.visible)
            .sort((a, b) => a.order - b.order);
          
          console.log('Store reorderPanels:', { 
            fromIndex, 
            toIndex, 
            visiblePanelIds: visiblePanels.map(p => p.id),
            allPanelIds: layout.panels.map(p => p.id)
          });
          
          if (fromIndex < 0 || fromIndex >= visiblePanels.length) {
            console.log('Invalid fromIndex');
            return state;
          }
          if (toIndex < 0 || toIndex >= visiblePanels.length) {
            console.log('Invalid toIndex');
            return state;
          }
          
          // Remove the item from its position in visible panels
          const [movedPanel] = visiblePanels.splice(fromIndex, 1);
          
          // Insert at new position
          visiblePanels.splice(toIndex, 0, movedPanel);
          
          console.log('New order:', visiblePanels.map(p => p.id));
          
          // Create a map of panel id to new order (only for visible panels)
          const newOrderMap = new Map<string, number>();
          visiblePanels.forEach((panel, index) => {
            newOrderMap.set(panel.id, index);
          });
          
          // Update all panels - visible ones get new order, hidden ones keep their order
          // but we need to make hidden panels have order after all visible ones
          const maxVisibleOrder = visiblePanels.length - 1;
          let hiddenOrder = maxVisibleOrder + 1;
          
          const updatedPanels = layout.panels.map((panel) => {
            if (panel.visible) {
              const newOrder = newOrderMap.get(panel.id);
              return { ...panel, order: newOrder ?? panel.order };
            } else {
              return { ...panel, order: hiddenOrder++ };
            }
          });
          
          console.log('Updated panels:', updatedPanels.map(p => ({ id: p.id, order: p.order, visible: p.visible })));
          
          return {
            layouts: {
              ...state.layouts,
              [viewId]: {
                ...layout,
                panels: updatedPanels,
              },
            },
          };
        });
      },
      
      movePanelToPosition: (viewId, panelId, newOrder) => {
        set((state) => {
          const layout = state.layouts[viewId];
          if (!layout) return state;
          
          const currentPanel = layout.panels.find((p) => p.id === panelId);
          if (!currentPanel) return state;
          
          const currentOrder = currentPanel.order;
          
          // Reorder all panels
          const updatedPanels = layout.panels.map((panel) => {
            if (panel.id === panelId) {
              return { ...panel, order: newOrder };
            }
            
            // Shift other panels accordingly
            if (newOrder < currentOrder) {
              // Moving up: panels between newOrder and currentOrder shift down
              if (panel.order >= newOrder && panel.order < currentOrder) {
                return { ...panel, order: panel.order + 1 };
              }
            } else {
              // Moving down: panels between currentOrder and newOrder shift up
              if (panel.order > currentOrder && panel.order <= newOrder) {
                return { ...panel, order: panel.order - 1 };
              }
            }
            
            return panel;
          });
          
          return {
            layouts: {
              ...state.layouts,
              [viewId]: {
                ...layout,
                panels: updatedPanels,
              },
            },
          };
        });
      },
      
      resetLayout: (viewId) => {
        set((state) => ({
          layouts: {
            ...state.layouts,
            [viewId]: defaultLayouts[viewId],
          },
        }));
      },
      
      resetAllLayouts: () => {
        set({ layouts: defaultLayouts });
      },
      
      isPanelVisible: (viewId, panelId) => {
        const layout = get().layouts[viewId];
        if (!layout) return true;
        const panel = layout.panels.find((p) => p.id === panelId);
        return panel?.visible ?? true;
      },
      
      getPanelOrder: (viewId, panelId) => {
        const layout = get().layouts[viewId];
        if (!layout) return 0;
        const panel = layout.panels.find((p) => p.id === panelId);
        return panel?.order ?? 0;
      },
      
      updatePanelStyle: (viewId, panelId, style) => {
        set((state) => {
          const layout = state.layouts[viewId];
          if (!layout) return state;
          
          return {
            layouts: {
              ...state.layouts,
              [viewId]: {
                ...layout,
                panels: layout.panels.map((panel) =>
                  panel.id === panelId
                    ? { ...panel, style: { ...panel.style, ...style } }
                    : panel
                ),
              },
            },
          };
        });
      },
      
      resetPanelStyle: (viewId, panelId) => {
        set((state) => {
          const layout = state.layouts[viewId];
          if (!layout) return state;
          
          return {
            layouts: {
              ...state.layouts,
              [viewId]: {
                ...layout,
                panels: layout.panels.map((panel) =>
                  panel.id === panelId
                    ? { ...panel, style: undefined }
                    : panel
                ),
              },
            },
          };
        });
      },
      
      getPanelStyle: (viewId, panelId) => {
        const layout = get().layouts[viewId];
        if (!layout) return undefined;
        const panel = layout.panels.find((p) => p.id === panelId);
        return panel?.style;
      },
      
      copyPanelStyle: (fromViewId, fromPanelId, toViewId, toPanelId) => {
        const fromStyle = get().getPanelStyle(fromViewId, fromPanelId);
        if (!fromStyle) return;
        
        set((state) => {
          const layout = state.layouts[toViewId];
          if (!layout) return state;
          
          return {
            layouts: {
              ...state.layouts,
              [toViewId]: {
                ...layout,
                panels: layout.panels.map((panel) =>
                  panel.id === toPanelId
                    ? { ...panel, style: { ...fromStyle } }
                    : panel
                ),
              },
            },
          };
        });
      },
      
      applyStyleToAllPanels: (viewId, style) => {
        set((state) => {
          const layout = state.layouts[viewId];
          if (!layout) return state;
          
          return {
            layouts: {
              ...state.layouts,
              [viewId]: {
                ...layout,
                panels: layout.panels.map((panel) => ({
                  ...panel,
                  style: { ...panel.style, ...style },
                })),
              },
            },
          };
        });
      },
    }),
    {
      name: 'panel-layout-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        // Handle migrations if needed
        if (version === 0) {
          return { layouts: defaultLayouts };
        }
        return persistedState as PanelLayoutState;
      },
    }
  )
);
