import { LucideProps } from 'lucide-react';

export const CarSearchIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    {/* Car frontal view (kept to left to avoid overlap clutter) */}
    {/* Roof / windshield */}
    <path d="M4 13.5 6.2 9.5 12 9.5 13.5 13.5" />
    {/* Pillars & side edges */}
    <path d="M4 13.5v4H6" />
    <path d="M13.5 13.5v1.5" />
    {/* Hood / bumper */}
    <path d="M4 14.5H12" />
    <path d="M4 16.5H11" />
    {/* Headlight (single, left) */}
    <rect x="4.3" y="14.9" width="2" height="1.2" rx="0.25" />
    {/* Grille lines */}
    <path d="M7.2 15.6H11" />
    <path d="M7.2 16.8H11" />
    {/* Wheel hint */}
    <path d="M5 18h3" />

    {/* Magnifying glass, larger and clearly separate */}
    <circle cx="15.5" cy="9" r="5.5" />
    <path d="m19.7 13.2 3 3" />
  </svg>
);
