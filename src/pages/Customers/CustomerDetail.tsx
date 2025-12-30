import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Building2,
  Store,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Car,
  FileText,
  History,
  Edit,
  Trash2,
  MoreHorizontal,
  Tag,
  Globe,
  CreditCard,
  Shield,
  MessageSquare,
  Clock,
  ChevronRight,
  Plus,
  Download,
  Send,
  ShoppingCart,
  Wrench,
  Eye,
  FileCheck,
  PhoneCall,
  Mail as MailIcon,
  Users as UsersIcon,
  Notebook,
} from 'lucide-react';
import { customerFixtures, getCustomerById } from '../../services/customerFixtures';
import { vehicleFixtures } from '../../services/vehicleFixtures';
import { Customer, CustomerType, CustomerStatus, CustomerActivity } from '../../types/domain';

const typeConfig: Record<CustomerType, { label: string; icon: React.ElementType; color: string; bgColor: string }> = {
  private: { label: 'Privatkunde', icon: User, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  business: { label: 'Geschäftskunde', icon: Building2, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  dealer: { label: 'Händler', icon: Store, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
};

const statusConfig: Record<CustomerStatus, { label: string; color: string; bgColor: string }> = {
  active: { label: 'Aktiv', color: 'text-green-500', bgColor: 'bg-green-500/10' },
  inactive: { label: 'Inaktiv', color: 'text-gray-500', bgColor: 'bg-gray-500/10' },
  lead: { label: 'Lead', color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  blocked: { label: 'Gesperrt', color: 'text-red-500', bgColor: 'bg-red-500/10' },
};

const activityTypeConfig: Record<CustomerActivity['type'], { icon: React.ElementType; color: string; bgColor: string }> = {
  vehicle_purchase: { icon: ShoppingCart, color: 'text-green-500', bgColor: 'bg-green-500/10' },
  vehicle_sale: { icon: Tag, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  inquiry: { icon: MessageSquare, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  service: { icon: Wrench, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  document: { icon: FileText, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  call: { icon: PhoneCall, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
  email: { icon: MailIcon, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10' },
  visit: { icon: UsersIcon, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
  note: { icon: Notebook, color: 'text-gray-500', bgColor: 'bg-gray-500/10' },
};

type Tab = 'overview' | 'vehicles' | 'documents' | 'history';

export const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const customer = getCustomerById(id || '');

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <User className="h-16 w-16 text-text-secondary mb-4" />
        <h2 className="text-xl font-semibold text-foreground">Kunde nicht gefunden</h2>
        <p className="text-text-secondary mt-2">Der angeforderte Kunde existiert nicht.</p>
        <button
          onClick={() => navigate('/customers')}
          className="mt-4 px-4 py-2 bg-primary text-primary-text rounded-lg"
        >
          Zurück zur Übersicht
        </button>
      </div>
    );
  }

  const type = typeConfig[customer.type];
  const status = statusConfig[customer.status];
  const TypeIcon = type.icon;

  // Get linked vehicles
  const linkedVehicles = vehicleFixtures.filter(v => customer.vehicleIds.includes(v.id));

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Übersicht', icon: User },
    { id: 'vehicles', label: `Fahrzeuge (${linkedVehicles.length})`, icon: Car },
    { id: 'documents', label: 'Dokumente', icon: FileText },
    { id: 'history', label: 'Historie', icon: History },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/customers')}
        className="flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zur Kundenübersicht
      </button>

      {/* Header Card */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-full ${type.bgColor} flex items-center justify-center`}>
              <TypeIcon className={`h-8 w-8 ${type.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-foreground">
                  {customer.companyName || `${customer.salutation} ${customer.firstName} ${customer.lastName}`}
                </h1>
                <span className={`text-xs px-2 py-1 rounded-full ${status.bgColor} ${status.color}`}>
                  {status.label}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${type.bgColor} ${type.color}`}>
                  {type.label}
                </span>
              </div>
              {customer.companyName && (
                <p className="text-text-secondary">
                  {customer.salutation} {customer.firstName} {customer.lastName}
                </p>
              )}
              <p className="text-sm text-text-secondary mt-1">
                Kunde seit {new Date(customer.createdAt).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
                {' '} • Kunden-Nr: {customer.customerId}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-text rounded-lg hover:opacity-90">
              <Edit className="h-4 w-4" />
              Bearbeiten
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-lg hover:bg-bg-tertiary">
              <Send className="h-4 w-4" />
              E-Mail
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-lg hover:bg-bg-tertiary">
              <Phone className="h-4 w-4" />
              Anrufen
            </button>
            <button className="p-2 bg-bg-secondary border border-border rounded-lg hover:bg-bg-tertiary">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="flex flex-wrap gap-6 mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-text-secondary" />
            <a href={`mailto:${customer.email}`} className="text-primary hover:underline">{customer.email}</a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-text-secondary" />
            <a href={`tel:${customer.phone}`} className="text-foreground hover:text-primary">{customer.phone}</a>
          </div>
          {customer.mobile && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-text-secondary" />
              <a href={`tel:${customer.mobile}`} className="text-foreground hover:text-primary">{customer.mobile}</a>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-text-secondary" />
            <span className="text-foreground">
              {customer.address.street} {customer.address.houseNumber}, {customer.address.postalCode} {customer.address.city}
            </span>
          </div>
          {customer.website && (
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-text-secondary" />
              <a href={`https://${customer.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {customer.website}
              </a>
            </div>
          )}
        </div>

        {/* Tags */}
        {customer.tags && customer.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {customer.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Details */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Kontaktdaten
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Anrede" value={customer.salutation || '-'} />
                <InfoRow label="Vorname" value={customer.firstName} />
                <InfoRow label="Nachname" value={customer.lastName} />
                {customer.companyName && <InfoRow label="Firma" value={customer.companyName} />}
                <InfoRow label="E-Mail" value={customer.email} isLink />
                <InfoRow label="Telefon" value={customer.phone} />
                {customer.mobile && <InfoRow label="Mobil" value={customer.mobile} />}
                {customer.fax && <InfoRow label="Fax" value={customer.fax} />}
                {customer.dateOfBirth && (
                  <InfoRow label="Geburtsdatum" value={new Date(customer.dateOfBirth).toLocaleDateString('de-DE')} />
                )}
              </div>
            </div>

            {/* Address */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Adresse
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Straße" value={`${customer.address.street} ${customer.address.houseNumber}`} />
                <InfoRow label="PLZ" value={customer.address.postalCode} />
                <InfoRow label="Stadt" value={customer.address.city} />
                <InfoRow label="Land" value={customer.address.country} />
              </div>
            </div>

            {/* Business Info (if applicable) */}
            {customer.type !== 'private' && (
              <div className="bg-surface border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Geschäftsdaten
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {customer.taxId && <InfoRow label="USt-IdNr" value={customer.taxId} />}
                  {customer.commercialRegister && <InfoRow label="Handelsregister" value={customer.commercialRegister} />}
                  {customer.creditLimit && <InfoRow label="Kreditlimit" value={`€${customer.creditLimit.toLocaleString()}`} />}
                  {customer.paymentTermDays && <InfoRow label="Zahlungsziel" value={`${customer.paymentTermDays} Tage`} />}
                </div>
              </div>
            )}

            {/* Banking */}
            {(customer.iban || customer.bankName) && (
              <div className="bg-surface border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Bankverbindung
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {customer.bankName && <InfoRow label="Bank" value={customer.bankName} />}
                  {customer.iban && <InfoRow label="IBAN" value={customer.iban} />}
                  {customer.bic && <InfoRow label="BIC" value={customer.bic} />}
                </div>
              </div>
            )}

            {/* Notes */}
            {customer.notes && (
              <div className="bg-surface border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Notebook className="h-5 w-5 text-primary" />
                  Notizen
                </h3>
                <p className="text-text-secondary whitespace-pre-wrap">{customer.notes}</p>
              </div>
            )}
          </div>

          {/* Right Column - Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Schnellaktionen</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors text-left">
                  <Car className="h-5 w-5 text-primary" />
                  <span>Fahrzeug zuordnen</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors text-left">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Dokument erstellen</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors text-left">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Termin planen</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors text-left">
                  <Notebook className="h-5 w-5 text-primary" />
                  <span>Notiz hinzufügen</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Letzte Aktivitäten</h3>
              <div className="space-y-4">
                {customer.activities.slice(-5).reverse().map(activity => {
                  const config = activityTypeConfig[activity.type];
                  const Icon = config.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-4 w-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-text-secondary">{new Date(activity.date).toLocaleDateString('de-DE')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => setActiveTab('history')}
                className="w-full mt-4 text-center text-sm text-primary hover:underline"
              >
                Alle Aktivitäten anzeigen
              </button>
            </div>

            {/* Preferences */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Präferenzen
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Bevorzugter Kontakt</span>
                  <span className="text-sm text-foreground capitalize">
                    {customer.preferredContactMethod === 'email' ? 'E-Mail' : 
                     customer.preferredContactMethod === 'phone' ? 'Telefon' : 'Post'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Newsletter</span>
                  <span className={`text-sm ${customer.newsletter ? 'text-green-500' : 'text-text-secondary'}`}>
                    {customer.newsletter ? 'Ja' : 'Nein'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Marketing</span>
                  <span className={`text-sm ${customer.marketingConsent ? 'text-green-500' : 'text-text-secondary'}`}>
                    {customer.marketingConsent ? 'Erlaubt' : 'Nicht erlaubt'}
                  </span>
                </div>
                {customer.source && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Quelle</span>
                    <span className="text-sm text-foreground">{customer.source}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'vehicles' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Zugeordnete Fahrzeuge</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-text rounded-lg hover:opacity-90">
              <Plus className="h-4 w-4" />
              Fahrzeug zuordnen
            </button>
          </div>

          {linkedVehicles.length === 0 ? (
            <div className="bg-surface border border-border rounded-xl p-12 text-center">
              <Car className="h-12 w-12 text-text-secondary mx-auto mb-3" />
              <h3 className="text-lg font-medium text-foreground mb-1">Keine Fahrzeuge zugeordnet</h3>
              <p className="text-text-secondary text-sm mb-4">
                Diesem Kunden sind noch keine Fahrzeuge zugeordnet.
              </p>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-text rounded-lg hover:opacity-90 mx-auto">
                <Plus className="h-4 w-4" />
                Erstes Fahrzeug zuordnen
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {linkedVehicles.map(vehicle => (
                <div
                  key={vehicle.id}
                  onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                  className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 cursor-pointer transition-all group"
                >
                  <div className="aspect-video bg-bg-secondary relative overflow-hidden">
                    {vehicle.images && vehicle.images.length > 0 ? (
                      <img
                        src={vehicle.images[0]}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Car className="h-12 w-12 text-text-secondary" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground">{vehicle.brand} {vehicle.model}</h4>
                    <p className="text-sm text-text-secondary">{vehicle.variant}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <span className="text-sm text-text-secondary">{vehicle.plate}</span>
                      <span className="text-sm font-medium text-primary">€{vehicle.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-surface border border-border rounded-xl p-12 text-center">
          <FileText className="h-12 w-12 text-text-secondary mx-auto mb-3" />
          <h3 className="text-lg font-medium text-foreground mb-1">Dokumentenverwaltung</h3>
          <p className="text-text-secondary text-sm mb-4">
            Hier werden alle Dokumente dieses Kunden angezeigt (Verträge, Rechnungen, etc.)
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-text rounded-lg hover:opacity-90 mx-auto">
            <Plus className="h-4 w-4" />
            Dokument erstellen
          </button>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Vollständige Historie</h3>
          <div className="space-y-4">
            {[...customer.activities].reverse().map((activity, index) => {
              const config = activityTypeConfig[activity.type];
              const Icon = config.icon;
              return (
                <div key={activity.id} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    {index < customer.activities.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border mt-2" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{activity.title}</h4>
                        <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                      </div>
                      <span className="text-sm text-text-secondary whitespace-nowrap">
                        {new Date(activity.date).toLocaleDateString('de-DE', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    {activity.vehicleId && (
                      <button
                        onClick={() => navigate(`/vehicles/${activity.vehicleId}`)}
                        className="mt-2 text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <Car className="h-3 w-3" />
                        Fahrzeug anzeigen
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const InfoRow = ({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) => (
  <div>
    <p className="text-xs text-text-secondary">{label}</p>
    {isLink ? (
      <a href={`mailto:${value}`} className="text-sm text-primary hover:underline">{value}</a>
    ) : (
      <p className="text-sm text-foreground">{value}</p>
    )}
  </div>
);

export default CustomerDetail;
