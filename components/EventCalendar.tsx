'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format, differenceInDays } from 'date-fns';
import type { TournamentEvent } from '@/types';

const TYPE_COLORS = {
  PT: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  RC: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  GP: 'bg-mtg-gold/15 text-mtg-gold border-mtg-gold/25',
  NR: 'bg-green-500/15 text-green-400 border-green-500/25',
  Other: 'bg-gray-700/30 text-gray-400 border-gray-600/20',
};

const VENUE_COLORS = {
  Paper: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  MTGO: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  MTGA: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
};

function getVenue(location: string): 'Paper' | 'MTGO' | 'MTGA' {
  if (location === 'MTGO') return 'MTGO';
  if (location === 'MTGA') return 'MTGA';
  return 'Paper';
}

/* 骨架屏 */
function EventSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="card p-4 flex items-center gap-4">
          <div className="flex-shrink-0 text-center w-14 space-y-1">
            <div className="skeleton-bar h-3 w-8 rounded mx-auto" />
            <div className="skeleton-bar h-6 w-6 rounded mx-auto" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div className="skeleton-bar h-5 w-32 rounded" />
              <div className="skeleton-bar h-5 w-10 rounded" />
              <div className="skeleton-bar h-5 w-10 rounded" />
            </div>
            <div className="skeleton-bar h-3 w-24 rounded" />
          </div>
          <div className="flex-shrink-0">
            <div className="skeleton-bar h-5 w-12 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventCalendar() {
  const [events, setEvents] = useState<TournamentEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [venueFilter, setVenueFilter] = useState<'All' | 'Paper' | 'MTGO' | 'MTGA'>('All');

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((d) => {
        setEvents(d.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <EventSkeleton />;

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const filtered = venueFilter === 'All'
    ? sortedEvents
    : sortedEvents.filter((e) => getVenue(e.location) === venueFilter);

  return (
    <div className="space-y-4">
      {/* Venue Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['All', 'Paper', 'MTGO', 'MTGA'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVenueFilter(v)}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
              venueFilter === v
                ? 'bg-mtg-gold/15 border-mtg-gold/40 text-mtg-gold'
                : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-gray-200'
            }`}
          >
            {v === 'All' ? 'All Venues / 全部场地' : v}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((event) => {
          const daysUntil = differenceInDays(new Date(event.date), new Date());
          const venue = getVenue(event.location);
          return (
            <Link
              key={event.id}
              href={`/tournament/${event.id}`}
              className="card card-hover flex items-center gap-4 p-4 group block"
            >
              {/* Date Block */}
              <div className="flex-shrink-0 text-center w-14 py-1">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                  {format(new Date(event.date), 'MMM')}
                </div>
                <div className="text-2xl font-bold text-gray-100 leading-tight">
                  {format(new Date(event.date), 'd')}
                </div>
                <div className="text-[10px] text-gray-600">
                  {format(new Date(event.date), 'yyyy')}
                </div>
              </div>

              {/* Event Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-gray-100 group-hover:text-mtg-gold transition-colors truncate">
                    {event.nameCN || event.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded border flex-shrink-0 ${
                      TYPE_COLORS[event.type]
                    }`}
                  >
                    {event.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded border flex-shrink-0 ${
                      VENUE_COLORS[venue]
                    }`}
                  >
                    {venue}
                  </span>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
                  <span>{venue === 'Paper' ? event.location : venue}</span>
                  {event.attendance && (
                    <>
                      <span className="text-gray-700">·</span>
                      <span>{event.attendance} players</span>
                    </>
                  )}
                  <span className="text-gray-700">·</span>
                  <span className="text-gray-600 text-xs">{event.format}</span>
                </div>
              </div>

              {/* Days Badge */}
              <div className="flex-shrink-0 text-right min-w-[60px]">
                {daysUntil > 0 ? (
                  <div className="text-right">
                    <div className="text-xl font-bold text-mtg-gold leading-none">
                      {daysUntil}
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                      days left
                    </div>
                  </div>
                ) : daysUntil === 0 ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-mtg-gold/15 text-mtg-gold text-xs font-bold border border-mtg-gold/30">
                    Today
                  </span>
                ) : (
                  <div className="text-right">
                    <div className="text-sm text-gray-600 font-medium">
                      {Math.abs(daysUntil)}d
                    </div>
                    <div className="text-[10px] text-gray-700">ago</div>
                  </div>
                )}
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex flex-shrink-0 text-gray-600 group-hover:text-mtg-gold transition-colors">
                →
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No events for this venue / 该场地无赛事
        </div>
      )}
    </div>
  );
}
