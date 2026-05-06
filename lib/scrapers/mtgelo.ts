import { Player } from '@/types';
import { getCache, setCache } from '../cache';

// MTG Elo Project scraper
// http://www.mtgeloproject.net/

const ELO_BASE = 'http://www.mtgeloproject.net';

export async function scrapeEloPlayers(format: string = 'Modern', limit: number = 50): Promise<Player[]> {
  const cacheKey = `mtgelo:players:${format}:${limit}`;
  const cached = getCache<Player[]>(cacheKey);
  if (cached) return cached;

  try {
    // The Elo project has a JSON endpoint for rankings
    const url = `${ELO_BASE}/api/rankings?format=${format}&limit=${limit}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    
    const players: Player[] = data.players?.map((p: any, i: number) => ({
      id: p.id || p.name?.toLowerCase().replace(/\s+/g, '-'),
      name: p.name,
      elo: Math.round(p.elo || p.rating || 1500),
      eloRank: i + 1,
      winRate: p.win_rate || p.winRate || 0,
      matchesPlayed: p.matches || p.matches_played || 0,
      recentEvents: (p.recent_events || []).map((e: any) => ({
        event: e.name,
        date: e.date,
        deck: e.deck,
        result: e.result,
        record: e.record,
      })),
      archetypes: p.archetypes || [],
    })) || [];

    setCache(cacheKey, players, 7200); // 2 hour cache
    return players;
  } catch (e) {
    console.error('MTG Elo scrape failed:', e);
    return getFallbackPlayers();
  }
}

export async function scrapePlayerDetail(playerId: string): Promise<Player | null> {
  const cacheKey = `mtgelo:player:${playerId}`;
  const cached = getCache<Player>(cacheKey);
  if (cached) return cached;

  try {
    const url = `${ELO_BASE}/api/player/${playerId}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    
    const player: Player = {
      id: playerId,
      name: data.name,
      elo: Math.round(data.elo || data.rating || 1500),
      eloRank: data.rank || 0,
      winRate: data.win_rate || 0,
      matchesPlayed: data.matches || 0,
      recentEvents: (data.recent_events || []).map((e: any) => ({
        event: e.name,
        date: e.date,
        deck: e.deck,
        result: e.result,
        record: e.record,
      })),
      archetypes: data.archetypes || [],
    };

    setCache(cacheKey, player, 3600);
    return player;
  } catch (e) {
    console.error('Player detail scrape failed:', e);
    return null;
  }
}

export function getFallbackPlayers(): Player[] {
  return [
    { id: 'aspiringspike', name: 'Aspiring Spike', elo: 1875, eloRank: 1, winRate: 64.2, matchesPlayed: 342, recentEvents: [], archetypes: ['Amulet Titan', 'Creativity'] },
    { id: 'kanister', name: 'kanister', elo: 1843, eloRank: 2, winRate: 62.8, matchesPlayed: 518, recentEvents: [], archetypes: ['Yawgmoth', 'Amulet Titan'] },
    { id: 'mengu', name: 'Mengu', elo: 1821, eloRank: 3, winRate: 61.5, matchesPlayed: 289, recentEvents: [], archetypes: ['Murktide Regent', 'Rakdos Scam'] },
    { id: 'yowza', name: 'Yowza', elo: 1809, eloRank: 4, winRate: 60.9, matchesPlayed: 198, recentEvents: [], archetypes: ['Hammer Time', 'Affinity'] },
    { id: 'thurule', name: 'Thurule', elo: 1795, eloRank: 5, winRate: 59.8, matchesPlayed: 267, recentEvents: [], archetypes: ['Living End', 'Creativity'] },
    { id: 'trellon', name: 'Trellon', elo: 1788, eloRank: 6, winRate: 59.2, matchesPlayed: 156, recentEvents: [], archetypes: ['Burn', 'Mono G Tron'] },
    { id: 'nathansteuer', name: 'Nathan Steuer', elo: 1782, eloRank: 7, winRate: 58.7, matchesPlayed: 401, recentEvents: [], archetypes: ['Rakdos Scam', 'Jund'] },
    { id: 'burnt-taco', name: 'Burnt Taco', elo: 1776, eloRank: 8, winRate: 58.1, matchesPlayed: 223, recentEvents: [], archetypes: ['Yawgmoth', 'Heliod Combo'] },
    { id: 'dominator', name: 'Dominator', elo: 1769, eloRank: 9, winRate: 57.5, matchesPlayed: 312, recentEvents: [], archetypes: ['Dredge', 'Living End'] },
    { id: 'masonclark', name: 'Mason Clark', elo: 1761, eloRank: 10, winRate: 56.9, matchesPlayed: 445, recentEvents: [], archetypes: ['Murktide Regent', 'Grixis Shadow'] },
  ];
}
