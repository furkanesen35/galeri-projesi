import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from '../types/domain';

const localizer = dayjsLocalizer(dayjs);

const events: CalendarEvent[] = [
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

export const CalendarPage = () => (
  <div className="space-y-4">
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
      />
    </div>
  </div>
);
