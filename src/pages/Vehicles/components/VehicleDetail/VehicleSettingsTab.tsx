import { useState } from 'react';
import { Vehicle } from '../../../../types/domain';
import {
  Settings2,
  Tag,
  MapPin,
  Eye,
  EyeOff,
  Globe,
  AlertTriangle,
  Save,
  RotateCcw,
} from 'lucide-react';

interface Props {
  vehicle: Vehicle;
}

export const VehicleSettingsTab = ({ vehicle }: Props) => {
  const [status, setStatus] = useState(vehicle.status);
  const [location, setLocation] = useState(vehicle.location || '');
  const [isVisible, setIsVisible] = useState(true);
  const [publishToPortals, setPublishToPortals] = useState(true);

  const statusOptions = [
    { value: 'available', label: 'Verfügbar', color: 'text-green-500' },
    { value: 'reserved', label: 'Reserviert', color: 'text-amber-500' },
    { value: 'sold', label: 'Verkauft', color: 'text-blue-500' },
    { value: 'service', label: 'Service', color: 'text-purple-500' },
    { value: 'archived', label: 'Archiviert', color: 'text-slate-500' },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      {/* Status Settings */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          Status
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Fahrzeugstatus</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Vehicle['status'])}
              className="w-full rounded-lg border border-border bg-bg-secondary px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Location Settings */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Standort
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Aktueller Standort
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="z.B. Berlin, Hamburg, München..."
              className="w-full rounded-lg border border-border bg-bg-secondary px-4 py-2.5 text-foreground placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Visibility Settings */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          Sichtbarkeit
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-3">
              {isVisible ? (
                <Eye className="h-5 w-5 text-green-500" />
              ) : (
                <EyeOff className="h-5 w-5 text-text-secondary" />
              )}
              <div>
                <p className="font-medium text-foreground">Intern sichtbar</p>
                <p className="text-sm text-text-secondary">
                  Fahrzeug wird im internen System angezeigt
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isVisible ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  isVisible ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Globe
                className={`h-5 w-5 ${publishToPortals ? 'text-primary' : 'text-text-secondary'}`}
              />
              <div>
                <p className="font-medium text-foreground">Auf Portalen veröffentlichen</p>
                <p className="text-sm text-text-secondary">
                  Fahrzeug wird auf mobile.de, AutoScout24, etc. angezeigt
                </p>
              </div>
            </div>
            <button
              onClick={() => setPublishToPortals(!publishToPortals)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                publishToPortals ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  publishToPortals ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Gefahrenzone
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Fahrzeug archivieren</p>
              <p className="text-sm text-text-secondary">
                Das Fahrzeug wird aus der aktiven Liste entfernt
              </p>
            </div>
            <button className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-500 hover:bg-amber-500/20 transition-colors">
              Archivieren
            </button>
          </div>
          <hr className="border-red-500/20" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Fahrzeug löschen</p>
              <p className="text-sm text-text-secondary">
                Diese Aktion kann nicht rückgängig gemacht werden
              </p>
            </div>
            <button className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/20 transition-colors">
              Löschen
            </button>
          </div>
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground hover:bg-bg-secondary transition-colors">
          <RotateCcw className="h-4 w-4" />
          Zurücksetzen
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-text hover:bg-primary-hover transition-all">
          <Save className="h-4 w-4" />
          Änderungen speichern
        </button>
      </div>
    </div>
  );
};
