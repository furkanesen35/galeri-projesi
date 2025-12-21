import { useEffect, useState } from 'react';
import { mockApi } from '../../services/mockApi';

interface QuickStatsData {
  pendingApprovals: number;
  scheduledInspections: number;
  overdueInvoices: number;
  newMessages: number;
}

export const QuickStats = () => {
  const [stats, setStats] = useState<QuickStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.dashboard.getQuickStats().then((response) => {
      setStats(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-surface border border-border rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  const quickStats = [
    {
      label: 'Pending Approvals',
      value: stats?.pendingApprovals || 0,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'warning'
    },
    {
      label: 'Scheduled Inspections',
      value: stats?.scheduledInspections || 0,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'primary'
    },
    {
      label: 'Overdue Invoices',
      value: stats?.overdueInvoices || 0,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'error'
    },
    {
      label: 'New Messages',
      value: stats?.newMessages || 0,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'success'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {quickStats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface border border-border rounded-lg p-4 hover:border-primary/50 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className={`text-${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-text-secondary">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
