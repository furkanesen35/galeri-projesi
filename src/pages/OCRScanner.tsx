import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mockApi } from '../services/mockApi';
import { OCRUpload } from './OCR/components/OCRUpload';
import { OCRResults } from './OCR/components/OCRResults';

interface ExtractedData {
  extractedFields: {
    vin: string;
    licensePlate: string;
    make: string;
    model: string;
    firstRegistration: string;
    owner: string;
    address: string;
  };
  confidence: Record<string, number>;
  processingTime: number;
}

export const OCRScanner = () => {
  const { t } = useTranslation();
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ExtractedData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleUpload = async (file: File) => {
    setUploadedFile(file);
    setProcessing(true);

    const response = await mockApi.ocr.scanDocument(file);
    setResult(response.data);
    setProcessing(false);
  };

  const handleRetry = () => {
    setResult(null);
    setUploadedFile(null);
  };

  const handleApplyToCase = () => {
    alert(
      'Applied to new case form!\n\nIn a real implementation, this would pre-fill the case wizard with the extracted data.'
    );
  };

  const handleManualEntry = () => {
    alert(
      'Manual Entry Mode\n\nIn a real implementation, this would open the case wizard for manual data entry.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('ocr.title')}</h1>
        <p className="text-sm text-text-secondary mt-1">{t('ocr.subtitle')}</p>
      </div>

      {/* Info card */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">How it works</h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Upload a photo of the Fahrzeugschein (vehicle registration document)</li>
              <li>• AI-powered OCR extracts VIN, make, model, and owner information</li>
              <li>• Review confidence scores and edit any incorrect fields</li>
              <li>• Apply the extracted data directly to a new damage assessment case</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main content */}
      {!result ? (
        <OCRUpload onUpload={handleUpload} processing={processing} />
      ) : (
        <OCRResults
          result={result}
          uploadedFile={uploadedFile}
          onRetry={handleRetry}
          onApplyToCase={handleApplyToCase}
          onManualEntry={handleManualEntry}
        />
      )}
    </div>
  );
};
