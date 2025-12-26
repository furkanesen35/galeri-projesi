import { useState } from 'react';
import { Vehicle } from '../../../../types/domain';
import { 
  Calculator, Euro, TrendingUp, TrendingDown, Percent, 
  PiggyBank, Receipt, ArrowRight, Info, RefreshCw
} from 'lucide-react';

interface Props {
  vehicle: Vehicle;
}

export const VehiclePriceTab = ({ vehicle }: Props) => {
  const [sellingPrice, setSellingPrice] = useState(vehicle.price);
  const [discount, setDiscount] = useState(0);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [extras, setExtras] = useState(0);

  const purchasePrice = vehicle.purchasePrice || 0;
  const netPrice = vehicle.priceNet || Math.round(sellingPrice / 1.19);
  const vat = sellingPrice - netPrice;
  
  const discountAmount = (sellingPrice * discount) / 100;
  const finalPrice = sellingPrice - discountAmount + extras - tradeInValue;
  const margin = finalPrice - purchasePrice;
  const marginPercent = purchasePrice > 0 ? ((margin / purchasePrice) * 100).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Column - Price Calculator */}
      <div className="col-span-2 space-y-6">
        {/* Base Price Card */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Euro className="h-5 w-5 text-primary" />
            Grundpreis
          </h3>
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
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
            <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
            <span className="text-sm text-blue-400">
              MwSt. (19%): € {vat.toLocaleString('de-DE')}
            </span>
          </div>
        </div>

        {/* Price Adjustments Card */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Preisanpassungen
          </h3>
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
        </div>

        {/* Final Price Summary */}
        <div className="rounded-xl border-2 border-primary bg-primary/5 p-6">
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
        </div>
      </div>

      {/* Right Column - Margin & Stats */}
      <div className="space-y-6">
        {/* Purchase Price Card */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-primary" />
            Einkauf
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Einkaufspreis</span>
              <span className="text-lg font-bold text-foreground">€ {purchasePrice.toLocaleString('de-DE')}</span>
            </div>
          </div>
        </div>

        {/* Margin Card */}
        <div className={`rounded-xl border-2 p-6 ${margin >= 0 ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className={`h-5 w-5 ${margin >= 0 ? 'text-green-500' : 'text-red-500'}`} />
            Marge
          </h3>
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
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Aktionen</h3>
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
        </div>
      </div>
    </div>
  );
};
