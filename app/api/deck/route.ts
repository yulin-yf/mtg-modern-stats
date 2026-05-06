import { NextResponse } from 'next/server';
import { getFallbackMeta } from '@/lib/scrapers/mtgtop8';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  const meta = getFallbackMeta();
  
  if (name) {
    const decodedName = decodeURIComponent(name).replace(/-/g, ' ');
    const deck = meta.archetypes.find(
      (a) => a.name.toLowerCase() === decodedName.toLowerCase()
    );
    
    if (!deck) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }
    
    return NextResponse.json({ deck }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }

  return NextResponse.json({ archetypes: meta.archetypes }, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
