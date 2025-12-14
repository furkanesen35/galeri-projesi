export const Config = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-xl font-semibold text-foreground">Configuration</h3>
      <p className="text-sm text-text-secondary">Manage bank data, branding, and feature toggles.</p>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-lg">
        <h4 className="text-base font-semibold text-foreground">Branding</h4>
        <div className="mt-4 space-y-3 text-sm text-foreground">
          <label className="flex flex-col gap-1">
            <span className="text-text-secondary">Primary color</span>
            <input type="color" className="h-10 w-full rounded border border-border bg-bg-secondary" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-text-secondary">Logo URL</span>
            <input
              type="text"
              placeholder="https://..."
              className="rounded-lg border border-border bg-bg-secondary px-3 py-2"
            />
          </label>
        </div>
      </section>
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-lg">
        <h4 className="text-base font-semibold text-foreground">Bank data</h4>
        <div className="mt-4 grid gap-3 text-sm text-foreground">
          <label className="flex flex-col gap-1">
            <span className="text-text-secondary">IBAN</span>
            <input className="rounded-lg border border-border bg-bg-secondary px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-text-secondary">BIC</span>
            <input className="rounded-lg border border-border bg-bg-secondary px-3 py-2" />
          </label>
        </div>
      </section>
    </div>
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-lg">
      <h4 className="text-base font-semibold text-foreground">Feature toggles</h4>
      <div className="mt-3 grid gap-3 text-sm text-foreground md:grid-cols-3">
        {['Drag & drop', 'Calendar', 'Photo upload', 'Multi-language', 'Theme switcher', 'API mocks'].map(
          (label) => (
            <label key={label} className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
              <span>{label}</span>
            </label>
          )
        )}
      </div>
    </section>
  </div>
);
