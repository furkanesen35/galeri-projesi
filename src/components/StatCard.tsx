type StatCardProps = {
  title: string;
  value: string;
  hint?: string;
};

export const StatCard = ({ title, value, hint }: StatCardProps) => (
  <div className="rounded-2xl border border-border bg-surface p-5 shadow-lg">
    <p className="text-sm font-medium text-text-secondary">{title}</p>
    <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
    {hint ? <p className="mt-1 text-xs text-text-muted">{hint}</p> : null}
  </div>
);
