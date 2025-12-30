import { useState } from 'react';

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  description: string;
}

const hotspots: Hotspot[] = [
  {
    id: 'hs-1',
    x: 25,
    y: 30,
    title: 'AI Photo Analysis',
    description: 'Automatically detect and categorize damage from photos',
  },
  {
    id: 'hs-2',
    x: 50,
    y: 45,
    title: 'Smart OCR',
    description: 'Extract vehicle data from Fahrzeugschein instantly',
  },
  {
    id: 'hs-3',
    x: 75,
    y: 35,
    title: 'One-Click Export',
    description: 'Send estimates to Audatex, DAT, and more',
  },
];

export const HotspotExplainer = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Powerful Features, Seamless Workflow
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            See how autoiXpert transforms your damage assessment process
          </p>
        </div>

        {/* Interactive demo area */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Placeholder for feature screenshot/mockup */}
          <div className="relative aspect-video bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-xl shadow-xl border border-border overflow-hidden">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {[...Array(96)].map((_, i) => (
                  <div key={i} className="border border-foreground"></div>
                ))}
              </div>
            </div>

            {/* Feature mockup placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-text-muted">Interactive Feature Demo</p>
              </div>
            </div>

            {/* Hotspot markers */}
            {hotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className="absolute"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              >
                <button
                  className={`relative w-8 h-8 rounded-full transition-all ${
                    activeHotspot === hotspot.id
                      ? 'bg-primary scale-125'
                      : 'bg-primary/60 hover:bg-primary hover:scale-110'
                  }`}
                  onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                  onMouseEnter={() => setActiveHotspot(hotspot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
                  <span className="relative flex items-center justify-center text-white text-xs font-bold">
                    +
                  </span>
                </button>

                {/* Tooltip */}
                {activeHotspot === hotspot.id && (
                  <div className="absolute left-10 top-0 w-64 bg-surface border border-border rounded-lg shadow-xl p-4 z-10 animate-fade-in">
                    <h4 className="font-semibold text-foreground mb-2">{hotspot.title}</h4>
                    <p className="text-sm text-text-secondary">{hotspot.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className="p-6 bg-surface border border-border rounded-lg hover:border-primary transition-all cursor-pointer"
              onClick={() => setActiveHotspot(hotspot.id)}
            >
              <h4 className="font-semibold text-foreground mb-2">{hotspot.title}</h4>
              <p className="text-sm text-text-secondary">{hotspot.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
