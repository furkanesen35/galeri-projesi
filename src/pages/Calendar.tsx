import { useState } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from '../types/domain';

const localizer = dayjsLocalizer(dayjs);

const initialEvents: CalendarEvent[] = [
  {
    id: 'ev1',
    title: 'Inspection - BMW 320i',
    start: dayjs().toDate(),
    end: dayjs().add(2, 'hour').toDate()
  },
  {
    id: 'ev2',
    title: 'Brake service - Audi A4',
    start: dayjs().add(1, 'day').hour(10).toDate(),
    end: dayjs().add(1, 'day').hour(12).toDate()
  }
];

// Custom styles for react-big-calendar with better readability
const calendarStyles = `
  .rbc-calendar {
    color: var(--text-primary);
    background: var(--bg-primary);
  }
  .rbc-header {
    color: var(--text-primary);
    background: var(--bg-secondary);
    border-color: var(--border-color);
    padding: 10px 4px;
    font-weight: 600;
  }
  
  /* Weekend highlighting in month view */
  .rbc-month-view .rbc-day-bg:nth-child(7n),
  .rbc-month-view .rbc-day-bg:nth-child(7n-1) {
    background: rgba(100, 100, 120, 0.05) !important;
  }
  
  /* Alternating time slot colors for better readability */
  .rbc-time-slot:nth-child(odd) {
    background: var(--bg-primary);
  }
  .rbc-time-slot:nth-child(even) {
    background: rgba(100, 100, 120, 0.03);
  }
  
  .rbc-off-range {
    color: var(--text-muted);
  }
  .rbc-off-range-bg {
    background: var(--bg-tertiary);
  }
  .rbc-today {
    background-color: rgba(59, 130, 246, 0.1) !important;
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
    border-color: var(--border-color);
  }
  .rbc-month-view, .rbc-time-view {
    background: var(--bg-primary);
    border-color: var(--border-color);
  }
  .rbc-time-slot {
    border-color: var(--border-color);
    color: var(--text-secondary);
  }
  .rbc-time-content {
    border-color: var(--border-color);
  }
  .rbc-time-header-content {
    border-color: var(--border-color);
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
    border-color: var(--border-color);
  }
  .rbc-time-header.rbc-overflowing {
    border-color: var(--border-color);
  }
  .rbc-label {
    color: var(--text-secondary);
  }
  .rbc-month-row {
    border-color: var(--border-color);
  }
  .rbc-day-slot .rbc-time-slot {
    border-top-color: var(--border-color);
  }
`;

export const CalendarPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(e => e.id !== selectedEvent.id));
      setSelectedEvent(null);
    }
  };

  return (
    <div className="space-y-4">
      <style>{calendarStyles}</style>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold text-foreground">Werkstatt Kalender</h3>
        <p className="text-sm text-text-secondary">Daily/weekly/monthly views with drag & drop ready events.</p>
      </div>
      <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-text shadow hover:bg-primary-hover">
        + Add appointment
      </button>
    </div>
    <div className="overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-lg">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={[Views.DAY, Views.WEEK, Views.MONTH]}
        defaultView={Views.WEEK}
        style={{ height: 520 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>

    {/* Event Details Modal */}
    {selectedEvent && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-surface border border-border rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fade-in">
          {/* Modal Header */}
          <div className="bg-primary/10 border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Event Details</h3>
              <button
                onClick={handleCloseModal}
                className="text-text-secondary hover:text-foreground transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="px-6 py-5 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Title</label>
              <p className="text-base font-semibold text-foreground">{selectedEvent.title}</p>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Start</label>
                <p className="text-sm text-foreground">
                  {dayjs(selectedEvent.start).format('MMM D, YYYY')}
                  <br />
                  <span className="text-primary font-semibold">
                    {dayjs(selectedEvent.start).format('h:mm A')}
                  </span>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">End</label>
                <p className="text-sm text-foreground">
                  {dayjs(selectedEvent.end).format('MMM D, YYYY')}
                  <br />
                  <span className="text-primary font-semibold">
                    {dayjs(selectedEvent.end).format('h:mm A')}
                  </span>
                </p>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Duration</label>
              <p className="text-sm text-foreground">
                {dayjs(selectedEvent.end).diff(dayjs(selectedEvent.start), 'hour')} hours
              </p>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="bg-bg-secondary border-t border-border px-6 py-4 flex gap-3">
            <button
              onClick={handleDeleteEvent}
              className="flex-1 px-4 py-2 bg-error text-white rounded-lg font-medium hover:bg-error/90 transition-colors"
            >
              Delete Event
            </button>
            <button
              onClick={handleCloseModal}
              className="flex-1 px-4 py-2 bg-surface border border-border text-foreground rounded-lg font-medium hover:bg-bg-tertiary transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};
