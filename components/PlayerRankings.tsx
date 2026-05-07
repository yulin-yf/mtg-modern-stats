'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Player } from '@/types';

/* 骨架屏 */
function PlayerSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="pb-3 pl-4 pt-4"><div className="skeleton-bar h-3 w-10 rounded" /></th>
              <th className="pb-3 pt-4"><div className="skeleton-bar h-3 w-16 rounded" /></th>
              <th className="pb-3 pt-4 text-right"><div className="skeleton-bar h-3 w-8 rounded ml-auto" /></th>
              <th className="pb-3 pt-4 text-right"><div className="skeleton-bar h-3 w-12 rounded ml-auto" /></th>
              <th className="pb-3 pr-4 pt-4 text-right"><div className="skeleton-bar h-3 w-10 rounded ml-auto" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td className="py-3 pl-4"><div className="skeleton-bar h-7 w-7 rounded-full" /></td>
                <td className="py-3">
                  <div className="skeleton-bar h-4 w-28 rounded mb-1" />
                  <div className="skeleton-bar h-3 w-20 rounded" />
                </td>
                <td className="py-3 text-right"><div className="skeleton-bar h-4 w-12 rounded ml-auto" /></td>
                <td className="py-3 text-right"><div className="skeleton-bar h-4 w-10 rounded ml-auto" /></td>
                <td className="py-3 pr-4 text-right"><div className="skeleton-bar h-4 w-10 rounded ml-auto" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-gray-800 mt-4 pt-4 text-center">
        <div className="skeleton-bar h-4 w-32 rounded mx-auto" />
      </div>
    </div>
  );
}

export default function PlayerRankings() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/player')
      .then((r) => r.json())
      .then((d) => {
        setPlayers(d.players || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <PlayerSkeleton />;

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 text-left text-xs text-gray-500 uppercase tracking-wider">
              <th className="pb-3 pl-4 font-medium">Rank</th>
              <th className="pb-3 font-medium">Player</th>
              <th className="pb-3 text-right font-medium">Elo</th>
              <th className="pb-3 text-right font-medium">Win Rate</th>
              <th className="pb-3 text-right pr-4 font-medium">Matches</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {players.slice(0, 10).map((player, i) => (
              <tr
                key={player.id}
                className="group hover:bg-gray-800/40 transition-colors cursor-pointer"
              >
                <td className="py-3 pl-4">
                  <RankBadge rank={i} />
                </td>
                <td className="py-3">
                  <Link href={`/player/${encodeURIComponent(player.id)}`} className="block">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-gray-100 group-hover:text-mtg-gold transition-colors">
                        {player.name}
                      </div>
                      {i < 3 && (
                        <span className="text-xs text-mtg-gold/60 hidden sm:inline">★</span>
                      )}
                    </div>
                    {player.archetypes && player.archetypes.length > 0 && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {player.archetypes.slice(0, 2).join(' · ')}
                      </div>
                    )}
                  </Link>
                </td>
                <td className="py-3 text-right">
                  <span className="font-mono text-mtg-gold font-semibold">{player.elo}</span>
                </td>
                <td className="py-3 text-right">
                  <WinRateBadge winRate={player.winRate} />
                </td>
                <td className="py-3 text-right pr-4 text-gray-500">
                  {player.matchesPlayed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-gray-800 mt-4 pt-4 text-center">
        <Link href="#" className="text-sm text-mtg-gold hover:brightness-110 transition-all inline-flex items-center gap-1">
          View All Players
          <span className="text-gray-600">· 查看全部牌手</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 0) {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-mtg-gold to-amber-600 text-mtg-dark text-xs font-bold shadow-lg shadow-mtg-gold/20">
        1
      </span>
    );
  }
  if (rank === 1) {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 text-mtg-dark text-xs font-bold">
        2
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 text-xs font-bold">
        3
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-gray-400 text-xs font-bold">
      {rank + 1}
    </span>
  );
}

function WinRateBadge({ winRate }: { winRate: number }) {
  if (winRate >= 62) {
    return <span className="text-green-400 font-medium">{winRate}%</span>;
  }
  if (winRate >= 58) {
    return <span className="text-yellow-400 font-medium">{winRate}%</span>;
  }
  return <span className="text-gray-400">{winRate}%</span>;
}
