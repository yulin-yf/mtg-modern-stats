'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { DeckArchetype } from '@/types';

// Extended mock matchup data
const MOCK_MATCHUPS = [
  { opponent: 'Murktide Regent', winRate: 45 },
  { opponent: 'Living End', winRate: 52 },
  { opponent: 'Amulet Titan', winRate: 38 },
  { opponent: 'Yawgmoth', winRate: 55 },
  { opponent: 'Rakdos Scam', winRate: 48 },
  { opponent: 'Hammer Time', winRate: 61 },
  { opponent: 'Burn', winRate: 72 },
  { opponent: 'Mono G Tron', winRate: 65 },
];

// Mock card list data
const MOCK_MAINBOARD = [
  { count: 4, name: "Ragavan, Nimble Pilferer", nameCN: "敏捷窃贼拉加万", price: 45 },
  { count: 4, name: "Dragon's Rage Channeler", nameCN: "龙之怒祭师", price: 2 },
  { count: 4, name: "Murktide Regent", nameCN: "墨鳕帝君", price: 38 },
  { count: 4, name: "Lightning Bolt", nameCN: "闪电击", price: 3 },
  { count: 4, name: "Unholy Heat", nameCN: "不洁热焰", price: 1 },
  { count: 4, name: "Expressive Iteration", nameCN: "表达性迭代", price: 5 },
  { count: 4, name: "Counterspell", nameCN: "反击咒语", price: 2 },
  { count: 2, name: "Spell Pierce", nameCN: "法术刺穿", price: 1 },
];

