import { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  ClipboardCheck,
  AlertCircle,
  Camera,
  FileText,
  Calculator,
  Car,
  Shield,
  Key,
  CreditCard,
  User,
  Phone,
  Wrench,
  FileCheck,
  Calendar,
} from 'lucide-react';
import { Vehicle } from '../../../../types/domain';

interface Props {
  vehicle: Vehicle;
  onItemToggle?: (itemId: string, completed: boolean) => void;
}

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'dokumente' | 'prüfung' | 'finanzen' | 'übergabe';
  required: boolean;
  completed: boolean;
}

// Default checklist items for vehicle purchase (Ankauf)
const defaultChecklistItems: Omit<ChecklistItem, 'completed'>[] = [
  // Dokumente
  {
    id: 'doc-1',
    title: 'Fahrzeugbrief (Teil II) prüfen',
    description: 'Zulassungsbescheinigung Teil II auf Echtheit und Vollständigkeit prüfen',
    icon: FileText,
    category: 'dokumente',
    required: true,
  },
  {
    id: 'doc-2',
    title: 'Fahrzeugschein (Teil I) prüfen',
    description: 'Zulassungsbescheinigung Teil I vorhanden und aktuell',
    icon: FileText,
    category: 'dokumente',
    required: true,
  },
  {
    id: 'doc-3',
    title: 'Serviceheft vorhanden',
    description: 'Scheckheftgepflegt, alle Wartungen dokumentiert',
    icon: FileCheck,
    category: 'dokumente',
    required: false,
  },
  {
    id: 'doc-4',
    title: 'TÜV-Bericht prüfen',
    description: 'Aktueller HU/AU-Bericht, Mängel notieren',
    icon: Shield,
    category: 'dokumente',
    required: true,
  },
  {
    id: 'doc-5',
    title: 'Kaufvertrag Vorbesitzer',
    description: 'Bisherige Kaufverträge und Besitzhistorie',
    icon: FileText,
    category: 'dokumente',
    required: false,
  },

  // Prüfung
  {
    id: 'check-1',
    title: 'Karosserie-Check',
    description: 'Unfallschäden, Rost, Lackzustand, Spaltmaße prüfen',
    icon: Car,
    category: 'prüfung',
    required: true,
  },
  {
    id: 'check-2',
    title: 'Motor und Getriebe',
    description: 'Probefahrt, Geräusche, Ölstand, Undichtigkeiten',
    icon: Wrench,
    category: 'prüfung',
    required: true,
  },
  {
    id: 'check-3',
    title: 'Kilometerstand verifizieren',
    description: 'Tachomanipulation ausschließen, Servicenachweise vergleichen',
    icon: Calculator,
    category: 'prüfung',
    required: true,
  },
  {
    id: 'check-4',
    title: 'Vorher-Fotos erstellen',
    description: 'Zustand bei Ankauf dokumentieren (Schäden, Innenraum, etc.)',
    icon: Camera,
    category: 'prüfung',
    required: true,
  },
  {
    id: 'check-5',
    title: 'Elektronik und Ausstattung',
    description: 'Alle elektrischen Funktionen testen (Klima, Fenster, etc.)',
    icon: Key,
    category: 'prüfung',
    required: false,
  },

  // Finanzen
  {
    id: 'fin-1',
    title: 'Preisverhandlung abgeschlossen',
    description: 'Endgültiger Ankaufspreis festgelegt',
    icon: CreditCard,
    category: 'finanzen',
    required: true,
  },
  {
    id: 'fin-2',
    title: 'Zahlungsart geklärt',
    description: 'Bar, Überweisung oder Finanzierung vereinbart',
    icon: CreditCard,
    category: 'finanzen',
    required: true,
  },
  {
    id: 'fin-3',
    title: 'Kostenvoranschlag für Aufbereitung',
    description: 'Geschätzte Kosten für Reparaturen und Aufbereitung',
    icon: Calculator,
    category: 'finanzen',
    required: false,
  },

  // Übergabe
  {
    id: 'trans-1',
    title: 'Verkäufer-Daten erfasst',
    description: 'Personalausweis, Adresse, Kontaktdaten dokumentiert',
    icon: User,
    category: 'übergabe',
    required: true,
  },
  {
    id: 'trans-2',
    title: 'Ankaufvertrag erstellt',
    description: 'Vertrag vollständig ausgefüllt und unterschrieben',
    icon: FileText,
    category: 'übergabe',
    required: true,
  },
  {
    id: 'trans-3',
    title: 'Schlüssel übergeben',
    description: 'Alle Schlüssel (inkl. Ersatzschlüssel) erhalten',
    icon: Key,
    category: 'übergabe',
    required: true,
  },
  {
    id: 'trans-4',
    title: 'Übergabeprotokoll erstellt',
    description: 'Fahrzeugzustand bei Übergabe dokumentiert',
    icon: ClipboardCheck,
    category: 'übergabe',
    required: true,
  },
  {
    id: 'trans-5',
    title: 'Termin für Ummeldung',
    description: 'Zulassungsstelle-Termin geplant',
    icon: Calendar,
    category: 'übergabe',
    required: false,
  },
];

