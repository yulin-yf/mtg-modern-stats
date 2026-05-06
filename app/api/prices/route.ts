import { NextResponse } from 'next/server';
import { getFallbackPriceHistory } from '@/lib/scrapers/mtggoldfish';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const card = searchParams.get('card') || 'Ragavan, Nimble Pilferer';
  const history = getFallbackPriceHistory(card);
  const currentPrice = history[history.length - 1]?.price || 0;
  const prevPrice = history[history.length - 2]?.price || currentPrice;
  const change24h = ((currentPrice - prevPrice) / prevPrice * 100);

  return NextResponse.json({
    name: card,
    currentPrice,
    change24h: Math.round(change24h * 100) / 100,
    change7d: 0,
    history,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
