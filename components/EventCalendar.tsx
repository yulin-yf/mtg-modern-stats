'use client';

import { useEffect, useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import type { TournamentEvent } from '@/types';

const TYPE_COLORS = {
  PT: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  RC: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  GP: 'bg-mtg-gold/15 text-mtg-gold border-mtg-gold/25',
  NR: 'bg-green-500/15 text-green-400 border-green-500/25',
  Other: 'bg-gray-700/30 text-gray-400 border-gray-600/20',
};

const TYPE_LABELS = {
  PT: '职业巡回赛',
  RC: '区域冠军赛',
  GP: '大奖赛',
  NR: 'NRG系列',
  Other: '其他',
};

/* 骨架屏 */
function EventSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="card p-4 flex items-center gap-4">
          <div className="flex-shrink-0 text-center w-14 space-y-1">
            <div className="skeleton-bar h-3 w-8 rounded mx-auto" />
            <div className="skeleton-bar h-6 w-6 rounded mx-auto" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div className="skeleton-bar h-5 w-32 rounded" />
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

  return (
    <div className="space-y-3">
      {sortedEvents.map((event) => {
        const daysUntil = differenceInDays(new Date(event.date), new Date());
        return (
          <div
            key={event.id}
            className="card card-hover flex items-center gap-4 p-4 group"
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
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-100 truncate group-hover:text-mtg-gold transition-colors">
                  {event.nameCN || event.name}
                </h3>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded border flex-shrink-0 ${
                    TYPE_COLORS[event.type]
                  }`}
                >
                  {event.type}
                </span>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
                <span>{event.location}</span>
                {event.attendance && (
                  <>
                    <span className="text-gray-700">·</span>
                    <span>{event.attendance} players</span>
                  </>
                )}
                <span className="text-gray-700 hidden sm:inline">·</span>
                <span className="text-gray-600 hidden sm:inline text-xs">
                  {TYPE_LABELS[event.type]}
                </span>
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
          </div>
        );
      })}
    </div>
  );
}
