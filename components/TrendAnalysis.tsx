'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { MetaSnapshot } from '@/types';

export default function TrendAnalysis() {
  const [data, setData] = useState<MetaSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/metagame')
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="card h-64 animate-pulse" />
    );
  }

  if (!data?.trends || data.trends.length === 0) {
    return null;
  }

  const trendData = data.trends.map((t) => ({
    name: t.archetype,
    shareChange: t.shareChange,
    winRateChange: t.winRateChange,
    combined: t.shareChange + t.winRateChange,
  }));

  return (
    <div className="card">
      <h2 className="text-lg font-bold text-gray-100 mb-4">
        Meta Trends / 元游戏趋势
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Share change + Win rate change over last period / 近期占比变化 + 胜率变化
      </p>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              stroke="#475569"
            />
            <YAxis 
              tick={{ fill: '#94a3b8' }}
              stroke="#475569"
              unit="%"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e2e8f0' }}
              formatter={(value: number, name: string) => {
                const label = name === 'shareChange' ? 'Share Δ' : 'Win Rate Δ';
                return [`${value > 0 ? '+' : ''}${value}%`, label];
              }}
            />
            <ReferenceLine y={0} stroke="#475569" />
            <Area
              type="monotone"
              dataKey="shareChange"
              stackId="1"
              stroke="#c9a84c"
              fill="#c9a84c"
              fillOpacity={0.3}
              name="shareChange"
            />
            <Area
              type="monotone"
              dataKey="winRateChange"
              stackId="1"
              stroke="#60a5fa"
              fill="#60a5fa"
              fillOpacity={0.3}
              name="winRateChange"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex gap-4 text-sm">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-mtg-gold/50" />
          <span className="text-gray-400">Meta Share Change / 占比变化</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-400/50" />
          <span className="text-gray-400">Win Rate Change / 胜率变化</span>
        </span>
      </div>
    </div>
  );
}
