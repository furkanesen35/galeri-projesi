import { Vehicle } from '../types/domain';

const mockVehicles: Vehicle[] = [
  { id: '1', plate: 'F-1234', brand: 'BMW', model: '320i', status: 'active', mileageKm: 120000 },
  { id: '2', plate: 'HH-9876', brand: 'Audi', model: 'A4', status: 'maintenance', mileageKm: 89000 },
  { id: '3', plate: 'M-5522', brand: 'VW', model: 'Golf', status: 'inactive', mileageKm: 150000 }
];

const statusColor: Record<Vehicle['status'], string> = {
  active: 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40',
  maintenance: 'bg-amber-500/20 text-amber-200 border border-amber-500/40',
  inactive: 'bg-slate-500/20 text-slate-200 border border-slate-500/40'
};

export const Vehicles = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold text-foreground">Vehicles</h3>
        <p className="text-sm text-text-secondary">Add, edit, and reorder attributes per customer.</p>
      </div>
      <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-text shadow hover:bg-primary-hover">
        + Add vehicle
      </button>
    </div>
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-bg-secondary">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">Plate</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">Brand</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">Model</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">Mileage</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {mockVehicles.map((vehicle) => (
            <tr key={vehicle.id} className="hover:bg-surface-hover">
              <td className="px-4 py-3 text-sm font-semibold text-foreground">{vehicle.plate}</td>
              <td className="px-4 py-3 text-sm text-text-secondary">{vehicle.brand}</td>
              <td className="px-4 py-3 text-sm text-text-secondary">{vehicle.model}</td>
              <td className="px-4 py-3 text-sm text-text-secondary">{vehicle.mileageKm.toLocaleString()} km</td>
              <td className="px-4 py-3 text-sm">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[vehicle.status]}`}>
                  {vehicle.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
