import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockApi } from '../services/mockApi';
import { CaseWizard } from './DamageAssessment/components/CaseWizard';
import { CasesTable } from './DamageAssessment/components/CasesTable';
import { StatusTimeline } from './DamageAssessment/components/StatusTimeline';

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

export const DamageAssessment = () => {
  const { t } = useTranslation();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    setLoading(true);
    const response = await mockApi.cases.getCases();
    setCases(response.data);
    setLoading(false);
  };

  const handleCreateCase = async (data: any) => {
    const response = await mockApi.cases.createCase(data);
    setCases([response.data, ...cases]);
    setShowWizard(false);
  };

  const handleViewCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
  };

  const handleStatusChange = async (caseId: string, newStatus: string) => {
    const response = await mockApi.cases.updateCase(caseId, { status: newStatus });
    setCases(cases.map(c => c.id === caseId ? { ...c, status: newStatus } : c));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('damageAssessment.title')}</h1>
          <p className="text-sm text-text-secondary mt-1">
            {t('damageAssessment.subtitle')}
          </p>
        </div>
        <button
          onClick={() => setShowWizard(true)}
          className="px-6 py-3 bg-primary text-primary-text rounded-lg font-semibold hover:bg-primary-hover shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
        >
          + {t('damageAssessment.newCase')}
        </button>
      </div>

      {/* Quick filters */}
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-surface border-2 border-primary text-primary rounded-lg font-medium text-sm">
          {t('damageAssessment.allCases')}
        </button>
        <button className="px-4 py-2 bg-surface border border-border text-foreground rounded-lg font-medium text-sm hover:border-primary hover:text-primary transition-colors">
          {t('damageAssessment.inProgress')}
        </button>
        <button className="px-4 py-2 bg-surface border border-border text-foreground rounded-lg font-medium text-sm hover:border-primary hover:text-primary transition-colors">
          {t('damageAssessment.pendingApproval')}
        </button>
        <button className="px-4 py-2 bg-surface border border-border text-foreground rounded-lg font-medium text-sm hover:border-primary hover:text-primary transition-colors">
          {t('damageAssessment.completed')}
        </button>
      </div>

      {/* Selected case timeline */}
      {selectedCase && (
        <StatusTimeline
          caseItem={selectedCase}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Cases table */}
      <CasesTable
        cases={cases}
        loading={loading}
        onViewCase={handleViewCase}
        selectedCaseId={selectedCase?.id}
      />

      {/* Wizard modal */}
      {showWizard && (
        <CaseWizard
          onClose={() => setShowWizard(false)}
          onSubmit={handleCreateCase}
        />
      )}
    </div>
  );
};
