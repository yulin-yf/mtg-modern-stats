import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const res = await fetch(new URL('/data/players.json', base));
  const data = await res.json();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600',
    },
  });
}
