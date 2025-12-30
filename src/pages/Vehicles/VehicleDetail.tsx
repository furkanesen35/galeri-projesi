import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Car,
  Settings,
  FileText,
  Calculator,
  Camera,
  History,
  LayoutDashboard,
  ClipboardCheck,
} from 'lucide-react';
import { vehicleFixtures } from '../../services/vehicleFixtures';
import { VehiclePriceTabNew } from './components/VehicleDetail/VehiclePriceTabNew';
import { VehicleDocumentsTab } from './components/VehicleDetail/VehicleDocumentsTab';
import { VehicleHistoryTab } from './components/VehicleDetail/VehicleHistoryTab';
import { VehiclePhotosTab } from './components/VehicleDetail/VehiclePhotosTab';
import { VehicleSettingsTab } from './components/VehicleDetail/VehicleSettingsTab';
import { VehicleOverviewTab } from './components/VehicleDetail/VehicleOverviewTab';
import { SalesWizard } from './components/VehicleDetail/SalesWizard';
import { PurchaseChecklist } from './components/VehicleDetail/PurchaseChecklist';

const statusConfig = {
  available: { label: 'Verfügbar', color: 'text-green-600' },
  reserved: { label: 'Reserviert', color: 'text-amber-600' },
  sold: { label: 'Verkauft', color: 'text-blue-600' },
  service: { label: 'Service', color: 'text-purple-600' },
  archived: { label: 'Archiviert', color: 'text-slate-600' },
};

export const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'checklist' | 'price' | 'documents' | 'history' | 'photos' | 'settings'
  >('overview');
  const [showSalesWizard, setShowSalesWizard] = useState(false);

  const handleActionClick = (action: string) => {
    // Handle action
    if (action === 'sell') {
      setShowSalesWizard(true);
    }
    // Other actions will be implemented later
  };

  const tabs = [
    { id: 'overview' as const, label: 'Übersicht', icon: LayoutDashboard },
    { id: 'checklist' as const, label: 'Checkliste', icon: ClipboardCheck },
    { id: 'price' as const, label: 'Preiskalkulation', icon: Calculator },
    { id: 'documents' as const, label: 'Dokumente', icon: FileText },
    { id: 'history' as const, label: 'Historie', icon: History },
    { id: 'photos' as const, label: 'Fotos', icon: Camera },
    { id: 'settings' as const, label: 'Einstellungen', icon: Settings },
  ];

  const vehicle = vehicleFixtures.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Car className="h-16 w-16 text-text-secondary mb-4" />
        <h2 className="text-xl font-semibold text-foreground">Fahrzeug nicht gefunden</h2>
        <p className="text-text-secondary mt-2">Das angeforderte Fahrzeug existiert nicht.</p>
        <button
          onClick={() => navigate('/vehicles')}
          className="mt-4 flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Fahrzeugübersicht
        </button>
      </div>
    );
  }

  const status = statusConfig[vehicle.status];

  return (
    <div className="pb-12">
      {/* HEADER - Back Link */}
      <button
        onClick={() => navigate('/vehicles')}
        className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group mb-4"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium uppercase tracking-wide">
          Zurück zur Fahrzeugsuche
        </span>
      </button>

      {/* TAB NAVIGATION */}
      <div className="border-b border-border mb-6">
        {/* Vehicle Info Bar - Always Visible */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Car className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {vehicle.brand} {vehicle.model}
                </h2>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="px-2 py-0.5 text-sm font-mono font-bold bg-white text-black border-2 border-black rounded shadow-sm">
                    {vehicle.plate}
                  </span>
                  <span className="text-sm text-text-secondary">•</span>
                  <span className="text-sm text-text-secondary">
                    {vehicle.year} · {vehicle.mileageKm.toLocaleString('de-DE')} km
                  </span>
                  <span className="text-sm text-text-secondary">•</span>
                  <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-secondary">Preis</p>
            <p className="text-xl font-bold text-primary">
              {vehicle.price.toLocaleString('de-DE')} €
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'overview' && (
        <VehicleOverviewTab vehicle={vehicle} onActionClick={handleActionClick} />
      )}

      {/* CHECKLIST TAB */}
      {activeTab === 'checklist' && (
        <div className="mt-6">
          <PurchaseChecklist vehicle={vehicle} />
        </div>
      )}

      {/* PRICE CALCULATION TAB */}

      {/* SALES WIZARD MODAL */}
      {showSalesWizard && (
        <SalesWizard
          vehicle={vehicle}
          onClose={() => setShowSalesWizard(false)}
          onComplete={() => {
            setShowSalesWizard(false);
            // Show success message and potentially update vehicle status
            alert('Fahrzeug erfolgreich verkauft! Der Kaufvertrag wurde erstellt.');
            // In a real app, you would update the vehicle status here
            navigate('/vehicles');
          }}
        />
      )}
      {activeTab === 'price' && <VehiclePriceTabNew vehicle={vehicle} />}

      {/* DOCUMENTS TAB */}
      {activeTab === 'documents' && <VehicleDocumentsTab vehicle={vehicle} />}

      {/* HISTORY TAB */}
      {activeTab === 'history' && <VehicleHistoryTab vehicle={vehicle} />}

      {/* PHOTOS TAB */}
      {activeTab === 'photos' && <VehiclePhotosTab vehicle={vehicle} />}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && <VehicleSettingsTab vehicle={vehicle} />}
    </div>
  );
};

/* ============================================= */
/* HELPER COMPONENTS */
/* ============================================= */
