import { Vehicle, VehicleFeature } from '../../../../types/domain';
import { featureIconMap } from '../../../../config/featureIcons';
import { 
  Car, Fuel, Gauge, Calendar, Settings2, Hash, Palette, DoorOpen, Users, 
  Zap, Leaf, Info
} from 'lucide-react';

interface Props {
  vehicle: Vehicle;
}

const conditionConfig = {
  neufahrzeug: { label: 'Neufahrzeug' },
  tageszulassung: { label: 'Neufahrzeug mit Tageszulassung' },
  jahreswagen: { label: 'Jahreswagen' },
  gebraucht: { label: 'Gebrauchtwagen' },
  vorführwagen: { label: 'Vorführwagen' }
};

const categoryConfig = {
  limousine: 'Limousine',
  kombi: 'Kombi',
  suv: 'SUV/Geländewagen/Pickup',
  cabrio: 'Cabrio/Roadster',
  coupe: 'Coupe',
  kleinwagen: 'Kleinwagen',
  van: 'Van/Kleinbus',
  sportwagen: 'Sportwagen'
};

export const VehicleOverviewTab = ({ vehicle }: Props) => {
  const condition = conditionConfig[vehicle.condition] || { label: 'Gebrauchtwagen' };
  const category = categoryConfig[vehicle.category] || 'Sonstiges';

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Column - Basic Info */}
      <div className="col-span-2 space-y-6">
        {/* Vehicle Details Card */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            Fahrzeugdaten
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Marke" value={vehicle.brand} />
            <InfoRow label="Modell" value={`${vehicle.model} ${vehicle.variant || ''}`} />
            <InfoRow label="Kategorie" value={category} />
            <InfoRow label="Zustand" value={condition.label} />
            <InfoRow label="Baujahr" value={vehicle.year.toString()} />
            <InfoRow label="Erstzulassung" value={new Date(vehicle.firstRegistration).toLocaleDateString('de-DE')} />
            <InfoRow label="Kilometerstand" value={`${vehicle.mileageKm.toLocaleString('de-DE')} km`} />
            <InfoRow label="Farbe" value={vehicle.color} colorHex={vehicle.colorHex} />
            <InfoRow label="Türen" value={vehicle.doors.toString()} />
            <InfoRow label="Sitze" value={vehicle.seats.toString()} />
          </div>
        </div>

        {/* Technical Details Card */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-primary" />
            Technische Daten
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Motor" value={vehicle.engine || 'N/A'} />
            <InfoRow label="Leistung" value={`${vehicle.power.kw} kW (${vehicle.power.ps} PS)`} />
            <InfoRow label="Getriebe" value={vehicle.transmissionDetail || (vehicle.transmission === 'automatik' ? 'Automatik' : 'Schaltgetriebe')} />
            <InfoRow label="Kraftstoff" value={vehicle.fuelType.charAt(0).toUpperCase() + vehicle.fuelType.slice(1)} />
            {vehicle.co2Emission && <InfoRow label="CO₂-Emission" value={`${vehicle.co2Emission} g/km`} />}
            {vehicle.consumption?.combined && <InfoRow label="Verbrauch (komb.)" value={`${vehicle.consumption.combined} l/100km`} />}
          </div>
        </div>

        {/* Features Card */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Ausstattung
          </h3>
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
        </div>

        {/* Description */}
        {vehicle.description && (
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Beschreibung
            </h3>
            <p className="text-text-secondary leading-relaxed">{vehicle.description}</p>
          </div>
        )}
      </div>

      {/* Right Column - IDs & Quick Actions */}
      <div className="space-y-6">
        {/* Identification Card */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Hash className="h-5 w-5 text-primary" />
            Identifikation
          </h3>
          <div className="space-y-3">
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
        </div>

        {/* Consumption & Emissions */}
        {(vehicle.consumption || vehicle.co2Emission) && (
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              Verbrauch & Emissionen
            </h3>
            <div className="space-y-3">
              {vehicle.consumption?.city && (
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Innerorts</span>
                  <span className="text-sm font-medium text-foreground">{vehicle.consumption.city} l/100km</span>
                </div>
              )}
              {vehicle.consumption?.highway && (
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Außerorts</span>
                  <span className="text-sm font-medium text-foreground">{vehicle.consumption.highway} l/100km</span>
                </div>
              )}
              {vehicle.consumption?.combined && (
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Kombiniert</span>
                  <span className="text-sm font-medium text-foreground">{vehicle.consumption.combined} l/100km</span>
                </div>
              )}
              {vehicle.co2Emission && (
                <div className="flex justify-between border-t border-border pt-3 mt-3">
                  <span className="text-sm text-text-secondary">CO₂-Emission</span>
                  <span className="text-sm font-medium text-foreground">{vehicle.co2Emission} g/km</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Timestamps */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Zeitstempel
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Erstellt am</span>
              <span className="text-sm text-foreground">{new Date(vehicle.createdAt).toLocaleDateString('de-DE')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Zuletzt geändert</span>
              <span className="text-sm text-foreground">{new Date(vehicle.updatedAt).toLocaleDateString('de-DE')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, colorHex }: { label: string; value: string; colorHex?: string }) => (
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
