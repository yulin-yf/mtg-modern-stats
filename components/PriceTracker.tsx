'use client';

import { useState, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useSWR from 'swr';

const TOP_CARDS = [
  { name: 'Guide of Souls', nameCN: '灵魂向导' },
  { name: 'Galvanic Discharge', nameCN: '电镀放电' },
  { name: 'Psychic Frog', nameCN: '灵能蛙' },
  { name: 'Primeval Titan', nameCN: '太初泰坦' },
  { name: "Urza's Saga", nameCN: '克撒传人' },
  { name: 'Overlord of the Balemurk', nameCN: '祸沼霸主' },
  { name: 'Amulet of Vigor', nameCN: '活力护符' },
  { name: 'Malevolent Rumble', nameCN: '恶意rumble' },
  { name: 'Lightning Bolt', nameCN: '闪电击' },
  { name: 'Thoughtseize', nameCN: '攫取思绪' },
];

const fetcher = (url: string) => fetch(url).then((r) => r.json());

/* 骨架屏 */
function PriceSkeleton() {
  return (
    <div className="space-y-4">
      <div className="card p-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-bar h-8 w-24 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>
      <div className="card p-5">
        <div className="flex justify-between mb-6">
          <div className="skeleton-bar h-6 w-32 rounded" />
          <div className="skeleton-bar h-5 w-24 rounded" />
        </div>
        <div className="h-64 flex items-end justify-between gap-1 px-2">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="skeleton-bar w-full rounded-t"
              style={{ height: `${20 + Math.random() * 60}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PriceTracker() {
  const [search, setSearch] = useState('');
  const [selectedCard, setSelectedCard] = useState(TOP_CARDS[0]);
  const inputRef = useRef<HTMLInputElement>(null);

  // If user typed a search, use it; otherwise use selected preset
  const cardName = search.trim() || selectedCard.name;
  const cardDisplay = search.trim() ? cardName : selectedCard.nameCN || selectedCard.name;

  const { data, error, isLoading } = useSWR(
    `/api/prices?card=${encodeURIComponent(cardName)}&history=30`,
    fetcher,
    { refreshInterval: 300000 }
  );

  return (
    <div className="space-y-4">
      {/* Search + Presets */}
      <div className="card p-4 space-y-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search any card / 搜索任意卡牌..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-mtg-gold/50 focus:bg-gray-800 transition-all"
          />
          {search && (
            <button
              onClick={() => { setSearch(''); setSelectedCard(TOP_CARDS[0]); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Presets - only show when not searching */}
        {!search && (
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
            {TOP_CARDS.map((card) => (
              <button
                key={card.name}
                onClick={() => setSelectedCard(card)}
                className={`px-3 py-2 text-sm rounded-lg border whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedCard.name === card.name
                    ? 'bg-mtg-gold/15 border-mtg-gold/40 text-mtg-gold'
                    : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-gray-200 hover:bg-gray-800/80'
                }`}
              >
                <span className="hidden sm:inline">{card.name}</span>
                <span className="sm:hidden">{card.nameCN}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Chart */}
      <div className="card">
        {error ? (
          <div className="h-64 flex items-center justify-center text-red-400">
            Failed to load price data
          </div>
        ) : isLoading || !data ? (
          <PriceSkeleton />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-5 gap-2">
              <h3 className="text-lg font-semibold text-gray-100">
                {cardDisplay}
              </h3>
              <div className="flex gap-5 text-sm">
                <span>
                  <span className="text-gray-500">Current · 当前: </span>
                  <span className="text-mtg-gold font-mono font-bold">${data.currentPrice?.toFixed(2) || '—'}</span>
                </span>
                {data.change24h !== undefined && (
                  <span>
                    <span className="text-gray-500">24h: </span>
                    <span className={data.change24h >= 0 ? 'text-green-400 font-medium' : 'text-red-400 font-medium'}>
                      {data.change24h > 0 ? '+' : ''}{data.change24h}%
                    </span>
                  </span>
                )}
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.history || []} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    stroke="#475569"
                    tickFormatter={(d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    stroke="#475569"
                    tickFormatter={(v) => `$${v}`}
                    width={45}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '10px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                      padding: '12px',
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#c9a84c"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: '#c9a84c', stroke: '#0f172a', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
