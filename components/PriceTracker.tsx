'use client';

import { useState } from 'react';
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
import type { CardPrice } from '@/types';

const TOP_CARDS = [
  { name: 'Ragavan, Nimble Pilferer', nameCN: '敏捷窃贼拉加万' },
  { name: 'Murktide Regent', nameCN: '墨鳕帝君' },
  { name: 'Wrenn and Six', nameCN: '芮恩与六树妖' },
  { name: 'Yawgmoth, Thran Physician', nameCN: '索族医师约格莫夫' },
  { name: "Urza's Saga", nameCN: '克撒传人' },
  { name: 'Primeval Titan', nameCN: '太初泰坦' },
  { name: 'Grief', nameCN: '悲恸' },
  { name: 'Fury', nameCN: '狂怒' },
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
        <div className="flex justify-between mt-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton-bar h-3 w-12 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PriceTracker() {
  const [selectedCard, setSelectedCard] = useState(TOP_CARDS[0]);
  const { data, error } = useSWR(
    `/api/prices?card=${encodeURIComponent(selectedCard.name)}&history=30`,
    fetcher,
    { refreshInterval: 300000 }
  );

  return (
    <div className="space-y-4">
      {/* Card Selector - 移动端横向滚动 */}
      <div className="card p-4">
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
      </div>

      {/* Price Chart */}
      <div className="card">
        {error ? (
          <div className="h-64 flex items-center justify-center text-red-400">
            Failed to load price data
          </div>
        ) : !data ? (
          <PriceSkeleton />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-5 gap-2">
              <h3 className="text-lg font-semibold text-gray-100">
                <span className="hidden sm:inline">{selectedCard.name}</span>
                <span className="sm:hidden">{selectedCard.nameCN}</span>
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
