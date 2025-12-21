import { useEffect, useState } from 'react';
import { mockApi } from '../../../services/mockApi';

interface TrustLogo {
  id: string;
  name: string;
  logo: string;
}

export const TrustLogos = () => {
  const [logos, setLogos] = useState<TrustLogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.marketing.getTrustLogos().then((response) => {
      setLogos(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-12 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-32 h-16 bg-border rounded"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-bg-secondary border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm text-text-muted mb-8 uppercase tracking-wider">
          Integrated with industry leaders
        </p>
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              {/* Placeholder for actual logos */}
              <div className="w-32 h-16 flex items-center justify-center border border-border rounded-md bg-surface">
                <span className="text-xs text-text-secondary font-semibold">{logo.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
