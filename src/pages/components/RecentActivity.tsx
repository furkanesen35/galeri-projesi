import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mockApi } from '../../services/mockApi';

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

export const RecentActivity = () => {
  const { t } = useTranslation();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.dashboard.getRecentActivity().then((response) => {
      setActivities(response.data);
      setLoading(false);
    });
  }, []);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'case_created':
        return (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        );
      case 'estimate_sent':
        return (
          <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      case 'photo_uploaded':
        return (
          <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center text-warning">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="h-6 bg-border rounded w-48 mb-4 animate-pulse"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-border"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-border rounded w-3/4"></div>
                <div className="h-3 bg-border rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.recentActivity')}</h3>
        <button className="text-sm text-primary hover:text-primary-hover font-medium">
          {t('actions.viewAll')}
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
          >
            {getActivityIcon(activity.type)}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm">{activity.title}</p>
              <p className="text-sm text-text-secondary truncate">{activity.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-text-muted">{activity.user}</span>
                <span className="text-xs text-text-muted">•</span>
                <span className="text-xs text-text-muted">
                  {formatTimestamp(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
