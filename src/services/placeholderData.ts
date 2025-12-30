/**
 * Placeholder data for proof of concept
 * This simulates dealer profile, client/buyer info, and pre-filled data
 */

// ============ DEALER/SELLER PROFILE ============
export const dealerProfile = {
  // Company Info
  companyName: "Premium Autohaus München GmbH",
  companyType: "GmbH",

  // Address
  street: "Leopoldstraße 245",
  postalCode: "80807",
  city: "München",
  country: "Deutschland",

  // Contact
  phone: "+49 89 123456-0",
  fax: "+49 89 123456-99",
  email: "verkauf@premium-autohaus.de",
  website: "www.premium-autohaus.de",

  // Business Details
  taxId: "DE123456789",
  commercialRegister: "HRB 123456",
  court: "Amtsgericht München",
  ustId: "DE 123456789",

  // Bank Details
  bankName: "Stadtsparkasse München",
  iban: "DE89 3705 0198 1234 5678 90",
  bic: "SSKMDEMMXXX",

  // Representative
  representative: {
    name: "Thomas Müller",
    position: "Geschäftsführer",
    phone: "+49 89 123456-10",
    email: "t.mueller@premium-autohaus.de",
  },

  // Sales Representative
  salesRep: {
    name: "Sarah Schmidt",
    position: "Verkaufsberaterin",
    phone: "+49 89 123456-25",
    email: "s.schmidt@premium-autohaus.de",
    employeeId: "EMP-2024-025",
  },
};

// ============ BUYER/CLIENT PROFILES (Multiple options) ============

