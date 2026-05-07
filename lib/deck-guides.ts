import type { DeckArchetype } from '@/types';

export interface MatchupAdvice {
  opponent: string;
  opponentCN?: string;
  difficulty: 'favorable' | 'even' | 'unfavorable';
  summary: string;
  summaryCN: string;
  ins: string[];
  outs: string[];
  keyCards: string[];
  mulliganTips: string;
  mulliganTipsCN: string;
}

export interface DeckGuide {
  deckName: string;
  deckNameCN: string;
  overview: string;
  overviewCN: string;
  gamePlan: string[];
  gamePlanCN: string[];
  keyCards: { name: string; role: string; roleCN: string }[];
  sideboardStrategy: string;
  sideboardStrategyCN: string;
  matchups: MatchupAdvice[];
  tips: string[];
  tipsCN: string[];
  sources: { title: string; url: string; author?: string }[];
}

export const DECK_GUIDES: Record<string, DeckGuide> = {
  'Dimir Frog': {
    deckName: 'Dimir Frog',
    deckNameCN: '底密尔青蛙',
    overview: `Dimir Frog is a tempo/midrange hybrid that uses Psychic Frog as a recursive card advantage engine, backed by cheap interaction and flash threats. The deck excels at grinding out opponents while maintaining board presence through Kaito's ninjutsu and Murktide Regent as a top-end finisher.`,
    overviewCN: `底密尔青蛙是一套节奏/中速混合套牌，以灵能蛙（Psychic Frog）作为递归式赚牌引擎，配合廉价的互动和闪现威胁。通过凯拓的忍者术和墨鳕帝君作为顶端终结者，这套牌擅长在维持场面存在的同时磨死对手。`,
    gamePlan: [
      `Deploy early threats (Psychic Frog, Orcish Bowmasters) while disrupting opponent with Thoughtseize/Fatal Push`,
      `Use cantrips (Consider, Preordain) to find interaction and fuel Murktide Regent`,
      `Leverage Kaito's ninjutsu for card advantage — ninjutsu at end of combat after damage`,
      `Close with Murktide Regent or chip damage from evasive creatures`,
      `Post-board: bring in narrow interaction for specific matchups, Snapcaster for grind`,
    ],
    gamePlanCN: [
      `部署早期威胁（灵能蛙、奥克弓手），同时用攫取思绪/致命一推干扰对手`,
      `使用抓牌咒语（细想/预卜）来找互动并喂饱墨鳕帝君`,
      `利用凯拓的忍者术赚牌——在战斗伤害结算后、战斗阶段结束时发动忍者术`,
      `用墨鳕帝君或穿透生物的磨血伤害终结`,
      `备牌后：换入针对性互动，用迅咒法师增强磨牌能力`,
    ],
    keyCards: [
      { name: 'Psychic Frog', role: 'Card advantage engine — draws when creatures deal combat damage', roleCN: '赚牌引擎——当生物造成战斗伤害时抽牌' },
      { name: 'Kaito, Bane of Nightmares', role: 'Ninjutsu enabler + planeswalker value — ninjutsu at end of combat', roleCN: '忍者术启动器+旅法师价值——战斗结束时发动忍者术' },
      { name: 'Murktide Regent', role: 'Top-end threat — delve payoff that hard-casts for 2 mana with Counterspell backup', roleCN: '顶端威胁——掘坟收益，可两费硬施并保留反击咒语费用' },
      { name: 'Orcish Bowmasters', role: 'Anti-draw threat — punishes card draw, strong vs Boros Energy and Ketramose', roleCN: '反抽牌威胁——惩罚抓牌，对波洛斯能量和凯拓很强' },
      { name: 'Tamiyo, Inquisitive Student', role: 'Cheap threat + clue generation — enables ninjutsu at 5 mana', roleCN: '廉价威胁+线索生成——5费时可发动忍者术' },
      { name: 'Subtlety', role: 'Free counter — strong vs Amulet Titan and white midrange', roleCN: '免费反击——对护符泰坦和白色中速很强' },
      { name: 'Force of Negation', role: 'Free interaction — protects vs combo and early threats', roleCN: '免费互动——保护对抗组合技和早期威胁' },
      { name: 'Archmage\'s Charm', role: 'Versatile — counters Overlord/Scion, steals Guide of Souls, forces draws with Bowmasters', roleCN: '多功能——反击霸主/龙裔，偷灵魂向导，配合弓手强制抓牌' },
    ],
    sideboardStrategy: `The sideboard is built around narrow but powerful answers. Stern Scolding comes in against creature-heavy matchups (Boros, Orzhov). Consign to Memory is the catch-all for cascade, suspend, and ETB triggers. Engineered Explosives handles Boros Energy and Urza's Saga constructs. Harbinger of the Seas is for Ramp matchups. Nihil Spellbomb is graveyard hate that also pumps Murktide.`,
    sideboardStrategyCN: `备牌围绕强力但狭窄的答案构建。严厉斥责进对抗生物多的对局（波洛斯、欧佐夫）。记入记忆中是应对倾泻、延缓和进场触发的万能牌。工程炸药处理波洛斯能量和克撒传构造体。海洋先驱用于加速对局。虚无 spellbomb 是坟场仇恨同时也能 pumping 墨鳕帝君。`,
    matchups: [
      {
        opponent: 'Boros Energy',
        opponentCN: '波洛斯能量',
        difficulty: 'favorable',
        summary: `Very favorable. Orcish Bowmasters punishes their card draw. Engineered Explosives and Stern Scolding clean up their board. Focus counters on future creatures, not current ones.`,
        summaryCN: `非常有利。奥克弓手惩罚他们的抓牌。工程炸药和严厉斥责清理场面。把反击留给未来的生物，而不是当前的。`,
        ins: ['Stern Scolding ×2', 'Engineered Explosives ×2', 'Nihil Spellbomb ×2', 'Subtlety ×1', 'Snapcaster Mage ×1'],
        outs: ['Force of Negation ×3', 'Thoughtseize ×2', 'Tamiyo ×2', 'Kaito ×1'],
        keyCards: ['Orcish Bowmasters', 'Engineered Explosives', 'Stern Scolding'],
        mulliganTips: `Keep hands with early interaction + threat. Bowmasters is the best card.`,
        mulliganTipsCN: `保留有早期互动+威胁的起手。弓手是最佳单卡。`,
      },
      {
        opponent: 'Orzhov / Esper Blink',
        opponentCN: '欧佐夫/艾斯珀闪烁',
        difficulty: 'unfavorable',
        summary: `Your worst matchup. Overlord of the Balemurk is devastating. Board out graveyard-dependent cards (Murktide) and bring in Consign/Stern Scolding.`,
        summaryCN: `你最差的对局。祸沼霸主是毁灭性的。换下依赖坟场的牌（墨鳕帝君），换入记入记忆/严厉斥责。`,
        ins: ['Stern Scolding ×2', 'Subtlety ×1', 'Snapcaster ×1', 'Consign to Memory ×1', 'Thoughtseize ×1'],
        outs: ['Murktide Regent ×3', 'Force of Negation ×3'],
        keyCards: ['Thoughtseize', 'Consign to Memory', 'Stern Scolding'],
        mulliganTips: `Mulligan for Thoughtseize or early interaction. Taking Overlord before it can be impended is crucial.`,
        mulliganTipsCN: `调度找攫取思绪或早期互动。在祸沼霸主被预示之前用思绪抓走它至关重要。`,
      },
      {
        opponent: 'Amulet Titan',
        opponentCN: '护符泰坦',
        difficulty: 'favorable',
        summary: `Subtlety is devastating against their prime-time plan. Harbinger turns off Cavern of Souls. Fetch Swamp aggressively when boarding in Harbinger.`,
        summaryCN: `微妙对他们的核心计划是毁灭性的。先驱者关闭灵魂洞窟。换入先驱者时积极找沼泽。`,
        ins: ['Harbinger of the Seas ×2', 'Subtlety ×1', 'Thoughtseize ×1'],
        outs: ['Fatal Push ×4'],
        keyCards: ['Subtlety', 'Harbinger of the Seas', 'Counterspell'],
        mulliganTips: `Aggressively mulligan for the curve of Frog into Murktide. You must be the aggressor.`,
        mulliganTipsCN: `积极调度找灵能蛙→墨鳕帝君的曲线。你必须是进攻方。`,
      },
      {
        opponent: 'Domain Zoo',
        opponentCN: '领域动物园',
        difficulty: 'favorable',
        summary: `Consign counters Scion of Draco and Leyline Binding. Nihil Spellbomb stops Phlage escape. Watch for Fable discarding Phlage — exile before it escapes.`,
        summaryCN: `记入记忆反击龙裔后裔和行会契约。虚无 spellbomb 阻止弗拉格逃逸。注意碎镜寓言弃掉弗拉格——在它逃逸前放逐。`,
        ins: ['Consign to Memory ×4', 'Nihil Spellbomb ×2', 'Snapcaster ×1', 'Subtlety ×1'],
        outs: ['Spell Snare ×1', 'Tamiyo ×2', 'Force of Negation ×3', 'Thoughtseize ×2'],
        keyCards: ['Consign to Memory', 'Nihil Spellbomb', 'Orcish Bowmasters'],
        mulliganTips: `Consign is the most important card. Prevent Scion from entering with Leyline active.`,
        mulliganTipsCN: `记入记忆是最重要的牌。阻止龙裔在行会契约激活时进场。`,
      },
      {
        opponent: 'Mono Blue Belcher',
        opponentCN: '单色蓝贝洽',
        difficulty: 'favorable',
        summary: `Classic tempo vs combo. Consign the suspend trigger on Lotus Bloom to keep it exiled. Strong matchup overall.`,
        summaryCN: `经典的节奏对组合技。对莲花绽放的延缓触发使用记入记忆使其保持放逐。整体是有利对局。`,
        ins: ['Consign to Memory ×4', 'Thoughtseize ×1', 'Stern Scolding ×2', 'Snapcaster ×1'],
        outs: ['Orcish Bowmasters ×3', 'Kaito ×1', "Archmage's Charm ×1", "Sheoldred's Edict ×1", 'Fatal Push ×2'],
        keyCards: ['Consign to Memory', 'Thoughtseize', 'Stern Scolding'],
        mulliganTips: `Look for interaction + clock. Consign on Lotus Bloom is game-winning.`,
        mulliganTipsCN: `找互动+计时器。对莲花绽放使用记入记忆是制胜的。`,
      },
      {
        opponent: 'Gruul Ramp / Eldrazi Bloodchief',
        opponentCN: '古鲁加速/奥札奇血首',
        difficulty: 'even',
        summary: `Interact early to deny mana development. Mulligan for Frog into Murktide curve. Harbinger + Consign package is key.`,
        summaryCN: `早期互动来拒绝 mana 发展。调度找灵能蛙→墨鳕帝君曲线。先驱者+记入记忆组合是关键。`,
        ins: ['Consign to Memory ×4', 'Harbinger of the Seas ×2', 'Snapcaster ×1', 'Thoughtseize ×1'],
        outs: ['Fatal Push ×4', 'Dismember ×1', 'Subtlety ×1', 'Orcish Bowmasters ×2'],
        keyCards: ['Consign to Memory', 'Harbinger of the Seas', 'Murktide Regent'],
        mulliganTips: `Mulligan aggressively for the Frog→Murktide curve. You must apply pressure.`,
        mulliganTipsCN: `积极调度找灵能蛙→墨鳕帝君曲线。你必须施加压力。`,
      },
      {
        opponent: 'Living End',
        opponentCN: '活终末',
        difficulty: 'favorable',
        summary: `Force of Negation is MVP. Nihil Spellbomb exiles their graveyard. Subtlety counters the Living End cast.`,
        summaryCN: `否定之力是 MVP。虚无 spellbomb 放逐他们的坟场。微妙反击活终末的施放。`,
        ins: ['Nihil Spellbomb ×2', 'Subtlety ×1', 'Snapcaster ×1'],
        outs: ['Tamiyo ×2', 'Kaito ×1', 'Thoughtseize ×1'],
        keyCards: ['Force of Negation', 'Nihil Spellbomb', 'Subtlety'],
        mulliganTips: `Keep hands with Force or early interaction. Spellbomb timing is crucial.`,
        mulliganTipsCN: `保留有否定之力或早期互动的起手。spellbomb 时机至关重要。`,
      },
      {
        opponent: 'Izzet Prowess',
        opponentCN: '伊捷 prowess',
        difficulty: 'even',
        summary: `Race against their combo turn. Fatal Push and Spell Snare are strong. Board out graveyard cards for more removal.`,
        summaryCN: `与他们的组合技回合赛跑。致命一推和法术阻击很强。换下坟场牌换更多去除。`,
        ins: ['Stern Scolding ×2', 'Engineered Explosives ×2', 'Snapcaster ×1'],
        outs: ['Tamiyo ×2', 'Murktide ×2', 'Thoughtseize ×1'],
        keyCards: ['Fatal Push', 'Spell Snare', 'Stern Scolding'],
        mulliganTips: `Keep removal-heavy hands. Push on Swiftspear is often the best play.`,
        mulliganTipsCN: `保留多去除的起手。对疾刺兵使用致命一推通常是最佳动作。`,
      },
    ],
    tips: [
      `Ninjutsu timing: You can ninjutsu at end of combat after damage is dealt. This is key with Psychic Frog — you draw the extra card in exchange for dealing less damage.`,
      `Murktide delve: Remember to delve aggressively after sideboard. Flashback spells with Snapcaster also pump Murktide on the battlefield.`,
      `Archmage's Charm: Can force opponent to draw two cards to win with Bowmasters, though this rarely comes up.`,
      `Harbinger fetch: When boarding in Harbinger, fetch Swamp aggressively to cast it on curve.`,
      `Cantrips: You're closer to 5 cantrips than 3. They allow riskier keeps and fuel Murktide while supporting pitch counters.`,
    ],
    tipsCN: [
      `忍者术时机：你可以在战斗伤害结算后、战斗阶段结束时发动忍者术。这对灵能蛙很关键——你抽额外一张牌，代价是造成更少伤害。`,
      `墨鳕掘坟：记住备牌后积极掘坟。用迅咒法师 flashback 咒语也会 pumping 战场上的墨鳕帝君。`,
      `大法师的魅力：可以强制对手抓两张牌来配合弓手取胜，尽管很少出现这种情况。`,
      `先驱者找地：换入先驱者时，积极找沼泽以按曲线施放。`,
      `抓牌咒语：你更接近5张而不是3张。它们允许更冒险的保留并喂饱墨鳕帝君，同时支持 pitch counter。`,
    ],
    sources: [
      { title: 'Dimir Frogtide Sideboard Guide (RIW Hobbies)', url: 'https://riwhobbies.com/dimir-frogtide-sideboard-guide/', author: 'Kyle' },
      { title: 'Modern Grixis Froggler & Sideboard Guide', url: 'https://riwhobbies.com/modern-grixis-froggler-sideboard-guide/' },
      { title: 'MTG Modern Meta Tier List - May 2026', url: 'https://playingmtg.com/modern-meta-tier-list/' },
    ],
  },
};

export function getDeckGuide(deckName: string): DeckGuide | null {
  return DECK_GUIDES[deckName] || null;
}
