'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { DeckGuide, MatchupAdvice } from '@/lib/deck-guides';
import { getDeckGuide } from '@/lib/deck-guides';

const DIFFICULTY_COLORS = {
  favorable: 'bg-green-500/15 text-green-400 border-green-500/25',
  even: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  unfavorable: 'bg-red-500/15 text-red-400 border-red-500/25',
};

const DIFFICULTY_LABELS = {
  favorable: 'Favorable / 有利',
  even: 'Even / 均势',
  unfavorable: 'Unfavorable / 不利',
};

export default function DeckGuidePage({ params }: { params: { name: string } }) {
  const [guide, setGuide] = useState<DeckGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeMatchup, setActiveMatchup] = useState<MatchupAdvice | null>(null);

  const decodedName = decodeURIComponent(params.name).replace(/-/g, ' ');

  useEffect(() => {
    // Try exact match first, then case-insensitive
    let g = getDeckGuide(decodedName);
    if (!g) {
      // Try title case: "dimir frog" -> "Dimir Frog"
      const titleCase = decodedName.replace(/\b\w/g, (c) => c.toUpperCase());
      g = getDeckGuide(titleCase);
    }
    setGuide(g);
    if (g?.matchups[0]) setActiveMatchup(g.matchups[0]);
    setLoading(false);
  }, [decodedName]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card h-96 skeleton-bar" />
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-100 mb-4">Guide Not Available / 暂无攻略</h1>
        <p className="text-gray-500 mb-6">No detailed guide for "{decodedName}" yet.</p>
        <Link href={`/deck/${encodeURIComponent(decodedName.toLowerCase().replace(/\s+/g, '-'))}`} className="btn-primary">
          View Deck Page / 查看套牌页
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <Link href={`/deck/${encodeURIComponent(decodedName.toLowerCase().replace(/\s+/g, '-'))}`} className="text-sm text-gray-500 hover:text-mtg-gold mb-4 inline-block">
        ← 返回套牌详情 / Back to Deck
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          {guide.deckName} Guide
        </h1>
        <p className="text-lg text-gray-500">{guide.deckNameCN} 攻略与对局分析</p>
      </div>

      {/* Overview */}
      <div className="card mb-8">
        <h2 className="section-title mb-4">Overview / 概述</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{guide.overview}</p>
        <p className="text-gray-400 leading-relaxed text-sm">{guide.overviewCN}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Game Plan */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-100 mb-4">Game Plan / 游戏计划</h2>
          <ol className="space-y-2 list-decimal list-inside text-sm">
            {guide.gamePlan.map((step, i) => (
              <li key={i} className="text-gray-300">
                {step}
                <span className="block text-gray-500 text-xs mt-0.5">{guide.gamePlanCN[i]}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Key Cards */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-100 mb-4">Key Cards / 核心单卡</h2>
          <div className="space-y-3">
            {guide.keyCards.map((card) => (
              <div key={card.name} className="border-l-2 border-mtg-gold pl-3">
                <div className="font-medium text-gray-200">{card.name}</div>
                <div className="text-xs text-gray-500">{card.roleCN}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sideboard Strategy */}
      <div className="card mb-8">
        <h2 className="section-title mb-4">Sideboard Strategy / 备牌策略</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{guide.sideboardStrategy}</p>
        <p className="text-gray-400 leading-relaxed text-sm">{guide.sideboardStrategyCN}</p>
      </div>

      {/* Matchup Analysis */}
      <div className="card mb-8">
        <h2 className="section-title mb-4">Matchup Analysis / 对局分析</h2>

        {/* Matchup Selector */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-2 px-2 mb-6 scrollbar-thin">
          {guide.matchups.map((m) => (
            <button
              key={m.opponent}
              onClick={() => setActiveMatchup(m)}
              className={`px-3 py-2 text-sm rounded-lg border whitespace-nowrap transition-all flex-shrink-0 ${
                activeMatchup?.opponent === m.opponent
                  ? DIFFICULTY_COLORS[m.difficulty]
                  : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-gray-200'
              }`}
            >
              {m.opponentCN || m.opponent}
            </button>
          ))}
        </div>

        {activeMatchup && (
          <div className="page-enter">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold text-gray-100">{activeMatchup.opponentCN || activeMatchup.opponent}</h3>
              <span className={`px-2 py-0.5 text-xs font-bold rounded border ${DIFFICULTY_COLORS[activeMatchup.difficulty]}`}>
                {DIFFICULTY_LABELS[activeMatchup.difficulty]}
              </span>
            </div>

            <p className="text-gray-300 mb-4">{activeMatchup.summary}</p>
            <p className="text-gray-400 text-sm mb-6">{activeMatchup.summaryCN}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <div className="text-sm font-medium text-green-400 mb-2">IN / 换入</div>
                {activeMatchup.ins.map((card) => (
                  <div key={card} className="text-sm text-gray-300 bg-green-500/5 px-3 py-1.5 rounded border border-green-500/10">+ {card}</div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-red-400 mb-2">OUT / 换出</div>
                {activeMatchup.outs.map((card) => (
                  <div key={card} className="text-sm text-gray-300 bg-red-500/5 px-3 py-1.5 rounded border border-red-500/10">- {card}</div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50">
              <div className="text-sm font-medium text-mtg-gold mb-1">Key Cards / 关键单卡</div>
              <div className="flex flex-wrap gap-2">
                {activeMatchup.keyCards.map((c) => (
                  <span key={c} className="text-sm text-gray-300">{c}</span>
                ))}
              </div>
            </div>

            <div className="mt-4 bg-mtg-gold/5 rounded-lg p-4 border border-mtg-gold/20">
              <div className="text-sm font-medium text-mtg-gold mb-1">Mulligan Tips / 调度建议</div>
              <p className="text-sm text-gray-300">{activeMatchup.mulliganTips}</p>
              <p className="text-xs text-gray-500 mt-1">{activeMatchup.mulliganTipsCN}</p>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="card mb-8">
        <h2 className="text-lg font-bold text-gray-100 mb-4">Tips & Tricks / 技巧与窍门</h2>
        <ul className="space-y-3">
          {guide.tips.map((tip, i) => (
            <li key={i} className="text-sm text-gray-300 border-l-2 border-gray-700 pl-3">
              {tip}
              <span className="block text-gray-500 text-xs mt-0.5">{guide.tipsCN[i]}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sources */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-100 mb-4">Sources / 参考来源</h2>
        <div className="space-y-2">
          {guide.sources.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-mtg-gold hover:brightness-110"
            >
              {s.title}
              {s.author && <span className="text-gray-500"> — {s.author}</span>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
