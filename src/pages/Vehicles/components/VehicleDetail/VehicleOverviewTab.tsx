import { Vehicle, VehicleFeature } from '../../../../types/domain';
import { featureIconMap } from '../../../../config/featureIcons';
import {
  Car,
  Fuel,
  Gauge,
  Calendar,
  Settings2,
  Hash,
  Palette,
  DoorOpen,
  Users,
  Zap,
  Leaf,
  Info,
  Eye,
  Tag,
  ShoppingCart,
  Wrench,
  FileCheck,
  Edit,
  Share2,
  Archive,
  RotateCcw,
  MessageSquare,
} from 'lucide-react';
import {
  DraggablePanel,
  DraggablePanelContainer,
  HiddenPanelsBar,
} from '../../../../components/DraggablePanel';
import { PanelCustomizer } from '../../../../components/PanelCustomizer';
import { usePanelLayout } from '../../../../hooks/usePanelLayout';
import { usePanelLayoutStore } from '../../../../store/usePanelLayoutStore';
import { VehicleComments } from './VehicleComments';

interface Props {
  vehicle: Vehicle;
  onActionClick?: (action: string) => void;
}

const VIEW_ID = 'vehicle-detail-overview' as const;

const conditionConfig = {
  neufahrzeug: { label: 'Neufahrzeug' },
  tageszulassung: { label: 'Neufahrzeug mit Tageszulassung' },
  jahreswagen: { label: 'Jahreswagen' },
  gebraucht: { label: 'Gebrauchtwagen' },
  vorführwagen: { label: 'Vorführwagen' },
};

const categoryConfig = {
  limousine: 'Limousine',
  kombi: 'Kombi',
  suv: 'SUV/Geländewagen/Pickup',
  cabrio: 'Cabrio/Roadster',
  coupe: 'Coupe',
  kleinwagen: 'Kleinwagen',
  van: 'Van/Kleinbus',
  sportwagen: 'Sportwagen',
};

