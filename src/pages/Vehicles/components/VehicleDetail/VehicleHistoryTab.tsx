import { Vehicle } from '../../../../types/domain';
import { 
  History, User, Calendar, Euro, Car, FileText, 
  Edit, Eye, Tag, MapPin, Clock
} from 'lucide-react';

interface Props {
  vehicle: Vehicle;
}

// Mock history data
const mockHistory = [
  {
    id: 'h1',
    type: 'status_change',
    title: 'Status geändert',
    description: 'Status von "Reserviert" auf "Verfügbar" geändert',
    user: 'Max Mustermann',
    date: '2024-12-24T14:30:00Z',
    icon: Tag,
    color: 'text-green-500 bg-green-500/10'
  },
  {
    id: 'h2',
    type: 'price_change',
    title: 'Preis angepasst',
    description: 'Verkaufspreis von € 34.900 auf € 32.900 reduziert',
    user: 'Max Mustermann',
    date: '2024-12-20T10:15:00Z',
    icon: Euro,
    color: 'text-amber-500 bg-amber-500/10'
  },
  {
    id: 'h3',
    type: 'document',
    title: 'Dokument hinzugefügt',
    description: 'TÜV-Bericht hochgeladen',
    user: 'Sarah Schmidt',
    date: '2024-12-15T09:00:00Z',
    icon: FileText,
    color: 'text-blue-500 bg-blue-500/10'
  },
  {
    id: 'h4',
    type: 'view',
    title: 'Kundenanfrage',
    description: 'Anfrage über mobile.de erhalten',
    user: 'System',
    date: '2024-12-10T16:45:00Z',
    icon: Eye,
    color: 'text-purple-500 bg-purple-500/10'
  },
  {
    id: 'h5',
    type: 'status_change',
    title: 'Status geändert',
    description: 'Status von "Verfügbar" auf "Reserviert" geändert',
    user: 'Max Mustermann',
    date: '2024-12-08T11:20:00Z',
    icon: Tag,
    color: 'text-amber-500 bg-amber-500/10'
  },
  {
    id: 'h6',
    type: 'edit',
    title: 'Daten aktualisiert',
    description: 'Kilometerstand und Bilder aktualisiert',
    user: 'Max Mustermann',
    date: '2024-12-05T14:00:00Z',
    icon: Edit,
    color: 'text-slate-500 bg-slate-500/10'
  },
  {
    id: 'h7',
    type: 'location',
    title: 'Standort geändert',
    description: 'Fahrzeug von München nach Berlin überführt',
    user: 'Transport GmbH',
    date: '2024-12-02T08:30:00Z',
    icon: MapPin,
    color: 'text-indigo-500 bg-indigo-500/10'
  },
  {
    id: 'h8',
    type: 'created',
    title: 'Fahrzeug angelegt',
    description: 'Fahrzeug wurde in das System aufgenommen',
    user: 'Max Mustermann',
    date: '2024-12-01T10:00:00Z',
    icon: Car,
    color: 'text-primary bg-primary/10'
  },
];

export const VehicleHistoryTab = ({ vehicle }: Props) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Änderungshistorie
        </h3>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Clock className="h-4 w-4" />
          {mockHistory.length} Einträge
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        {/* Timeline Items */}
        <div className="space-y-6">
          {mockHistory.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="relative flex gap-4">
                {/* Icon */}
                <div className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 border-background ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-foreground font-medium">{formatDate(item.date)}</p>
                      <p className="text-text-secondary">{formatTime(item.date)}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
                    <User className="h-3.5 w-3.5" />
                    <span>{item.user}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-bg-secondary transition-colors">
          <History className="h-4 w-4" />
          Ältere Einträge laden
        </button>
      </div>
    </div>
  );
};
