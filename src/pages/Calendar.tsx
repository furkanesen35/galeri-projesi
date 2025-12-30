import { useState, useCallback } from 'react';
import { Calendar, dayjsLocalizer, Views, EventProps } from 'react-big-calendar';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Car,
  User,
  Clock,
  X,
  CheckCircle2,
  AlertCircle,
  Coffee,
  Wrench,
  AlertTriangle,
} from 'lucide-react';
import { CalendarEvent, Vehicle, Personnel } from '../types/domain';
import { taskTypeConfig, TaskTypeIcon, PriorityBadge } from '../config/taskIcons';
import { vehicleFixtures } from '../services/vehicleFixtures';
import { personnelFixtures } from '../services/personnelFixtures';
import { getPrimaryServiceIssue, getAllServiceIssues } from '../services/vehicleServiceHistory';

dayjs.extend(quarterOfYear);
const localizer = dayjsLocalizer(dayjs);

// Sample calendar events with task types
const initialEvents: CalendarEvent[] = [
  {
    id: 'ev1',
    title: 'HU/AU Inspektion',
    start: dayjs().hour(9).minute(0).toDate(),
    end: dayjs().hour(11).minute(0).toDate(),
    taskType: 'inspection',
    priority: 'urgent',
    vehicleName: 'BMW 320i',
    assignee: 'Anna',
    description: 'TÜV Hauptuntersuchung durchführen',
  },
  {
    id: 'ev2',
    title: 'Bremsen vorne',
    start: dayjs().add(1, 'day').hour(10).toDate(),
    end: dayjs().add(1, 'day').hour(12).toDate(),
    taskType: 'brake_repair',
    priority: 'high',
    vehicleName: 'Audi A4',
    assignee: 'Max',
    description: 'Bremsbeläge und Scheiben erneuern',
  },
  {
    id: 'ev3',
    title: 'Ölwechsel',
    start: dayjs().hour(14).minute(0).toDate(),
    end: dayjs().hour(15).minute(0).toDate(),
    taskType: 'oil_change',
    priority: 'medium',
    vehicleName: 'VW Golf',
    assignee: 'Lena',
  },
  {
    id: 'ev4',
    title: 'Motordiagnose',
    start: dayjs().add(1, 'day').hour(8).toDate(),
    end: dayjs().add(1, 'day').hour(10).toDate(),
    taskType: 'engine_repair',
    priority: 'high',
    vehicleName: 'Mercedes C200',
    assignee: 'Anna',
    description: 'Check Engine Lampe diagnostizieren',
  },
  {
    id: 'ev5',
    title: 'Klimaanlage Service',
    start: dayjs().add(2, 'day').hour(13).toDate(),
    end: dayjs().add(2, 'day').hour(15).toDate(),
    taskType: 'ac_repair',
    priority: 'low',
    vehicleName: 'BMW X5',
    assignee: 'Max',
  },
  {
    id: 'ev6',
    title: 'Reifenwechsel',
    start: dayjs().hour(16).minute(0).toDate(),
    end: dayjs().hour(17).minute(0).toDate(),
    taskType: 'tire_rotation',
    priority: 'medium',
    vehicleName: 'Porsche 911',
    assignee: 'Lena',
  },
  {
    id: 'ev7',
    title: 'Batterie tauschen',
    start: dayjs().add(1, 'day').hour(14).toDate(),
    end: dayjs().add(1, 'day').hour(15).toDate(),
    taskType: 'battery',
    priority: 'medium',
    vehicleName: 'VW Passat',
  },
  {
    id: 'ev8',
    title: 'Lack polieren',
    start: dayjs().add(3, 'day').hour(9).toDate(),
    end: dayjs().add(3, 'day').hour(12).toDate(),
    taskType: 'paint',
    priority: 'low',
    vehicleName: 'Audi Q7',
    assignee: 'Max',
  },
  {
    id: 'ev9',
    title: 'Auspuff reparieren',
    start: dayjs().add(2, 'day').hour(10).toDate(),
    end: dayjs().add(2, 'day').hour(12).toDate(),
    taskType: 'exhaust',
    priority: 'high',
    vehicleName: 'Ford Focus',
    assignee: 'Anna',
  },
  {
    id: 'ev10',
    title: 'Innenreinigung',
    start: dayjs().add(4, 'day').hour(14).toDate(),
    end: dayjs().add(4, 'day').hour(16).toDate(),
    taskType: 'cleaning',
    priority: 'low',
    vehicleName: 'Tesla Model 3',
  },
];

