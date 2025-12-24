import { Vehicle, VehicleFeature } from '../../../types/domain';
import { featureIconMap } from '../../../config/featureIcons';
import { 
  Car, 
  Fuel, 
  Gauge, 
  Calendar, 
  Settings2, 
  Euro, 
  MapPin,
  Hash,
  Palette,
  DoorOpen,
  Users,
  FileText,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: () => void;
}

const statusConfig = {
  available: { label: 'Verfügbar', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  reserved: { label: 'Reserviert', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  sold: { label: 'Verkauft', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  service: { label: 'Service', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  archived: { label: 'Archiviert', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' }
};

const fuelTypeConfig = {
  benzin: { label: 'Benzin', shortLabel: 'Benzin' },
  diesel: { label: 'Diesel', shortLabel: 'Diesel' },
  elektro: { label: 'Elektro', shortLabel: 'Elektro' },
  hybrid: { label: 'Hybrid', shortLabel: 'Hybrid' },
  'plug-in-hybrid': { label: 'Plug-In Hybrid', shortLabel: 'Plug-In' }
};

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

export const VehicleCard = ({ vehicle, onClick }: VehicleCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const status = statusConfig[vehicle.status];
  const fuelType = fuelTypeConfig[vehicle.fuelType];
  const condition = conditionConfig[vehicle.condition] || { label: 'Gebrauchtwagen' };
  const category = categoryConfig[vehicle.category] || 'Sonstiges';

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div 
      onClick={onClick}
      className="group relative flex gap-4 overflow-hidden rounded-xl border border-border bg-surface p-4 shadow-sm transition-all hover:shadow-xl hover:border-primary/50 cursor-pointer"
    >
      {/* Vehicle Image Carousel */}
      <div className="relative h-56 w-80 flex-shrink-0 overflow-hidden rounded-lg bg-bg-secondary">
        <img 
          src={vehicle.images[currentImageIndex]} 
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        
        {/* Status Badge on Image */}
        <div className="absolute top-2 right-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Carousel Navigation Arrows */}
        {vehicle.images.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {vehicle.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'w-6 bg-white' 
                      : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Vehicle Info */}
      <div className="flex flex-1 flex-col">
        {/* Header: Brand, Model, Category */}
        <div className="border-b border-border pb-2">
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {vehicle.brand} {vehicle.model} {vehicle.variant}
            </h3>
            <p className="text-xs text-text-secondary">{category}</p>
          </div>
        </div>

        {/* Engine & Transmission Details */}
        <div className="mt-2 text-xs text-text-secondary border-b border-border pb-2">
          {vehicle.engine && (
            <span>{vehicle.engine} </span>
          )}
          {vehicle.transmissionDetail && (
            <span>{vehicle.transmissionDetail}, </span>
          )}
          <span className="font-semibold">
            {vehicle.power.kw} kW ({vehicle.power.ps} PS)
          </span>
          {vehicle.transmission === 'automatik' && <span>, Automatik</span>}
          {vehicle.transmission === 'manuell' && <span>, Schaltgetriebe</span>}
        </div>

        {/* Condition */}
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="text-text-secondary">{condition.label}</span>
        </div>

        {/* Main Info Grid */}
        <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
          {/* Color */}
          <div className="flex items-center gap-1.5">
            {vehicle.colorHex && (
              <div 
                className="h-3 w-3 rounded-full border-2 border-border flex-shrink-0"
                style={{ backgroundColor: vehicle.colorHex }}
              />
            )}
            <span className="text-text-secondary truncate">{vehicle.color}</span>
          </div>

          {/* Fuel Type */}
          <div className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-text-secondary flex-shrink-0" />
            <span className="text-text-secondary">{fuelType.shortLabel}</span>
          </div>

          {/* Mileage */}
          <div className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-text-secondary flex-shrink-0" />
            <span className="text-text-secondary">{vehicle.mileageKm.toLocaleString('de-DE')} km</span>
          </div>

          {/* First Registration */}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-text-secondary flex-shrink-0" />
            <span className="text-text-secondary">
              {new Date(vehicle.firstRegistration).toLocaleDateString('de-DE', { month: '2-digit', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* License Plate - German Style */}
        <div className="mt-3 flex items-center w-fit rounded border-2 border-black dark:border-gray-800 overflow-hidden shadow-md">
          {/* EU Section (Blue) */}
          <div className="bg-blue-600 px-1.5 py-2 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <span className="text-[8px] text-yellow-300 font-bold leading-none">★</span>
              <span className="text-[8px] text-yellow-300 font-bold leading-none">★</span>
              <span className="text-[8px] text-yellow-300 font-bold leading-none">★</span>
            </div>
            <span className="text-[9px] text-white font-bold mt-0.5">D</span>
          </div>
          {/* Plate Number */}
          <div className="bg-white dark:bg-gray-100 px-3 py-1.5">
            <span className="text-lg font-black text-black tracking-wide" style={{ fontFamily: 'monospace' }}>
              {vehicle.plate}
            </span>
          </div>
        </div>

        {/* Price & Availability */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
          <div>
            <div className="flex items-baseline gap-2">
              <div className="flex items-center gap-1">
                <Euro className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">
                  {vehicle.price.toLocaleString('de-DE')}
                </span>
              </div>
              {vehicle.priceNet && (
                <span className="text-xs text-text-secondary">
                  (€ {vehicle.priceNet.toLocaleString('de-DE')} netto)
                </span>
              )}
            </div>
            {vehicle.availability && (
              <p className="text-xs text-text-secondary mt-1">{vehicle.availability}</p>
            )}
          </div>
          
          {vehicle.location && (
            <div className="flex items-center gap-1.5 text-text-secondary">
              <MapPin className="h-4 w-4" />
              <span className="text-xs">{vehicle.location}</span>
            </div>
          )}
        </div>

        {/* Feature Icons with Tooltips - Show ALL features, highlight available ones */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {Object.entries(featureIconMap).map(([featureKey, featureData]) => {
              const Icon = featureData.icon;
              const isAvailable = vehicle.features?.includes(featureKey as VehicleFeature) || false;
              
              return (
                <div
                  key={featureKey}
                  className="group/icon relative"
                  title={featureData.label}
                >
                  <div className={`rounded-md p-1.5 border transition-all cursor-help ${
                    isAvailable 
                      ? 'bg-primary/10 border-primary/30 hover:border-primary/60 hover:bg-primary/15' 
                      : 'bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}>
                    <Icon className={`h-4 w-4 transition-colors ${
                      isAvailable 
                        ? 'text-primary group-hover/icon:text-primary' 
                        : 'text-gray-300 dark:text-gray-600 group-hover/icon:text-gray-400 dark:group-hover/icon:text-gray-500'
                    }`} />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                      <span className="flex items-center gap-1.5">
                        {featureData.label}
                        {isAvailable ? (
                          <span className="text-green-400 font-bold">✓</span>
                        ) : (
                          <span className="text-red-400 font-bold">✗</span>
                        )}
                      </span>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
