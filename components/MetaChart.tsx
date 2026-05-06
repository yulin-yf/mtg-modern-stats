'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { MetaSnapshot } from '@/types';

const TIER_COLORS = {
  S: '#ef4444', // red-500
  A: '#f97316', // orange-500
  B: '#eab308', // yellow-500
  C: '#22c55e', // green-500
};

export default function MetaChart() {
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
      <div className="card h-96 flex items-center justify-center">
        <div className="text-gray-500">Loading metagame data...</div>
      </div>
    );
  }

  if (!data) return null;

  const chartData = data.archetypes.slice(0, 10).map((a) => ({
    name: a.name.length > 15 ? a.name.slice(0, 15) + '...' : a.name,
    fullName: a.name,
    share: a.share,
    tier: a.tier,
    sampleSize: a.sampleSize,
  }));

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">
          Based on {data.totalDecks.toLocaleString()} decks from {data.totalEvents} events / 
          基于 {data.totalDecks.toLocaleString()} 套牌，{data.totalEvents} 场赛事
        </div>
        <div className="flex gap-3 text-xs">
          {Object.entries(TIER_COLORS).map(([tier, color]) => (
            <span key={tier} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              Tier {tier}
            </span>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 60, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
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
              itemStyle={{ color: '#c9a84c' }}
              formatter={(value: number, name: string, props: any) => {
                const d = props.payload;
                return [
                  `${value}% (${d.sampleSize} decks)`,
                  d.fullName,
                ];
              }}
            />
            <Bar dataKey="share" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={TIER_COLORS[entry.tier as keyof typeof TIER_COLORS]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
