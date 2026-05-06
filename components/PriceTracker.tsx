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

export default function PriceTracker() {
  const [selectedCard, setSelectedCard] = useState(TOP_CARDS[0]);
  const { data, error } = useSWR(
    `/api/prices?card=${encodeURIComponent(selectedCard.name)}&history=30`,
    fetcher,
    { refreshInterval: 300000 } // 5 minutes
  );

  return (
    <div className="space-y-4">
      {/* Card Selector */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          {TOP_CARDS.map((card) => (
            <button
              key={card.name}
              onClick={() => setSelectedCard(card)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                selectedCard.name === card.name
                  ? 'bg-mtg-gold/20 border-mtg-gold/50 text-mtg-gold'
                  : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-gray-200'
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
          <div className="h-64 flex items-center justify-center text-gray-500">
            Loading...
          </div>
        ) : (
          <>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-100">
                <span className="hidden sm:inline">{selectedCard.name}</span>
                <span className="sm:hidden">{selectedCard.nameCN}</span>
              </h3>
              <div className="flex gap-4 text-sm">
                <span>
                  <span className="text-gray-500">Current: </span>
                  <span className="text-mtg-gold font-mono">${data.currentPrice?.toFixed(2) || '—'}</span>
                </span>
                {data.change24h !== undefined && (
                  <span>
                    <span className="text-gray-500">24h: </span>
                    <span className={data.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {data.change24h > 0 ? '+' : ''}{data.change24h}%
                    </span>
                  </span>
                )}
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.history || []} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
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
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#c9a84c"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#c9a84c', stroke: '#1e293b' }}
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