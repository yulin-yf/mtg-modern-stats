'use client';

import { useEffect, useState, useMemo } from 'react';
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
  S: '#ef4444',
  A: '#f97316',
  B: '#eab308',
  C: '#22c55e',
};

const TIER_LABELS = {
  S: '环境定义者',
  A: '主流竞争者',
  B: '稳健选择',
  C: '小众但有力',
};

/* 骨架屏：有内容预判 */
function MetaChartSkeleton() {
  return (
    <div className="card-rare">
      {/* 头部信息条 */}
      <div className="flex items-center justify-between mb-6">
        <div className="skeleton-bar h-4 w-48 rounded" />
        <div className="flex gap-2">
          {Object.keys(TIER_COLORS).map((k) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className="skeleton-bar w-3 h-3 rounded-full" />
              <div className="skeleton-bar h-3 w-8 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* 图表区域预判：Y轴 + 柱状轮廓 */}
      <div className="h-80 flex gap-3">
        {/* Y轴 */}
        <div className="w-8 flex flex-col justify-between py-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-bar h-2 w-full rounded" />
          ))}
        </div>

        {/* 柱状区域 */}
        <div className="flex-1 flex items-end justify-around gap-2 pt-4 pb-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <div
                className="skeleton-bar w-full rounded-t-lg"
                style={{ height: `${30 + Math.random() * 50}%` }}
              />
              <div className="skeleton-bar h-2 w-10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.archetypes.slice(0, 10).map((a) => ({
      name: a.name,
      shortName: a.name.length > 12 ? a.name.slice(0, 12) + '…' : a.name,
      share: a.share,
      tier: a.tier,
      sampleSize: a.sampleSize,
      colors: a.colors || [],
    }));
  }, [data]);

  if (loading) return <MetaChartSkeleton />;
  if (!data) return null;

  return (
    <div className="card-rare">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div className="text-sm text-gray-500">
          Based on{' '}
          <span className="text-mtg-gold font-medium">{data.totalDecks.toLocaleString()}</span>{' '}
          decks from{' '}
          <span className="text-mtg-gold font-medium">{data.totalEvents}</span> events
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline text-gray-600">
            基于 {data.totalDecks.toLocaleString()} 套牌，{data.totalEvents} 场赛事
          </span>
        </div>
        <div className="flex flex-wrap gap-3 text-xs">
          {Object.entries(TIER_COLORS).map(([tier, color]) => (
            <span key={tier} className="flex items-center gap-1.5 text-gray-400">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
              <span>Tier {tier}</span>
              <span className="text-gray-600">· {TIER_LABELS[tier as keyof typeof TIER_LABELS]}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 图表容器：移动端横向滚动 */}
      <div className="overflow-x-auto -mx-2 px-2">
        <div className="min-w-[500px] h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 60, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="shortName"
                angle={-30}
                textAnchor="end"
                height={70}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                stroke="#475569"
                interval={0}
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
                labelStyle={{ color: '#e2e8f0', fontWeight: 600, marginBottom: '4px' }}
                itemStyle={{ color: '#c9a84c' }}
                formatter={(value: number, _name: string, props: any) => {
                  const d = props.payload;
                  return [`${value}% (${d.sampleSize} decks)`, d.name];
                }}
              />
              <Bar dataKey="share" radius={[5, 5, 0, 0]} maxBarSize={48}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={TIER_COLORS[entry.tier as keyof typeof TIER_COLORS]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