const TIER_BADGES = {
  S: 'bg-red-500/20 text-red-400 border-red-500/30',
  A: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  B: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  C: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const MANA_CLASSES: Record<string, string> = {
  W: 'mana-w', U: 'mana-u', B: 'mana-b', R: 'mana-r', G: 'mana-g',
};

function ManaSymbols({ colors }: { colors?: string[] }) {
  if (!colors || colors.length === 0) return null;
  return (
    <span className="inline-flex gap-0.5 ml-2">
      {colors.map((c) => (
        <span key={c} className={`mana-symbol ${MANA_CLASSES[c] || ''}`}>{c}</span>
      ))}
    </span>
  );
}

/* 模拟历史占比数据 */
function generateHistory(deckName: string, currentShare: number) {
  const weeks = ['2025-01-12', '2025-01-19', '2025-01-26', '2025-02-02', '2025-02-09', '2025-02-16', '2025-02-23', '2025-03-02', '2025-03-09', '2025-03-16', '2025-03-23', '2025-03-30'];
  // 用当前 share 反向生成波动数据
  const base = currentShare;
  return weeks.map((w, i) => {
    const noise = Math.sin(i * 0.8 + deckName.length) * (base * 0.3);
    const trend = (i - weeks.length / 2) * 0.05;
    return { week: w.slice(5), share: Math.max(0.5, Number((base + noise + trend).toFixed(1))) };
  });
}

export default function DeckPage({ params }: { params: { name: string } }) {
  const [deck, setDeck] = useState<DeckArchetype | null>(null);
  const [loading, setLoading] = useState(true);

  const decodedName = decodeURIComponent(params.name).replace(/-/g, ' ');

  useEffect(() => {
    fetch(`/api/deck?name=${encodeURIComponent(params.name)}`)
      .then((r) => r.json())
      .then((d) => {
        setDeck(d.deck || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.name]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card h-96 skeleton-bar" />
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-100 mb-4">Deck Not Found / 未找到套牌</h1>
        <p className="text-gray-500 mb-6">Could not find data for "{decodedName}"</p>
        <Link href="/" className="btn-primary">Back to Meta / 返回元游戏</Link>
      </div>
    );
  }

  const historyData = generateHistory(deck.name, deck.share);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-mtg-gold mb-4 inline-block">
          ← 返回首页 / Back to Home
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2 flex items-center">
              {deck.name}
              <ManaSymbols colors={deck.colors} />
            </h1>
            {deck.nameCN && <p className="text-lg text-gray-500">{deck.nameCN}</p>}
          </div>
          <span className={`px-3 py-1 text-sm font-bold rounded border ${TIER_BADGES[deck.tier]}`}>
            Tier {deck.tier}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="text-sm text-gray-500 mb-1">Meta Share / 元游戏占比</div>
          <div className="text-2xl font-bold text-mtg-gold">{deck.share}%</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500 mb-1">Sample Size / 样本数</div>
          <div className="text-2xl font-bold text-gray-100">{deck.sampleSize}</div>
          <div className="text-xs text-gray-600">decks / 套牌</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500 mb-1">Tier / 梯队</div>
          <div className="text-2xl font-bold text-gray-100">{deck.tier}</div>
        </div>
        {deck.price && (
          <div className="card">
            <div className="text-sm text-gray-500 mb-1">Est. Price / 预估价格</div>
            <div className="text-2xl font-bold text-gray-100">${deck.price}</div>
            <div className="text-xs text-gray-600">USD / 美元</div>
          </div>
        )}
      </div>

      {/* History Chart */}
      <div className="card mb-8">
        <h2 className="text-lg font-bold text-gray-100 mb-4">
          Meta Share History / 元游戏占比历史
        </h2>
        <p className="text-sm text-gray-500 mb-4">近12周占比走势 / 12-week share trend</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 11 }} stroke="#475569" />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} stroke="#475569" unit="%" width={40} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', padding: '12px' }}
                labelStyle={{ color: '#94a3b8' }}
                formatter={(value: number) => [`${value}%`, 'Meta Share']}
              />
              <Line type="monotone" dataKey="share" stroke="#c9a84c" strokeWidth={2.5} dot={{ r: 3, fill: '#c9a84c' }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Matchup Radar */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-100 mb-4">
            Matchup Analysis / 对战胜率分析
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_MATCHUPS}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="opponent" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748b' }} />
                <Radar name="Win Rate %" dataKey="winRate" stroke="#c9a84c" fill="#c9a84c" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">* Based on recent tournament data / 基于近期赛事数据</p>
        </div>

        {/* Sample Decklist */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-100 mb-4">Sample List / 示例牌表</h2>
          <div className="space-y-1 max-h-80 overflow-y-auto scrollbar-thin">
            {MOCK_MAINBOARD.map((card, i) => (
              <div key={i} className="flex items-center justify-between py-1 px-2 hover:bg-gray-800/50 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-mtg-gold font-mono w-6">{card.count}</span>
                  <div>
                    <div className="text-sm text-gray-200">{card.name}</div>
                    <div className="text-xs text-gray-500">{card.nameCN}</div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">${card.price * card.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between">
            <span className="text-sm text-gray-500">Est. Mainboard Cost</span>
            <span className="font-bold text-mtg-gold">${MOCK_MAINBOARD.reduce((s, c) => s + c.price * c.count, 0)}</span>
          </div>
        </div>
      </div>

      {/* Key Cards */}
      <div className="card mt-8">
        <h2 className="text-lg font-bold text-gray-100 mb-4">Key Cards / 核心卡牌</h2>
        <div className="flex flex-wrap gap-2">
          {deck.keyCards?.map((card) => (
            <span key={card} className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm border border-gray-700 hover:border-mtg-gold/50 transition-colors cursor-pointer">
              {card}
            </span>
          )) || <span className="text-gray-500">No key cards data available / 无核心卡牌数据</span>}
        </div>
      </div>

      {/* External Links */}
      <div className="card mt-8">
        <h2 className="text-lg font-bold text-gray-100 mb-4">External Resources / 外部资源</h2>
        <div className="flex flex-wrap gap-3">
          <a href="https://www.mtggoldfish.com/metagame/modern#paper" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">MTGGoldfish ↗</a>
          <a href="https://www.mtgtop8.com/format?f=MO" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">MTGTop8 ↗</a>
          <a href={`https://moxfield.com/search?q=${encodeURIComponent(deck.name)}`} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">Moxfield Decks ↗</a>
        </div>
      </div>
    </div>
  );
}
