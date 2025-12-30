interface Case {
  id: string;
  vehicleId: string;
  status: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  priority: string;
  estimatedValue: number;
}

interface CasesTableProps {
  cases: Case[];
  loading: boolean;
  onViewCase: (caseItem: Case) => void;
  selectedCaseId?: string;
}

export const CasesTable = ({ cases, loading, onViewCase, selectedCaseId }: CasesTableProps) => {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-primary/10 text-primary border-primary/20',
      'in-progress': 'bg-warning/10 text-warning border-warning/20',
      'pending-approval': 'bg-warning/10 text-warning border-warning/20',
      approved: 'bg-success/10 text-success border-success/20',
      completed: 'bg-success/10 text-success border-success/20',
      cancelled: 'bg-error/10 text-error border-error/20',
    };
    return colors[status] || colors.new;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'text-text-muted',
      medium: 'text-primary',
      high: 'text-warning',
      urgent: 'text-error',
    };
    return colors[priority] || colors.medium;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="space-y-4 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-border rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-lg p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-secondary flex items-center justify-center">
          <svg
            className="w-8 h-8 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No cases yet</h3>
        <p className="text-sm text-text-secondary">
          Create your first damage assessment case to get started
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-bg-secondary border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Case ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Est. Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cases.map((caseItem) => (
              <tr
                key={caseItem.id}
                className={`hover:bg-surface-hover transition-colors cursor-pointer ${
                  selectedCaseId === caseItem.id ? 'bg-primary/5' : ''
                }`}
                onClick={() => onViewCase(caseItem)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-foreground">{caseItem.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-foreground">{caseItem.title}</div>
                  <div className="text-xs text-text-secondary truncate max-w-xs">
                    {caseItem.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(caseItem.status)}`}
                  >
                    {caseItem.status.replace('-', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`text-sm font-medium capitalize ${getPriorityColor(caseItem.priority)}`}
                  >
                    {caseItem.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-foreground">{caseItem.assignedTo}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-foreground">
                    {formatCurrency(caseItem.estimatedValue)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-text-secondary">
                    {formatDate(caseItem.updatedAt)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-primary hover:text-primary-hover font-medium text-sm">
                    View →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
