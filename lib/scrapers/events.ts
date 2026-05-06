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

function getFallbackEvents(): TournamentEvent[] {
  const today = new Date();
  const events: TournamentEvent[] = [
    {
      id: 'rc-spring-2024',
      name: 'Regional Championship Spring 2024',
      nameCN: '2024春季区域冠军赛',
      date: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      location: 'Multiple Regions',
      format: 'Modern',
      type: 'RC',
      attendance: 200,
    },
    {
      id: 'pt-chicago-2024',
      name: 'Pro Tour Chicago',
      nameCN: '芝加哥职业巡回赛',
      date: new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      location: 'Chicago, USA',
      format: 'Modern',
      type: 'PT',
      attendance: 400,
    },
    {
      id: 'nr-barcelona-2024',
      name: 'NRG Series Barcelona',
      nameCN: 'NRG系列赛巴塞罗那站',
      date: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      location: 'Barcelona, Spain',
      format: 'Modern',
      type: 'NR',
      attendance: 150,
    },
    {
      id: 'gp-tokyo-2024',
      name: 'Grand Prix Tokyo',
      nameCN: '大奖赛东京站',
      date: new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      location: 'Tokyo, Japan',
      format: 'Modern',
      type: 'GP',
      attendance: 800,
    },
    {
      id: 'rc-summer-2024',
      name: 'Regional Championship Summer 2024',
      nameCN: '2024夏季区域冠军赛',
      date: new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      location: 'Multiple Regions',
      format: 'Modern',
      type: 'RC',
      attendance: 200,
    },
  ];
  return events;
}
