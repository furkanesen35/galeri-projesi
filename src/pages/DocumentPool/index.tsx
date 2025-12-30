import { useState, useMemo } from 'react';
import {
  FolderOpen,
  FileText,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  Copy,
  Car,
  User,
  FileCheck,
  ClipboardList,
  Shield,
  Wrench,
  Receipt,
  Scale,
  Building2,
  FileSignature,
  ChevronRight,
  ChevronDown,
  Star,
  Clock,
  Tag,
} from 'lucide-react';
import { vehicleFixtures } from '../../services/vehicleFixtures';

// Document Template Categories
interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  isFavorite: boolean;
  lastUsed?: string;
  usageCount: number;
  hasVehiclePlaceholders: boolean;
  hasCustomerPlaceholders: boolean;
  preview?: string;
}

interface DocumentCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  subcategories?: string[];
  count: number;
}

// Mock document templates database
const documentTemplates: DocumentTemplate[] = [
  // Kaufverträge
  { id: 'kv-1', name: 'Kaufvertrag Gebrauchtwagen', description: 'Standard Kaufvertrag für Gebrauchtfahrzeuge mit allen rechtlichen Klauseln', category: 'kaufvertrag', tags: ['verkauf', 'gebraucht'], isFavorite: true, usageCount: 156, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'kv-2', name: 'Kaufvertrag Neuwagen', description: 'Kaufvertrag für Neufahrzeuge mit Garantiebedingungen', category: 'kaufvertrag', tags: ['verkauf', 'neu'], isFavorite: false, usageCount: 89, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'kv-3', name: 'Kaufvertrag gewerblich', description: 'B2B Kaufvertrag für gewerbliche Kunden', category: 'kaufvertrag', tags: ['verkauf', 'b2b', 'gewerblich'], isFavorite: false, usageCount: 45, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'kv-4', name: 'Kaufvertrag Inzahlungnahme', description: 'Kaufvertrag mit Inzahlungnahme eines Altfahrzeugs', category: 'kaufvertrag', tags: ['verkauf', 'inzahlungnahme'], isFavorite: true, usageCount: 67, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'kv-5', name: 'Rücktrittsvereinbarung', description: 'Vereinbarung bei Rücktritt vom Kaufvertrag', category: 'kaufvertrag', tags: ['rücktritt', 'storno'], isFavorite: false, usageCount: 12, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  
  // Ankaufverträge
  { id: 'av-1', name: 'Ankaufvertrag Standard', description: 'Standard Ankaufvertrag für Fahrzeugankauf', category: 'ankaufvertrag', tags: ['ankauf', 'einkauf'], isFavorite: true, usageCount: 134, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'av-2', name: 'Ankaufvertrag mit Mängelliste', description: 'Ankaufvertrag mit detaillierter Mängeldokumentation', category: 'ankaufvertrag', tags: ['ankauf', 'mängel'], isFavorite: false, usageCount: 78, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'av-3', name: 'Inzahlungnahme-Bestätigung', description: 'Bestätigung für Inzahlungnahme bei Neukauf', category: 'ankaufvertrag', tags: ['inzahlungnahme'], isFavorite: false, usageCount: 56, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  
  // TÜV & Prüfberichte
  { id: 'tuev-1', name: 'TÜV-Vorbereitungsprotokoll', description: 'Checkliste zur TÜV-Vorbereitung', category: 'tuev', tags: ['tüv', 'hu', 'prüfung'], isFavorite: true, usageCount: 203, hasVehiclePlaceholders: true, hasCustomerPlaceholders: false },
  { id: 'tuev-2', name: 'HU/AU-Auftrag', description: 'Auftrag für Hauptuntersuchung und Abgasuntersuchung', category: 'tuev', tags: ['tüv', 'hu', 'au'], isFavorite: false, usageCount: 167, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'tuev-3', name: 'Mängelprotokoll TÜV', description: 'Dokumentation von TÜV-Mängeln', category: 'tuev', tags: ['tüv', 'mängel'], isFavorite: false, usageCount: 89, hasVehiclePlaceholders: true, hasCustomerPlaceholders: false },
  { id: 'tuev-4', name: 'Prüfbericht Fahrzeugzustand', description: 'Detaillierter Prüfbericht zum Fahrzeugzustand', category: 'tuev', tags: ['prüfung', 'zustand'], isFavorite: false, usageCount: 45, hasVehiclePlaceholders: true, hasCustomerPlaceholders: false },
  
  // Gutachten & Expertise
  { id: 'gut-1', name: 'Wertgutachten Kurzform', description: 'Kompaktes Wertgutachten für schnelle Bewertung', category: 'gutachten', tags: ['wert', 'bewertung'], isFavorite: true, usageCount: 178, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'gut-2', name: 'Wertgutachten Langform', description: 'Ausführliches Wertgutachten mit Fotodokumentation', category: 'gutachten', tags: ['wert', 'bewertung', 'ausführlich'], isFavorite: false, usageCount: 67, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'gut-3', name: 'Schadengutachten', description: 'Gutachten zur Schadenbewertung', category: 'gutachten', tags: ['schaden', 'unfall'], isFavorite: true, usageCount: 234, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'gut-4', name: 'Oldtimer-Bewertung', description: 'Spezialgutachten für Oldtimer und Liebhaberfahrzeuge', category: 'gutachten', tags: ['oldtimer', 'klassiker'], isFavorite: false, usageCount: 23, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'gut-5', name: 'Reparaturkostenkalkulation', description: 'Detaillierte Reparaturkostenaufstellung', category: 'gutachten', tags: ['reparatur', 'kosten'], isFavorite: false, usageCount: 145, hasVehiclePlaceholders: true, hasCustomerPlaceholders: false },
  
  // Werkstatt & Service
  { id: 'ws-1', name: 'Werkstattauftrag', description: 'Standard Werkstattauftrag mit Kostenschätzung', category: 'werkstatt', tags: ['werkstatt', 'reparatur'], isFavorite: true, usageCount: 312, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'ws-2', name: 'Inspektionsprotokoll', description: 'Protokoll für Fahrzeuginspektion', category: 'werkstatt', tags: ['inspektion', 'wartung'], isFavorite: false, usageCount: 189, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'ws-3', name: 'Übergabeprotokoll Werkstatt', description: 'Protokoll bei Fahrzeugübergabe an Werkstatt', category: 'werkstatt', tags: ['übergabe', 'werkstatt'], isFavorite: false, usageCount: 134, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'ws-4', name: 'Probefahrtprotokoll Werkstatt', description: 'Dokumentation von Probefahrten nach Reparatur', category: 'werkstatt', tags: ['probefahrt', 'test'], isFavorite: false, usageCount: 67, hasVehiclePlaceholders: true, hasCustomerPlaceholders: false },
  { id: 'ws-5', name: 'Kostenvoranschlag', description: 'Detaillierter Kostenvoranschlag für Reparaturen', category: 'werkstatt', tags: ['kosten', 'angebot'], isFavorite: true, usageCount: 256, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  
  // Rechnungen & Quittungen
  { id: 're-1', name: 'Rechnung Fahrzeugverkauf', description: 'Rechnung für Fahrzeugverkauf mit MwSt', category: 'rechnung', tags: ['rechnung', 'verkauf'], isFavorite: true, usageCount: 289, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 're-2', name: 'Rechnung Reparatur', description: 'Werkstattrechnung mit Arbeitslohn und Teilen', category: 'rechnung', tags: ['rechnung', 'werkstatt'], isFavorite: false, usageCount: 234, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 're-3', name: 'Quittung Anzahlung', description: 'Quittung für erhaltene Anzahlung', category: 'rechnung', tags: ['quittung', 'anzahlung'], isFavorite: false, usageCount: 145, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 're-4', name: 'Gutschrift', description: 'Gutschrift für Rückerstattungen', category: 'rechnung', tags: ['gutschrift', 'erstattung'], isFavorite: false, usageCount: 34, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 're-5', name: 'Mahnung', description: 'Zahlungserinnerung / Mahnung', category: 'rechnung', tags: ['mahnung', 'zahlung'], isFavorite: false, usageCount: 78, hasVehiclePlaceholders: false, hasCustomerPlaceholders: true },
  
  // Versicherung
  { id: 'vs-1', name: 'Versicherungsbestätigung', description: 'Bestätigung der Fahrzeugversicherung', category: 'versicherung', tags: ['versicherung', 'bestätigung'], isFavorite: false, usageCount: 89, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'vs-2', name: 'Schadenmeldung', description: 'Formular zur Schadenmeldung an Versicherung', category: 'versicherung', tags: ['versicherung', 'schaden'], isFavorite: true, usageCount: 167, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'vs-3', name: 'Unfallbericht', description: 'Detaillierter Unfallbericht für Versicherung', category: 'versicherung', tags: ['unfall', 'bericht'], isFavorite: false, usageCount: 56, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'vs-4', name: 'Vollmacht Versicherung', description: 'Vollmacht für Versicherungsangelegenheiten', category: 'versicherung', tags: ['vollmacht', 'versicherung'], isFavorite: false, usageCount: 34, hasVehiclePlaceholders: false, hasCustomerPlaceholders: true },
  
  // Rechtliches
  { id: 'rv-1', name: 'Vollmacht Zulassung', description: 'Vollmacht für Fahrzeugzulassung', category: 'rechtlich', tags: ['vollmacht', 'zulassung'], isFavorite: true, usageCount: 198, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'rv-2', name: 'Vollmacht Abmeldung', description: 'Vollmacht für Fahrzeugabmeldung', category: 'rechtlich', tags: ['vollmacht', 'abmeldung'], isFavorite: false, usageCount: 145, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'rv-3', name: 'SEPA-Lastschriftmandat', description: 'Mandat für SEPA-Lastschrifteinzug', category: 'rechtlich', tags: ['sepa', 'lastschrift', 'zahlung'], isFavorite: false, usageCount: 123, hasVehiclePlaceholders: false, hasCustomerPlaceholders: true },
  { id: 'rv-4', name: 'Datenschutzerklärung', description: 'DSGVO-konforme Datenschutzerklärung', category: 'rechtlich', tags: ['dsgvo', 'datenschutz'], isFavorite: false, usageCount: 89, hasVehiclePlaceholders: false, hasCustomerPlaceholders: true },
  { id: 'rv-5', name: 'Widerrufsbelehrung', description: 'Widerrufsbelehrung für Fernabsatzgeschäfte', category: 'rechtlich', tags: ['widerruf', 'fernabsatz'], isFavorite: false, usageCount: 67, hasVehiclePlaceholders: false, hasCustomerPlaceholders: true },
  { id: 'rv-6', name: 'Übergabeprotokoll Kunde', description: 'Übergabeprotokoll bei Fahrzeugauslieferung', category: 'rechtlich', tags: ['übergabe', 'auslieferung'], isFavorite: true, usageCount: 234, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  
  // Finanzierung
  { id: 'fi-1', name: 'Finanzierungsantrag', description: 'Antrag für Fahrzeugfinanzierung', category: 'finanzierung', tags: ['finanzierung', 'kredit'], isFavorite: true, usageCount: 178, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'fi-2', name: 'Leasingvertrag', description: 'Leasingvertrag für Fahrzeuge', category: 'finanzierung', tags: ['leasing'], isFavorite: false, usageCount: 89, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'fi-3', name: 'Ratenzahlungsvereinbarung', description: 'Vereinbarung für Ratenzahlung', category: 'finanzierung', tags: ['raten', 'zahlung'], isFavorite: false, usageCount: 56, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
  { id: 'fi-4', name: 'Bürgschaftserklärung', description: 'Bürgschaft für Finanzierung', category: 'finanzierung', tags: ['bürgschaft', 'sicherheit'], isFavorite: false, usageCount: 23, hasVehiclePlaceholders: false, hasCustomerPlaceholders: true },
  
  // Intern
  { id: 'in-1', name: 'Fahrzeugbewertung intern', description: 'Interne Bewertung für Ankauf', category: 'intern', tags: ['intern', 'bewertung'], isFavorite: false, usageCount: 156, hasVehiclePlaceholders: true, hasCustomerPlaceholders: false },
  { id: 'in-2', name: 'Mängelbericht intern', description: 'Interne Mängeldokumentation', category: 'intern', tags: ['intern', 'mängel'], isFavorite: false, usageCount: 134, hasVehiclePlaceholders: true, hasCustomerPlaceholders: false },
  { id: 'in-3', name: 'Übergabeprotokoll intern', description: 'Interne Fahrzeugübergabe', category: 'intern', tags: ['intern', 'übergabe'], isFavorite: false, usageCount: 89, hasVehiclePlaceholders: true, hasCustomerPlaceholders: false },
  { id: 'in-4', name: 'Probefahrt-Freigabe', description: 'Freigabe für Probefahrt', category: 'intern', tags: ['intern', 'probefahrt'], isFavorite: false, usageCount: 67, hasVehiclePlaceholders: true, hasCustomerPlaceholders: true },
];

const categories: DocumentCategory[] = [
  { id: 'kaufvertrag', name: 'Kaufverträge', icon: FileSignature, color: 'text-blue-500', count: 5 },
  { id: 'ankaufvertrag', name: 'Ankaufverträge', icon: ClipboardList, color: 'text-green-500', count: 3 },
  { id: 'tuev', name: 'TÜV & Prüfberichte', icon: Shield, color: 'text-amber-500', count: 4 },
  { id: 'gutachten', name: 'Gutachten & Expertise', icon: FileCheck, color: 'text-purple-500', count: 5 },
  { id: 'werkstatt', name: 'Werkstatt & Service', icon: Wrench, color: 'text-orange-500', count: 5 },
  { id: 'rechnung', name: 'Rechnungen & Quittungen', icon: Receipt, color: 'text-emerald-500', count: 5 },
  { id: 'versicherung', name: 'Versicherung', icon: Shield, color: 'text-cyan-500', count: 4 },
  { id: 'rechtlich', name: 'Rechtliches & Vollmachten', icon: Scale, color: 'text-red-500', count: 6 },
  { id: 'finanzierung', name: 'Finanzierung & Leasing', icon: Building2, color: 'text-indigo-500', count: 4 },
  { id: 'intern', name: 'Interne Dokumente', icon: FolderOpen, color: 'text-slate-500', count: 4 },
];

// Mock customer data
const mockCustomers = [
  { id: 'c1', name: 'Max Mustermann', email: 'max.mustermann@example.de', phone: '+49 170 1234567', address: 'Musterstraße 123, 12345 Musterstadt' },
  { id: 'c2', name: 'Erika Musterfrau', email: 'erika.musterfrau@example.de', phone: '+49 171 2345678', address: 'Beispielweg 456, 54321 Beispielstadt' },
  { id: 'c3', name: 'Hans Schmidt', email: 'hans.schmidt@example.de', phone: '+49 172 3456789', address: 'Hauptstraße 789, 98765 Hauptstadt' },
];

export const DocumentPool = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['kaufvertrag', 'ankaufvertrag']));
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredTemplates = useMemo(() => {
    return documentTemplates.filter(template => {
      const matchesSearch = searchQuery === '' || 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || template.category === selectedCategory;
      const matchesFavorite = !showFavoritesOnly || template.isFavorite;
      
      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [searchQuery, selectedCategory, showFavoritesOnly]);

  const templatesByCategory = useMemo(() => {
    const grouped: Record<string, DocumentTemplate[]> = {};
    filteredTemplates.forEach(template => {
      if (!grouped[template.category]) {
        grouped[template.category] = [];
      }
      grouped[template.category].push(template);
    });
    return grouped;
  }, [filteredTemplates]);

  const handlePreview = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setShowPreviewModal(true);
  };

  const handleUseTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    // In a real app, this would open a document editor with the template
    alert(`Vorlage "${template.name}" wird geöffnet...`);
  };

  const toggleFavorite = (templateId: string) => {
    // In a real app, this would update the backend
    console.log('Toggle favorite:', templateId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FolderOpen className="h-7 w-7 text-primary" />
            Dokumentenpool
          </h1>
          <p className="text-text-secondary mt-1">
            {documentTemplates.length} Vorlagen in {categories.length} Kategorien
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-text rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          Neue Vorlage
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Vorlagen durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-bg-secondary border border-border rounded-lg text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
              showFavoritesOnly 
                ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' 
                : 'bg-bg-secondary border-border text-text-secondary hover:text-foreground'
            }`}
          >
            <Star className={`h-4 w-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            Favoriten
          </button>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
              !selectedCategory 
                ? 'bg-primary/10 border-primary/50 text-primary' 
                : 'bg-bg-secondary border-border text-text-secondary hover:text-foreground'
            }`}
          >
            <Filter className="h-4 w-4" />
            Alle
          </button>
        </div>
      </div>

      {/* Vehicle/Customer Selection for Auto-fill */}
      <div className="bg-bg-secondary border border-border rounded-xl p-4">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          Auto-Ausfüllung: Fahrzeug & Kunde auswählen
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-text-secondary mb-1.5">Fahrzeug</label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="">Kein Fahrzeug ausgewählt</option>
              {vehicleFixtures.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.brand} {vehicle.model} - {vehicle.plate || vehicle.vin}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1.5">Kunde</label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="">Kein Kunde ausgewählt</option>
              {mockCustomers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {(selectedVehicle || selectedCustomer) && (
          <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
            <FileCheck className="h-3 w-3" />
            Ausgewählte Daten werden automatisch in Vorlagen eingefügt
          </p>
        )}
      </div>

      <div className="flex gap-6">
        {/* Categories Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-bg-secondary border border-border rounded-xl p-4 sticky top-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Kategorien</h3>
            <nav className="space-y-1">
              {categories.map(category => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                const isExpanded = expandedCategories.has(category.id);
                const templatesInCategory = templatesByCategory[category.id] || [];
                
                return (
                  <div key={category.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(isSelected ? null : category.id);
                        if (!isExpanded) toggleCategory(category.id);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                        isSelected 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-text-secondary hover:text-foreground hover:bg-bg-tertiary'
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(category.id);
                        }}
                        className="p-0.5 hover:bg-bg-tertiary rounded"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </button>
                      <Icon className={`h-4 w-4 ${category.color}`} />
                      <span className="flex-1 truncate">{category.name}</span>
                      <span className="text-xs bg-bg-tertiary px-1.5 py-0.5 rounded">
                        {templatesInCategory.length}
                      </span>
                    </button>
                    
                    {/* Subcategory items */}
                    {isExpanded && templatesInCategory.length > 0 && (
                      <div className="ml-8 mt-1 space-y-0.5">
                        {templatesInCategory.slice(0, 3).map(template => (
                          <button
                            key={template.id}
                            onClick={() => handlePreview(template)}
                            className="w-full text-left text-xs text-text-secondary hover:text-foreground py-1 px-2 rounded hover:bg-bg-tertiary truncate flex items-center gap-1.5"
                          >
                            <FileText className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{template.name}</span>
                          </button>
                        ))}
                        {templatesInCategory.length > 3 && (
                          <span className="text-xs text-text-secondary px-2">
                            +{templatesInCategory.length - 3} weitere
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1">
          {Object.entries(templatesByCategory).length === 0 ? (
            <div className="bg-bg-secondary border border-border rounded-xl p-12 text-center">
              <FileText className="h-12 w-12 text-text-secondary mx-auto mb-3" />
              <h3 className="text-lg font-medium text-foreground mb-1">Keine Vorlagen gefunden</h3>
              <p className="text-text-secondary text-sm">
                Versuchen Sie einen anderen Suchbegriff oder Filter
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {categories.map(category => {
                const templates = templatesByCategory[category.id];
                if (!templates || templates.length === 0) return null;
                
                const Icon = category.icon;
                
                return (
                  <div key={category.id} className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${category.color}`} />
                      <h2 className="font-semibold text-foreground">{category.name}</h2>
                      <span className="text-xs text-text-secondary bg-bg-tertiary px-2 py-0.5 rounded-full">
                        {templates.length} Vorlagen
                      </span>
                    </div>
                    <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {templates.map(template => (
                        <div
                          key={template.id}
                          className="bg-background border border-border rounded-lg p-4 hover:border-primary/50 transition-colors group"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-primary" />
                              <h3 className="font-medium text-foreground">{template.name}</h3>
                            </div>
                            <button
                              onClick={() => toggleFavorite(template.id)}
                              className={`p-1 rounded hover:bg-bg-tertiary ${
                                template.isFavorite ? 'text-amber-500' : 'text-text-secondary'
                              }`}
                            >
                              <Star className={`h-4 w-4 ${template.isFavorite ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                            {template.description}
                          </p>
                          <div className="flex items-center gap-2 mb-3">
                            {template.hasVehiclePlaceholders && (
                              <span className="inline-flex items-center gap-1 text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">
                                <Car className="h-3 w-3" />
                                Fahrzeug
                              </span>
                            )}
                            {template.hasCustomerPlaceholders && (
                              <span className="inline-flex items-center gap-1 text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded">
                                <User className="h-3 w-3" />
                                Kunde
                              </span>
                            )}
                            <span className="text-xs text-text-secondary flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {template.usageCount}x verwendet
                            </span>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handlePreview(template)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm bg-bg-tertiary text-foreground rounded-lg hover:bg-bg-tertiary/80"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              Vorschau
                            </button>
                            <button
                              onClick={() => handleUseTemplate(template)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-text rounded-lg hover:opacity-90"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Verwenden
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-bg-secondary border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{selectedTemplate.name}</h2>
                  <p className="text-sm text-text-secondary">{selectedTemplate.description}</p>
                </div>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-bg-tertiary rounded-lg text-text-secondary hover:text-foreground"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {/* Mock document preview */}
              <div className="bg-white text-black rounded-lg shadow-lg p-8 min-h-[600px]">
                <div className="border-b-2 border-gray-300 pb-4 mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">{selectedTemplate.name}</h1>
                  <p className="text-gray-500 text-sm mt-1">Dokumentvorlage - {categories.find(c => c.id === selectedTemplate.category)?.name}</p>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <p className="text-sm">
                    <strong>Datum:</strong> {new Date().toLocaleDateString('de-DE')}
                  </p>
                  
                  {selectedTemplate.hasVehiclePlaceholders && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-800 mb-2">Fahrzeugdaten</h3>
                      {selectedVehicle ? (
                        (() => {
                          const vehicle = vehicleFixtures.find(v => v.id === selectedVehicle);
                          return vehicle ? (
                            <div className="text-sm space-y-1">
                              <p><strong>Marke/Modell:</strong> {vehicle.brand} {vehicle.model}</p>
                              <p><strong>Kennzeichen:</strong> {vehicle.plate || 'N/A'}</p>
                              <p><strong>FIN:</strong> {vehicle.vin}</p>
                              <p><strong>Erstzulassung:</strong> {vehicle.firstRegistration}</p>
                              <p><strong>Kilometerstand:</strong> {vehicle.mileageKm?.toLocaleString()} km</p>
                            </div>
                          ) : null;
                        })()
                      ) : (
                        <p className="text-blue-600 italic text-sm">
                          [Fahrzeug auswählen für automatische Befüllung]
                        </p>
                      )}
                    </div>
                  )}
                  
                  {selectedTemplate.hasCustomerPlaceholders && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2">Kundendaten</h3>
                      {selectedCustomer ? (
                        (() => {
                          const customer = mockCustomers.find(c => c.id === selectedCustomer);
                          return customer ? (
                            <div className="text-sm space-y-1">
                              <p><strong>Name:</strong> {customer.name}</p>
                              <p><strong>Adresse:</strong> {customer.address}</p>
                              <p><strong>Telefon:</strong> {customer.phone}</p>
                              <p><strong>E-Mail:</strong> {customer.email}</p>
                            </div>
                          ) : null;
                        })()
                      ) : (
                        <p className="text-green-600 italic text-sm">
                          [Kunde auswählen für automatische Befüllung]
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4 mt-6">
                    <p className="text-gray-500 text-sm italic">
                      Dies ist eine Vorschau der Dokumentvorlage. Der vollständige Inhalt wird beim Erstellen des Dokuments generiert.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-400">
                  <span>Seite 1 von 1</span>
                  <span>Erstellt mit Galeri Dokumentenpool</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-bg-tertiary text-foreground rounded-lg hover:bg-bg-tertiary/80"
              >
                Schließen
              </button>
              <button
                onClick={() => {
                  handleUseTemplate(selectedTemplate);
                  setShowPreviewModal(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-text rounded-lg hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Dokument erstellen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentPool;
