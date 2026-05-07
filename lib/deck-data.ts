import type { DeckArchetype } from '@/types';

export type ArchetypeType = 'aggro' | 'control' | 'combo' | 'midrange' | 'ramp' | 'tempo' | 'tribal' | 'reanimator' | 'colorless';

interface DeckProfile {
  archetype: ArchetypeType;
  strengths: ArchetypeType[];
  weaknesses: ArchetypeType[];
  mainboard: DecklistEntry[];
  matchupBias: Record<string, number>;
}

interface DecklistEntry {
  count: number;
  name: string;
  nameCN?: string;
  price?: number;
}

const BASE_MATCHUP: Record<ArchetypeType, Record<ArchetypeType, number>> = {
  aggro:     { aggro: 50, control: 55, combo: 40, midrange: 45, ramp: 60, tempo: 48, tribal: 52, reanimator: 55, colorless: 50 },
  control:   { aggro: 45, control: 50, combo: 65, midrange: 55, ramp: 50, tempo: 42, tribal: 60, reanimator: 60, colorless: 55 },
  combo:     { aggro: 60, control: 35, combo: 50, midrange: 55, ramp: 45, tempo: 40, tribal: 58, reanimator: 50, colorless: 52 },
  midrange:  { aggro: 55, control: 45, combo: 45, midrange: 50, ramp: 55, tempo: 52, tribal: 53, reanimator: 55, colorless: 52 },
  ramp:      { aggro: 40, control: 50, combo: 55, midrange: 45, ramp: 50, tempo: 42, tribal: 48, reanimator: 50, colorless: 48 },
  tempo:     { aggro: 52, control: 58, combo: 60, midrange: 48, ramp: 58, tempo: 50, tribal: 55, reanimator: 58, colorless: 55 },
  tribal:    { aggro: 48, control: 40, combo: 42, midrange: 47, ramp: 52, tempo: 45, tribal: 50, reanimator: 48, colorless: 48 },
  reanimator:{ aggro: 45, control: 40, combo: 50, midrange: 45, ramp: 50, tempo: 42, tribal: 52, reanimator: 50, colorless: 50 },
  colorless: { aggro: 50, control: 45, combo: 48, midrange: 48, ramp: 52, tempo: 45, tribal: 52, reanimator: 50, colorless: 50 },
};

