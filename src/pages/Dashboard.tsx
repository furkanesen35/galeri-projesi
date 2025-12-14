import { StatCard } from '../components/StatCard';
import { QuickGrid } from './components/QuickGrid';

export const Dashboard = () => {
  const stats = [
    { title: 'Active Vehicles', value: '128', hint: '12 in maintenance' },
    { title: 'Open Tasks', value: '34', hint: '7 overdue' },
    { title: 'Upcoming Appointments', value: '19', hint: 'This week' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} hint={item.hint} />
        ))}
      </div>
      <QuickGrid />
    </div>
  );
};
