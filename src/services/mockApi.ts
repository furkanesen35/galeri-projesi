/**
 * Mock API Service Layer
 * Provides simulated backend responses with realistic delays
 * All data comes from fixtures for demo/POC purposes
 */

import { fixtures } from './fixtures';

// Simulated network latency (ms)
const MOCK_DELAY_MIN = 300;
const MOCK_DELAY_MAX = 800;

// Helper to simulate network delay
const delay = (ms?: number) => {
  const delayTime = ms ?? Math.random() * (MOCK_DELAY_MAX - MOCK_DELAY_MIN) + MOCK_DELAY_MIN;
  return new Promise(resolve => setTimeout(resolve, delayTime));
};

// Generic mock response wrapper
interface MockResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Success response helper
const success = <T>(data: T, message?: string): MockResponse<T> => ({
  data,
  status: 200,
  message
});

// Error response helper
const error = <T = null>(status: number, message: string): MockResponse<T> => ({
  data: null as T,
  status,
  message
});

/**
 * Mock API - Dashboard
 */
export const mockDashboardApi = {
  async getKPIs() {
    await delay();
    return success(fixtures.dashboard.kpis);
  },

  async getRecentActivity() {
    await delay();
    return success(fixtures.dashboard.recentActivity);
  },

  async getQuickStats(dateRange?: { from: string; to: string }) {
    await delay();
    // In real implementation, would filter by dateRange
    return success(fixtures.dashboard.quickStats);
  }
};

/**
 * Mock API - Marketing
 */
export const mockMarketingApi = {
  async getHeroContent() {
    await delay(200);
    return success(fixtures.marketing.hero);
  },

  async getTrustLogos() {
    await delay(200);
    return success(fixtures.marketing.trustLogos);
  },

  async getTestimonials() {
    await delay();
    return success(fixtures.marketing.testimonials);
  },

  async getWebinars() {
    await delay();
    return success(fixtures.marketing.webinars);
  }
};

/**
 * Mock API - Cases (Damage Assessment)
 */
export const mockCasesApi = {
  async getCases() {
    await delay();
    return success(fixtures.cases.list);
  },

  async getCaseById(id: string) {
    await delay();
    const caseData = fixtures.cases.list.find(c => c.id === id);
    return caseData ? success(caseData) : error(404, 'Case not found');
  },

  async createCase(data: any) {
    await delay();
    const newCase = {
      id: `CASE-${Date.now()}`,
      ...data,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    return success(newCase, 'Case created successfully');
  },

  async updateCase(id: string, data: any) {
    await delay();
    return success({ id, ...data }, 'Case updated successfully');
  }
};

/**
 * Mock API - Photos
 */
export const mockPhotosApi = {
  async getPhotos(caseId?: string) {
    await delay();
    const photos = caseId 
      ? fixtures.photos.list.filter(p => p.caseId === caseId)
      : fixtures.photos.list;
    return success(photos);
  },

  async uploadPhoto(file: File, caseId: string) {
    await delay(1500); // Longer delay for upload simulation
    const newPhoto = {
      id: `PHOTO-${Date.now()}`,
      caseId,
      url: URL.createObjectURL(file),
      thumbnail: URL.createObjectURL(file),
      fileName: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      tags: []
    };
    return success(newPhoto, 'Photo uploaded successfully');
  },

  async optimizePhoto(photoId: string) {
    await delay(2000); // Simulate optimization processing
    return success({ 
      originalSize: 2500000,
      optimizedSize: 450000,
      compressionRatio: 0.82,
      dimensions: { width: 1920, height: 1080 }
    }, 'Photo optimized successfully');
  },

  async deletePhoto(photoId: string) {
    await delay();
    return success(null, 'Photo deleted successfully');
  }
};

/**
 * Mock API - Vehicles
 */
export const mockVehiclesApi = {
  async getVehicles() {
    await delay();
    return success(fixtures.vehicles.list);
  },

  async getVehicleByVIN(vin: string) {
    await delay();
    const vehicle = fixtures.vehicles.list.find(v => v.vin === vin);
    return vehicle ? success(vehicle) : error(404, 'Vehicle not found');
  },

  async decodeVIN(vin: string) {
    await delay(1000);
    return success({
      vin,
      make: 'BMW',
      model: '3 Series',
      year: 2020,
      engine: '2.0L Turbo',
      transmission: 'Automatic',
      confidence: 0.95
    });
  }
};

/**
 * Mock API - Valuation
 */
export const mockValuationApi = {
  async getValuation(vehicleId: string) {
    await delay(1200);
    return success(fixtures.valuation.sample);
  },

  async getComparables(vehicleId: string) {
    await delay();
    return success(fixtures.valuation.comparables);
  },

  async getMietwagenspiegel(vehicleClass: string) {
    await delay();
    return success({
      vehicleClass,
      dailyRate: 45.50,
      weeklyRate: 280.00,
      monthlyRate: 950.00,
      source: 'Mietwagenspiegel 2024',
      updatedAt: '2024-01-15'
    });
  }
};

/**
 * Mock API - OCR (Fahrzeugschein)
 */
export const mockOCRApi = {
  async scanDocument(file: File) {
    await delay(2500); // Longer delay for OCR processing
    return success({
      extractedFields: {
        vin: 'WBADT43452G123456',
        licensePlate: 'M-AB 1234',
        make: 'BMW',
        model: '320d',
        firstRegistration: '2020-03-15',
        owner: 'Max Mustermann',
        address: 'Musterstraße 123, 80333 München'
      },
      confidence: {
        vin: 0.98,
        licensePlate: 0.95,
        make: 0.99,
        model: 0.97,
        firstRegistration: 0.92,
        owner: 0.88,
        address: 0.85
      },
      processingTime: 2340
    });
  }
};

/**
 * Mock API - Exports
 */
export const mockExportsApi = {
  async exportToProvider(caseId: string, provider: string) {
    await delay(1500);
    return success({
      exportId: `EXP-${Date.now()}`,
      provider,
      status: 'completed',
      exportedAt: new Date().toISOString()
    }, `Exported to ${provider} successfully`);
  },

  async getExportHistory(caseId: string) {
    await delay();
    return success(fixtures.exports.history);
  }
};

/**
 * Mock API - Billing
 */
export const mockBillingApi = {
  async getInvoices() {
    await delay();
    return success(fixtures.billing.invoices);
  },

  async createInvoice(data: any) {
    await delay();
    const newInvoice = {
      id: `INV-${Date.now()}`,
      ...data,
      status: 'draft',
      createdAt: new Date().toISOString()
    };
    return success(newInvoice, 'Invoice created successfully');
  },

  async checkFactoringEligibility(invoiceId: string) {
    await delay(1000);
    return success({
      eligible: true,
      advanceRate: 0.85,
      estimatedAmount: 8500.00,
      fees: 125.00
    });
  }
};

// Export unified mock API
export const mockApi = {
  dashboard: mockDashboardApi,
  marketing: mockMarketingApi,
  cases: mockCasesApi,
  photos: mockPhotosApi,
  vehicles: mockVehiclesApi,
  valuation: mockValuationApi,
  ocr: mockOCRApi,
  exports: mockExportsApi,
  billing: mockBillingApi
};
