import { NextResponse } from 'next/server';
import { scrapeModernMeta } from '@/lib/scrapers/mtgtop8';

export async function GET() {
  try {
    const data = await scrapeModernMeta('last_3_months');
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (e) {
    console.error('API error:', e);
    return NextResponse.json({ error: 'Failed to fetch metagame data' }, { status: 500 });
  }
}
