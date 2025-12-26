import { LanguageSelector } from '../components/LanguageSelector';
import { ThemeToggle } from '../components/ThemeToggle';
import { CarSearchIcon } from '../components/icons/CarSearchIcon';
import { Car } from 'lucide-react';

export const Settings = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-xl font-semibold text-foreground">Settings</h3>
      <p className="text-sm text-text-secondary">Theme, language, and API endpoints.</p>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-lg">
        <h4 className="text-base font-semibold text-foreground">Appearance</h4>
        <div className="mt-4 flex items-center gap-3">
          <ThemeToggle />
        </div>
      </section>
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-lg">
        <h4 className="text-base font-semibold text-foreground">Language</h4>
        <div className="mt-4 flex items-center gap-3">
          <LanguageSelector />
        </div>
      </section>
    </div>
    
    {/* Icon Preview - TEMPORARY */}
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-lg">
      <h4 className="text-base font-semibold text-foreground mb-4">Icon Preview (Temporary)</h4>
      <div className="flex items-end gap-8">
        <div className="text-center">
          <p className="text-xs text-text-secondary mb-2">CarSearchIcon 20px</p>
          <CarSearchIcon className="h-5 w-5 text-foreground" />
        </div>
        <div className="text-center">
          <p className="text-xs text-text-secondary mb-2">CarSearchIcon 32px</p>
          <CarSearchIcon className="h-8 w-8 text-foreground" />
        </div>
        <div className="text-center">
          <p className="text-xs text-text-secondary mb-2">CarSearchIcon 48px</p>
          <CarSearchIcon className="h-12 w-12 text-foreground" />
        </div>
        <div className="text-center">
          <p className="text-xs text-text-secondary mb-2">CarSearchIcon 64px</p>
          <CarSearchIcon className="h-16 w-16 text-foreground" />
        </div>
        <div className="text-center border-l border-border pl-8">
          <p className="text-xs text-text-secondary mb-2">Original Car 20px</p>
          <Car className="h-5 w-5 text-foreground" />
        </div>
        <div className="text-center">
          <p className="text-xs text-text-secondary mb-2">Original Car 48px</p>
          <Car className="h-12 w-12 text-foreground" />
        </div>
      </div>
    </section>
    
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-lg">
      <h4 className="text-base font-semibold text-foreground">API</h4>
      <div className="mt-3 grid gap-3 text-sm text-foreground md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-text-secondary">Base URL</span>
          <input
            type="text"
            placeholder="http://localhost:8080/api"
            className="rounded-lg border border-border bg-bg-secondary px-3 py-2"
          />
        </label>
        <label className="flex items-center gap-2 text-foreground">
          <input type="checkbox" className="h-4 w-4 accent-primary" />
          <span>Use mock data when offline</span>
        </label>
      </div>
    </section>
  </div>
);
