import { Vehicle } from '../../../../types/domain';
import { 
  FileText, Upload, Download, Eye, Trash2, 
  FilePlus, FileCheck, FileWarning, Calendar
} from 'lucide-react';

interface Props {
  vehicle: Vehicle;
}

// Mock documents data
const mockDocuments = [
  { id: 'd1', name: 'Fahrzeugbrief (Zulassungsbescheinigung Teil II)', type: 'pdf', size: '2.4 MB', date: '2024-12-01', status: 'complete' },
  { id: 'd2', name: 'Fahrzeugschein (Zulassungsbescheinigung Teil I)', type: 'pdf', size: '1.8 MB', date: '2024-12-01', status: 'complete' },
  { id: 'd3', name: 'Kaufvertrag', type: 'pdf', size: '456 KB', date: '2024-11-15', status: 'complete' },
  { id: 'd4', name: 'TÜV-Bericht', type: 'pdf', size: '1.2 MB', date: '2024-10-20', status: 'complete' },
  { id: 'd5', name: 'Serviceheft', type: 'pdf', size: '3.1 MB', date: '2024-09-05', status: 'complete' },
  { id: 'd6', name: 'Übergabeprotokoll', type: 'pdf', size: '0 KB', date: '', status: 'missing' },
  { id: 'd7', name: 'Garantieurkunde', type: 'pdf', size: '890 KB', date: '2024-12-15', status: 'pending' },
];

const statusConfig = {
  complete: { label: 'Vollständig', icon: FileCheck, color: 'text-green-500 bg-green-500/10' },
  pending: { label: 'Ausstehend', icon: FileWarning, color: 'text-amber-500 bg-amber-500/10' },
  missing: { label: 'Fehlt', icon: FileWarning, color: 'text-red-500 bg-red-500/10' },
};

export const VehicleDocumentsTab = ({ vehicle }: Props) => {
  return (
    <div className="space-y-6">
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
            Dokumente ({mockDocuments.length})
          </h3>
        </div>
        <div className="divide-y divide-border">
          {mockDocuments.map((doc) => {
            const status = statusConfig[doc.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            return (
              <div key={doc.id} className="flex items-center justify-between px-6 py-4 hover:bg-bg-secondary/50 transition-colors">
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
                  <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.color}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {status.label}
                  </span>
                  {doc.status === 'complete' && (
                    <div className="flex items-center gap-1">
                      <button className="rounded-lg p-2 text-text-secondary hover:bg-bg-secondary hover:text-foreground transition-colors" title="Ansehen">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-text-secondary hover:bg-bg-secondary hover:text-foreground transition-colors" title="Herunterladen">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-text-secondary hover:bg-red-500/10 hover:text-red-500 transition-colors" title="Löschen">
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
    </div>
  );
};
