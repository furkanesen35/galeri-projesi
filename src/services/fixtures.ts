/**
 * Mock Fixture Data
 * Seed data for all features in the POC
 */

export const fixtures = {
  // Dashboard fixtures
  dashboard: {
    kpis: [
      {
        id: 'totalCases',
        label: 'Total Cases',
        value: 247,
        change: 12.5,
        changeLabel: 'vs last month',
        trend: 'up' as const,
        icon: 'cases',
      },
      {
        id: 'activeEstimates',
        label: 'Active Estimates',
        value: 43,
        change: -3.2,
        changeLabel: 'vs last month',
        trend: 'down' as const,
        icon: 'estimates',
      },
      {
        id: 'totalRevenue',
        label: 'Total Revenue',
        value: 156780,
        change: 8.7,
        changeLabel: 'vs last month',
        trend: 'up' as const,
        icon: 'revenue',
        format: 'currency',
      },
      {
        id: 'avgProcessingTime',
        label: 'Avg Processing Time',
        value: 4.2,
        change: -15.3,
        changeLabel: 'vs last month',
        trend: 'up' as const,
        icon: 'time',
        format: 'days',
      },
    ],
    recentActivity: [
      {
        id: 'act-1',
        type: 'case_created',
        title: 'New case created',
        description: 'BMW 320d - Front damage assessment',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        user: 'John Doe',
      },
      {
        id: 'act-2',
        type: 'estimate_sent',
        title: 'Estimate sent to customer',
        description: 'Mercedes C-Class - €2,450',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        user: 'Sarah Miller',
      },
      {
        id: 'act-3',
        type: 'photo_uploaded',
        title: '12 photos uploaded',
        description: 'Audi A4 - Complete damage documentation',
        timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        user: 'Mike Chen',
      },
    ],
    quickStats: {
      pendingApprovals: 8,
      scheduledInspections: 15,
      overdueInvoices: 3,
      newMessages: 12,
    },
  },

  // Marketing fixtures
  marketing: {
    hero: {
      headline: 'Transform Your Damage Assessment Workflow',
      subheadline:
        'AI-powered tools, seamless integrations, and smart automation for modern auto repair shops',
      ctaPrimary: 'Start Free Trial',
      ctaSecondary: 'Watch Demo',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      backgroundImage: '/images/hero-bg.jpg',
    },
    trustLogos: [
      { id: 'logo-1', name: 'Audatex', logo: '/logos/audatex.svg' },
      { id: 'logo-2', name: 'DAT', logo: '/logos/dat.svg' },
      { id: 'logo-3', name: 'GT Motive', logo: '/logos/gtmotive.svg' },
      { id: 'logo-4', name: 'Allianz', logo: '/logos/allianz.svg' },
      { id: 'logo-5', name: 'HUK-COBURG', logo: '/logos/huk.svg' },
    ],
    testimonials: [
      {
        id: 'test-1',
        author: 'Thomas Wagner',
        role: 'Workshop Manager',
        company: 'Auto Service München',
        content:
          'autoiXpert has reduced our case processing time by 40%. The photo optimization and OCR features are game-changers.',
        rating: 5,
        avatar: '/avatars/thomas.jpg',
      },
      {
        id: 'test-2',
        author: 'Sandra Becker',
        role: 'Insurance Claims Specialist',
        company: 'Schmidt & Partner',
        content:
          'The one-click exports to Audatex and DAT save us hours every week. Highly recommended for any repair shop.',
        rating: 5,
        avatar: '/avatars/sandra.jpg',
      },
      {
        id: 'test-3',
        author: 'Michael Hoffmann',
        role: 'Owner',
        company: 'Hoffmann Karosserie',
        content:
          'Excellent software with great support. The valuation tools and Mietwagenspiegel integration are incredibly accurate.',
        rating: 5,
        avatar: '/avatars/michael.jpg',
      },
    ],
    webinars: [
      {
        id: 'web-1',
        title: 'Mastering Photo Documentation',
        date: '2024-02-15T14:00:00Z',
        duration: 60,
        speaker: 'Dr. Anna Schmidt',
        registered: false,
        recording: null,
      },
      {
        id: 'web-2',
        title: 'AI-Powered Damage Assessment',
        date: '2024-02-22T15:00:00Z',
        duration: 45,
        speaker: 'Peter Müller',
        registered: false,
        recording: null,
      },
    ],
  },

  // Cases fixtures
  cases: {
    list: [
      {
        id: 'CASE-2024-001',
        vehicleId: 'VEH-001',
        status: 'in-progress',
        title: 'BMW 320d Front Damage',
        description: 'Minor collision damage to front bumper and headlight',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-16T14:22:00Z',
        assignedTo: 'John Doe',
        priority: 'high',
        estimatedValue: 2450.0,
      },
      {
        id: 'CASE-2024-002',
        vehicleId: 'VEH-002',
        status: 'new',
        title: 'Mercedes C-Class Rear Impact',
        description: 'Rear-end collision with moderate damage',
        createdAt: '2024-01-18T09:15:00Z',
        updatedAt: '2024-01-18T09:15:00Z',
        assignedTo: 'Sarah Miller',
        priority: 'medium',
        estimatedValue: 4200.0,
      },
    ],
  },

  // Photos fixtures
  photos: {
    list: [
      {
        id: 'PHOTO-001',
        caseId: 'CASE-2024-001',
        url: '/photos/damage-001.jpg',
        thumbnail: '/photos/damage-001-thumb.jpg',
        fileName: 'front-bumper-01.jpg',
        size: 2450000,
        uploadedAt: '2024-01-15T11:00:00Z',
        tags: ['front', 'bumper', 'damage'],
        annotations: [],
      },
    ],
  },

  // Vehicles fixtures
  vehicles: {
    list: [
      {
        id: 'VEH-001',
        vin: 'WBADT43452G123456',
        licensePlate: 'M-AB 1234',
        make: 'BMW',
        model: '320d',
        year: 2020,
        color: 'Black',
        mileage: 45000,
        firstRegistration: '2020-03-15',
      },
      {
        id: 'VEH-002',
        vin: 'WDD2050081F123456',
        licensePlate: 'S-CD 5678',
        make: 'Mercedes-Benz',
        model: 'C 200',
        year: 2021,
        color: 'Silver',
        mileage: 32000,
        firstRegistration: '2021-05-20',
      },
    ],
  },

  // Valuation fixtures
  valuation: {
    sample: {
      vehicleId: 'VEH-001',
      baseValue: 28500.0,
      adjustments: [
        { factor: 'mileage', amount: -1200.0, description: 'High mileage adjustment' },
        { factor: 'condition', amount: -800.0, description: 'Minor wear and tear' },
        { factor: 'equipment', amount: 1500.0, description: 'Premium package' },
      ],
      finalValue: 28000.0,
      source: 'Schwacke',
      calculatedAt: '2024-01-15T12:00:00Z',
    },
    comparables: [
      {
        id: 'comp-1',
        make: 'BMW',
        model: '320d',
        year: 2020,
        mileage: 42000,
        price: 27800.0,
        source: 'AutoScout24',
        location: 'München',
      },
      {
        id: 'comp-2',
        make: 'BMW',
        model: '320d',
        year: 2020,
        mileage: 48000,
        price: 26900.0,
        source: 'Mobile.de',
        location: 'Stuttgart',
      },
    ],
  },

  // Exports fixtures
  exports: {
    history: [
      {
        id: 'EXP-001',
        caseId: 'CASE-2024-001',
        provider: 'Audatex',
        status: 'completed',
        exportedAt: '2024-01-16T15:30:00Z',
        exportedBy: 'John Doe',
      },
      {
        id: 'EXP-002',
        caseId: 'CASE-2024-001',
        provider: 'DAT',
        status: 'completed',
        exportedAt: '2024-01-16T15:32:00Z',
        exportedBy: 'John Doe',
      },
    ],
  },

  // Billing fixtures
  billing: {
    invoices: [
      {
        id: 'INV-2024-001',
        caseId: 'CASE-2024-001',
        invoiceNumber: 'RE-2024-001',
        amount: 2450.0,
        taxAmount: 465.5,
        totalAmount: 2915.5,
        status: 'sent',
        dueDate: '2024-02-15',
        createdAt: '2024-01-20T10:00:00Z',
        customer: 'Max Mustermann',
      },
    ],
  },
};
