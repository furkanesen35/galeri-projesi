import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart3, Activity, PieChart, Clock, LayoutGrid } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { QuickGrid } from './components/QuickGrid';
import { mockApi } from '../services/mockApi';
import { KPICard } from './components/KPICard';
import { RecentActivity } from './components/RecentActivity';
import { QuickStats } from './components/QuickStats';
import {
  DraggablePanel,
  DraggablePanelContainer,
  HiddenPanelsBar,
} from '../components/DraggablePanel';
import { PanelCustomizer } from '../components/PanelCustomizer';
import { usePanelLayout } from '../hooks/usePanelLayout';

interface KPI {
  id: string;
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  trend: 'up' | 'down';
  icon: string;
  format?: string;
}

const VIEW_ID = 'dashboard' as const;

export const Dashboard = () => {
  const { t } = useTranslation();
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);

  const { panels } = usePanelLayout(VIEW_ID);

  useEffect(() => {
    mockApi.dashboard.getKPIs().then((response) => {
      setKpis(response.data);
      setLoading(false);
    });
  }, []);

  const stats = [
    { title: t('dashboard.activeVehicles'), value: '128', hint: `12 ${t('common.inMaintenance')}` },
    { title: t('dashboard.openTasks'), value: '34', hint: `7 ${t('common.overdue')}` },
    { title: t('dashboard.upcomingAppointments'), value: '19', hint: t('common.thisWeek') },
  ];

  // Panel content components
  const panelContent: Record<string, { icon: React.ReactNode; content: React.ReactNode }> = {
    'kpi-cards': {
      icon: <BarChart3 className="h-5 w-5 text-primary" />,
      content: (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-surface border border-border rounded-lg animate-pulse"
                ></div>
              ))
            : kpis.map((kpi) => <KPICard key={kpi.id} kpi={kpi} />)}
        </div>
      ),
    },
    'quick-stats': {
      icon: <Activity className="h-5 w-5 text-primary" />,
      content: <QuickStats />,
    },
    'stat-cards': {
      icon: <PieChart className="h-5 w-5 text-primary" />,
      content: (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <StatCard key={item.title} title={item.title} value={item.value} hint={item.hint} />
          ))}
        </div>
      ),
    },
    'recent-activity': {
      icon: <Clock className="h-5 w-5 text-primary" />,
      content: <RecentActivity />,
    },
    'quick-grid': {
      icon: <LayoutGrid className="h-5 w-5 text-primary" />,
      content: <QuickGrid />,
    },
  };

  return (
    <div className="space-y-6">
      {/* Panel Customizer */}
      <div className="flex justify-end">
        <PanelCustomizer viewId={VIEW_ID} />
      </div>

      {/* Hidden Panels Bar */}
      <HiddenPanelsBar viewId={VIEW_ID} />

      {/* Render panels in order with drag and drop */}
      <DraggablePanelContainer viewId={VIEW_ID}>
        {panels.map((panel) => {
          const content = panelContent[panel.id];
          if (!content) return null;

          return (
            <DraggablePanel
              key={panel.id}
              id={panel.id}
              viewId={VIEW_ID}
              title={panel.title}
              icon={content.icon}
            >
              {content.content}
            </DraggablePanel>
          );
        })}
      </DraggablePanelContainer>
    </div>
  );
};
