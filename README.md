# MTG Modern Stats

万智牌摩登赛制综合数据站。聚合 MTGTop8、MTGGoldfish、MTG Elo Project 等多站数据。

## 技术栈

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Recharts** 数据可视化
- **Cheerio** 数据抓取
- **Vercel** 部署

## 功能模块

| 模块 | 数据源 | 更新频率 |
|------|--------|---------|
| Meta Share 元游戏占比 | MTGTop8 | 6小时 |
| 套牌详情与对战胜率 | MTGTop8 + 本地分析 | 实时 |
| 牌手排名 (Elo) | MTG Elo Project | 12小时 |
| 牌价追踪 | MTGGoldfish / MTGStocks | 实时 |
| 赛事日历 | 多站聚合 | 每日 |

## 本地开发

```bash
npm install
npm run dev
```

## 部署到 Vercel

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel --prod
```

或者连接 GitHub 仓库自动部署。

## 环境变量（可选）

如需更激进的数据抓取频率，可在 Vercel Dashboard 设置：

- `CACHE_TTL` - 缓存时间（秒）
- `ENABLE_SCRAPE` - 启用实时抓取（默认用 fallback 数据）

## 数据来源说明

本项目通过以下方式获取数据：
1. **MTGTop8** - HTML 解析（ fragile，站点改版需更新 selector ）
2. **MTG Elo Project** - API 调用
3. **MTGGoldfish** - API + HTML 解析
4. **MTGStocks** - API 调用

当数据源不可用时，会自动回退到合理的 fallback 数据，确保页面始终可访问。

## 许可证

MIT - 个人使用，与 Wizards of the Coast 无关联。
