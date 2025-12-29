export type VehicleStatus = 'available' | 'reserved' | 'sold' | 'service' | 'archived';
export type FuelType = 'benzin' | 'diesel' | 'elektro' | 'hybrid' | 'plug-in-hybrid';
export type Transmission = 'automatik' | 'manuell';
export type Condition = 'neufahrzeug' | 'tageszulassung' | 'jahreswagen' | 'gebraucht' | 'vorführwagen';
export type VehicleCategory = 'limousine' | 'kombi' | 'suv' | 'cabrio' | 'coupe' | 'kleinwagen' | 'van' | 'sportwagen';

// Feature icons mapping
export type VehicleFeature = 
  | 'automatik' 
  | 'klimaanlage' 
  | 'klimaautomatik'
  | '2-zonen-klimaautomatik'
  | 'sitzheizung'
  | 'lenkradheizung'
  | 'navigationssystem'
  | 'led-scheinwerfer'
  | 'xenon-scheinwerfer'
  | 'leichtmetallfelgen'
  | 'einparkhilfe'
  | 'rückfahrkamera'
  | '360-grad-kamera'
  | 'anhängerkupplung'
  | 'anhängerkupplung-abnehmbar'
  | 'panoramadach'
  | 'schiebedach'
  | 'tempomat'
  | 'adaptiver-tempomat'
  | 'spurhalteassistent'
  | 'totwinkel-assistent'
  | 'fernlichtassistent'
  | 'müdigkeitswarner'
  | 'notbremsassistent'
  | 'verkehrszeichenerkennung'
  | 'einparkhilfe-selbsttätig'
  | 'head-up-display'
  | 'digitales-kombiinstrument'
  | 'ledersitze'
  | 'teilleder'
  | 'sportpaket'
  | 'soundsystem'
  | 'freisprecheinrichtung'
  | 'apple-carplay'
  | 'android-auto'
  | 'bluetooth'
  | 'usb'
  | 'isofix'
  | 'beheizbare-frontscheibe'
  | 'regensensor'
  | 'lichtsensor'
  | 'keyless-entry'
  | 'keyless-go'
  | 'start-stop-automatik'
  | 'allradantrieb'
  | 'luftfederung'
  | 'sportfahrwerk';

export type Vehicle = {
  id: string;
  internalId: string; // e.g., CAR3028260
  plate: string;
  vin: string;
  brand: string;
  model: string;
  variant?: string;
  category: VehicleCategory;
  year: number;
  firstRegistration: string;
  mileageKm: number;
  fuelType: FuelType;
  transmission: Transmission;
  transmissionDetail?: string; // e.g., "7-Gang-Doppelkupplungsgetriebe (eDCT)"
  engine?: string; // e.g., "1.6 Direct Injection Turbo"
  power: {
    kw: number;
    ps: number;
  };
  color: string;
  colorHex?: string;
  seats: number;
  doors: number;
  condition: Condition;
  price: number;
  priceNet?: number;
  purchasePrice?: number;
  status: VehicleStatus;
  availability?: string; // e.g., "Verfügbar in ca. 8 Wochen", "Sofort verfügbar"
  images: string[];
  features: VehicleFeature[];
  description?: string;
  location?: string;
  customerId?: string;
  co2Emission?: number; // g/km
  consumption?: {
    city?: number;
    highway?: number;
    combined?: number;
  };
  createdAt: string;
  updatedAt: string;
};

export type TaskStatus = 'pending' | 'in_progress' | 'done' | 'cancelled';

export type TaskType = 
  | 'oil_change'
  | 'tire_rotation'
  | 'tire_change'
  | 'brake_repair'
  | 'engine_repair'
  | 'transmission'
  | 'battery'
  | 'ac_repair'
  | 'bodywork'
  | 'paint'
  | 'electrical'
  | 'inspection'
  | 'cleaning'
  | 'glass_repair'
  | 'exhaust'
  | 'suspension'
  | 'steering'
  | 'lights'
  | 'interior'
  | 'general';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TaskItem = {
  id: string;
  title: string;
  description?: string;
  taskType: TaskType;
  priority?: TaskPriority;
  assignee?: string;
  status: TaskStatus;
  dueDate?: string;
  vehicleId?: string;
  vehicleName?: string;
};

export type TaskDetailRow = {
  id: string;
  title: string;
  description: string;
  taskType: TaskType;
  priority: TaskPriority;
  assignee?: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  vehicleId: string;
  vehicleName: string;
  brand: string;
  model: string;
  licensePlate: string;
  vin: string;
  mileage: number;
  firstRegistration: string;
  fuelType: string;
  price: number;
  estimatedCost: number;
  notes?: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  taskType?: TaskType;
  priority?: TaskPriority;
  vehicleName?: string;
  assignee?: string;
  description?: string;
  status?: TaskStatus;
};
