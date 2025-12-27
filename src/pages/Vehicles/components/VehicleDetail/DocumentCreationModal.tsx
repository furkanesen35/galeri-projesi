import { useState, useRef, useCallback } from 'react';
import { 
  X, FileText, Printer, Download, Save, ChevronLeft, ChevronRight,
  Check, AlertCircle, Building2, Car, User
} from 'lucide-react';
import { Vehicle } from '../../../../types/domain';
import { 
  DocumentTemplate, DocumentField, dealerInfo, getTemplateById 
} from './DocumentTemplates';

interface Props {
  vehicle: Vehicle;
  templateId: string;
  onClose: () => void;
  onSave: (templateId: string, data: Record<string, unknown>) => void;
}

export const DocumentCreationModal = ({ vehicle, templateId, onClose, onSave }: Props) => {
  const template = getTemplateById(templateId);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    template?.fields.forEach(field => {
      if (field.autoFill === 'vehicle') {
        // Auto-fill vehicle data
        switch (field.id) {
          case 'vehicle_brand': initial[field.id] = vehicle.brand; break;
          case 'vehicle_model': initial[field.id] = vehicle.model; break;
          case 'vehicle_vin': initial[field.id] = vehicle.vin || ''; break;
          case 'vehicle_plate': initial[field.id] = vehicle.plate || ''; break;
          case 'vehicle_mileage': initial[field.id] = vehicle.mileageKm; break;
          case 'vehicle_color': initial[field.id] = vehicle.color || ''; break;
          case 'vehicle_fuel': initial[field.id] = vehicle.fuelType || ''; break;
          case 'vehicle_power': initial[field.id] = vehicle.power ? `${vehicle.power.kw} kW / ${vehicle.power.ps} PS` : ''; break;
          case 'vehicle_first_registration': 
            initial[field.id] = vehicle.firstRegistration 
              ? new Date(vehicle.firstRegistration).toISOString().split('T')[0] 
              : ''; 
            break;
          case 'new_vehicle_brand': initial[field.id] = vehicle.brand; break;
          case 'new_vehicle_model': initial[field.id] = vehicle.model; break;
        }
      } else if (field.autoFill === 'date') {
        initial[field.id] = new Date().toISOString().split('T')[0];
      } else if (field.autoFill === 'dealer') {
        initial[field.id] = dealerInfo.city.split(' ')[1] || 'Musterstadt';
      } else if (field.defaultValue) {
        initial[field.id] = field.defaultValue;
      } else if (field.type === 'checkbox') {
        initial[field.id] = false;
      } else {
        initial[field.id] = '';
      }
    });
    return initial;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  if (!template) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-surface p-6 rounded-xl">
          <p>Template nicht gefunden</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-primary text-primary-text rounded-lg">
            Schließen
          </button>
        </div>
      </div>
    );
  }

  const currentSection = template.sections[currentSectionIndex];
  const currentFields = template.fields.filter(f => f.section === currentSection.id);
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === template.sections.length - 1;

  const validateCurrentSection = () => {
    const newErrors: Record<string, string> = {};
    currentFields.forEach(field => {
      if (field.required) {
        const value = formData[field.id];
        if (field.type === 'checkbox') {
          if (!value) newErrors[field.id] = 'Bitte bestätigen';
        } else if (!value || (typeof value === 'string' && !value.trim())) {
          newErrors[field.id] = 'Pflichtfeld';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentSection()) {
      if (isLastSection) {
        setShowPreview(true);
      } else {
        setCurrentSectionIndex(prev => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (showPreview) {
      setShowPreview(false);
    } else if (!isFirstSection) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const handleChange = (fieldId: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  const handleSaveAndPrint = () => {
    onSave(templateId, formData);
    // Trigger print
    window.print();
  };

  const handleSaveOnly = () => {
    onSave(templateId, formData);
    onClose();
  };

  const renderField = (field: DocumentField) => {
    const value = formData[field.id];
    const error = errors[field.id];
    const widthClass = field.width === 'full' ? 'col-span-2' : field.width === 'third' ? 'col-span-1' : 'col-span-1';

    const baseInputClass = `w-full rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
      error 
        ? 'border-red-500 bg-red-500/5' 
        : 'border-border bg-bg-secondary hover:border-primary/50 focus:border-primary'
    }`;

    return (
      <div key={field.id} className={widthClass}>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {field.type === 'text' && (
          <input
            type="text"
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        )}

        {field.type === 'textarea' && (
          <textarea
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className={baseInputClass}
          />
        )}

        {field.type === 'date' && (
          <input
            type="date"
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={baseInputClass}
          />
        )}

        {field.type === 'number' && (
          <input
            type="number"
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        )}

        {field.type === 'currency' && (
          <div className="relative">
            <input
              type="number"
              value={value as string}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder="0,00"
              step="0.01"
              className={`${baseInputClass} pr-8`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">€</span>
          </div>
        )}

        {field.type === 'select' && (
          <select
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={baseInputClass}
          >
            <option value="">Bitte wählen...</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}

        {field.type === 'checkbox' && (
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) => handleChange(field.id, e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                value ? 'bg-primary border-primary' : error ? 'border-red-500' : 'border-border'
              }`}>
                {value && <Check className="h-3 w-3 text-primary-text" />}
              </div>
            </div>
            <span className="text-sm text-text-secondary">{field.placeholder || 'Ja'}</span>
          </label>
        )}

        {error && (
          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    );
  };

  const renderPreview = () => {
    const Icon = template.icon;
    
    return (
      <div ref={printRef} className="bg-white text-black p-8 print:p-4">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-gray-800 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{template.name}</h1>
            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold">{dealerInfo.name}</p>
            <p>{dealerInfo.street}</p>
            <p>{dealerInfo.city}</p>
            <p>{dealerInfo.phone}</p>
          </div>
        </div>

        {/* Content by sections */}
        {template.sections.map(section => {
          const sectionFields = template.fields.filter(f => f.section === section.id);
          const filledFields = sectionFields.filter(f => {
            const val = formData[f.id];
            if (f.type === 'checkbox') return val === true;
            return val && String(val).trim() !== '';
          });

          if (filledFields.length === 0) return null;

          return (
            <div key={section.id} className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                {section.title}
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {filledFields.map(field => {
                  const val = formData[field.id];
                  let displayValue = String(val);

                  if (field.type === 'checkbox') {
                    displayValue = val ? '✓ Ja' : '✗ Nein';
                  } else if (field.type === 'select' && field.options) {
                    const opt = field.options.find(o => o.value === val);
                    displayValue = opt?.label || String(val);
                  } else if (field.type === 'currency') {
                    displayValue = `${Number(val).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €`;
                  } else if (field.type === 'date' && val) {
                    displayValue = new Date(val as string).toLocaleDateString('de-DE');
                  } else if (field.type === 'number' && field.id.includes('mileage')) {
                    displayValue = `${Number(val).toLocaleString('de-DE')} km`;
                  }

                  return (
                    <div key={field.id} className={field.width === 'full' ? 'col-span-2' : ''}>
                      <span className="text-gray-600 text-sm">{field.label}: </span>
                      <span className="font-medium">{displayValue}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Signature area */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <div className="border-b border-gray-400 h-16"></div>
              <p className="text-sm text-gray-600 mt-2">Unterschrift Verkäufer / Kunde</p>
            </div>
            <div>
              <div className="border-b border-gray-400 h-16"></div>
              <p className="text-sm text-gray-600 mt-2">Unterschrift Händler</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
          <p>{dealerInfo.name} • {dealerInfo.street} • {dealerInfo.city}</p>
          <p>Tel: {dealerInfo.phone} • E-Mail: {dealerInfo.email} • USt-IdNr.: {dealerInfo.taxId}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-surface shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${template.bgColor}`}>
              <template.icon className={`h-6 w-6 ${template.color}`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{template.name}</h2>
              <p className="text-sm text-text-secondary">{template.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-text-secondary hover:bg-bg-secondary hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress indicator */}
        {!showPreview && (
          <div className="px-6 py-4 border-b border-border bg-bg-secondary">
            <div className="flex items-center gap-2">
              {template.sections.map((section, idx) => (
                <div key={section.id} className="flex items-center">
                  <button
                    onClick={() => {
                      if (idx < currentSectionIndex) setCurrentSectionIndex(idx);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      idx === currentSectionIndex
                        ? 'bg-primary text-primary-text'
                        : idx < currentSectionIndex
                        ? 'bg-green-500/10 text-green-500 cursor-pointer hover:bg-green-500/20'
                        : 'bg-bg-tertiary text-text-secondary'
                    }`}
                  >
                    {idx < currentSectionIndex ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-current/20 text-xs">
                        {idx + 1}
                      </span>
                    )}
                    <span className="hidden sm:inline">{section.title}</span>
                  </button>
                  {idx < template.sections.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-text-secondary mx-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {showPreview ? (
            <div className="rounded-xl border border-border overflow-hidden">
              {renderPreview()}
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                {currentSection.id === 'vehicle' && <Car className="h-5 w-5 text-primary" />}
                {(currentSection.id === 'seller' || currentSection.id === 'buyer' || currentSection.id === 'customer' || currentSection.id === 'driver') && <User className="h-5 w-5 text-primary" />}
                {currentSection.id === 'dealer' && <Building2 className="h-5 w-5 text-primary" />}
                {currentSection.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {currentFields.map(renderField)}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-bg-secondary">
          <button
            onClick={handlePrev}
            disabled={isFirstSection && !showPreview}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground hover:bg-bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Zurück
          </button>

          <div className="flex items-center gap-3">
            {showPreview ? (
              <>
                <button
                  onClick={handleSaveOnly}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground hover:bg-bg-tertiary transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Speichern
                </button>
                <button
                  onClick={handleSaveAndPrint}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-text font-semibold hover:bg-primary-hover transition-colors"
                >
                  <Printer className="h-4 w-4" />
                  Drucken
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-text font-semibold hover:bg-primary-hover transition-colors"
              >
                {isLastSection ? 'Vorschau' : 'Weiter'}
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
