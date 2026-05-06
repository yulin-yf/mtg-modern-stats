import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  const filePath = join(process.cwd(), 'public', 'data', 'meta.json');
  const meta = JSON.parse(readFileSync(filePath, 'utf-8'));
  
  if (name) {
    const decodedName = decodeURIComponent(name).replace(/-/g, ' ');
    const deck = meta.archetypes.find(
      (a: any) => a.name.toLowerCase() === decodedName.toLowerCase()
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
