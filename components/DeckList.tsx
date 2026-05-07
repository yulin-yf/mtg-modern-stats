'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import type { MetaSnapshot, DeckArchetype } from '@/types';

const TIER_BADGES = {
  S: 'bg-red-500/15 text-red-400 border-red-500/25',
  A: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  B: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  C: 'bg-green-500/15 text-green-400 border-green-500/25',
};

const TIER_RARITY = {
  S: 'mythic',
  A: 'rare',
  B: 'uncommon',
  C: 'common',
} as const;

const MANA_CLASSES: Record<string, string> = {
  W: 'mana-w',
  U: 'mana-u',
  B: 'mana-b',
  R: 'mana-r',
  G: 'mana-g',
};

/* 魔法力符号组件 */
function ManaSymbols({ colors }: { colors?: string[] }) {
  if (!colors || colors.length === 0) return null;
  return (
    <span className="inline-flex gap-0.5 ml-2">
      {colors.map((c) => (
        <span key={c} className={`mana-symbol ${MANA_CLASSES[c] || ''}`}>
          {c}
        </span>
      ))}
    </span>
  );
}

/* 骨架屏 */
function DeckListSkeleton() {
  return (
    <div className="space-y-4">
      {/* 搜索栏骨架 */}
      <div className="card flex flex-col sm:flex-row gap-3 p-4">
        <div className="skeleton-bar h-10 flex-1 rounded-lg" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-bar h-8 w-10 rounded" />
          ))}
        </div>
      </div>

      {/* 卡片骨架 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card p-5 space-y-4">
            <div className="flex justify-between">
              <div className="skeleton-bar h-5 w-32 rounded" />
              <div className="skeleton-bar h-5 w-8 rounded" />
            </div>
            <div className="space-y-2">
              <div className="skeleton-bar h-3 w-full rounded" />
              <div className="skeleton-bar h-3 w-4/5 rounded" />
              <div className="skeleton-bar h-3 w-3/5 rounded" />
            </div>
            <div className="flex gap-1 pt-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="skeleton-bar h-5 w-16 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DeckList() {
  const [data, setData] = useState<MetaSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/metagame')
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredDecks = useMemo(() => {
    if (!data) return [];
    return data.archetypes.filter((deck) => {
      const matchesSearch = !searchTerm ||
        deck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (deck.nameCN && deck.nameCN.includes(searchTerm));
      const matchesTier = !tierFilter || deck.tier === tierFilter;
      return matchesSearch && matchesTier;
    });
  }, [data, searchTerm, tierFilter]);

  if (loading) return <DeckListSkeleton />;

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="card flex flex-col sm:flex-row gap-3 p-4">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search decks / 搜索套牌..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-mtg-gold/50 focus:bg-gray-800 transition-all"
          />
        </div>
        <div className="flex gap-2 items-center">
          {(['S', 'A', 'B', 'C'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tierFilter === tier ? null : tier)}
              className={`px-3 py-1.5 text-xs font-bold rounded border transition-all ${
                tierFilter === tier
                  ? TIER_BADGES[tier]
                  : 'bg-gray-800/60 border-gray-700 text-gray-500 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tier}
            </button>
          ))}
          {(searchTerm || tierFilter) && (
            <button
              onClick={() => { setSearchTerm(''); setTierFilter(null); }}
              className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500 flex items-center gap-2">
        <span>Showing {filteredDecks.length} decks</span>
        <span className="text-gray-700">·</span>
        <span>显示 {filteredDecks.length} 套牌</span>
      </div>

      {/* Deck Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDecks.map((deck) => (
          <DeckCard key={deck.name} deck={deck} />
        ))}
      </div>
    </div>
  );
}

function DeckCard({ deck }: { deck: DeckArchetype }) {
  const slug = deck.name.toLowerCase().replace(/\s+/g, '-');
  const rarity = TIER_RARITY[deck.tier];

  return (
    <Link
      href={`/deck/${encodeURIComponent(slug)}`}
      className={`card-${rarity} group block`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-100 group-hover:text-mtg-gold transition-colors truncate flex items-center">
            {deck.name}
            <ManaSymbols colors={deck.colors} />
          </h3>
          {deck.nameCN && (
            <p className="text-sm text-gray-500 mt-0.5">{deck.nameCN}</p>
          )}
        </div>
        <span className={`px-2 py-0.5 text-xs font-bold rounded border flex-shrink-0 ml-2 ${TIER_BADGES[deck.tier]}`}>
          {deck.tier}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Meta Share</span>
          <span className="text-mtg-gold font-medium">{deck.share}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Sample Size</span>
          <span className="text-gray-300">{deck.sampleSize} decks</span>
        </div>
        {deck.price && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Est. Price</span>
            <span className="text-gray-300">${deck.price}</span>
          </div>
        )}
      </div>

      {deck.keyCards && deck.keyCards.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {deck.keyCards.slice(0, 3).map((card) => (
            <span key={card} className="text-xs bg-gray-800/80 text-gray-400 px-2 py-1 rounded border border-gray-700/50 truncate max-w-[130px]">
              {card}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
