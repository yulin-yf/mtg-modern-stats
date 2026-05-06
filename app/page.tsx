import Header from '@/components/Header';
import MetaChart from '@/components/MetaChart';
import DeckList from '@/components/DeckList';
import PlayerRankings from '@/components/PlayerRankings';
import EventCalendar from '@/components/EventCalendar';
import PriceTracker from '@/components/PriceTracker';
import TrendAnalysis from '@/components/TrendAnalysis';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">Modern Format</span>
            <br />
            <span className="text-gray-300 text-2xl sm:text-3xl">万智牌摩登赛制数据中枢</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            聚合 MTGTop8、MTGGoldfish、MTG Elo Project 等多站数据，
            提供套牌分析、牌手排名、赛事日历与牌价追踪
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="bg-mtg-card px-3 py-1 rounded-full">Meta Share / 元游戏占比</span>
            <span className="bg-mtg-card px-3 py-1 rounded-full">Matchup Matrix / 对战胜率</span>
            <span className="bg-mtg-card px-3 py-1 rounded-full">Elo Rankings / Elo排名</span>
            <span className="bg-mtg-card px-3 py-1 rounded-full">Card Prices / 牌价追踪</span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
        {/* Meta Share Chart */}
        <div id="meta">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-mtg-gold">◆</span> Meta Share / 元游戏占比
          </h2>
          <MetaChart />
        </div>

        {/* Trend Analysis */}
        <div id="trends">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-mtg-gold">◆</span> Trends / 趋势分析
          </h2>
          <TrendAnalysis />
        </div>

        {/* Top Decks */}
        <div id="decks">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-mtg-gold">◆</span> Top Decks / 热门套牌
          </h2>
          <DeckList />
        </div>

        {/* Player Rankings */}
        <div id="players">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-mtg-gold">◆</span> Player Rankings / 牌手排名
          </h2>
          <PlayerRankings />
        </div>

        {/* Price Tracker */}
        <div id="prices">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-mtg-gold">◆</span> Card Prices / 牌价追踪
          </h2>
          <PriceTracker />
        </div>

        {/* Event Calendar */}
        <div id="events">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-mtg-gold">◆</span> Event Calendar / 赛事日历
          </h2>
          <EventCalendar />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>Data sources: MTGTop8 · MTGGoldfish · MTG Elo Project · MTGStocks</p>
        <p className="mt-2">Not affiliated with Wizards of the Coast / 与威世智无关联</p>
      </footer>
    </main>
  );
}
