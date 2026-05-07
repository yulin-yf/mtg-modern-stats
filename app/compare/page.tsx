'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import type { MetaSnapshot, DeckArchetype } from '@/types';

const TIER_BADGES = {
  S: 'bg-red-500/15 text-red-400 border-red-500/25',
  A: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  B: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  C: 'bg-green-500/15 text-green-400 border-green-500/25',
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

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`card ${className}`}>{children}</div>
  );
}

export default function ComparePage() {
  const [data, setData] = useState<MetaSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [left, setLeft] = useState<string>('');
  const [right, setRight] = useState<string>('');

  useEffect(() => {
    fetch('/api/metagame')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const allDecks = useMemo(() => data?.archetypes || [], [data]);

  const leftDeck = allDecks.find((d) => d.name === left);
  const rightDeck = allDecks.find((d) => d.name === right);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="skeleton-bar h-8 w-48 rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card h-96 skeleton-bar" />
          <div className="card h-96 skeleton-bar" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 bg-mtg-void/80 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-mtg-gold">MTG Modern Stats</Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-mtg-gold transition-colors">← 返回首页</Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">Deck Comparison / 套牌对比</h1>
        <p className="text-gray-500 mb-8">选择两套牌进行并排对比，分析 meta share、色系、价格和核心单卡</p>

        {/* Selector Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <DeckSelector label="Deck A" value={left} onChange={setLeft} decks={allDecks} />
          <DeckSelector label="Deck B" value={right} onChange={setRight} decks={allDecks} />
        </div>

        {/* Comparison */}
        {leftDeck && rightDeck && (
          <div className="space-y-6 page-enter">
            {/* Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DeckCardSummary deck={leftDeck} />
              <DeckCardSummary deck={rightDeck} />
            </div>

            {/* Metrics */}
            <Card>
              <h2 className="text-lg font-bold mb-5">Metrics / 指标对比</h2>
              <MetricBar label="Meta Share / 元游戏占比" left={leftDeck.share} right={rightDeck.share} unit="%" leftColor="#ef4444" rightColor="#f97316" />
              {leftDeck.price && rightDeck.price && (
                <MetricBar label="Deck Price / 套牌价格" left={leftDeck.price} right={rightDeck.price} unit="$" leftColor="#c9a84c" rightColor="#60a5fa" />
              )}
              <MetricBar label="Sample Size / 样本数" left={leftDeck.sampleSize} right={rightDeck.sampleSize} unit=" decks" leftColor="#22c55e" rightColor="#8b5cf6" />
            </Card>

            {/* Key Cards Overlap */}
            <Card>
              <h2 className="text-lg font-bold mb-4">Key Cards / 核心单卡对比</h2>
              <KeyCardOverlap left={leftDeck} right={rightDeck} />
            </Card>

            {/* Mana Identity */}
            <Card>
              <h2 className="text-lg font-bold mb-4">Mana Identity / 魔法力色系</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-200">{leftDeck.name}</span>
                    <ManaSymbols colors={leftDeck.colors} />
                  </div>
                  <ColorBar colors={leftDeck.colors} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-200">{rightDeck.name}</span>
                    <ManaSymbols colors={rightDeck.colors} />
                  </div>
                  <ColorBar colors={rightDeck.colors} />
                </div>
              </div>
            </Card>
          </div>
        )}

        {!leftDeck || !rightDeck && (
          <div className="text-center text-gray-500 py-20">
            请选择两套牌进行对比 / Select two decks to compare
          </div>
        )}
      </section>
    </main>
  );
}

function DeckSelector({ label, value, onChange, decks }: { label: string; value: string; onChange: (v: string) => void; decks: DeckArchetype[] }) {
  return (
    <div className="card p-4">
      <label className="block text-sm text-gray-500 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-mtg-gold/50"
      >
        <option value="">选择套牌 / Select deck...</option>
        {decks.map((d) => (
          <option key={d.name} value={d.name}>
            {d.name} {d.nameCN ? `(${d.nameCN})` : ''} — Tier {d.tier}
          </option>
        ))}
      </select>
    </div>
  );
}

function DeckCardSummary({ deck }: { deck: DeckArchetype }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-100 flex items-center">
            {deck.name}
            <ManaSymbols colors={deck.colors} />
          </h3>
          {deck.nameCN && <p className="text-gray-500">{deck.nameCN}</p>}
        </div>
        <span className={`px-2 py-0.5 text-xs font-bold rounded border ${TIER_BADGES[deck.tier]}`}>Tier {deck.tier}</span>
      </div>
      <div className="text-sm text-gray-400">Meta Share: <span className="text-mtg-gold font-medium">{deck.share}%</span> · {deck.sampleSize} decks</div>
      {deck.price && <div className="text-sm text-gray-400 mt-1">Est. Price: <span className="text-gray-200">${deck.price}</span></div>}
      <Link href={`/deck/${encodeURIComponent(deck.name.toLowerCase().replace(/\s+/g, '-'))}`} className="text-sm text-mtg-gold hover:brightness-110 mt-3 inline-block">查看详情 →</Link>
    </div>
  );
}

