import { useState, useCallback } from 'react';
import { Calendar, dayjsLocalizer, Views, EventProps } from 'react-big-calendar';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Car, User, Clock, X } from 'lucide-react';
import { CalendarEvent } from '../types/domain';
import { taskTypeConfig, TaskTypeIcon, PriorityBadge } from '../config/taskIcons';

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
    description: 'TÜV Hauptuntersuchung durchführen'
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
    description: 'Bremsbeläge und Scheiben erneuern'
  },
  {
    id: 'ev3',
    title: 'Ölwechsel',
    start: dayjs().hour(14).minute(0).toDate(),
    end: dayjs().hour(15).minute(0).toDate(),
    taskType: 'oil_change',
    priority: 'medium',
    vehicleName: 'VW Golf',
    assignee: 'Lena'
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
    description: 'Check Engine Lampe diagnostizieren'
  },
  {
    id: 'ev5',
    title: 'Klimaanlage Service',
    start: dayjs().add(2, 'day').hour(13).toDate(),
    end: dayjs().add(2, 'day').hour(15).toDate(),
    taskType: 'ac_repair',
    priority: 'low',
    vehicleName: 'BMW X5',
    assignee: 'Max'
  },
  {
    id: 'ev6',
    title: 'Reifenwechsel',
    start: dayjs().hour(16).minute(0).toDate(),
    end: dayjs().hour(17).minute(0).toDate(),
    taskType: 'tire_rotation',
    priority: 'medium',
    vehicleName: 'Porsche 911',
    assignee: 'Lena'
  },
  {
    id: 'ev7',
    title: 'Batterie tauschen',
    start: dayjs().add(1, 'day').hour(14).toDate(),
    end: dayjs().add(1, 'day').hour(15).toDate(),
    taskType: 'battery',
    priority: 'medium',
    vehicleName: 'VW Passat'
  },
  {
    id: 'ev8',
    title: 'Lack polieren',
    start: dayjs().add(3, 'day').hour(9).toDate(),
    end: dayjs().add(3, 'day').hour(12).toDate(),
    taskType: 'paint',
    priority: 'low',
    vehicleName: 'Audi Q7',
    assignee: 'Max'
  },
  {
    id: 'ev9',
    title: 'Auspuff reparieren',
    start: dayjs().add(2, 'day').hour(10).toDate(),
    end: dayjs().add(2, 'day').hour(12).toDate(),
    taskType: 'exhaust',
    priority: 'high',
    vehicleName: 'Ford Focus',
    assignee: 'Anna'
  },
  {
    id: 'ev10',
    title: 'Innenreinigung',
    start: dayjs().add(4, 'day').hour(14).toDate(),
    end: dayjs().add(4, 'day').hour(16).toDate(),
    taskType: 'cleaning',
    priority: 'low',
    vehicleName: 'Tesla Model 3'
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
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [autoFilledData, setAutoFilledData] = useState<any>(null);

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleSelectSlot = async (slotInfo: { start: Date; end: Date }) => {
    console.log('🎯 handleSelectSlot called:', slotInfo);
    setNewTaskSlot(slotInfo);
    setShowNewTaskModal(true);
    setAutoFilledData(null);
    console.log('✅ Modal should now be visible');
    
    // Simulate fetching data from backend
    console.log('🔄 Simulating backend fetch...');
    setIsLoadingData(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock data from "backend"
    const mockData = {
      title: 'Ölwechsel',
      taskType: 'oil_change',
      priority: 'medium',
      vehicleName: 'BMW 320i',
      assignee: 'Anna Schmidt',
      description: 'Motoröl und Filter wechseln'
    };
    
    console.log('📦 Backend data received:', mockData);
    setAutoFilledData(mockData);
    setIsLoadingData(false);
    console.log('✅ Form fields should now be auto-filled');
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleCloseNewTaskModal = () => {
    setShowNewTaskModal(false);
    setNewTaskSlot(null);
    setAutoFilledData(null);
    setIsLoadingData(false);
  };

  const handleCreateTask = async (taskData: any) => {
    console.log('🚀 handleCreateTask called with data:', taskData);
    console.log('📝 Setting isCreating to TRUE');
    setIsCreating(true);
    console.log('⏳ Starting 1.5 second delay...');
    
    // Simulate backend API call with 1.5 second delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('✅ Delay completed, creating event...');
    const newEvent: CalendarEvent = {
      id: `ev${Date.now()}`,
      title: taskData.title,
      start: newTaskSlot!.start,
      end: newTaskSlot!.end,
      taskType: taskData.taskType,
      priority: taskData.priority,
      vehicleName: taskData.vehicleName,
      assignee: taskData.assignee,
      description: taskData.description,
    };
    console.log('📦 New event created:', newEvent);
    setEvents([...events, newEvent]);
    console.log('📝 Setting isCreating to FALSE');
    setIsCreating(false);
    console.log('🔒 Closing modal...');
    handleCloseNewTaskModal();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(e => e.id !== selectedEvent.id));
      setSelectedEvent(null);
    }
  };

  const navigateCalendar = useCallback((direction: 'prev' | 'next' | 'today') => {
    if (direction === 'today') {
      setCurrentDate(new Date());
    } else {
      const amount = direction === 'prev' ? -1 : 1;
      const unit = view === 'week' ? 'week' : view === 'month' ? 'month' : 'quarter';
      setCurrentDate(dayjs(currentDate).add(amount, unit).toDate());
    }
  }, [currentDate, view]);

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
      }
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
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-text shadow hover:bg-primary-hover transition-colors">
          <Plus className="h-4 w-4" />
          Neuer Termin
        </button>
      </div>

      {/* Task Type Legend - Single Line */}
      <div className="flex flex-wrap items-center gap-2 p-4 rounded-xl bg-surface border border-border">
        <span className="text-xs text-text-secondary mr-2">Aufgabentypen:</span>
        {Object.entries(taskTypeConfig).slice(0, 12).map(([key, config]) => {
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
                const monthDate = dayjs(currentDate).startOf('quarter').add(monthOffset, 'month').toDate();
                const monthEvents = events.filter(event => {
                  const eventDate = dayjs(event.start);
                  const targetMonth = dayjs(monthDate);
                  return eventDate.month() === targetMonth.month() && eventDate.year() === targetMonth.year();
                });
                
                return (
                  <div key={monthOffset} className="border border-border rounded-lg overflow-hidden">
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
                  <span className="text-sm text-foreground font-medium">{selectedEvent.vehicleName}</span>
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
                  <label className="block text-xs font-medium text-text-secondary mb-1">Start</label>
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
                <span>Dauer: {dayjs(selectedEvent.end).diff(dayjs(selectedEvent.start), 'hour')} Stunden</span>
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
      {showNewTaskModal && newTaskSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-primary/10 border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Neue Aufgabe erstellen</h3>
                <button
                  onClick={handleCloseNewTaskModal}
                  className="p-1.5 rounded-lg text-text-secondary hover:text-foreground hover:bg-bg-secondary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Form */}
            <form onSubmit={async (e) => {
              console.log('📋 Form submitted!');
              e.preventDefault();
              console.log('📊 Form data from state:', autoFilledData);
              await handleCreateTask(autoFilledData);
              console.log('🏁 Form submission complete');
            }} className="px-6 py-5 space-y-4 relative">
              
              {/* Loading Overlay */}
              {isLoadingData && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-foreground">Daten werden geladen...</p>
                  </div>
                </div>
              )}
              
              {/* Time Info */}
              <div className="p-3 rounded-lg bg-bg-secondary text-sm text-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>
                    <strong>{dayjs(newTaskSlot.start).format('DD.MM.YYYY HH:mm')}</strong> bis{' '}
                    <strong>{dayjs(newTaskSlot.end).format('HH:mm')}</strong>
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Titel *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={autoFilledData?.title || ''}
                  onChange={(e) => setAutoFilledData({...autoFilledData, title: e.target.value})}
                  disabled={isLoadingData}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  placeholder="z.B. Ölwechsel"
                />
              </div>

              {/* Task Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Aufgabentyp *</label>
                <select
                  name="taskType"
                  required
                  value={autoFilledData?.taskType || ''}
                  onChange={(e) => setAutoFilledData({...autoFilledData, taskType: e.target.value})}
                  disabled={isLoadingData}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                >
                  <option value="">Bitte wählen...</option>
                  {Object.entries(taskTypeConfig).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Priorität *</label>
                <select
                  name="priority"
                  required
                  value={autoFilledData?.priority || 'medium'}
                  onChange={(e) => setAutoFilledData({...autoFilledData, priority: e.target.value})}
                  disabled={isLoadingData}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                >
                  <option value="low">Niedrig</option>
                  <option value="medium">Mittel</option>
                  <option value="high">Hoch</option>
                  <option value="urgent">Dringend</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Vehicle */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Fahrzeug</label>
                  <input
                    type="text"
                    name="vehicleName"
                    value={autoFilledData?.vehicleName || ''}
                    onChange={(e) => setAutoFilledData({...autoFilledData, vehicleName: e.target.value})}
                    disabled={isLoadingData}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    placeholder="z.B. BMW 320i"
                  />
                </div>

                {/* Assignee */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mitarbeiter</label>
                  <input
                    type="text"
                    name="assignee"
                    value={autoFilledData?.assignee || ''}
                    onChange={(e) => setAutoFilledData({...autoFilledData, assignee: e.target.value})}
                    disabled={isLoadingData}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    placeholder="z.B. Anna"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Beschreibung</label>
                <textarea
                  name="description"
                  rows={3}
                  value={autoFilledData?.description || ''}
                  onChange={(e) => setAutoFilledData({...autoFilledData, description: e.target.value})}
                  disabled={isLoadingData}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50"
                  placeholder="Zusätzliche Details..."
                />
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    console.log('❌ Cancel button clicked');
                    handleCloseNewTaskModal();
                  }}
                  disabled={isCreating}
                  className="flex-1 px-4 py-2 bg-surface border border-border text-foreground rounded-lg font-medium hover:bg-bg-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-4 py-2 bg-primary text-primary-text rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Wird erstellt...
                    </>
                  ) : (
                    'Aufgabe erstellen'
                  )}
                  {console.log('🔄 Button render - isCreating:', isCreating)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
