import { NextResponse } from 'next/server';
import { scrapeEloPlayers, scrapePlayerDetail } from '@/lib/scrapers/mtgelo';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const player = await scrapePlayerDetail(id);
      if (!player) {
        return NextResponse.json({ error: 'Player not found' }, { status: 404 });
      }
      return NextResponse.json(player, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      });
    }

    const players = await scrapeEloPlayers('Modern', 50);
    return NextResponse.json({ players }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (e) {
    console.error('API error:', e);
    return NextResponse.json({ error: 'Failed to fetch player data' }, { status: 500 });
  }
}