// Helper function to create buyer profiles
export const buyerProfiles = [
  {
    id: "buyer-001",
    // Personal Info
    type: "private", // or 'company'
    salutation: "Herr",
    firstName: "Michael",
    lastName: "Wagner",
    fullName: "Michael Wagner",
    dateOfBirth: "1985-06-15",

    // Address
    street: "Sonnenstraße 12",
    postalCode: "80331",
    city: "München",
    country: "Deutschland",

    // Contact
    phone: "+49 176 12345678",
    mobile: "+49 176 12345678",
    email: "michael.wagner@email.de",

    // ID Document
    idType: "personalausweis",
    idNumber: "L01X234567",
    idIssuedBy: "Stadt München",
    idIssuedDate: "2020-03-15",
    idExpiryDate: "2030-03-14",

    // Driver's License
    driverLicenseNumber: "B1234567890",
    driverLicenseClass: "B",
    driverLicenseIssueDate: "2003-08-20",

    // Bank Details (for financing)
    bankName: "Commerzbank München",
    iban: "DE89 3704 0044 0532 0130 00",
    bic: "COBADEFFXXX",

    // Employment
    occupation: "IT-Berater",
    employer: "TechConsult GmbH",
    monthlyIncome: 4500,
    employmentType: "Festanstellung",
    employmentSince: "2015-09-01",

    // Additional
    taxId: "DE987654321",
    maritalStatus: "verheiratet",
    nationality: "Deutsch",
  },
  {
    id: "buyer-002",
    type: "private",
    salutation: "Frau",
    firstName: "Anna",
    lastName: "Müller",
    fullName: "Anna Müller",
    dateOfBirth: "1990-08-22",

    street: "Karlstraße 45",
    postalCode: "80333",
    city: "München",
    country: "Deutschland",

    phone: "+49 151 98765432",
    mobile: "+49 151 98765432",
    email: "anna.mueller@example.com",

    idType: "personalausweis",
    idNumber: "L03Z456789",
    idIssuedBy: "Stadt München",
    idIssuedDate: "2019-05-10",
    idExpiryDate: "2029-05-09",

    driverLicenseNumber: "B2345678901",
    driverLicenseClass: "B",
    driverLicenseIssueDate: "2008-09-15",

    bankName: "Sparkasse München",
    iban: "DE89 7015 0000 1234 5678 90",
    bic: "SSKMDEMMXXX",

    occupation: "Ärztin",
    employer: "Klinikum München",
    monthlyIncome: 6200,
    employmentType: "Festanstellung",
    employmentSince: "2016-04-01",

    taxId: "DE876543210",
    maritalStatus: "ledig",
    nationality: "Deutsch",
  },
  {
    id: "buyer-003",
    type: "private",
    salutation: "Herr",
    firstName: "Thomas",
    lastName: "Schmidt",
    fullName: "Thomas Schmidt",
    dateOfBirth: "1978-03-12",

    street: "Goethestraße 88",
    postalCode: "80336",
    city: "München",
    country: "Deutschland",

    phone: "+49 170 11223344",
    mobile: "+49 170 11223344",
    email: "t.schmidt@mail.de",

    idType: "personalausweis",
    idNumber: "L04A567890",
    idIssuedBy: "Stadt München",
    idIssuedDate: "2018-11-20",
    idExpiryDate: "2028-11-19",

    driverLicenseNumber: "B3456789012",
    driverLicenseClass: "B",
    driverLicenseIssueDate: "1996-07-10",

    bankName: "HypoVereinsbank München",
    iban: "DE89 7002 0270 1234 5678 90",
    bic: "HYVEDEMMXXX",

    occupation: "Architekt",
    employer: "Schmidt & Partner",
    monthlyIncome: 5800,
    employmentType: "Selbstständig",
    employmentSince: "2005-01-15",

    taxId: "DE765432109",
    maritalStatus: "verheiratet",
    nationality: "Deutsch",
  },
  {
    id: "buyer-004",
    type: "private",
    salutation: "Herr",
    firstName: "Oliver",
    lastName: "Becker",
    fullName: "Oliver Becker",
    dateOfBirth: "1992-11-05",

    street: "Ludwigstraße 156",
    postalCode: "80539",
    city: "München",
    country: "Deutschland",

    phone: "+49 162 55667788",
    mobile: "+49 162 55667788",
    email: "oliver.becker@web.de",

    idType: "personalausweis",
    idNumber: "L05B678901",
    idIssuedBy: "Stadt München",
    idIssuedDate: "2021-02-14",
    idExpiryDate: "2031-02-13",

    driverLicenseNumber: "B4567890123",
    driverLicenseClass: "B",
    driverLicenseIssueDate: "2010-12-01",

    bankName: "Postbank München",
    iban: "DE89 7601 0085 1234 5678 90",
    bic: "PBNKDEFFXXX",

    occupation: "Softwareentwickler",
    employer: "BMW Group",
    monthlyIncome: 5200,
    employmentType: "Festanstellung",
    employmentSince: "2018-08-01",

    taxId: "DE654321098",
    maritalStatus: "ledig",
    nationality: "Deutsch",
  },
  {
    id: "buyer-005",
    type: "private",
    salutation: "Frau",
    firstName: "Sophie",
    lastName: "Weber",
    fullName: "Sophie Weber",
    dateOfBirth: "1988-07-18",

    street: "Schillerstraße 22",
    postalCode: "80336",
    city: "München",
    country: "Deutschland",

    phone: "+49 175 99887766",
    mobile: "+49 175 99887766",
    email: "sophie.weber@gmail.com",

    idType: "personalausweis",
    idNumber: "L06C789012",
    idIssuedBy: "Stadt München",
    idIssuedDate: "2020-09-25",
    idExpiryDate: "2030-09-24",

    driverLicenseNumber: "B5678901234",
    driverLicenseClass: "B",
    driverLicenseIssueDate: "2006-11-22",

    bankName: "Deutsche Bank München",
    iban: "DE89 7007 0010 9876 5432 10",
    bic: "DEUTDEMMXXX",

    occupation: "Marketing Managerin",
    employer: "Siemens AG",
    monthlyIncome: 4800,
    employmentType: "Festanstellung",
    employmentSince: "2014-03-01",

    taxId: "DE543210987",
    maritalStatus: "verheiratet",
    nationality: "Deutsch",
  }
];

// Keep backward compatibility - default buyer profile is the first one
export const buyerProfile = buyerProfiles[0];

