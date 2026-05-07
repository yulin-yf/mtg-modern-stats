import { NextResponse } from 'next/server';
import { getFallbackMeta } from '@/lib/scrapers/mtgtop8';

export async function GET() {
  const data = getFallbackMeta();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
