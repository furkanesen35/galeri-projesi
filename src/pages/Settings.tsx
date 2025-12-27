import { Palette, Globe, Server, Image } from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { ThemeToggle } from '../components/ThemeToggle';
import { DraggablePanel, DraggablePanelContainer, HiddenPanelsBar } from '../components/DraggablePanel';
import { PanelCustomizer } from '../components/PanelCustomizer';
import { usePanelLayout } from '../hooks/usePanelLayout';
import { BackgroundSelector } from '../components/BackgroundSelector';

const VIEW_ID = 'settings' as const;

export const Settings = () => {
  const { panels } = usePanelLayout(VIEW_ID);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Einstellungen</h3>
          <p className="text-sm text-text-secondary">Design, Sprache und API-Konfiguration.</p>
        </div>
        <PanelCustomizer viewId={VIEW_ID} />
      </div>

      <HiddenPanelsBar viewId={VIEW_ID} />

      <DraggablePanelContainer viewId={VIEW_ID}>
        {/* Appearance Panel */}
        <DraggablePanel
          id="appearance"
          viewId={VIEW_ID}
          title="Darstellung"
          icon={<Palette className="h-5 w-5 text-primary" />}
        >
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-text-secondary">Wählen Sie das Erscheinungsbild der Anwendung</span>
          </div>
        </DraggablePanel>

        {/* Background Panel */}
        <DraggablePanel
          id="background"
          viewId={VIEW_ID}
          title="Hintergrundbild"
          icon={<Image className="h-5 w-5 text-primary" />}
        >
          <BackgroundSelector />
        </DraggablePanel>

        {/* Language Panel */}
        <DraggablePanel
          id="language"
          viewId={VIEW_ID}
          title="Sprache"
          icon={<Globe className="h-5 w-5 text-primary" />}
        >
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <span className="text-sm text-text-secondary">Wählen Sie Ihre bevorzugte Sprache</span>
          </div>
        </DraggablePanel>

        {/* API Settings Panel */}
        <DraggablePanel
          id="api-settings"
          viewId={VIEW_ID}
          title="API-Einstellungen"
          icon={<Server className="h-5 w-5 text-primary" />}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-text-secondary">Base URL</span>
              <input
                type="text"
                placeholder="http://localhost:8080/api"
                className="rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm text-foreground"
              />
            </label>
            <label className="flex items-center gap-2 text-foreground">
              <input type="checkbox" className="h-4 w-4 accent-primary" />
              <span className="text-sm">Mock-Daten verwenden wenn offline</span>
            </label>
          </div>
        </DraggablePanel>
      </DraggablePanelContainer>
    </div>
  );
};
