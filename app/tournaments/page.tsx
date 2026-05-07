'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Tournament } from '@/lib/tournaments';

const TYPE_COLORS = {
  PT: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  RCQ: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  GP: 'bg-mtg-gold/15 text-mtg-gold border-mtg-gold/25',
  Showdown: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  NRG: 'bg-green-500/15 text-green-400 border-green-500/25',
  Other: 'bg-gray-700/30 text-gray-400 border-gray-600/20',
};

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    fetch('/api/tournaments')
      .then((r) => r.json())
      .then((d) => {
        setTournaments(d.tournaments || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filterType === 'all'
    ? tournaments
    : tournaments.filter((t) => t.type === filterType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-mtg-gold mb-4 inline-block">
        ← 返回首页 / Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-2">Tournament Archive / 赛事归档</h1>
      <p className="text-gray-500 mb-8">Recent RCQ, PT, GP, and Showdown results / 近期 RCQ、PT、大奖赛和 Showdown 成绩</p>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'PT', 'RCQ', 'GP', 'Showdown', 'NRG'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
              filterType === t
                ? 'bg-mtg-gold/15 border-mtg-gold/40 text-mtg-gold'
                : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-gray-200'
            }`}
          >
            {t === 'all' ? 'All / 全部' : t}
          </button>
        ))}
      </div>

      {/* Tournament List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card h-24 skeleton-bar" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((t) => (
            <Link
              key={t.id}
              href={`/tournament/${t.id}`}
              className="card card-hover flex items-center gap-4 p-5 group"
            >
              <div className="flex-shrink-0 text-center w-14">
                <div className="text-xs text-gray-500 uppercase">{t.date.slice(0, 4)}</div>
                <div className="text-xl font-bold">{t.date.slice(5, 7)}/{t.date.slice(8, 10)}</div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-100 group-hover:text-mtg-gold transition-colors truncate">
                    {t.nameCN || t.name}
                  </h3>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded border flex-shrink-0 ${TYPE_COLORS[t.type]}`}>
                    {t.type}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {t.location} · {t.attendance} players / 参赛者 · {t.format}
                </div>
              </div>

              <div className="flex-shrink-0 hidden sm:flex items-center gap-2">
                <div className="text-right">
                  <div className="text-xs text-gray-500">Winner</div>
                  <div className="text-sm text-gray-300 truncate max-w-[120px]">
                    {t.top8[0]?.deck || 'Unknown'}
                  </div>
                </div>
                <span className="text-gray-600">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
