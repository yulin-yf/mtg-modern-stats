import type { DeckArchetype } from '@/types';

export interface TournamentResult {
  rank: number;
  player: string;
  deck: string;
  deckNameCN?: string;
  record: string; // e.g. "10-1-1"
  archetypeColors?: ('W' | 'U' | 'B' | 'R' | 'G')[];
}

export interface Tournament {
  id: string;
  name: string;
  nameCN?: string;
  type: 'RCQ' | 'PT' | 'GP' | 'Showdown' | 'NRG' | 'Other';
  format: 'Modern' | 'Pioneer' | 'Legacy' | 'Standard';
  date: string;
  location: string;
  attendance: number;
  top8: TournamentResult[];
  winnerDecklist?: string[]; // card names
  description?: string;
}

export const TOURNAMENTS: Tournament[] = [
  // Upcoming / 即将举行
  {
    id: 'pt-milan-2026-06',
    name: 'Pro Tour: Milan',
    nameCN: '职业巡回赛：米兰',
    type: 'PT',
    format: 'Modern',
    date: '2026-06-12',
    location: 'Milan, Italy',
    attendance: 500,
    top8: [],
    description: 'Upcoming Pro Tour in Milan. Format: Modern.',
  },
  {
    id: 'rcq-seattle-2026-05',
    name: 'RCQ Seattle',
    nameCN: '西雅图区域冠军资格赛',
    type: 'RCQ',
    format: 'Modern',
    date: '2026-05-17',
    location: 'Seattle, WA, USA',
    attendance: 180,
    top8: [],
    description: 'Upcoming RCQ. Format: Modern.',
  },
  {
    id: 'nrg-chicago-2026-05',
    name: 'NRG Series Chicago',
    nameCN: 'NRG 芝加哥系列赛',
    type: 'NRG',
    format: 'Modern',
    date: '2026-05-24',
    location: 'Chicago, IL, USA',
    attendance: 160,
    top8: [],
    description: 'Upcoming NRG Series. Format: Modern.',
  },
  {
    id: 'gp-london-2026-06',
    name: 'Grand Prix London',
    nameCN: '伦敦大奖赛',
    type: 'GP',
    format: 'Modern',
    date: '2026-06-21',
    location: 'London, UK',
    attendance: 600,
    top8: [],
    description: 'Upcoming Grand Prix. Format: Modern.',
  },
  {
    id: 'rcq-tokyo-2026-06',
    name: 'RCQ Tokyo',
    nameCN: '东京区域冠军资格赛',
    type: 'RCQ',
    format: 'Modern',
    date: '2026-06-28',
    location: 'Tokyo, Japan',
    attendance: 220,
    top8: [],
    description: 'Upcoming RCQ. Format: Modern.',
  },
  // MTGO 线上赛事
  {
    id: 'mtgo-mo-challenge-2026-05-10',
    name: 'MTGO Modern Challenge',
    nameCN: 'MTGO 摩登挑战赛',
    type: 'Other',
    format: 'Modern',
    date: '2026-05-10',
    location: 'MTGO',
    attendance: 120,
    top8: [],
    description: 'Weekly MTGO Modern Challenge.',
  },
  {
    id: 'mtgo-mo-premier-2026-05-17',
    name: 'MTGO Modern Premier',
    nameCN: 'MTGO 摩登 Premier',
    type: 'Other',
    format: 'Modern',
    date: '2026-05-17',
    location: 'MTGO',
    attendance: 80,
    top8: [],
    description: 'Weekly MTGO Modern Premier event.',
  },
  {
    id: 'mtgo-mo-challenge-2026-05-24',
    name: 'MTGO Modern Challenge',
    nameCN: 'MTGO 摩登挑战赛',
    type: 'Other',
    format: 'Modern',
    date: '2026-05-24',
    location: 'MTGO',
    attendance: 120,
    top8: [],
    description: 'Weekly MTGO Modern Challenge.',
  },
  // MTGA 线上赛事
  {
    id: 'mtga-mo-open-2026-05-09',
    name: 'MTGA Modern Open',
    nameCN: 'MTGA 摩登公开赛',
    type: 'Other',
    format: 'Modern',
    date: '2026-05-09',
    location: 'MTGA',
    attendance: 200,
    top8: [],
    description: 'MTGA Arena Open. Format: Modern.',
  },
  {
    id: 'mtga-mo-qualifier-2026-05-16',
    name: 'MTGA Modern Qualifier',
    nameCN: 'MTGA 摩登资格赛',
    type: 'Other',
    format: 'Modern',
    date: '2026-05-16',
    location: 'MTGA',
    attendance: 150,
    top8: [],
    description: 'MTGA Qualifier event. Format: Modern.',
  },
  {
    id: 'mtga-mo-open-2026-05-23',
    name: 'MTGA Modern Open',
    nameCN: 'MTGA 摩登公开赛',
    type: 'Other',
    format: 'Modern',
    date: '2026-05-23',
    location: 'MTGA',
    attendance: 200,
    top8: [],
    description: 'MTGA Arena Open. Format: Modern.',
  },
  // Past / 已结束
  {
    id: 'rcq-hartford-2026-04',
    name: 'SCG Con Hartford RCQ',
    nameCN: 'SCG 哈特福德区域冠军资格赛',
    type: 'RCQ',
    format: 'Modern',
    date: '2026-04-19',
    location: 'Hartford, CT, USA',
    attendance: 271,
    top8: [
      { rank: 1, player: 'Michael DeBenedetto-Plummer', deck: 'Tameshi Belcher', record: '11-1' },
      { rank: 2, player: 'Francisco Sánchez', deck: 'Azorius Control', record: '10-2-1' },
      { rank: 3, player: 'Mikko Airaksinen', deck: 'Tameshi Belcher', record: '8-3' },
      { rank: 4, player: 'Horiuchi Makoto', deck: 'Esper Blink', record: '8-4' },
      { rank: 5, player: 'Marco Fabrizi', deck: 'Esper Blink', record: '9-1' },
      { rank: 6, player: 'Mason Buonadonna', deck: 'Amulet Titan', record: '8-2' },
      { rank: 7, player: 'Josep Sanfeliu', deck: 'Eldrazi Tron', record: '8-2' },
      { rank: 8, player: 'Eli Kassis', deck: 'Jeskai Control', record: '8-2' },
    ],
    description: 'The biggest RCQ of the season. Tameshi Belcher took the trophy with a 11-1 record.',
  },
  {
    id: 'pt-edge-of-eternities-2026-03',
    name: 'Pro Tour: Edge of Eternities',
    nameCN: '职业巡回赛：永恒边缘',
    type: 'PT',
    format: 'Modern',
    date: '2026-03-15',
    location: 'Barcelona, Spain',
    attendance: 400,
    top8: [
      { rank: 1, player: 'Michael DeBenedetto-Plummer', deck: 'Tameshi Belcher', record: '11-1' },
      { rank: 2, player: 'Francisco Sánchez', deck: 'Azorius Control', record: '10-2-1' },
      { rank: 3, player: 'Mikko Airaksinen', deck: 'Tameshi Belcher', record: '8-3' },
      { rank: 4, player: 'Horiuchi Makoto', deck: 'Esper Blink', record: '8-4' },
      { rank: 5, player: 'Marco Fabrizi', deck: 'Esper Blink', record: '9-1' },
      { rank: 6, player: 'Mason Buonadonna', deck: 'Amulet Titan', record: '8-2' },
      { rank: 7, player: 'Josep Sanfeliu', deck: 'Eldrazi Tron', record: '8-2' },
      { rank: 8, player: 'Eli Kassis', deck: 'Jeskai Control', record: '8-2' },
    ],
    description: 'Seven different archetypes in Top 8. Boros Energy underperformed with a 37-49% win rate CI.',
  },
  {
    id: 'nrg-philadelphia-2026-04',
    name: 'NRG Series Philadelphia',
    nameCN: 'NRG 费城系列赛',
    type: 'NRG',
    format: 'Modern',
    date: '2026-04-05',
    location: 'Philadelphia, PA, USA',
    attendance: 146,
    top8: [
      { rank: 1, player: 'Alex Friedrichsen', deck: 'Izzet Affinity', record: '9-1' },
      { rank: 2, player: 'Andrew Elenbogen', deck: 'Amulet Titan', record: '9-1' },
      { rank: 3, player: 'Huaxing Bai', deck: 'Esper Goryo\'s', record: '8-2' },
      { rank: 4, player: 'Cyprien Tron', deck: 'Tameshi Belcher', record: '8-2' },
      { rank: 5, player: 'Noé Offman', deck: 'Simic Neoform', record: '8-3' },
      { rank: 6, player: 'Mikko Airaksinen', deck: 'Tameshi Belcher', record: '8-3' },
      { rank: 7, player: 'Unknown', deck: 'Domain Zoo', record: '7-3' },
      { rank: 8, player: 'Unknown', deck: 'Boros Energy', record: '7-3' },
    ],
  },
  {
    id: 'showdown-dallas-2026-05',
    name: 'MTG Showdown Dallas',
    nameCN: '达拉斯万智牌 showdown',
    type: 'Showdown',
    format: 'Modern',
    date: '2026-05-02',
    location: 'Dallas, TX, USA',
    attendance: 94,
    top8: [
      { rank: 1, player: 'Unknown', deck: 'Boros Energy', record: '9-1' },
      { rank: 2, player: 'Unknown', deck: 'Domain Zoo', record: '8-2' },
      { rank: 3, player: 'Unknown', deck: 'Esper Blink', record: '8-2' },
      { rank: 4, player: 'Unknown', deck: 'Orzhov Blink', record: '7-3' },
      { rank: 5, player: 'Unknown', deck: 'Eldrazi Tron', record: '7-3' },
      { rank: 6, player: 'Unknown', deck: 'Izzet Prowess', record: '7-3' },
      { rank: 7, player: 'Unknown', deck: 'Amulet Titan', record: '6-4' },
      { rank: 8, player: 'Unknown', deck: 'Dimir Frog', record: '6-4' },
    ],
  },
  {
    id: 'rcq-toronto-2026-03',
    name: 'RCQ Toronto',
    nameCN: '多伦多区域冠军资格赛',
    type: 'RCQ',
    format: 'Modern',
    date: '2026-03-22',
    location: 'Toronto, Canada',
    attendance: 108,
    top8: [
      { rank: 1, player: 'Unknown', deck: 'Eldrazi Bloodchief', record: '9-1' },
      { rank: 2, player: 'Unknown', deck: 'Domain Zoo', record: '8-2' },
      { rank: 3, player: 'Unknown', deck: 'Esper Blink', record: '8-2' },
      { rank: 4, player: 'Unknown', deck: 'Boros Energy', record: '7-3' },
      { rank: 5, player: 'Unknown', deck: 'Amulet Titan', record: '7-3' },
      { rank: 6, player: 'Unknown', deck: 'Dimir Frog', record: '6-4' },
      { rank: 7, player: 'Unknown', deck: 'Izzet Prowess', record: '6-4' },
      { rank: 8, player: 'Unknown', deck: 'Eldrazi Ramp', record: '6-4' },
    ],
  },
  {
    id: 'gp-melbourne-2026-02',
    name: 'Grand Prix Melbourne',
    nameCN: '墨尔本大奖赛',
    type: 'GP',
    format: 'Modern',
    date: '2026-02-28',
    location: 'Melbourne, Australia',
    attendance: 312,
    top8: [
      { rank: 1, player: 'Unknown', deck: 'Jeskai Blink', record: '10-2' },
      { rank: 2, player: 'Unknown', deck: 'Boros Energy', record: '9-2-1' },
      { rank: 3, player: 'Unknown', deck: 'Amulet Titan', record: '9-3' },
      { rank: 4, player: 'Unknown', deck: 'Domain Zoo', record: '8-3-1' },
      { rank: 5, player: 'Unknown', deck: 'Eldrazi Bloodchief', record: '8-4' },
      { rank: 6, player: 'Unknown', deck: 'Dimir Frog', record: '8-4' },
      { rank: 7, player: 'Unknown', deck: 'Orzhov Blink', record: '7-4-1' },
      { rank: 8, player: 'Unknown', deck: 'Yawgmoth', record: '7-5' },
    ],
  },
];

export function getTournaments(filter?: { type?: string; format?: string; location?: string }): Tournament[] {
  let results = [...TOURNAMENTS];
  if (filter?.type) results = results.filter((t) => t.type === filter.type);
  if (filter?.format) results = results.filter((t) => t.format === filter.format);
  if (filter?.location) {
    const loc = filter.location.toLowerCase();
    results = results.filter((t) => t.location.toLowerCase().includes(loc));
  }
  return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getTournament(id: string): Tournament | undefined {
  return TOURNAMENTS.find((t) => t.id === id);
}
