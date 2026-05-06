import { NextResponse } from 'next/server';
import { fetchEvents } from '@/lib/scrapers/events';

export async function GET() {
  try {
    const events = await fetchEvents('modern', 3);
    return NextResponse.json({ events }, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
      },
    });
  } catch (e) {
    console.error('API error:', e);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