// Custom event component with icon
const CustomEvent = ({ event }: EventProps<CalendarEvent>) => {
  const taskType = event.taskType || 'general';
  const config = taskTypeConfig[taskType];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-1.5 h-full overflow-hidden px-1">
      <div className={`flex-shrink-0 p-0.5 rounded ${config.bgColor}`}>
        <Icon className={`h-3.5 w-3.5 ${config.color}`} />
      </div>
      <span className="truncate text-xs font-medium">{event.title}</span>
    </div>
  );
};

// Custom styles for react-big-calendar with better readability
const calendarStyles = `
  .rbc-calendar {
    color: var(--text-primary);
    background: var(--bg-primary);
  }
  .rbc-header {
    color: var(--text-primary);
    background: var(--bg-secondary);
    border-color: rgba(128, 128, 128, 0.12);
    padding: 10px 4px;
    font-weight: 600;
  }
  
  /* Weekend highlighting in month view */
  .rbc-month-view .rbc-day-bg:nth-child(7n),
  .rbc-month-view .rbc-day-bg:nth-child(7n-1) {
    background: rgba(100, 100, 120, 0.03) !important;
  }
  
  /* Alternating time slot colors for better readability */
  .rbc-time-slot:nth-child(odd) {
    background: var(--bg-primary);
  }
  .rbc-time-slot:nth-child(even) {
    background: rgba(100, 100, 120, 0.01);
  }
  
  .rbc-off-range {
    color: var(--text-muted);
  }
  .rbc-off-range-bg {
    background: var(--bg-tertiary);
  }
  .rbc-today {
    background-color: rgba(59, 130, 246, 0.08) !important;
  }
  .rbc-event {
    background-color: var(--primary-color);
    color: var(--primary-text);
    border: none;
    border-radius: 4px;
    padding: 2px 5px;
    cursor: pointer;
  }
  .rbc-event:hover {
    background-color: var(--primary-hover);
    transform: scale(1.02);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .rbc-event.rbc-selected {
    background-color: var(--primary-hover);
  }
  .rbc-day-bg {
    background: var(--bg-primary);
    border-color: rgba(128, 128, 128, 0.12) !important;
  }
  .rbc-month-view, .rbc-time-view {
    background: var(--bg-primary);
    border-color: rgba(128, 128, 128, 0.12);
  }
  .rbc-time-slot {
    border-color: rgba(128, 128, 128, 0.12);
    color: var(--text-secondary);
  }
  .rbc-time-content {
    border-color: rgba(128, 128, 128, 0.12);
  }
  .rbc-time-header-content {
    border-color: rgba(128, 128, 128, 0.12);
  }
  .rbc-current-time-indicator {
    background-color: var(--primary-color);
  }
  .rbc-toolbar {
    color: var(--text-primary);
    margin-bottom: 16px;
  }
  .rbc-toolbar button {
    color: var(--text-primary);
    border-color: var(--border-color);
    background: var(--bg-secondary);
    padding: 6px 12px;
    border-radius: 6px;
    transition: all 0.2s;
  }
  .rbc-toolbar button:hover {
    background: var(--bg-tertiary);
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  .rbc-toolbar button.rbc-active {
    background: var(--primary-color);
    color: var(--primary-text);
    border-color: var(--primary-color);
  }
  .rbc-toolbar button:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  .rbc-date-cell {
    color: var(--text-primary);
    padding: 4px;
  }
  .rbc-date-cell button {
    color: var(--text-primary);
  }
  .rbc-date-cell.rbc-now {
    font-weight: 700;
  }
  .rbc-timeslot-group {
    border-color: rgba(128, 128, 128, 0.12);
  }
  .rbc-time-header.rbc-overflowing {
    border-color: rgba(128, 128, 128, 0.12);
  }
  .rbc-label {
    color: var(--text-secondary);
  }
  .rbc-month-row {
    border-color: rgba(128, 128, 128, 0.12);
  }
  .rbc-day-slot .rbc-time-slot {
    border-top-color: rgba(128, 128, 128, 0.12);
  }
  .rbc-toolbar {
    display: none;
  }
  .rbc-event {
    background-color: var(--bg-secondary) !important;
    color: var(--text-primary) !important;
    border: 1px solid var(--border-color) !important;
    border-left: 3px solid var(--primary-color) !important;
    border-radius: 4px;
    padding: 2px 4px;
    cursor: pointer;
  }
  .rbc-event:hover {
    background-color: var(--bg-tertiary) !important;
    transform: scale(1.02);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .rbc-show-more {
    color: var(--primary-color);
    font-weight: 600;
  }
`;

