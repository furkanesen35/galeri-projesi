import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Vehicle } from '../../../../types/domain';
import { 
  Calculator, Euro, TrendingUp, TrendingDown, Percent, 
  PiggyBank, Receipt, ArrowRight, Info, RefreshCw, Wrench, AlertTriangle, ChevronDown, Plus, Trash2, Check, Loader2, Zap, RotateCcw
} from 'lucide-react';
import { DraggablePanel, DraggablePanelContainer, HiddenPanelsBar } from '../../../../components/DraggablePanel';
import { PanelCustomizer } from '../../../../components/PanelCustomizer';
import { usePanelLayoutStore } from '../../../../store/usePanelLayoutStore';

interface Props {
  vehicle: Vehicle;
}

const VIEW_ID = 'vehicle-detail-price' as const;

// Debounced input component to prevent re-render issues
interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  className?: string;
  placeholder?: string;
  min?: number;
  debounceMs?: number;
}

const DebouncedInput = memo(({ 
  value: externalValue, 
  onChange, 
  type = 'text', 
  className, 
  placeholder,
  min,
  debounceMs = 300
}: DebouncedInputProps) => {
  const [localValue, setLocalValue] = useState(externalValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false);

  // Sync external value to local only when not typing
  useEffect(() => {
    if (!isTypingRef.current) {
      setLocalValue(externalValue);
    }
  }, [externalValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    isTypingRef.current = true;

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the onChange callback
    timeoutRef.current = setTimeout(() => {
      isTypingRef.current = false;
      if (type === 'number') {
        onChange(newValue === '' ? '0' : newValue);
      } else {
        onChange(newValue);
      }
    }, debounceMs);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <input
      type={type}
      value={localValue}
      onChange={handleChange}
      className={className}
      placeholder={placeholder}
      min={min}
    />
  );
});

export const VehiclePriceTabNew = ({ vehicle }: Props) => {
  const [sellingPrice, setSellingPrice] = useState(vehicle.price);
  const [discount, setDiscount] = useState(0);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [extras, setExtras] = useState(0);
  const [damages, setDamages] = useState<Array<{ id: number; type: string; cost: number; description: string }>>([
    { id: 1, type: '', cost: 0, description: '' }
  ]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);
  const damagesRef = useRef(damages);
  
  const { getPanels, isPanelVisible, resetLayout } = usePanelLayoutStore();

  // Keep ref in sync with latest damages
  useEffect(() => {
    damagesRef.current = damages;
  }, [damages]);

  // Debounced auto-save for damages only
  const saveData = useCallback(async () => {
    setSaveStatus('saving');
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Saved damage data:', { damages: damagesRef.current });
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveData();
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [damages, saveData]);

  const damageTypes = [
    { value: '', label: 'Auswählen...' },
    { value: 'lack', label: 'Lackschaden' },
    { value: 'delle', label: 'Delle / Beule' },
    { value: 'kratzer', label: 'Kratzer' },
    { value: 'glas', label: 'Glasschaden' },
    { value: 'motor', label: 'Motorschaden' },
    { value: 'getriebe', label: 'Getriebeschaden' },
    { value: 'bremsen', label: 'Bremsen' },
    { value: 'reifen', label: 'Reifen / Felgen' },
    { value: 'elektronik', label: 'Elektronik' },
    { value: 'innenraum', label: 'Innenraum' },
    { value: 'unfall', label: 'Unfallschaden' },
    { value: 'sonstiges', label: 'Sonstiges' },
  ];

  const addDamage = () => {
    const newId = Math.max(...damages.map(d => d.id), 0) + 1;
    setDamages([...damages, { id: newId, type: '', cost: 0, description: '' }]);
  };

  const removeDamage = (id: number) => {
    if (damages.length > 1) {
      setDamages(damages.filter(d => d.id !== id));
    }
  };

  const updateDamage = (id: number, field: 'type' | 'cost' | 'description', value: string | number) => {
    setDamages(damages.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const totalDamageCost = damages.reduce((sum, d) => sum + d.cost, 0);

  const purchasePrice = vehicle.purchasePrice || 0;
  const netPrice = vehicle.priceNet || Math.round(sellingPrice / 1.19);
  const vat = sellingPrice - netPrice;
  
  const discountAmount = (sellingPrice * discount) / 100;
  const finalPrice = sellingPrice - discountAmount + extras - tradeInValue - totalDamageCost;
  const margin = finalPrice - purchasePrice;
  const marginPercent = purchasePrice > 0 ? ((margin / purchasePrice) * 100).toFixed(1) : '0';

  // Get sorted panels
  const panels = getPanels(VIEW_ID);

  // Panel content components
  const BasePricePanel = () => (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block text-sm text-text-secondary mb-2">Verkaufspreis (Brutto)</label>
        <div className="relative">
          <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-bg-secondary pl-10 pr-4 py-2.5 text-lg font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-2">Nettopreis</label>
        <div className="flex items-center gap-2 rounded-lg bg-bg-secondary px-4 py-2.5">
          <Euro className="h-4 w-4 text-text-secondary" />
          <span className="text-lg font-semibold text-foreground">{netPrice.toLocaleString('de-DE')}</span>
          <span className="text-sm text-text-secondary ml-auto">(ohne MwSt.)</span>
        </div>
      </div>
      <div className="col-span-2 flex items-center gap-2 rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
        <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
        <span className="text-sm text-blue-400">
          MwSt. (19%): € {vat.toLocaleString('de-DE')}
        </span>
      </div>
    </div>
  );

  const PriceAdjustmentsPanel = () => (
    <div className="space-y-4">
      {/* Discount */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm text-text-secondary mb-2">Rabatt (%)</label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-bg-secondary pl-10 pr-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-text-secondary mt-6" />
        <div className="flex-1">
          <label className="block text-sm text-text-secondary mb-2">Rabattbetrag</label>
          <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5">
            <TrendingDown className="h-4 w-4 text-red-500" />
            <span className="text-foreground font-semibold">- € {discountAmount.toLocaleString('de-DE')}</span>
          </div>
        </div>
      </div>

      {/* Trade-In */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm text-text-secondary mb-2">Inzahlungnahme</label>
          <div className="relative">
            <RefreshCw className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="number"
              min="0"
              value={tradeInValue}
              onChange={(e) => setTradeInValue(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-bg-secondary pl-10 pr-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-text-secondary mt-6" />
        <div className="flex-1">
          <label className="block text-sm text-text-secondary mb-2">Anrechnung</label>
          <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-2.5">
            <TrendingDown className="h-4 w-4 text-amber-500" />
            <span className="text-foreground font-semibold">- € {tradeInValue.toLocaleString('de-DE')}</span>
          </div>
        </div>
      </div>

      {/* Extras */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm text-text-secondary mb-2">Extras / Zubehör</label>
          <div className="relative">
            <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="number"
              min="0"
              value={extras}
              onChange={(e) => setExtras(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-bg-secondary pl-10 pr-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-text-secondary mt-6" />
        <div className="flex-1">
          <label className="block text-sm text-text-secondary mb-2">Aufpreis</label>
          <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-2.5">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-foreground font-semibold">+ € {extras.toLocaleString('de-DE')}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const DamageCostsPanel = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Save Status Indicator */}
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all ${
            saveStatus === 'saving' 
              ? 'bg-blue-500/10 text-blue-500' 
              : saveStatus === 'saved' 
                ? 'bg-green-500/10 text-green-500' 
                : 'opacity-0'
          }`}>
            {saveStatus === 'saving' && (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Speichern...</span>
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <Check className="h-3 w-3" />
                <span>Gespeichert</span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={addDamage}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Schaden hinzufügen
        </button>
      </div>
      
      {/* Damage entries */}
      <div className="space-y-3">
        {damages.map((damage) => (
          <div key={damage.id} className="flex items-center gap-3">
            {/* Damage Type Dropdown */}
            <div className="relative w-40 flex-shrink-0">
              <select
                value={damage.type}
                onChange={(e) => updateDamage(damage.id, 'type', e.target.value)}
                className="w-full appearance-none rounded-lg border border-border bg-bg-secondary pl-3 pr-8 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                {damageTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-secondary pointer-events-none" />
            </div>

            {/* Damage Cost Input */}
            <div className="relative w-28 flex-shrink-0">
              <Euro className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-secondary" />
              <DebouncedInput
                type="number"
                min={0}
                value={String(damage.cost || '')}
                onChange={(val) => updateDamage(damage.id, 'cost', Number(val))}
                className="w-full rounded-lg border border-border bg-bg-secondary pl-8 pr-2 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="0"
                debounceMs={500}
              />
            </div>

            {/* Damage Description */}
            <DebouncedInput
              type="text"
              value={damage.description}
              onChange={(val) => updateDamage(damage.id, 'description', val)}
              className="flex-1 rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Beschreibung..."
              debounceMs={500}
            />

            {/* Remove button */}
            <button
              onClick={() => removeDamage(damage.id)}
              disabled={damages.length === 1}
              className="p-2 text-text-secondary hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Total Damage Summary */}
      {totalDamageCost > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 mt-4">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-red-500" />
            <span className="text-sm text-foreground">
              Gesamt Schadenabzug ({damages.filter(d => d.cost > 0).length} Posten)
            </span>
          </div>
          <span className="text-lg font-bold text-red-500">- € {totalDamageCost.toLocaleString('de-DE')}</span>
        </div>
      )}
    </>
  );

  const FinalPricePanel = () => (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-text-secondary">Endpreis (Brutto)</p>
        <p className="text-3xl font-bold text-foreground">€ {finalPrice.toLocaleString('de-DE')}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-text-secondary">Nettopreis</p>
        <p className="text-xl font-semibold text-text-secondary">€ {Math.round(finalPrice / 1.19).toLocaleString('de-DE')}</p>
      </div>
    </div>
  );

  const PurchaseInfoPanel = () => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-text-secondary">Einkaufspreis</span>
        <span className="text-lg font-bold text-foreground">€ {purchasePrice.toLocaleString('de-DE')}</span>
      </div>
    </div>
  );

  const MarginPanel = () => (
    <div className="space-y-4">
      <div className="text-center py-4">
        <p className={`text-4xl font-bold ${margin >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          € {margin.toLocaleString('de-DE')}
        </p>
        <p className={`text-lg font-semibold mt-1 ${margin >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {marginPercent}%
        </p>
      </div>
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Verkaufspreis</span>
          <span className="text-foreground">€ {finalPrice.toLocaleString('de-DE')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Einkaufspreis</span>
          <span className="text-foreground">- € {purchasePrice.toLocaleString('de-DE')}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold border-t border-border pt-2">
          <span className="text-text-secondary">Gewinn</span>
          <span className={margin >= 0 ? 'text-green-500' : 'text-red-500'}>
            € {margin.toLocaleString('de-DE')}
          </span>
        </div>
      </div>
    </div>
  );

  const QuickActionsPanel = () => (
    <div className="space-y-2">
      <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-text hover:bg-primary-hover transition-all">
        <Receipt className="h-4 w-4" />
        Angebot erstellen
      </button>
      <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground hover:bg-bg-secondary transition-colors">
        <Calculator className="h-4 w-4" />
        Finanzierung berechnen
      </button>
    </div>
  );

  // Map panel IDs to their content and config
  const panelComponents: Record<string, { 
    content: React.ReactNode; 
    icon: React.ReactNode;
    variant?: 'default' | 'primary' | 'danger' | 'success' | 'warning';
    isMainColumn?: boolean;
  }> = {
    'base-price': {
      content: <BasePricePanel />,
      icon: <Euro className="h-5 w-5 text-primary" />,
      isMainColumn: true,
    },
    'price-adjustments': {
      content: <PriceAdjustmentsPanel />,
      icon: <Calculator className="h-5 w-5 text-primary" />,
      isMainColumn: true,
    },
    'damage-costs': {
      content: <DamageCostsPanel />,
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      variant: 'danger',
      isMainColumn: true,
    },
    'final-price': {
      content: <FinalPricePanel />,
      icon: <Receipt className="h-5 w-5 text-primary" />,
      variant: 'primary',
      isMainColumn: true,
    },
    'purchase-info': {
      content: <PurchaseInfoPanel />,
      icon: <PiggyBank className="h-5 w-5 text-primary" />,
      isMainColumn: false,
    },
    'margin': {
      content: <MarginPanel />,
      icon: <TrendingUp className={`h-5 w-5 ${margin >= 0 ? 'text-green-500' : 'text-red-500'}`} />,
      variant: margin >= 0 ? 'success' : 'danger',
      isMainColumn: false,
    },
    'quick-actions': {
      content: <QuickActionsPanel />,
      icon: <Zap className="h-5 w-5 text-primary" />,
      isMainColumn: false,
    },
  };

  // Split panels into main and sidebar columns
  const mainColumnPanels = panels.filter(p => panelComponents[p.id]?.isMainColumn);
  const sideColumnPanels = panels.filter(p => !panelComponents[p.id]?.isMainColumn);

  return (
    <div className="space-y-4">
      {/* Panel Customizer and Reset */}
      <div className="flex items-center gap-2 justify-end">
        <button
          onClick={() => resetLayout(VIEW_ID)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-foreground hover:border-primary hover:bg-bg-secondary transition-all"
          title="Layout zurücksetzen"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="text-sm font-medium">Zurücksetzen</span>
        </button>
        <PanelCustomizer viewId={VIEW_ID} />
      </div>

      {/* Hidden Panels Bar */}
      <HiddenPanelsBar viewId={VIEW_ID} showResetButton={false} />

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Main Price Calculator */}
        <DraggablePanelContainer viewId={VIEW_ID} className="col-span-2">
          {mainColumnPanels.map((panel) => {
            const config = panelComponents[panel.id];
            if (!config) return null;
            
            return (
              <DraggablePanel
                key={panel.id}
                id={panel.id}
                viewId={VIEW_ID}
                title={panel.title}
                icon={config.icon}
                variant={config.variant}
              >
                {config.content}
              </DraggablePanel>
            );
          })}
        </DraggablePanelContainer>

        {/* Right Column - Margin & Stats */}
        <DraggablePanelContainer viewId={VIEW_ID}>
          {sideColumnPanels.map((panel) => {
            const config = panelComponents[panel.id];
            if (!config) return null;
            
            return (
              <DraggablePanel
                key={panel.id}
                id={panel.id}
                viewId={VIEW_ID}
                title={panel.title}
                icon={config.icon}
                variant={config.variant}
              >
                {config.content}
              </DraggablePanel>
            );
          })}
        </DraggablePanelContainer>
      </div>
    </div>
  );
};
