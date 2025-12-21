import { useState } from 'react';

interface CaseWizardProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CaseWizard = ({ onClose, onSubmit }: CaseWizardProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Vehicle info
    vin: '',
    licensePlate: '',
    make: '',
    model: '',
    year: '',
    // Case info
    caseType: 'liability',
    title: '',
    description: '',
    accidentDate: '',
    location: '',
    // Claimant info
    claimantName: '',
    claimantPhone: '',
    claimantEmail: '',
    // Insurer info
    insurerName: '',
    policyNumber: '',
    claimNumber: '',
    // Assignment
    assignedTo: '',
    priority: 'medium'
  });

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
              s === step
                ? 'bg-primary text-primary-text'
                : s < step
                ? 'bg-success text-white'
                : 'bg-border text-text-muted'
            }`}
          >
            {s < step ? '✓' : s}
          </div>
          {s < 4 && (
            <div
              className={`w-12 h-1 ${
                s < step ? 'bg-success' : 'bg-border'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-surface rounded-xl shadow-2xl overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border bg-bg-secondary">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">New Damage Case</h2>
            <button onClick={onClose} className="text-text-muted hover:text-foreground transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Step indicator */}
        <div className="px-6 py-6 bg-bg-secondary border-b border-border">
          {renderStepIndicator()}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Vehicle Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    VIN Number
                  </label>
                  <input
                    type="text"
                    value={formData.vin}
                    onChange={(e) => updateField('vin', e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                    placeholder="WBADT43452G123456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    License Plate
                  </label>
                  <input
                    type="text"
                    value={formData.licensePlate}
                    onChange={(e) => updateField('licensePlate', e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                    placeholder="M-AB 1234"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Make</label>
                  <input
                    type="text"
                    value={formData.make}
                    onChange={(e) => updateField('make', e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                    placeholder="BMW"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Model</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => updateField('model', e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                    placeholder="320d"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => updateField('year', e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                    placeholder="2020"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Case Details</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Case Type</label>
                <select
                  value={formData.caseType}
                  onChange={(e) => updateField('caseType', e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                >
                  <option value="liability">Liability (Haftpflicht)</option>
                  <option value="comprehensive">Comprehensive (Kasko)</option>
                  <option value="short">Short Appraisal (Kurz)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Case Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                  placeholder="e.g., Front bumper damage"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                  placeholder="Describe the damage..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Accident Date</label>
                  <input
                    type="date"
                    value={formData.accidentDate}
                    onChange={(e) => updateField('accidentDate', e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                    placeholder="City, Street"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Claimant & Insurer</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Claimant Name</label>
                  <input
                    type="text"
                    value={formData.claimantName}
                    onChange={(e) => updateField('claimantName', e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                    placeholder="Max Mustermann"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.claimantPhone}
                      onChange={(e) => updateField('claimantPhone', e.target.value)}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                      placeholder="+49 123 456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.claimantEmail}
                      onChange={(e) => updateField('claimantEmail', e.target.value)}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                      placeholder="max@example.com"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Insurance Company</label>
                    <input
                      type="text"
                      value={formData.insurerName}
                      onChange={(e) => updateField('insurerName', e.target.value)}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                      placeholder="e.g., Allianz"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Policy Number</label>
                      <input
                        type="text"
                        value={formData.policyNumber}
                        onChange={(e) => updateField('policyNumber', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                        placeholder="POL-123456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Claim Number</label>
                      <input
                        type="text"
                        value={formData.claimNumber}
                        onChange={(e) => updateField('claimNumber', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                        placeholder="CLM-789012"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Assignment & Priority</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Assign To</label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => updateField('assignedTo', e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
                >
                  <option value="">Select assessor...</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Sarah Miller">Sarah Miller</option>
                  <option value="Mike Chen">Mike Chen</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
                <div className="flex gap-3">
                  {['low', 'medium', 'high', 'urgent'].map((p) => (
                    <button
                      key={p}
                      onClick={() => updateField('priority', p)}
                      className={`flex-1 py-2 rounded-lg font-medium text-sm capitalize transition-all ${
                        formData.priority === p
                          ? 'bg-primary text-primary-text'
                          : 'bg-surface border border-border text-foreground hover:border-primary'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Summary */}
              <div className="mt-6 p-4 bg-bg-secondary rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-3">Case Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Vehicle:</span>
                    <span className="text-foreground font-medium">
                      {formData.make} {formData.model} {formData.year}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">License Plate:</span>
                    <span className="text-foreground font-medium">{formData.licensePlate || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Case Type:</span>
                    <span className="text-foreground font-medium capitalize">{formData.caseType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Title:</span>
                    <span className="text-foreground font-medium">{formData.title || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-bg-secondary flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              step === 1
                ? 'text-text-muted cursor-not-allowed'
                : 'text-foreground hover:bg-surface'
            }`}
          >
            ← Back
          </button>
          <div className="text-sm text-text-muted">
            Step {step} of 4
          </div>
          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-primary text-primary-text rounded-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-success text-white rounded-lg font-semibold hover:bg-success/90 transition-colors"
            >
              Create Case ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
