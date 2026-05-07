import { NextResponse } from 'next/server';
import { getFallbackPlayers } from '@/lib/scrapers/mtgelo';

export async function GET() {
  const players = getFallbackPlayers();
  return NextResponse.json({ players }, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
