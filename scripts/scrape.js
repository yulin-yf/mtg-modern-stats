const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../public/data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          ...options.headers,
        },
      });
      if (res.ok) return res;
      if (res.status === 429) {
        await sleep(2000 * (i + 1));
        continue;
      }
      throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(1000 * (i + 1));
    }
  }
}

// ===== MTGTop8 =====
async function scrapeMTGTop8() {
  try {
    const url = 'https://www.mtgtop8.com/format?f=MO&meta=69&a=';
    const res = await fetchWithRetry(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const archetypes = [];
    $('.S14 tr').each((i, row) => {
      const cells = $(row).find('td');
      if (cells.length >= 4) {
        const name = $(cells[1]).text().trim();
        const shareText = $(cells[2]).text().trim();
        const share = parseFloat(shareText.replace('%', '')) || 0;
        const sampleText = $(cells[3]).text().trim();
        const sampleSize = parseInt(sampleText) || 0;

        if (name && share > 0) {
          let tier = 'C';
          if (share >= 8) tier = 'S';
          else if (share >= 4) tier = 'A';
          else if (share >= 2) tier = 'B';

          archetypes.push({ name, share, sampleSize, tier, keyCards: [] });
        }
      }
    });

    const totalDecks = archetypes.reduce((s, a) => s + a.sampleSize, 0);
    return {
      date: new Date().toISOString(),
      format: 'Modern',
      totalDecks,
      totalEvents: 0,
      archetypes: archetypes.slice(0, 30),
      trends: [],
    };
  } catch (e) {
    console.error('MTGTop8 failed:', e.message);
    return require('./fallback').meta;
  }
}

// ===== MTG Elo Project =====
async function scrapeElo() {
  try {
    const url = 'http://www.mtgeloproject.net/api/rankings?format=Modern&limit=50';
    const res = await fetchWithRetry(url);
    const data = await res.json();

    const players = (data.players || []).map((p, i) => ({
      id: p.id || p.name?.toLowerCase().replace(/\s+/g, '-'),
      name: p.name,
      elo: Math.round(p.elo || p.rating || 1500),
      eloRank: i + 1,
      winRate: p.win_rate || p.winRate || 0,
      matchesPlayed: p.matches || p.matches_played || 0,
      recentEvents: [],
      archetypes: p.archetypes || [],
    }));

    return { players };
  } catch (e) {
    console.error('Elo failed:', e.message);
    return { players: require('./fallback').players };
  }
}

// ===== Events =====
async function scrapeEvents() {
  // Events are manually curated or from Wizards calendar
  // For now, use fallback with dynamic dates
  const today = new Date();
  const events = [
    {
      id: 'rc-spring-2024',
      name: 'Regional Championship Spring 2024',
      nameCN: '2024春季区域冠军赛',
      date: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      location: 'Multiple Regions',
      format: 'Modern',
      type: 'RC',
      attendance: 200,
    },
    {
      id: 'pt-chicago-2024',
      name: 'Pro Tour Chicago',
      nameCN: '芝加哥职业巡回赛',
      date: new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      location: 'Chicago, USA',
      format: 'Modern',
      type: 'PT',
      attendance: 400,
    },
  ];
  return { events };
}

async function main() {
  console.log('Starting scrape...');

  const meta = await scrapeMTGTop8();
  await sleep(1000);

  const players = await scrapeElo();
  await sleep(1000);

  const events = await scrapeEvents();

  // Write static JSON files
  fs.writeFileSync(path.join(DATA_DIR, 'meta.json'), JSON.stringify(meta, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'players.json'), JSON.stringify(players, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'events.json'), JSON.stringify(events, null, 2));

  console.log('Done. Files written to public/data/');
  console.log(`Meta: ${meta.archetypes.length} archetypes`);
  console.log(`Players: ${players.players.length} players`);
  console.log(`Events: ${events.events.length} events`);
}

main().catch(console.error);
