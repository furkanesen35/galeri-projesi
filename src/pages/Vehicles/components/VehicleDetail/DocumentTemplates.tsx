import { 
  FileText, Car, User, MapPin, Calendar, Euro, 
  Shield, Wrench, ClipboardCheck, FileSignature,
  Scale, Truck, HandshakeIcon, CreditCard
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface DocumentField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'select' | 'checkbox' | 'currency';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  section: string;
  defaultValue?: string;
  autoFill?: 'vehicle' | 'dealer' | 'date';
  width?: 'full' | 'half' | 'third';
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  category: 'verkauf' | 'ankauf' | 'service' | 'intern';
  fields: DocumentField[];
  sections: { id: string; title: string }[];
}

// Dealer info (would come from settings in real app)
export const dealerInfo = {
  name: 'Autohaus Mustermann GmbH',
  street: 'Hauptstraße 123',
  city: '12345 Musterstadt',
  phone: '+49 123 456789',
  email: 'info@autohaus-mustermann.de',
  taxId: 'DE123456789',
  bankName: 'Sparkasse Musterstadt',
  iban: 'DE89 3704 0044 0532 0130 00',
  bic: 'COBADEFFXXX',
};

// ============ ANKAUFVERTRAG (Purchase Contract) ============
const ankaufvertragFields: DocumentField[] = [
  // Verkäufer (Seller) - the person selling TO the dealership
  { id: 'seller_type', label: 'Verkäufertyp', type: 'select', section: 'seller', required: true, width: 'half',
    options: [
      { value: 'private', label: 'Privatperson' },
      { value: 'company', label: 'Unternehmen' },
    ]
  },
  { id: 'seller_name', label: 'Name / Firma', type: 'text', section: 'seller', required: true, placeholder: 'Max Mustermann', width: 'half' },
  { id: 'seller_street', label: 'Straße, Hausnummer', type: 'text', section: 'seller', required: true, placeholder: 'Musterstraße 1', width: 'half' },
  { id: 'seller_city', label: 'PLZ, Ort', type: 'text', section: 'seller', required: true, placeholder: '12345 Musterstadt', width: 'half' },
  { id: 'seller_phone', label: 'Telefon', type: 'text', section: 'seller', placeholder: '+49 123 456789', width: 'half' },
  { id: 'seller_email', label: 'E-Mail', type: 'text', section: 'seller', placeholder: 'max@example.de', width: 'half' },
  { id: 'seller_id_type', label: 'Ausweisart', type: 'select', section: 'seller', width: 'half',
    options: [
      { value: 'personalausweis', label: 'Personalausweis' },
      { value: 'reisepass', label: 'Reisepass' },
      { value: 'fuehrerschein', label: 'Führerschein' },
    ]
  },
  { id: 'seller_id_number', label: 'Ausweisnummer', type: 'text', section: 'seller', placeholder: 'L01234567', width: 'half' },

  // Fahrzeugdaten (Vehicle Data)
  { id: 'vehicle_brand', label: 'Marke', type: 'text', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_model', label: 'Modell', type: 'text', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_vin', label: 'Fahrgestellnummer (VIN)', type: 'text', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_plate', label: 'Kennzeichen', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_first_registration', label: 'Erstzulassung', type: 'date', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_mileage', label: 'Kilometerstand', type: 'number', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_color', label: 'Farbe', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_fuel', label: 'Kraftstoff', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_power', label: 'Leistung (kW/PS)', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_transmission', label: 'Getriebe', type: 'select', section: 'vehicle', width: 'half',
    options: [
      { value: 'manual', label: 'Schaltgetriebe' },
      { value: 'automatic', label: 'Automatik' },
    ]
  },
  { id: 'vehicle_hu', label: 'HU gültig bis', type: 'date', section: 'vehicle', width: 'half' },
  { id: 'vehicle_previous_owners', label: 'Anzahl Vorbesitzer', type: 'number', section: 'vehicle', width: 'half' },

  // Preis & Zahlung (Price & Payment)
  { id: 'purchase_price', label: 'Ankaufspreis (€)', type: 'currency', section: 'price', required: true, width: 'half' },
  { id: 'payment_method', label: 'Zahlungsart', type: 'select', section: 'price', required: true, width: 'half',
    options: [
      { value: 'bank_transfer', label: 'Überweisung' },
      { value: 'cash', label: 'Barzahlung' },
      { value: 'check', label: 'Scheck' },
    ]
  },
  { id: 'seller_iban', label: 'IBAN des Verkäufers', type: 'text', section: 'price', placeholder: 'DE89 3704 0044 0532 0130 00', width: 'full' },
  { id: 'payment_due_date', label: 'Zahlungsziel', type: 'date', section: 'price', width: 'half' },

  // Zustand & Zubehör (Condition & Accessories)
  { id: 'condition_description', label: 'Zustandsbeschreibung', type: 'textarea', section: 'condition', width: 'full' },
  { id: 'known_defects', label: 'Bekannte Mängel', type: 'textarea', section: 'condition', width: 'full' },
  { id: 'has_service_book', label: 'Serviceheft vorhanden', type: 'checkbox', section: 'condition', width: 'third' },
  { id: 'has_spare_key', label: 'Ersatzschlüssel vorhanden', type: 'checkbox', section: 'condition', width: 'third' },
  { id: 'has_warranty', label: 'Restgarantie vorhanden', type: 'checkbox', section: 'condition', width: 'third' },
  { id: 'accessories', label: 'Mitgeliefertes Zubehör', type: 'textarea', section: 'condition', placeholder: 'z.B. Winterreifen, Dachgepäckträger...', width: 'full' },

  // Rechtliches (Legal)
  { id: 'accident_free', label: 'Unfallfrei', type: 'checkbox', section: 'legal', width: 'third' },
  { id: 'no_liens', label: 'Frei von Rechten Dritter', type: 'checkbox', section: 'legal', width: 'third' },
  { id: 'owner_confirms', label: 'Verkäufer ist Eigentümer', type: 'checkbox', section: 'legal', required: true, width: 'third' },
  { id: 'notes', label: 'Sonstige Vereinbarungen', type: 'textarea', section: 'legal', width: 'full' },

  // Datum & Unterschrift
  { id: 'contract_date', label: 'Vertragsdatum', type: 'date', section: 'signature', required: true, autoFill: 'date', width: 'half' },
  { id: 'contract_location', label: 'Ort', type: 'text', section: 'signature', required: true, autoFill: 'dealer', width: 'half' },
];

