import { NextResponse } from 'next/server';
import { getTournaments } from '@/lib/tournaments';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || undefined;
  const format = searchParams.get('format') || undefined;
  const location = searchParams.get('location') || undefined;

  const tournaments = getTournaments({ type, format, location });

  return NextResponse.json({ tournaments }, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
