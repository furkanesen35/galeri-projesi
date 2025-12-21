import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatCard } from '../components/StatCard';
import { QuickGrid } from './components/QuickGrid';
import { mockApi } from '../services/mockApi';
import { KPICard } from './components/KPICard';
import { RecentActivity } from './components/RecentActivity';
import { QuickStats } from './components/QuickStats';

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

export const Dashboard = () => {
  const { t } = useTranslation();
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.dashboard.getKPIs().then((response) => {
      setKpis(response.data);
      setLoading(false);
    });
  }, []);

  const stats = [
    { title: t('dashboard.activeVehicles'), value: '128', hint: `12 ${t('common.inMaintenance')}` },
    { title: t('dashboard.openTasks'), value: '34', hint: `7 ${t('common.overdue')}` },
    { title: t('dashboard.upcomingAppointments'), value: '19', hint: t('common.thisWeek') }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards with data from mock API */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-surface border border-border rounded-lg animate-pulse"></div>
          ))
        ) : (
          kpis.map((kpi) => <KPICard key={kpi.id} kpi={kpi} />)
        )}
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Original stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} hint={item.hint} />
        ))}
      </div>

      {/* Recent Activity */}
      <RecentActivity />

      {/* Quick Actions Grid */}
      <QuickGrid />
    </div>
  );
};