// ============ VERKAUFSVERTRAG (Sales Contract) ============
const verkaufsvertragFields: DocumentField[] = [
  // Käufer (Buyer)
  { id: 'buyer_type', label: 'Käufertyp', type: 'select', section: 'buyer', required: true, width: 'half',
    options: [
      { value: 'private', label: 'Privatperson' },
      { value: 'company', label: 'Unternehmen' },
    ]
  },
  { id: 'buyer_name', label: 'Name / Firma', type: 'text', section: 'buyer', required: true, placeholder: 'Max Mustermann', width: 'half' },
  { id: 'buyer_street', label: 'Straße, Hausnummer', type: 'text', section: 'buyer', required: true, placeholder: 'Musterstraße 1', width: 'half' },
  { id: 'buyer_city', label: 'PLZ, Ort', type: 'text', section: 'buyer', required: true, placeholder: '12345 Musterstadt', width: 'half' },
  { id: 'buyer_phone', label: 'Telefon', type: 'text', section: 'buyer', placeholder: '+49 123 456789', width: 'half' },
  { id: 'buyer_email', label: 'E-Mail', type: 'text', section: 'buyer', placeholder: 'max@example.de', width: 'half' },
  { id: 'buyer_dob', label: 'Geburtsdatum', type: 'date', section: 'buyer', width: 'half' },
  { id: 'buyer_id_number', label: 'Ausweisnummer', type: 'text', section: 'buyer', placeholder: 'L01234567', width: 'half' },

  // Fahrzeugdaten
  { id: 'vehicle_brand', label: 'Marke', type: 'text', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_model', label: 'Modell', type: 'text', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_vin', label: 'Fahrgestellnummer (VIN)', type: 'text', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_plate', label: 'Kennzeichen', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_first_registration', label: 'Erstzulassung', type: 'date', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_mileage', label: 'Kilometerstand', type: 'number', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_color', label: 'Farbe', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_fuel', label: 'Kraftstoff', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_hu', label: 'HU gültig bis', type: 'date', section: 'vehicle', width: 'half' },
  { id: 'vehicle_brief_nr', label: 'Fahrzeugbrief-Nr.', type: 'text', section: 'vehicle', width: 'half' },

  // Preis & Zahlung
  { id: 'sale_price_net', label: 'Nettopreis (€)', type: 'currency', section: 'price', width: 'half' },
  { id: 'sale_price_vat', label: 'MwSt. (€)', type: 'currency', section: 'price', width: 'half' },
  { id: 'sale_price_gross', label: 'Bruttopreis (€)', type: 'currency', section: 'price', required: true, width: 'half' },
  { id: 'deposit', label: 'Anzahlung (€)', type: 'currency', section: 'price', width: 'half' },
  { id: 'trade_in_value', label: 'Inzahlungnahme (€)', type: 'currency', section: 'price', width: 'half' },
  { id: 'remaining_amount', label: 'Restbetrag (€)', type: 'currency', section: 'price', width: 'half' },
  { id: 'payment_method', label: 'Zahlungsart', type: 'select', section: 'price', required: true, width: 'half',
    options: [
      { value: 'bank_transfer', label: 'Überweisung' },
      { value: 'cash', label: 'Barzahlung' },
      { value: 'financing', label: 'Finanzierung' },
      { value: 'leasing', label: 'Leasing' },
    ]
  },
  { id: 'delivery_date', label: 'Liefertermin', type: 'date', section: 'price', width: 'half' },

  // Garantie & Gewährleistung
  { id: 'warranty_type', label: 'Gewährleistung', type: 'select', section: 'warranty', required: true, width: 'half',
    options: [
      { value: 'full', label: 'Volle Gewährleistung (12 Monate)' },
      { value: 'limited', label: 'Eingeschränkte Gewährleistung' },
      { value: 'excluded', label: 'Gewährleistung ausgeschlossen (nur Unternehmer)' },
    ]
  },
  { id: 'additional_warranty', label: 'Zusatzgarantie', type: 'select', section: 'warranty', width: 'half',
    options: [
      { value: 'none', label: 'Keine' },
      { value: '12_months', label: '12 Monate' },
      { value: '24_months', label: '24 Monate' },
      { value: '36_months', label: '36 Monate' },
    ]
  },

  // Sonstiges
  { id: 'included_accessories', label: 'Im Preis enthaltenes Zubehör', type: 'textarea', section: 'extras', width: 'full' },
  { id: 'special_agreements', label: 'Sondervereinbarungen', type: 'textarea', section: 'extras', width: 'full' },

  // Datum & Unterschrift
  { id: 'contract_date', label: 'Vertragsdatum', type: 'date', section: 'signature', required: true, autoFill: 'date', width: 'half' },
  { id: 'contract_location', label: 'Ort', type: 'text', section: 'signature', required: true, autoFill: 'dealer', width: 'half' },
];

