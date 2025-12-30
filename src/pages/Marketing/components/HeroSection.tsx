import { useEffect, useState } from 'react';
import { mockApi } from '../../../services/mockApi';

interface HeroContent {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  videoUrl: string;
  backgroundImage: string;
}

interface HeroSectionProps {
  onWatchDemo: () => void;
}

export const HeroSection = ({ onWatchDemo }: HeroSectionProps) => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.marketing.getHeroContent().then((response) => {
      setContent(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="relative h-[600px] flex items-center justify-center bg-bg-secondary animate-pulse">
        <div className="text-center space-y-4">
          <div className="h-12 bg-border rounded w-96 mx-auto"></div>
          <div className="h-6 bg-border rounded w-[500px] mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-background to-primary-300/5"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-slide-up">
          {content?.headline}
        </h1>
        <p
          className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto animate-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          {content?.subheadline}
        </p>

        <div
          className="flex items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <button
            className="px-8 py-4 bg-primary text-primary-text rounded-lg font-semibold text-lg hover:bg-primary-hover shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            onClick={() => alert('Start Free Trial - Demo action')}
          >
            {content?.ctaPrimary}
          </button>
          <button
            className="px-8 py-4 bg-surface border-2 border-border text-foreground rounded-lg font-semibold text-lg hover:border-primary hover:text-primary shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            onClick={onWatchDemo}
          >
            {content?.ctaSecondary}
          </button>
        </div>

        {/* Trust indicator */}
        <p
          className="mt-8 text-sm text-text-muted animate-fade-in"
          style={{ animationDelay: '300ms' }}
        >
          Trusted by 500+ auto repair shops across Germany
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-pulse-soft"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl animate-pulse-soft"
        style={{ animationDelay: '1s' }}
      ></div>
    </section>
  );
};
