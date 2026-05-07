'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HealthData {
  status: string;
  timestamp: string;
  checks: { name: string; status: string; lastChecked: string; message: string; responseTimeMs?: number }[];
  cache: { totalEntries: number; expiredEntries: number; totalSize: number; hitRate: number };
}

export default function AdminPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [cacheKeys, setCacheKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = () => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setHealth(d));
  };

  const refreshMeta = async () => {
    setLoading(true);
    setActionMsg('Refreshing meta data...');
    try {
      const res = await fetch('/api/metagame?refresh=true');
      const data = await res.json();
      setActionMsg(`Meta refreshed: ${data.archetypes?.length || 0} decks loaded`);
      fetchHealth();
    } catch (e) {
      setActionMsg('Refresh failed: ' + (e instanceof Error ? e.message : String(e)));
    }
    setLoading(false);
  };

  const clearCache = async () => {
    setLoading(true);
    setActionMsg('Clearing cache...');
    try {
      // Client-side can't directly access server cache, use a separate API or just reload
      // For now, simulate by clearing localStorage and notifying
      localStorage.clear();
      setActionMsg('Local cache cleared. Server cache persists until restart.');
    } catch (e) {
      setActionMsg('Clear failed');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 bg-mtg-void/80 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-mtg-gold">MTG Modern Stats</Link>
          <span className="text-sm text-gray-500">Admin / 后台管理</span>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard / 管理后台</h1>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button
            onClick={refreshMeta}
            disabled={loading}
            className="card text-left hover:border-mtg-gold/50 transition-all"
          >
            <div className="text-sm text-gray-500 mb-1">Refresh Meta / 刷新元游戏数据</div>
            <div className="font-bold text-mtg-gold">Trigger Scrape</div>
          </button>
          <button
            onClick={clearCache}
            disabled={loading}
            className="card text-left hover:border-red-500/50 transition-all"
          >
            <div className="text-sm text-gray-500 mb-1">Clear Cache / 清除缓存</div>
            <div className="font-bold text-red-400">Clear All</div>
          </button>
          <Link
            href="/api/health"
            target="_blank"
            className="card text-left hover:border-blue-500/50 transition-all block"
          >
            <div className="text-sm text-gray-500 mb-1">Health JSON / 健康检查API</div>
            <div className="font-bold text-blue-400">View /api/health →</div>
          </Link>
        </div>

        {actionMsg && (
          <div className="card mb-8 border-mtg-gold/30 bg-mtg-gold/5">
            <p className="text-sm text-gray-300">{actionMsg}</p>
          </div>
        )}

        {/* Health Status */}
        <h2 className="section-title mb-4">
          Data Source Health / 数据源健康状态
        </h2>
        <div className="card mb-8 space-y-3">
          {health?.checks.map((check) => (
            <div key={check.name} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full ${
                    check.status === 'healthy' ? 'bg-green-400' : 'bg-red-400'
                  }`}
                />
                <span className="font-medium">{check.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">
                  {check.status === 'healthy' ? 'Healthy' : 'Down'} 
                  {check.responseTimeMs && ` · ${check.responseTimeMs}ms`}
                </div>
                <div className="text-xs text-gray-600">{check.message}</div>
              </div>
            </div>
          )) || (
            <div className="skeleton-bar h-10 rounded" />
          )}
        </div>

        {/* Cache Stats */}
        <h2 className="section-title mb-4">
          Cache Stats / 缓存统计
        </h2>
        <div className="card mb-8">
          {health?.cache ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-500">Entries / 条目</div>
                <div className="text-2xl font-bold text-gray-100">{health.cache.totalEntries}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Expired / 过期</div>
                <div className="text-2xl font-bold text-red-400">{health.cache.expiredEntries}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Size / 大小</div>
                <div className="text-2xl font-bold text-gray-100">{health.cache.totalSize} KB</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Hit Rate / 命中率</div>
                <div className="text-2xl font-bold text-green-400">{health.cache.hitRate}%</div>
              </div>
            </div>
          ) : (
            <div className="skeleton-bar h-20 rounded" />
          )}
        </div>

        {/* API Endpoints */}
        <h2 className="section-title mb-4">
          API Endpoints / API 端点
        </h2>
        <div className="card space-y-2">
          {[
            { path: '/api/metagame', desc: 'Modern meta snapshot / 摩登元游戏快照' },
            { path: '/api/health', desc: 'System health check / 系统健康检查' },
            { path: '/api/prices?card=XXX', desc: 'Card price history / 卡牌价格历史' },
            { path: '/api/player', desc: 'Player rankings / 牌手排名' },
            { path: '/api/events', desc: 'Upcoming events / 即将开始的赛事' },
            { path: '/api/tournaments', desc: 'Tournament archive / 赛事归档' },
          ].map((ep) => (
            <Link
              key={ep.path}
              href={ep.path}
              target="_blank"
              className="flex items-center justify-between py-2 px-3 rounded hover:bg-gray-800/50 transition-colors"
            >
              <code className="text-sm text-mtg-gold">{ep.path}</code>
              <span className="text-sm text-gray-500">{ep.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
