import { useTranslation } from 'react-i18next';

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

interface KPICardProps {
  kpi: KPI;
}

export const KPICard = ({ kpi }: KPICardProps) => {
  const { t } = useTranslation();
  const formatValue = (value: number, format?: string) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
      }).format(value);
    }
    if (format === 'days') {
      return `${value} days`;
    }
    return value.toLocaleString('de-DE');
  };

  const isPositiveTrend =
    (kpi.trend === 'up' && kpi.change >= 0) || (kpi.trend === 'down' && kpi.change < 0);

  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      cases: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      estimates: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      revenue: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      time: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    };
    return icons[iconName] || icons.cases;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {getIcon(kpi.icon)}
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositiveTrend ? 'text-success' : 'text-error'
          }`}
        >
          {kpi.change > 0 ? '+' : ''}
          {kpi.change.toFixed(1)}%
          <svg
            className={`w-4 h-4 ${kpi.trend === 'down' ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold text-foreground mb-1">
          {formatValue(kpi.value, kpi.format)}
        </p>
        <p className="text-sm text-text-secondary mb-1">{t(`dashboard.${kpi.id}`)}</p>
        <p className="text-xs text-text-muted">{t('common.vsLastMonth')}</p>
      </div>
    </div>
  );
};
