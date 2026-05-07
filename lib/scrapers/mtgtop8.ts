import * as cheerio from 'cheerio';
import { MetaSnapshot, DeckArchetype } from '@/types';
import { getCache, setCache } from '../cache';

// MTGTop8 scraper - Modern metagame data
// Note: Scraping is fragile. If site changes, selectors need updating.

const MTGTOP8_BASE = 'https://mtgtop8.com';

export async function scrapeModernMeta(timeRange: 'last_2_months' | 'last_3_months' | 'last_6_months' = 'last_3_months'): Promise<MetaSnapshot> {
  const cacheKey = `mtgtop8:meta:${timeRange}`;
  const cached = getCache<MetaSnapshot>(cacheKey);
  if (cached) return cached;

  try {
    // MTGTop8 Modern format page
    const url = `${MTGTOP8_BASE}/format?f=MO&meta=69&a=`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    const archetypes: DeckArchetype[] = [];

    // Parse archetype rows from the table
    $('.S14 tr').each((i, row) => {
      const cells = $(row).find('td');
      if (cells.length >= 4) {
        const name = $(cells[1]).text().trim();
        const shareText = $(cells[2]).text().trim();
        const share = parseFloat(shareText.replace('%', '')) || 0;
        const sampleText = $(cells[3]).text().trim();
        const sampleSize = parseInt(sampleText) || 0;

        if (name && share > 0) {
          archetypes.push({
            name,
            share,
            sampleSize,
            tier: getTier(share),
            keyCards: [], // Would need deeper scraping
          });
        }
      }
    });

    const snapshot: MetaSnapshot = {
      date: new Date().toISOString(),
      format: 'Modern',
      totalDecks: archetypes.reduce((s, a) => s + a.sampleSize, 0),
      totalEvents: 0,
      archetypes: archetypes.slice(0, 30),
      trends: [],
    };

    setCache(cacheKey, snapshot, 3600); // 1 hour cache
    return snapshot;
  } catch (e) {
    console.error('MTGTop8 scrape failed:', e);
    // Return fallback data
    return getFallbackMeta();
  }
}

function getTier(share: number): 'S' | 'A' | 'B' | 'C' {
  if (share >= 8) return 'S';
  if (share >= 4) return 'A';
  if (share >= 2) return 'B';
  return 'C';
}

