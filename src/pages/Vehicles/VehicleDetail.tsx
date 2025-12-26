import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Car,
  Fuel,
  Gauge,
  Calendar,
  DoorOpen,
  Users,
  Settings,
  Palette,
  MapPin,
  Star,
  Diamond,
  CircleDot,
  Leaf,
  ShoppingCart,
  Tag,
  Bookmark,
  ParkingCircle,
  FileText,
  Shield,
  Phone,
  UserPlus,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  Info,
} from "lucide-react";
import { vehicleFixtures } from "../../services/vehicleFixtures";
import { featureIconMap } from "../../config/featureIcons";
import { VehicleFeature } from "../../types/domain";

const statusConfig = {
  available: { label: "Verfügbar", color: "text-green-600" },
  reserved: { label: "Reserviert", color: "text-amber-600" },
  sold: { label: "Verkauft", color: "text-blue-600" },
  service: { label: "Service", color: "text-purple-600" },
  archived: { label: "Archiviert", color: "text-slate-600" },
};

const fuelTypeLabels: Record<string, string> = {
  benzin: "Benzin",
  diesel: "Diesel",
  elektro: "Elektro",
  hybrid: "Hybrid",
  "plug-in-hybrid": "Benzin Plug-In Hybrid",
};

const conditionLabels: Record<string, string> = {
  neufahrzeug: "Neufahrzeug",
  tageszulassung: "Neufahrzeug mit Tageszulassung",
  jahreswagen: "Jahreswagen",
  gebraucht: "Gebrauchtwagen",
  vorführwagen: "Vorführwagen",
};

const categoryLabels: Record<string, string> = {
  limousine: "Limousine",
  kombi: "Kombi",
  suv: "SUV/Geländewagen/Pickup",
  cabrio: "Cabrio/Roadster",
  coupe: "Coupé",
  kleinwagen: "Kleinwagen",
  van: "Van/Kleinbus",
  sportwagen: "Sportwagen",
};

