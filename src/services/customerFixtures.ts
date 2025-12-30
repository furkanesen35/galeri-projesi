import { Customer } from '../types/domain';

export const customerFixtures: Customer[] = [
  {
    id: 'cust-001',
    customerId: 'KD-2024-001',
    type: 'private',
    status: 'active',
    salutation: 'Herr',
    firstName: 'Max',
    lastName: 'Mustermann',
    gender: 'male',
    dateOfBirth: '1985-03-15',
    email: 'max.mustermann@example.de',
    phone: '+49 30 12345678',
    mobile: '+49 170 1234567',
    address: {
      street: 'Musterstraße',
      houseNumber: '123',
      postalCode: '10115',
      city: 'Berlin',
      country: 'Deutschland'
    },
    vehicleIds: ['1', '3'],
    assignedStaffId: 'staff-001',
    preferredContactMethod: 'email',
    newsletter: true,
    marketingConsent: true,
    notes: 'Stammkunde seit 2019. Bevorzugt deutsche Premiummarken.',
    tags: ['Stammkunde', 'Premium', 'BMW'],
    source: 'Empfehlung',
    activities: [
      { id: 'act-001', type: 'vehicle_purchase', title: 'BMW 3er gekauft', description: 'Kauf eines BMW 320d xDrive', date: '2024-06-15', vehicleId: '1' },
      { id: 'act-002', type: 'service', title: 'Inspektion durchgeführt', description: 'Jahresinspektion mit Ölwechsel', date: '2024-09-20', vehicleId: '1' },
      { id: 'act-003', type: 'call', title: 'Telefonat bzgl. Neuwagen', description: 'Interesse an neuem BMW 5er geäußert', date: '2024-11-10' },
    ],
    createdAt: '2019-05-10T10:00:00Z',
    updatedAt: '2024-11-10T14:30:00Z'
  },
  {
    id: 'cust-002',
    customerId: 'KD-2024-002',
    type: 'private',
    status: 'active',
    salutation: 'Frau',
    firstName: 'Erika',
    lastName: 'Musterfrau',
    gender: 'female',
    dateOfBirth: '1990-07-22',
    email: 'erika.musterfrau@example.de',
    phone: '+49 89 98765432',
    mobile: '+49 171 9876543',
    address: {
      street: 'Beispielweg',
      houseNumber: '45A',
      postalCode: '80331',
      city: 'München',
      country: 'Deutschland'
    },
    vehicleIds: ['2'],
    preferredContactMethod: 'phone',
    newsletter: true,
    marketingConsent: false,
    notes: 'Sucht kompaktes Stadtauto. Interessiert an Elektrofahrzeugen.',
    tags: ['Elektro', 'Kompakt'],
    source: 'Website',
    activities: [
      { id: 'act-004', type: 'inquiry', title: 'Anfrage Elektroauto', description: 'Online-Anfrage zu verfügbaren E-Fahrzeugen', date: '2024-10-05' },
      { id: 'act-005', type: 'visit', title: 'Showroom-Besuch', description: 'Probefahrt mit Tesla Model 3', date: '2024-10-12', vehicleId: '2' },
      { id: 'act-006', type: 'vehicle_purchase', title: 'Mercedes A-Klasse gekauft', description: 'Kauf Mercedes A 250 e', date: '2024-10-20', vehicleId: '2' },
    ],
    createdAt: '2024-10-05T09:15:00Z',
    updatedAt: '2024-10-20T16:45:00Z'
  },
  {
    id: 'cust-003',
    customerId: 'KD-2024-003',
    type: 'business',
    status: 'active',
    salutation: 'Herr',
    firstName: 'Thomas',
    lastName: 'Schmidt',
    companyName: 'Schmidt Logistik GmbH',
    gender: 'male',
    email: 'thomas.schmidt@schmidt-logistik.de',
    phone: '+49 40 11223344',
    mobile: '+49 172 1122334',
    fax: '+49 40 11223345',
    website: 'www.schmidt-logistik.de',
    address: {
      street: 'Industriestraße',
      houseNumber: '88',
      postalCode: '20457',
      city: 'Hamburg',
      country: 'Deutschland'
    },
    billingAddress: {
      street: 'Industriestraße',
      houseNumber: '88',
      postalCode: '20457',
      city: 'Hamburg',
      country: 'Deutschland'
    },
    taxId: 'DE123456789',
    commercialRegister: 'HRB 12345',
    iban: 'DE89370400440532013000',
    bic: 'COBADEFFXXX',
    bankName: 'Commerzbank',
    vehicleIds: ['4', '5'],
    assignedStaffId: 'staff-002',
    preferredContactMethod: 'email',
    newsletter: true,
    marketingConsent: true,
    creditLimit: 100000,
    paymentTermDays: 30,
    notes: 'Großkunde mit Flottenvertrag. Jährlich 5-10 Fahrzeuge.',
    tags: ['Flotte', 'Großkunde', 'B2B'],
    source: 'Messe',
    activities: [
      { id: 'act-007', type: 'vehicle_purchase', title: 'Flottenbestellung', description: '5x VW Transporter bestellt', date: '2024-01-15' },
      { id: 'act-008', type: 'document', title: 'Rahmenvertrag erneuert', description: 'Flottenrabattvertrag für 2024', date: '2024-01-20' },
      { id: 'act-009', type: 'service', title: 'Flotteninspektion', description: 'Alle 5 Fahrzeuge inspiziert', date: '2024-07-10' },
      { id: 'act-010', type: 'email', title: 'Angebot 2025 gesendet', description: 'Neues Flottenangebot für 2025', date: '2024-11-01' },
    ],
    createdAt: '2020-03-15T11:00:00Z',
    updatedAt: '2024-11-01T09:00:00Z'
  },
  {
    id: 'cust-004',
    customerId: 'KD-2024-004',
    type: 'dealer',
    status: 'active',
    salutation: 'Herr',
    firstName: 'Michael',
    lastName: 'Bauer',
    companyName: 'Autohaus Bauer',
    email: 'michael.bauer@autohaus-bauer.de',
    phone: '+49 711 5544332',
    mobile: '+49 173 5544332',
    website: 'www.autohaus-bauer.de',
    address: {
      street: 'Automobilstraße',
      houseNumber: '10',
      postalCode: '70173',
      city: 'Stuttgart',
      country: 'Deutschland'
    },
    taxId: 'DE987654321',
    commercialRegister: 'HRB 54321',
    iban: 'DE12500105170648489890',
    bic: 'INGDDEFFXXX',
    bankName: 'ING-DiBa',
    vehicleIds: [],
    preferredContactMethod: 'phone',
    newsletter: false,
    marketingConsent: true,
    creditLimit: 250000,
    paymentTermDays: 14,
    notes: 'Händler-Partner. Kauft regelmäßig Gebrauchtwagen auf.',
    tags: ['Händler', 'B2B', 'Gebrauchtwagen'],
    source: 'Branchenkontakt',
    activities: [
      { id: 'act-011', type: 'vehicle_purchase', title: '3 Fahrzeuge gekauft', description: 'Ankauf von 3 Gebrauchtwagen', date: '2024-08-20' },
      { id: 'act-012', type: 'call', title: 'Preisverhandlung', description: 'Verhandlung über Ankaufspreise', date: '2024-09-15' },
    ],
    createdAt: '2021-06-20T14:00:00Z',
    updatedAt: '2024-09-15T11:30:00Z'
  },
  {
    id: 'cust-005',
    customerId: 'KD-2024-005',
    type: 'private',
    status: 'lead',
    salutation: 'Frau',
    firstName: 'Anna',
    lastName: 'Weber',
    gender: 'female',
    dateOfBirth: '1978-11-30',
    email: 'anna.weber@email.de',
    phone: '+49 221 6677889',
    mobile: '+49 176 6677889',
    address: {
      street: 'Kölner Straße',
      houseNumber: '77',
      postalCode: '50667',
      city: 'Köln',
      country: 'Deutschland'
    },
    vehicleIds: [],
    preferredContactMethod: 'email',
    newsletter: true,
    marketingConsent: true,
    notes: 'Erstkontakt über Newsletter. Sucht Familien-SUV.',
    tags: ['Lead', 'SUV', 'Familie'],
    source: 'Newsletter',
    activities: [
      { id: 'act-013', type: 'inquiry', title: 'Newsletter-Anmeldung', description: 'Über Website angemeldet', date: '2024-11-20' },
      { id: 'act-014', type: 'email', title: 'Willkommens-E-Mail', description: 'Automatische Willkommens-E-Mail gesendet', date: '2024-11-20' },
    ],
    createdAt: '2024-11-20T08:30:00Z',
    updatedAt: '2024-11-20T08:30:00Z'
  },
  {
    id: 'cust-006',
    customerId: 'KD-2024-006',
    type: 'private',
    status: 'active',
    salutation: 'Herr',
    firstName: 'Hans',
    lastName: 'Müller',
    gender: 'male',
    dateOfBirth: '1965-04-12',
    email: 'hans.mueller@web.de',
    phone: '+49 69 1234567',
    address: {
      street: 'Frankfurter Allee',
      houseNumber: '200',
      postalCode: '60486',
      city: 'Frankfurt am Main',
      country: 'Deutschland'
    },
    vehicleIds: ['6'],
    preferredContactMethod: 'phone',
    newsletter: false,
    marketingConsent: false,
    notes: 'Langjähriger Kunde. Bevorzugt persönliche Beratung vor Ort.',
    tags: ['Stammkunde', 'Oldtimer'],
    source: 'Empfehlung',
    activities: [
      { id: 'act-015', type: 'vehicle_purchase', title: 'Porsche 911 gekauft', description: 'Klassiker Porsche 911 Carrera', date: '2023-05-10', vehicleId: '6' },
      { id: 'act-016', type: 'service', title: 'Wartung Klassiker', description: 'Jährliche Wartung Porsche', date: '2024-05-10', vehicleId: '6' },
      { id: 'act-017', type: 'visit', title: 'Showroom-Besuch', description: 'Interesse an weiterem Klassiker', date: '2024-10-25' },
    ],
    createdAt: '2018-02-14T10:00:00Z',
    updatedAt: '2024-10-25T15:00:00Z'
  },
  {
    id: 'cust-007',
    customerId: 'KD-2024-007',
    type: 'business',
    status: 'active',
    salutation: 'Frau',
    firstName: 'Sabine',
    lastName: 'Klein',
    companyName: 'Klein & Partner Rechtsanwälte',
    email: 'sabine.klein@klein-partner.de',
    phone: '+49 211 9988776',
    mobile: '+49 175 9988776',
    address: {
      street: 'Königsallee',
      houseNumber: '50',
      postalCode: '40212',
      city: 'Düsseldorf',
      country: 'Deutschland'
    },
    taxId: 'DE555666777',
    vehicleIds: ['7'],
    assignedStaffId: 'staff-001',
    preferredContactMethod: 'email',
    newsletter: true,
    marketingConsent: true,
    creditLimit: 50000,
    paymentTermDays: 14,
    notes: 'Kanzlei mit 3 Partnern. Interesse an Premiumfahrzeugen.',
    tags: ['B2B', 'Premium', 'Dienstwagen'],
    source: 'Google Ads',
    activities: [
      { id: 'act-018', type: 'inquiry', title: 'Online-Anfrage', description: 'Anfrage über Google Ads Kampagne', date: '2024-09-01' },
      { id: 'act-019', type: 'visit', title: 'Beratungstermin', description: 'Vorstellung Dienstwagenoptionen', date: '2024-09-10' },
      { id: 'act-020', type: 'vehicle_purchase', title: 'Audi A6 Dienstwagen', description: 'Leasing Audi A6 50 TDI quattro', date: '2024-09-25', vehicleId: '7' },
    ],
    createdAt: '2024-09-01T11:00:00Z',
    updatedAt: '2024-09-25T16:00:00Z'
  },
  {
    id: 'cust-008',
    customerId: 'KD-2024-008',
    type: 'private',
    status: 'inactive',
    salutation: 'Herr',
    firstName: 'Peter',
    lastName: 'Wagner',
    gender: 'male',
    dateOfBirth: '1955-08-20',
    email: 'peter.wagner@gmx.de',
    phone: '+49 351 1122334',
    address: {
      street: 'Dresdner Straße',
      houseNumber: '15',
      postalCode: '01067',
      city: 'Dresden',
      country: 'Deutschland'
    },
    vehicleIds: [],
    preferredContactMethod: 'mail',
    newsletter: false,
    marketingConsent: false,
    notes: 'Ehemaliger Kunde. Ist ins Ausland verzogen.',
    tags: ['Inaktiv'],
    source: 'Laufkundschaft',
    activities: [
      { id: 'act-021', type: 'vehicle_sale', title: 'Fahrzeug verkauft', description: 'Hat uns seinen VW Passat verkauft', date: '2022-03-15' },
      { id: 'act-022', type: 'note', title: 'Statusänderung', description: 'Kunde ins Ausland verzogen, als inaktiv markiert', date: '2023-06-01' },
    ],
    createdAt: '2022-03-15T09:00:00Z',
    updatedAt: '2023-06-01T10:00:00Z'
  },
  {
    id: 'cust-009',
    customerId: 'KD-2024-009',
    type: 'private',
    status: 'lead',
    salutation: 'Herr',
    firstName: 'Markus',
    lastName: 'Fischer',
    gender: 'male',
    email: 'markus.fischer@outlook.de',
    mobile: '+49 177 2233445',
    address: {
      street: 'Leipziger Platz',
      houseNumber: '8',
      postalCode: '04109',
      city: 'Leipzig',
      country: 'Deutschland'
    },
    vehicleIds: [],
    preferredContactMethod: 'phone',
    newsletter: true,
    marketingConsent: true,
    notes: 'Junger Interessent. Sucht ersten eigenen Neuwagen.',
    tags: ['Lead', 'Erstkäufer', 'Jung'],
    source: 'Instagram',
    activities: [
      { id: 'act-023', type: 'inquiry', title: 'Instagram-Anfrage', description: 'DM über Instagram erhalten', date: '2024-12-01' },
      { id: 'act-024', type: 'call', title: 'Rückruf', description: 'Telefonische Beratung zu Finanzierungsoptionen', date: '2024-12-02' },
    ],
    createdAt: '2024-12-01T14:00:00Z',
    updatedAt: '2024-12-02T11:00:00Z'
  },
  {
    id: 'cust-010',
    customerId: 'KD-2024-010',
    type: 'business',
    status: 'active',
    salutation: 'Herr',
    firstName: 'Robert',
    lastName: 'Hoffmann',
    companyName: 'Hoffmann Immobilien AG',
    email: 'r.hoffmann@hoffmann-immo.de',
    phone: '+49 30 99887766',
    mobile: '+49 174 9988776',
    website: 'www.hoffmann-immobilien.de',
    address: {
      street: 'Kurfürstendamm',
      houseNumber: '120',
      postalCode: '10711',
      city: 'Berlin',
      country: 'Deutschland'
    },
    taxId: 'DE111222333',
    commercialRegister: 'HRB 98765',
    iban: 'DE45500105175523456789',
    bic: 'INGDDEFFXXX',
    bankName: 'ING-DiBa',
    vehicleIds: ['8', '9'],
    assignedStaffId: 'staff-003',
    preferredContactMethod: 'email',
    newsletter: true,
    marketingConsent: true,
    creditLimit: 200000,
    paymentTermDays: 30,
    notes: 'VIP-Kunde. CEO bestellt persönlich. Nur Premium-Marken.',
    tags: ['VIP', 'Premium', 'Großkunde', 'B2B'],
    source: 'Empfehlung',
    activities: [
      { id: 'act-025', type: 'vehicle_purchase', title: 'Range Rover bestellt', description: 'Range Rover Sport P530', date: '2024-04-10', vehicleId: '8' },
      { id: 'act-026', type: 'vehicle_purchase', title: 'Mercedes S-Klasse', description: 'S 580 4MATIC', date: '2024-07-20', vehicleId: '9' },
      { id: 'act-027', type: 'service', title: 'VIP-Service', description: 'Hol- und Bringservice für Inspektion', date: '2024-10-05', vehicleId: '8' },
      { id: 'act-028', type: 'email', title: 'Weihnachtsgruß', description: 'Personalisierter Weihnachtsgruß gesendet', date: '2024-12-20' },
    ],
    createdAt: '2023-01-10T10:00:00Z',
    updatedAt: '2024-12-20T09:00:00Z'
  },
];

// Helper function to get customer by ID
export const getCustomerById = (id: string): Customer | undefined => {
  return customerFixtures.find(c => c.id === id);
};

// Helper function to get customers by vehicle ID
export const getCustomersByVehicleId = (vehicleId: string): Customer[] => {
  return customerFixtures.filter(c => c.vehicleIds.includes(vehicleId));
};

// Helper function to get customers by type
export const getCustomersByType = (type: Customer['type']): Customer[] => {
  return customerFixtures.filter(c => c.type === type);
};

// Helper function to get customers by status
export const getCustomersByStatus = (status: Customer['status']): Customer[] => {
  return customerFixtures.filter(c => c.status === status);
};

// Statistics
export const getCustomerStats = () => {
  const total = customerFixtures.length;
  const active = customerFixtures.filter(c => c.status === 'active').length;
  const leads = customerFixtures.filter(c => c.status === 'lead').length;
  const business = customerFixtures.filter(c => c.type === 'business').length;
  const dealers = customerFixtures.filter(c => c.type === 'dealer').length;
  const private_ = customerFixtures.filter(c => c.type === 'private').length;
  
  return {
    total,
    active,
    leads,
    inactive: total - active - leads,
    business,
    dealers,
    private: private_,
  };
};
