import { useState, useEffect } from 'react';
import { mockApi } from '../../../services/mockApi';

interface Webinar {
  id: string;
  title: string;
  date: string;
  duration: number;
  speaker: string;
  registered: boolean;
  recording: string | null;
}

export const WebinarsStrip = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.marketing.getWebinars().then((response) => {
      setWebinars(response.data);
      setLoading(false);
    });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <section className="py-12 bg-primary/5">
        <div className="max-w-6xl mx-auto px-6 animate-pulse">
          <div className="h-6 bg-border rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-32 bg-border rounded"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-primary/5 border-y border-primary/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-foreground">Upcoming Webinars & Events</h3>
          <button className="text-sm text-primary hover:text-primary-hover font-semibold">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {webinars.map((webinar) => (
            <div
              key={webinar.id}
              className="bg-surface border border-border rounded-lg p-6 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-foreground text-lg flex-1">{webinar.title}</h4>
                {webinar.recording && (
                  <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                    Recording
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm text-text-secondary mb-4">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(webinar.date)}
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {webinar.duration} minutes
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {webinar.speaker}
                </p>
              </div>

              <button
                className={`w-full py-2 px-4 rounded-md font-semibold transition-colors ${
                  webinar.registered
                    ? 'bg-success/10 text-success border border-success/20'
                    : 'bg-primary text-primary-text hover:bg-primary-hover'
                }`}
                onClick={() => alert(`Register for: ${webinar.title}`)}
              >
                {webinar.registered ? 'Registered ✓' : 'Register Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
