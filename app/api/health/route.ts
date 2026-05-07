import { NextResponse } from 'next/server';
import { getCacheStats, clearExpiredCache, clearAllCache, getCacheKeys } from '@/lib/cache';
import { scrapeModernMeta } from '@/lib/scrapers/mtgtop8';
import { getFallbackPlayers } from '@/lib/scrapers/mtgelo';

interface HealthCheck {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  lastChecked: string;
  message: string;
  responseTimeMs?: number;
}

async function checkSource(name: string, checkFn: () => Promise<void>): Promise<HealthCheck> {
  const start = Date.now();
  try {
    await checkFn();
    return {
      name,
      status: 'healthy',
      lastChecked: new Date().toISOString(),
      message: 'OK',
      responseTimeMs: Date.now() - start,
    };
  } catch (e) {
    return {
      name,
      status: 'down',
      lastChecked: new Date().toISOString(),
      message: e instanceof Error ? e.message : String(e),
    };
  }
}

export async function GET() {
  const checks = await Promise.all([
    checkSource('MTGTop8', async () => {
      // Try a lightweight check - just fetch the page head
      const res = await fetch('https://mtgtop8.com/format?f=MO', {
        method: 'HEAD',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    }),
    checkSource('MTGGoldfish', async () => {
      const res = await fetch('https://www.mtggoldfish.com/metagame/modern#paper', {
        method: 'HEAD',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    }),
    checkSource('Scryfall', async () => {
      const res = await fetch('https://api.scryfall.com/symbology', {
        method: 'HEAD',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    }),
  ]);

  const cacheStats = getCacheStats();
  const overall = checks.every(c => c.status === 'healthy') ? 'healthy' 
    : checks.some(c => c.status === 'down') ? 'degraded' : 'healthy';

  return NextResponse.json({
    status: overall,
    timestamp: new Date().toISOString(),
    checks,
    cache: cacheStats,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
    },
  });
}