// ============ ALTERNATIVE BUYER (Company) ============
export const companyBuyerProfiles = [
  {
    id: "company-001",
    type: "company",
    companyName: "TechConsult GmbH",
    companyType: "GmbH",

    // Address
    street: "Maximilianstraße 35",
    postalCode: "80539",
    city: "München",
    country: "Deutschland",

    // Contact
    phone: "+49 89 987654-0",
    email: "einkauf@techconsult.de",

    // Business Details
    taxId: "DE987654321",
    ustId: "DE 987654321",
    commercialRegister: "HRB 987654",
    court: "Amtsgericht München",

    // Bank Details
    bankName: "Deutsche Bank München",
    iban: "DE89 7007 0010 0123 4567 89",
    bic: "DEUTDEMMXXX",

    // Representative
    representative: {
      name: "Dr. Klaus Schneider",
      position: "Geschäftsführer",
      phone: "+49 89 987654-10",
      email: "k.schneider@techconsult.de",
      dateOfBirth: "1970-04-20",
      idType: "personalausweis",
      idNumber: "L02Y345678",
    },
  },
  {
    id: "company-002",
    type: "company",
    companyName: "Bauer Bauunternehmen AG",
    companyType: "AG",

    street: "Industriestraße 120",
    postalCode: "80807",
    city: "München",
    country: "Deutschland",

    phone: "+49 89 456789-0",
    email: "verwaltung@bauer-bau.de",

    taxId: "DE876543210",
    ustId: "DE 876543210",
    commercialRegister: "HRB 876543",
    court: "Amtsgericht München",

    bankName: "UniCredit Bank München",
    iban: "DE89 7002 0270 9876 5432 10",
    bic: "HYVEDEMM473",

    representative: {
      name: "Markus Bauer",
      position: "Vorstand",
      phone: "+49 89 456789-11",
      email: "m.bauer@bauer-bau.de",
      dateOfBirth: "1965-09-14",
      idType: "personalausweis",
      idNumber: "L07D890123",
    },
  },
  {
    id: "company-003",
    type: "company",
    companyName: "MedTech Solutions GmbH",
    companyType: "GmbH",

    street: "Sendlinger Straße 78",
    postalCode: "80331",
    city: "München",
    country: "Deutschland",

    phone: "+49 89 321654-0",
    email: "info@medtech-solutions.de",

    taxId: "DE765432109",
    ustId: "DE 765432109",
    commercialRegister: "HRB 765432",
    court: "Amtsgericht München",

    bankName: "Commerzbank München",
    iban: "DE89 7004 0060 8765 4321 00",
    bic: "COBADEFFXXX",

    representative: {
      name: "Dr. Sarah Klein",
      position: "Geschäftsführerin",
      phone: "+49 89 321654-12",
      email: "s.klein@medtech-solutions.de",
      dateOfBirth: "1980-12-05",
      idType: "personalausweis",
      idNumber: "L08E901234",
    },
  }
];

// Keep backward compatibility
export const companyBuyerProfile = companyBuyerProfiles[0];

// ============ CAR BEING SOLD ============
export const carForSale = {
  // Basic Info
  id: "veh-001",
  brand: "BMW",
  model: "320d Touring",
  variant: "M Sport",

  // Technical Data
  vin: "WBA12345678901234",
  licensePlate: "M-AB 1234",
  firstRegistration: "2021-03-15",
  registrationDocument: "Teil I & II vorhanden",

  // Engine & Performance
  fuelType: "Diesel",
  engineSize: 1995,
  engineSizeDisplay: "2.0",
  power: 140, // kW
  powerPS: 190,
  powerDisplay: "140 kW (190 PS)",

  // Transmission & Drive
  transmission: "automatic",
  transmissionDisplay: "Automatik",
  gears: 8,
  driveType: "Hinterradantrieb",

  // Mileage & Condition
  mileage: 45000,
  mileageDisplay: "45.000 km",
  condition: "Sehr gut",
  previousOwners: 1,

  // Exterior
  color: "Alpinweiß III",
  colorType: "Metallic",
  colorCode: "300",
  bodyType: "Kombi",
  doors: 5,
  seats: 5,

  // Interior
  interiorColor: "Schwarz",
  interiorMaterial: "Leder Vernasca",
  interiorCondition: "Sehr gut",

  // Dimensions & Weight
  length: 4709,
  width: 1827,
  height: 1440,
  wheelbase: 2851,
  weight: 1620,
  maxWeight: 2180,
  trunkVolume: 500,

  // Consumption & Environment
  consumptionCombined: 4.5,
  co2Emission: 119,
  emissionClass: "Euro 6d",
  environmentalBadge: "Grün (4)",

  // Technical Inspection
  tuv: "2025-03-31",
  tuvStatus: "Gültig",
  lastService: "2024-10-15",
  nextServiceDue: "2025-10-15",

  // Features (Ausstattung)
  features: [
    "M Sportpaket",
    "Navigationssystem Professional",
    "LED-Scheinwerfer",
    "Panorama-Glasdach",
    "Lederausstattung Vernasca",
    "Sitzheizung vorne",
    "Klimaautomatik 2-Zonen",
    "Tempomat mit Bremsfunktion",
    "Parking Assistant Plus",
    "Harman Kardon Surround Sound",
    "Driving Assistant Professional",
    "Head-Up Display",
    "Elektrische Heckklappe",
    "Ambientelicht",
    "Spurverlassenswarnung",
    "Totwinkel-Assistent",
  ],

  // Price Information
  purchasePrice: 32500, // What dealer paid
  targetPrice: 39900, // Selling price
  recommendedRetailPrice: 42500,
  vatReclaimable: true,

  // Documentation
  documents: {
    registration: true,
    certificateOfOwnership: true,
    serviceHistory: true,
    tuvReport: true,
    ownerManual: true,
    spareKeys: 2,
    hasFullServiceHistory: true,
    hasAccidentFree: true,
    hasNonSmoker: true,
  },

  // Additional Notes
  notes:
    "Fahrzeug in sehr gutem Zustand. Vollständig scheckheftgepflegt. Unfallfrei. Nichtraucherfahrzeug.",

  // Location
  location: "Standort München, Leopoldstraße",
  parkingSpot: "Halle B, Platz 23",

  // Status
  status: "available",
  availableFrom: "2024-12-01",
};