// ============ ÜBERGABEPROTOKOLL (Handover Protocol) ============
const uebergabeprotokollFields: DocumentField[] = [
  // Allgemeine Daten
  { id: 'handover_date', label: 'Übergabedatum', type: 'date', section: 'general', required: true, autoFill: 'date', width: 'half' },
  { id: 'handover_time', label: 'Uhrzeit', type: 'text', section: 'general', placeholder: '10:00', width: 'half' },
  { id: 'customer_name', label: 'Kunde', type: 'text', section: 'general', required: true, width: 'half' },
  { id: 'employee_name', label: 'Übergabe durch', type: 'text', section: 'general', required: true, width: 'half' },

  // Fahrzeugdaten
  { id: 'vehicle_brand', label: 'Marke', type: 'text', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_model', label: 'Modell', type: 'text', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_vin', label: 'Fahrgestellnummer', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_plate', label: 'Kennzeichen', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_mileage', label: 'Kilometerstand bei Übergabe', type: 'number', section: 'vehicle', required: true, width: 'half' },
  { id: 'fuel_level', label: 'Tankfüllung (%)', type: 'number', section: 'vehicle', width: 'half' },

  // Übergebene Dokumente
  { id: 'doc_fahrzeugbrief', label: 'Fahrzeugbrief (ZB II)', type: 'checkbox', section: 'documents', width: 'third' },
  { id: 'doc_fahrzeugschein', label: 'Fahrzeugschein (ZB I)', type: 'checkbox', section: 'documents', width: 'third' },
  { id: 'doc_coc', label: 'COC-Papiere', type: 'checkbox', section: 'documents', width: 'third' },
  { id: 'doc_serviceheft', label: 'Serviceheft', type: 'checkbox', section: 'documents', width: 'third' },
  { id: 'doc_bedienungsanleitung', label: 'Bedienungsanleitung', type: 'checkbox', section: 'documents', width: 'third' },
  { id: 'doc_tuev', label: 'TÜV-Bericht', type: 'checkbox', section: 'documents', width: 'third' },
  { id: 'doc_garantie', label: 'Garantieunterlagen', type: 'checkbox', section: 'documents', width: 'third' },
  { id: 'doc_rechnung', label: 'Kaufrechnung', type: 'checkbox', section: 'documents', width: 'third' },
  { id: 'doc_other', label: 'Sonstige Dokumente', type: 'text', section: 'documents', width: 'full' },

  // Übergebenes Zubehör
  { id: 'keys_count', label: 'Anzahl Schlüssel', type: 'number', section: 'accessories', required: true, width: 'third' },
  { id: 'has_spare_wheel', label: 'Reserverad vorhanden', type: 'checkbox', section: 'accessories', width: 'third' },
  { id: 'has_warning_triangle', label: 'Warndreieck', type: 'checkbox', section: 'accessories', width: 'third' },
  { id: 'has_first_aid', label: 'Verbandskasten', type: 'checkbox', section: 'accessories', width: 'third' },
  { id: 'has_safety_vest', label: 'Warnweste', type: 'checkbox', section: 'accessories', width: 'third' },
  { id: 'has_floor_mats', label: 'Fußmatten', type: 'checkbox', section: 'accessories', width: 'third' },
  { id: 'additional_accessories', label: 'Weiteres Zubehör', type: 'textarea', section: 'accessories', width: 'full' },

  // Fahrzeugzustand
  { id: 'exterior_condition', label: 'Außenzustand', type: 'select', section: 'condition', width: 'half',
    options: [
      { value: 'excellent', label: 'Ausgezeichnet' },
      { value: 'good', label: 'Gut' },
      { value: 'fair', label: 'Befriedigend' },
      { value: 'poor', label: 'Mängel vorhanden' },
    ]
  },
  { id: 'interior_condition', label: 'Innenzustand', type: 'select', section: 'condition', width: 'half',
    options: [
      { value: 'excellent', label: 'Ausgezeichnet' },
      { value: 'good', label: 'Gut' },
      { value: 'fair', label: 'Befriedigend' },
      { value: 'poor', label: 'Mängel vorhanden' },
    ]
  },
  { id: 'noted_damages', label: 'Dokumentierte Mängel/Schäden', type: 'textarea', section: 'condition', width: 'full' },

  // Einweisung
  { id: 'intro_controls', label: 'Bedienung erklärt', type: 'checkbox', section: 'introduction', width: 'third' },
  { id: 'intro_infotainment', label: 'Infotainment erklärt', type: 'checkbox', section: 'introduction', width: 'third' },
  { id: 'intro_safety', label: 'Sicherheitssysteme erklärt', type: 'checkbox', section: 'introduction', width: 'third' },
  { id: 'intro_notes', label: 'Anmerkungen zur Einweisung', type: 'textarea', section: 'introduction', width: 'full' },

  // Bestätigung
  { id: 'customer_satisfied', label: 'Kunde bestätigt ordnungsgemäße Übergabe', type: 'checkbox', section: 'confirmation', required: true, width: 'full' },
  { id: 'remarks', label: 'Bemerkungen', type: 'textarea', section: 'confirmation', width: 'full' },
];