type ViewType = 'week' | 'month' | 'quarter';

export const CalendarPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTaskSlot, setNewTaskSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('week');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(null);
  const [formData, setFormData] = useState<any>({
    title: '',
    taskType: '',
    priority: 'medium',
    description: '',
  });
  const [manualDateTime, setManualDateTime] = useState({
    date: dayjs().format('YYYY-MM-DD'),
    startTime: '09:00',
    endTime: '11:00',
  });

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setNewTaskSlot(slotInfo);
    setShowNewTaskModal(true);
    setSelectedVehicle(null);
    setSelectedPersonnel(null);
    setFormData({
      title: '',
      taskType: '',
      priority: 'medium',
      description: '',
    });
    // Reset manual date/time when selecting from calendar
    setManualDateTime({
      date: dayjs(slotInfo.start).format('YYYY-MM-DD'),
      startTime: dayjs(slotInfo.start).format('HH:mm'),
      endTime: dayjs(slotInfo.end).format('HH:mm'),
    });
  };

  const handleOpenNewTaskModal = () => {
    // Open modal without pre-selected time slot (manual input)
    setNewTaskSlot(null);
    setShowNewTaskModal(true);
    setSelectedVehicle(null);
    setSelectedPersonnel(null);
    setFormData({
      title: '',
      taskType: '',
      priority: 'medium',
      description: '',
    });
    // Set default manual date/time
    setManualDateTime({
      date: dayjs().format('YYYY-MM-DD'),
      startTime: '09:00',
      endTime: '11:00',
    });
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleCloseNewTaskModal = () => {
    setShowNewTaskModal(false);
    setNewTaskSlot(null);
    setSelectedVehicle(null);
    setSelectedPersonnel(null);
    setFormData({
      title: '',
      taskType: '',
      priority: 'medium',
      description: '',
    });
    setManualDateTime({
      date: dayjs().format('YYYY-MM-DD'),
      startTime: '09:00',
      endTime: '11:00',
    });
  };

  const handleCreateTask = async () => {
    setIsCreating(true);

    // Simulate backend API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Determine start and end times
    let startDate: Date;
    let endDate: Date;

    if (newTaskSlot) {
      // Time slot was selected from calendar
      startDate = newTaskSlot.start;
      endDate = newTaskSlot.end;
    } else {
      // Manual date/time input
      startDate = dayjs(`${manualDateTime.date} ${manualDateTime.startTime}`).toDate();
      endDate = dayjs(`${manualDateTime.date} ${manualDateTime.endTime}`).toDate();
    }

    const newEvent: CalendarEvent = {
      id: `ev${Date.now()}`,
      title: formData.title,
      start: startDate,
      end: endDate,
      taskType: formData.taskType,
      priority: formData.priority,
      vehicleId: selectedVehicle?.id,
      vehicleName: selectedVehicle
        ? `${selectedVehicle.brand} ${selectedVehicle.model}`
        : undefined,
      assignee: selectedPersonnel?.fullName,
      assigneeId: selectedPersonnel?.id,
      description: formData.description,
    };

    setEvents([...events, newEvent]);
    setIsCreating(false);
    handleCloseNewTaskModal();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
      setSelectedEvent(null);
    }
  };

  const navigateCalendar = useCallback(
    (direction: 'prev' | 'next' | 'today') => {
      if (direction === 'today') {
        setCurrentDate(new Date());
      } else {
        const amount = direction === 'prev' ? -1 : 1;
        const unit = view === 'week' ? 'week' : view === 'month' ? 'month' : 'quarter';
        setCurrentDate(dayjs(currentDate).add(amount, unit).toDate());
      }
    },
    [currentDate, view]
  );

  const getDateRangeLabel = () => {
    if (view === 'week') {
      const start = dayjs(currentDate).startOf('week');
      const end = dayjs(currentDate).endOf('week');
      if (start.month() === end.month()) {
        return `${start.format('D.')} - ${end.format('D. MMMM YYYY')}`;
      }
      return `${start.format('D. MMM')} - ${end.format('D. MMM YYYY')}`;
    } else if (view === 'month') {
      return dayjs(currentDate).format('MMMM YYYY');
    } else {
      // Quarter view
      const quarter = dayjs(currentDate).quarter();
      const start = dayjs(currentDate).startOf('quarter');
      const end = dayjs(currentDate).endOf('quarter');
      return `Q${quarter} ${dayjs(currentDate).year()} (${start.format('MMM')} - ${end.format('MMM')})`;
    }
  };

  // Event styling based on priority
  const eventStyleGetter = (event: CalendarEvent) => {
    let borderColor = 'var(--primary-color)';
    if (event.priority === 'urgent') borderColor = '#ef4444';
    else if (event.priority === 'high') borderColor = '#f97316';
    else if (event.priority === 'medium') borderColor = '#3b82f6';
    else if (event.priority === 'low') borderColor = '#6b7280';

    return {
      style: {
        borderLeftColor: borderColor,
      },
    };
  };

  return (
    <div className="space-y-4">
      <style>{calendarStyles}</style>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Werkstatt Kalender</h3>
          <p className="text-sm text-text-secondary">Alle Termine und Reparaturen im Überblick</p>
        </div>
        <button
          onClick={handleOpenNewTaskModal}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-text shadow hover:bg-primary-hover transition-colors"
        >
          <Plus className="h-4 w-4" />
          Neuer Termin
        </button>
      </div>

      {/* Task Type Legend - Single Line */}
      <div className="flex flex-wrap items-center gap-2 p-4 rounded-xl bg-surface border border-border">
        <span className="text-xs text-text-secondary mr-2">Aufgabentypen:</span>
        {Object.entries(taskTypeConfig)
          .slice(0, 12)
          .map(([key, config]) => {
            const Icon = config.icon;
            return (
              <div
                key={key}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${config.bgColor} cursor-default`}
                title={config.label}
              >
                <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
              </div>
            );
          })}
      </div>

      {/* Calendar - Full Width */}
      <div className="fixed left-[80px] right-0 top-[200px] bottom-0 z-40 p-4">
        <div className="h-full overflow-hidden rounded-2xl border border-border bg-surface shadow-lg flex flex-col">
          {/* Custom Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-bg-secondary flex-shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateCalendar('prev')}
                className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <button
                onClick={() => navigateCalendar('today')}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-border hover:bg-bg-tertiary transition-colors"
              >
                Heute
              </button>
              <button
                onClick={() => navigateCalendar('next')}
                className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
              <span className="ml-4 text-lg font-semibold text-foreground">
                {getDateRangeLabel()}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-bg-tertiary rounded-lg p-1">
              {(['week', 'month', 'quarter'] as ViewType[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    view === v
                      ? 'bg-primary text-primary-text'
                      : 'text-text-secondary hover:text-foreground'
                  }`}
                >
                  {v === 'week' ? 'Woche' : v === 'month' ? 'Monat' : 'Quartal'}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Component */}
          <div className="flex-1 p-4 overflow-auto">
            {view === 'quarter' ? (
              // Quarter View - 3 Months Side by Side
              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((monthOffset) => {
                  const monthDate = dayjs(currentDate)
                    .startOf('quarter')
                    .add(monthOffset, 'month')
                    .toDate();
                  const monthEvents = events.filter((event) => {
                    const eventDate = dayjs(event.start);
                    const targetMonth = dayjs(monthDate);
                    return (
                      eventDate.month() === targetMonth.month() &&
                      eventDate.year() === targetMonth.year()
                    );
                  });

                  return (
                    <div
                      key={monthOffset}
                      className="border border-border rounded-lg overflow-hidden"
                    >
                      <div className="bg-bg-secondary px-3 py-2 border-b border-border">
                        <h4 className="text-sm font-semibold text-foreground text-center">
                          {dayjs(monthDate).format('MMMM YYYY')}
                        </h4>
                      </div>
                      <Calendar
                        localizer={localizer}
                        events={monthEvents}
                        startAccessor="start"
                        endAccessor="end"
                        date={monthDate}
                        view={Views.MONTH}
                        onNavigate={() => {}}
                        toolbar={false}
                        style={{ height: 500 }}
                        onSelectEvent={handleSelectEvent}
                        onSelectSlot={handleSelectSlot}
                        selectable
                        components={{
                          event: CustomEvent,
                        }}
                        eventPropGetter={eventStyleGetter}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              // Week and Month Views
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={currentDate}
                view={view === 'week' ? Views.WEEK : Views.MONTH}
                onNavigate={setCurrentDate}
                onView={(v) => setView(v.toLowerCase() as ViewType)}
                views={[Views.WEEK, Views.MONTH]}
                style={{ height: 600 }}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                components={{
                  event: CustomEvent,
                }}
                eventPropGetter={eventStyleGetter}
              />
            )}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-primary/10 border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedEvent.taskType && (
                    <TaskTypeIcon type={selectedEvent.taskType} size="md" />
                  )}
                  <h3 className="text-lg font-semibold text-foreground">{selectedEvent.title}</h3>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-lg text-text-secondary hover:text-foreground hover:bg-bg-secondary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-5 space-y-4">
              {/* Priority */}
              {selectedEvent.priority && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-text-secondary">Priorität:</span>
                  <PriorityBadge priority={selectedEvent.priority} />
                </div>
              )}

              {/* Vehicle */}
              {selectedEvent.vehicleName && (
                <div className="flex items-center gap-3">
                  <Car className="h-4 w-4 text-text-secondary" />
                  <span className="text-sm text-foreground font-medium">
                    {selectedEvent.vehicleName}
                  </span>
                </div>
              )}

              {/* Assignee */}
              {selectedEvent.assignee && (
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-text-secondary" />
                  <span className="text-sm text-foreground">{selectedEvent.assignee}</span>
                </div>
              )}

              {/* Description */}
              {selectedEvent.description && (
                <div className="p-3 rounded-lg bg-bg-secondary">
                  <p className="text-sm text-foreground">{selectedEvent.description}</p>
                </div>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Start
                  </label>
                  <p className="text-sm text-foreground">
                    {dayjs(selectedEvent.start).format('DD.MM.YYYY')}
                    <br />
                    <span className="text-primary font-semibold">
                      {dayjs(selectedEvent.start).format('HH:mm')} Uhr
                    </span>
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Ende</label>
                  <p className="text-sm text-foreground">
                    {dayjs(selectedEvent.end).format('DD.MM.YYYY')}
                    <br />
                    <span className="text-primary font-semibold">
                      {dayjs(selectedEvent.end).format('HH:mm')} Uhr
                    </span>
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Clock className="h-4 w-4" />
                <span>
                  Dauer: {dayjs(selectedEvent.end).diff(dayjs(selectedEvent.start), 'hour')} Stunden
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-bg-secondary border-t border-border px-6 py-4 flex gap-3">
              <button
                onClick={handleDeleteEvent}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Löschen
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 bg-surface border border-border text-foreground rounded-lg font-medium hover:bg-bg-tertiary transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Task Creation Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden animate-fade-in flex flex-col">
            {/* Modal Header */}
            <div className="bg-primary/10 border-b border-border px-6 py-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Neue Aufgabe erstellen</h3>
                </div>
                <button
                  onClick={handleCloseNewTaskModal}
                  className="p-1.5 rounded-lg text-text-secondary hover:text-foreground hover:bg-bg-secondary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Time Info */}
              {newTaskSlot ? (
                <div className="mt-3 flex items-center gap-2 text-sm text-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>
                    <strong>{dayjs(newTaskSlot.start).format('DD.MM.YYYY HH:mm')}</strong> bis{' '}
                    <strong>{dayjs(newTaskSlot.end).format('HH:mm')}</strong>
                    <span className="text-text-secondary ml-2">
                      ({dayjs(newTaskSlot.end).diff(dayjs(newTaskSlot.start), 'hour')}h)
                    </span>
                  </span>
                </div>
              ) : (
                <div className="mt-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 text-sm text-foreground mb-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Datum und Uhrzeit manuell eingeben</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1">
                        Datum
                      </label>
                      <input
                        type="date"
                        value={manualDateTime.date}
                        onChange={(e) =>
                          setManualDateTime({ ...manualDateTime, date: e.target.value })
                        }
                        className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1">
                        Von
                      </label>
                      <input
                        type="time"
                        value={manualDateTime.startTime}
                        onChange={(e) =>
                          setManualDateTime({ ...manualDateTime, startTime: e.target.value })
                        }
                        className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1">
                        Bis
                      </label>
                      <input
                        type="time"
                        value={manualDateTime.endTime}
                        onChange={(e) =>
                          setManualDateTime({ ...manualDateTime, endTime: e.target.value })
                        }
                        className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Content - Two Column Layout */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6 p-6">
                {/* LEFT COLUMN - Vehicle & Personnel Selection */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Car className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold text-foreground">
                      Fahrzeug & Mitarbeiter
                    </h4>
                  </div>

                  {/* Vehicle Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Fahrzeug auswählen *
                    </label>
                    <select
                      required
                      value={selectedVehicle?.id || ''}
                      onChange={(e) => {
                        const vehicle = vehicleFixtures.find((v) => v.id === e.target.value);
                        setSelectedVehicle(vehicle || null);

                        // Auto-fill task details from vehicle service history
                        if (vehicle) {
                          const primaryIssue = getPrimaryServiceIssue(vehicle.id);
                          if (primaryIssue) {
                            setFormData({
                              title: primaryIssue.title,
                              taskType: primaryIssue.taskType,
                              priority: primaryIssue.priority,
                              description: primaryIssue.description,
                            });
                          }
                        }
                      }}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Fahrzeug wählen...</option>
                      {vehicleFixtures.map((vehicle) => {
                        const issues = getAllServiceIssues(vehicle.id);
                        const hasUrgent = issues.some((i) => i.priority === 'urgent');
                        return (
                          <option key={vehicle.id} value={vehicle.id}>
                            {hasUrgent ? '⚠️ ' : ''}
                            {vehicle.brand} {vehicle.model} - {vehicle.plate}
                          </option>
                        );
                      })}
                    </select>

                    {/* Vehicle Info Card */}
                    {selectedVehicle && (
                      <div className="mt-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="flex items-start gap-3">
                          <Car className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div className="flex-1 text-sm space-y-2">
                            <p className="font-semibold text-foreground">
                              {selectedVehicle.brand} {selectedVehicle.model}{' '}
                              {selectedVehicle.variant}
                            </p>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-text-secondary">
                              <p>
                                <span className="font-medium">Kennzeichen:</span>{' '}
                                {selectedVehicle.plate}
                              </p>
                              <p>
                                <span className="font-medium">FIN:</span>{' '}
                                {selectedVehicle.vin.slice(-8)}
                              </p>
                              <p>
                                <span className="font-medium">Laufleistung:</span>{' '}
                                {selectedVehicle.mileageKm.toLocaleString()} km
                              </p>
                              <p>
                                <span className="font-medium">Erstzulassung:</span>{' '}
                                {dayjs(selectedVehicle.firstRegistration).format('MM/YYYY')}
                              </p>
                            </div>

                            {/* Known Issues */}
                            {(() => {
                              const issues = getAllServiceIssues(selectedVehicle.id);
                              if (issues.length > 0) {
                                return (
                                  <div className="mt-3 pt-3 border-t border-primary/20">
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <Wrench className="h-3.5 w-3.5 text-orange-500" />
                                      <span className="text-xs font-semibold text-foreground">
                                        Bekannte Probleme ({issues.length})
                                      </span>
                                    </div>
                                    <div className="space-y-1.5">
                                      {issues.slice(0, 3).map((issue, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs">
                                          <PriorityBadge priority={issue.priority} />
                                          <span className="text-text-secondary flex-1">
                                            {issue.title}
                                          </span>
                                        </div>
                                      ))}
                                      {issues.length > 3 && (
                                        <p className="text-xs text-text-secondary italic">
                                          +{issues.length - 3} weitere...
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                            })()}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Personnel Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mitarbeiter zuweisen *
                    </label>
                    <select
                      required
                      value={selectedPersonnel?.id || ''}
                      onChange={(e) => {
                        const personnel = personnelFixtures.find((p) => p.id === e.target.value);
                        setSelectedPersonnel(personnel || null);
                      }}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Mitarbeiter wählen...</option>
                      {personnelFixtures.map((person) => (
                        <option key={person.id} value={person.id}>
                          {person.fullName} - {person.role}
                          {person.status === 'available'
                            ? ' ✓ Verfügbar'
                            : person.status === 'busy'
                              ? ' ⚠ Beschäftigt'
                              : ' ✗ Abwesend'}
                        </option>
                      ))}
                    </select>

                    {/* Personnel Info Card */}
                    {selectedPersonnel && (
                      <div
                        className={`mt-3 p-4 rounded-lg border ${
                          selectedPersonnel.status === 'available'
                            ? 'bg-green-500/5 border-green-500/20'
                            : selectedPersonnel.status === 'busy'
                              ? 'bg-orange-500/5 border-orange-500/20'
                              : 'bg-red-500/5 border-red-500/20'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {selectedPersonnel.image && (
                            <img
                              src={selectedPersonnel.image}
                              alt={selectedPersonnel.fullName}
                              className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 text-sm space-y-1.5">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-foreground">
                                {selectedPersonnel.fullName}
                              </p>
                              {selectedPersonnel.status === 'available' && (
                                <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Verfügbar
                                </span>
                              )}
                              {selectedPersonnel.status === 'busy' && (
                                <span className="flex items-center gap-1 text-xs bg-orange-500/20 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                                  <AlertCircle className="h-3 w-3" />
                                  Beschäftigt
                                </span>
                              )}
                              {selectedPersonnel.status === 'on_leave' && (
                                <span className="flex items-center gap-1 text-xs bg-red-500/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                                  <Coffee className="h-3 w-3" />
                                  Abwesend
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-text-secondary">{selectedPersonnel.role}</p>
                            {selectedPersonnel.availability.currentTask && (
                              <p className="text-xs text-text-secondary">
                                <span className="font-medium">Aktuelle Aufgabe:</span>{' '}
                                {selectedPersonnel.availability.currentTask}
                              </p>
                            )}
                            {!selectedPersonnel.availability.isAvailable && (
                              <p className="text-xs text-text-secondary">
                                <span className="font-medium">Verfügbar ab:</span>{' '}
                                {dayjs(selectedPersonnel.availability.nextAvailableSlot).format(
                                  'DD.MM.YYYY HH:mm'
                                )}
                              </p>
                            )}
                            {selectedPersonnel.specializations.length > 0 && (
                              <div className="pt-2">
                                <p className="text-xs font-medium text-foreground mb-1">
                                  Spezialisierungen:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {selectedPersonnel.specializations
                                    .slice(0, 4)
                                    .map((spec, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs bg-bg-tertiary px-2 py-0.5 rounded text-text-secondary"
                                      >
                                        {taskTypeConfig[spec]?.label || spec}
                                      </span>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN - Task Details */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Wrench className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold text-foreground">Aufgaben-Details</h4>
                  </div>

                  {/* Auto-fill notification */}
                  {selectedVehicle && formData.title && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">
                          Automatisch ausgefüllt
                        </p>
                        <p className="text-xs text-text-secondary mt-0.5">
                          Aufgabendaten wurden basierend auf dem Fahrzeugverlauf geladen. Sie können
                          diese manuell anpassen.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Aufgabentitel *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="z.B. Ölwechsel durchführen"
                    />
                  </div>

                  {/* Task Type & Priority */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Aufgabentyp *
                      </label>
                      <select
                        required
                        value={formData.taskType}
                        onChange={(e) => setFormData({ ...formData, taskType: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Bitte wählen...</option>
                        {Object.entries(taskTypeConfig).map(([key, config]) => (
                          <option key={key} value={key}>
                            {config.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Priorität *
                      </label>
                      <select
                        required
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="low">Niedrig</option>
                        <option value="medium">Mittel</option>
                        <option value="high">Hoch</option>
                        <option value="urgent">Dringend</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Beschreibung
                    </label>
                    <textarea
                      rows={6}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Detaillierte Beschreibung der Aufgabe, Schritte, benötigte Teile..."
                    />
                  </div>

                  {/* Estimated Duration (if available) */}
                  {selectedVehicle &&
                    (() => {
                      const primaryIssue = getPrimaryServiceIssue(selectedVehicle.id);
                      if (primaryIssue && formData.taskType === primaryIssue.taskType) {
                        return (
                          <div className="p-3 rounded-lg bg-bg-secondary">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-text-secondary" />
                              <span className="text-sm text-foreground">
                                <span className="font-medium">Geschätzte Dauer:</span>{' '}
                                {primaryIssue.estimatedDuration}h
                              </span>
                            </div>
                          </div>
                        );
                      }
                    })()}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-bg-secondary border-t border-border px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div className="text-sm text-text-secondary">
                {selectedVehicle && selectedPersonnel && formData.title && formData.taskType ? (
                  <span className="text-green-600 dark:text-green-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Alle erforderlichen Felder ausgefüllt
                  </span>
                ) : (
                  <span>Bitte alle Pflichtfelder (*) ausfüllen</span>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseNewTaskModal}
                  disabled={isCreating}
                  className="px-5 py-2 bg-surface border border-border text-foreground rounded-lg font-medium hover:bg-bg-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Abbrechen
                </button>
                <button
                  type="button"
                  onClick={handleCreateTask}
                  disabled={
                    isCreating ||
                    !selectedVehicle ||
                    !selectedPersonnel ||
                    !formData.title ||
                    !formData.taskType
                  }
                  className="px-5 py-2 bg-primary text-primary-text rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Wird erstellt...
                    </>
                  ) : (
                    'Aufgabe erstellen'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
