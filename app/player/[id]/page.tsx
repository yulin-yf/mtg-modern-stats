'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Player } from '@/types';

export default function PlayerPage({ params }: { params: { id: string } }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/player?id=${encodeURIComponent(params.id)}`)
      .then((r) => r.json())
      .then((d) => {
        setPlayer(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card h-96 animate-pulse" />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-100 mb-4">Player Not Found / 未找到牌手</h1>
        <Link href="/" className="btn-primary">Back / 返回</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-mtg-gold mb-4 inline-block">
          ← 返回首页 / Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-100">{player.name}</h1>
        {player.eloRank && (
          <p className="text-gray-500 mt-1">Rank #{player.eloRank} / 排名第 {player.eloRank} 位</p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="text-sm text-gray-500 mb-1">Elo Rating / Elo 评分</div>
          <div className="text-2xl font-bold text-mtg-gold">{player.elo}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500 mb-1">Global Rank / 全球排名</div>
          <div className="text-2xl font-bold text-gray-100">#{player.eloRank}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500 mb-1">Win Rate / 胜率</div>
          <div className={`text-2xl font-bold ${player.winRate >= 60 ? 'text-green-400' : player.winRate >= 55 ? 'text-yellow-400' : 'text-gray-400'}`}>
            {player.winRate}%
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500 mb-1">Matches / 对局数</div>
          <div className="text-2xl font-bold text-gray-100">{player.matchesPlayed}</div>
        </div>
      </div>

      {player.archetypes && player.archetypes.length > 0 && (
        <div className="card mb-8">
          <h2 className="text-lg font-bold text-gray-100 mb-4">Signature Decks / 常用套牌</h2>
          <div className="flex flex-wrap gap-2">
            {player.archetypes.map((arch) => (
              <Link
                key={arch}
                href={`/deck/${encodeURIComponent(arch.toLowerCase().replace(/\s+/g, '-'))}`}
                className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm border border-gray-700 hover:border-mtg-gold/50 transition-colors"
              >
                {arch}
              </Link>
            ))}
          </div>
        </div>
      )}

      {player.recentEvents && player.recentEvents.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-bold text-gray-100 mb-4">Recent Events / 近期赛事</h2>
          <div className="space-y-3">
            {player.recentEvents.map((event, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div>
                  <div className="font-medium text-gray-100">{event.event}</div>
                  <div className="text-sm text-gray-500">{event.date} · {event.deck}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-100">{event.result}</div>
                  <div className="text-xs text-gray-500">{event.record}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* External Links */}
      <div className="card mt-8">
        <h2 className="text-lg font-bold text-gray-100 mb-4">External Resources / 外部资源</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={`http://www.mtgeloproject.net/player/${player.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            MTG Elo Profile ↗
          </a>
          <a
            href={`https://www.mtgtop8.com/search?player=${encodeURIComponent(player.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            MTGTop8 History ↗
          </a>
        </div>
      </div>
    </div>
  );
}