export const DECK_PROFILES: Record<string, DeckProfile> = {
  // === Tier S ===
  'Boros Energy': {
    archetype: 'aggro',
    strengths: ['control', 'ramp', 'reanimator'],
    weaknesses: ['midrange', 'tempo'],
    mainboard: [
      { count: 4, name: 'Guide of Souls', nameCN: '灵魂向导', price: 12 },
      { count: 4, name: 'Galvanic Discharge', nameCN: '电镀放电', price: 3 },
      { count: 4, name: 'Voice of Victory', nameCN: '胜利之声', price: 2 },
      { count: 4, name: 'Clarion Conqueror', nameCN: '号角征服者', price: 1 },
      { count: 4, name: 'Lightning Bolt', nameCN: '闪电击', price: 3 },
      { count: 4, name: 'Monastery Swiftspear', nameCN: '修道院疾刺兵', price: 3 },
      { count: 4, name: 'Lava Spike', nameCN: '熔岩 spike', price: 1 },
      { count: 4, name: 'Boros Charm', nameCN: '波洛斯护符', price: 3 },
      { count: 4, name: 'Inspiring Vantage', nameCN: '激励 vantage', price: 8 },
      { count: 4, name: 'Sunbaked Canyon', nameCN: '晒焦峡谷', price: 8 },
      { count: 4, name: 'Sacred Foundry', nameCN: '神圣铸造厂', price: 18 },
      { count: 2, name: 'Mountain', nameCN: '山脉', price: 0 },
      { count: 2, name: 'Plains', nameCN: '平原', price: 0 },
    ],
    matchupBias: { 'Domain Zoo': +3, 'Eldrazi Bloodchief': -5, 'Dimir Frog': -8, 'Amulet Titan': +5, 'Esper Blink': -3 },
  },

  // === Tier A ===
  'Domain Zoo': {
    archetype: 'aggro',
    strengths: ['control', 'combo', 'ramp'],
    weaknesses: ['midrange', 'tempo'],
    mainboard: [
      { count: 4, name: 'Scion of Draco', nameCN: '龙裔后裔', price: 15 },
      { count: 4, name: 'Leyline of the Guildpact', nameCN: '行会契约地脉', price: 8 },
      { count: 4, name: 'Tribal Flames', nameCN: '部落烈焰', price: 1 },
      { count: 4, name: 'Nishoba Brawler', nameCN: '尼索巴 brawler', price: 2 },
      { count: 4, name: 'Territorial Kavu', nameCN: '领地 kavu', price: 1 },
      { count: 4, name: 'Lightning Bolt', nameCN: '闪电击', price: 3 },
      { count: 4, name: 'Wild Nacatl', nameCN: '野生 nacatl', price: 1 },
      { count: 4, name: 'Kavu Predator', nameCN: 'kavu 掠食者', price: 1 },
      { count: 4, name: 'Wooded Foothills', nameCN: '林灌丘陵', price: 22 },
      { count: 4, name: 'Bloodstained Mire', nameCN: '血污泥沼', price: 22 },
      { count: 4, name: 'Windswept Heath', nameCN: '风袭荒野', price: 18 },
      { count: 1, name: 'Overgrown Tomb', nameCN: '蔓生墓园', price: 15 },
      { count: 1, name: 'Steam Vents', nameCN: '蒸气喷发口', price: 15 },
      { count: 1, name: 'Sacred Foundry', nameCN: '神圣铸造厂', price: 18 },
      { count: 1, name: 'Stomping Ground', nameCN: '踩踏 ground', price: 15 },
      { count: 1, name: 'Temple Garden', nameCN: '殿堂花园', price: 15 },
    ],
    matchupBias: { 'Boros Energy': -3, 'Eldrazi Bloodchief': +5, 'Dimir Frog': -5, 'Izzet Prowess': +3, 'Amulet Titan': +5 },
  },

  'Eldrazi Bloodchief': {
    archetype: 'combo',
    strengths: ['midrange', 'control', 'ramp'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: 'Malevolent Rumble', nameCN: '恶意 rumble', price: 3 },
      { count: 4, name: 'Utopia Sprawl', nameCN: '乌托邦蔓延', price: 3 },
      { count: 4, name: 'Sowing Mycospawn', nameCN: '播种菌生体', price: 5 },
      { count: 4, name: 'Broodscale Asp', nameCN: '育鳞蛇', price: 2 },
      { count: 4, name: 'Kozilek\'s Command', nameCN: '寇基雷的命令', price: 8 },
      { count: 4, name: 'Talisman of Impulse', nameCN: '冲动护身符', price: 2 },
      { count: 3, name: 'Emrakul, the Promised End', nameCN: '应许终局埃莫库里', price: 55 },
      { count: 3, name: 'Bloodchief Ascension', nameCN: '血首 ascension', price: 5 },
      { count: 4, name: 'Misty Rainforest', nameCN: '雾雨林', price: 25 },
      { count: 4, name: 'Wooded Foothills', nameCN: '林灌丘陵', price: 22 },
      { count: 4, name: 'Stomping Ground', nameCN: '踩踏 ground', price: 15 },
      { count: 3, name: 'Forest', nameCN: '树林', price: 0 },
      { count: 2, name: 'Cavern of Souls', nameCN: '灵魂洞窟', price: 65 },
      { count: 1, name: 'Boseiju, Who Endures', nameCN: '不灭者 boseiju', price: 30 },
    ],
    matchupBias: { 'Boros Energy': +5, 'Domain Zoo': -5, 'Amulet Titan': +3, 'Izzet Prowess': -8, 'Burn': -10 },
  },

  'Esper Blink': {
    archetype: 'midrange',
    strengths: ['aggro', 'control', 'combo'],
    weaknesses: ['ramp', 'tempo'],
    mainboard: [
      { count: 4, name: 'Overlord of the Balemurk', nameCN: '祸沼霸主', price: 12 },
      { count: 4, name: 'Aether Vial', nameCN: '乙醚瓶', price: 35 },
      { count: 4, name: 'Flickerwisp', nameCN: '闪烁鬼影', price: 2 },
      { count: 4, name: 'Stoneforge Mystic', nameCN: '锻石秘教徒', price: 25 },
      { count: 3, name: 'Solitude', nameCN: '孤寂', price: 35 },
      { count: 3, name: 'Ketramose, the New Dawn', nameCN: '新黎明 ketramose', price: 18 },
      { count: 3, name: 'Ephemerate', nameCN: '瞬息', price: 2 },
      { count: 2, name: 'Skyclave Apparition', nameCN: '天径显现', price: 3 },
      { count: 2, name: 'Relic of Progenitus', nameCN: '祖灵遗物', price: 3 },
      { count: 4, name: 'Marsh Flats', nameCN: '沼地平野', price: 18 },
      { count: 4, name: 'Flooded Strand', nameCN: '溢流三角洲', price: 20 },
      { count: 2, name: 'Godless Shrine', nameCN: '无神祭坛', price: 15 },
      { count: 2, name: 'Hallowed Fountain', nameCN: '神圣喷泉', price: 15 },
      { count: 2, name: 'Watery Grave', nameCN: '水没墓场', price: 15 },
      { count: 2, name: 'Plains', nameCN: '平原', price: 0 },
      { count: 1, name: 'Island', nameCN: '海岛', price: 0 },
      { count: 1, name: 'Swamp', nameCN: '沼泽', price: 0 },
    ],
    matchupBias: { 'Boros Energy': +3, 'Eldrazi Bloodchief': +5, 'Dimir Frog': +3, 'Amulet Titan': -5, 'Burn': -8 },
  },

  'Amulet Titan': {
    archetype: 'ramp',
    strengths: ['midrange', 'control', 'combo'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: 'Primeval Titan', nameCN: '太初泰坦', price: 15 },
      { count: 4, name: 'Amulet of Vigor', nameCN: '活力护符', price: 35 },
      { count: 4, name: 'Spelunking', nameCN: '洞穴探险', price: 3 },
      { count: 4, name: 'Dryad of the Ilysian Grove', nameCN: '伊利西亚林苑树灵', price: 12 },
      { count: 4, name: "Summoner's Pact", nameCN: '召唤师契约', price: 12 },
      { count: 4, name: 'Azusa, Lost but Seeking', nameCN: '迷途求道者梓纱', price: 18 },
      { count: 4, name: 'Explore', nameCN: '探索', price: 1 },
      { count: 3, name: 'Tolaria West', nameCN: '托拉利亚西区', price: 8 },
      { count: 3, name: "Urza's Saga", nameCN: '克撒传', price: 25 },
      { count: 4, name: 'Castle Garenbrig', nameCN: '加伦布里格城堡', price: 4 },
      { count: 4, name: 'Selesnya Sanctuary', nameCN: '瑟雷尼亚圣所', price: 1 },
      { count: 4, name: 'Gruul Turf', nameCN: '古鲁 turf', price: 1 },
      { count: 3, name: 'Boros Garrison', nameCN: '波洛斯驻防地', price: 1 },
      { count: 2, name: 'Cavern of Souls', nameCN: '灵魂洞窟', price: 65 },
      { count: 1, name: 'Boseiju, Who Endures', nameCN: '不灭者 boseiju', price: 30 },
      { count: 1, name: 'Forest', nameCN: '树林', price: 0 },
    ],
    matchupBias: { 'Boros Energy': -5, 'Domain Zoo': -5, 'Eldrazi Bloodchief': -3, 'Dimir Frog': +5, 'Burn': -12 },
  },

  'Dimir Frog': {
    archetype: 'tempo',
    strengths: ['control', 'combo', 'ramp'],
    weaknesses: ['aggro', 'midrange'],
    mainboard: [
      { count: 4, name: 'Psychic Frog', nameCN: '灵能蛙', price: 15 },
      { count: 4, name: 'Kaito, Bane of Nightmares', nameCN: '噩梦之祸凯拓', price: 25 },
      { count: 4, name: 'Counterspell', nameCN: '反击咒语', price: 2 },
      { count: 4, name: 'Fatal Push', nameCN: '致命一推', price: 2 },
      { count: 4, name: 'Thoughtseize', nameCN: '攫取思绪', price: 15 },
      { count: 3, name: 'Abhorrent Oculus', nameCN: '憎恶之眼', price: 8 },
      { count: 3, name: 'Spell Pierce', nameCN: '法术刺穿', price: 1 },
      { count: 3, name: 'Drown in the Loch', nameCN: '溺毙于湖', price: 2 },
      { count: 2, name: 'Cling to Dust', nameCN: ' cling 尘土', price: 1 },
      { count: 4, name: 'Polluted Delta', nameCN: '污染三角洲', price: 25 },
      { count: 4, name: 'Watery Grave', nameCN: '水没墓场', price: 15 },
      { count: 4, name: 'Darkslick Shores', nameCN: '暗 slick 海岸', price: 8 },
      { count: 2, name: 'Underground River', nameCN: '地下河', price: 3 },
      { count: 2, name: 'Island', nameCN: '海岛', price: 0 },
      { count: 2, name: 'Swamp', nameCN: '沼泽', price: 0 },
      { count: 1, name: 'Otawara, Soaring City', nameCN: '凌空城大太刀', price: 28 },
    ],
    matchupBias: { 'Boros Energy': +8, 'Domain Zoo': +5, 'Eldrazi Bloodchief': +5, 'Esper Blink': -3, 'Burn': +5 },
  },

  'Esper Reanimator': {
    archetype: 'reanimator',
    strengths: ['midrange', 'control', 'ramp'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: "Goryo's Vengeance", nameCN: '五龙复仇', price: 12 },
      { count: 4, name: 'Overlord of the Balemurk', nameCN: '祸沼霸主', price: 12 },
      { count: 4, name: 'Thoughtseize', nameCN: '攫取思绪', price: 15 },
      { count: 4, name: 'Persist', nameCN: ' persist', price: 3 },
      { count: 4, name: 'Unburial Rites', nameCN: '掘墓仪式', price: 2 },
      { count: 3, name: 'Priest of Fell Rites', nameCN: ' fell 仪式祭司', price: 1 },
      { count: 3, name: 'Ephemerate', nameCN: '瞬息', price: 2 },
      { count: 2, name: 'Terror of the Peaks', nameCN: '峰顶恐惧', price: 8 },
      { count: 2, name: 'Solitude', nameCN: '孤寂', price: 35 },
      { count: 4, name: 'Marsh Flats', nameCN: '沼地平野', price: 18 },
      { count: 4, name: 'Flooded Strand', nameCN: '溢流三角洲', price: 20 },
      { count: 2, name: 'Godless Shrine', nameCN: '无神祭坛', price: 15 },
      { count: 2, name: 'Hallowed Fountain', nameCN: '神圣喷泉', price: 15 },
      { count: 2, name: 'Watery Grave', nameCN: '水没墓场', price: 15 },
      { count: 1, name: 'Plains', nameCN: '平原', price: 0 },
      { count: 1, name: 'Island', nameCN: '海岛', price: 0 },
      { count: 1, name: 'Swamp', nameCN: '沼泽', price: 0 },
    ],
    matchupBias: { 'Boros Energy': +5, 'Dimir Frog': -3, 'Amulet Titan': +5, 'Eldrazi Tron': +5, 'Burn': -5 },
  },

  // === Tier B ===
  'Orzhov Blink': {
    archetype: 'midrange',
    strengths: ['aggro', 'control', 'combo'],
    weaknesses: ['ramp', 'tempo'],
    mainboard: [
      { count: 4, name: 'Aether Vial', nameCN: '乙醚瓶', price: 35 },
      { count: 4, name: 'Flickerwisp', nameCN: '闪烁鬼影', price: 2 },
      { count: 4, name: 'Overlord of the Balemurk', nameCN: '祸沼霸主', price: 12 },
      { count: 4, name: 'Stoneforge Mystic', nameCN: '锻石秘教徒', price: 25 },
      { count: 3, name: 'Thalia, Guardian of Thraben', nameCN: '瑟班守护者莎莉亚', price: 8 },
      { count: 3, name: 'Solitude', nameCN: '孤寂', price: 35 },
      { count: 2, name: 'Ephemerate', nameCN: '瞬息', price: 2 },
      { count: 2, name: 'Skyclave Apparition', nameCN: '天径显现', price: 3 },
      { count: 4, name: 'Marsh Flats', nameCN: '沼地平野', price: 18 },
      { count: 4, name: 'Godless Shrine', nameCN: '无神祭坛', price: 15 },
      { count: 2, name: 'Silent Clearing', nameCN: '寂静空地', price: 6 },
      { count: 2, name: 'Plains', nameCN: '平原', price: 0 },
      { count: 2, name: 'Swamp', nameCN: '沼泽', price: 0 },
    ],
    matchupBias: { 'Boros Energy': -3, 'Esper Blink': -3, 'Dimir Frog': -3, 'Amulet Titan': +3, 'Burn': -5 },
  },

  'Eldrazi Tron': {
    archetype: 'ramp',
    strengths: ['control', 'midrange', 'combo'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: 'Thought-Knot Seer', nameCN: '拧结 sea 思考者', price: 8 },
      { count: 4, name: 'Reality Smasher', nameCN: '现实粉碎者', price: 8 },
      { count: 4, name: 'Matter Reshaper', nameCN: '物质重塑者', price: 3 },
      { count: 4, name: 'Chalice of the Void', nameCN: '虚空圣杯', price: 25 },
      { count: 4, name: 'Expedition Map', nameCN: '探险地图', price: 8 },
      { count: 4, name: "Urza's Mine", nameCN: '克撒的矿场', price: 3 },
      { count: 4, name: "Urza's Power Plant", nameCN: '克撒的动力厂', price: 3 },
      { count: 4, name: "Urza's Tower", nameCN: '克撒之塔', price: 3 },
      { count: 3, name: 'Karn, the Great Creator', nameCN: '伟大的造物主卡恩', price: 25 },
      { count: 2, name: 'Walking Ballista', nameCN: '行走弩炮', price: 12 },
      { count: 2, name: 'All Is Dust', nameCN: '万物归尘', price: 8 },
      { count: 2, name: 'Wastes', nameCN: '荒原', price: 0 },
      { count: 2, name: 'Cavern of Souls', nameCN: '灵魂洞窟', price: 65 },
    ],
    matchupBias: { 'Boros Energy': -5, 'Domain Zoo': -3, 'Izzet Prowess': -3, 'Amulet Titan': +3, 'Burn': -8 },
  },

  'Izzet Prowess': {
    archetype: 'aggro',
    strengths: ['control', 'combo', 'ramp'],
    weaknesses: ['midrange', 'tempo'],
    mainboard: [
      { count: 4, name: 'Cori Steel-Cutter', nameCN: '寇莉钢刃手', price: 8 },
      { count: 4, name: 'Violent Urge', nameCN: '暴烈冲动', price: 3 },
      { count: 4, name: 'Monastery Swiftspear', nameCN: '修道院疾刺兵', price: 3 },
      { count: 4, name: 'Soul-Scar Mage', nameCN: '伤疤法师', price: 2 },
      { count: 4, name: 'Expressive Iteration', nameCN: '表达性迭代', price: 5 },
      { count: 4, name: 'Lightning Bolt', nameCN: '闪电击', price: 3 },
      { count: 4, name: 'Lava Dart', nameCN: '熔岩飞镖', price: 1 },
      { count: 4, name: 'Manamorphose', nameCN: '变彩 mana', price: 3 },
      { count: 3, name: 'Mutagenic Growth', nameCN: '诱变 growth', price: 1 },
      { count: 4, name: 'Steam Vents', nameCN: '蒸气喷发口', price: 15 },
      { count: 4, name: 'Spirebluff Canal', nameCN: '尖顶断崖渠', price: 12 },
      { count: 2, name: 'Fiery Islet', nameCN: '烈焰小岛', price: 8 },
      { count: 2, name: 'Island', nameCN: '海岛', price: 0 },
      { count: 1, name: 'Mountain', nameCN: '山脉', price: 0 },
    ],
    matchupBias: { 'Boros Energy': +3, 'Dimir Frog': +5, 'Amulet Titan': +8, 'Burn': +5, 'Esper Blink': +3 },
  },

  'Mono Blue Belcher': {
    archetype: 'combo',
    strengths: ['control', 'midrange', 'ramp'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: 'Belcher', nameCN: '贝洽', price: 3 },
      { count: 4, name: 'Tameshi, Reality Architect', nameCN: '现实建筑师 tameshi', price: 2 },
      { count: 4, name: 'Malevolent Rumble', nameCN: '恶意 rumble', price: 3 },
      { count: 4, name: 'Strike It Rich', nameCN: '一夜暴富', price: 2 },
      { count: 4, name: 'Spiral of Life', nameCN: '生命之螺旋', price: 1 },
      { count: 4, name: 'Lotus Bloom', nameCN: '莲花绽放', price: 8 },
      { count: 4, name: 'Mox Tantalite', nameCN: ' tantalite 魔石', price: 3 },
      { count: 4, name: 'Island', nameCN: '海岛', price: 0 },
      { count: 3, name: 'Simian Spirit Guide', nameCN: '灵长 spirit 向导', price: 3 },
      { count: 3, name: 'Suppression Ray', nameCN: '压制射线', price: 1 },
      { count: 3, name: 'Hydroelectric Specimen', nameCN: '水电样本', price: 2 },
      { count: 2, name: 'Boseiju, Who Endures', nameCN: '不灭者 boseiju', price: 30 },
      { count: 1, name: 'Otawara, Soaring City', nameCN: '凌空城大太刀', price: 28 },
    ],
    matchupBias: { 'Boros Energy': -8, 'Dimir Frog': -5, 'Amulet Titan': +5, 'Eldrazi Tron': +5, 'Burn': -10 },
  },

  'Affinity': {
    archetype: 'colorless',
    strengths: ['control', 'combo', 'midrange'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: "Urza's Saga", nameCN: '克撒传', price: 25 },
      { count: 4, name: 'Thought Monitor', nameCN: '思维监视者', price: 8 },
      { count: 4, name: 'Ornithopter', nameCN: '扑翼机', price: 0.5 },
      { count: 4, name: 'Memnite', nameCN: '记忆体', price: 1 },
      { count: 4, name: 'Springleaf Drum', nameCN: '春叶鼓', price: 3 },
      { count: 4, name: 'Patchwork Automaton', nameCN: '拼布自动机', price: 1 },
      { count: 3, name: 'Nettlecyst', nameCN: '荨麻囊肿', price: 4 },
      { count: 3, name: 'Shadowspear', nameCN: '影矛', price: 8 },
      { count: 2, name: 'Pithing Needle', nameCN: '穿穴 needle', price: 3 },
      { count: 4, name: 'Inkmoth Nexus', nameCN: '墨蛾连结点', price: 12 },
      { count: 4, name: 'Darksteel Citadel', nameCN: '玄钢城堡', price: 1 },
      { count: 4, name: 'Treasure Vault', nameCN: '宝库', price: 3 },
      { count: 1, name: 'Karakas', nameCN: '卡拉卡斯', price: 0 },
      { count: 4, name: 'Spire of Industry', nameCN: '工业尖塔', price: 1 },
    ],
    matchupBias: { 'Boros Energy': -3, 'Dimir Frog': -3, 'Amulet Titan': -3, 'Burn': -5, 'Eldrazi Tron': +3 },
  },

  'Eldrazi Ramp': {
    archetype: 'ramp',
    strengths: ['control', 'midrange'],
    weaknesses: ['aggro', 'tempo', 'combo'],
    mainboard: [
      { count: 4, name: 'Kozilek\'s Command', nameCN: '寇基雷的命令', price: 8 },
      { count: 4, name: 'Malevolent Rumble', nameCN: '恶意 rumble', price: 3 },
      { count: 4, name: 'Utopia Sprawl', nameCN: '乌托邦蔓延', price: 3 },
      { count: 3, name: 'Emrakul, the Promised End', nameCN: '应许终局埃莫库里', price: 55 },
      { count: 3, name: 'World Breaker', nameCN: '世界破坏者', price: 8 },
      { count: 3, name: 'Thought-Knot Seer', nameCN: '拧结 sea 思考者', price: 8 },
      { count: 4, name: 'Misty Rainforest', nameCN: '雾雨林', price: 25 },
      { count: 4, name: 'Wooded Foothills', nameCN: '林灌丘陵', price: 22 },
      { count: 3, name: 'Stomping Ground', nameCN: '踩踏 ground', price: 15 },
      { count: 3, name: 'Forest', nameCN: '树林', price: 0 },
      { count: 2, name: 'Cavern of Souls', nameCN: '灵魂洞窟', price: 65 },
      { count: 2, name: 'Boseiju, Who Endures', nameCN: '不灭者 boseiju', price: 30 },
      { count: 1, name: 'Wastes', nameCN: '荒原', price: 0 },
    ],
    matchupBias: { 'Boros Energy': -5, 'Domain Zoo': -3, 'Amulet Titan': +3, 'Burn': -8, 'Dimir Frog': -3 },
  },

  'Ruby Storm': {
    archetype: 'combo',
    strengths: ['control', 'midrange', 'ramp'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: 'Ruby Medallion', nameCN: '红宝石勋章', price: 8 },
      { count: 4, name: 'Bonus Round', nameCN: '奖励回合', price: 3 },
      { count: 4, name: 'Grapeshot', nameCN: '葡萄弹', price: 2 },
      { count: 4, name: 'Rite of Flame', nameCN: '火焰仪式', price: 1 },
      { count: 4, name: 'Desperate Ritual', nameCN: '绝望仪式', price: 2 },
      { count: 4, name: 'Seething Song', nameCN: '沸腾之歌', price: 1 },
      { count: 4, name: 'Manamorphose', nameCN: '变彩 mana', price: 3 },
      { count: 3, name: 'Past in Flames', nameCN: '火焰中的过去', price: 5 },
      { count: 3, name: 'Empty the Warrens', nameCN: '清空 warrens', price: 1 },
      { count: 4, name: 'Mountain', nameCN: '山脉', price: 0 },
      { count: 2, name: 'Shatterskull Smashing', nameCN: '碎颅碾压', price: 12 },
      { count: 2, name: 'Den of the Bugbear', nameCN: ' bugbear 巢穴', price: 8 },
    ],
    matchupBias: { 'Boros Energy': -5, 'Dimir Frog': -5, 'Amulet Titan': +5, 'Eldrazi Tron': +5, 'Burn': -8 },
  },

  'Living End': {
    archetype: 'combo',
    strengths: ['control', 'midrange', 'ramp'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: 'Living End', nameCN: '活终末', price: 12 },
      { count: 4, name: 'Violent Outburst', nameCN: '暴烈爆发', price: 2 },
      { count: 4, name: 'Shardless Agent', nameCN: '无分代理', price: 1 },
      { count: 4, name: 'Architects of Will', nameCN: '意志建筑师', price: 0.5 },
      { count: 4, name: 'Street Wraith', nameCN: '街道怨灵', price: 1 },
      { count: 4, name: 'Curator of Mysteries', nameCN: '奥秘馆长', price: 2 },
      { count: 3, name: 'Waker of Waves', nameCN: '唤浪者', price: 0.3 },
      { count: 3, name: 'Striped Riverwinder', nameCN: '斑纹河卷者', price: 0.3 },
      { count: 4, name: 'Force of Negation', nameCN: '否定之力', price: 35 },
      { count: 3, name: 'Subtlety', nameCN: '微妙', price: 18 },
      { count: 4, name: 'Misty Rainforest', nameCN: '雾雨林', price: 25 },
      { count: 4, name: 'Scalding Tarn', nameCN: '灼焦 тарн', price: 25 },
      { count: 2, name: 'Breeding Pool', nameCN: '滋生之池', price: 18 },
      { count: 2, name: 'Steam Vents', nameCN: '蒸气喷发口', price: 15 },
      { count: 1, name: 'Watery Grave', nameCN: '水没墓场', price: 15 },
      { count: 3, name: 'Fable of the Mirror-Breaker', nameCN: '碎镜寓言', price: 12 },
      { count: 1, name: 'Forest', nameCN: '树林', price: 0 },
      { count: 2, name: 'Island', nameCN: '海岛', price: 0 },
    ],
    matchupBias: { 'Boros Energy': -5, 'Amulet Titan': +8, 'Yawgmoth': +3, 'Dimir Frog': +5, 'Burn': -8 },
  },

  // === Tier C ===
  'Jeskai Energy Control': {
    archetype: 'control',
    strengths: ['aggro', 'combo', 'midrange'],
    weaknesses: ['ramp', 'tempo'],
    mainboard: [
      { count: 4, name: 'Galvanic Discharge', nameCN: '电镀放电', price: 3 },
      { count: 4, name: 'Counterspell', nameCN: '反击咒语', price: 2 },
      { count: 4, name: 'Prismatic Ending', nameCN: '棱镜终结', price: 3 },
      { count: 4, name: 'Expressive Iteration', nameCN: '表达性迭代', price: 5 },
      { count: 3, name: 'Teferi, Time Raveler', nameCN: '时间漫游泰菲力', price: 25 },
      { count: 3, name: 'Supreme Verdict', nameCN: '最高裁决', price: 3 },
      { count: 3, name: 'Lightning Bolt', nameCN: '闪电击', price: 3 },
      { count: 2, name: 'Memory Deluge', nameCN: '记忆洪流', price: 2 },
      { count: 2, name: 'Snapcaster Mage', nameCN: '迅咒法师', price: 25 },
      { count: 4, name: 'Flooded Strand', nameCN: '溢流三角洲', price: 20 },
      { count: 4, name: 'Scalding Tarn', nameCN: '灼焦 тарн', price: 25 },
      { count: 3, name: 'Steam Vents', nameCN: '蒸气喷发口', price: 15 },
      { count: 2, name: 'Hallowed Fountain', nameCN: '神圣喷泉', price: 15 },
      { count: 2, name: 'Sacred Foundry', nameCN: '神圣铸造厂', price: 18 },
      { count: 2, name: 'Island', nameCN: '海岛', price: 0 },
      { count: 1, name: 'Plains', nameCN: '平原', price: 0 },
      { count: 1, name: 'Mountain', nameCN: '山脉', price: 0 },
    ],
    matchupBias: { 'Boros Energy': +5, 'Domain Zoo': +5, 'Eldrazi Bloodchief': +3, 'Amulet Titan': -3, 'Burn': +8 },
  },

  'Neoform': {
    archetype: 'combo',
    strengths: ['control', 'midrange', 'ramp'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: 'Neoform', nameCN: '新形变', price: 3 },
      { count: 4, name: 'Allosaurus Rider', nameCN: '异特龙骑手', price: 2 },
      { count: 4, name: 'Ignoble Hierarch', nameCN: '卑劣长老', price: 12 },
      { count: 4, name: 'Elvish Spirit Guide', nameCN: '精灵 spirit 向导', price: 3 },
      { count: 4, name: 'Simian Spirit Guide', nameCN: '灵长 spirit 向导', price: 3 },
      { count: 4, name: "Summoner's Pact", nameCN: '召唤师契约', price: 12 },
      { count: 4, name: 'Manamorphose', nameCN: '变彩 mana', price: 3 },
      { count: 3, name: 'Eldritch Evolution', nameCN: '邪异演化', price: 4 },
      { count: 2, name: 'Griselbrand', nameCN: '格里塞尔brand', price: 15 },
      { count: 4, name: 'Misty Rainforest', nameCN: '雾雨林', price: 25 },
      { count: 4, name: 'Verdant Catacombs', nameCN: '葱郁 catacombs', price: 25 },
      { count: 3, name: 'Stomping Ground', nameCN: '踩踏 ground', price: 15 },
      { count: 3, name: 'Breeding Pool', nameCN: '滋生之池', price: 18 },
      { count: 2, name: 'Forest', nameCN: '树林', price: 0 },
      { count: 1, name: 'Island', nameCN: '海岛', price: 0 },
    ],
    matchupBias: { 'Boros Energy': -8, 'Dimir Frog': -5, 'Amulet Titan': +5, 'Eldrazi Tron': +3, 'Burn': -10 },
  },

  'Grixis Reanimator': {
    archetype: 'reanimator',
    strengths: ['midrange', 'control', 'ramp'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: 'Unburial Rites', nameCN: '掘墓仪式', price: 2 },
      { count: 4, name: 'Persist', nameCN: ' persist', price: 3 },
      { count: 4, name: 'Thoughtseize', nameCN: '攫取思绪', price: 15 },
      { count: 4, name: 'Inquisition of Kozilek', nameCN: '寇基雷的审问', price: 3 },
      { count: 3, name: 'Archon of Cruelty', nameCN: '残酷执政官', price: 8 },
      { count: 3, name: 'Griselbrand', nameCN: '格里塞尔brand', price: 15 },
      { count: 3, name: 'Priest of Fell Rites', nameCN: ' fell 仪式祭司', price: 1 },
      { count: 2, name: 'Ephemerate', nameCN: '瞬息', price: 2 },
      { count: 4, name: 'Polluted Delta', nameCN: '污染三角洲', price: 25 },
      { count: 4, name: 'Bloodstained Mire', nameCN: '血污泥沼', price: 22 },
      { count: 2, name: 'Watery Grave', nameCN: '水没墓场', price: 15 },
      { count: 2, name: 'Blood Crypt', nameCN: '血染殿堂', price: 15 },
      { count: 2, name: 'Steam Vents', nameCN: '蒸气喷发口', price: 15 },
      { count: 1, name: 'Island', nameCN: '海岛', price: 0 },
      { count: 1, name: 'Swamp', nameCN: '沼泽', price: 0 },
      { count: 1, name: 'Mountain', nameCN: '山脉', price: 0 },
    ],
    matchupBias: { 'Boros Energy': +3, 'Dimir Frog': -3, 'Amulet Titan': +5, 'Eldrazi Tron': +3, 'Burn': -5 },
  },

  'Yawgmoth': {
    archetype: 'combo',
    strengths: ['midrange', 'control', 'ramp'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: 'Yawgmoth, Thran Physician', nameCN: '索兰医师约格莫夫', price: 35 },
      { count: 4, name: 'Young Wolf', nameCN: '幼狼', price: 0.5 },
      { count: 4, name: "Geralf's Messenger", nameCN: '杰拉夫的信使', price: 8 },
      { count: 4, name: 'Undying Evil', nameCN: '不灭邪灵', price: 0.5 },
      { count: 4, name: 'Chord of Calling', nameCN: '召集和弦', price: 5 },
      { count: 3, name: 'Eldritch Evolution', nameCN: '邪异演化', price: 4 },
      { count: 3, name: 'Ignoble Hierarch', nameCN: '卑劣长老', price: 12 },
      { count: 4, name: 'Wall of Roots', nameCN: '根墙', price: 0.5 },
      { count: 2, name: 'Blood Artist', nameCN: '血艺术家', price: 2 },
      { count: 2, name: 'Zulaport Cutthroat', nameCN: '祖拉港割喉者', price: 1 },
      { count: 2, name: 'Grist, the Hunger Tide', nameCN: '饥潮葛莉斯', price: 18 },
      { count: 4, name: 'Blooming Marsh', nameCN: '绽放沼泽', price: 3 },
      { count: 4, name: 'Overgrown Tomb', nameCN: '蔓生墓园', price: 15 },
      { count: 4, name: 'Verdant Catacombs', nameCN: '葱郁 catacombs', price: 25 },
      { count: 2, name: 'Nurturing Peatland', nameCN: '滋养泥炭地', price: 8 },
      { count: 2, name: 'Swamp', nameCN: '沼泽', price: 0 },
      { count: 2, name: 'Forest', nameCN: '树林', price: 0 },
    ],
    matchupBias: { 'Boros Energy': -5, 'Domain Zoo': +3, 'Amulet Titan': -5, 'Burn': -10, 'Dimir Frog': +3 },
  },

  'Hammer Time': {
    archetype: 'combo',
    strengths: ['midrange', 'control'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: 'Colossus Hammer', nameCN: '巨人战锤', price: 8 },
      { count: 4, name: 'Puresteel Paladin', nameCN: '纯钢圣骑士', price: 8 },
      { count: 4, name: 'Stoneforge Mystic', nameCN: '锻石秘教徒', price: 25 },
      { count: 4, name: 'Ornithopter', nameCN: '扑翼机', price: 0.5 },
      { count: 4, name: 'Memnite', nameCN: '记忆体', price: 1 },
      { count: 4, name: 'Springleaf Drum', nameCN: '春叶鼓', price: 3 },
      { count: 4, name: "Sigarda's Aid", nameCN: '西嘉达援力', price: 3 },
      { count: 4, name: "Urza's Saga", nameCN: '克撒传', price: 25 },
      { count: 3, name: 'Shadowspear', nameCN: '影矛', price: 8 },
      { count: 2, name: 'Esper Sentinel', nameCN: '艾斯珀哨兵', price: 8 },
      { count: 2, name: 'The Reality Chip', nameCN: '真实碎片', price: 2 },
      { count: 4, name: 'Inkmoth Nexus', nameCN: '墨蛾连结点', price: 12 },
      { count: 4, name: 'Plains', nameCN: '平原', price: 0 },
      { count: 4, name: 'Silent Clearing', nameCN: '寂静空地', price: 6 },
      { count: 3, name: 'Horizon Canopy', nameCN: '地平线天蓬', price: 8 },
      { count: 2, name: 'Flooded Strand', nameCN: '溢流三角洲', price: 20 },
      { count: 2, name: 'Marsh Flats', nameCN: '沼地平野', price: 18 },
    ],
    matchupBias: { 'Boros Energy': -3, 'Domain Zoo': +3, 'Amulet Titan': -3, 'Burn': -5, 'Dimir Frog': +3 },
  },

  'Burn': {
    archetype: 'aggro',
    strengths: ['combo', 'ramp', 'control'],
    weaknesses: ['midrange', 'tempo', 'aggro'],
    mainboard: [
      { count: 4, name: 'Lightning Bolt', nameCN: '闪电击', price: 3 },
      { count: 4, name: 'Lava Spike', nameCN: '熔岩 spike', price: 1 },
      { count: 4, name: 'Rift Bolt', nameCN: '裂隙闪电', price: 1 },
      { count: 4, name: 'Skewer the Critics', nameCN: '串刺批评者', price: 0.5 },
      { count: 4, name: 'Goblin Guide', nameCN: '地精向导', price: 8 },
      { count: 4, name: 'Monastery Swiftspear', nameCN: '修道院疾刺兵', price: 3 },
      { count: 4, name: 'Eidolon of the Great Revel', nameCN: '大启示录的艾德隆', price: 8 },
      { count: 4, name: 'Searing Blaze', nameCN: '灼烧 blaze', price: 1 },
      { count: 4, name: 'Boros Charm', nameCN: '波洛斯护符', price: 3 },
      { count: 2, name: 'Skullcrack', nameCN: '碎颅击', price: 2 },
      { count: 2, name: 'Lightning Helix', nameCN: '闪电螺旋', price: 2 },
      { count: 2, name: 'Rending Volley', nameCN: '撕裂 volley', price: 1 },
      { count: 4, name: 'Inspiring Vantage', nameCN: '激励 vantage', price: 8 },
      { count: 4, name: 'Sunbaked Canyon', nameCN: '晒焦峡谷', price: 8 },
      { count: 4, name: 'Sacred Foundry', nameCN: '神圣铸造厂', price: 18 },
      { count: 2, name: 'Mountain', nameCN: '山脉', price: 0 },
      { count: 2, name: 'Plains', nameCN: '平原', price: 0 },
    ],
    matchupBias: { 'Living End': +10, 'Amulet Titan': +12, 'Eldrazi Ramp': +8, 'Yawgmoth': +10, 'Dimir Frog': -5 },
  },
};

export function getMatchupData(deckName: string, allDecks: DeckArchetype[]) {
  const profile = DECK_PROFILES[deckName];
  if (!profile) return [];

  return allDecks
    .filter((d) => d.name !== deckName)
    .slice(0, 8)
    .map((opponent) => {
      const oppProfile = DECK_PROFILES[opponent.name];
      let base = 50;

      if (oppProfile) {
        base = BASE_MATCHUP[profile.archetype][oppProfile.archetype];
      }

      const bias = profile.matchupBias[opponent.name] || 0;
      const winRate = Math.max(10, Math.min(90, Math.round(base + bias + (Math.random() * 6 - 3))));

      return { opponent: opponent.name, winRate };
    });
}

export function getDecklist(deckName: string): DecklistEntry[] {
  return DECK_PROFILES[deckName]?.mainboard || [];
}

export function getDeckArchetype(deckName: string): ArchetypeType | null {
  return DECK_PROFILES[deckName]?.archetype || null;
}
