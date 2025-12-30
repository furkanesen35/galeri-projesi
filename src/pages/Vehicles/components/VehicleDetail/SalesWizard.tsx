import { useState, useEffect, useRef } from "react";
import { Vehicle } from "../../../../types/domain";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  User,
  Car,
  Euro,
  FileText,
  Calendar,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Shield,
  Key,
  Pen,
  Upload,
  Download,
  FileCheck2,
  AlertCircle,
  Search,
  Users,
} from "lucide-react";
import {
  salesContractData,
  buyerProfile,
  buyerProfiles,
  companyBuyerProfiles,
  dealerProfile,
  carForSale,
} from "../../../../services/placeholderData";

interface Props {
  vehicle: Vehicle;
  onClose: () => void;
  onComplete: () => void;
}

type WizardStep =
  | "client-selection"
  | "buyer-info"
  | "vehicle-confirm"
  | "price-payment"
  | "terms"
  | "review"
  | "document-signature";

export const SalesWizard = ({ vehicle, onClose, onComplete }: Props) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>("client-selection");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [buyerSignature, setBuyerSignature] = useState<string | null>(null);
  const [sellerSignature, setSellerSignature] = useState<string | null>(null);
  const [showAutoSignModal, setShowAutoSignModal] = useState<
    "buyer" | "seller" | null
  >(null);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start with empty data, will load after delay
  const [formData, setFormData] = useState({
    buyer: {
      type: "",
      salutation: "",
      firstName: "",
      lastName: "",
      fullName: "",
      dateOfBirth: "",
      street: "",
      city: "",
      phone: "",
      email: "",
      idType: "",
      idNumber: "",
      driverLicenseNumber: "",
      iban: "",
      bic: "",
      bankName: "",
    },
    vehicle: {
      brand: "",
      model: "",
      variant: "",
      vin: "",
      licensePlate: "",
      firstRegistration: "",
      mileage: 0,
      color: "",
      fuelType: "",
      power: "",
      transmission: "",
      tuv: "",
      previousOwners: 0,
      condition: "",
    },
    price: {
      salePrice: 0,
      vatIncluded: true,
      vatRate: 19,
      netPrice: 0,
      vatAmount: 0,
      paymentMethod: "",
      downPayment: 0,
      remainingAmount: 0,
      paymentDueDate: "",
    },
    seller: salesContractData.seller,
    handover: salesContractData.handover,
    warranty: salesContractData.warranty,
    terms: salesContractData.terms,
    contract: salesContractData.contract,
  });

  // Simulate loading data from backend - only when client is selected
  useEffect(() => {
    if (!selectedClientId) return;

    setIsLoading(true);
    const timer = setTimeout(() => {
      // Find selected client from both private and company buyers
      const allClients = [...buyerProfiles, ...companyBuyerProfiles];
      const selectedClient = allClients.find(c => c.id === selectedClientId);
      
      if (selectedClient) {
        // Map company buyer to the expected format
        if (selectedClient.type === "company") {
          const companyClient = selectedClient as any;
          setFormData({
            buyer: {
              type: "company",
              salutation: "",
              firstName: companyClient.representative.name.split(' ')[0] || "",
              lastName: companyClient.representative.name.split(' ').slice(1).join(' ') || "",
              fullName: companyClient.companyName,
              dateOfBirth: companyClient.representative.dateOfBirth,
              street: companyClient.street,
              city: `${companyClient.postalCode} ${companyClient.city}`,
              phone: companyClient.phone,
              email: companyClient.email,
              idType: companyClient.representative.idType,
              idNumber: companyClient.representative.idNumber,
              driverLicenseNumber: "",
              iban: companyClient.iban,
              bic: companyClient.bic,
              bankName: companyClient.bankName,
            },
            vehicle: salesContractData.vehicle,
            price: salesContractData.price,
            seller: salesContractData.seller,
            handover: salesContractData.handover,
            warranty: salesContractData.warranty,
            terms: salesContractData.terms,
            contract: salesContractData.contract,
          });
        } else {
          // Private buyer
          setFormData({
            buyer: {
              type: selectedClient.type,
              salutation: selectedClient.salutation,
              firstName: selectedClient.firstName,
              lastName: selectedClient.lastName,
              fullName: selectedClient.fullName,
              dateOfBirth: selectedClient.dateOfBirth,
              street: selectedClient.street,
              city: `${selectedClient.postalCode} ${selectedClient.city}`,
              phone: selectedClient.phone,
              email: selectedClient.email,
              idType: selectedClient.idType,
              idNumber: selectedClient.idNumber,
              driverLicenseNumber: selectedClient.driverLicenseNumber,
              iban: selectedClient.iban,
              bic: selectedClient.bic,
              bankName: selectedClient.bankName,
            },
            vehicle: salesContractData.vehicle,
            price: salesContractData.price,
            seller: salesContractData.seller,
            handover: salesContractData.handover,
            warranty: salesContractData.warranty,
            terms: salesContractData.terms,
            contract: salesContractData.contract,
          });
        }
      }
      setIsLoading(false);
    }, 2500); // 2.5 seconds delay

    return () => clearTimeout(timer);
  }, [selectedClientId]);

  const updateFormData = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const steps: { id: WizardStep; label: string; icon: typeof User }[] = [
    { id: "client-selection", label: "Kunde wählen", icon: Users },
    { id: "buyer-info", label: "Käufer", icon: User },
    { id: "vehicle-confirm", label: "Fahrzeug", icon: Car },
    { id: "price-payment", label: "Preis & Zahlung", icon: Euro },
    { id: "terms", label: "Konditionen", icon: FileText },
    { id: "review", label: "Überprüfung", icon: CheckCircle2 },
    { id: "document-signature", label: "Unterschrift", icon: Pen },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(steps[nextIndex].id);
        setIsTransitioning(false);
      }, 800); // 0.8 second transition
    }
  };

  const handlePrev = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      // If going back to client selection, reset the selected client and clear data
      if (steps[prevIndex].id === "client-selection") {
        setSelectedClientId(null);
        setFormData({
          buyer: {
            type: "",
            salutation: "",
            firstName: "",
            lastName: "",
            fullName: "",
            dateOfBirth: "",
            street: "",
            city: "",
            phone: "",
            email: "",
            idType: "",
            idNumber: "",
            driverLicenseNumber: "",
            iban: "",
            bic: "",
            bankName: "",
          },
          vehicle: {
            brand: "",
            model: "",
            variant: "",
            vin: "",
            licensePlate: "",
            firstRegistration: "",
            mileage: 0,
            color: "",
            fuelType: "",
            power: "",
            transmission: "",
            tuv: "",
            previousOwners: 0,
            condition: "",
          },
          price: {
            salePrice: 0,
            vatIncluded: true,
            vatRate: 19,
            netPrice: 0,
            vatAmount: 0,
            paymentMethod: "",
            downPayment: 0,
            remainingAmount: 0,
            paymentDueDate: "",
          },
          seller: salesContractData.seller,
          handover: salesContractData.handover,
          warranty: salesContractData.warranty,
          terms: salesContractData.terms,
          contract: salesContractData.contract,
        });
      }
      
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(steps[prevIndex].id);
        setIsTransitioning(false);
      }, 600); // 0.6 second transition
    }
  };

  const handleComplete = () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  // Handle search with debounce
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(false);
    }, 800); // 800ms debounce
  };

  // Filter clients based on search
  const filteredClients = [...buyerProfiles, ...companyBuyerProfiles].filter(
    (client) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      if (client.type === "company") {
        const companyClient = client as any;
        return (
          companyClient.companyName.toLowerCase().includes(query) ||
          companyClient.email.toLowerCase().includes(query) ||
          companyClient.representative.name.toLowerCase().includes(query)
        );
      } else {
        return (
          client.fullName.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query) ||
          client.phone.toLowerCase().includes(query)
        );
      }
    }
  );

  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
    // Automatically move to next step after selection
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl max-h-[90vh] bg-surface rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Fahrzeug verkaufen
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {vehicle.brand} {vehicle.model} · {vehicle.plate}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-text-secondary hover:bg-bg-secondary hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border bg-bg-secondary/30">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = index < currentStepIndex;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-primary text-primary-text scale-110 shadow-lg"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-bg-secondary text-text-secondary"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        isActive
                          ? "text-primary"
                          : isCompleted
                          ? "text-green-500"
                          : "text-text-secondary"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-all ${
                        isCompleted ? "bg-green-500" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {isTransitioning ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-sm text-text-secondary">
                  Daten werden geladen...
                </p>
              </div>
            </div>
          ) : (
            <>
              {currentStep === "client-selection" && (
                <ClientSelectionStep
                  searchQuery={searchQuery}
                  onSearchChange={handleSearch}
                  isSearching={isSearching}
                  clients={filteredClients}
                  selectedClientId={selectedClientId}
                  onClientSelect={handleClientSelect}
                />
              )}
              {currentStep === "buyer-info" && (
                <BuyerInfoStep
                  data={formData.buyer}
                  isLoading={isLoading}
                  onChange={updateFormData}
                />
              )}
              {currentStep === "vehicle-confirm" && (
                <VehicleConfirmStep
                  data={formData.vehicle}
                  isLoading={isLoading}
                  onChange={updateFormData}
                />
              )}
              {currentStep === "price-payment" && (
                <PricePaymentStep
                  data={formData.price}
                  isLoading={isLoading}
                  onChange={updateFormData}
                />
              )}
              {currentStep === "terms" && (
                <TermsStep data={formData} isLoading={isLoading} />
              )}
              {currentStep === "review" && (
                <ReviewStep
                  data={formData}
                  isLoading={isLoading}
                  onPreview={() => {
                    console.log("🚀 PREVIEW BUTTON CLICKED - Step 5 (Review)");
                    console.log(
                      "📋 Current showDocumentPreview before:",
                      showDocumentPreview
                    );
                    setShowDocumentPreview(true);
                    console.log(
                      "✅ setShowDocumentPreview(true) called from Review"
                    );
                  }}
                />
              )}
              {currentStep === "document-signature" && (
                <DocumentSignatureStep
                  data={formData}
                  buyerSignature={buyerSignature}
                  sellerSignature={sellerSignature}
                  onBuyerSignature={setBuyerSignature}
                  onSellerSignature={setSellerSignature}
                  onAutoSign={(party) => setShowAutoSignModal(party)}
                  onPreview={() => {
                    console.log("🚀 PREVIEW BUTTON CLICKED - Step 5 (Review)");
                    console.log(
                      "📋 Current showDocumentPreview before:",
                      showDocumentPreview
                    );
                    setShowDocumentPreview(true);
                    console.log("✅ setShowDocumentPreview(true) called");
                  }}
                />
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-bg-secondary/30">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-bg-secondary hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Zurück
          </button>

          <div className="text-sm text-text-secondary">
            Schritt {currentStepIndex + 1} von {steps.length}
          </div>

          {currentStepIndex === steps.length - 1 ? (
            <button
              onClick={handleComplete}
              disabled={isProcessing || !buyerSignature || !sellerSignature}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Wird verkauft...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Verkauf abschließen
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentStep === "client-selection" && !selectedClientId}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-text font-semibold hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Auto-Sign Permission Modal */}
      {showAutoSignModal && (
        <AutoSignModal
          party={showAutoSignModal}
          onConfirm={(signature) => {
            if (showAutoSignModal === "buyer") {
              setBuyerSignature(signature);
            } else {
              setSellerSignature(signature);
            }
            setShowAutoSignModal(null);
          }}
          onCancel={() => setShowAutoSignModal(null)}
        />
      )}

      {/* Document Preview Modal */}
      {(() => {
        console.log(
          "🔎 Checking showDocumentPreview for modal render:",
          showDocumentPreview
        );
        return null;
      })()}
      {showDocumentPreview && (
        <DocumentPreviewModal
          data={formData}
          buyerSignature={buyerSignature}
          sellerSignature={sellerSignature}
          onClose={() => {
            console.log("🔒 Modal onClose callback triggered");
            setShowDocumentPreview(false);
            console.log("✅ setShowDocumentPreview(false) called");
          }}
        />
      )}
    </div>
  );
};

// ============ STEP COMPONENTS ============

const ClientSelectionStep = ({
  searchQuery,
  onSearchChange,
  isSearching,
  clients,
  selectedClientId,
  onClientSelect,
}: {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSearching: boolean;
  clients: any[];
  selectedClientId: string | null;
  onClientSelect: (clientId: string) => void;
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Kunde auswählen
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        Wählen Sie einen Kunden aus der Datenbank oder suchen Sie nach einem bestimmten Kunden.
      </p>
    </div>

    {/* Search Bar */}
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
        <Search className="h-5 w-5" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Suchen nach Name, Email, Firma..."
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-surface text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      />
      {isSearching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      )}
    </div>

    {/* Client List */}
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {isSearching ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-3 border-primary border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-sm text-text-secondary">Suche läuft...</p>
          </div>
        </div>
      ) : clients.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-text-secondary mx-auto mb-3 opacity-50" />
          <p className="text-sm text-text-secondary">
            Keine Kunden gefunden. Bitte passen Sie Ihre Suche an.
          </p>
        </div>
      ) : (
        clients.map((client) => {
          const isCompany = client.type === "company";
          const isSelected = client.id === selectedClientId;
          
          return (
            <button
              key={client.id}
              onClick={() => onClientSelect(client.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-lg scale-[1.02]"
                  : "border-border bg-surface hover:bg-bg-secondary hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    isCompany
                      ? "bg-purple-500/20 text-purple-500"
                      : "bg-blue-500/20 text-blue-500"
                  }`}
                >
                  {isCompany ? (
                    <Building2 className="h-6 w-6" />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground truncate">
                      {isCompany
                        ? (client as any).companyName
                        : client.fullName}
                    </h4>
                    {isSelected && (
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-text-secondary flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {client.email}
                    </p>
                    <p className="text-sm text-text-secondary flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {client.phone}
                    </p>
                    {isCompany && (
                      <p className="text-xs text-text-secondary mt-2">
                        Vertreter: {(client as any).representative.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })
      )}
    </div>

    {!isSearching && clients.length > 0 && (
      <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
        <p className="text-sm text-foreground flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <span>
            {clients.length} {clients.length === 1 ? 'Kunde gefunden' : 'Kunden gefunden'}. 
            {selectedClientId ? ' Klicken Sie auf "Weiter", um fortzufahren.' : ' Wählen Sie einen Kunden aus.'}
          </span>
        </p>
      </div>
    )}
  </div>
);

const BuyerInfoStep = ({
  data,
  isLoading,
  onChange,
}: {
  data: typeof salesContractData.buyer;
  isLoading: boolean;
  onChange: (section: string, field: string, value: any) => void;
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Käuferinformationen
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            Kundendaten werden geladen...
          </span>
        ) : (
          "Alle Informationen wurden aus der Kundendatenbank geladen."
        )}
      </p>
    </div>

    <div className="grid grid-cols-2 gap-6">
      {/* Personal Info */}
      <div className="col-span-2 rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Persönliche Daten
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Anrede"
            value={data.salutation}
            isLoading={isLoading}
            onChange={(v) => onChange("buyer", "salutation", v)}
          />
          <FormInput
            label="Vorname"
            value={data.firstName}
            isLoading={isLoading}
            onChange={(v) => onChange("buyer", "firstName", v)}
          />
          <FormInput
            label="Nachname"
            value={data.lastName}
            isLoading={isLoading}
            onChange={(v) => onChange("buyer", "lastName", v)}
          />
          <FormInput
            label="Geburtsdatum"
            type="date"
            value={data.dateOfBirth}
            isLoading={isLoading}
            onChange={(v) => onChange("buyer", "dateOfBirth", v)}
          />
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          Kontakt
        </h4>
        <div className="space-y-3">
          <FormInput
            label="Telefon"
            value={data.phone}
            isLoading={isLoading}
            icon={Phone}
            onChange={(v) => onChange("buyer", "phone", v)}
          />
          <FormInput
            label="E-Mail"
            type="email"
            value={data.email}
            isLoading={isLoading}
            icon={Mail}
            onChange={(v) => onChange("buyer", "email", v)}
          />
        </div>
      </div>

      {/* Address */}
      <div className="rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Adresse
        </h4>
        <div className="space-y-3">
          <FormInput
            label="Straße"
            value={data.street}
            isLoading={isLoading}
            onChange={(v) => onChange("buyer", "street", v)}
          />
          <FormInput
            label="PLZ, Stadt"
            value={data.city}
            isLoading={isLoading}
            onChange={(v) => onChange("buyer", "city", v)}
          />
        </div>
      </div>

      {/* ID Document */}
      <div className="rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Ausweis
        </h4>
        <div className="space-y-3">
          <FormInput
            label="Ausweisart"
            value={
              data.idType === "personalausweis"
                ? "Personalausweis"
                : data.idType
            }
            isLoading={isLoading}
            onChange={(v) => onChange("buyer", "idType", v)}
          />
          <FormInput
            label="Ausweisnummer"
            value={data.idNumber}
            isLoading={isLoading}
            onChange={(v) => onChange("buyer", "idNumber", v)}
          />
          <FormInput
            label="Führerscheinnummer"
            value={data.driverLicenseNumber}
            isLoading={isLoading}
            onChange={(v) => onChange("buyer", "driverLicenseNumber", v)}
          />
        </div>
      </div>

      {/* Bank Details */}
      <div className="rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Bankverbindung
        </h4>
        <div className="space-y-3">
          <FormInput
            label="Bank"
            value={data.bankName}
            isLoading={isLoading}
            onChange={(v) => onChange("buyer", "bankName", v)}
          />
          <FormInput
            label="IBAN"
            value={data.iban}
            isLoading={isLoading}
            onChange={(v) => onChange("buyer", "iban", v)}
          />
          <FormInput
            label="BIC"
            value={data.bic}
            isLoading={isLoading}
            onChange={(v) => onChange("buyer", "bic", v)}
          />
        </div>
      </div>
    </div>

    {!isLoading && (
      <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
        <p className="text-sm text-foreground flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-blue-500" />
          <span>Alle Käuferdaten sind vollständig und wurden validiert.</span>
        </p>
      </div>
    )}
  </div>
);

const VehicleConfirmStep = ({
  data,
  isLoading,
  onChange,
}: {
  data: typeof salesContractData.vehicle;
  isLoading: boolean;
  onChange: (section: string, field: string, value: any) => void;
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Fahrzeugdaten bestätigen
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            Fahrzeugdaten werden geladen...
          </span>
        ) : (
          "Bitte überprüfen Sie die Fahrzeugdaten vor dem Verkauf."
        )}
      </p>
    </div>

    <div className="grid grid-cols-2 gap-6">
      {/* Basic Info */}
      <div className="col-span-2 rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Car className="h-5 w-5 text-primary" />
          Fahrzeugdaten
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <FormInput
            label="Marke"
            value={data.brand}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "brand", v)}
          />
          <FormInput
            label="Modell"
            value={data.model}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "model", v)}
          />
          <FormInput
            label="Variante"
            value={data.variant}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "variant", v)}
          />
          <FormInput
            label="FIN/VIN"
            value={data.vin}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "vin", v)}
          />
          <FormInput
            label="Kennzeichen"
            value={data.licensePlate}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "licensePlate", v)}
          />
          <FormInput
            label="Erstzulassung"
            type="date"
            value={data.firstRegistration}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "firstRegistration", v)}
          />
        </div>
      </div>

      {/* Technical */}
      <div className="rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4">Technische Daten</h4>
        <div className="space-y-3">
          <FormInput
            label="Kraftstoff"
            value={data.fuelType}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "fuelType", v)}
          />
          <FormInput
            label="Leistung"
            value={data.power}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "power", v)}
          />
          <FormInput
            label="Getriebe"
            value={data.transmission}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "transmission", v)}
          />
          <FormInput
            label="Kilometerstand"
            type="number"
            value={data.mileage.toString()}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "mileage", parseInt(v))}
          />
        </div>
      </div>

      {/* Condition */}
      <div className="rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4">Zustand</h4>
        <div className="space-y-3">
          <FormInput
            label="Farbe"
            value={data.color}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "color", v)}
          />
          <FormInput
            label="Zustand"
            value={data.condition}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "condition", v)}
          />
          <FormInput
            label="TÜV gültig bis"
            type="date"
            value={data.tuv}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "tuv", v)}
          />
          <FormInput
            label="Vorbesitzer"
            type="number"
            value={data.previousOwners.toString()}
            isLoading={isLoading}
            onChange={(v) => onChange("vehicle", "previousOwners", parseInt(v))}
          />
        </div>
      </div>
    </div>

    {!isLoading && (
      <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
        <p className="text-sm text-foreground flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>
            Fahrzeug ist verkaufsbereit. Alle Dokumente sind vollständig.
          </span>
        </p>
      </div>
    )}
  </div>
);

const PricePaymentStep = ({
  data,
  isLoading,
  onChange,
}: {
  data: typeof salesContractData.price;
  isLoading: boolean;
  onChange: (section: string, field: string, value: any) => void;
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Preis & Zahlungsbedingungen
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            Preisdaten werden berechnet...
          </span>
        ) : (
          "Verkaufspreis und Zahlungsmodalitäten überprüfen."
        )}
      </p>
    </div>

    <div className="grid grid-cols-2 gap-6">
      {/* Price Breakdown */}
      <div className="col-span-2 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Euro className="h-5 w-5 text-primary" />
          Preisübersicht
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-text-secondary">Nettopreis</span>
            {isLoading ? (
              <SkeletonBar width="w-24" />
            ) : (
              <span className="font-medium text-foreground">
                {data.netPrice.toLocaleString("de-DE")} €
              </span>
            )}
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-text-secondary">MwSt. ({data.vatRate}%)</span>
            {isLoading ? (
              <SkeletonBar width="w-20" />
            ) : (
              <span className="font-medium text-foreground">
                {data.vatAmount.toLocaleString("de-DE")} €
              </span>
            )}
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-foreground">Gesamtpreis</span>
            {isLoading ? (
              <SkeletonBar width="w-32" height="h-8" />
            ) : (
              <span className="font-bold text-primary text-2xl">
                {data.salePrice.toLocaleString("de-DE")} €
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Zahlungsart
        </h4>
        <div className="space-y-3">
          <FormInput
            label="Methode"
            value={
              data.paymentMethod === "bank_transfer"
                ? "Überweisung"
                : data.paymentMethod
            }
            isLoading={isLoading}
            onChange={(v) => onChange("price", "paymentMethod", v)}
          />
          <FormInput
            label="Anzahlung"
            type="number"
            value={data.downPayment.toString()}
            isLoading={isLoading}
            suffix="€"
            onChange={(v) => onChange("price", "downPayment", parseInt(v))}
          />
          <FormInput
            label="Restbetrag"
            type="number"
            value={data.remainingAmount.toString()}
            isLoading={isLoading}
            suffix="€"
            onChange={(v) => onChange("price", "remainingAmount", parseInt(v))}
          />
          <FormInput
            label="Fällig am"
            type="date"
            value={data.paymentDueDate}
            isLoading={isLoading}
            onChange={(v) => onChange("price", "paymentDueDate", v)}
          />
        </div>
      </div>

      {/* Payment Schedule */}
      <div className="rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Zahlungsplan
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div>
              <p className="text-sm font-medium text-foreground">Anzahlung</p>
              <p className="text-xs text-text-secondary">Heute</p>
            </div>
            {isLoading ? (
              <SkeletonBar width="w-20" />
            ) : (
              <span className="font-semibold text-green-500">
                {data.downPayment.toLocaleString("de-DE")} €
              </span>
            )}
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div>
              <p className="text-sm font-medium text-foreground">Restbetrag</p>
              <p className="text-xs text-text-secondary">
                {isLoading
                  ? "..."
                  : new Date(data.paymentDueDate).toLocaleDateString("de-DE")}
              </p>
            </div>
            {isLoading ? (
              <SkeletonBar width="w-24" />
            ) : (
              <span className="font-semibold text-amber-500">
                {data.remainingAmount.toLocaleString("de-DE")} €
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TermsStep = ({
  data,
  isLoading,
}: {
  data: typeof salesContractData;
  isLoading: boolean;
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Vertragsbedingungen
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            Vertragsbedingungen werden geladen...
          </span>
        ) : (
          "Gewährleistung, Übergabe und weitere Konditionen."
        )}
      </p>
    </div>

    <div className="grid grid-cols-2 gap-6">
      {/* Warranty */}
      <div className="rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Gewährleistung
        </h4>
        <div className="space-y-3">
          <InfoField label="Art" value={data.warranty.warrantyType} />
          <InfoField
            label="Dauer"
            value={`${data.warranty.warrantyDuration} Monate`}
          />
          <InfoField label="Anbieter" value={data.warranty.warrantyProvider} />
          <InfoField label="Umfang" value={data.warranty.warrantyScope} />
          <InfoField
            label="Kilometerbegrenzung"
            value={`${data.warranty.mileageLimit.toLocaleString("de-DE")} km`}
          />
        </div>
      </div>

      {/* Handover */}
      <div className="rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          Übergabe
        </h4>
        <div className="space-y-3">
          <InfoField
            label="Datum"
            value={new Date(data.handover.date).toLocaleDateString("de-DE")}
          />
          <InfoField label="Ort" value={data.handover.location} />
        </div>
      </div>

      {/* Included Documents */}
      <div className="col-span-2 rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4">
          Mitgegebene Dokumente
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {data.handover.includedDocuments.map((doc, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{doc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Conditions */}
      <div className="col-span-2 rounded-xl border border-border bg-bg-secondary/30 p-6">
        <h4 className="font-semibold text-foreground mb-4">
          Weitere Konditionen
        </h4>
        <div className="grid grid-cols-3 gap-3">
          <ConditionBadge
            label="Probefahrt durchgeführt"
            active={data.terms.testDriveDone}
          />
          <ConditionBadge
            label="Fahrzeug begutachtet"
            active={data.terms.vehicleInspected}
          />
          <ConditionBadge label="Unfallfrei" active={data.terms.accidentFree} />
          <ConditionBadge label="Nichtraucher" active={data.terms.nonSmoker} />
          <ConditionBadge
            label="Keine Inzahlungnahme"
            active={!data.terms.tradeIn}
          />
          <ConditionBadge
            label="Keine Finanzierung"
            active={!data.terms.financing}
          />
        </div>
      </div>
    </div>
  </div>
);

const ReviewStep = ({
  data,
  isLoading,
  onPreview,
}: {
  data: typeof salesContractData;
  isLoading: boolean;
  onPreview?: () => void;
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Vertragsübersicht
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        Bitte überprüfen Sie alle Angaben vor dem Abschluss.
      </p>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-xl border border-border bg-gradient-to-br from-blue-500/10 to-transparent p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <User className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Käufer</p>
            <p className="font-semibold text-foreground">
              {data.buyer.fullName}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-gradient-to-br from-purple-500/10 to-transparent p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Car className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Fahrzeug</p>
            <p className="font-semibold text-foreground">
              {data.vehicle.brand} {data.vehicle.model}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-gradient-to-br from-green-500/10 to-transparent p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-green-500/20">
            <Euro className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Verkaufspreis</p>
            <p className="font-semibold text-foreground">
              {data.price.salePrice.toLocaleString("de-DE")} €
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Detailed Review */}
    <div className="space-y-4">
      <ReviewSection title="Verkäufer (Autohaus)" icon={Building2}>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <InfoField label="Name" value={data.seller.name} compact />
          <InfoField
            label="Adresse"
            value={data.seller.street + ", " + data.seller.city}
            compact
          />
          <InfoField
            label="Vertreter"
            value={data.seller.representative}
            compact
          />
          <InfoField
            label="Position"
            value={data.seller.representativePosition}
            compact
          />
        </div>
      </ReviewSection>

      <ReviewSection title="Käufer" icon={User}>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <InfoField label="Name" value={data.buyer.fullName} compact />
          <InfoField
            label="Adresse"
            value={data.buyer.street + ", " + data.buyer.city}
            compact
          />
          <InfoField label="Telefon" value={data.buyer.phone} compact />
          <InfoField label="E-Mail" value={data.buyer.email} compact />
        </div>
      </ReviewSection>

      <ReviewSection title="Fahrzeug" icon={Car}>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <InfoField
            label="Fahrzeug"
            value={`${data.vehicle.brand} ${data.vehicle.model}`}
            compact
          />
          <InfoField label="FIN" value={data.vehicle.vin} compact />
          <InfoField
            label="Kennzeichen"
            value={data.vehicle.licensePlate}
            compact
          />
        </div>
      </ReviewSection>

      <ReviewSection title="Preis & Zahlung" icon={Euro}>
        <div className="grid grid-cols-4 gap-3 text-sm">
          <InfoField
            label="Verkaufspreis"
            value={`${data.price.salePrice.toLocaleString("de-DE")} €`}
            compact
          />
          <InfoField
            label="Anzahlung"
            value={`${data.price.downPayment.toLocaleString("de-DE")} €`}
            compact
          />
          <InfoField
            label="Restbetrag"
            value={`${data.price.remainingAmount.toLocaleString("de-DE")} €`}
            compact
          />
          <InfoField
            label="Fällig am"
            value={new Date(data.price.paymentDueDate).toLocaleDateString(
              "de-DE"
            )}
            compact
          />
        </div>
      </ReviewSection>
    </div>

    {/* Final Confirmation */}
    <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-green-500/20">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-2">
            Bereit zum Abschluss
          </h4>
          <p className="text-sm text-text-secondary mb-4">
            Alle Daten wurden überprüft. Mit Klick auf "Verkauf abschließen"
            wird der Kaufvertrag erstellt und das Fahrzeug als verkauft
            markiert.
          </p>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <FileText className="h-4 w-4" />
            <span>Kaufvertrag-Nr: {data.contract.contractNumber}</span>
            <span>·</span>
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(data.contract.date).toLocaleDateString("de-DE")}
            </span>
          </div>
          {onPreview && (
            <button
              onClick={() => {
                console.log("🎯 Vorschau button clicked in ReviewStep");
                onPreview();
              }}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface hover:bg-bg-secondary transition-colors text-sm font-medium text-foreground"
            >
              <FileText className="h-4 w-4" />
              Vertrag Vorschau
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

const DocumentSignatureStep = ({
  data,
  buyerSignature,
  sellerSignature,
  onBuyerSignature,
  onSellerSignature,
  onAutoSign,
  onPreview,
}: {
  data: typeof salesContractData;
  buyerSignature: string | null;
  sellerSignature: string | null;
  onBuyerSignature: (sig: string | null) => void;
  onSellerSignature: (sig: string | null) => void;
  onAutoSign: (party: "buyer" | "seller") => void;
  onPreview: () => void;
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Kaufvertrag & Unterschriften
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        Bitte unterschreiben Sie den Kaufvertrag digital. Der Vertrag wird
        automatisch generiert und gespeichert.
      </p>
    </div>

    {/* Document Preview */}
    <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <FileCheck2 className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-foreground mb-2">
            Kaufvertrag {data.contract.contractNumber}
          </h4>
          <p className="text-sm text-text-secondary mb-4">
            Dieser Kaufvertrag wird nach Unterzeichnung automatisch als PDF
            generiert und beiden Parteien zugestellt.
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-text-secondary">Fahrzeug</p>
              <p className="font-medium text-foreground">
                {data.vehicle.brand} {data.vehicle.model}
              </p>
            </div>
            <div>
              <p className="text-text-secondary">Käufer</p>
              <p className="font-medium text-foreground">
                {data.buyer.fullName}
              </p>
            </div>
            <div>
              <p className="text-text-secondary">Kaufpreis</p>
              <p className="font-medium text-foreground">
                {data.price.salePrice.toLocaleString("de-DE")} €
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            console.log("🎯 Vorschau button clicked in DocumentSignatureStep");
            onPreview();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface hover:bg-bg-secondary transition-colors text-sm font-medium text-foreground"
        >
          <Download className="h-4 w-4" />
          Vorschau
        </button>
      </div>
    </div>

    {/* Signatures */}
    <div className="grid grid-cols-2 gap-6">
      {/* Seller Signature */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Verkäufer (Autohaus)
            </h4>
            <p className="text-xs text-text-secondary mt-1">
              {data.seller.representative}
            </p>
          </div>
          <button
            onClick={() => onAutoSign("seller")}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <Pen className="h-3 w-3" />
            Aus Profil laden
          </button>
        </div>

        <SignatureCanvas
          signature={sellerSignature}
          onSignature={onSellerSignature}
          placeholder="Unterschrift des Verkäufers"
        />

        <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
          <Calendar className="h-3 w-3" />
          <span>
            {new Date().toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* Buyer Signature */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Käufer
            </h4>
            <p className="text-xs text-text-secondary mt-1">
              {data.buyer.fullName}
            </p>
          </div>
          <button
            onClick={() => onAutoSign("buyer")}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <Pen className="h-3 w-3" />
            Aus Profil laden
          </button>
        </div>

        <SignatureCanvas
          signature={buyerSignature}
          onSignature={onBuyerSignature}
          placeholder="Unterschrift des Käufers"
        />

        <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
          <Calendar className="h-3 w-3" />
          <span>
            {new Date().toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>

    {/* Legal Notice */}
    <div className="rounded-lg border border-border bg-bg-secondary/30 p-4">
      <div className="flex items-start gap-3">
        <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-text-secondary">
          <p className="font-medium text-foreground mb-1">
            Rechtlich verbindlich
          </p>
          <p>
            Mit Ihrer Unterschrift bestätigen Sie, dass Sie den Kaufvertrag
            gelesen haben und den Bedingungen zustimmen. Die digitale
            Unterschrift ist rechtlich bindend gemäß eIDAS-Verordnung.
          </p>
        </div>
      </div>
    </div>

    {/* Status Messages */}
    {(!buyerSignature || !sellerSignature) && (
      <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
        <p className="text-sm text-foreground flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <span>
            Bitte beide Unterschriften eintragen, um den Verkauf abzuschließen.
            {!sellerSignature && " Verkäufer-Unterschrift fehlt."}
            {!buyerSignature && " Käufer-Unterschrift fehlt."}
          </span>
        </p>
      </div>
    )}

    {buyerSignature && sellerSignature && (
      <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
        <p className="text-sm text-foreground flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>
            Alle Unterschriften vollständig. Sie können den Verkauf nun
            abschließen.
          </span>
        </p>
      </div>
    )}
  </div>
);

// ============ SIGNATURE COMPONENTS ============

const SignatureCanvas = ({
  signature,
  onSignature,
  placeholder,
}: {
  signature: string | null;
  onSignature: (sig: string | null) => void;
  placeholder: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (signature && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = signature;
      }
    }
  }, [signature]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (canvas) {
      onSignature(canvas.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onSignature(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        onSignature(canvas.toDataURL());
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    setShowUpload(false);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full border-2 border-dashed border-border rounded-lg bg-white cursor-crosshair"
        />
        {!signature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-sm text-text-secondary">{placeholder}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={clearSignature}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-bg-secondary transition-colors text-xs font-medium text-foreground"
        >
          <X className="h-3 w-3" />
          Löschen
        </button>

        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-bg-secondary transition-colors text-xs font-medium text-foreground"
        >
          <Upload className="h-3 w-3" />
          Hochladen
        </button>

        {signature && (
          <span className="text-xs text-green-500 flex items-center gap-1 ml-auto">
            <CheckCircle2 className="h-3 w-3" />
            Unterschrift vorhanden
          </span>
        )}
      </div>

      {showUpload && (
        <div className="p-3 rounded-lg border border-border bg-bg-secondary/50">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="text-xs w-full"
          />
        </div>
      )}
    </div>
  );
};

const DocumentPreviewModal = ({
  data,
  buyerSignature,
  sellerSignature,
  onClose,
}: {
  data: typeof salesContractData;
  buyerSignature: string | null;
  sellerSignature: string | null;
  onClose: () => void;
}) => {
  console.log("📄 DocumentPreviewModal RENDERING");
  console.log("📊 Modal Props:", {
    data: !!data,
    buyerSignature: !!buyerSignature,
    sellerSignature: !!sellerSignature,
  });
  const handlePrint = () => {
    console.log("🖨️ Print button clicked");
    // Create print-friendly version
    const printContent = document.getElementById("contract-preview")?.innerHTML;
    console.log("📄 Print content found:", !!printContent);
    const printWindow = window.open("", "_blank");
    if (printWindow && printContent) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Kaufvertrag ${data.contract.contractNumber}</title>
          <style>
            @page { size: A4; margin: 2cm; }
            body { 
              font-family: 'Arial', sans-serif; 
              font-size: 11pt; 
              line-height: 1.4;
              color: #000;
              max-width: 21cm;
              margin: 0 auto;
            }
            h1 { font-size: 20pt; text-align: center; margin: 0 0 0.5cm 0; }
            h2 { font-size: 14pt; margin: 1cm 0 0.3cm 0; border-bottom: 2px solid #000; padding-bottom: 0.2cm; }
            h3 { font-size: 12pt; margin: 0.6cm 0 0.3cm 0; }
            table { width: 100%; border-collapse: collapse; margin: 0.3cm 0; }
            td { padding: 0.2cm; border: 1px solid #000; }
            .header-section { text-align: center; margin-bottom: 1cm; border-bottom: 3px solid #000; padding-bottom: 0.5cm; }
            .party-section { display: inline-block; width: 48%; vertical-align: top; }
            .signature-section { margin-top: 2cm; }
            .signature-box { border-top: 1px solid #000; padding-top: 0.3cm; margin-top: 2cm; }
            img.signature { max-height: 2cm; }
            .legal-notice { font-size: 9pt; background: #f5f5f5; padding: 0.3cm; margin-top: 1cm; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownload = () => {
    console.log("💾 Download PDF button clicked");
    alert(
      "In der Vollversion wird hier ein PDF mit dem vollständigen Kaufvertrag generiert und heruntergeladen."
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-[21cm] max-h-[95vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-300 bg-gray-50 print:hidden">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Kaufvertrag - Vorschau
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Druckfertiges A4-Format
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-900"
            >
              <Download className="h-4 w-4" />
              Drucken (Strg+P)
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors text-sm font-semibold"
            >
              <FileText className="h-4 w-4" />
              Als PDF
            </button>
            <button
              onClick={() => {
                console.log("❌ CLOSE BUTTON CLICKED in DocumentPreviewModal");
                onClose();
              }}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Document Content - A4 Format */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
          <div
            id="contract-preview"
            className="bg-white shadow-lg mx-auto p-16"
            style={{
              width: "21cm",
              minHeight: "29.7cm",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {/* Header with Logo Space */}
            <div className="text-center mb-12 pb-6 border-b-4 border-gray-900">
              <div className="mb-6">
                <div className="inline-block px-6 py-2 bg-gray-900 text-white text-2xl font-bold">
                  {data.seller.name}
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                KAUFVERTRAG
              </h1>
              <p className="text-lg text-gray-700">
                über ein gebrauchtes Kraftfahrzeug
              </p>
              <p className="text-sm text-gray-600 mt-4 font-mono">
                Vertragsnummer: {data.contract.contractNumber}
              </p>
              <p className="text-sm text-gray-600 font-mono">
                Datum:{" "}
                {new Date(data.contract.date).toLocaleDateString("de-DE")}
              </p>
            </div>

            {/* Vertragsparteien */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-900">
                § 1 VERTRAGSPARTEIEN
              </h2>

              <div className="grid grid-cols-2 gap-8">
                {/* Verkäufer */}
                <div className="border-2 border-gray-900 p-5 bg-gray-50">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                    VERKÄUFER
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-bold text-base text-gray-900">
                      {data.seller.name}
                    </p>
                    <p className="text-gray-800">{data.seller.street}</p>
                    <p className="text-gray-800">{data.seller.city}</p>
                    <div className="pt-3 mt-3 border-t border-gray-400">
                      <p className="text-gray-700">Tel: {data.seller.phone}</p>
                      <p className="text-gray-700">
                        E-Mail: {data.seller.email}
                      </p>
                      <p className="text-gray-700 mt-2">
                        USt-IdNr: <strong>{data.seller.ustId}</strong>
                      </p>
                      <p className="text-gray-700">
                        {data.seller.commercialRegister}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-400">
                      <p className="text-gray-700">Vertreten durch:</p>
                      <p className="font-semibold text-gray-900">
                        {data.seller.representative}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Käufer */}
                <div className="border-2 border-gray-900 p-5">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                    KÄUFER
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-bold text-base text-gray-900">
                      {data.buyer.fullName}
                    </p>
                    <p className="text-gray-800">
                      Geb.:{" "}
                      {new Date(data.buyer.dateOfBirth).toLocaleDateString(
                        "de-DE"
                      )}
                    </p>
                    <p className="text-gray-800 mt-3">{data.buyer.street}</p>
                    <p className="text-gray-800">{data.buyer.city}</p>
                    <div className="pt-3 mt-3 border-t border-gray-400">
                      <p className="text-gray-700">Tel: {data.buyer.phone}</p>
                      <p className="text-gray-700">
                        E-Mail: {data.buyer.email}
                      </p>
                      <p className="text-gray-700 mt-2">
                        Ausweis: {data.buyer.idNumber}
                      </p>
                      <p className="text-gray-700">
                        Führerschein: {data.buyer.driverLicenseNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fahrzeugdaten */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-900">
                § 2 KAUFGEGENSTAND
              </h2>

              <table className="w-full border-2 border-gray-900">
                <tbody>
                  <tr className="bg-gray-900 text-white">
                    <td
                      className="border border-gray-700 px-4 py-3 font-bold"
                      colSpan={2}
                    >
                      FAHRZEUGDATEN
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-semibold bg-gray-100 w-1/3 text-gray-900">
                      Hersteller / Typ
                    </td>
                    <td className="border border-gray-400 px-4 py-2 font-bold text-gray-900 bg-white">
                      {data.vehicle.brand} {data.vehicle.model}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-semibold bg-gray-100 text-gray-900">
                      Modellvariante
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-gray-900 bg-white">
                      {data.vehicle.variant}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-semibold bg-gray-100 text-gray-900">
                      Fahrgestellnummer (FIN)
                    </td>
                    <td className="border border-gray-400 px-4 py-2 font-mono font-bold text-gray-900 bg-white">
                      {data.vehicle.vin}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-semibold bg-gray-100 text-gray-900">
                      Amtl. Kennzeichen
                    </td>
                    <td className="border border-gray-400 px-4 py-2 font-bold text-gray-900 bg-white">
                      {data.vehicle.licensePlate}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-semibold bg-gray-100 text-gray-900">
                      Erstzulassung
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-gray-900 bg-white">
                      {new Date(
                        data.vehicle.firstRegistration
                      ).toLocaleDateString("de-DE")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-semibold bg-gray-100 text-gray-900">
                      Kilometerstand
                    </td>
                    <td className="border border-gray-400 px-4 py-2 font-bold text-gray-900 bg-white">
                      {data.vehicle.mileage.toLocaleString("de-DE")} km
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-semibold bg-gray-100 text-gray-900">
                      Lackierung
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-gray-900 bg-white">
                      {data.vehicle.color}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-semibold bg-gray-100 text-gray-900">
                      Kraftstoff
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-gray-900 bg-white">
                      {data.vehicle.fuelType}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-semibold bg-gray-100 text-gray-900">
                      Leistung
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-gray-900 bg-white">
                      {data.vehicle.power}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-semibold bg-gray-100 text-gray-900">
                      Getriebe
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-gray-900 bg-white">
                      {data.vehicle.transmission}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-semibold bg-gray-100 text-gray-900">
                      HU/AU gültig bis
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-gray-900 bg-white">
                      {new Date(data.vehicle.tuv).toLocaleDateString("de-DE")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-semibold bg-gray-100 text-gray-900">
                      Vorbesitzer
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-gray-900 bg-white">
                      {data.vehicle.previousOwners}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Kaufpreis */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-900">
                § 3 KAUFPREIS UND ZAHLUNG
              </h2>

              <div className="border-4 border-gray-900 p-6 bg-gray-50">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="py-2 text-gray-800">Nettopreis:</td>
                      <td className="py-2 text-right font-bold text-lg">
                        {data.price.netPrice.toLocaleString("de-DE", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        €
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-800">
                        zzgl. Mehrwertsteuer ({data.price.vatRate}%):
                      </td>
                      <td className="py-2 text-right font-bold text-lg">
                        {data.price.vatAmount.toLocaleString("de-DE", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        €
                      </td>
                    </tr>
                    <tr className="border-t-4 border-gray-900">
                      <td className="py-3 text-xl font-bold text-gray-900">
                        GESAMTKAUFPREIS:
                      </td>
                      <td className="py-3 text-right text-3xl font-bold text-gray-900">
                        {data.price.salePrice.toLocaleString("de-DE", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        €
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 border-2 border-gray-400 bg-white">
                <h3 className="font-bold text-gray-900 mb-3">
                  Zahlungsmodalitäten:
                </h3>
                <ul className="space-y-2 text-sm text-gray-900">
                  <li className="flex justify-between">
                    <span className="text-gray-900">
                      • Anzahlung bei Vertragsunterzeichnung:
                    </span>
                    <strong className="text-gray-900">
                      {data.price.downPayment.toLocaleString("de-DE", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      €
                    </strong>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-900">
                      • Restbetrag fällig bis{" "}
                      {new Date(data.price.paymentDueDate).toLocaleDateString(
                        "de-DE"
                      )}
                      :
                    </span>
                    <strong className="text-gray-900">
                      {data.price.remainingAmount.toLocaleString("de-DE", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      €
                    </strong>
                  </li>
                  <li className="text-gray-900">
                    • Zahlungsart:{" "}
                    {data.price.paymentMethod === "bank_transfer"
                      ? "Banküberweisung"
                      : "Barzahlung"}
                  </li>
                </ul>
              </div>
            </div>

            {/* Gewährleistung */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-900">
                § 4 GEWÄHRLEISTUNG
              </h2>
              <div className="text-sm space-y-2 p-4 border-2 border-gray-400 bg-white">
                <p className="text-gray-900">
                  <strong className="text-gray-900">
                    Art der Gewährleistung:
                  </strong>{" "}
                  {data.warranty.warrantyType}
                </p>
                <p className="text-gray-900">
                  <strong className="text-gray-900">Laufzeit:</strong>{" "}
                  {data.warranty.warrantyDuration} Monate ab Übergabe
                </p>
                <p className="text-gray-900">
                  <strong className="text-gray-900">Umfang:</strong>{" "}
                  {data.warranty.warrantyScope}
                </p>
                <p className="text-gray-900">
                  <strong className="text-gray-900">
                    Kilometerbegrenzung:
                  </strong>{" "}
                  {data.warranty.mileageLimit.toLocaleString("de-DE")} km
                </p>
                <p className="text-gray-900">
                  <strong className="text-gray-900">Anbieter:</strong>{" "}
                  {data.warranty.warrantyProvider}
                </p>
              </div>
            </div>

            {/* Übergabe */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-900">
                § 5 ÜBERGABE
              </h2>
              <div className="text-sm p-4 border-2 border-gray-400 bg-white">
                <p className="mb-3 text-gray-900">
                  <strong className="text-gray-900">Übergabedatum:</strong>{" "}
                  {new Date(data.handover.date).toLocaleDateString("de-DE")}
                </p>
                <p className="mb-4 text-gray-900">
                  <strong className="text-gray-900">Übergabeort:</strong>{" "}
                  {data.handover.location}
                </p>

                <p className="font-bold mb-2 text-gray-900">
                  Folgende Dokumente und Gegenstände werden übergeben:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-900">
                  {data.handover.includedDocuments.map((doc, i) => (
                    <li key={i} className="text-gray-900">
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Unterschriften */}
            <div className="mt-16 pt-8 border-t-4 border-gray-900">
              <h2 className="text-xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-gray-900">
                § 6 VERTRAGSUNTERZEICHNUNG
              </h2>

              <div className="grid grid-cols-2 gap-12">
                <div>
                  <div className="mb-6">
                    <p className="text-sm text-gray-600">Ort, Datum</p>
                    <p className="font-bold text-gray-900 text-lg">
                      {data.contract.place},{" "}
                      {new Date(data.contract.date).toLocaleDateString("de-DE")}
                    </p>
                  </div>

                  <div className="pt-16 border-t-2 border-gray-900 mt-20">
                    {sellerSignature && (
                      <div className="mb-4 -mt-20">
                        <img
                          src={sellerSignature}
                          alt="Unterschrift Verkäufer"
                          className="h-16"
                        />
                      </div>
                    )}
                    <p className="font-bold text-gray-900">
                      Unterschrift Verkäufer
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {data.seller.representative}
                    </p>
                    <p className="text-xs text-gray-600">
                      {data.seller.representativePosition}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-6">
                    <p className="text-sm text-gray-600">Ort, Datum</p>
                    <p className="font-bold text-gray-900 text-lg">
                      {data.contract.place},{" "}
                      {new Date(data.contract.date).toLocaleDateString("de-DE")}
                    </p>
                  </div>

                  <div className="pt-16 border-t-2 border-gray-900 mt-20">
                    {buyerSignature && (
                      <div className="mb-4 -mt-20">
                        <img
                          src={buyerSignature}
                          alt="Unterschrift Käufer"
                          className="h-16"
                        />
                      </div>
                    )}
                    <p className="font-bold text-gray-900">
                      Unterschrift Käufer
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {data.buyer.fullName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rechtliche Hinweise */}
            <div className="mt-12 p-6 bg-gray-100 border-2 border-gray-400 text-xs text-gray-700 leading-relaxed">
              <p className="font-bold text-sm text-gray-900 mb-3">
                RECHTLICHE HINWEISE:
              </p>
              <p className="mb-2">
                Der Verkäufer bestätigt, dass er Eigentümer des oben
                beschriebenen Fahrzeugs ist und dieses frei von Rechten Dritter
                ist. Das Fahrzeug wird unter Ausschluss jeglicher
                Sachmängelhaftung verkauft, soweit gesetzlich zulässig.
              </p>
              <p className="mb-2">
                Der Käufer bestätigt, das Fahrzeug besichtigt und Probe gefahren
                zu haben. Der Zustand des Fahrzeugs wurde zur Kenntnis genommen
                und akzeptiert. Mündliche Nebenabreden bestehen nicht.
              </p>
              <p>
                Dieser Kaufvertrag wurde in zweifacher Ausfertigung erstellt.
                Jede Vertragspartei erhält eine Ausfertigung. Die digitalen
                Unterschriften sind gemäß eIDAS-Verordnung (EU) Nr. 910/2014
                rechtlich bindend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AutoSignModal = ({
  party,
  onConfirm,
  onCancel,
}: {
  party: "buyer" | "seller";
  onConfirm: (signature: string) => void;
  onCancel: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Simulated signature from profile (in real app, this would be fetched from database)
  const mockSignatures = {
    buyer:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDUwIDEwMCBRIDEwMCA1MCAxNTAgMTAwIFQgMjUwIDEwMCBRIDMwMCA1MCAzNTAgMTAwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==",
    seller:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDUwIDUwIEwgMTUwIDE1MCBNIDE1MCA1MCBMIDUwIDE1MCBNIDE4MCA3NSBMIDI1MCA3NSBMIDI1MCAxMDAgTCAzMDAgMTAwIE0gMzIwIDUwIEwgMzcwIDEwMCBMIDMyMCAxNTAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PC9zdmc+",
  };

  const handleConfirm = () => {
    setIsLoading(true);
    // Simulate loading signature from profile
    setTimeout(() => {
      onConfirm(mockSignatures[party]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-2xl border border-border p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Unterschrift aus Profil laden
            </h3>
            <p className="text-sm text-text-secondary">
              Möchten Sie die gespeicherte Unterschrift{" "}
              {party === "buyer" ? "des Käufers" : "des Verkäufers"} automatisch
              laden und verwenden?
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-bg-secondary/30 p-4 mb-6">
          <p className="text-sm text-text-secondary mb-3">
            <strong className="text-foreground">Sicherheitshinweis:</strong>
          </p>
          <ul className="text-xs text-text-secondary space-y-1 list-disc list-inside">
            <li>Die Unterschrift ist in Ihrem Profil hinterlegt</li>
            <li>Sie wird sicher verschlüsselt übertragen</li>
            <li>Die Verwendung ist rechtlich bindend</li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-surface hover:bg-bg-secondary transition-colors text-sm font-medium text-foreground"
          >
            Abbrechen
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-text font-semibold hover:bg-primary-hover transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-primary-text border-t-transparent rounded-full" />
                Lädt...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Bestätigen
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ HELPER COMPONENTS ============

const FormInput = ({
  label,
  value,
  type = "text",
  icon: Icon,
  isLoading,
  suffix,
  onChange,
}: {
  label: string;
  value: string;
  type?: string;
  icon?: typeof Phone;
  isLoading: boolean;
  suffix?: string;
  onChange: (value: string) => void;
}) => (
  <div className="space-y-2">
    <label className="text-xs text-text-secondary uppercase tracking-wide font-medium">
      {label}
    </label>
    {isLoading ? (
      <SkeletonBar />
    ) : (
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-text-secondary flex-shrink-0" />}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={isLoading ? "" : `${label} eingeben...`}
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-white text-gray-900 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
        />
        {suffix && (
          <span className="text-sm text-text-secondary">{suffix}</span>
        )}
      </div>
    )}
  </div>
);

const SkeletonBar = ({
  width = "w-full",
  height = "h-9",
}: {
  width?: string;
  height?: string;
}) => (
  <div className={`${width} ${height} bg-border/30 rounded-lg animate-pulse`} />
);

const InfoField = ({
  label,
  value,
  icon: Icon,
  compact = false,
}: {
  label: string;
  value: string;
  icon?: typeof Phone;
  compact?: boolean;
}) => (
  <div className={compact ? "space-y-1" : "space-y-2"}>
    <label className="text-xs text-text-secondary uppercase tracking-wide">
      {label}
    </label>
    <div className="flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4 text-text-secondary" />}
      <p
        className={`${
          compact ? "text-sm" : "text-base"
        } font-medium text-foreground`}
      >
        {value}
      </p>
    </div>
  </div>
);

const ConditionBadge = ({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) => (
  <div
    className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
      active
        ? "bg-green-500/10 border-green-500/20 text-green-500"
        : "bg-red-500/10 border-red-500/20 text-red-500"
    }`}
  >
    {active ? <CheckCircle2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
    <span className="text-xs font-medium">{label}</span>
  </div>
);

const ReviewSection = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Building2;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-border bg-bg-secondary/30 p-5">
    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
      <Icon className="h-5 w-5 text-primary" />
      {title}
    </h4>
    {children}
  </div>
);
