import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';
import { NavLinkItem } from '../components/NavLinkItem';
import { ThemeToggle } from '../components/ThemeToggle';

export const AppShell = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

  const navigation = [
    { to: '/', label: t('nav.dashboard') },
    { to: '/damage-assessment', label: t('nav.damageAssessment') },
    { to: '/photos', label: t('nav.photos') },
    { to: '/ocr-scanner', label: t('nav.ocrScanner') },
    { to: '/vehicles', label: t('nav.vehicles') },
    { to: '/tasks', label: t('nav.tasks') },
    { to: '/calendar', label: t('nav.calendar') },
    { to: '/config', label: t('nav.config') },
    { to: '/settings', label: t('nav.settings') }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <div className="grid min-h-screen grid-cols-[260px_1fr]">
        <aside className="flex flex-col gap-4 border-r border-border bg-bg-secondary px-4 py-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Galeri</p>
            <h1 className="text-xl font-semibold text-foreground">Admin Panel</h1>
            <p className="text-sm text-text-secondary">React + TS + Tailwind</p>
          </div>
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <NavLinkItem key={item.to} to={item.to}>
                {item.label}
              </NavLinkItem>
            ))}
          </nav>
          <div className="mt-auto space-y-4">
            <div className="pt-4 border-t border-border">
              <NavLinkItem to="/marketing">
                🎯 {t('nav.marketing')}
              </NavLinkItem>
            </div>
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </aside>
        <main className="flex flex-col bg-background">
          <section className="flex-1 px-8 py-6">
            <div className="mx-auto max-w-6xl space-y-6">{children}</div>
          </section>
        </main>
      </div>
    </div>
  );
};
