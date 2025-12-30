import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  FileText,
  Camera,
  ScanLine,
  ListTodo,
  Calendar as CalendarIcon,
  Settings as SettingsIcon,
  Wrench,
  Target,
  FolderOpen,
  Users,
} from 'lucide-react';
import { CarSearchIcon } from '../components/icons/CarSearchIcon';
import { LanguageSelector } from '../components/LanguageSelector';
import { NavLinkItem } from '../components/NavLinkItem';
import { ThemeToggle } from '../components/ThemeToggle';
import { useBackgroundStore } from '../store/useBackgroundStore';

export const AppShell = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const { getSelectedBackground, backgroundOpacity, backgroundBlur } = useBackgroundStore();
  const selectedBackground = getSelectedBackground();

  const navigation = [
    { to: '/', label: t('nav.dashboard'), icon: LayoutDashboard },
    {
      to: '/damage-assessment',
      label: t('nav.damageAssessment'),
      icon: FileText,
    },
    { to: '/photos', label: t('nav.photos'), icon: Camera },
    { to: '/ocr-scanner', label: t('nav.ocrScanner'), icon: ScanLine },
    { to: '/vehicles', label: t('nav.vehicles'), icon: CarSearchIcon },
    { to: '/customers', label: t('nav.customers'), icon: Users },
    { to: '/document-pool', label: t('nav.documentPool'), icon: FolderOpen },
    { to: '/tasks', label: t('nav.tasks'), icon: ListTodo },
    { to: '/calendar', label: t('nav.calendar'), icon: CalendarIcon },
    { to: '/config', label: t('nav.config'), icon: Wrench },
    { to: '/settings', label: t('nav.settings'), icon: SettingsIcon },
  ];

  // Generate background styles
  const getBackgroundStyle = (): React.CSSProperties => {
    if (selectedBackground.type === 'none') {
      return {};
    }
    if (selectedBackground.type === 'image') {
      return {
        backgroundImage: `url(${selectedBackground.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };
    }
    if (selectedBackground.type === 'pattern') {
      return {
        backgroundImage: selectedBackground.value,
        backgroundSize: '20px 20px',
      };
    }
    // gradient
    return {
      background: selectedBackground.value,
    };
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 relative">
      {/* Background Layer */}
      {selectedBackground.type !== 'none' && (
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            ...getBackgroundStyle(),
            opacity: backgroundOpacity / 100,
            filter: backgroundBlur > 0 ? `blur(${backgroundBlur}px)` : undefined,
          }}
        />
      )}

      {/* Optional overlay for better readability */}
      {selectedBackground.type !== 'none' && (
        <div
          className="fixed inset-0 z-0 pointer-events-none bg-background"
          style={{ opacity: 1 - backgroundOpacity / 100 }}
        />
      )}

      <div className="flex min-h-screen relative z-10">
        <aside className="fixed left-0 top-0 h-screen w-[80px] flex flex-col gap-4 border-r border-border bg-bg-secondary/95 backdrop-blur-sm px-3 py-6 z-50">
          <div className="space-y-1 mb-4">
            <div className="w-12 h-12 mx-auto bg-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-text">G</span>
            </div>
          </div>
          <nav className="flex-1 flex flex-col gap-1 overflow-y-auto overflow-x-hidden scrollbar-none">
            {navigation.map((item) => (
              <NavLinkItem key={item.to} to={item.to} icon={item.icon}>
                {item.label}
              </NavLinkItem>
            ))}
          </nav>
          <div className="space-y-4">
            <div className="pt-4 border-t border-border">
              <NavLinkItem to="/marketing" icon={Target}>
                {t('nav.marketing')}
              </NavLinkItem>
            </div>
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </aside>
        <main className="flex-1 ml-[80px] flex flex-col relative">
          <section className="flex-1 px-8 py-6">
            <div className="mx-auto max-w-6xl space-y-6">{children}</div>
          </section>
        </main>
      </div>
    </div>
  );
};
