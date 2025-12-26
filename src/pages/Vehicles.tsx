import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, LayoutGrid, List, Filter } from 'lucide-react';
import { Vehicle } from '../types/domain';
import { vehicleFixtures, getAvailableVehicles, getReservedVehicles, getSoldVehicles } from '../services/vehicleFixtures';
import { VehicleCard } from './Vehicles/components/VehicleCard';

type ViewMode = 'grid' | 'list';
type FilterTab = 'all' | 'available' | 'reserved' | 'sold' | 'service' | 'archived';

export const Vehicles = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter vehicles based on active tab
  const getFilteredVehicles = (): Vehicle[] => {
    let filtered = vehicleFixtures;
    
    if (activeTab !== 'all') {
      filtered = vehicleFixtures.filter(v => v.status === activeTab);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(v => 
        v.brand.toLowerCase().includes(query) ||
        v.model.toLowerCase().includes(query) ||
        v.plate.toLowerCase().includes(query) ||
        v.vin.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredVehicles = getFilteredVehicles();

  // Count vehicles by status
  const counts = {
    all: vehicleFixtures.length,
    available: getAvailableVehicles().length,
    reserved: getReservedVehicles().length,
    sold: getSoldVehicles().length,
    service: vehicleFixtures.filter(v => v.status === 'service').length,
    archived: vehicleFixtures.filter(v => v.status === 'archived').length
  };

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'Alle Fahrzeuge', count: counts.all },
    { key: 'available', label: 'Verfügbar', count: counts.available },
    { key: 'reserved', label: 'Reserviert', count: counts.reserved },
    { key: 'sold', label: 'Verkauft', count: counts.sold },
    { key: 'service', label: 'Service', count: counts.service },
    { key: 'archived', label: 'Archiviert', count: counts.archived }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fahrzeugverwaltung</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Verwalten Sie Ihren Fahrzeugbestand effizient
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-text shadow-lg hover:bg-primary-hover transition-all">
          <Plus className="h-4 w-4" />
          Fahrzeug hinzufügen
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors
                ${activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:border-border hover:text-foreground'
                }
              `}
            >
              {tab.label}
              <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                activeTab === tab.key 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-bg-secondary text-text-secondary'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search and View Controls */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Suche nach Marke, Modell, Kennzeichen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded p-1.5 transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary text-primary-text'
                : 'text-text-secondary hover:bg-bg-secondary hover:text-foreground'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`rounded p-1.5 transition-colors ${
              viewMode === 'list'
                ? 'bg-primary text-primary-text'
                : 'text-text-secondary hover:bg-bg-secondary hover:text-foreground'
            }`}
            title="List View"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Vehicle Grid/List */}
      {filteredVehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface py-12">
          <div className="rounded-full bg-bg-secondary p-3">
            <Filter className="h-8 w-8 text-text-secondary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">Keine Fahrzeuge gefunden</h3>
          <p className="mt-1 text-sm text-text-secondary">
            {searchQuery 
              ? `Keine Ergebnisse für "${searchQuery}"`
              : 'Es gibt keine Fahrzeuge in dieser Kategorie'
            }
          </p>
        </div>
      ) : (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 gap-4' 
            : 'flex flex-col gap-3'
          }
        `}>
          {filteredVehicles.map((vehicle) => (
            <VehicleCard 
              key={vehicle.id} 
              vehicle={vehicle}
              onClick={() => navigate(`/vehicles/${vehicle.id}`)}
            />
          ))}
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-text-secondary">
        <p>
          Zeige {filteredVehicles.length} von {counts.all} Fahrzeugen
        </p>
        <p className="text-xs">
          Gesamtwert: {filteredVehicles.reduce((sum, v) => sum + v.price, 0).toLocaleString('de-DE')} €
        </p>
      </div>
    </div>
  );
};