// ============ SALES CONTRACT PRE-FILLED DATA ============
export const salesContractData = {
  // Seller (Dealer)
  seller: {
    type: "company",
    name: dealerProfile.companyName,
    street: dealerProfile.street,
    city: `${dealerProfile.postalCode} ${dealerProfile.city}`,
    phone: dealerProfile.phone,
    email: dealerProfile.email,
    taxId: dealerProfile.taxId,
    ustId: dealerProfile.ustId,
    commercialRegister: dealerProfile.commercialRegister,
    court: dealerProfile.court,
    iban: dealerProfile.iban,
    bic: dealerProfile.bic,
    bankName: dealerProfile.bankName,
    representative: dealerProfile.representative.name,
    representativePosition: dealerProfile.representative.position,
  },

  // Buyer
  buyer: {
    type: buyerProfile.type,
    salutation: buyerProfile.salutation,
    firstName: buyerProfile.firstName,
    lastName: buyerProfile.lastName,
    fullName: buyerProfile.fullName,
    dateOfBirth: buyerProfile.dateOfBirth,
    street: buyerProfile.street,
    city: `${buyerProfile.postalCode} ${buyerProfile.city}`,
    phone: buyerProfile.phone,
    email: buyerProfile.email,
    idType: buyerProfile.idType,
    idNumber: buyerProfile.idNumber,
    driverLicenseNumber: buyerProfile.driverLicenseNumber,
    iban: buyerProfile.iban,
    bic: buyerProfile.bic,
    bankName: buyerProfile.bankName,
  },

  // Vehicle
  vehicle: {
    brand: carForSale.brand,
    model: carForSale.model,
    variant: carForSale.variant,
    vin: carForSale.vin,
    licensePlate: carForSale.licensePlate,
    firstRegistration: carForSale.firstRegistration,
    mileage: carForSale.mileage,
    color: carForSale.color,
    fuelType: carForSale.fuelType,
    power: carForSale.powerDisplay,
    transmission: carForSale.transmissionDisplay,
    tuv: carForSale.tuv,
    previousOwners: carForSale.previousOwners,
    condition: carForSale.condition,
  },

  // Price & Payment
  price: {
    salePrice: carForSale.targetPrice,
    vatIncluded: true,
    vatRate: 19,
    netPrice: Math.round(carForSale.targetPrice / 1.19),
    vatAmount: Math.round(
      carForSale.targetPrice - carForSale.targetPrice / 1.19
    ),
    paymentMethod: "bank_transfer",
    downPayment: 5000,
    remainingAmount: carForSale.targetPrice - 5000,
    paymentDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 7 days
  },

  // Handover
  handover: {
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 10 days
    location: dealerProfile.street + ", " + dealerProfile.city,
    includedDocuments: [
      "Fahrzeugbrief (Zulassungsbescheinigung Teil II)",
      "Fahrzeugschein (Zulassungsbescheinigung Teil I)",
      "TÜV-Bericht",
      "Serviceheft",
      "Bedienungsanleitung",
      "2 Schlüssel",
    ],
    accessories: [
      "Winterreifen auf Stahlfelgen (optional)",
      "Original BMW Fußmatten",
    ],
  },

  // Warranties & Guarantees
  warranty: {
    hasWarranty: true,
    warrantyType: "Gebrauchtwagen-Garantie",
    warrantyDuration: 12, // months
    warrantyProvider: "Premium Autohaus München",
    warrantyScope: "Motor, Getriebe, Fahrwerk",
    mileageLimit: 20000,
  },

  // Additional Terms
  terms: {
    tradeIn: false,
    financing: false,
    testDriveDone: true,
    vehicleInspected: true,
    accidentFree: true,
    nonSmoker: true,
  },

  // Contract Details
  contract: {
    date: new Date().toISOString().split("T")[0],
    place: dealerProfile.city,
    contractNumber: `VK-2024-${Math.floor(Math.random() * 9000) + 1000}`,
  },
};

// ============ HELPER FUNCTION ============
export const getPrefilledSalesData = () => {
  return {
    ...salesContractData,
    dealerInfo: dealerProfile,
    buyerInfo: buyerProfile,
    vehicleInfo: carForSale,
  };
};

// Export for easy access
export default {
  dealer: dealerProfile,
  buyer: buyerProfile,
  buyers: buyerProfiles, // All buyer profiles
  companyBuyer: companyBuyerProfile,
  companyBuyers: companyBuyerProfiles, // All company buyer profiles
  car: carForSale,
  salesContract: salesContractData,
  getPrefilledSalesData,
};
