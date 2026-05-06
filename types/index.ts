export interface DeckArchetype {
  name: string;
  nameCN?: string;
  share: number; // meta share %
  winRate?: number;
  top8Conversion?: number;
  sampleSize: number;
  tier: 'S' | 'A' | 'B' | 'C';
  keyCards: string[];
  price?: number; // deck price USD
  priceCN?: string;
}

export interface MatchupMatrix {
  deck: string;
  opponent: string;
  winRate: number;
  sampleSize: number;
}

export interface DeckDetail extends DeckArchetype {
  description: string;
  descriptionCN?: string;
  matchups: MatchupMatrix[];
  recentLists: DeckList[];
  priceHistory: PricePoint[];
}

export interface DeckList {
  id: string;
  player: string;
  event: string;
  date: string;
  result: string;
  url: string;
  mainboard: CardEntry[];
  sideboard: CardEntry[];
}

export interface CardEntry {
  count: number;
  name: string;
  nameCN?: string;
  price?: number;
}

export interface Player {
  id: string;
  name: string;
  elo: number;
  eloRank: number;
  winRate: number;
  matchesPlayed: number;
  recentEvents: PlayerEvent[];
  archetypes: string[];
}

export interface PlayerEvent {
  event: string;
  date: string;
  deck: string;
  result: string;
  record: string;
}

export interface PricePoint {
  date: string;
  price: number;
}

export interface CardPrice {
  name: string;
  nameCN?: string;
  set: string;
  currentPrice: number;
  change24h: number;
  change7d: number;
  history: PricePoint[];
  imageUrl?: string;
}

export interface TournamentEvent {
  id: string;
  name: string;
  nameCN?: string;
  date: string;
  location: string;
  format: string;
  type: 'PT' | 'RC' | 'GP' | 'NR' | 'Other';
  attendance?: number;
  top8Decks?: string[];
  url?: string;
}

export interface MetaSnapshot {
  date: string;
  format: string;
  totalDecks: number;
  totalEvents: number;
  archetypes: DeckArchetype[];
  trends: Trend[];
}

export interface Trend {
  archetype: string;
  shareChange: number; // percentage point change
  winRateChange: number;
}
