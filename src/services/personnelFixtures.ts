import { Personnel } from '../types/domain';

/**
 * Mock Personnel/Staff Data with Availability Information
 * Verfügbarkeit (Availability) includes current task assignments and schedule
 */
export const personnelFixtures: Personnel[] = [
  {
    id: 'p1',
    employeeId: 'EMP-2024-001',
    firstName: 'Anna',
    lastName: 'Schmidt',
    fullName: 'Anna Schmidt',
    role: 'Kfz-Mechatronikerin',
    specializations: ['engine_repair', 'electrical', 'inspection'],
    email: 'anna.schmidt@autohaus.de',
    phone: '+49 30 12345601',
    status: 'available',
    availability: {
      isAvailable: true,
      currentTask: null,
      nextAvailableSlot: new Date().toISOString(),
      schedule: {
        monday: { start: '08:00', end: '17:00' },
        tuesday: { start: '08:00', end: '17:00' },
        wednesday: { start: '08:00', end: '17:00' },
        thursday: { start: '08:00', end: '17:00' },
        friday: { start: '08:00', end: '16:00' },
      }
    },
    image: 'https://i.pravatar.cc/150?img=1',
    hireDate: '2018-03-15',
    certifications: ['TÜV-Prüfer', 'Hochvolt-Qualifizierung'],
  },
  {
    id: 'p2',
    employeeId: 'EMP-2024-002',
    firstName: 'Max',
    lastName: 'Müller',
    fullName: 'Max Müller',
    role: 'Kfz-Mechaniker',
    specializations: ['brake_repair', 'tire_rotation', 'suspension', 'oil_change'],
    email: 'max.mueller@autohaus.de',
    phone: '+49 30 12345602',
    status: 'busy',
    availability: {
      isAvailable: false,
      currentTask: 'Bremsen vorne wechseln - Audi A4',
      nextAvailableSlot: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      schedule: {
        monday: { start: '07:00', end: '16:00' },
        tuesday: { start: '07:00', end: '16:00' },
        wednesday: { start: '07:00', end: '16:00' },
        thursday: { start: '07:00', end: '16:00' },
        friday: { start: '07:00', end: '15:00' },
      }
    },
    image: 'https://i.pravatar.cc/150?img=12',
    hireDate: '2019-06-01',
    certifications: ['Bremsspezialist', 'Fahrwerks-Experte'],
  },
  {
    id: 'p3',
    employeeId: 'EMP-2024-003',
    firstName: 'Lena',
    lastName: 'Weber',
    fullName: 'Lena Weber',
    role: 'Kfz-Servicetechnikerin',
    specializations: ['oil_change', 'tire_rotation', 'ac_repair', 'battery', 'cleaning'],
    email: 'lena.weber@autohaus.de',
    phone: '+49 30 12345603',
    status: 'available',
    availability: {
      isAvailable: true,
      currentTask: null,
      nextAvailableSlot: new Date().toISOString(),
      schedule: {
        monday: { start: '08:00', end: '17:00' },
        tuesday: { start: '08:00', end: '17:00' },
        wednesday: { start: '08:00', end: '17:00' },
        thursday: { start: '08:00', end: '17:00' },
        friday: { start: '08:00', end: '17:00' },
      }
    },
    image: 'https://i.pravatar.cc/150?img=5',
    hireDate: '2020-09-10',
    certifications: ['Klimaanlagen-Spezialist', 'Kundenservice Excellence'],
  },
  {
    id: 'p4',
    employeeId: 'EMP-2024-004',
    firstName: 'Thomas',
    lastName: 'Becker',
    fullName: 'Thomas Becker',
    role: 'Karosserie- und Lackierer',
    specializations: ['bodywork', 'paint', 'glass_repair'],
    email: 'thomas.becker@autohaus.de',
    phone: '+49 30 12345604',
    status: 'available',
    availability: {
      isAvailable: true,
      currentTask: null,
      nextAvailableSlot: new Date().toISOString(),
      schedule: {
        monday: { start: '07:30', end: '16:30' },
        tuesday: { start: '07:30', end: '16:30' },
        wednesday: { start: '07:30', end: '16:30' },
        thursday: { start: '07:30', end: '16:30' },
        friday: { start: '07:30', end: '14:30' },
      }
    },
    image: 'https://i.pravatar.cc/150?img=8',
    hireDate: '2017-02-20',
    certifications: ['Lackierer-Meister', 'Unfallinstandsetzung'],
  },
  {
    id: 'p5',
    employeeId: 'EMP-2024-005',
    firstName: 'Sarah',
    lastName: 'Fischer',
    fullName: 'Sarah Fischer',
    role: 'Kfz-Mechatronikerin',
    specializations: ['electrical', 'engine_repair', 'transmission', 'inspection'],
    email: 'sarah.fischer@autohaus.de',
    phone: '+49 30 12345605',
    status: 'busy',
    availability: {
      isAvailable: false,
      currentTask: 'Motordiagnose - Mercedes C200',
      nextAvailableSlot: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours from now
      schedule: {
        monday: { start: '08:00', end: '17:00' },
        tuesday: { start: '08:00', end: '17:00' },
        wednesday: { start: '08:00', end: '17:00' },
        thursday: { start: '08:00', end: '17:00' },
        friday: { start: '08:00', end: '16:00' },
      }
    },
    image: 'https://i.pravatar.cc/150?img=9',
    hireDate: '2019-11-05',
    certifications: ['Diagnose-Spezialist', 'Hochvolt-Qualifizierung', 'Mercedes Certified'],
  },
  {
    id: 'p6',
    employeeId: 'EMP-2024-006',
    firstName: 'Michael',
    lastName: 'Hoffmann',
    fullName: 'Michael Hoffmann',
    role: 'Kfz-Mechaniker',
    specializations: ['exhaust', 'suspension', 'steering', 'brake_repair'],
    email: 'michael.hoffmann@autohaus.de',
    phone: '+49 30 12345606',
    status: 'available',
    availability: {
      isAvailable: true,
      currentTask: null,
      nextAvailableSlot: new Date().toISOString(),
      schedule: {
        tuesday: { start: '07:00', end: '16:00' },
        wednesday: { start: '07:00', end: '16:00' },
        thursday: { start: '07:00', end: '16:00' },
        friday: { start: '07:00', end: '16:00' },
        saturday: { start: '08:00', end: '12:00' },
      }
    },
    image: 'https://i.pravatar.cc/150?img=15',
    hireDate: '2021-01-15',
    certifications: ['Abgasuntersuchung', 'Fahrwerks-Spezialist'],
  },
  {
    id: 'p7',
    employeeId: 'EMP-2024-007',
    firstName: 'Julia',
    lastName: 'Klein',
    fullName: 'Julia Klein',
    role: 'Kfz-Servicetechnikerin',
    specializations: ['interior', 'cleaning', 'lights', 'battery'],
    email: 'julia.klein@autohaus.de',
    phone: '+49 30 12345607',
    status: 'on_leave',
    availability: {
      isAvailable: false,
      currentTask: 'Urlaub bis 05.01.2025',
      nextAvailableSlot: new Date('2025-01-06T08:00:00').toISOString(),
      schedule: {
        monday: { start: '09:00', end: '18:00' },
        tuesday: { start: '09:00', end: '18:00' },
        wednesday: { start: '09:00', end: '18:00' },
        thursday: { start: '09:00', end: '18:00' },
        friday: { start: '09:00', end: '17:00' },
      }
    },
    image: 'https://i.pravatar.cc/150?img=10',
    hireDate: '2022-04-01',
    certifications: ['Fahrzeugaufbereitung', 'Innenraum-Spezialist'],
  },
  {
    id: 'p8',
    employeeId: 'EMP-2024-008',
    firstName: 'Daniel',
    lastName: 'Schneider',
    fullName: 'Daniel Schneider',
    role: 'Werkstattleiter',
    specializations: ['general', 'inspection', 'engine_repair', 'transmission'],
    email: 'daniel.schneider@autohaus.de',
    phone: '+49 30 12345608',
    status: 'available',
    availability: {
      isAvailable: true,
      currentTask: null,
      nextAvailableSlot: new Date().toISOString(),
      schedule: {
        monday: { start: '07:00', end: '17:00' },
        tuesday: { start: '07:00', end: '17:00' },
        wednesday: { start: '07:00', end: '17:00' },
        thursday: { start: '07:00', end: '17:00' },
        friday: { start: '07:00', end: '16:00' },
      }
    },
    image: 'https://i.pravatar.cc/150?img=13',
    hireDate: '2015-08-01',
    certifications: ['Kfz-Meister', 'Werkstattmanagement', 'TÜV-Prüfer'],
  },
];

/**
 * Helper function to get available personnel for a specific task type
 */
export const getAvailablePersonnelForTask = (taskType: string): Personnel[] => {
  return personnelFixtures.filter(person => 
    person.status === 'available' && 
    person.specializations.includes(taskType as any)
  );
};

/**
 * Helper function to get all available personnel regardless of specialization
 */
export const getAvailablePersonnel = (): Personnel[] => {
  return personnelFixtures.filter(person => person.status === 'available');
};

/**
 * Helper function to get personnel by ID
 */
export const getPersonnelById = (id: string): Personnel | undefined => {
  return personnelFixtures.find(person => person.id === id);
};
