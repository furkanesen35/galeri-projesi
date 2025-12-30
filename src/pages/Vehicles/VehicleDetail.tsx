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
  Calculator,
  Camera,
  History,
  LayoutDashboard,
  Eye,
  Edit,
  Share2,
  Wrench,
  FileCheck,
  Archive,
} from "lucide-react";
import { vehicleFixtures } from "../../services/vehicleFixtures";
import { featureIconMap } from "../../config/featureIcons";
import { VehicleFeature } from "../../types/domain";
import { VehiclePriceTabNew } from "./components/VehicleDetail/VehiclePriceTabNew";
import { VehicleDocumentsTab } from "./components/VehicleDetail/VehicleDocumentsTab";
import { VehicleHistoryTab } from "./components/VehicleDetail/VehicleHistoryTab";
import { VehiclePhotosTab } from "./components/VehicleDetail/VehiclePhotosTab";
import { VehicleSettingsTab } from "./components/VehicleDetail/VehicleSettingsTab";
import { VehicleOverviewTab } from "./components/VehicleDetail/VehicleOverviewTab";
import { SalesWizard } from "./components/VehicleDetail/SalesWizard";

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
  const [activeTab, setActiveTab] = useState<'overview' | 'price' | 'documents' | 'history' | 'photos' | 'settings'>('overview');
  const [showSalesWizard, setShowSalesWizard] = useState(false);

  const handleActionClick = (action: string) => {
    console.log(`${action} clicked for vehicle:`, vehicle?.id);
    if (action === 'sell') {
      setShowSalesWizard(true);
    }
    // Other actions will be implemented later
  };

  const tabs = [
    { id: 'overview' as const, label: 'Übersicht', icon: LayoutDashboard },
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
    <div className="pb-12">
      {/* HEADER - Back Link */}
      <button
        onClick={() => navigate("/vehicles")}
        className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group mb-4"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium uppercase tracking-wide">
          Zurück zur Fahrzeugsuche
        </span>
      </button>

      {/* TAB NAVIGATION */}
      <div className="border-b border-border mb-6">
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
                    ? "border-primary text-primary"
                    : "border-transparent text-text-secondary hover:text-foreground hover:border-border"
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
      {activeTab === 'overview' && <VehicleOverviewTab vehicle={vehicle} onActionClick={handleActionClick} />}

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
    className={`flex items-center gap-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
      size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm"
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
