'use client';

import { useEffect, useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import type { TournamentEvent } from '@/types';

const TYPE_COLORS = {
  PT: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  RC: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  GP: 'bg-mtg-gold/20 text-mtg-gold border-mtg-gold/30',
  NR: 'bg-green-500/20 text-green-400 border-green-500/30',
  Other: 'bg-gray-700/50 text-gray-400 border-gray-600/30',
};

export default function EventCalendar() {
  const [events, setEvents] = useState<TournamentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((d) => {
        setEvents(d.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card h-24 animate-pulse" />
        ))}
      </div>
    );
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-3">
      {sortedEvents.map((event) => {
        const daysUntil = differenceInDays(new Date(event.date), new Date());
        return (
          <div key={event.id} className="card card-hover flex items-center gap-4">
            {/* Date Block */}
            <div className="flex-shrink-0 text-center w-16">
              <div className="text-xs text-gray-500 uppercase">
                {format(new Date(event.date), 'MMM')}
              </div>
              <div className="text-xl font-bold text-gray-100">
                {format(new Date(event.date), 'd')}
              </div>
            </div>

            {/* Event Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-100 truncate">
                  {event.nameCN || event.name}
                </h3>
                <span
                  className={`px-2 py-0.5 text-xs font-bold rounded border flex-shrink-0 ${
                    TYPE_COLORS[event.type]
                  }`}
                >
                  {event.type}
                </span>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-3">
                <span>{event.location}</span>
                {event.attendance && (
                  <span>· {event.attendance} players</span>
                )}
              </div>
            </div>

            {/* Days Badge */}
            <div className="flex-shrink-0 text-right">
              {daysUntil > 0 ? (
                <div className="text-sm">
                  <span className="text-mtg-gold font-bold">{daysUntil}</span>
                  <span className="text-gray-500 ml-1">days</span>
                </div>
              ) : daysUntil === 0 ? (
                <span className="text-sm text-mtg-gold font-semibold">Today</span>
              ) : (
                <span className="text-sm text-gray-600">
                  {Math.abs(daysUntil)}d ago
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
