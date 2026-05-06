'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format, differenceInDays } from 'date-fns';
import type { TournamentEvent } from '@/types';

const TYPE_COLORS = {
  PT: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  RC: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  GP: 'bg-mtg-gold/20 text-mtg-gold border-mtg-gold/30',
  NR: 'bg-green-500/20 text-green-400 border-green-500/30',
  Other: 'bg-gray-700/50 text-gray-400 border-gray-600/30',
};

const TYPE_LABELS: Record<string, { en: string; cn: string }> = {
  PT: { en: 'Pro Tour', cn: '职业巡回赛' },
  RC: { en: 'Regional Championship', cn: '区域冠军赛' },
  GP: { en: 'Grand Prix', cn: '大奖赛' },
  NR: { en: 'NRG Series', cn: 'NRG系列赛' },
  Other: { en: 'Other', cn: '其他赛事' },
};

export default function CalendarPage() {
  const [events, setEvents] = useState<TournamentEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((d) => {
        setEvents(d.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter((e) => e.type === filter);

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group by month
  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const month = format(new Date(event.date), 'yyyy-MM');
    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
    return acc;
  }, {} as Record<string, TournamentEvent[]>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-mtg-gold mb-4 inline-block">
          ← 返回首页 / Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          Event Calendar / 赛事日历
        </h1>
        <p className="text-gray-500">
          Upcoming Modern tournaments and championships
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['all', 'PT', 'RC', 'GP', 'NR'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
              filter === type
                ? 'bg-mtg-gold/20 border-mtg-gold/50 text-mtg-gold'
                : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-gray-200'
            }`}
          >
            {type === 'all' ? 'All / 全部' : TYPE_LABELS[type]?.en || type}
          </button>
        ))}
      </div>

      {/* Events */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card h-24 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedEvents).map(([month, monthEvents]) => (
            <div key={month}>
              <h2 className="text-lg font-bold text-gray-300 mb-3 sticky top-20 bg-mtg-dark/95 py-2">
                {format(new Date(month + '-01'), 'MMMM yyyy')}
              </h2>
              <div className="space-y-3">
                {monthEvents.map((event) => {
                  const daysUntil = differenceInDays(new Date(event.date), new Date());
                  return (
                    <div key={event.id} className="card card-hover flex items-center gap-4">
                      <div className="flex-shrink-0 text-center w-16">
                        <div className="text-xs text-gray-500 uppercase">
                          {format(new Date(event.date), 'MMM')}
                        </div>
                        <div className="text-xl font-bold text-gray-100">
                          {format(new Date(event.date), 'd')}
                        </div>
                      </div>

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
                        <div className="text-sm text-gray-500 flex items-center gap-3 flex-wrap">
                          <span>{event.location}</span>
                          {event.attendance && (
                            <span>· {event.attendance} players / 牌手</span>
                          )}
                          <span>· {event.format}</span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 text-right min-w-[80px]">
                        {daysUntil > 0 ? (
                          <div className="text-sm">
                            <span className="text-mtg-gold font-bold">{daysUntil}</span>
                            <span className="text-gray-500 ml-1">days / 天</span>
                          </div>
                        ) : daysUntil === 0 ? (
                          <span className="text-sm text-mtg-gold font-semibold">Today / 今日</span>
                        ) : (
                          <span className="text-sm text-gray-600">
                            {Math.abs(daysUntil)}d ago / 天前
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