const categoryLabels = {
  dokumente: { label: 'Dokumente', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  prüfung: { label: 'Fahrzeugprüfung', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  finanzen: { label: 'Finanzen', color: 'text-green-500', bg: 'bg-green-500/10' },
  übergabe: { label: 'Übergabe', color: 'text-purple-500', bg: 'bg-purple-500/10' },
};

export const PurchaseChecklist = ({ vehicle, onItemToggle }: Props) => {
  // Initialize state with default items - in real app this would come from vehicle data or API
  const [items, setItems] = useState<ChecklistItem[]>(() =>
    defaultChecklistItems.map((item) => ({
      ...item,
      // Mock: mark some items as completed based on vehicle status
      completed: vehicle.status !== 'available' ? Math.random() > 0.5 : false,
    }))
  );

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['dokumente', 'prüfung', 'finanzen', 'übergabe'])
  );

  const toggleItem = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item))
    );
    const item = items.find((i) => i.id === itemId);
    if (item && onItemToggle) {
      onItemToggle(itemId, !item.completed);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Group items by category
  const itemsByCategory = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, ChecklistItem[]>
  );

  // Calculate progress
  const totalItems = items.length;
  const completedItems = items.filter((i) => i.completed).length;
  const requiredItems = items.filter((i) => i.required);
  const completedRequired = requiredItems.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  const allRequiredComplete = completedRequired === requiredItems.length;

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <ClipboardCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Ankauf-Checkliste</h3>
              <p className="text-sm text-text-secondary">
                Schritt-für-Schritt Prozess für den Fahrzeugankauf
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{progressPercent}%</div>
            <div className="text-sm text-text-secondary">
              {completedItems} von {totalItems}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-3 rounded-full bg-bg-secondary overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary-hover rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Required Items Status */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {allRequiredComplete ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-500" />
            )}
            <span className="text-sm">
              {allRequiredComplete ? (
                <span className="text-green-500 font-medium">Alle Pflichtfelder erledigt</span>
              ) : (
                <span className="text-amber-500 font-medium">
                  {completedRequired} von {requiredItems.length} Pflichtfeldern erledigt
                </span>
              )}
            </span>
          </div>
          <button
            onClick={() => setItems((prev) => prev.map((item) => ({ ...item, completed: false })))}
            className="text-sm text-text-secondary hover:text-foreground transition-colors"
          >
            Zurücksetzen
          </button>
        </div>
      </div>

      {/* Checklist by Category */}
      <div className="space-y-4">
        {Object.entries(itemsByCategory).map(([category, categoryItems]) => {
          const config = categoryLabels[category as keyof typeof categoryLabels];
          const completedInCategory = categoryItems.filter((i) => i.completed).length;
          const isExpanded = expandedCategories.has(category);

          return (
            <div
              key={category}
              className="rounded-xl border border-border bg-surface overflow-hidden"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-4 hover:bg-bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${config.bg}`}>
                    <ClipboardCheck className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">{config.label}</h4>
                    <p className="text-sm text-text-secondary">
                      {completedInCategory} von {categoryItems.length} erledigt
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-24 rounded-full bg-bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${config.bg.replace('/10', '')}`}
                      style={{ width: `${(completedInCategory / categoryItems.length) * 100}%` }}
                    />
                  </div>
                  <svg
                    className={`h-5 w-5 text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Category Items */}
              {isExpanded && (
                <div className="border-t border-border divide-y divide-border">
                  {categoryItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className={`flex items-start gap-4 p-4 transition-colors cursor-pointer hover:bg-bg-secondary ${
                          item.completed ? 'bg-green-500/5' : ''
                        }`}
                        onClick={() => toggleItem(item.id)}
                      >
                        {/* Checkbox */}
                        <div className="flex-shrink-0 mt-0.5">
                          {item.completed ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                          ) : (
                            <Circle className="h-6 w-6 text-text-secondary hover:text-primary transition-colors" />
                          )}
                        </div>

                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 rounded-lg p-2 ${
                            item.completed ? 'bg-green-500/10' : config.bg
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              item.completed ? 'text-green-500' : config.color
                            }`}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h5
                              className={`font-medium ${
                                item.completed ? 'text-green-600 line-through' : 'text-foreground'
                              }`}
                            >
                              {item.title}
                            </h5>
                            {item.required && !item.completed && (
                              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-red-500/10 text-red-500">
                                Pflicht
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-sm mt-0.5 ${
                              item.completed ? 'text-text-secondary/60' : 'text-text-secondary'
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Complete Button */}
      {allRequiredComplete && (
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <h4 className="text-lg font-semibold text-green-600">Checkliste vollständig!</h4>
          <p className="text-sm text-text-secondary mt-1">
            Alle erforderlichen Schritte für den Ankauf wurden abgeschlossen.
          </p>
          <button className="mt-4 px-6 py-2.5 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors">
            Ankauf abschließen
          </button>
        </div>
      )}
    </div>
  );
};