export const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const vehicle = vehicleFixtures.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Car className="h-16 w-16 text-text-secondary mb-4" />
        <h2 className="text-xl font-semibold text-foreground">
          Fahrzeug nicht gefunden
        </h2>
        <p className="text-text-secondary mt-2">
          Das angeforderte Fahrzeug existiert nicht.
        </p>
        <button
          onClick={() => navigate("/vehicles")}
          className="mt-4 flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Fahrzeugübersicht
        </button>
      </div>
    );
  }

  const status = statusConfig[vehicle.status];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  // Get available features for display
  const availableFeatures = vehicle.features || [];

  return (
    <div className="space-y-8 pb-12">
      {/* ============================================= */}
      {/* HEADER - Back Link */}
      {/* ============================================= */}
      <button
        onClick={() => navigate("/vehicles")}
        className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium uppercase tracking-wide">
          Zurück zur Fahrzeugsuche
        </span>
      </button>

      {/* ============================================= */}
      {/* TITLE SECTION */}
      {/* ============================================= */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          {/* Main Title */}
          <h1 className="text-2xl font-bold text-foreground">
            {vehicle.brand} {vehicle.model} {vehicle.variant && `| ${categoryLabels[vehicle.category] || vehicle.category}`}
          </h1>
          {/* Engine Specs */}
          <p className="text-sm text-text-secondary">
            {vehicle.engine && `${vehicle.engine}, `}
            {vehicle.transmissionDetail || (vehicle.transmission === "automatik" ? "Automatik" : "Schaltgetriebe")}
            {`, ${vehicle.power.kw} kW, (${vehicle.power.ps} PS)`}
          </p>
          {/* ID and Condition */}
          <p className="text-sm text-text-secondary">
            {vehicle.internalId}, {conditionLabels[vehicle.condition] || vehicle.condition}
          </p>
        </div>

        {/* Price Section */}
        <div className="text-right">
          <p className="text-3xl font-bold text-foreground">
            {vehicle.price.toLocaleString("de-DE")} €
          </p>
          {vehicle.priceNet && (
            <p className="text-sm text-text-secondary">
              {vehicle.priceNet.toLocaleString("de-DE")} € netto
            </p>
          )}
          <p className={`text-sm font-medium mt-1 ${status.color}`}>
            {vehicle.availability || status.label}
          </p>
        </div>
      </div>

      {/* ============================================= */}
      {/* MAIN HERO - Unified Panel */}
      {/* ============================================= */}
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* LEFT: Photo Gallery - Larger */}
          <div className="col-span-5 relative group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-bg-secondary">
              {/* "Abb. ähnlich" badge */}
              <div className="absolute top-3 left-3 z-10 bg-gray-800/80 text-white text-xs px-2 py-1 rounded">
                Abb. ähnlich
              </div>
              
              <img
                src={vehicle.images[currentImageIndex]}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="h-full w-full object-cover"
              />

              {/* Navigation arrows */}
              {vehicle.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Dots indicator */}
              {vehicle.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {vehicle.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2.5 w-2.5 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-gray-800"
                          : "bg-gray-400 hover:bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MIDDLE: Fahrzeugdaten */}
          <div className="col-span-5">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
              <div className="p-2 rounded-lg bg-bg-secondary">
                <Car className="h-5 w-5 text-foreground" />
              </div>
              <h2 className="text-base font-bold text-foreground uppercase tracking-wide">
                Fahrzeugdaten
              </h2>
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <DataRow 
                icon={Car} 
                label="Fahrzeugtyp" 
                value={categoryLabels[vehicle.category] || vehicle.category} 
              />
              <DataRow 
                icon={Palette} 
                label="Farbe" 
                value={vehicle.color}
                colorHex={vehicle.colorHex}
              />
              <DataRow 
                icon={Calendar} 
                label="Erstzulassung" 
                value={new Date(vehicle.firstRegistration).toLocaleDateString("de-DE", { month: "2-digit", year: "numeric" })} 
              />
              <DataRow 
                icon={CircleDot} 
                label="Innenfarbe" 
                value="Schwarz" 
              />
              <DataRow 
                icon={Gauge} 
                label="Kilometerstand" 
                value={`${vehicle.mileageKm.toLocaleString("de-DE")} km`} 
              />
              <DataRow 
                icon={Settings} 
                label="Innenausstattung" 
                value="Stoff" 
              />
              <DataRow 
                icon={DoorOpen} 
                label="Türen" 
                value={vehicle.doors.toString()} 
              />
              <DataRow 
                icon={Users} 
                label="Sitzplätze" 
                value={vehicle.seats.toString()} 
              />
              <DataRow 
                icon={Settings} 
                label="Getriebeart" 
                value={vehicle.transmission === "automatik" ? "Automatik" : "Schaltgetriebe"} 
              />
              <DataRow 
                icon={Fuel} 
                label="Kraftstoff" 
                value={fuelTypeLabels[vehicle.fuelType] || vehicle.fuelType} 
              />
              <DataRow 
                icon={CircleDot} 
                label="Felgentyp" 
                value="Leichtmetallfelgen" 
              />
              <DataRow 
                icon={Calendar} 
                label="HU bis" 
                value="--/----" 
              />
            </div>
          </div>

          {/* RIGHT: Action Buttons */}
          <div className="col-span-2 flex flex-col gap-1.5">
            <ActionButton icon={ShoppingCart} label="Kaufen" variant="outline" size="sm" />
            <ActionButton icon={Tag} label="Preisvorschlag" variant="primary" size="sm" />
            <ActionButton icon={Bookmark} label="Reservieren" variant="outline" size="sm" />
            <ActionButton icon={ParkingCircle} label="Parken" variant="outline" size="sm" />
            <ActionButton icon={FileText} label="Dokumente" variant="outline" size="sm" />
            <ActionButton icon={Shield} label="Garantie" variant="outline" size="sm" />
            <ActionButton icon={Shield} label="Versicherung" variant="outline" size="sm" />
            <ActionButton icon={UserPlus} label="Lead erstellen" variant="outline" size="sm" />
            <ActionButton icon={Clock} label="Wiedervorlage" variant="outline" size="sm" />
          </div>
        </div>
      </div>

      {/* ============================================= */}
      {/* AUSSTATTUNGSHIGHLIGHTS */}
      {/* ============================================= */}
      <section className="rounded-lg border border-border bg-surface p-6">
        <div className="flex items-center gap-3 mb-6">
          <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
          <h2 className="text-lg font-bold text-foreground uppercase tracking-wide">
            Ausstattungshighlights
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-x-8 gap-y-3">
          {availableFeatures.map((featureKey) => {
            const featureData = featureIconMap[featureKey];
            if (!featureData) return null;
            return (
              <div key={featureKey} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-text-secondary flex-shrink-0" />
                <span className="text-sm text-primary hover:underline cursor-pointer">
                  {featureData.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================= */}
      {/* SONDERAUSSTATTUNG & SERIENAUSSTATTUNG */}
      {/* ============================================= */}
      <div className="grid grid-cols-2 gap-6">
        {/* Sonderausstattung */}
        <section className="rounded-lg border border-border bg-surface p-6">
          <div className="flex items-center gap-3 mb-6">
            <Diamond className="h-6 w-6 text-foreground" />
            <h2 className="text-lg font-bold text-foreground uppercase tracking-wide">
              Sonderausstattung
            </h2>
          </div>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-foreground">•</span>
              <span>Anhängerzugvorrichtung, abnehmbar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">•</span>
              <span>Onboard-Charger (fahrzeugintegrierte Ladeeinheit)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">•</span>
              <span>Sicherheitsnetz</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">•</span>
              <span>Allwetterreifen</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">•</span>
              <span className="text-primary">Komfort-Paket</span>
              <span> [Intelli-Sitze, Sitzheizung, Lenkradheizung]</span>
            </li>
          </ul>
        </section>

        {/* Serienausstattung */}
        <section className="rounded-lg border border-border bg-surface p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="h-6 w-6 text-foreground" />
            <h2 className="text-lg font-bold text-foreground uppercase tracking-wide">
              Serienausstattung
            </h2>
          </div>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-foreground">•</span>
              <span>Frontairbags und Brust-Becken-Seitenairbags</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">•</span>
              <span>Reifendruck-Kontrollsystem</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">•</span>
              <span>Elektronisches Stabilitätsprogramm (ESP)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">•</span>
              <span>Elektrische Parkbremse</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">•</span>
              <span>Antiblockiersystem (ABS) mit Bremsassistent</span>
            </li>
          </ul>
        </section>
      </div>

      {/* ============================================= */}
      {/* VERBRAUCHS- & UMWELTDATEN */}
      {/* ============================================= */}
      <section className="rounded-lg border border-border bg-surface p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
            <Leaf className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="text-lg font-bold text-foreground uppercase tracking-wide">
            Verbrauchs- & Umweltdaten
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Consumption Data */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm">
              Kraftstoffverbrauch
            </h3>
            {vehicle.consumption && (
              <>
                {vehicle.consumption.combined && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">kombiniert:</span>
                    <span className="text-foreground font-medium">
                      {vehicle.consumption.combined} l / 100km
                    </span>
                  </div>
                )}
                {vehicle.consumption.city && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Innerorts:</span>
                    <span className="text-foreground font-medium">
                      {vehicle.consumption.city} l / 100km
                    </span>
                  </div>
                )}
                {vehicle.consumption.highway && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Außerorts:</span>
                    <span className="text-foreground font-medium">
                      {vehicle.consumption.highway} l / 100km
                    </span>
                  </div>
                )}
              </>
            )}
            {vehicle.co2Emission && (
              <>
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">CO₂-Emissionen:</span>
                    <span className="text-foreground font-medium">
                      {vehicle.co2Emission} g / km
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Abgasnorm:</span>
                  <span className="text-foreground font-medium">Euro 6e</span>
                </div>
              </>
            )}
          </div>

          {/* CO2 Class Label */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-foreground text-sm mb-3">
              CO₂-Klasse
            </h3>
            <div className="text-xs text-text-secondary text-center mb-2">
              Auf Grundlage der CO₂-Emissionen
            </div>
            <CO2ClassLabel currentClass="B" />
          </div>

          {/* Additional Environmental Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm">
              Umweltdaten
            </h3>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Umweltplakette:</span>
              <span className="text-foreground font-medium">4 (Grün)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Energieeffizienz:</span>
              <span className="text-foreground font-medium">A+</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SUPPORT CONTACT */}
      {/* ============================================= */}
      <section className="rounded-lg bg-gray-800 text-white p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Wir helfen Ihnen gerne weiter!
          </h3>
          <p className="text-gray-400 text-sm mb-3">Support</p>
          <p className="text-2xl font-bold mb-4">Ihr Ansprechpartner</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>+49 123 456789</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Info className="h-4 w-4" />
              <span>support@example.de</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="border border-white/30 rounded-lg px-4 py-2 text-sm hover:bg-white/10 transition-colors">
            Zum Hilfebereich
          </button>
          <div className="h-24 w-24 rounded-full bg-gray-600 flex items-center justify-center">
            <Users className="h-12 w-12 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <p className="text-xs text-text-secondary text-center">
        Alle Preise in € inkl. 0 % Umsatzsteuer. Abbildungen zeigen unter Umständen nicht genau das angebotene, 
        sondern ein vergleichbares Modell. Angebot freibleibend unter Vorbehalt der Eigenbelieferung. 
        Keine Haftung für Irrtümer und Druckfehler.
      </p>
    </div>
  );
};

/* ============================================= */
/* HELPER COMPONENTS */
/* ============================================= */

const DataRow = ({
  icon: Icon,
  label,
  value,
  colorHex,
  fullWidth,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  colorHex?: string;
  fullWidth?: boolean;
}) => (
  <div className={`flex items-start gap-3 ${fullWidth ? "col-span-2" : ""}`}>
    <Icon className="h-5 w-5 text-text-secondary flex-shrink-0 mt-0.5" />
    <div className="min-w-0">
      <p className="text-xs text-text-secondary font-medium">{label}:</p>
      <div className="flex items-center gap-2">
        {colorHex && (
          <div
            className="h-3 w-3 rounded-full border border-border flex-shrink-0"
            style={{ backgroundColor: colorHex }}
          />
        )}
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  </div>
);

const ActionButton = ({
  icon: Icon,
  label,
  variant,
  size = "md",
}: {
  icon: React.ElementType;
  label: string;
  variant: "primary" | "outline";
  size?: "sm" | "md";
}) => (
  <button
    className={`w-full flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors ${
      size === "sm" ? "px-2 py-1.5 text-xs" : "px-4 py-2.5 text-sm"
    } ${
      variant === "primary"
        ? "bg-primary text-primary-text hover:bg-primary-hover"
        : "border border-border bg-surface text-foreground hover:bg-bg-secondary"
    }`}
  >
    <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
    {label}
  </button>
);

const CO2ClassLabel = ({ currentClass }: { currentClass: string }) => {
  const classes = ["A", "B", "C", "D", "E", "F", "G"];
  const colors: Record<string, string> = {
    A: "bg-green-600",
    B: "bg-green-500",
    C: "bg-lime-500",
    D: "bg-yellow-400",
    E: "bg-orange-400",
    F: "bg-orange-500",
    G: "bg-red-500",
  };

  return (
    <div className="flex flex-col gap-0.5">
      {classes.map((cls) => (
        <div key={cls} className="flex items-center gap-1">
          <div
            className={`h-4 text-white text-xs font-bold flex items-center justify-center ${colors[cls]}`}
            style={{
              width: `${40 + classes.indexOf(cls) * 10}px`,
              clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)",
            }}
          >
            {cls}
          </div>
          {cls === currentClass && (
            <div className="bg-gray-800 text-white text-xs font-bold px-2 py-0.5 rounded">
              {cls}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
