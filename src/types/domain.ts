export type Vehicle = {
  id: string;
  plate: string;
  brand: string;
  model: string;
  status: 'active' | 'maintenance' | 'inactive';
  mileageKm: number;
};

export type TaskStatus = 'pending' | 'in_progress' | 'done' | 'cancelled';

export type TaskItem = {
  id: string;
  title: string;
  assignee?: string;
  status: TaskStatus;
  dueDate?: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};
