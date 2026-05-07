import type { DeckArchetype } from '@/types';

// 套牌 archetype 分类（用于对战胜率计算）
export type ArchetypeType = 'aggro' | 'control' | 'combo' | 'midrange' | 'ramp' | 'tempo' | 'tribal' | 'reanimator' | 'colorless';

interface DeckProfile {
  archetype: ArchetypeType;
  strengths: ArchetypeType[];   // 擅长的对抗类型
  weaknesses: ArchetypeType[];  // 弱势的对抗类型
  mainboard: DecklistEntry[];
  matchupBias: Record<string, number>; // 特定套牌的偏差调整
}

interface DecklistEntry {
  count: number;
  name: string;
  nameCN?: string;
  price?: number;
}

// Archetype 间基础胜率矩阵（行=我方，列=敌方）
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

// 各套牌的详细档案
export const DECK_PROFILES: Record<string, DeckProfile> = {
  'Murktide Regent': {
    archetype: 'tempo',
    strengths: ['control', 'combo', 'ramp'],
    weaknesses: ['aggro'],
    mainboard: [
      { count: 4, name: "Ragavan, Nimble Pilferer", nameCN: "敏捷窃贼拉加万", price: 45 },
      { count: 4, name: "Dragon's Rage Channeler", nameCN: "龙之怒祭师", price: 2 },
      { count: 4, name: "Murktide Regent", nameCN: "墨鳕帝君", price: 38 },
      { count: 4, name: "Ledger Shredder", nameCN: "碎账 shredder", price: 8 },
      { count: 4, name: "Lightning Bolt", nameCN: "闪电击", price: 3 },
      { count: 4, name: "Unholy Heat", nameCN: "不洁热焰", price: 1 },
      { count: 4, name: "Expressive Iteration", nameCN: "表达性迭代", price: 5 },
      { count: 4, name: "Consider", nameCN: "细想", price: 0.5 },
      { count: 4, name: "Counterspell", nameCN: "反击咒语", price: 2 },
      { count: 3, name: "Spell Pierce", nameCN: "法术刺穿", price: 1 },
      { count: 3, name: "Mishra's Bauble", nameCN: "米斯拉的饰品", price: 3 },
      { count: 2, name: "Otawara, Soaring City", nameCN: "凌空城大太刀", price: 28 },
      { count: 4, name: "Steam Vents", nameCN: "蒸气喷发口", price: 15 },
      { count: 4, name: "Spirebluff Canal", nameCN: "尖顶断崖渠", price: 12 },
      { count: 2, name: "Fiery Islet", nameCN: "烈焰小岛", price: 8 },
      { count: 2, name: "Island", nameCN: "海岛", price: 0 },
      { count: 2, name: "Mountain", nameCN: "山脉", price: 0 },
    ],
    matchupBias: { 'Living End': +5, 'Burn': -8, 'Rakdos Scam': -5, 'Amulet Titan': +8 },
  },
  'Living End': {
    archetype: 'combo',
    strengths: ['control', 'midrange', 'ramp'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: "Living End", nameCN: "活终末", price: 12 },
      { count: 4, name: "Violent Outburst", nameCN: "暴烈爆发", price: 2 },
      { count: 4, name: "Shardless Agent", nameCN: "无分代理", price: 1 },
      { count: 4, name: "Architects of Will", nameCN: "意志建筑师", price: 0.5 },
      { count: 4, name: "Street Wraith", nameCN: "街道怨灵", price: 1 },
      { count: 4, name: "Curator of Mysteries", nameCN: "奥秘馆长", price: 2 },
      { count: 3, name: "Waker of Waves", nameCN: "唤浪者", price: 0.3 },
      { count: 3, name: "Striped Riverwinder", nameCN: "斑纹河卷者", price: 0.3 },
      { count: 4, name: "Force of Negation", nameCN: "否定之力", price: 35 },
      { count: 3, name: "Subtlety", nameCN: "微妙", price: 18 },
      { count: 4, name: "Misty Rainforest", nameCN: "雾雨林", price: 25 },
      { count: 4, name: "Scalding Tarn", nameCN: "灼焦 тарн", price: 25 },
      { count: 2, name: "Breeding Pool", nameCN: "滋生之池", price: 18 },
      { count: 2, name: "Steam Vents", nameCN: "蒸气喷发口", price: 15 },
      { count: 1, name: "Watery Grave", nameCN: "水没墓场", price: 15 },
      { count: 3, name: "Fable of the Mirror-Breaker", nameCN: "碎镜寓言", price: 12 },
      { count: 1, name: "Forest", nameCN: "树林", price: 0 },
      { count: 2, name: "Island", nameCN: "海岛", price: 0 },
    ],
    matchupBias: { 'Murktide Regent': -5, 'Burn': -10, 'Amulet Titan': +8, 'Yawgmoth': +3 },
  },
  'Amulet Titan': {
    archetype: 'ramp',
    strengths: ['midrange', 'control'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: "Primeval Titan", nameCN: "太初泰坦", price: 15 },
      { count: 4, name: "Amulet of Vigor", nameCN: "活力护符", price: 35 },
      { count: 4, name: "Dryad of the Ilysian Grove", nameCN: "伊利西亚林苑树灵", price: 12 },
      { count: 4, name: "Summoning Trap", nameCN: "召唤陷阱", price: 2 },
      { count: 4, name: "Explore", nameCN: "探索", price: 1 },
      { count: 4, name: "Tolaria West", nameCN: "托拉利亚西区", price: 8 },
      { count: 4, name: "Urza's Saga", nameCN: "克撒传", price: 25 },
      { count: 4, name: "Selesnya Sanctuary", nameCN: "瑟雷尼亚圣所", price: 1 },
      { count: 4, name: "Gruul Turf", nameCN: "古鲁 turf", price: 1 },
      { count: 3, name: "Boros Garrison", nameCN: "波洛斯驻防地", price: 1 },
      { count: 3, name: "Azusa, Lost but Seeking", nameCN: "迷途求道者梓纱", price: 18 },
      { count: 4, name: "Castle Garenbrig", nameCN: "加伦布里格城堡", price: 4 },
      { count: 2, name: "Cavern of Souls", nameCN: "灵魂洞窟", price: 65 },
      { count: 2, name: "Simic Growth Chamber", nameCN: "析米克成长室", price: 1 },
      { count: 1, name: "Bojuka Bog", nameCN: "波祖卡沼泽", price: 2 },
      { count: 1, name: "Forest", nameCN: "树林", price: 0 },
    ],
    matchupBias: { 'Murktide Regent': -8, 'Burn': -12, 'Yawgmoth': +5, 'Living End': -8 },
  },
  'Yawgmoth': {
    archetype: 'combo',
    strengths: ['midrange', 'control', 'ramp'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: "Yawgmoth, Thran Physician", nameCN: "索兰医师约格莫夫", price: 35 },
      { count: 4, name: "Young Wolf", nameCN: "幼狼", price: 0.5 },
      { count: 4, name: "Geralf's Messenger", nameCN: "杰拉夫的信使", price: 8 },
      { count: 4, name: "Undying Evil", nameCN: "不灭邪灵", price: 0.5 },
      { count: 4, name: "Chord of Calling", nameCN: "召集和弦", price: 5 },
      { count: 3, name: "Eldritch Evolution", nameCN: "邪异演化", price: 4 },
      { count: 3, name: "Ignoble Hierarch", nameCN: "卑劣长老", price: 12 },
      { count: 4, name: "Wall of Roots", nameCN: "根墙", price: 0.5 },
      { count: 2, name: "Blood Artist", nameCN: "血艺术家", price: 2 },
      { count: 2, name: "Zulaport Cutthroat", nameCN: "祖拉港割喉者", price: 1 },
      { count: 2, name: "Grist, the Hunger Tide", nameCN: "饥潮葛莉斯", price: 18 },
      { count: 4, name: "Blooming Marsh", nameCN: "绽放沼泽", price: 3 },
      { count: 4, name: "Overgrown Tomb", nameCN: "蔓生墓园", price: 15 },
      { count: 4, name: "Verdant Catacombs", nameCN: "葱郁 catacombs", price: 25 },
      { count: 2, name: "Nurturing Peatland", nameCN: "滋养泥炭地", price: 8 },
      { count: 2, name: "Swamp", nameCN: "沼泽", price: 0 },
      { count: 2, name: "Forest", nameCN: "树林", price: 0 },
    ],
    matchupBias: { 'Murktide Regent': -3, 'Amulet Titan': -5, 'Burn': -10, 'Living End': -3 },
  },
  'Rakdos Scam': {
    archetype: 'midrange',
    strengths: ['aggro', 'combo', 'tempo'],
    weaknesses: ['control', 'ramp'],
    mainboard: [
      { count: 4, name: "Grief", nameCN: "悲恸", price: 8 },
      { count: 4, name: "Fury", nameCN: "狂怒", price: 12 },
      { count: 4, name: "Ragavan, Nimble Pilferer", nameCN: "敏捷窃贼拉加万", price: 45 },
      { count: 4, name: "Dauthi Voidwalker", nameCN: "道西虚空行者", price: 12 },
      { count: 4, name: "Blood Moon", nameCN: "血月", price: 15 },
      { count: 3, name: "Thoughtseize", nameCN: "攫取思绪", price: 15 },
      { count: 3, name: "Inquisition of Kozilek", nameCN: "寇基雷的审问", price: 3 },
      { count: 3, name: "Fable of the Mirror-Breaker", nameCN: "碎镜寓言", price: 12 },
      { count: 2, name: "Malakir Rebirth", nameCN: "马拉基尔重生", price: 2 },
      { count: 2, name: "Terminate", nameCN: "终结", price: 1 },
      { count: 2, name: "Kroxa, Titan of Death's Hunger", nameCN: "死亡饥潮克罗刹", price: 20 },
      { count: 4, name: "Blackcleave Cliffs", nameCN: "黑裂悬崖", price: 25 },
      { count: 4, name: "Blood Crypt", nameCN: "血染殿堂", price: 15 },
      { count: 4, name: "Polluted Delta", nameCN: "污染三角洲", price: 25 },
      { count: 2, name: "Mountain", nameCN: "山脉", price: 0 },
      { count: 2, name: "Swamp", nameCN: "沼泽", price: 0 },
      { count: 1, name: "Sokenzan, Crucible of Defiance", nameCN: "反抗熔炉骚肯山", price: 4 },
    ],
    matchupBias: { 'Murktide Regent': +5, 'Amulet Titan': +5, 'Burn': +8, 'Yawgmoth': +3 },
  },
  'Hammer Time': {
    archetype: 'combo',
    strengths: ['midrange', 'control'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: "Colossus Hammer", nameCN: "巨人战锤", price: 8 },
      { count: 4, name: "Puresteel Paladin", nameCN: "纯钢圣骑士", price: 8 },
      { count: 4, name: "Stoneforge Mystic", nameCN: "锻石秘教徒", price: 25 },
      { count: 4, name: "Ornithopter", nameCN: "扑翼机", price: 0.5 },
      { count: 4, name: "Memnite", nameCN: "记忆体", price: 1 },
      { count: 4, name: "Springleaf Drum", nameCN: "春叶鼓", price: 3 },
      { count: 4, name: "Sigarda's Aid", nameCN: "西嘉达援力", price: 3 },
      { count: 4, name: "Urza's Saga", nameCN: "克撒传", price: 25 },
      { count: 3, name: "Shadowspear", nameCN: "影矛", price: 8 },
      { count: 2, name: "Esper Sentinel", nameCN: "艾斯珀哨兵", price: 8 },
      { count: 2, name: "The Reality Chip", nameCN: "真实碎片", price: 2 },
      { count: 4, name: "Inkmoth Nexus", nameCN: "墨蛾连结点", price: 12 },
      { count: 4, name: "Plains", nameCN: "平原", price: 0 },
      { count: 4, name: "Silent Clearing", nameCN: "寂静空地", price: 6 },
      { count: 3, name: "Horizon Canopy", nameCN: "地平线天蓬", price: 8 },
      { count: 2, name: "Flooded Strand", nameCN: "溢流三角洲", price: 20 },
      { count: 2, name: "Marsh Flats", nameCN: "沼地平野", price: 18 },
    ],
    matchupBias: { 'Murktide Regent': +5, 'Burn': -8, 'Yawgmoth': +3, 'Amulet Titan': -3 },
  },
  'Creativity': {
    archetype: 'combo',
    strengths: ['midrange', 'control', 'ramp'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: "Indomitable Creativity", nameCN: "不屈创意", price: 12 },
      { count: 4, name: "Archon of Cruelty", nameCN: "残酷执政官", price: 8 },
      { count: 4, name: "Wrenn and Six", nameCN: "芮恩与六树妖", price: 90 },
      { count: 4, name: "Prismatic Ending", nameCN: "棱镜终结", price: 3 },
      { count: 4, name: "Fable of the Mirror-Breaker", nameCN: "碎镜寓言", price: 12 },
      { count: 4, name: "Lightning Bolt", nameCN: "闪电击", price: 3 },
      { count: 3, name: "Expressive Iteration", nameCN: "表达性迭代", price: 5 },
      { count: 3, name: "Counterspell", nameCN: "反击咒语", price: 2 },
      { count: 2, name: "Teferi, Time Raveler", nameCN: "时间漫游泰菲力", price: 25 },
      { count: 2, name: "Spell Pierce", nameCN: "法术刺穿", price: 1 },
      { count: 4, name: "Wooded Foothills", nameCN: "林灌丘陵", price: 22 },
      { count: 4, name: "Scalding Tarn", nameCN: "灼焦 тарн", price: 25 },
      { count: 3, name: "Steam Vents", nameCN: "蒸气喷发口", price: 15 },
      { count: 2, name: "Stomping Ground", nameCN: "踩踏 ground", price: 15 },
      { count: 2, name: "Sacred Foundry", nameCN: "神圣铸造厂", price: 18 },
      { count: 1, name: "Hallowed Fountain", nameCN: "神圣喷泉", price: 15 },
      { count: 1, name: "Raugrin Triome", nameCN: "拉格林三温室", price: 8 },
    ],
    matchupBias: { 'Murktide Regent': +5, 'Burn': -10, 'Living End': +5, 'Amulet Titan': +5 },
  },
  'Mono G Tron': {
    archetype: 'ramp',
    strengths: ['control', 'midrange'],
    weaknesses: ['aggro', 'tempo', 'combo'],
    mainboard: [
      { count: 4, name: "Karn Liberated", nameCN: "解放的卡恩", price: 65 },
      { count: 2, name: "Ugin, the Spirit Dragon", nameCN: "灵龙乌金", price: 45 },
      { count: 4, name: "Ancient Stirrings", nameCN: "远古 stirrings", price: 3 },
      { count: 4, name: "Sylvan Scrying", nameCN: "森林探查", price: 2 },
      { count: 4, name: "Expedition Map", nameCN: "探险地图", price: 8 },
      { count: 4, name: "Chromatic Sphere", nameCN: "彩色球体", price: 1 },
      { count: 4, name: "Chromatic Star", nameCN: "彩色之星", price: 2 },
      { count: 4, name: "Urza's Mine", nameCN: "克撒的矿场", price: 3 },
      { count: 4, name: "Urza's Power Plant", nameCN: "克撒的动力厂", price: 3 },
      { count: 4, name: "Urza's Tower", nameCN: "克撒之塔", price: 3 },
      { count: 3, name: "Wurmcoil Engine", nameCN: "亚龙卷引擎", price: 18 },
      { count: 2, name: "Oblivion Stone", nameCN: "遗忘石", price: 8 },
      { count: 2, name: "Karn, the Great Creator", nameCN: "伟大的造物主卡恩", price: 25 },
      { count: 3, name: "Walking Ballista", nameCN: "行走弩炮", price: 12 },
      { count: 1, name: "Emrakul, the Aeons Torn", nameCN: "裂世师埃莫库里", price: 55 },
      { count: 1, name: "Boseiju, Who Endures", nameCN: "不灭者 boseiju", price: 30 },
      { count: 3, name: "Forest", nameCN: "树林", price: 0 },
    ],
    matchupBias: { 'Murktide Regent': -5, 'Burn': -15, 'Living End': +5, 'Amulet Titan': +5 },
  },
  'Burn': {
    archetype: 'aggro',
    strengths: ['combo', 'ramp', 'control'],
    weaknesses: ['midrange', 'tempo', 'aggro'],
    mainboard: [
      { count: 4, name: "Lightning Bolt", nameCN: "闪电击", price: 3 },
      { count: 4, name: "Lava Spike", nameCN: "熔岩 spike", price: 1 },
      { count: 4, name: "Rift Bolt", nameCN: "裂隙闪电", price: 1 },
      { count: 4, name: "Skewer the Critics", nameCN: "串刺批评者", price: 0.5 },
      { count: 4, name: "Goblin Guide", nameCN: "地精向导", price: 8 },
      { count: 4, name: "Monastery Swiftspear", nameCN: "修道院疾刺兵", price: 3 },
      { count: 4, name: "Eidolon of the Great Revel", nameCN: "大启示录的艾德隆", price: 8 },
      { count: 4, name: "Searing Blaze", nameCN: "灼烧 blaze", price: 1 },
      { count: 4, name: "Boros Charm", nameCN: "波洛斯护符", price: 3 },
      { count: 2, name: "Skullcrack", nameCN: "碎颅击", price: 2 },
      { count: 2, name: "Lightning Helix", nameCN: "闪电螺旋", price: 2 },
      { count: 2, name: "Rending Volley", nameCN: "撕裂 volley", price: 1 },
      { count: 4, name: "Inspiring Vantage", nameCN: "激励 vantage", price: 8 },
      { count: 4, name: "Sunbaked Canyon", nameCN: "晒焦峡谷", price: 8 },
      { count: 4, name: "Sacred Foundry", nameCN: "神圣铸造厂", price: 18 },
      { count: 2, name: "Mountain", nameCN: "山脉", price: 0 },
      { count: 2, name: "Plains", nameCN: "平原", price: 0 },
    ],
    matchupBias: { 'Living End': +10, 'Amulet Titan': +12, 'Murktide Regent': +8, 'Yawgmoth': +10, 'Rakdos Scam': -8 },
  },
  'Affinity': {
    archetype: 'colorless',
    strengths: ['control', 'combo'],
    weaknesses: ['aggro', 'midrange'],
    mainboard: [
      { count: 4, name: "Urza's Saga", nameCN: "克撒传", price: 25 },
      { count: 4, name: "Thought Monitor", nameCN: "思维监视者", price: 8 },
      { count: 4, name: "Ornithopter", nameCN: "扑翼机", price: 0.5 },
      { count: 4, name: "Memnite", nameCN: "记忆体", price: 1 },
      { count: 4, name: "Springleaf Drum", nameCN: "春叶鼓", price: 3 },
      { count: 4, name: "Gingerbrute", nameCN: "姜饼人", price: 0.5 },
      { count: 4, name: "Patchwork Automaton", nameCN: "拼布自动机", price: 1 },
      { count: 4, name: "Frogmite", nameCN: "蛙甲", price: 0.5 },
      { count: 3, name: "Nettlecyst", nameCN: "荨麻囊肿", price: 4 },
      { count: 2, name: "Shadowspear", nameCN: "影矛", price: 8 },
      { count: 2, name: "Pithing Needle", nameCN: "穿穴 needle", price: 3 },
      { count: 3, name: "Inkmoth Nexus", nameCN: "墨蛾连结点", price: 12 },
      { count: 4, name: "Darksteel Citadel", nameCN: "玄钢城堡", price: 1 },
      { count: 4, name: "Treasure Vault", nameCN: "宝库", price: 3 },
      { count: 1, name: "Karakas", nameCN: "卡拉卡斯", price: 0 },
      { count: 4, name: "Spire of Industry", nameCN: "工业尖塔", price: 1 },
    ],
    matchupBias: { 'Murktide Regent': -3, 'Burn': -5, 'Amulet Titan': -3, 'Living End': +5 },
  },
  'Jund': {
    archetype: 'midrange',
    strengths: ['aggro', 'combo', 'tempo'],
    weaknesses: ['control', 'ramp'],
    mainboard: [
      { count: 4, name: "Tarmogoyf", nameCN: "塔莫耶夫", price: 25 },
      { count: 3, name: "Bloodbraid Elf", nameCN: "血辫精灵", price: 8 },
      { count: 3, name: "Ragavan, Nimble Pilferer", nameCN: "敏捷窃贼拉加万", price: 45 },
      { count: 2, name: "Wrenn and Six", nameCN: "芮恩与六树妖", price: 90 },
      { count: 4, name: "Thoughtseize", nameCN: "攫取思绪", price: 15 },
      { count: 4, name: "Inquisition of Kozilek", nameCN: "寇基雷的审问", price: 3 },
      { count: 4, name: "Lightning Bolt", nameCN: "闪电击", price: 3 },
      { count: 3, name: "Fatal Push", nameCN: "致命一推", price: 2 },
      { count: 2, name: "Terminate", nameCN: "终结", price: 1 },
      { count: 2, name: "Kolaghan's Command", nameCN: "寇拉甘的命令", price: 5 },
      { count: 2, name: "Liliana of the Veil", nameCN: "面纱的莉莲娜", price: 35 },
      { count: 4, name: "Verdant Catacombs", nameCN: "葱郁 catacombs", price: 25 },
      { count: 3, name: "Blackcleave Cliffs", nameCN: "黑裂悬崖", price: 25 },
      { count: 2, name: "Blood Crypt", nameCN: "血染殿堂", price: 15 },
      { count: 2, name: "Overgrown Tomb", nameCN: "蔓生墓园", price: 15 },
      { count: 2, name: "Stomping Ground", nameCN: "踩踏 ground", price: 15 },
      { count: 1, name: "Nurturing Peatland", nameCN: "滋养泥炭地", price: 8 },
    ],
    matchupBias: { 'Burn': +5, 'Murktide Regent': +3, 'Amulet Titan': +3, 'Yawgmoth': +3, 'Living End': +3 },
  },
  'Merfolk': {
    archetype: 'tribal',
    strengths: ['aggro', 'combo'],
    weaknesses: ['control', 'midrange', 'ramp'],
    mainboard: [
      { count: 4, name: "Lord of Atlantis", nameCN: "亚特兰提斯之王", price: 12 },
      { count: 4, name: "Master of the Pearl Trident", nameCN: "珍珠三叉戟之主", price: 8 },
      { count: 4, name: "Silvergill Adept", nameCN: "银腮专家", price: 3 },
      { count: 4, name: "Merfolk Trickster", nameCN: "人鱼骗子", price: 2 },
      { count: 4, name: "Svyelun of Sea and Sky", nameCN: "海与天的斯维伦", price: 8 },
      { count: 4, name: "Vodalian Hexcatcher", nameCN: "沃达连 hex捕手", price: 3 },
      { count: 4, name: "Aether Vial", nameCN: "乙醚瓶", price: 35 },
      { count: 4, name: "Force of Negation", nameCN: "否定之力", price: 35 },
      { count: 3, name: "Subtlety", nameCN: "微妙", price: 18 },
      { count: 2, name: "Spreading Seas", nameCN: "蔓延海域", price: 1 },
      { count: 2, name: "Chalice of the Void", nameCN: "虚空圣杯", price: 25 },
      { count: 4, name: "Mutavault", nameCN: "突变洞穴", price: 12 },
      { count: 4, name: "Cavern of Souls", nameCN: "灵魂洞窟", price: 65 },
      { count: 4, name: "Island", nameCN: "海岛", price: 0 },
      { count: 2, name: "Otawara, Soaring City", nameCN: "凌空城大太刀", price: 28 },
      { count: 1, name: "Minamo, School at Water's Edge", nameCN: "水际学园水亡", price: 15 },
    ],
    matchupBias: { 'Murktide Regent': -5, 'Burn': -3, 'Amulet Titan': -5, 'Living End': +5 },
  },
  'Dredge': {
    archetype: 'reanimator',
    strengths: ['control', 'midrange'],
    weaknesses: ['aggro', 'tempo', 'combo'],
    mainboard: [
      { count: 4, name: "Cathartic Reunion", nameCN: "宣泄重聚", price: 1 },
      { count: 4, name: "Life from the Loam", nameCN: "淤泥中的生命", price: 8 },
      { count: 4, name: "Narcomoeba", nameCN: "寐梦鱼", price: 3 },
      { count: 4, name: "Prized Amalgam", nameCN: "珍贵合成体", price: 2 },
      { count: 4, name: "Bloodghast", nameCN: "血鬼", price: 12 },
      { count: 4, name: "Stinkweed Imp", nameCN: "臭草小恶魔", price: 0.5 },
      { count: 4, name: "Shriekhorn", nameCN: "尖啸角", price: 0.5 },
      { count: 3, name: "Creeping Chill", nameCN: "渐侵寒意", price: 1 },
      { count: 3, name: "Conflagrate", nameCN: "焚焰", price: 1 },
      { count: 2, name: "Silversmote Ghoul", nameCN: "银烬食尸鬼", price: 0.5 },
      { count: 4, name: "City of Brass", nameCN: "黄铜之都", price: 8 },
      { count: 4, name: "Gemstone Mine", nameCN: "宝石矿", price: 8 },
      { count: 4, name: "Mana Confluence", nameCN: "魔力聚汇", price: 12 },
      { count: 3, name: "Spirebluff Canal", nameCN: "尖顶断崖渠", price: 12 },
      { count: 2, name: "Steam Vents", nameCN: "蒸气喷发口", price: 15 },
      { count: 1, name: "Stomping Ground", nameCN: "踩踏 ground", price: 15 },
      { count: 1, name: "Watery Grave", nameCN: "水没墓场", price: 15 },
    ],
    matchupBias: { 'Murktide Regent': -5, 'Living End': +5, 'Amulet Titan': -5, 'Burn': -8 },
  },
  'Heliod Combo': {
    archetype: 'combo',
    strengths: ['midrange', 'control'],
    weaknesses: ['aggro', 'tempo'],
    mainboard: [
      { count: 4, name: "Heliod, Sun-Crowned", nameCN: "日冠赫利欧德", price: 15 },
      { count: 4, name: "Walking Ballista", nameCN: "行走弩炮", price: 12 },
      { count: 4, name: "Spike Feeder", nameCN: "尖刺 feeder", price: 1 },
      { count: 4, name: "Ranger-Captain of Eos", nameCN: "厄俄斯游侠队长", price: 8 },
      { count: 4, name: "Auriok Champion", nameCN: "奥力克冠军", price: 12 },
      { count: 4, name: "Conclave Mentor", nameCN: "密会导师", price: 1 },
      { count: 4, name: "Collected Company", nameCN: " Company", price: 8 },
      { count: 3, name: "Stoneforge Mystic", nameCN: "锻石秘教徒", price: 25 },
      { count: 2, name: "Skyclave Apparition", nameCN: "天径显现", price: 3 },
      { count: 2, name: "Soul Warden", nameCN: "灵魂守卫", price: 1 },
      { count: 4, name: "Windswept Heath", nameCN: "风袭荒野", price: 18 },
      { count: 4, name: "Temple Garden", nameCN: "殿堂花园", price: 15 },
      { count: 3, name: "Horizon Canopy", nameCN: "地平线天蓬", price: 8 },
      { count: 3, name: "Plains", nameCN: "平原", price: 0 },
      { count: 2, name: "Forest", nameCN: "树林", price: 0 },
      { count: 2, name: "Sunpetal Grove", nameCN: "日花瓣林地", price: 4 },
      { count: 1, name: "Boseiju, Who Endures", nameCN: "不灭者 boseiju", price: 30 },
    ],
    matchupBias: { 'Murktide Regent': +5, 'Burn': -10, 'Yawgmoth': +5, 'Amulet Titan': -3 },
  },
  'Grixis Shadow': {
    archetype: 'tempo',
    strengths: ['control', 'combo'],
    weaknesses: ['aggro', 'midrange'],
    mainboard: [
      { count: 4, name: "Death's Shadow", nameCN: "死亡阴影", price: 8 },
      { count: 4, name: "Ragavan, Nimble Pilferer", nameCN: "敏捷窃贼拉加万", price: 45 },
      { count: 4, name: "Dragon's Rage Channeler", nameCN: "龙之怒祭师", price: 2 },
      { count: 4, name: "Dress Down", nameCN: "盛装倒下", price: 12 },
      { count: 4, name: "Thought Scour", nameCN: "思维冲刷", price: 1 },
      { count: 4, name: "Thoughtseize", nameCN: "攫取思绪", price: 15 },
      { count: 3, name: "Expressive Iteration", nameCN: "表达性迭代", price: 5 },
      { count: 3, name: "Unholy Heat", nameCN: "不洁热焰", price: 1 },
      { count: 2, name: "Drown in the Loch", nameCN: "溺毙于湖", price: 2 },
      { count: 2, name: "Kolaghan's Command", nameCN: "寇拉甘的命令", price: 5 },
      { count: 4, name: "Polluted Delta", nameCN: "污染三角洲", price: 25 },
      { count: 4, name: "Bloodstained Mire", nameCN: "血污泥沼", price: 22 },
      { count: 3, name: "Watery Grave", nameCN: "水没墓场", price: 15 },
      { count: 2, name: "Blood Crypt", nameCN: "血染殿堂", price: 15 },
      { count: 2, name: "Steam Vents", nameCN: "蒸气喷发口", price: 15 },
      { count: 2, name: "Darkslick Shores", nameCN: "暗 slick 海岸", price: 8 },
      { count: 1, name: "Island", nameCN: "海岛", price: 0 },
      { count: 1, name: "Swamp", nameCN: "沼泽", price: 0 },
    ],
    matchupBias: { 'Murktide Regent': +3, 'Burn': -5, 'Yawgmoth': +3, 'Amulet Titan': +5 },
  },
};

// 根据 deck archetype 和对手名称生成对战胜率
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

      // 应用特定套牌间的偏差调整
      const bias = profile.matchupBias[opponent.name] || 0;
      const winRate = Math.max(10, Math.min(90, Math.round(base + bias + (Math.random() * 6 - 3))));

      return {
        opponent: opponent.name,
        winRate,
      };
    });
}

// 获取套牌的示例牌表
export function getDecklist(deckName: string): DecklistEntry[] {
  return DECK_PROFILES[deckName]?.mainboard || [];
}

// 获取套牌 archetype 类型
export function getDeckArchetype(deckName: string): ArchetypeType | null {
  return DECK_PROFILES[deckName]?.archetype || null;
}
