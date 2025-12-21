import { useState } from 'react';

interface Case {
  id: string;
  status: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface StatusTimelineProps {
  caseItem: Case;
  onStatusChange: (caseId: string, newStatus: string) => void;
}

const statusFlow = [
  { key: 'new', label: 'New', icon: '📝' },
  { key: 'in-progress', label: 'In Progress', icon: '🔄' },
  { key: 'pending-approval', label: 'Pending Approval', icon: '⏳' },
  { key: 'approved', label: 'Approved', icon: '✅' },
  { key: 'completed', label: 'Completed', icon: '🎉' }
];

export const StatusTimeline = ({ caseItem, onStatusChange }: StatusTimelineProps) => {
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  const currentStatusIndex = statusFlow.findIndex(s => s.key === caseItem.status);

  const handleStatusClick = async (newStatus: string) => {
    setIsChangingStatus(true);
    await onStatusChange(caseItem.id, newStatus);
    setIsChangingStatus(false);
  };

  const getStatusColor = (index: number) => {
    if (index < currentStatusIndex) return 'bg-success border-success text-white';
    if (index === currentStatusIndex) return 'bg-primary border-primary text-white';
    return 'bg-bg-tertiary border-border text-text-muted';
  };

  const getLineColor = (index: number) => {
    if (index < currentStatusIndex) return 'bg-success';
    return 'bg-border';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{caseItem.title}</h3>
          <p className="text-sm text-text-secondary">Case ID: {caseItem.id}</p>
        </div>
        <button
          onClick={() => handleStatusClick(statusFlow[Math.min(currentStatusIndex + 1, statusFlow.length - 1)].key)}
          disabled={isChangingStatus || currentStatusIndex === statusFlow.length - 1}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            currentStatusIndex === statusFlow.length - 1
              ? 'bg-bg-tertiary text-text-muted cursor-not-allowed'
              : 'bg-primary text-primary-text hover:bg-primary-hover'
          }`}
        >
          {isChangingStatus ? 'Updating...' : currentStatusIndex === statusFlow.length - 1 ? 'Case Completed' : 'Advance Status →'}
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {statusFlow.map((status, index) => (
            <div key={status.key} className="flex flex-col items-center flex-1 relative">
              {/* Line connector */}
              {index < statusFlow.length - 1 && (
                <div className={`absolute left-1/2 top-6 w-full h-1 ${getLineColor(index)}`} style={{ zIndex: 0 }}></div>
              )}
              
              {/* Status node */}
              <button
                onClick={() => index <= currentStatusIndex + 1 && handleStatusClick(status.key)}
                disabled={index > currentStatusIndex + 1 || isChangingStatus}
                className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-all z-10 ${getStatusColor(index)} ${
                  index <= currentStatusIndex + 1 && index !== currentStatusIndex ? 'hover:scale-110 cursor-pointer' : ''
                } ${index > currentStatusIndex + 1 ? 'cursor-not-allowed' : ''}`}
              >
                {index < currentStatusIndex ? '✓' : status.icon}
              </button>
              
              {/* Label */}
              <span className={`mt-2 text-xs font-medium text-center ${
                index === currentStatusIndex ? 'text-primary' : index < currentStatusIndex ? 'text-success' : 'text-text-muted'
              }`}>
                {status.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Timestamps */}
      <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-text-secondary">Created:</span>
          <span className="ml-2 text-foreground font-medium">
            {new Date(caseItem.createdAt).toLocaleDateString('de-DE', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <div>
          <span className="text-text-secondary">Last Updated:</span>
          <span className="ml-2 text-foreground font-medium">
            {new Date(caseItem.updatedAt).toLocaleDateString('de-DE', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
