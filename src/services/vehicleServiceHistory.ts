import { TaskType, TaskPriority } from '../types/domain';

/**
 * Vehicle Service History and Known Issues
 * Maps vehicle IDs to their recommended services and known problems
 */

export type VehicleServiceIssue = {
  taskType: TaskType;
  title: string;
  priority: TaskPriority;
  description: string;
  estimatedDuration: number; // in hours
  lastService?: string;
  nextServiceDue?: string;
};

export const vehicleServiceHistory: Record<string, VehicleServiceIssue[]> = {
  // BMW 320i - v1
  v1: [
    {
      taskType: 'oil_change',
      title: 'Ölwechsel fällig',
      priority: 'high',
      description:
        'Ölwechsel überfällig bei 45.000 km. Letzter Service vor 15.000 km. Motoröl und Ölfilter wechseln.',
      estimatedDuration: 1,
      lastService: '2024-06-15',
      nextServiceDue: '2024-12-30',
    },
    {
      taskType: 'inspection',
      title: 'TÜV Hauptuntersuchung',
      priority: 'urgent',
      description: 'TÜV HU/AU fällig in 2 Wochen. Vollständige Inspektion durchführen.',
      estimatedDuration: 2,
      nextServiceDue: '2025-01-15',
    },
    {
      taskType: 'brake_repair',
      title: 'Bremsbeläge prüfen',
      priority: 'medium',
      description: 'Bremsgeräusche beim Bremsen. Bremsbeläge vorne prüfen und ggf. erneuern.',
      estimatedDuration: 2,
    },
  ],

  // Audi A4 - v2
  v2: [
    {
      taskType: 'tire_rotation',
      title: 'Reifenwechsel Winterreifen',
      priority: 'high',
      description: 'Winterreifen montieren. Profiltiefe prüfen. Luftdruck anpassen.',
      estimatedDuration: 1,
    },
    {
      taskType: 'ac_repair',
      title: 'Klimaanlage Service',
      priority: 'medium',
      description:
        'Klimaanlage kühlt nicht ausreichend. Kältemittel prüfen und nachfüllen. System auf Leckage prüfen.',
      estimatedDuration: 2,
    },
  ],

  // VW Golf - v3
  v3: [
    {
      taskType: 'battery',
      title: 'Batterie schwach',
      priority: 'high',
      description:
        'Batterie zeigt schwache Ladung. Batterietest durchführen. Ggf. Austausch erforderlich.',
      estimatedDuration: 1,
    },
    {
      taskType: 'lights',
      title: 'Scheinwerfer defekt',
      priority: 'medium',
      description: 'Rechter Abblendlicht-Scheinwerfer defekt. Leuchtmittel wechseln.',
      estimatedDuration: 0.5,
    },
  ],

  // Mercedes C200 - v4
  v4: [
    {
      taskType: 'engine_repair',
      title: 'Check Engine Lampe',
      priority: 'urgent',
      description:
        'Motorkontrollleuchte aktiv. Fehler auslesen und Diagnose durchführen. Mögliche Lambdasonde defekt.',
      estimatedDuration: 2,
    },
    {
      taskType: 'electrical',
      title: 'Elektrisches Problem',
      priority: 'medium',
      description: 'Zentralverriegelung funktioniert sporadisch. Elektronik prüfen.',
      estimatedDuration: 1.5,
    },
  ],

  // Audi Q5 - v5
  v5: [
    {
      taskType: 'suspension',
      title: 'Fahrwerk Geräusche',
      priority: 'high',
      description:
        'Klopfgeräusche beim Fahren über Unebenheiten. Stoßdämpfer und Querlenker prüfen.',
      estimatedDuration: 3,
    },
    {
      taskType: 'oil_change',
      title: 'Inspektion fällig',
      priority: 'medium',
      description: 'Jährliche Inspektion. Ölwechsel, Filter, Flüssigkeiten prüfen.',
      estimatedDuration: 2,
      nextServiceDue: '2025-01-10',
    },
  ],

  // BMW X5 - v6
  v6: [
    {
      taskType: 'brake_repair',
      title: 'Bremsen quietschen',
      priority: 'medium',
      description: 'Bremsgeräusche vorne. Bremsbeläge und Bremsscheiben prüfen.',
      estimatedDuration: 2,
    },
    {
      taskType: 'tire_rotation',
      title: 'Reifenprofil niedrig',
      priority: 'high',
      description: 'Vorderreifen haben weniger als 3mm Profil. Neue Reifen montieren.',
      estimatedDuration: 1,
    },
  ],

  // VW Passat - v7
  v7: [
    {
      taskType: 'transmission',
      title: 'Getriebe ruckelt',
      priority: 'urgent',
      description:
        'DSG Getriebe schaltet unrund. Getriebeöl prüfen. Mechatronik-Diagnose durchführen.',
      estimatedDuration: 3,
    },
  ],

  // Porsche 911 - v8
  v8: [
    {
      taskType: 'paint',
      title: 'Lackschaden Tür',
      priority: 'low',
      description: 'Kratzer an der Fahrertür. Lackierung ausbessern und polieren.',
      estimatedDuration: 4,
    },
    {
      taskType: 'cleaning',
      title: 'Innenreinigung',
      priority: 'low',
      description: 'Komplette Innenraumaufbereitung. Lederpflege, Polsterreinigung.',
      estimatedDuration: 3,
    },
  ],

  // Tesla Model 3 - v9
  v9: [
    {
      taskType: 'electrical',
      title: 'Software Update',
      priority: 'medium',
      description: 'Tesla Software Update verfügbar. System-Check durchführen.',
      estimatedDuration: 1,
    },
    {
      taskType: 'tire_rotation',
      title: 'Reifen rotieren',
      priority: 'medium',
      description: 'Reifenwechsel für gleichmäßigen Verschleiß. Profil prüfen.',
      estimatedDuration: 1,
    },
  ],

  // Ford Focus - v10
  v10: [
    {
      taskType: 'exhaust',
      title: 'Auspuff laut',
      priority: 'high',
      description: 'Auspuffanlage undicht. Mitteltopf defekt. Austausch erforderlich.',
      estimatedDuration: 2,
    },
    {
      taskType: 'inspection',
      title: 'Inspektion überfällig',
      priority: 'urgent',
      description: 'Service überfällig. Vollständige Wartung durchführen.',
      estimatedDuration: 2,
    },
  ],
};

/**
 * Get the most urgent/important service issue for a vehicle
 */
export const getPrimaryServiceIssue = (vehicleId: string): VehicleServiceIssue | null => {
  const issues = vehicleServiceHistory[vehicleId];
  if (!issues || issues.length === 0) return null;

  // Sort by priority: urgent > high > medium > low
  const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
  const sorted = [...issues].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return sorted[0];
};

/**
 * Get all service issues for a vehicle
 */
export const getAllServiceIssues = (vehicleId: string): VehicleServiceIssue[] => {
  return vehicleServiceHistory[vehicleId] || [];
};
