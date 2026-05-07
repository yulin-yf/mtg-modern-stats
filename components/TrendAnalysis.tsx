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

/* 骨架屏 */
function TrendSkeleton() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="skeleton-bar h-6 w-36 rounded" />
        <div className="skeleton-bar h-4 w-24 rounded" />
      </div>
      <div className="h-64 flex items-end justify-between gap-2 px-2">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="skeleton-bar w-full rounded-t"
            style={{ height: `${25 + Math.random() * 50}%` }}
          />
        ))}
      </div>
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="skeleton-bar w-3 h-3 rounded-full" />
          <div className="skeleton-bar h-3 w-24 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="skeleton-bar w-3 h-3 rounded-full" />
          <div className="skeleton-bar h-3 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}

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

  if (loading) return <TrendSkeleton />;

  if (!data?.trends || data.trends.length === 0) {
    return null;
  }

  const trendData = data.trends.map((t) => ({
    name: t.archetype.length > 14 ? t.archetype.slice(0, 14) + '…' : t.archetype,
    fullName: t.archetype,
    shareChange: t.shareChange,
    winRateChange: t.winRateChange,
    combined: t.shareChange + t.winRateChange,
  }));

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 gap-2">
        <h2 className="text-lg font-bold text-gray-100">
          Meta Trends <span className="text-gray-500 text-sm font-normal">/ 元游戏趋势</span>
        </h2>
        <p className="text-xs text-gray-500">
          Share change + Win rate change · 近期占比变化 + 胜率变化
        </p>
      </div>

      {/* 图表容器：移动端横向滚动 */}
      <div className="overflow-x-auto -mx-2 px-2">
        <div className="min-w-[500px] h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                stroke="#475569"
                interval={0}
                angle={-20}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                stroke="#475569"
                unit="%"
                width={40}
              />
              <Tooltip
                cursor={{ fill: 'rgba(51, 65, 85, 0.2)' }}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  padding: '12px',
                }}
                labelStyle={{ color: '#e2e8f0', fontWeight: 600 }}
                formatter={(value: number, name: string) => {
                  const label = name === 'shareChange' ? 'Share Δ · 占比变化' : 'Win Rate Δ · 胜率变化';
                  return [`${value > 0 ? '+' : ''}${value}%`, label];
                }}
              />
              <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="shareChange"
                stackId="1"
                stroke="#c9a84c"
                fill="#c9a84c"
                fillOpacity={0.25}
                strokeWidth={2}
                name="shareChange"
              />
              <Area
                type="monotone"
                dataKey="winRateChange"
                stackId="1"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.2}
                strokeWidth={2}
                name="winRateChange"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-mtg-gold/50" />
          <span className="text-gray-400">Meta Share Change · 占比变化</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-400/50" />
          <span className="text-gray-400">Win Rate Change · 胜率变化</span>
        </span>
      </div>
    </div>
  );
}
