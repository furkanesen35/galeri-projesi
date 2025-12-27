# Panel Customization System

## Overview

This system allows users to customize their interface by:
- **Showing/Hiding panels** (einblenden/ausblenden)
- **Reordering panels** via drag-and-drop
- **Collapsing/Expanding panels** to minimize clutter
- **Persisting preferences** across sessions (saved in localStorage)

## Components

### 1. `usePanelLayoutStore` (Zustand Store)
**Location:** `src/store/usePanelLayoutStore.ts`

The central store that manages all panel layouts. Uses Zustand with persistence middleware to save to localStorage.

#### Key Features:
- Stores layouts for multiple views (Dashboard, Vehicle Details, etc.)
- Each panel has: `id`, `title`, `icon`, `visible`, `order`, `collapsed`
- Persists automatically to localStorage under key `panel-layout-storage`

#### Available Methods:
```typescript
getPanels(viewId)           // Get sorted panels for a view
togglePanelVisibility(viewId, panelId)  // Show/hide a panel
togglePanelCollapsed(viewId, panelId)   // Collapse/expand a panel
reorderPanels(viewId, fromIndex, toIndex)  // Reorder via drag & drop
resetLayout(viewId)         // Reset to defaults
resetAllLayouts()           // Reset all views
```

### 2. `DraggablePanel` Component
**Location:** `src/components/DraggablePanel.tsx`

A wrapper component that makes any panel draggable and provides consistent styling.

#### Props:
```typescript
interface DraggablePanelProps {
  id: string;                    // Unique panel identifier
  viewId: ViewId;                // Which view this panel belongs to
  title: string;                 // Panel header title
  icon?: React.ReactNode;        // Optional icon
  children: React.ReactNode;     // Panel content
  collapsible?: boolean;         // Allow collapse (default: true)
  showDragHandle?: boolean;      // Show grip handle (default: true)
  variant?: 'default' | 'primary' | 'danger' | 'success' | 'warning';
}
```

#### Features:
- Drag handle (grip icon) for reordering
- Collapse/expand button
- Visual feedback during drag operations
- Variant styling for different panel types

### 3. `PanelCustomizer` Component
**Location:** `src/components/PanelCustomizer.tsx`

A UI component that displays a dropdown for managing panel visibility and order.

#### Features:
- Shows all panels with toggle buttons for visibility
- Up/Down arrows for manual reordering
- Badge showing count of hidden panels
- Reset to defaults button

### 4. `usePanelLayout` Hook
**Location:** `src/hooks/usePanelLayout.ts`

A convenience hook that wraps the store with useful helpers.

```typescript
const {
  panels,           // All panels (sorted by order)
  visiblePanels,    // Only visible panels
  hiddenPanels,     // Only hidden panels
  handleDragStart,  // Call when drag starts
  handleDrop,       // Call when dropping on a panel
  toggleVisibility, // Toggle panel visibility
  checkVisibility,  // Check if panel is visible
  reset,            // Reset to defaults
} = usePanelLayout('dashboard');
```

## Usage Example

### Adding Panel Customization to a Page

```tsx
import { DraggablePanel } from '../components/DraggablePanel';
import { PanelCustomizer } from '../components/PanelCustomizer';
import { usePanelLayout } from '../hooks/usePanelLayout';

const VIEW_ID = 'my-page' as const;

export const MyPage = () => {
  const { visiblePanels, handleDragStart, handleDrop, checkVisibility } = usePanelLayout(VIEW_ID);

  return (
    <div className="space-y-6">
      {/* Add customizer button */}
      <div className="flex justify-end">
        <PanelCustomizer viewId={VIEW_ID} />
      </div>

      {/* Render panels in user's preferred order */}
      {visiblePanels.map((panel) => (
        <DraggablePanel
          key={panel.id}
          id={panel.id}
          viewId={VIEW_ID}
          title={panel.title}
          onDragStart={(e) => handleDragStart(panel.id)}
          onDrop={(e) => handleDrop(panel.id)}
        >
          {/* Panel content here */}
        </DraggablePanel>
      ))}
    </div>
  );
};
```

### Adding a New View

1. Add the view ID to the `ViewId` type in `usePanelLayoutStore.ts`:
```typescript
export type ViewId = 
  | 'dashboard'
  | 'vehicle-detail-price'
  | 'my-new-view'  // Add here
  // ...
```

2. Add default panel configuration:
```typescript
const defaultLayouts: Record<ViewId, ViewLayout> = {
  // ...
  'my-new-view': {
    panels: [
      { id: 'panel-1', title: 'First Panel', icon: 'FileText', visible: true, order: 0 },
      { id: 'panel-2', title: 'Second Panel', icon: 'Settings', visible: true, order: 1 },
    ]
  },
};
```

## Persistence

Settings are automatically saved to localStorage under the key `panel-layout-storage`. The stored data includes:
- Panel visibility state
- Panel order
- Panel collapsed state

Users can reset their preferences using the "Reset to defaults" button in the PanelCustomizer.

## Supported Views

Currently implemented:
- `dashboard` - Main dashboard page
- `vehicle-detail-overview` - Vehicle detail overview tab
- `vehicle-detail-price` - Vehicle price calculation tab
- `vehicle-detail-documents` - Documents tab
- `vehicle-detail-history` - History tab
- `vehicle-detail-photos` - Photos tab
- `vehicle-detail-settings` - Settings tab
- `damage-assessment` - Damage assessment page

## Future Enhancements

1. **API Persistence**: Save layouts to backend for cross-device sync
2. **Layout Presets**: Allow users to save/load layout presets
3. **Admin Default Layouts**: Let admins set default layouts for users
4. **Panel Width Customization**: Allow resizing of panel widths
5. **Multi-column Layouts**: Drag panels between columns
