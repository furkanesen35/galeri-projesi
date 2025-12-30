import { useState } from 'react';
import { Vehicle } from '../../../../types/domain';
import {
  FileText,
  Upload,
  Download,
  Eye,
  Trash2,
  FilePlus,
  FileCheck,
  FileWarning,
  Calendar,
  Plus,
  Sparkles,
} from 'lucide-react';
import { documentTemplates } from './DocumentTemplates';
import { DocumentCreationModal } from './DocumentCreationModal';

interface Props {
  vehicle: Vehicle;
}

// Mock documents data
const mockDocuments = [
  {
    id: 'd1',
    name: 'Fahrzeugbrief (Zulassungsbescheinigung Teil II)',
    type: 'pdf',
    size: '2.4 MB',
    date: '2024-12-01',
    status: 'complete',
  },
  {
    id: 'd2',
    name: 'Fahrzeugschein (Zulassungsbescheinigung Teil I)',
    type: 'pdf',
    size: '1.8 MB',
    date: '2024-12-01',
    status: 'complete',
  },
  {
    id: 'd3',
    name: 'Kaufvertrag',
    type: 'pdf',
    size: '456 KB',
    date: '2024-11-15',
    status: 'complete',
  },
  {
    id: 'd4',
    name: 'TÜV-Bericht',
    type: 'pdf',
    size: '1.2 MB',
    date: '2024-10-20',
    status: 'complete',
  },
  {
    id: 'd5',
    name: 'Serviceheft',
    type: 'pdf',
    size: '3.1 MB',
    date: '2024-09-05',
    status: 'complete',
  },
  { id: 'd6', name: 'Übergabeprotokoll', type: 'pdf', size: '0 KB', date: '', status: 'missing' },
  {
    id: 'd7',
    name: 'Garantieurkunde',
    type: 'pdf',
    size: '890 KB',
    date: '2024-12-15',
    status: 'pending',
  },
];

const statusConfig = {
  complete: { label: 'Vollständig', icon: FileCheck, color: 'text-green-500 bg-green-500/10' },
  pending: { label: 'Ausstehend', icon: FileWarning, color: 'text-amber-500 bg-amber-500/10' },
  missing: { label: 'Fehlt', icon: FileWarning, color: 'text-red-500 bg-red-500/10' },
};

// Category labels
const categoryLabels = {
  verkauf: 'Verkauf',
  ankauf: 'Ankauf',
  service: 'Service',
  intern: 'Intern',
};

export const VehicleDocumentsTab = ({ vehicle }: Props) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [createdDocuments, setCreatedDocuments] = useState<
    Array<{
      id: string;
      templateId: string;
      name: string;
      date: string;
      data: Record<string, unknown>;
    }>
  >([]);

  const handleCreateDocument = (templateId: string, data: Record<string, unknown>) => {
    const template = documentTemplates.find((t) => t.id === templateId);
    if (template) {
      setCreatedDocuments((prev) => [
        {
          id: `created-${Date.now()}`,
          templateId,
          name: template.name,
          date: new Date().toISOString(),
          data,
        },
        ...prev,
      ]);
    }
    setSelectedTemplateId(null);
  };

  // Group templates by category
  const templatesByCategory = documentTemplates.reduce(
    (acc, template) => {
      if (!acc[template.category]) {
        acc[template.category] = [];
      }
      acc[template.category].push(template);
      return acc;
    },
    {} as Record<string, typeof documentTemplates>
  );

  return (
    <div className="space-y-6">
      {/* Document Creation Templates */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Dokument erstellen
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Wählen Sie eine Vorlage und erstellen Sie ein neues Dokument
          </p>
        </div>

        <div className="p-6 space-y-6">
          {Object.entries(templatesByCategory).map(([category, templates]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-text-secondary mb-3">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {templates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplateId(template.id)}
                      className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-bg-secondary transition-all text-center"
                    >
                      <div
                        className={`p-3 rounded-xl ${template.bgColor} group-hover:scale-110 transition-transform`}
                      >
                        <Icon className={`h-6 w-6 ${template.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{template.name}</p>
                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
                          {template.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Created Documents */}
      {createdDocuments.length > 0 && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Zuletzt erstellt ({createdDocuments.length})
            </h3>
          </div>
          <div className="divide-y divide-border">
            {createdDocuments.map((doc) => {
              const template = documentTemplates.find((t) => t.id === doc.templateId);
              const Icon = template?.icon || FileText;
              return (
                <div
                  key={doc.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-lg p-2.5 ${template?.bgColor || 'bg-gray-500/10'}`}>
                      <Icon className={`h-5 w-5 ${template?.color || 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        {new Date(doc.date).toLocaleDateString('de-DE', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="rounded-lg p-2 text-text-secondary hover:bg-bg-secondary hover:text-foreground transition-colors"
                      title="Ansehen"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-2 text-text-secondary hover:bg-bg-secondary hover:text-foreground transition-colors"
                      title="Drucken"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div className="rounded-xl border-2 border-dashed border-border bg-surface p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <Upload className="h-10 w-10 text-text-secondary mx-auto mb-3" />
        <p className="text-foreground font-medium">Dokument hochladen</p>
        <p className="text-sm text-text-secondary mt-1">
          PDF, Word oder Bilddateien hierher ziehen oder klicken zum Auswählen
        </p>
        <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-text hover:bg-primary-hover transition-all">
          <FilePlus className="h-4 w-4" />
          Dateien auswählen
        </button>
      </div>

      {/* Documents List */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Hochgeladene Dokumente ({mockDocuments.length})
          </h3>
        </div>
        <div className="divide-y divide-border">
          {mockDocuments.map((doc) => {
            const status = statusConfig[doc.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            return (
              <div
                key={doc.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg p-2.5 ${status.color}`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                      {doc.size !== '0 KB' && <span>{doc.size}</span>}
                      {doc.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(doc.date).toLocaleDateString('de-DE')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.color}`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {status.label}
                  </span>
                  {doc.status === 'complete' && (
                    <div className="flex items-center gap-1">
                      <button
                        className="rounded-lg p-2 text-text-secondary hover:bg-bg-secondary hover:text-foreground transition-colors"
                        title="Ansehen"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-2 text-text-secondary hover:bg-bg-secondary hover:text-foreground transition-colors"
                        title="Herunterladen"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-2 text-text-secondary hover:bg-red-500/10 hover:text-red-500 transition-colors"
                        title="Löschen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  {doc.status === 'missing' && (
                    <button className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-text hover:bg-primary-hover transition-all">
                      <Upload className="h-3.5 w-3.5" />
                      Hochladen
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Document Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-green-500" />
            <span className="font-semibold text-foreground">5 Vollständig</span>
          </div>
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2">
            <FileWarning className="h-5 w-5 text-amber-500" />
            <span className="font-semibold text-foreground">1 Ausstehend</span>
          </div>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-center gap-2">
            <FileWarning className="h-5 w-5 text-red-500" />
            <span className="font-semibold text-foreground">1 Fehlt</span>
          </div>
        </div>
      </div>

      {/* Document Creation Modal */}
      {selectedTemplateId && (
        <DocumentCreationModal
          vehicle={vehicle}
          templateId={selectedTemplateId}
          onClose={() => setSelectedTemplateId(null)}
          onSave={handleCreateDocument}
        />
      )}
    </div>
  );
};
