import { NextResponse } from 'next/server';
import { fetchCardPrice, fetchPriceHistory } from '@/lib/scrapers/mtggoldfish';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const card = searchParams.get('card');
  const history = searchParams.get('history');

  try {
    if (card && history) {
      const data = await fetchPriceHistory(card, parseInt(history) || 30);
      return NextResponse.json({ card, history: data }, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    }

    if (card) {
      const data = await fetchCardPrice(card);
      if (!data) {
        return NextResponse.json({ error: 'Card not found' }, { status: 404 });
      }
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    }

    return NextResponse.json({ error: 'Missing card parameter' }, { status: 400 });
  } catch (e) {
    console.error('API error:', e);
    return NextResponse.json({ error: 'Failed to fetch price data' }, { status: 500 });
  }
}
