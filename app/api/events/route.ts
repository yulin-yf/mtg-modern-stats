import { NextResponse } from 'next/server';
import { getFallbackEvents } from '@/lib/scrapers/events';

export async function GET() {
  const events = getFallbackEvents();
  return NextResponse.json({ events }, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
    },
  });
}