export const VehicleOverviewTab = ({ vehicle, onActionClick }: Props) => {
  const condition = conditionConfig[vehicle.condition] || { label: 'Gebrauchtwagen' };
  const category = categoryConfig[vehicle.category] || 'Sonstiges';
  const { panels, checkVisibility } = usePanelLayout(VIEW_ID);
  const { resetLayout } = usePanelLayoutStore();

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Panel Customizer and Reset */}
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => resetLayout(VIEW_ID)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-foreground hover:border-primary hover:bg-bg-secondary transition-all"
              title="Layout zurücksetzen"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="text-sm font-medium">Zurücksetzen</span>
            </button>
            <PanelCustomizer viewId={VIEW_ID} />
          </div>

          {/* Hidden Panels Bar */}
          <HiddenPanelsBar viewId={VIEW_ID} showResetButton={false} />

          <DraggablePanelContainer viewId={VIEW_ID}>
            {/* Vehicle Details Panel */}
            <DraggablePanel
              id="vehicle-data"
              viewId={VIEW_ID}
              title="Fahrzeugdaten"
              icon={<Car className="h-5 w-5 text-primary" />}
            >
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Marke" value={vehicle.brand} />
                <InfoRow label="Modell" value={`${vehicle.model} ${vehicle.variant || ''}`} />
                <InfoRow label="Kategorie" value={category} />
                <InfoRow label="Zustand" value={condition.label} />
                <InfoRow label="Baujahr" value={vehicle.year.toString()} />
                <InfoRow
                  label="Erstzulassung"
                  value={new Date(vehicle.firstRegistration).toLocaleDateString('de-DE')}
                />
                <InfoRow
                  label="Kilometerstand"
                  value={`${vehicle.mileageKm.toLocaleString('de-DE')} km`}
                />
                <InfoRow label="Farbe" value={vehicle.color} colorHex={vehicle.colorHex} />
                <InfoRow label="Türen" value={vehicle.doors.toString()} />
                <InfoRow label="Sitze" value={vehicle.seats.toString()} />
              </div>
            </DraggablePanel>

            {/* Technical Details Panel */}
            <DraggablePanel
              id="technical-data"
              viewId={VIEW_ID}
              title="Technische Daten"
              icon={<Settings2 className="h-5 w-5 text-primary" />}
            >
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Motor" value={vehicle.engine || 'N/A'} />
                <InfoRow
                  label="Leistung"
                  value={`${vehicle.power.kw} kW (${vehicle.power.ps} PS)`}
                />
                <InfoRow
                  label="Getriebe"
                  value={
                    vehicle.transmissionDetail ||
                    (vehicle.transmission === 'automatik' ? 'Automatik' : 'Schaltgetriebe')
                  }
                />
                <InfoRow
                  label="Kraftstoff"
                  value={vehicle.fuelType.charAt(0).toUpperCase() + vehicle.fuelType.slice(1)}
                />
                {vehicle.co2Emission && (
                  <InfoRow label="CO₂-Emission" value={`${vehicle.co2Emission} g/km`} />
                )}
                {vehicle.consumption?.combined && (
                  <InfoRow
                    label="Verbrauch (komb.)"
                    value={`${vehicle.consumption.combined} l/100km`}
                  />
                )}
              </div>
            </DraggablePanel>

            {/* Features Panel */}
            <DraggablePanel
              id="equipment-highlights"
              viewId={VIEW_ID}
              title="Ausstattung"
              icon={<Zap className="h-5 w-5 text-primary" />}
            >
              <div className="flex flex-wrap gap-2">
                {vehicle.features?.map((featureKey) => {
                  const featureData = featureIconMap[featureKey];
                  if (!featureData) return null;
                  const Icon = featureData.icon;
                  return (
                    <div
                      key={featureKey}
                      className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-3 py-1.5"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">{featureData.label}</span>
                    </div>
                  );
                })}
              </div>
            </DraggablePanel>

            {/* Identification Panel */}
            <DraggablePanel
              id="identification"
              viewId={VIEW_ID}
              title="Identifikation"
              icon={<Hash className="h-5 w-5 text-primary" />}
            >
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-text-secondary">Interne ID</p>
                  <p className="text-sm font-mono text-foreground">{vehicle.internalId}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Kennzeichen</p>
                  <p className="text-sm font-mono text-foreground">{vehicle.plate}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Fahrgestellnummer (VIN)</p>
                  <p className="text-sm font-mono text-foreground break-all">{vehicle.vin}</p>
                </div>
              </div>
            </DraggablePanel>

            {/* Consumption & Emissions Panel */}
            {(vehicle.consumption || vehicle.co2Emission) && (
              <DraggablePanel
                id="consumption-environment"
                viewId={VIEW_ID}
                title="Verbrauch & Emissionen"
                icon={<Leaf className="h-5 w-5 text-green-500" />}
              >
                <div className="grid grid-cols-4 gap-6">
                  {vehicle.consumption?.city && (
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Innerorts</span>
                      <span className="text-sm font-medium text-foreground">
                        {vehicle.consumption.city} l/100km
                      </span>
                    </div>
                  )}
                  {vehicle.consumption?.highway && (
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Außerorts</span>
                      <span className="text-sm font-medium text-foreground">
                        {vehicle.consumption.highway} l/100km
                      </span>
                    </div>
                  )}
                  {vehicle.consumption?.combined && (
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Kombiniert</span>
                      <span className="text-sm font-medium text-foreground">
                        {vehicle.consumption.combined} l/100km
                      </span>
                    </div>
                  )}
                  {vehicle.co2Emission && (
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">CO₂-Emission</span>
                      <span className="text-sm font-medium text-foreground">
                        {vehicle.co2Emission} g/km
                      </span>
                    </div>
                  )}
                </div>
              </DraggablePanel>
            )}

            {/* Description Panel */}
            {vehicle.description && (
              <DraggablePanel
                id="description"
                viewId={VIEW_ID}
                title="Beschreibung"
                icon={<Info className="h-5 w-5 text-primary" />}
              >
                <p className="text-text-secondary leading-relaxed">{vehicle.description}</p>
              </DraggablePanel>
            )}

            {/* Timestamps Panel */}
            <DraggablePanel
              id="timestamps"
              viewId={VIEW_ID}
              title="Zeitstempel"
              icon={<Calendar className="h-5 w-5 text-primary" />}
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Erstellt am</span>
                  <span className="text-sm text-foreground">
                    {new Date(vehicle.createdAt).toLocaleDateString('de-DE')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Zuletzt geändert</span>
                  <span className="text-sm text-foreground">
                    {new Date(vehicle.updatedAt).toLocaleDateString('de-DE')}
                  </span>
                </div>
              </div>
            </DraggablePanel>
          </DraggablePanelContainer>
        </div>

        {/* Right Sidebar - Action Buttons & Comments */}
        <div className="flex flex-col gap-4 flex-shrink-0 w-80">
          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onActionClick?.('view')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-all text-xs font-medium whitespace-nowrap"
              title="Fahrzeug ansehen"
            >
              <Eye className="h-4 w-4" />
              Ansehen
            </button>

            <button
              onClick={() => onActionClick?.('sell')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-all text-xs font-medium whitespace-nowrap"
              title="Fahrzeug verkaufen"
            >
              <Tag className="h-4 w-4" />
              Verkaufen
            </button>

            <button
              onClick={() => onActionClick?.('buy')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-all text-xs font-medium whitespace-nowrap"
              title="Fahrzeug kaufen"
            >
              <ShoppingCart className="h-4 w-4" />
              Kaufen
            </button>

            <button
              onClick={() => onActionClick?.('service')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 transition-all text-xs font-medium whitespace-nowrap"
              title="Service einplanen"
            >
              <Wrench className="h-4 w-4" />
              Service
            </button>

            <button
              onClick={() => onActionClick?.('contract')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 transition-all text-xs font-medium whitespace-nowrap"
              title="Vertrag erstellen"
            >
              <FileCheck className="h-4 w-4" />
              Vertrag
            </button>

            <button
              onClick={() => onActionClick?.('edit')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all text-xs font-medium whitespace-nowrap"
              title="Fahrzeug bearbeiten"
            >
              <Edit className="h-4 w-4" />
              Bearbeiten
            </button>

            <button
              onClick={() => onActionClick?.('share')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-all text-xs font-medium whitespace-nowrap"
              title="Fahrzeug teilen"
            >
              <Share2 className="h-4 w-4" />
              Teilen
            </button>

            <button
              onClick={() => onActionClick?.('archive')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-500/10 border border-gray-500/30 text-gray-600 dark:text-gray-400 hover:bg-gray-500/20 transition-all text-xs font-medium whitespace-nowrap"
              title="Fahrzeug archivieren"
            >
              <Archive className="h-4 w-4" />
              Archivieren
            </button>
          </div>

          {/* Comments Section */}
          <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
              <MessageSquare className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Kommentare</h3>
            </div>
            <VehicleComments vehicleId={vehicle.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  colorHex,
}: {
  label: string;
  value: string;
  colorHex?: string;
}) => (
  <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
    <span className="text-sm text-text-secondary">{label}</span>
    <div className="flex items-center gap-2">
      {colorHex && (
        <div
          className="h-4 w-4 rounded-full border border-border"
          style={{ backgroundColor: colorHex }}
        />
      )}
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  </div>
);
