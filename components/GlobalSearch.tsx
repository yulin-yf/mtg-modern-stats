'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import type { DeckArchetype } from '@/types';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DeckArchetype[]>([]);
  const [show, setShow] = useState(false);
  const [decks, setDecks] = useState<DeckArchetype[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/metagame')
      .then((r) => r.json())
      .then((d) => setDecks(d.archetypes || []));
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matched = decks.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        (d.nameCN && d.nameCN.includes(q)) ||
        d.keyCards.some((c) => c.toLowerCase().includes(q))
    );
    setResults(matched.slice(0, 6));
  }, [query, decks]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search decks / cards..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShow(true)}
          className="w-full bg-gray-800/60 border border-gray-700 rounded-lg pl-9 pr-8 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-mtg-gold/50 focus:bg-gray-800 transition-all"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {show && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 card p-2 z-50 space-y-1">
          {results.map((deck) => {
            const slug = deck.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                key={deck.name}
                href={`/deck/${encodeURIComponent(slug)}`}
                onClick={() => setShow(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-100 truncate">{deck.name}</div>
                  {deck.nameCN && <div className="text-xs text-gray-500">{deck.nameCN}</div>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-xs text-mtg-gold">{deck.share}%</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">{deck.tier}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {show && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 card p-3 z-50 text-sm text-gray-500 text-center">
          No results / 无结果
        </div>
      )}
    </div>
  );
}
