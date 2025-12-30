import React from 'react';
import { AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import { TaskType, TaskPriority, TaskStatus } from '../types/domain';
import {
  EngineIcon,
  TireIcon,
  BrakeIcon,
  OilDropIcon,
  TransmissionIcon,
  CarBatteryIcon,
  ACIcon,
  CarBodyIcon,
  PaintSprayIcon,
  ElectricalIcon,
  InspectionIcon,
  CleaningIcon,
  GlassIcon,
  ExhaustIcon,
  SuspensionIcon,
  SteeringIcon,
  HeadlightIcon,
  InteriorIcon,
  GeneralRepairIcon,
} from '../components/icons/TaskIcons';

// Task type icons with colors - using custom recognizable icons
export const taskTypeConfig: Record<
  TaskType,
  {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    color: string;
    bgColor: string;
  }
> = {
  oil_change: {
    icon: OilDropIcon,
    label: 'Ölwechsel',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  tire_rotation: {
    icon: TireIcon,
    label: 'Reifenwechsel',
    color: 'text-gray-500 dark:text-gray-400',
    bgColor: 'bg-gray-500/10',
  },
  tire_change: {
    icon: TireIcon,
    label: 'Reifen',
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-600/10',
  },
  brake_repair: {
    icon: BrakeIcon,
    label: 'Bremsen',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  engine_repair: {
    icon: EngineIcon,
    label: 'Motor',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  transmission: {
    icon: TransmissionIcon,
    label: 'Getriebe',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  battery: {
    icon: CarBatteryIcon,
    label: 'Batterie',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  ac_repair: {
    icon: ACIcon,
    label: 'Klimaanlage',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
  },
  bodywork: {
    icon: CarBodyIcon,
    label: 'Karosserie',
    color: 'text-slate-500',
    bgColor: 'bg-slate-500/10',
  },
  paint: {
    icon: PaintSprayIcon,
    label: 'Lackierung',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  electrical: {
    icon: ElectricalIcon,
    label: 'Elektrik',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  inspection: {
    icon: InspectionIcon,
    label: 'Inspektion',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
  },
  cleaning: {
    icon: CleaningIcon,
    label: 'Reinigung',
    color: 'text-sky-400',
    bgColor: 'bg-sky-400/10',
  },
  glass_repair: {
    icon: GlassIcon,
    label: 'Glas',
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10',
  },
  exhaust: {
    icon: ExhaustIcon,
    label: 'Auspuff',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  suspension: {
    icon: SuspensionIcon,
    label: 'Fahrwerk',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  steering: {
    icon: SteeringIcon,
    label: 'Lenkung',
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
  },
  lights: {
    icon: HeadlightIcon,
    label: 'Beleuchtung',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
  },
  interior: {
    icon: InteriorIcon,
    label: 'Innenraum',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  general: {
    icon: GeneralRepairIcon,
    label: 'Allgemein',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
  },
};

// Priority configuration
export const priorityConfig: Record<
  TaskPriority,
  {
    label: string;
    color: string;
    bgColor: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  low: {
    label: 'Niedrig',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    icon: Clock,
  },
  medium: {
    label: 'Mittel',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    icon: Clock,
  },
  high: {
    label: 'Hoch',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    icon: AlertCircle,
  },
  urgent: {
    label: 'Dringend',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    icon: AlertTriangle,
  },
};

// Status configuration
export const statusConfig: Record<
  TaskStatus,
  {
    label: string;
    color: string;
    bgColor: string;
  }
> = {
  pending: {
    label: 'Ausstehend',
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
  },
  in_progress: {
    label: 'In Bearbeitung',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  done: {
    label: 'Erledigt',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  cancelled: {
    label: 'Abgebrochen',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
};

// Helper component to render task type icon
export const TaskTypeIcon: React.FC<{
  type: TaskType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}> = ({ type, size = 'md', showLabel = false, className = '' }) => {
  const config = taskTypeConfig[type];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const containerSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2.5',
    lg: 'p-3',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`rounded-lg ${config.bgColor} ${containerSizeClasses[size]}`}>
        <Icon className={`${sizeClasses[size]} ${config.color}`} />
      </div>
      {showLabel && <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>}
    </div>
  );
};

// Helper component to render priority badge
export const PriorityBadge: React.FC<{
  priority: TaskPriority;
  showLabel?: boolean;
  className?: string;
}> = ({ priority, showLabel = true, className = '' }) => {
  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bgColor} ${className}`}
    >
      <Icon className={`h-3 w-3 ${config.color}`} />
      {showLabel && <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>}
    </div>
  );
};
