'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Player } from '@/types';

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

  if (loading) {
    return (
      <div className="card">
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-gray-800/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 text-left text-xs text-gray-500 uppercase">
              <th className="pb-3 pl-4">Rank / 排名</th>
              <th className="pb-3">Player / 牌手</th>
              <th className="pb-3 text-right">Elo</th>
              <th className="pb-3 text-right">Win Rate / 胜率</th>
              <th className="pb-3 text-right pr-4">Matches / 对局</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {players.slice(0, 10).map((player, i) => (
              <tr
                key={player.id}
                className="group hover:bg-gray-800/30 transition-colors cursor-pointer"
              >
                <td className="py-3 pl-4">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold
                    ${i < 3 ? 'bg-mtg-gold/20 text-mtg-gold' : 'bg-gray-800 text-gray-400'}`}>
                    {i + 1}
                  </span>
                </td>
                <td className="py-3">
                  <Link href={`/player/${encodeURIComponent(player.id)}`} className="block">
                    <div>
                      <div className="font-medium text-gray-100 group-hover:text-mtg-gold transition-colors">
                        {player.name}
                      </div>
                      {player.archetypes && player.archetypes.length > 0 && (
                        <div className="text-xs text-gray-500 mt-0.5">
                          {player.archetypes.slice(0, 2).join(' · ')}
                        </div>
                      )}
                    </div>
                  </Link>
                </td>
                <td className="py-3 text-right font-mono text-mtg-gold">
                  {player.elo}
                </td>
                <td className="py-3 text-right">
                  <span className={player.winRate >= 60 ? 'text-green-400' : player.winRate >= 55 ? 'text-yellow-400' : 'text-gray-400'}>
                    {player.winRate}%
                  </span>
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
        <Link href="#" className="text-sm text-mtg-gold hover:brightness-110">
          View All Players / 查看全部牌手 →
        </Link>
      </div>
    </div>
  );
}
