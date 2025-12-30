import React from 'react';

interface IconProps {
  className?: string;
}

// Engine Block Icon - classic "check engine" warning light symbol
export const EngineIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* Classic check engine light icon */}
    <path d="M4 10h1V9H4v1zm0 5h1v-1H4v1zm16-5h1V9h-1v1zm0 5h1v-1h-1v1z" />
    <path d="M6 7h2V5H6v2z" />
    <path d="M3 11h1v2H3v-2z" />
    <path d="M21 11h1v2h-1v-2z" />
    <path d="M5 8h14v8H5V8z" fillOpacity="0" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 8V6h3v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 8V6h3v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 5h4v1h-4z" />
    <path d="M5 16v2h14v-2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <rect x="8" y="10" width="3" height="4" rx="0.5" fillOpacity="0.3" />
    <rect x="13" y="10" width="3" height="4" rx="0.5" fillOpacity="0.3" />
  </svg>
);

// Tire Icon - wheel with treads
export const TireIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Outer tire */}
    <circle cx="12" cy="12" r="10" />
    {/* Inner rim */}
    <circle cx="12" cy="12" r="5" />
    {/* Hub */}
    <circle cx="12" cy="12" r="2" />
    {/* Tread pattern */}
    <path d="M12 2v3" />
    <path d="M12 19v3" />
    <path d="M2 12h3" />
    <path d="M19 12h3" />
    <path d="M4.93 4.93l2.12 2.12" />
    <path d="M16.95 16.95l2.12 2.12" />
    <path d="M4.93 19.07l2.12-2.12" />
    <path d="M16.95 7.05l2.12-2.12" />
  </svg>
);

// Brake Disc with Caliper Icon
export const BrakeIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Brake disc outer */}
    <circle cx="12" cy="12" r="9" />
    {/* Disc ventilation slots */}
    <circle cx="12" cy="12" r="5" />
    <path d="M12 7v2" />
    <path d="M12 15v2" />
    <path d="M7 12h2" />
    <path d="M15 12h2" />
    {/* Center hub */}
    <circle cx="12" cy="12" r="2" />
    {/* Brake caliper */}
    <path d="M19 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2" strokeWidth="2" />
  </svg>
);

// Oil Drop Icon
export const OilDropIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Oil drop shape */}
    <path d="M12 2c0 0-7 8-7 13a7 7 0 0 0 14 0c0-5-7-13-7-13z" />
    {/* Shine */}
    <path d="M9 14a3 3 0 0 0 3 3" />
  </svg>
);

// Transmission/Gearbox Icon
export const TransmissionIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Gear shift pattern */}
    <path d="M6 4v6" />
    <path d="M12 4v6" />
    <path d="M18 4v6" />
    <path d="M6 10h12" />
    <path d="M6 14v6" />
    <path d="M12 14v6" />
    <path d="M18 14v6" />
    {/* Gear numbers */}
    <circle cx="6" cy="4" r="1.5" fill="currentColor" />
    <circle cx="12" cy="4" r="1.5" fill="currentColor" />
    <circle cx="18" cy="4" r="1.5" fill="currentColor" />
    <circle cx="6" cy="20" r="1.5" fill="currentColor" />
    <circle cx="12" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);

// Car Battery Icon
export const CarBatteryIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Battery body */}
    <rect x="2" y="7" width="20" height="12" rx="2" />
    {/* Terminals */}
    <path d="M6 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
    <path d="M14 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
    {/* + and - symbols */}
    <path d="M6 12h3" />
    <path d="M7.5 10.5v3" />
    <path d="M15 12h3" />
  </svg>
);

// AC/Climate Icon - Snowflake with air flow
export const ACIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Snowflake */}
    <path d="M12 2v20" />
    <path d="M2 12h20" />
    <path d="M4.93 4.93l14.14 14.14" />
    <path d="M19.07 4.93L4.93 19.07" />
    {/* Snowflake details */}
    <path d="M12 6l-2-2" />
    <path d="M12 6l2-2" />
    <path d="M12 18l-2 2" />
    <path d="M12 18l2 2" />
    <path d="M6 12l-2-2" />
    <path d="M6 12l-2 2" />
    <path d="M18 12l2-2" />
    <path d="M18 12l2 2" />
  </svg>
);

// Car Body/Bodywork Icon
export const CarBodyIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Car body profile */}
    <path d="M3 14l2-6h4l3-3h4l2 3h3l2 6" />
    <path d="M3 14h18v3H3z" />
    {/* Windows */}
    <path d="M7 8l1 3h3l2-3" />
    {/* Wheels */}
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    {/* Door line */}
    <path d="M11 11v6" />
  </svg>
);

