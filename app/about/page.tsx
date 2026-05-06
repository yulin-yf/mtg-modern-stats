import Link from 'next/link';

export const metadata = {
  title: 'About - MTG Modern Stats',
  description: 'About this project and data sources',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-mtg-gold mb-4 inline-block">
          ← 返回首页 / Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          About / 关于
        </h1>
      </div>

      <div className="space-y-8">
        <section className="card">
          <h2 className="text-xl font-bold text-gray-100 mb-4">
            Project Overview / 项目概述
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            MTG Modern Stats is a personal statistics dashboard for Magic: The Gathering Modern format.
            It aggregates data from multiple sources to provide comprehensive meta analysis,
            player rankings, card price tracking, and event calendar.
          </p>
          <p className="text-gray-400 leading-relaxed">
            万智牌摩登数据站是一个个人使用的综合统计看板，聚合多个数据源，
            提供元游戏分析、牌手排名、牌价追踪和赛事日历。
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-100 mb-4">
            Data Sources / 数据来源
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-mtg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-mtg-gold font-bold">MT</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-200">MTGTop8</h3>
                <p className="text-sm text-gray-500">
                  Meta share and tournament results / 元游戏占比与赛事结果
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold">GF</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-200">MTGGoldfish</h3>
                <p className="text-sm text-gray-500">
                  Card prices and deck costs / 卡牌价格与套牌成本
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 font-bold">EL</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-200">MTG Elo Project</h3>
                <p className="text-sm text-gray-500">
                  Player rankings and Elo ratings / 牌手排名与 Elo 评分
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold">ST</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-200">MTGStocks</h3>
                <p className="text-sm text-gray-500">
                  Card price history and trends / 卡牌价格历史与趋势
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-100 mb-4">
            Tech Stack / 技术栈
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-mtg-gold font-bold mb-1">Next.js 14</div>
              <div className="text-gray-500">Framework</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-mtg-gold font-bold mb-1">Tailwind CSS</div>
              <div className="text-gray-500">Styling</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-mtg-gold font-bold mb-1">Recharts</div>
              <div className="text-gray-500">Visualization</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-mtg-gold font-bold mb-1">Vercel</div>
              <div className="text-gray-500">Hosting</div>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-100 mb-4">
            Update Schedule / 更新频率
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Meta data / 元游戏数据</span>
              <span className="text-mtg-gold">Every 6 hours / 每6小时</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Player rankings / 牌手排名</span>
              <span className="text-mtg-gold">Every 12 hours / 每12小时</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Card prices / 牌价</span>
              <span className="text-mtg-gold">Real-time / 实时</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Events / 赛事</span>
              <span className="text-mtg-gold">Daily / 每日</span>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-100 mb-4">
            Disclaimer / 免责声明
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            This is a personal project not affiliated with Wizards of the Coast.
            Data accuracy depends on third-party sources. Card prices are for reference only.
            <br /><br />
            这是一个个人项目，与威世智公司无关联。数据准确性取决于第三方来源，牌价仅供参考。
          </p>
        </section>
      </div>
    </div>
  );
}
