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
    overview: `Dimir Frog is a tempo/midrange hybrid that leverages Psychic Frog as a recursive card advantage engine, backed by cheap interaction and flash threats. In the 2026 meta (May 2026), it serves as a strong counter to Boros Energy and combo strategies while struggling against the rising Overlord of the Balemurk decks in Orzhov and Esper shells. Pro Tour Barcelona (March 2026) data shows Dimir Frog variants performing well against control and combo, but underperforming vs blink strategies.`,
    overviewCN: `底密尔青蛙是一套节奏/中速混合套牌，以灵能蛙（Psychic Frog）作为递归式赚牌引擎，配合廉价的互动和闪现威胁。在2026年5月环境中，它是对抗波洛斯能量和组合技套牌的有力选择，但在对抗欧佐夫/艾斯珀环境中的祸沼霸主套牌时处于劣势。2026年3月巴塞罗那职业巡回赛数据显示，底密尔青蛙变体在对抗控制和组合技时表现良好，但在对抗闪烁策略时表现不佳。`,
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
      { name: 'Psychic Frog', role: 'Card advantage engine — draws when creatures deal combat damage. The deck\'s namesake and primary value source in 2026.', roleCN: '赚牌引擎——当生物造成战斗伤害时抽牌。套牌同名卡，2026年主要价值来源。' },
      { name: 'Kaito, Bane of Nightmares', role: 'Ninjutsu enabler + planeswalker value. Ninjutsu at end of combat after Psychic Frog deals damage to draw extra cards.', roleCN: '忍者术启动器+旅法师价值。在灵能蛙造成伤害后的战斗结束时发动忍者术以抽额外牌。' },
      { name: 'Murktide Regent', role: 'Top-end threat — delve payoff that hard-casts for 2 mana with Counterspell backup. Preferred over Abhorrent Oculus in 2026 meta due to Oculus weakness vs Orzhov Midrange.', roleCN: '顶端威胁——掘坟收益，可两费硬施并保留反击咒语费用。2026年环境中优于憎恶之眼，因为憎恶之眼对欧佐夫中速较弱。' },
      { name: 'Orcish Bowmasters', role: 'Anti-draw threat — punishes card draw from Boros Energy, Esper Blink, and Ketramose. Also strong vs small creatures. One of the best cards in the 2026 meta.', roleCN: '反抽牌威胁——惩罚波洛斯能量、艾斯珀闪烁和凯拓的抓牌。对小生物也很强。2026年环境中最佳单卡之一。' },
      { name: 'Tamiyo, Inquisitive Student', role: 'Cheap threat + clue generation. Enables ninjutsu at 5 mana. Board out vs Phlage decks (Boros Energy, Domain Zoo) as Phlage escape kills her.', roleCN: '廉价威胁+线索生成。5费时可发动忍者术。对抗弗拉格套牌时换下（波洛斯能量、领域动物园），因为弗拉格逃逸会杀死她。' },
      { name: 'Subtlety', role: 'Free counter — strong vs Amulet Titan, white midrange, and combo. Weak vs Gruul Eldrazi (cast effects must also be stopped). 3rd copy gets stronger post-board.', roleCN: '免费反击——对护符泰坦、白色中速和组合技很强。对古鲁奥札奇较弱（施放效果也必须阻止）。第三张备牌后更强。' },
      { name: 'Force of Negation', role: 'Free interaction — protects vs combo and early threats like Cori Steel-Cutter. Weak vs white midrange. Pitch to protect Murktide or stop combo.', roleCN: '免费互动——保护对抗组合技和早期威胁如寇莉钢刃手。对白色中速较弱。弃掉以保护墨鳕帝君或阻止组合技。' },
      { name: "Archmage's Charm", role: 'Versatile — counters Overlord/Scion, steals Guide of Souls, forces draws to trigger Bowmasters. Board out for more nimble options post-board.', roleCN: '多功能——反击霸主/龙裔，偷灵魂向导，强制抓牌触发弓手。备牌后换下换更灵活的选项。' },
    ],
    sideboardStrategy: `The May 2026 sideboard is tuned for the post-Pro Tour meta: Stern Scolding for creature-heavy decks (Boros, Orzhov/Esper). Consign to Memory is the catch-all for cascade, suspend, ETB triggers, and Urza's Saga construct ability. Engineered Explosives handles Boros Energy tokens and Urza's Saga constructs. Harbinger of the Seas is for Ramp matchups — turns off Cavern of Souls. Nihil Spellbomb is graveyard hate that also pumps Murktide. Snapcaster Mage provides grind once narrow interaction is boarded in.`,
    sideboardStrategyCN: `2026年5月备牌针对职业巡回赛后环境调整：严厉斥责对抗生物多的套牌（波洛斯、欧佐夫/艾斯珀）。记入记忆中是应对倾泻、延缓、进场触发和克撒传构造体异能的万能牌。工程炸药处理波洛斯能量衍生物和克撒传构造体。海洋先驱用于加速对局——关闭灵魂洞窟。虚无 spellbomb 是坟场仇恨并 pumping 墨鳕帝君。迅咒法师在换入狭窄互动后提供磨牌能力。`,
    matchups: [
      {
        opponent: 'Boros Energy',
        opponentCN: '波洛斯能量',
        difficulty: 'favorable',
        summary: `Favorable (65%+ win rate). Orcish Bowmasters punishes their card draw (Guide of Souls, Galvanic Discharge). Engineered Explosives and Stern Scolding clean up their board. In testing, this deck won 8/8 games on the draw vs Boros. Watch for escaped Phlage — exile with Nihil Spellbomb before it escapes. Static Prison targets Psychic Frog; play around it by holding other creatures.`,
        summaryCN: `有利（65%+胜率）。奥克弓手惩罚他们的抓牌（灵魂向导、电镀放电）。工程炸药和严厉斥责清理场面。测试中这套牌后手对波洛斯8胜0负。注意逃逸的弗拉格——在它逃逸前用虚无 spellbomb 放逐。静态囚牢瞄准灵能蛙；通过保留其他生物来应对。`,
        ins: ['Stern Scolding ×2', 'Engineered Explosives ×2', 'Nihil Spellbomb ×2', 'Subtlety ×1', 'Snapcaster Mage ×1'],
        outs: ['Force of Negation ×3', 'Thoughtseize ×2', 'Tamiyo ×2', 'Kaito ×1'],
        keyCards: ['Orcish Bowmasters', 'Engineered Explosives', 'Stern Scolding', 'Nihil Spellbomb'],
        mulliganTips: `Keep hands with early interaction + threat. Bowmasters is the best card. Engineered Explosives handles Goblin Bombardment and energy creatures.`,
        mulliganTipsCN: `保留有早期互动+威胁的起手。弓手是最佳单卡。工程炸药处理地精 bombardment 和能量生物。`,
      },
      {
        opponent: 'Esper Blink',
        opponentCN: '艾斯珀闪烁',
        difficulty: 'unfavorable',
        summary: `Unfavorable (~40% win rate). Overlord of the Balemurk is devastating — it generates two creature cards when blinked. Esper Blink won the Pro Tour Barcelona (March 2026) with strong Dimir Frog results. Board out graveyard cards (Murktide) and bring in Consign/Stern Scolding. Thoughtseize taking Overlord before it can be impended is crucial.`,
        summaryCN: `不利（~40%胜率）。祸沼霸主是毁灭性的——被闪烁时生成两张生物牌。艾斯珀闪烁在2026年3月巴塞罗那职业巡回赛上取得了对底密尔青蛙的良好战绩。换下坟场牌（墨鳕帝君），换入记入记忆/严厉斥责。在祸沼霸主被预示前用攫取思绪抓走它至关重要。`,
        ins: ['Stern Scolding ×2', 'Subtlety ×1', 'Snapcaster ×1', 'Consign to Memory ×1', 'Thoughtseize ×1'],
        outs: ['Murktide Regent ×3', 'Force of Negation ×3'],
        keyCards: ['Thoughtseize', 'Consign to Memory', 'Stern Scolding'],
        mulliganTips: `Mulligan for Thoughtseize or early interaction. Taking Overlord before it can be impended is the highest priority.`,
        mulliganTipsCN: `调度找攫取思绪或早期互动。在祸沼霸主被预示之前抓走它是最高优先级。`,
      },
      {
        opponent: 'Orzhov Blink',
        opponentCN: '欧佐夫闪烁',
        difficulty: 'unfavorable',
        summary: `Unfavorable. Similar to Esper Blink but with less countermagic pressure. Overlord of the Balemurk and Flickerwisp generate overwhelming value. Orzhov Blink placed 2nd at SCG Con Hartford RCQ (April 2026). Stern Scolding is your best answer to their ETB threats.`,
        summaryCN: `不利。类似艾斯珀闪烁但反击压力更小。祸沼霸主和闪烁鬼影生成压倒性价值。欧佐夫闪烁在2026年4月SCG哈特福德RCQ中获得亚军。严厉斥责是对抗他们进场威胁的最佳答案。`,
        ins: ['Stern Scolding ×2', 'Subtlety ×1', 'Snapcaster ×1', 'Consign to Memory ×1', 'Thoughtseize ×1'],
        outs: ['Murktide Regent ×3', 'Force of Negation ×2', 'Tamiyo ×1'],
        keyCards: ['Stern Scolding', 'Thoughtseize', 'Consign to Memory'],
        mulliganTips: `Look for Stern Scolding or Thoughtseize. Board presence is less important than stopping their ETB value.`,
        mulliganTipsCN: `找严厉斥责或攫取思绪。阻止他们的进场价值比场面存在更重要。`,
      },
      {
        opponent: 'Amulet Titan',
        opponentCN: '护符泰坦',
        difficulty: 'favorable',
        summary: `Favorable. Subtlety counters their Primeval Titan or Amulet of Vigor. Harbinger of the Seas turns off Cavern of Souls and forces them to fetch basics. Fatal Push is weak here — board it all out. Amulet Titan was Top 8 at Pro Tour Barcelona but vulnerable to tempo disruption.`,
        summaryCN: `有利。微妙反击他们的太初泰坦或活力护符。海洋先驱关闭灵魂洞窟并迫使他们找基本地。致命一推在此较弱——全部换下。护符泰坦在巴塞罗那职业巡回赛进入八强，但易受节奏干扰。`,
        ins: ['Harbinger of the Seas ×2', 'Subtlety ×1', 'Thoughtseize ×1'],
        outs: ['Fatal Push ×4'],
        keyCards: ['Subtlety', 'Harbinger of the Seas', 'Counterspell'],
        mulliganTips: `Aggressively mulligan for the curve of Frog into Murktide. You must apply pressure before they can combo off.`,
        mulliganTipsCN: `积极调度找灵能蛙→墨鳕帝君的曲线。你必须在他们组合技展开前施加压力。`,
      },
      {
        opponent: 'Eldrazi Bloodchief',
        opponentCN: '奥札奇血首',
        difficulty: 'even',
        summary: `Even matchup (March 2026 Pro Tour data). Malevolent Rumble and Utopia Sprawl power out early threats. Consign to Memory stops Sowing Mycospawn's search and Broodscale Asp. Subtlety is weak because their cast effects (Kozilek's Command, Emrakul) still resolve. Eldrazi Ramp won RCQ Toronto (April 2026).`,
        summaryCN: `均势（2026年3月职业巡回赛数据）。恶意 rumble 和乌托邦蔓延产出早期威胁。记入记忆阻止播种菌生体的搜寻和育鳞蛇。微妙较弱，因为他们的施放效果（寇基雷的命令、埃莫库里）仍会结算。奥札奇加速在2026年4月多伦多RCQ中获胜。`,
        ins: ['Consign to Memory ×4', 'Harbinger of the Seas ×2', 'Snapcaster ×1', 'Thoughtseize ×1'],
        outs: ['Fatal Push ×4', 'Dismember ×1', 'Subtlety ×1', 'Orcish Bowmasters ×2'],
        keyCards: ['Consign to Memory', 'Harbinger of the Seas', 'Thoughtseize'],
        mulliganTips: `Mulligan aggressively for interaction + clock. You need to stop their mana development and present a threat.`,
        mulliganTipsCN: `积极调度找互动+计时器。你需要阻止他们的 mana 发展并呈现威胁。`,
      },
      {
        opponent: 'Domain Zoo',
        opponentCN: '领域动物园',
        difficulty: 'favorable',
        summary: `Favorable. Consign to Memory counters Scion of Draco and Leyline of the Guildpact. Nihil Spellbomb stops Phlage escape. Orcish Bowmasters punishes their card draw. Domain Zoo placed 2nd at SCG Con Hartford RCQ (April 2026). Watch for Fable discarding Phlage — exile before it escapes.`,
        summaryCN: `有利。记入记忆反击龙裔后裔和行会契约地脉。虚无 spellbomb 阻止弗拉格逃逸。奥克弓手惩罚他们的抓牌。领域动物园在2026年4月SCG哈特福德RCQ中获得亚军。注意碎镜寓言弃掉弗拉格——在它逃逸前放逐。`,
        ins: ['Consign to Memory ×4', 'Nihil Spellbomb ×2', 'Snapcaster ×1', 'Subtlety ×1'],
        outs: ['Spell Snare ×1', 'Tamiyo ×2', 'Force of Negation ×3', 'Thoughtseize ×2'],
        keyCards: ['Consign to Memory', 'Nihil Spellbomb', 'Orcish Bowmasters'],
        mulliganTips: `Consign is the most important card. Prevent Scion from entering with Leyline active. Board out Spell Snare (only hits Kavu and Tribal Flames).`,
        mulliganTipsCN: `记入记忆是最重要的牌。阻止龙裔在行会契约激活时进场。换下法术阻击（只打 kavu 和部落烈焰）。`,
      },
      {
        opponent: 'Mono Blue Belcher',
        opponentCN: '单色蓝贝洽',
        difficulty: 'favorable',
        summary: `Favorable. Classic tempo vs combo. Consign to Memory on Lotus Bloom's suspend trigger keeps it exiled permanently. Tameshi Belcher won Pro Tour Barcelona (March 2026). Thoughtseize and Stern Scolding provide additional disruption.`,
        summaryCN: `有利。经典的节奏对组合技。对莲花绽放的延缓触发使用记入记忆使其永久放逐。塔梅希贝洽在2026年3月巴塞罗那职业巡回赛上获胜。攫取思绪和严厉斥责提供额外干扰。`,
        ins: ['Consign to Memory ×4', 'Thoughtseize ×1', 'Stern Scolding ×2', 'Snapcaster ×1'],
        outs: ['Orcish Bowmasters ×3', 'Kaito ×1', "Archmage's Charm ×1", "Sheoldred's Edict ×1", 'Fatal Push ×2'],
        keyCards: ['Consign to Memory', 'Thoughtseize', 'Stern Scolding'],
        mulliganTips: `Look for interaction + clock. Consign on Lotus Bloom is game-winning. This is a strong matchup you should prefer to play.`,
        mulliganTipsCN: `找互动+计时器。对莲花绽放使用记入记忆是制胜的。这是你应该偏好的强对局。`,
      },
      {
        opponent: 'Izzet Prowess',
        opponentCN: '伊捷 prowess',
        difficulty: 'even',
        summary: `Even. A race against their combo turn. Fatal Push and Spell Snare are strong. Cori Steel-Cutter and Violent Urge can kill from an empty board. Izzet Prowess placed well at Pro Tour Barcelona (March 2026). Board out graveyard cards for more removal.`,
        summaryCN: `均势。与他们的组合技回合赛跑。致命一推和法术阻击很强。寇莉钢刃手和暴烈冲动可以从空场击杀。伊捷 prowess 在2026年3月巴塞罗那职业巡回赛上表现良好。换下坟场牌换更多去除。`,
        ins: ['Stern Scolding ×2', 'Engineered Explosives ×2', 'Snapcaster ×1'],
        outs: ['Tamiyo ×2', 'Murktide ×2', 'Thoughtseize ×1'],
        keyCards: ['Fatal Push', 'Spell Snare', 'Stern Scolding', 'Engineered Explosives'],
        mulliganTips: `Keep removal-heavy hands. Push on Swiftspear is often the best turn-1 play. Watch for their turn-2 kill with Violent Urge.`,
        mulliganTipsCN: `保留多去除的起手。对疾刺兵使用致命一推通常是最佳一回合动作。注意他们二回合用暴烈冲动击杀。`,
      },
      {
        opponent: 'Living End',
        opponentCN: '活终末',
        difficulty: 'favorable',
        summary: `Favorable. Force of Negation is MVP — counter their Violent Outburst or cascade spell. Nihil Spellbomb exiles their graveyard. Subtlety counters the Living End cast. Board out slow cards for interaction.`,
        summaryCN: `有利。否定之力是 MVP——反击他们的暴烈爆发或倾泻咒语。虚无 spellbomb 放逐他们的坟场。微妙反击活终末的施放。换下慢牌换互动。`,
        ins: ['Nihil Spellbomb ×2', 'Subtlety ×1', 'Snapcaster ×1'],
        outs: ['Tamiyo ×2', 'Kaito ×1', 'Thoughtseize ×1'],
        keyCards: ['Force of Negation', 'Nihil Spellbomb', 'Subtlety'],
        mulliganTips: `Keep hands with Force or early interaction. Spellbomb timing is crucial — exile their graveyard in response to Living End.`,
        mulliganTipsCN: `保留有否定之力或早期互动的起手。spellbomb 时机至关重要——响应活终末放逐他们的坟场。`,
      },
      {
        opponent: 'Ruby Storm',
        opponentCN: '红宝石风暴',
        difficulty: 'favorable',
        summary: `Favorable. Force of Negation counters their key rituals. Thoughtseize takes their enablers. Subtlety counters their big spells. Board out removal for more countermagic and graveyard hate.`,
        summaryCN: `有利。否定之力反击他们的关键仪式。攫取思绪拿走他们的启动器。微妙反击他们的大咒语。换下去除换更多反击和坟场仇恨。`,
        ins: ['Subtlety ×1', 'Thoughtseize ×1', 'Nihil Spellbomb ×2', 'Snapcaster ×1'],
        outs: ['Fatal Push ×4', "Sheoldred's Edict ×1"],
        keyCards: ['Force of Negation', 'Thoughtseize', 'Subtlety'],
        mulliganTips: `Keep hands with Force or Thoughtseize. Taking their mana acceleration or bonus round is key.`,
        mulliganTipsCN: `保留有否定之力或攫取思绪的起手。拿走他们的 mana 加速或奖励回合是关键。`,
      },
    ],
    tips: [
      `Ninjutsu timing (2026): You can ninjutsu at end of combat after damage is dealt. With Psychic Frog, you draw the extra card in exchange for dealing less damage — this is often correct for card advantage. Kaito is strongest post-board when you have more nimble interaction.`,
      `Murktide delve: Delve aggressively after sideboard. Flashback spells with Snapcaster also pump Murktide on the battlefield. Remember to delve accordingly after sideboard and Murktide will also get +1/+1 if you flashback a spell when it\'s on the battlefield.`,
      `Archmage's Charm: Can force opponent to draw two cards to trigger Orcish Bowmasters. You can also steal 3/4 Guide of Souls with it.`,
      `Harbinger fetch: When boarding in Harbinger of the Seas, fetch Swamp aggressively to cast it on turn 2. This prevents Gruul Ramp from using Cavern of Souls to make their Eldrazi uncounterable.`,
      `Cantrips: Run 4-5 cantrips (Consider + Preordain). They allow riskier keeps and fuel Murktide while supporting pitch counters like Force and Subtlety. Raw cards in hand are valuable with pitch counters and Psychic Frog.`,
      `Bowmasters vs Boros (2026): This is your best card against Boros Energy. It punishes Guide of Souls, Galvanic Discharge, and their card draw engines. Focus counters on future creatures, not current ones.`,
      `Consign to Memory (2026): Can counter Urza\'s Saga\'s construct ability (even after rules change). Consigning Sowing Mycospawn\'s search ability prevents Cavern of Souls from entering the battlefield.`,
      `Tamiyo board out: Always board out Tamiyo against decks with Phlage (Boros Energy, Domain Zoo). Phlage\'s escape trigger kills her. Board out Tamiyo and Orcish Bowmasters against Boros Energy for Stern Scolding + Engineered Explosives.`,
      `Snapcaster synergy: Snapcaster Mage is a grindy card you board in often once Stern Scolding or Consign to Memory are in the deck. Another good Ninjutsu option once you board out Tamiyos against Phlage.`,
    ],
    tipsCN: [
      `忍者术时机（2026）：你可以在战斗伤害结算后、战斗阶段结束时发动忍者术。配合灵能蛙时，你抽额外一张牌，代价是造成更少伤害——这通常是为了赚牌的正确选择。凯拓在备牌后有更多灵活互动时最强。`,
      `墨鳕掘坟：备牌后积极掘坟。用迅咒法师 flashback 咒语也会 pumping 战场上的墨鳕帝君。备牌后记得相应掘坟，如果你在墨鳕在战场上时 flashback 咒语，它还会获得+1/+1。`,
      `大法师的魅力：可以强制对手抓两张牌来触发奥克弓手。你也可以用它偷3/4的灵魂向导。`,
      `先驱者找地：换入海洋先驱时，积极找沼泽以在二回合施放。这阻止古鲁加速使用灵魂洞窟使他们的奥札奇不可反击。`,
      `抓牌咒语：运行4-5张抓牌咒语（细想+预卜）。它们允许更冒险的保留并喂饱墨鳕帝君，同时支持 pitch counter 如否定之力和微妙。手牌数量对 pitch counter 和灵能蛙很有价值。`,
      `弓手对波洛斯（2026）：这是对抗波洛斯能量的最佳单卡。它惩罚灵魂向导、电镀放电和他们的抓牌引擎。把反击留给未来的生物，而不是当前的。`,
      `记入记忆（2026）：可以反击克撒传的构造体异能（即使规则更改后）。对播种菌生体的搜寻异能使用记入记忆可阻止灵魂洞窟进入战场。`,
      `塔米欧换下：对抗有弗拉格的套牌时（波洛斯能量、领域动物园）务必换下塔米欧。弗拉格的逃逸触发会杀死她。对抗波洛斯能量时换下塔米欧和奥克弓手，换入严厉斥责+工程炸药。`,
      `迅咒法师协同：一旦严厉斥责或记入记忆进入套牌，迅咒法师就是一张经常换入的磨牌牌。对抗弗拉格时换下塔米欧后，它也是另一个好的忍者术选项。`,
    ],
    sources: [
      { title: 'Dimir Frogtide Sideboard Guide (RIW Hobbies, June 2025)', url: 'https://riwhobbies.com/dimir-frogtide-sideboard-guide/', author: 'Kyle' },
      { title: 'Modern Grixis Froggler & Sideboard Guide (RIW Hobbies, Dec 2025)', url: 'https://riwhobbies.com/modern-grixis-froggler-sideboard-guide/' },
      { title: 'Pro Tour Edge of Eternities Metagame Breakdown (March 2026)', url: 'https://magic.gg/news/metagame-mentor-modern-winners-and-lessons-from-pro-tour-edge-of-eternities', author: 'Wizards of the Coast' },
      { title: 'Modern Meta Tier List - May 2026 (Playing MTG)', url: 'https://playingmtg.com/modern-meta-tier-list/' },
      { title: 'January 2026 Modern Metagame Update (Quiet Speculation)', url: 'https://www.quietspeculation.com/2026/02/january-26-metagame-update-more-of-the-same/' },
    ],
  },
};

export function getDeckGuide(deckName: string): DeckGuide | null {
  return DECK_GUIDES[deckName] || null;
}