function MetricBar({ label, left, right, unit, leftColor, rightColor }: { label: string; left: number; right: number; unit: string; leftColor: string; rightColor: string }) {
  const max = Math.max(left, right) * 1.2;
  const leftPct = (left / max) * 100;
  const rightPct = (right / max) * 100;

  return (
    <div className="mb-5 last:mb-0">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>{label}</span>
      </div>
      <div className="space-y-2">
        {/* Left bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-12 text-right">A</span>
          <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${leftPct}%`, backgroundColor: leftColor }} />
          </div>
          <span className="text-sm text-gray-200 w-20 text-right font-mono">{left}{unit}</span>
        </div>
        {/* Right bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-12 text-right">B</span>
          <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${rightPct}%`, backgroundColor: rightColor }} />
          </div>
          <span className="text-sm text-gray-200 w-20 text-right font-mono">{right}{unit}</span>
        </div>
      </div>
    </div>
  );
}

function KeyCardOverlap({ left, right }: { left: DeckArchetype; right: DeckArchetype }) {
  const leftCards = new Set(left.keyCards || []);
  const rightCards = new Set(right.keyCards || []);
  const shared = left.keyCards?.filter((c) => rightCards.has(c)) || [];
  const onlyLeft = left.keyCards?.filter((c) => !rightCards.has(c)) || [];
  const onlyRight = right.keyCards?.filter((c) => !leftCards.has(c)) || [];

  return (
    <div className="space-y-4">
      {shared.length > 0 && (
        <div>
          <div className="text-sm text-gray-500 mb-2">Shared Cards / 共有单卡 ({shared.length})</div>
          <div className="flex flex-wrap gap-2">
            {shared.map((c) => (
              <span key={c} className="px-3 py-1.5 bg-mtg-gold/10 text-mtg-gold rounded border border-mtg-gold/30 text-sm">{c}</span>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-500 mb-2">Only in {left.name} / 独有 ({onlyLeft.length})</div>
          <div className="flex flex-wrap gap-2">
            {onlyLeft.map((c) => (
              <span key={c} className="px-3 py-1.5 bg-gray-800 text-gray-400 rounded border border-gray-700 text-sm">{c}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-2">Only in {right.name} / 独有 ({onlyRight.length})</div>
          <div className="flex flex-wrap gap-2">
            {onlyRight.map((c) => (
              <span key={c} className="px-3 py-1.5 bg-gray-800 text-gray-400 rounded border border-gray-700 text-sm">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorBar({ colors }: { colors?: string[] }) {
  const colorMap: Record<string, string> = {
    W: 'linear-gradient(145deg, #FFF8E7, #E8DCC8)',
    U: 'linear-gradient(145deg, #4FC3F7, #0288D1)',
    B: 'linear-gradient(145deg, #9C27B0, #4A148C)',
    R: 'linear-gradient(145deg, #FF7043, #C62828)',
    G: 'linear-gradient(145deg, #66BB6A, #1B5E20)',
  };
  if (!colors || colors.length === 0) {
    return <span className="text-sm text-gray-600">Colorless / 无色</span>;
  }
  return (
    <div className="flex gap-2">
      {colors.map((c) => (
        <div key={c} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow" style={{ background: colorMap[c] }}>
          {c}
        </div>
      ))}
    </div>
  );
}
