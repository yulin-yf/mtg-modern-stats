'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { MetaSnapshot, DeckArchetype } from '@/types';

const TIER_BADGES = {
  S: 'bg-red-500/20 text-red-400 border-red-500/30',
  A: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  B: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  C: 'bg-green-500/20 text-green-400 border-green-500/30',
};

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

  const filteredDecks = data?.archetypes.filter((deck) => {
    const matchesSearch = !searchTerm || 
      deck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (deck.nameCN && deck.nameCN.includes(searchTerm));
    const matchesTier = !tierFilter || deck.tier === tierFilter;
    return matchesSearch && matchesTier;
  }) || [];

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card h-40 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="card flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search decks / 搜索套牌..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-mtg-gold/50"
        />
        <div className="flex gap-2">
          {(['S', 'A', 'B', 'C'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tierFilter === tier ? null : tier)}
              className={`px-3 py-1.5 text-xs font-bold rounded border transition-all ${
                tierFilter === tier
                  ? TIER_BADGES[tier]
                  : 'bg-gray-800 border-gray-700 text-gray-500 hover:text-gray-300'
              }`}
            >
              {tier}
            </button>
          ))}
          <button
            onClick={() => { setSearchTerm(''); setTierFilter(null); }}
            className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Reset / 重置
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        Showing {filteredDecks.length} decks / 显示 {filteredDecks.length} 套牌
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
  
  return (
    <Link
      href={`/deck/${encodeURIComponent(slug)}`}
      className="card card-hover group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-100 group-hover:text-mtg-gold transition-colors truncate">
            {deck.name}
          </h3>
          {deck.nameCN && (
            <p className="text-sm text-gray-500">{deck.nameCN}</p>
          )}
        </div>
        <span className={`px-2 py-0.5 text-xs font-bold rounded border flex-shrink-0 ml-2 ${TIER_BADGES[deck.tier]}`}>
          {deck.tier}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Meta Share / 占比</span>
          <span className="text-mtg-gold font-medium">{deck.share}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Sample Size / 样本</span>
          <span className="text-gray-300">{deck.sampleSize} decks / 套牌</span>
        </div>
        {deck.price && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Est. Price / 预估价格</span>
            <span className="text-gray-300">${deck.price}</span>
          </div>
        )}
      </div>

      {deck.keyCards && deck.keyCards.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {deck.keyCards.slice(0, 3).map((card) => (
            <span key={card} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded truncate max-w-[120px]">
              {card}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
