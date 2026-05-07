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
      <section className="hero-bg relative py-20 px-4 sm:px-6 lg:px-8">
        {/* 流动光晕装饰 */}
        <div className="mana-orb w-96 h-96 bg-mana-u top-[-10%] left-[-10%]" style={{ animationDelay: '0s' }} />
        <div className="mana-orb w-80 h-80 bg-mana-r bottom-[-10%] right-[-5%]" style={{ animationDelay: '3s' }} />
        <div className="mana-orb w-64 h-64 bg-mtg-gold top-[40%] left-[60%]" style={{ animationDelay: '5s' }} />

        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-3">
            <span className="text-sm tracking-[0.3em] text-mtg-gold/70 uppercase font-medium">
              Modern Format Analytics
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">摩登赛制数据中枢</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            聚合 MTGTop8、MTGGoldfish、MTG Elo Project 等多站数据，
            提供套牌分析、牌手排名、赛事日历与牌价追踪
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {['Meta Share / 元游戏占比', 'Matchup Matrix / 对战胜率', 'Elo Rankings / Elo排名', 'Card Prices / 牌价追踪'].map((tag) => (
              <span key={tag} className="bg-mtg-card/80 backdrop-blur border border-gray-700/50 px-4 py-2 rounded-full text-gray-400 hover:border-mtg-gold/40 hover:text-gray-300 transition-all">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
        {/* Meta Share Chart */}
        <div id="meta" className="section-reveal" style={{ animationDelay: '0.1s' }}>
          <h2 className="section-title">
            Meta Share <span className="text-gray-500 text-base font-normal">/ 元游戏占比</span>
          </h2>
          <MetaChart />
        </div>

        {/* Trend Analysis */}
        <div id="trends" className="section-reveal" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-title">
            Trends <span className="text-gray-500 text-base font-normal">/ 趋势分析</span>
          </h2>
          <TrendAnalysis />
        </div>

        {/* Top Decks */}
        <div id="decks" className="section-reveal" style={{ animationDelay: '0.3s' }}>
          <h2 className="section-title">
            Top Decks <span className="text-gray-500 text-base font-normal">/ 热门套牌</span>
          </h2>
          <DeckList />
        </div>

        {/* Player Rankings */}
        <div id="players" className="section-reveal" style={{ animationDelay: '0.4s' }}>
          <h2 className="section-title">
            Player Rankings <span className="text-gray-500 text-base font-normal">/ 牌手排名</span>
          </h2>
          <PlayerRankings />
        </div>

        {/* Price Tracker */}
        <div id="prices" className="section-reveal" style={{ animationDelay: '0.5s' }}>
          <h2 className="section-title">
            Card Prices <span className="text-gray-500 text-base font-normal">/ 牌价追踪</span>
          </h2>
          <PriceTracker />
        </div>

        {/* Event Calendar */}
        <div id="events" className="section-reveal" style={{ animationDelay: '0.6s' }}>
          <h2 className="section-title">
            Event Calendar <span className="text-gray-500 text-base font-normal">/ 赛事日历</span>
          </h2>
          <EventCalendar />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/60 py-10 text-center">
        <p className="text-gray-500 text-sm">Data sources: MTGTop8 · MTGGoldfish · MTG Elo Project · MTGStocks</p>
        <p className="mt-2 text-gray-600 text-xs">Not affiliated with Wizards of the Coast / 与威世智无关联</p>
      </footer>
    </main>
  );
}