// ============ PROBEFAHRT (Test Drive) ============
const probefahrtFields: DocumentField[] = [
  // Fahrer
  { id: 'driver_name', label: 'Name des Fahrers', type: 'text', section: 'driver', required: true, width: 'half' },
  { id: 'driver_street', label: 'Straße, Hausnummer', type: 'text', section: 'driver', required: true, width: 'half' },
  { id: 'driver_city', label: 'PLZ, Ort', type: 'text', section: 'driver', required: true, width: 'half' },
  { id: 'driver_phone', label: 'Telefon', type: 'text', section: 'driver', required: true, width: 'half' },
  { id: 'license_number', label: 'Führerscheinnummer', type: 'text', section: 'driver', required: true, width: 'half' },
  { id: 'license_class', label: 'Führerscheinklasse', type: 'text', section: 'driver', placeholder: 'B', width: 'half' },
  { id: 'license_issued', label: 'Ausstellungsdatum', type: 'date', section: 'driver', width: 'half' },
  { id: 'license_authority', label: 'Ausstellungsbehörde', type: 'text', section: 'driver', width: 'half' },

  // Fahrzeugdaten
  { id: 'vehicle_brand', label: 'Marke', type: 'text', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_model', label: 'Modell', type: 'text', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_plate', label: 'Kennzeichen', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_vin', label: 'Fahrgestellnummer', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },

  // Probefahrt Details
  { id: 'test_date', label: 'Datum', type: 'date', section: 'details', required: true, autoFill: 'date', width: 'half' },
  { id: 'start_time', label: 'Startzeit', type: 'text', section: 'details', required: true, placeholder: '10:00', width: 'half' },
  { id: 'end_time', label: 'Geplante Rückgabe', type: 'text', section: 'details', required: true, placeholder: '11:00', width: 'half' },
  { id: 'start_km', label: 'Kilometerstand Start', type: 'number', section: 'details', required: true, width: 'half' },
  { id: 'planned_route', label: 'Geplante Route', type: 'textarea', section: 'details', width: 'full' },
  { id: 'accompanied', label: 'Begleitung durch Mitarbeiter', type: 'checkbox', section: 'details', width: 'half' },
  { id: 'employee_name', label: 'Name des Mitarbeiters', type: 'text', section: 'details', width: 'half' },

  // Versicherung & Haftung
  { id: 'insurance_note', label: 'Versicherungshinweis bestätigt', type: 'checkbox', section: 'insurance', required: true, width: 'full' },
  { id: 'deductible', label: 'Selbstbeteiligung im Schadensfall (€)', type: 'currency', section: 'insurance', defaultValue: '500', width: 'half' },
  { id: 'terms_accepted', label: 'Bedingungen akzeptiert', type: 'checkbox', section: 'insurance', required: true, width: 'half' },
];

// ============ DATENSCHUTZERKLÄRUNG (Privacy Consent) ============
const datenschutzFields: DocumentField[] = [
  { id: 'customer_name', label: 'Name', type: 'text', section: 'customer', required: true, width: 'half' },
  { id: 'customer_email', label: 'E-Mail', type: 'text', section: 'customer', width: 'half' },
  { id: 'customer_phone', label: 'Telefon', type: 'text', section: 'customer', width: 'half' },
  { id: 'consent_date', label: 'Datum', type: 'date', section: 'customer', required: true, autoFill: 'date', width: 'half' },
  
  { id: 'consent_contact_phone', label: 'Telefonische Kontaktaufnahme erlaubt', type: 'checkbox', section: 'consent', width: 'half' },
  { id: 'consent_contact_email', label: 'Kontakt per E-Mail erlaubt', type: 'checkbox', section: 'consent', width: 'half' },
  { id: 'consent_newsletter', label: 'Newsletter-Zusendung erlaubt', type: 'checkbox', section: 'consent', width: 'half' },
  { id: 'consent_offers', label: 'Zusendung von Angeboten erlaubt', type: 'checkbox', section: 'consent', width: 'half' },
  { id: 'consent_data_storage', label: 'Datenspeicherung gemäß DSGVO bestätigt', type: 'checkbox', section: 'consent', required: true, width: 'full' },
];

// ============ WERKSTATTAUFTRAG (Workshop Order) ============
const werkstattauftragFields: DocumentField[] = [
  // Auftraggeber
  { id: 'customer_name', label: 'Kunde', type: 'text', section: 'customer', required: true, width: 'half' },
  { id: 'customer_phone', label: 'Telefon', type: 'text', section: 'customer', required: true, width: 'half' },
  { id: 'customer_email', label: 'E-Mail', type: 'text', section: 'customer', width: 'half' },
  { id: 'customer_street', label: 'Adresse', type: 'text', section: 'customer', width: 'half' },

  // Fahrzeugdaten
  { id: 'vehicle_brand', label: 'Marke', type: 'text', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_model', label: 'Modell', type: 'text', section: 'vehicle', required: true, autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_plate', label: 'Kennzeichen', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_vin', label: 'Fahrgestellnummer', type: 'text', section: 'vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'vehicle_mileage', label: 'Kilometerstand', type: 'number', section: 'vehicle', required: true, width: 'half' },

  // Auftragsdetails
  { id: 'order_date', label: 'Auftragsdatum', type: 'date', section: 'order', required: true, autoFill: 'date', width: 'half' },
  { id: 'delivery_date', label: 'Abgabedatum', type: 'date', section: 'order', width: 'half' },
  { id: 'pickup_date', label: 'Geplante Abholung', type: 'date', section: 'order', width: 'half' },
  { id: 'order_type', label: 'Auftragsart', type: 'select', section: 'order', required: true, width: 'half',
    options: [
      { value: 'inspection', label: 'Inspektion' },
      { value: 'repair', label: 'Reparatur' },
      { value: 'tuev', label: 'HU/AU' },
      { value: 'tire', label: 'Reifenwechsel' },
      { value: 'other', label: 'Sonstiges' },
    ]
  },
  { id: 'work_description', label: 'Arbeitsbeschreibung', type: 'textarea', section: 'order', required: true, width: 'full' },
  { id: 'customer_notes', label: 'Kundenbemerkungen', type: 'textarea', section: 'order', width: 'full' },

  // Kostenvoranschlag
  { id: 'estimate_required', label: 'Kostenvoranschlag gewünscht', type: 'checkbox', section: 'estimate', width: 'half' },
  { id: 'estimate_limit', label: 'Kostenlimit (€)', type: 'currency', section: 'estimate', width: 'half' },
  { id: 'additional_work_approval', label: 'Zusatzarbeiten bis (€) ohne Rücksprache', type: 'currency', section: 'estimate', width: 'half' },
  { id: 'call_before_work', label: 'Vor Arbeitsbeginn anrufen', type: 'checkbox', section: 'estimate', width: 'half' },

  // Bestätigung
  { id: 'terms_accepted', label: 'AGB akzeptiert', type: 'checkbox', section: 'confirmation', required: true, width: 'full' },
];

// ============ INZAHLUNGNAHME (Trade-In) ============
const inzahlungnahmeFields: DocumentField[] = [
  // Kunde
  { id: 'customer_name', label: 'Name', type: 'text', section: 'customer', required: true, width: 'half' },
  { id: 'customer_phone', label: 'Telefon', type: 'text', section: 'customer', required: true, width: 'half' },

  // Inzahlungnahme-Fahrzeug
  { id: 'trade_brand', label: 'Marke', type: 'text', section: 'trade_vehicle', required: true, width: 'half' },
  { id: 'trade_model', label: 'Modell', type: 'text', section: 'trade_vehicle', required: true, width: 'half' },
  { id: 'trade_vin', label: 'Fahrgestellnummer', type: 'text', section: 'trade_vehicle', required: true, width: 'half' },
  { id: 'trade_plate', label: 'Kennzeichen', type: 'text', section: 'trade_vehicle', width: 'half' },
  { id: 'trade_first_reg', label: 'Erstzulassung', type: 'date', section: 'trade_vehicle', required: true, width: 'half' },
  { id: 'trade_mileage', label: 'Kilometerstand', type: 'number', section: 'trade_vehicle', required: true, width: 'half' },
  { id: 'trade_color', label: 'Farbe', type: 'text', section: 'trade_vehicle', width: 'half' },
  { id: 'trade_fuel', label: 'Kraftstoff', type: 'text', section: 'trade_vehicle', width: 'half' },

  // Bewertung
  { id: 'trade_value', label: 'Ankaufswert (€)', type: 'currency', section: 'valuation', required: true, width: 'half' },
  { id: 'condition_grade', label: 'Zustandsnote', type: 'select', section: 'valuation', width: 'half',
    options: [
      { value: '1', label: '1 - Sehr gut' },
      { value: '2', label: '2 - Gut' },
      { value: '3', label: '3 - Befriedigend' },
      { value: '4', label: '4 - Ausreichend' },
      { value: '5', label: '5 - Mangelhaft' },
    ]
  },
  { id: 'known_defects', label: 'Bekannte Mängel', type: 'textarea', section: 'valuation', width: 'full' },
  { id: 'valuation_notes', label: 'Bewertungsnotizen', type: 'textarea', section: 'valuation', width: 'full' },

  // Neufahrzeug
  { id: 'new_vehicle_brand', label: 'Marke', type: 'text', section: 'new_vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'new_vehicle_model', label: 'Modell', type: 'text', section: 'new_vehicle', autoFill: 'vehicle', width: 'half' },
  { id: 'new_vehicle_price', label: 'Kaufpreis (€)', type: 'currency', section: 'new_vehicle', width: 'half' },
  { id: 'difference', label: 'Differenzbetrag (€)', type: 'currency', section: 'new_vehicle', width: 'half' },

  // Datum
  { id: 'valuation_date', label: 'Bewertungsdatum', type: 'date', section: 'signature', required: true, autoFill: 'date', width: 'half' },
  { id: 'valid_until', label: 'Angebot gültig bis', type: 'date', section: 'signature', width: 'half' },
];

// ============ DOCUMENT TEMPLATES EXPORT ============
export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'ankaufvertrag',
    name: 'Ankaufvertrag',
    description: 'Vertrag für den Ankauf eines Fahrzeugs von Privat oder Händler',
    icon: FileSignature,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    category: 'ankauf',
    fields: ankaufvertragFields,
    sections: [
      { id: 'seller', title: 'Verkäufer' },
      { id: 'vehicle', title: 'Fahrzeugdaten' },
      { id: 'price', title: 'Preis & Zahlung' },
      { id: 'condition', title: 'Zustand & Zubehör' },
      { id: 'legal', title: 'Rechtliche Angaben' },
      { id: 'signature', title: 'Datum & Unterschrift' },
    ],
  },
  {
    id: 'verkaufsvertrag',
    name: 'Verkaufsvertrag',
    description: 'Kaufvertrag für den Verkauf eines Fahrzeugs an Kunden',
    icon: HandshakeIcon,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    category: 'verkauf',
    fields: verkaufsvertragFields,
    sections: [
      { id: 'buyer', title: 'Käufer' },
      { id: 'vehicle', title: 'Fahrzeugdaten' },
      { id: 'price', title: 'Preis & Zahlung' },
      { id: 'warranty', title: 'Garantie & Gewährleistung' },
      { id: 'extras', title: 'Zubehör & Sondervereinbarungen' },
      { id: 'signature', title: 'Datum & Unterschrift' },
    ],
  },
  {
    id: 'uebergabeprotokoll',
    name: 'Übergabeprotokoll',
    description: 'Dokumentation der Fahrzeugübergabe mit Zustandserfassung',
    icon: ClipboardCheck,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    category: 'verkauf',
    fields: uebergabeprotokollFields,
    sections: [
      { id: 'general', title: 'Allgemeine Daten' },
      { id: 'vehicle', title: 'Fahrzeugdaten' },
      { id: 'documents', title: 'Übergebene Dokumente' },
      { id: 'accessories', title: 'Zubehör' },
      { id: 'condition', title: 'Fahrzeugzustand' },
      { id: 'introduction', title: 'Fahrzeugeinweisung' },
      { id: 'confirmation', title: 'Bestätigung' },
    ],
  },
  {
    id: 'probefahrt',
    name: 'Probefahrtvereinbarung',
    description: 'Vereinbarung und Haftungserklärung für Probefahrten',
    icon: Car,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    category: 'verkauf',
    fields: probefahrtFields,
    sections: [
      { id: 'driver', title: 'Fahrer' },
      { id: 'vehicle', title: 'Fahrzeugdaten' },
      { id: 'details', title: 'Probefahrt Details' },
      { id: 'insurance', title: 'Versicherung & Haftung' },
    ],
  },
  {
    id: 'werkstattauftrag',
    name: 'Werkstattauftrag',
    description: 'Auftrag für Reparaturen, Inspektionen und Wartungsarbeiten',
    icon: Wrench,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    category: 'service',
    fields: werkstattauftragFields,
    sections: [
      { id: 'customer', title: 'Auftraggeber' },
      { id: 'vehicle', title: 'Fahrzeugdaten' },
      { id: 'order', title: 'Auftragsdetails' },
      { id: 'estimate', title: 'Kostenvoranschlag' },
      { id: 'confirmation', title: 'Bestätigung' },
    ],
  },
  {
    id: 'inzahlungnahme',
    name: 'Inzahlungnahme-Bewertung',
    description: 'Bewertung eines Fahrzeugs für die Inzahlungnahme',
    icon: Scale,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    category: 'ankauf',
    fields: inzahlungnahmeFields,
    sections: [
      { id: 'customer', title: 'Kunde' },
      { id: 'trade_vehicle', title: 'Inzahlungnahme-Fahrzeug' },
      { id: 'valuation', title: 'Bewertung' },
      { id: 'new_vehicle', title: 'Neufahrzeug' },
      { id: 'signature', title: 'Abschluss' },
    ],
  },
  {
    id: 'datenschutz',
    name: 'Datenschutzerklärung',
    description: 'DSGVO-konforme Einwilligungserklärung des Kunden',
    icon: Shield,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    category: 'intern',
    fields: datenschutzFields,
    sections: [
      { id: 'customer', title: 'Kundendaten' },
      { id: 'consent', title: 'Einwilligung' },
    ],
  },
];

export const getTemplateById = (id: string): DocumentTemplate | undefined => {
  return documentTemplates.find(t => t.id === id);
};
