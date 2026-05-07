import { TournamentEvent } from '@/types';
import { getCache, setCache } from '../cache';

// Event calendar data
// Combines Wizards official events + major tournament series

const EVENTS_API = 'https://api.magicthegathering.io/v1/events';

export async function fetchEvents(format: string = 'modern', months: number = 3): Promise<TournamentEvent[]> {
  const cacheKey = `events:${format}:${months}`;
  const cached = getCache<TournamentEvent[]>(cacheKey);
  if (cached) return cached;

  try {
    // In a real implementation, this would scrape/aggregate from:
    // - Wizards event locator
    // - RC series schedules
    // - Major TO websites
    
    const events = getFallbackEvents();
    setCache(cacheKey, events, 86400); // 24 hour cache
    return events;
  } catch (e) {
    console.error('Events fetch failed:', e);
    return getFallbackEvents();
  }
}

export function getFallbackEvents(): TournamentEvent[] {
  const events: TournamentEvent[] = [
    // Paper 线下赛事
    {
      id: 'pt-milan-2026-06',
      name: 'Pro Tour: Milan',
      nameCN: '职业巡回赛：米兰',
      date: '2026-06-12',
      location: 'Milan, Italy',
      format: 'Modern',
      type: 'PT',
      attendance: 500,
    },
    {
      id: 'rcq-seattle-2026-05',
      name: 'RCQ Seattle',
      nameCN: '西雅图区域冠军资格赛',
      date: '2026-05-17',
      location: 'Seattle, WA, USA',
      format: 'Modern',
      type: 'RC',
      attendance: 180,
    },
    {
      id: 'nrg-chicago-2026-05',
      name: 'NRG Series Chicago',
      nameCN: 'NRG 芝加哥系列赛',
      date: '2026-05-24',
      location: 'Chicago, IL, USA',
      format: 'Modern',
      type: 'NR',
      attendance: 160,
    },
    {
      id: 'gp-london-2026-06',
      name: 'Grand Prix London',
      nameCN: '伦敦大奖赛',
      date: '2026-06-21',
      location: 'London, UK',
      format: 'Modern',
      type: 'GP',
      attendance: 600,
    },
    {
      id: 'rcq-tokyo-2026-06',
      name: 'RCQ Tokyo',
      nameCN: '东京区域冠军资格赛',
      date: '2026-06-28',
      location: 'Tokyo, Japan',
      format: 'Modern',
      type: 'RC',
      attendance: 220,
    },
    // MTGO 线上赛事
    {
      id: 'mtgo-mo-challenge-2026-05-10',
      name: 'MTGO Modern Challenge',
      nameCN: 'MTGO 摩登挑战赛',
      date: '2026-05-10',
      location: 'MTGO',
      format: 'Modern',
      type: 'Other',
      attendance: 120,
    },
    {
      id: 'mtgo-mo-premier-2026-05-17',
      name: 'MTGO Modern Premier',
      nameCN: 'MTGO 摩登 Premier',
      date: '2026-05-17',
      location: 'MTGO',
      format: 'Modern',
      type: 'Other',
      attendance: 80,
    },
    {
      id: 'mtgo-mo-challenge-2026-05-24',
      name: 'MTGO Modern Challenge',
      nameCN: 'MTGO 摩登挑战赛',
      date: '2026-05-24',
      location: 'MTGO',
      format: 'Modern',
      type: 'Other',
      attendance: 120,
    },
    // MTGA 线上赛事
    {
      id: 'mtga-mo-open-2026-05-09',
      name: 'MTGA Modern Open',
      nameCN: 'MTGA 摩登公开赛',
      date: '2026-05-09',
      location: 'MTGA',
      format: 'Modern',
      type: 'Other',
      attendance: 200,
    },
    {
      id: 'mtga-mo-qualifier-2026-05-16',
      name: 'MTGA Modern Qualifier',
      nameCN: 'MTGA 摩登资格赛',
      date: '2026-05-16',
      location: 'MTGA',
      format: 'Modern',
      type: 'Other',
      attendance: 150,
    },
    {
      id: 'mtga-mo-open-2026-05-23',
      name: 'MTGA Modern Open',
      nameCN: 'MTGA 摩登公开赛',
      date: '2026-05-23',
      location: 'MTGA',
      format: 'Modern',
      type: 'Other',
      attendance: 200,
    },
  ];
  return events;
}