// Paint Spray Gun Icon
export const PaintSprayIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Spray gun body */}
    <path d="M5 12h8l2 3v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8z" />
    {/* Trigger */}
    <path d="M8 12V9l3-1v4" />
    {/* Nozzle */}
    <path d="M13 12l4-4" />
    {/* Spray particles */}
    <circle cx="19" cy="6" r="0.5" fill="currentColor" />
    <circle cx="20" cy="8" r="0.5" fill="currentColor" />
    <circle cx="21" cy="5" r="0.5" fill="currentColor" />
    <circle cx="18" cy="4" r="0.5" fill="currentColor" />
    <circle cx="20" cy="3" r="0.5" fill="currentColor" />
  </svg>
);

// Electrical/Wiring Icon
export const ElectricalIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Lightning bolt */}
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="none" />
  </svg>
);

// Inspection/Checklist Icon
export const InspectionIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Clipboard */}
    <rect x="4" y="4" width="16" height="18" rx="2" />
    <path d="M8 2h8v4H8z" />
    {/* Checkmarks */}
    <path d="M8 10l2 2 4-4" />
    <path d="M8 16l2 2 4-4" />
  </svg>
);

// Car Wash/Cleaning Icon
export const CleaningIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Water drops */}
    <path d="M12 3c0 0-4 4-4 7a4 4 0 0 0 8 0c0-3-4-7-4-7z" />
    {/* Sparkles */}
    <path d="M5 8l1 2 2-1-1-2z" />
    <path d="M17 6l1 2 2-1-1-2z" />
    {/* Bubbles */}
    <circle cx="6" cy="18" r="2" />
    <circle cx="12" cy="20" r="1.5" />
    <circle cx="18" cy="17" r="2.5" />
  </svg>
);

// Windshield/Glass Icon
export const GlassIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Windshield shape */}
    <path d="M4 18L6 6h12l2 12z" />
    {/* Crack */}
    <path d="M10 9l2 3-1 4" />
    {/* Wiper area */}
    <path d="M6 15h12" />
  </svg>
);

// Exhaust/Muffler Icon
export const ExhaustIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Exhaust pipe */}
    <path d="M2 14h6l2-2h4l2 2h6" />
    <ellipse cx="20" cy="14" rx="2" ry="3" />
    {/* Smoke clouds */}
    <circle cx="18" cy="6" r="2" />
    <circle cx="15" cy="4" r="1.5" />
    <circle cx="20" cy="3" r="1" />
  </svg>
);

// Suspension/Shock Absorber Icon
export const SuspensionIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Spring coils */}
    <path d="M12 3v2" />
    <path d="M8 5h8" />
    <path d="M9 7h6" />
    <path d="M8 9h8" />
    <path d="M9 11h6" />
    <path d="M8 13h8" />
    {/* Shock absorber body */}
    <rect x="10" y="15" width="4" height="6" rx="1" />
    <path d="M12 21v1" />
  </svg>
);

// Steering Wheel Icon
export const SteeringIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Outer ring */}
    <circle cx="12" cy="12" r="9" />
    {/* Center hub */}
    <circle cx="12" cy="12" r="3" />
    {/* Spokes */}
    <path d="M12 3v6" />
    <path d="M4.5 16.5l5-3" />
    <path d="M19.5 16.5l-5-3" />
  </svg>
);

// Headlight Icon
export const HeadlightIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Light housing */}
    <ellipse cx="8" cy="12" rx="4" ry="6" />
    {/* Light beams */}
    <path d="M12 8l6-2" />
    <path d="M12 12h8" />
    <path d="M12 16l6 2" />
    {/* Inner light */}
    <circle cx="7" cy="12" r="2" />
  </svg>
);

// Car Seat/Interior Icon
export const InteriorIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Seat back */}
    <path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10H7V4z" />
    {/* Seat cushion */}
    <path d="M5 14h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4z" />
    {/* Headrest */}
    <path d="M9 2v1h6V2" />
    {/* Seat details */}
    <path d="M9 6h6" />
    <path d="M9 9h6" />
  </svg>
);

// Wrench/General Repair Icon
export const GeneralRepairIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Wrench */}
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

// Diagnostic Scanner Icon
export const DiagnosticIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Scanner device */}
    <rect x="3" y="6" width="12" height="14" rx="2" />
    {/* Screen */}
    <rect x="5" y="8" width="8" height="5" rx="1" />
    {/* Buttons */}
    <circle cx="6" cy="16" r="1" fill="currentColor" />
    <circle cx="9" cy="16" r="1" fill="currentColor" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
    {/* Cable */}
    <path d="M15 12h4a2 2 0 0 1 2 2v2" />
    <path d="M21 18v2" />
  </svg>
);
