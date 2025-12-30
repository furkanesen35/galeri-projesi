import { useMemo, useCallback, useState } from 'react';
import { usePanelLayoutStore, ViewId, PanelConfig } from '../store/usePanelLayoutStore';

/**
 * Custom hook to use panel layout with drag-and-drop functionality
 */
export const usePanelLayout = (viewId: ViewId) => {
  const {
    getPanels,
    togglePanelVisibility,
    togglePanelCollapsed,
    reorderPanels,
    resetLayout,
    isPanelVisible,
    getPanelOrder,
  } = usePanelLayoutStore();

  const [draggedPanelId, setDraggedPanelId] = useState<string | null>(null);

  // Get all panels for this view (sorted by order)
  const panels = useMemo(() => getPanels(viewId), [getPanels, viewId]);

  // Get only visible panels
  const visiblePanels = useMemo(() => panels.filter((p) => p.visible), [panels]);

  // Get hidden panels
  const hiddenPanels = useMemo(() => panels.filter((p) => !p.visible), [panels]);

  // Handle drag start
  const handleDragStart = useCallback((panelId: string) => {
    setDraggedPanelId(panelId);
  }, []);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDraggedPanelId(null);
  }, []);

  // Handle drop on a target panel
  const handleDrop = useCallback(
    (targetPanelId: string) => {
      if (!draggedPanelId || draggedPanelId === targetPanelId) {
        setDraggedPanelId(null);
        return;
      }

      const fromIndex = panels.findIndex((p) => p.id === draggedPanelId);
      const toIndex = panels.findIndex((p) => p.id === targetPanelId);

      if (fromIndex !== -1 && toIndex !== -1) {
        reorderPanels(viewId, fromIndex, toIndex);
      }

      setDraggedPanelId(null);
    },
    [draggedPanelId, panels, reorderPanels, viewId]
  );

  // Toggle visibility for a specific panel
  const toggleVisibility = useCallback(
    (panelId: string) => {
      togglePanelVisibility(viewId, panelId);
    },
    [togglePanelVisibility, viewId]
  );

  // Toggle collapsed state for a specific panel
  const toggleCollapsed = useCallback(
    (panelId: string) => {
      togglePanelCollapsed(viewId, panelId);
    },
    [togglePanelCollapsed, viewId]
  );

  // Check if a specific panel is visible
  const checkVisibility = useCallback(
    (panelId: string) => isPanelVisible(viewId, panelId),
    [isPanelVisible, viewId]
  );

  // Get order of a specific panel
  const getOrder = useCallback(
    (panelId: string) => getPanelOrder(viewId, panelId),
    [getPanelOrder, viewId]
  );

  // Reset to default layout
  const reset = useCallback(() => {
    resetLayout(viewId);
  }, [resetLayout, viewId]);

  // Move a panel up in order
  const moveUp = useCallback(
    (panelId: string) => {
      const index = panels.findIndex((p) => p.id === panelId);
      if (index > 0) {
        reorderPanels(viewId, index, index - 1);
      }
    },
    [panels, reorderPanels, viewId]
  );

  // Move a panel down in order
  const moveDown = useCallback(
    (panelId: string) => {
      const index = panels.findIndex((p) => p.id === panelId);
      if (index < panels.length - 1) {
        reorderPanels(viewId, index, index + 1);
      }
    },
    [panels, reorderPanels, viewId]
  );

  return {
    // Panel data
    panels,
    visiblePanels,
    hiddenPanels,

    // Drag state
    draggedPanelId,
    isDragging: draggedPanelId !== null,

    // Drag handlers
    handleDragStart,
    handleDragEnd,
    handleDrop,

    // Visibility
    toggleVisibility,
    checkVisibility,

    // Collapse
    toggleCollapsed,

    // Order
    getOrder,
    moveUp,
    moveDown,

    // Reset
    reset,
  };
};

/**
 * Helper function to render panels in order
 */
export const renderPanelsInOrder = <T extends { id: string }>(
  panels: PanelConfig[],
  panelComponents: Record<string, T>,
  renderFn: (panel: PanelConfig, component: T) => React.ReactNode
): React.ReactNode[] => {
  return panels
    .filter((panel) => panel.visible && panelComponents[panel.id])
    .map((panel) => renderFn(panel, panelComponents[panel.id]));
};
