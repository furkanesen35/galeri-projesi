import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  FileText, 
  Camera, 
  ScanLine, 
  Car, 
  ListTodo, 
  Calendar as CalendarIcon, 
  Settings as SettingsIcon, 
  Wrench,
  Target
} from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { NavLinkItem } from '../components/NavLinkItem';
import { ThemeToggle } from '../components/ThemeToggle';

export const AppShell = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

  const navigation = [
    { to: '/', label: t('nav.dashboard'), icon: LayoutDashboard },
    { to: '/damage-assessment', label: t('nav.damageAssessment'), icon: FileText },
    { to: '/photos', label: t('nav.photos'), icon: Camera },
    { to: '/ocr-scanner', label: t('nav.ocrScanner'), icon: ScanLine },
    { to: '/vehicles', label: t('nav.vehicles'), icon: Car },
    { to: '/tasks', label: t('nav.tasks'), icon: ListTodo },
    { to: '/calendar', label: t('nav.calendar'), icon: CalendarIcon },
    { to: '/config', label: t('nav.config'), icon: Wrench },
    { to: '/settings', label: t('nav.settings'), icon: SettingsIcon }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <div className="flex min-h-screen">
        <aside className="fixed left-0 top-0 h-screen w-[80px] flex flex-col gap-4 border-r border-border bg-bg-secondary px-3 py-6 overflow-hidden">
          <div className="space-y-1 mb-4">
            <div className="w-12 h-12 mx-auto bg-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-text">G</span>
            </div>
          </div>
          <nav className="flex-1 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
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
        <main className="flex-1 ml-[80px] flex flex-col bg-background">
          <section className="flex-1 px-8 py-6">
            <div className="mx-auto max-w-6xl space-y-6">{children}</div>
          </section>
        </main>
      </div>
    </div>
  );
};
