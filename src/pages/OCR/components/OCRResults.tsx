import { useState } from 'react';

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

interface OCRResultsProps {
  result: ExtractedData;
  uploadedFile: File | null;
  onRetry: () => void;
  onApplyToCase: () => void;
  onManualEntry: () => void;
}

export const OCRResults = ({ result, uploadedFile, onRetry, onApplyToCase, onManualEntry }: OCRResultsProps) => {
  const [editedFields, setEditedFields] = useState(result.extractedFields);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-success';
    if (confidence >= 0.7) return 'text-warning';
    return 'text-error';
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.9) return { label: 'High', color: 'bg-success/10 text-success border-success/20' };
    if (confidence >= 0.7) return { label: 'Medium', color: 'bg-warning/10 text-warning border-warning/20' };
    return { label: 'Low', color: 'bg-error/10 text-error border-error/20' };
  };

  const updateField = (field: string, value: string) => {
    setEditedFields(prev => ({ ...prev, [field]: value }));
  };

  const averageConfidence = Object.values(result.confidence).reduce((a, b) => a + b, 0) / Object.values(result.confidence).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Document preview */}
      <div className="space-y-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Uploaded Document</h3>
            <button
              onClick={onRetry}
              className="text-sm text-primary hover:text-primary-hover font-medium"
            >
              ← Upload Different
            </button>
          </div>
          
          {/* Document preview placeholder */}
          <div className="aspect-[3/4] bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-lg border border-border flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-text-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm text-text-secondary">{uploadedFile?.name || 'Document Preview'}</p>
              <p className="text-xs text-text-muted mt-1">
                {uploadedFile ? `${(uploadedFile.size / 1024).toFixed(0)} KB` : ''}
              </p>
            </div>
          </div>

          {/* Processing stats */}
          <div className="mt-4 p-3 bg-bg-secondary rounded-lg border border-border">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-text-secondary">Processing Time:</span>
              <span className="text-foreground font-medium">{(result.processingTime / 1000).toFixed(2)}s</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Average Confidence:</span>
              <span className={`font-medium ${getConfidenceColor(averageConfidence)}`}>
                {(averageConfidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Extracted fields */}
      <div className="space-y-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4">Extracted Information</h3>
          
          <div className="space-y-4">
            {/* VIN */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">VIN Number</label>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getConfidenceBadge(result.confidence.vin).color}`}>
                  {getConfidenceBadge(result.confidence.vin).label} {(result.confidence.vin * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="text"
                value={editedFields.vin}
                onChange={(e) => updateField('vin', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground font-mono"
              />
            </div>

            {/* License Plate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">License Plate</label>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getConfidenceBadge(result.confidence.licensePlate).color}`}>
                  {getConfidenceBadge(result.confidence.licensePlate).label} {(result.confidence.licensePlate * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="text"
                value={editedFields.licensePlate}
                onChange={(e) => updateField('licensePlate', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
              />
            </div>

            {/* Make & Model */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-foreground">Make</label>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getConfidenceBadge(result.confidence.make).color}`}>
                    {(result.confidence.make * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="text"
                  value={editedFields.make}
                  onChange={(e) => updateField('make', e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-foreground">Model</label>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getConfidenceBadge(result.confidence.model).color}`}>
                    {(result.confidence.model * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="text"
                  value={editedFields.model}
                  onChange={(e) => updateField('model', e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                />
              </div>
            </div>

            {/* First Registration */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">First Registration</label>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getConfidenceBadge(result.confidence.firstRegistration).color}`}>
                  {(result.confidence.firstRegistration * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="text"
                value={editedFields.firstRegistration}
                onChange={(e) => updateField('firstRegistration', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
              />
            </div>

            {/* Owner */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">Owner Name</label>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getConfidenceBadge(result.confidence.owner).color}`}>
                  {(result.confidence.owner * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="text"
                value={editedFields.owner}
                onChange={(e) => updateField('owner', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
              />
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">Address</label>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getConfidenceBadge(result.confidence.address).color}`}>
                  {(result.confidence.address * 100).toFixed(0)}%
                </span>
              </div>
              <textarea
                value={editedFields.address}
                onChange={(e) => updateField('address', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
              />
            </div>
          </div>

          {/* Privacy notice */}
          <div className="mt-4 p-3 bg-bg-secondary rounded-lg border border-border">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-text-muted mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs text-text-secondary">
                GPS/EXIF metadata has been automatically removed from the uploaded document for privacy protection.
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onApplyToCase}
            className="flex-1 px-6 py-3 bg-primary text-primary-text rounded-lg font-semibold hover:bg-primary-hover transition-colors"
          >
            Apply to New Case
          </button>
          <button
            onClick={onManualEntry}
            className="px-6 py-3 bg-surface border border-border text-foreground rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            Manual Entry
          </button>
        </div>

        <button
          onClick={onRetry}
          className="w-full px-6 py-2 text-text-secondary hover:text-foreground transition-colors text-sm"
        >
          Scan Different Document
        </button>
      </div>
    </div>
  );
};