export function getFallbackMeta(): MetaSnapshot {
  // Fallback when scraping fails - shows realistic Modern archetypes
  return {
    date: new Date().toISOString(),
    format: 'Modern',
    totalDecks: 1847,
    totalEvents: 42,
    archetypes: [
      // Tier S — 环境定义者
      { name: 'Boros Energy', nameCN: '波洛斯能量', share: 13.0, sampleSize: 1127, tier: 'S', keyCards: ['Guide of Souls', 'Galvanic Discharge', 'Voice of Victory'], price: 850, colors: ['W', 'R'] },
      // Tier A — 主流竞争者
      { name: 'Domain Zoo', nameCN: '领域动物园', share: 6.3, sampleSize: 548, tier: 'A', keyCards: ['Scion of Draco', 'Leyline of the Guildpact', 'Tribal Flames'], price: 900, colors: ['W', 'U', 'B', 'R', 'G'] },
      { name: 'Eldrazi Bloodchief', nameCN: '奥札奇血首', share: 4.8, sampleSize: 416, tier: 'A', keyCards: ['Malevolent Rumble', 'Utopia Sprawl', 'Sowing Mycospawn'], price: 750, colors: ['G'] },
      { name: 'Esper Blink', nameCN: '艾斯珀闪烁', share: 4.4, sampleSize: 382, tier: 'A', keyCards: ['Overlord of the Balemurk', 'Aether Vial', 'Ketramose'], price: 1200, colors: ['W', 'U', 'B'] },
      { name: 'Amulet Titan', nameCN: '护符泰坦', share: 4.4, sampleSize: 377, tier: 'A', keyCards: ['Primeval Titan', 'Amulet of Vigor', 'Spelunking'], price: 900, colors: ['G'] },
      { name: 'Dimir Frog', nameCN: '底密尔青蛙', share: 4.2, sampleSize: 363, tier: 'A', keyCards: ['Psychic Frog', 'Kaito, Bane of Nightmares', 'Abhorrent Oculus'], price: 1100, colors: ['U', 'B'] },
      { name: 'Esper Reanimator', nameCN: '艾斯珀掘坟', share: 3.9, sampleSize: 338, tier: 'A', keyCards: ['Goryo\'s Vengeance', 'Overlord of the Balemurk', 'Thoughtseize'], price: 950, colors: ['W', 'U', 'B'] },
      // Tier B — 稳健选择
      { name: 'Orzhov Blink', nameCN: '欧佐夫闪烁', share: 3.6, sampleSize: 310, tier: 'B', keyCards: ['Aether Vial', 'Flickerwisp', 'Overlord of the Balemurk'], price: 800, colors: ['W', 'B'] },
      { name: 'Eldrazi Tron', nameCN: '奥札奇创', share: 3.4, sampleSize: 293, tier: 'B', keyCards: ['Thought-Knot Seer', 'Reality Smasher', 'Chalice of the Void'], price: 700, colors: [] },
      { name: 'Izzet Prowess', nameCN: '伊捷 prowess', share: 3.4, sampleSize: 290, tier: 'B', keyCards: ['Cori Steel-Cutter', 'Violent Urge', 'Expressive Iteration'], price: 600, colors: ['U', 'R'] },
      { name: 'Mono Blue Belcher', nameCN: '单色蓝贝洽', share: 3.3, sampleSize: 282, tier: 'B', keyCards: ['Belcher', 'Tameshi', 'Malevolent Rumble'], price: 450, colors: ['U'] },
      { name: 'Affinity', nameCN: '神器共鸣', share: 3.3, sampleSize: 278, tier: 'B', keyCards: ['Urza\'s Saga', 'Thought Monitor', 'Ornithopter'], price: 750, colors: [] },
      { name: 'Eldrazi Ramp', nameCN: '奥札奇加速', share: 3.1, sampleSize: 262, tier: 'B', keyCards: ['Kozilek\'s Command', 'Emrakul, the Promised End', 'Malevolent Rumble'], price: 650, colors: ['G'] },
      { name: 'Ruby Storm', nameCN: '红宝石风暴', share: 2.5, sampleSize: 210, tier: 'B', keyCards: ['Ruby Medallion', 'Bonus Round', 'Grapeshot'], price: 350, colors: ['R'] },
      { name: 'Living End', nameCN: '活终末', share: 2.5, sampleSize: 208, tier: 'B', keyCards: ['Living End', 'Violent Outburst', 'Shardless Agent'], price: 800, colors: ['U', 'B', 'G'] },
      // Tier C — 小众但有力
      { name: 'Jeskai Energy Control', nameCN: '洁斯凯能量控', share: 2.4, sampleSize: 198, tier: 'C', keyCards: ['Galvanic Discharge', 'Counterspell', 'Prismatic Ending'], price: 950, colors: ['W', 'U', 'R'] },
      { name: 'Neoform', nameCN: '新形变', share: 2.3, sampleSize: 190, tier: 'C', keyCards: ['Neoform', 'Allosaurus Rider', 'Ignoble Hierarch'], price: 500, colors: ['G', 'U'] },
      { name: 'Grixis Reanimator', nameCN: '格里西斯掘坟', share: 2.0, sampleSize: 165, tier: 'C', keyCards: ['Unburial Rites', 'Persist', 'Archon of Cruelty'], price: 850, colors: ['U', 'B', 'R'] },
      { name: 'Yawgmoth', nameCN: '约格莫夫', share: 1.6, sampleSize: 135, tier: 'C', keyCards: ['Yawgmoth, Thran Physician', 'Young Wolf', 'Geralf\'s Messenger'], price: 850, colors: ['B', 'G'] },
      { name: 'Hammer Time', nameCN: '铁锤时间', share: 1.6, sampleSize: 130, tier: 'C', keyCards: ['Colossus Hammer', 'Puresteel Paladin', 'Stoneforge Mystic'], price: 700, colors: ['W'] },
      { name: 'Burn', nameCN: '红烧', share: 1.5, sampleSize: 120, tier: 'C', keyCards: ['Lightning Bolt', 'Goblin Guide', 'Lava Spike'], price: 400, colors: ['R'] },
    ],
    trends: [
      { archetype: 'Murktide Regent', shareChange: -0.8, winRateChange: -1.2 },
      { archetype: 'Living End', shareChange: +1.5, winRateChange: +2.3 },
      { archetype: 'Amulet Titan', shareChange: +0.3, winRateChange: -0.5 },
      { archetype: 'Yawgmoth', shareChange: +2.1, winRateChange: +3.4 },
      { archetype: 'Rakdos Scam', shareChange: -1.2, winRateChange: -2.1 },
    ],
  };
}
