// Five Leagues from the Borderlands — Rules & Skills Reference Data
// Extracted from rulebook/*.txt files. Each entry has: id, name, tag, desc.
// Tags: "rule" | "skill"

const rulesData = [
  // ============================================================
  // COMBAT RULES — from combat_rules.txt
  // ============================================================
  {
    id: "rule-battle-round",
    name: "The Battle Round",
    tag: "rule",
    desc: "Each battle round has 5 phases in order: (1) Initiative Roll, (2) Quick Actions Phase, (3) Enemy Actions Phase, (4) Slow Actions Phase, (5) Tracking Phase. Every character acts every round; the roll only determines which phase."
  },
  {
    id: "rule-initiative",
    name: "Initiative Roll",
    tag: "rule",
    desc: "Roll one D6 per warband character/ally on the table and assign each die to a character. Die result ≤ Agility → Quick Actions Phase. Die result > Agility → Slow Actions Phase. All enemies act in the Enemy Actions Phase."
  },
  {
    id: "rule-actions",
    name: "Actions",
    tag: "rule",
    desc: "When activated, a character takes a Move Action then either a Combat Action (melee or ranged attack) or a Non-Combat Action (Dash, Use, Ready Weapon, Casting, Interact, Keep Down!, Anticipate). Cannot reorder to take Move last. May skip any action. In the Enemy phase, ranged enemies activate before melee."
  },
  {
    id: "rule-action-dash",
    name: "Non-Combat Action: Dash",
    tag: "rule",
    desc: "Full-move action. Character moves an additional distance equal to their Dash bonus. Cannot enter melee by Dashing. Enemies Dash when in the open moving to Cover or advancing on a foe. Undead, Monsters, and Aberrations cannot Dash."
  },
  {
    id: "rule-action-use",
    name: "Non-Combat Action: Use",
    tag: "rule",
    desc: "Full-move action. Use one item from inventory."
  },
  {
    id: "rule-action-ready-weapon",
    name: "Non-Combat Action: Ready Weapon",
    tag: "rule",
    desc: "Full-move action. Retrieve a weapon from the Backpack or return one to it."
  },
  {
    id: "rule-action-casting",
    name: "Non-Combat Action: Casting",
    tag: "rule",
    desc: "Full-move action. A Mystic casts one spell. Only one spell may be cast per round even if the character has multiple actions."
  },
  {
    id: "rule-action-interact",
    name: "Non-Combat Action: Interact",
    tag: "rule",
    desc: "Half-move action. Used for scenario objectives: cut a rope, pick a lock, search an area, activate a lever, etc."
  },
  {
    id: "rule-action-keep-down",
    name: "Non-Combat Action: Keep Down!",
    tag: "rule",
    desc: "Move up to 1\". Place a marker on the character. Grants Cover from all ranged attacks made from more than 6\" away, until the character's next activation."
  },
  {
    id: "rule-action-anticipate",
    name: "Non-Combat Action: Anticipate",
    tag: "rule",
    desc: "Move up to 1\" and place an Anticipate marker. Next round, roll one fewer die for initiative. This character automatically acts in the Quick Actions Phase next round."
  },
  {
    id: "rule-tracking-phase",
    name: "Tracking Phase",
    tag: "rule",
    desc: "End-of-round activities resolved in order: (1) warband-related features, (2) enemy-related features, (3) scenario/event features, (4) anything else. Includes enemy Morale checks. Within each step the player chooses resolution order."
  },
  {
    id: "rule-movement",
    name: "Movement",
    tag: "rule",
    desc: "Movement allowance equals Speed in inches. Difficult terrain: each 1\" moved costs 2\" of allowance. Opening a door or window costs 1\" of movement. Cannot move through another figure unless a rule explicitly permits it."
  },
  {
    id: "rule-moving-and-shooting",
    name: "Moving and Shooting",
    tag: "rule",
    desc: "A character making a ranged attack may move up to half their Speed beforehand. Crossbow users must be completely stationary to shoot."
  },
  {
    id: "rule-movement-vertical",
    name: "Moving Vertically",
    tag: "rule",
    desc: "Pay vertical height in inches of movement. Cannot end a move mid-climb. Dropping ≤1\" is free. Dropping >1\" requires climbing down or jumping. Falls deal: up to 3\"= +1/+0; up to 5\"= +2/+1; up to 8\"= +3/+2; over 8\" = automatic casualty. Jumping/falling >1\" means no further Actions this round. May leap a 2\" gap as normal movement."
  },
  {
    id: "rule-melee-contact",
    name: "Moving into Base Contact",
    tag: "rule",
    desc: "Bases touching (or within 0.5\" for dramatic poses) triggers melee immediately. Figures that are Dashing cannot enter melee."
  },
  {
    id: "rule-lines-of-sight",
    name: "Lines of Sight",
    tag: "rule",
    desc: "True Line of Sight. Blocked by Block and Individual terrain features. Area terrain: LoS passes through up to 3\" only. Linear terrain: LoS blocked 3\" beyond, unless shooter or target is within 1\" of the crossing point. When in doubt about visibility: allow the shot. When in doubt about Cover: count as Cover."
  },
  {
    id: "rule-cover",
    name: "Cover",
    tag: "rule",
    desc: "A figure is in Cover if: (1) the LoS crosses terrain more than 1\" from the shooter, (2) the target is within an Area feature, or (3) the target is in contact with the corner of Block terrain."
  },
  {
    id: "rule-ranged-combat",
    name: "Ranged Combat",
    tag: "rule",
    desc: "Select a visible target in range. If visible opponents are within 3\", must shoot the nearest. To Hit (D6): within 6\" in the open = 3+; within weapon range in the open = 5+; within range, concealed/in Cover = 6+. Stationary shooter adds their Combat Skill to the roll. A natural 1 always misses. Limited Ammunition: a natural 1 to Hit (not the first shot of battle) means out of ammo."
  },
  {
    id: "rule-melee-combat",
    name: "Melee Combat",
    tag: "rule",
    desc: "A melee consists of up to 3 exchanges. The initiating figure is the Attacker in the first exchange. Each exchange: (1) select weapon (1st exchange only), (2) optionally select a tactic (applies all exchanges), (3) both roll D6 + Combat Skill — higher result wins. Attacker higher: strikes a blow, stays Attacker. Defender higher: avoids harm, becomes Attacker. Tie: Defender retreats 1\", melee ends. After 3 exchanges, melee ends and each figure moves 1\" apart."
  },
  {
    id: "rule-melee-tactics",
    name: "Melee Tactics",
    tag: "rule",
    desc: "Optional tactic chosen at start of melee (applies all exchanges). Fight Defensively: roll twice, pick best result, inflict no Hits, negates Counter Attack. Fight Evasively: roll normally, inflict no Hits, may move 2\" ending the melee, negates Counter Attack. Fight Furiously (attacker only): roll normally; if you win, add +1 to Overcome Armor OR Toughness; if you lose, suffer a Hit."
  },
  {
    id: "rule-melee-push",
    name: "The Push (Melee)",
    tag: "rule",
    desc: "If the Defender lost an exchange, they retreat 1\". The Attacker may stay (ending the melee) or step up 1\" (continuing). Enemies always step up. Back to the Wall: if the Defender cannot retreat, they stay in place, become Stunned, and the melee continues with one extra exchange."
  },
  {
    id: "rule-combat-bonus",
    name: "Combat Bonus",
    tag: "rule",
    desc: "+1 to Combat Skill if: the opponent is Stunned, OR the character has an ally within 1\". In a confined space or doorway, neither side gets the ally bonus. Only one Combat Bonus per character per exchange."
  },
  {
    id: "rule-counter-attack",
    name: "Counter Attack",
    tag: "rule",
    desc: "A character with Counter Attack may strike a Hit when winning an exchange even as the Defender. Granted by: higher ground, fighting across an obstacle, opponent in Difficult terrain or water, or a specific weapon/trait."
  },
  {
    id: "rule-parry",
    name: "Parry",
    tag: "rule",
    desc: "If a character with Parry rolls a natural 1 when defending in melee, the blow is deflected — no damage, no Stun, no effects apply. Multiple Parry sources provide no additional benefit."
  },
  {
    id: "rule-hits",
    name: "Hits",
    tag: "rule",
    desc: "Damage from any source is a Hit, written as +x/+y (Overcome Armor bonus / Overcome Toughness bonus), defaulting to +0/+0. Step 1: Overcome Armor (skip if Armor 0) — roll D6 + Armor bonus. Total > Armor: proceed. Total = Armor: Stunned, attack fails. Total < Armor: attack fails. Step 2: Overcome Toughness — roll D6. Natural 1 = Stunned only. 2–6: add Toughness bonus. Total > Toughness = casualty (removed from table). Total ≤ Toughness = Wounded and Stunned."
  },
  {
    id: "rule-stunned",
    name: "Stunned",
    tag: "rule",
    desc: "A Stunned character has lost balance or is knocked senseless. Must fight as the Defender, and the opponent gains a +1 Combat Bonus. Recovers after an exchange unless Stunned again. Automatically recovers at the end of the phase."
  },
  {
    id: "rule-wounded",
    name: "Wounded",
    tag: "rule",
    desc: "A Wounded character may continue acting normally. Being Wounded a second time removes the character as a casualty. Wounds do not carry over to future battles."
  },
  {
    id: "rule-casualty",
    name: "Casualty",
    tag: "rule",
    desc: "A character removed as a casualty during battle rolls D100 on the Injury Table after the battle. Heroes: 01–20 Dead (+1 SP), 21–30 Serious (roll 2D6 pick highest recovery turns), 31–40 Moderate (D6), 41–60 Light (D3), 61–75 Item Damage, 76–100 Knocked Out. Followers: 01–30 Dead, 31–60 Moderate, 61–75 Item Damage, 76–100 Knocked Out."
  },
  {
    id: "rule-enemy-morale",
    name: "Enemy Morale",
    tag: "rule",
    desc: "In the Tracking Phase, roll D6 for each enemy removed as a casualty that round. Natural 1s and 2s are Morale Failures. For each failure, remove one enemy (closest to the enemy edge first). Leaders don't run unless fewer than 4 enemy figures remain on the table. Aberrations and Undead fight to the death. Unknown Enemy markers and Unaware enemies are unaffected."
  },
  {
    id: "rule-character-morale",
    name: "Character Morale (Retreating)",
    tag: "rule",
    desc: "Player forces never test Morale. Any character within 1\" of the battlefield edge may voluntarily retreat — remove them from the table. They cannot return. Retreating may require a Flight in the Dark roll."
  },
  {
    id: "rule-flight-in-the-dark",
    name: "Flight in the Dark",
    tag: "rule",
    desc: "Heroes who retreat roll D100: 01–05 Slain while fleeing (lost with all items), 06–20 Injured while fleeing (D6 recovery turns), 21–35 Lost equipment (random item lost), 36–50 Item damage, 51–100 Escaped unscathed. Followers: 01–10 Slain, 11–30 Injured (D6), 31–45 Lost equipment, 46–60 Item damage, 61–100 Escaped unscathed. Halflings never roll on this table."
  },
  {
    id: "rule-proficiency-tests",
    name: "Proficiency Tests",
    tag: "rule",
    desc: "Roll 2D6 vs a target number. An applicable skill adds +2. If multiple listed skills qualify, any one works but only one +2 bonus applies. Mystics receive only +1 from skills on proficiency tests (except Alchemy). Only one equipment bonus per test; single-use items must be declared before rolling. Equal or above = success."
  },
  {
    id: "rule-story-points",
    name: "Story Points",
    tag: "rule",
    desc: "Begin the campaign with some Story Points; earn more over time. Two uses: Narrative — pay 1 SP to make something happen (encounter a specific enemy, have an old friend appear, add a location). Should not award magic items. Mechanical — avoid an attack or spell that just struck you, OR reroll any die (keep either result; no third roll). Cannot affect Enemy Plans rolls."
  },
  {
    id: "rule-will-points",
    name: "Will Points",
    tag: "rule",
    desc: "Humans can have 1+ Will; non-humans max 1. Will is regained at the end of each encounter. Spend 1 Will to: move an additional 4\" after a normal move; activate in the Quick Actions Phase regardless of initiative roll; remove Stunned and gain initiative at the end of a melee exchange; add +2 to a proficiency test (declare before rolling, cumulative with all other bonuses)."
  },
  {
    id: "rule-luck-points",
    name: "Luck Points",
    tag: "rule",
    desc: "Characters with Luck points apply them when rolling post-game injuries. Each point saves from one injury result (permanent expenditure). Fey-blood characters can never gain Luck; treat any Luck increase as a skill instead."
  },
  {
    id: "rule-terrain-types",
    name: "Terrain Types",
    tag: "rule",
    desc: "Linear: long features (hedgerows, fences, walls). Area: covers space, figures placed within (forest, bushes, rubble) — may be Difficult. Field: ground-level area (mud, water, lava) — may be Difficult or Impassable. Individual: single piece, can't climb (barrels, trees, statues). Block: can be climbed but not entered (boulders, locked buildings). Interior: enclosed, can be entered (buildings, tunnels, caves)."
  },
  {
    id: "rule-unknown-enemy-markers",
    name: "Unknown Enemy Markers",
    tag: "rule",
    desc: "Token roughly figure-base sized. Moves 5\"/round toward the center, then a random direction. Spotted when a warband figure is within 6\" (partially obscured) or 9\" (unobscured LoS). When spotted, roll D6: 1 = 1 foe, 2 = 2, 3–4 = 3, 5 = 4, 6 = 5. Always melee type. Place in/behind Cover."
  },

  // ============================================================
  // CHARACTER CREATION — SKILLS — from character_creation.txt
  // ============================================================
  {
    id: "skill-battlewise",
    name: "Battlewise",
    tag: "skill",
    desc: "Covers battlefield objectives and Seizing Initiative. Adds +2 to relevant proficiency tests."
  },
  {
    id: "skill-crafting",
    name: "Crafting",
    tag: "skill",
    desc: "Covers repairs, manual labor, and haggling. Adds +2 to relevant proficiency tests. (Mystics receive only +1 on most tests, but Alchemy is the full +2 exception.)"
  },
  {
    id: "skill-devotion",
    name: "Devotion",
    tag: "skill",
    desc: "Covers blessings, rituals, and resisting hostile spells. Adds +2 to relevant proficiency tests."
  },
  {
    id: "skill-expertise",
    name: "Expertise",
    tag: "skill",
    desc: "Covers dexterity, discretion, and avoiding hazards. Adds +2 to relevant proficiency tests."
  },
  {
    id: "skill-leadership",
    name: "Leadership",
    tag: "skill",
    desc: "Covers inspiring action and trust, and recruiting new members. Adds +2 to relevant proficiency tests. (Feral characters receive only +1 from this skill.)"
  },
  {
    id: "skill-pathwise",
    name: "Pathwise",
    tag: "skill",
    desc: "Covers navigation and avoiding obstacles while traveling. Adds +2 to relevant proficiency tests."
  },
  {
    id: "skill-scholar",
    name: "Scholar",
    tag: "skill",
    desc: "Covers obscure knowledge. Adds +2 to relevant proficiency tests. (Feral characters receive only +1 from this skill.)"
  },
  {
    id: "skill-scouting",
    name: "Scouting",
    tag: "skill",
    desc: "Covers awareness of enemies and terrain. Adds +2 to relevant proficiency tests. Feral characters add +1 to Defensive Battle spotting rolls and impose -1 to enemy spotting rolls during Raid Sneak Up."
  },
  {
    id: "skill-speech",
    name: "Speech",
    tag: "skill",
    desc: "Covers negotiation, persuasion, and understanding motivations. Adds +2 to relevant proficiency tests. (Feral characters receive only +1 from this skill.)"
  },
  {
    id: "skill-traveling",
    name: "Traveling",
    tag: "skill",
    desc: "Covers overcoming wilderness hazards while on the road. Adds +2 to relevant proficiency tests."
  },
  {
    id: "skill-wilderness",
    name: "Wilderness",
    tag: "skill",
    desc: "Covers hunting and foraging for herbs. Adds +2 to relevant proficiency tests."
  },
  {
    id: "skill-wits",
    name: "Wits",
    tag: "skill",
    desc: "Covers deception, guile, risk-taking, and trap evasion. Adds +2 to relevant proficiency tests."
  },

  // ============================================================
  // CHARACTER CREATION — ORIGINS — from character_creation.txt
  // ============================================================
  {
    id: "origin-human",
    name: "Origin: Human",
    tag: "rule",
    desc: "Backgrounds: Townsfolk, Noble, Frontier, or Zealot. +1 to all Speech tests. Driven: the only characters who can ever attain more than 1 Will. When a Human Hero gains a Will increase from Advancement, immediately gain 2 XP as well."
  },
  {
    id: "origin-fey-blood",
    name: "Origin: Fey-blood",
    tag: "rule",
    desc: "Background: must select Outsider. +1 to all Wits tests. Foresight: if assigned an initiative die above Agility, may reroll it once (new roll is kept). Aura of Winter: melee opponents cannot gain a Combat Bonus for nearby allies. Cursed: can never attain Luck points — treat any Luck increase as a skill instead."
  },
  {
    id: "origin-duskling",
    name: "Origin: Duskling",
    tag: "rule",
    desc: "Background: must select Outsider. +1 to all Traveling tests. Brute Charge: when moving into melee, cannot Parry but may reroll the die in the first exchange. Oath of Life: in melee against Undead, gains Counter Attack. Distrust: cannot have warband spells cast on them; may carry only one magical item at a time."
  },
  {
    id: "origin-preen",
    name: "Origin: Preen",
    tag: "rule",
    desc: "Background: must select Townsfolk. +1 to all Crafting tests. Outburst: becomes Angry when an ally within 6\" becomes a casualty or is hit by ranged/targeted by a spell. When Angry and activated, must move full Speed+Dash toward the nearest enemy and engage in melee; a -1/+0 or +0/+0 weapon is treated as +0/+1 while Angry. Anger ends at the end of the activation. Swift-footed: Speed increased by +0\"/+1\". Slight: cannot use higher ground to gain Counter Attack."
  },
  {
    id: "origin-halfling",
    name: "Origin: Halfling",
    tag: "rule",
    desc: "Background: must select Frontier. +1 to all Wilderness tests. Lucky Shot: when shooting, hits a concealed/Cover target on a 5+ (not 6+). Slip Away: never rolls on the Flight in the Dark Table. Lacking Strength: cannot use warhammers, bastard swords, or longbows."
  },
  {
    id: "origin-feral",
    name: "Origin: Feral",
    tag: "rule",
    desc: "Background: must select Outsider. +1 to all Scouting tests. Hunting Instincts: +1 to Defensive Battle spotting roll; -1 to enemy spotting roll during Raid Sneak Up. Loping Run: may move full Speed and still make ranged attacks (half movement if the weapon normally prohibits any movement). Alien: receives only +1 (not +2) from Leadership, Speech, and Scholar skills on proficiency tests."
  },

  // ============================================================
  // CHARACTER CREATION — GENERAL RULES — from character_creation.txt
  // ============================================================
  {
    id: "rule-ability-scores",
    name: "Ability Scores",
    tag: "rule",
    desc: "Agility: determines when character acts (phase). Speed: base movement (inches) + Dash bonus — e.g., 4\"/+3\" means 4\" normal, 7\" when Dashing. Combat Skill: added to D6 in combat. Toughness: resilience; rolling greater than Toughness = incapacitating injury. Mystics also have a Casting score (starts +0). Enemies have Armor instead of Agility."
  },
  {
    id: "rule-hero-types",
    name: "Character Types",
    tag: "rule",
    desc: "Heroes: cornerstones of the warband, increased survival, can use any weapons, improve quickly. Avatar: player stand-in, acts as Hero with extra benefits (1 extra Will + 1 Luck, never leaves involuntarily). Mystics: spell-casting Heroes with a Casting score. Followers: hired hands, less skilled, less permanent. Friends: off-table supporters. Enemies: game-controlled; leaders ranked Sergeant → Lieutenant → Captain."
  },
  {
    id: "rule-avatar",
    name: "The Avatar",
    tag: "rule",
    desc: "One Hero is designated the Avatar (player stand-in). Gains +1 Will and +1 Luck at start. Never leaves the warband involuntarily. Roll D100 on the Avatar History Table at creation for a bonus. If the Avatar dies: no new Avatar until a new campaign; roll 2D6 at campaign start — on 9+ the Avatar returns."
  },

  // ============================================================
  // RESOLUTION & ADVANCEMENT — from resolution_and_advancement.txt
  // ============================================================
  {
    id: "rule-hold-the-field",
    name: "Hold the Field",
    tag: "rule",
    desc: "All enemies are removed from the table (through casualties or Morale). Holding the Field triggers: a D100 roll on the Unusual Finds Table, and grants +1 XP to all Heroes who were on the table (cannot be combined with Achieve Objective XP in the same battle)."
  },
  {
    id: "rule-achieve-objective",
    name: "Achieve the Objective",
    tag: "rule",
    desc: "Completing the scenario-specific objective grants: 1 Loot Table roll and +1 XP to all Heroes on the table (cannot be combined with Hold the Field XP). If fighting a Threat, achieving the objective lets you attempt an Adventure Milestone to reduce the Threat level."
  },
  {
    id: "rule-injury-table",
    name: "Injury Table",
    tag: "rule",
    desc: "Characters removed as casualties roll D100 after battle. Heroes: 01–20 Dead (+1 SP to warband), 21–30 Serious (roll 2D6, pick highest = recovery turns), 31–40 Moderate (D6 turns), 41–60 Light (D3 turns), 61–75 Item Damage (random weapon/armor Damaged), 76–100 Knocked Out (no effect). Followers: 01–30 Dead, 31–60 Moderate, 61–75 Item Damage, 76–100 Knocked Out. Luck points can be permanently spent to ignore one result. A Silvertree Leaf allows rerolling the Hero Injury Table (not Flight in the Dark); new result stands — if they would have died, add D3 recovery turns instead."
  },
  {
    id: "rule-experience-points",
    name: "Experience Points (XP)",
    tag: "rule",
    desc: "XP awarded after each encounter: +1 XP for surviving the encounter (all participants). +1 XP for the Hero who delivers the killing blow to an enemy Leader. Aberration kills: XP = Aberration Reward Rating (distributed among Heroes). +1 XP for Holding the Field OR Achieving the Objective (not both). Advancement thresholds: 4, 9, 15, 22, 30 (Loyal), 39, 50, 65, 80, 95, 110, 125, 140, then +15 per further advancement."
  },
  {
    id: "rule-advancement",
    name: "Advancement",
    tag: "rule",
    desc: "When an XP threshold is reached, roll D100 on the Advancement Subtable. Non-Mystic: 01–30 Speed increase or skill; 31–50 Agility or Toughness increase; 51–85 Combat Skill increase; 86–100 Luck or Will increase. Mystic: 01–20 Skill; 21–40 Agility or Speed; 41–55 Casting or Will; 56–80 Casting; 81–100 Spell Improvement. If the rolled category is maxed, pick the other; if both maxed, choose any skill. At 30 XP the character becomes Loyal. At 65 XP an Enemy Plans roll is triggered. At 95 XP a Quest is obtained. At 125 XP the warband may add one extra Recruit."
  },
  {
    id: "rule-advancement-details",
    name: "Advancement Maximums",
    tag: "rule",
    desc: "Speed: increments to 6\"/+3, 6\"/+4, 7\"/+4. Agility: 1st→2, 2nd→3, 3rd→4. Toughness: 1st→4, 2nd→5, 3rd→6. Combat Skill: +1, +2, +3 (melee or ranged only). Casting: +1, +2, +3. Luck: each increase = 1 point. Will: 1st→1, 2nd→2 (Human only), 3rd→3 (Human only). Spell Improvement (4 steps): new random spell, known spell −2 Incantation, start battle with 4 Strands, new random spell."
  },
  {
    id: "rule-follower-advancement",
    name: "Follower Advancement (Flash of Insight)",
    tag: "rule",
    desc: "After each encounter, roll D100 per Follower. 01–55: nothing. 56–70: gains a skill if they have none. 71–85: gains a skill of choice. 86–95: becomes a Hero (no other changes). 96–100: becomes a Hero plus one Advancement roll. Promoted Followers become Loyal."
  },
  {
    id: "rule-loot",
    name: "Loot",
    tag: "rule",
    desc: "Roll on the Loot Table when: Achieving the Objective (1 roll), killing Aberrations (rolls equal to Reward Rating), or from scenario/enemy bonuses. Clearing a Threat: 1 Loot roll + 1 SP. Clearing the entire Region: +1D6 SP + 2D6 Gold Marks."
  },
  {
    id: "rule-unusual-finds",
    name: "Unusual Finds",
    tag: "rule",
    desc: "If the warband Holds the Field, roll D100 on the Unusual Finds Table (type varies by scenario). Results include: nothing, battered weapons, coins, victim remains, captive, excellent weapon, valuable goods, tracks, strange sack, personal item, key individual slain, lead to a location, grateful volunteer, or evidence of a plot."
  },
  {
    id: "rule-adventure-points",
    name: "Adventure Points (AP)",
    tag: "rule",
    desc: "Track AP per region (reset when leaving). Earn: Victorious vs. Enemy Threat or Raid = D6; Ride Patrol = 1; Defeat Aberration = 1 per Aberration; Defeat Unique Foe = 2; Defeat Lieutenant or Captain = 1; Finish Contract = 1. Various event bonuses also apply."
  },
  {
    id: "rule-adventure-milestones",
    name: "Adventure Milestones",
    tag: "rule",
    desc: "Spend 1–6 AP from the pool. Roll D6: if result ≤ points spent = achieved. Points are lost either way. Uses (each type once per turn, multiple types OK): Locate Hidden Location, Gather Money, Upgrade Settlement, Reduce Threat, Promote Follower."
  },
  {
    id: "rule-news-travels",
    name: "News Travels",
    tag: "rule",
    desc: "After each encounter resolution, roll D100 on the News Table. Results include: unexplored locations, monster sightings, Threat level changes, quests, and other campaign events."
  },

  // ============================================================
  // CAMPAIGN STRUCTURE — from campaign_structure.txt
  // ============================================================
  {
    id: "rule-campaign-turn-structure",
    name: "Campaign Turn Structure",
    tag: "rule",
    desc: "Each campaign turn has 4 stages in order: (1) Preparation — local events, upkeep, campaign activities, trade, research, decide adventure, outfit. (2) Adventuring — travel and choose an activity. (3) Encounter — play out battles. (4) Resolution — collect AP, check injuries, advancement, loot, unusual finds, settle in, news."
  },
  {
    id: "rule-upkeep",
    name: "Upkeep Costs",
    tag: "rule",
    desc: "Paid during Preparation (Step 2: Hard Times). Warband size 1–6 = D3 Gold Marks; 7–8 = D3+1; 9–10 = D6; 11+ = D6+1. If you cannot pay: a random member becomes Disgruntled, or loses Loyal status, or a Disgruntled member leaves. Healing: if upkeep is paid, all recovering characters reduce recovery by 1 turn. If not paid, only 1 character heals. Tonics cut 1 additional recovery turn."
  },
  {
    id: "rule-preparation-stage",
    name: "Preparation Stage",
    tag: "rule",
    desc: "Steps: (1) Roll D100 on Town Events (if in Town) or Camp Events table. (2) Pay upkeep and heal. (3) Choose 2 Campaign Activities. Settlement only: Blacksmith, Gamble, Hard Work, Help Town Guard, Meet Locals, Recruit, Visit Healer. Camp only: Forage Herbs, Hunting Expedition, Live off Land, Mystic Expedition, Scout. Either: Pray, Study, Train. (4) Trade (settlement only). (5) Research. (6) Decide your adventure. (7) Outfit for the adventure (Backpack holds 8 items)."
  },
  {
    id: "rule-threat-mechanics",
    name: "Threat Mechanics",
    tag: "rule",
    desc: "Campaign starts with 3 Threats: 2 Foes Within (Ruin Within, Whispers from Beyond, Gnawling Horde, Ice-heart Court) and 1 Foe Without (Duskling, Oldest Kin, Curse of War, Faceless Kingdom). Primary Threat starts at level 6; others at level 5. Goal: reduce all to 0 and destroy all Hideouts. Each Threat has 1 Hidden Hideout (not on map until discovered). Failing Threat End Goal can increase level or trigger Enemy Plans."
  },
  {
    id: "rule-enemy-plans",
    name: "Enemy Plans",
    tag: "rule",
    desc: "Triggered at key points (8th advancement, certain Threat events). Roll D100. Cannot be affected by Story Points. Results range from gathering weapons (01–07) to dark rituals (96–100) and have lasting campaign consequences."
  },
  {
    id: "rule-settlement-types",
    name: "Settlement Types",
    tag: "rule",
    desc: "Scattered Farming Community: upkeep max 2 GM. Military Outpost: +1 Recruit roll. Nomadic Camp: can conduct Hunting Expeditions here. Monastery: +1 Study roll. Manor: blacksmith repairs 2 items. Market Town: +1 AP on first visit. Trading Hub: pay 1 GM for an extra Rare Goods roll per turn."
  },
  {
    id: "rule-two-battles-one-turn",
    name: "Two Battles in One Turn",
    tag: "rule",
    desc: "If a battle occurs while traveling: complete Resolution normally, may use healing items, select 1 injured character to reduce recovery by 1 turn, must complete all encounters before the next turn, enemy numbers -1 for the second battle. Ignore any suggested 3rd battle while traveling."
  },

  // ============================================================
  // ADVENTURES & TRAVEL — from adventures_and_travel.txt
  // ============================================================
  {
    id: "rule-travel",
    name: "Travel",
    tag: "rule",
    desc: "Required when moving between Map Areas. Roll D100 on the Travel Events Table: 01–30 Uneventful; 31–50 Traveler Encounter; 51–65 See something (add Unexplored Location, may go there instead); 66–75 Waylaid (Defensive Battle vs Roadside Enemies); 76–85 Miserable weather (9+ [Traveling] or forced to Camp); 86–95 Obstacle (roll Obstacle Table); 96–100 Lost (Traveler Encounter, Camp, must Travel again next turn). Moving within the same Map Area requires no Travel roll."
  },
  {
    id: "rule-travel-obstacles",
    name: "Travel Obstacles",
    tag: "rule",
    desc: "Roll D100 on Obstacle Table when Travel result is 86–95: 01–20 River crossing (8+ [Traveling] or lose random Backpack item); 21–35 Marsh (9+ [Scouting] or lose random weapon/shield); 36–50 Broken ground (arrive but can't act further; 8+ [Traveling] to reach settlement); 51–65 Toll post (9+ [Speech], pay 2 GM, or re-roll Travel); 66–90 Deep woods (8+ [Pathwise] or lost, Camp, Travel again); 91–100 Unnatural terrain (Meeting Engagement vs Lurking Foes, Unknown Enemy, no Loot/AP, arrive but must Camp)."
  },
  {
    id: "rule-ride-patrol",
    name: "Ride Patrol",
    tag: "rule",
    desc: "Lower-risk adventure option. No Travel roll needed. Roll D100: 01–15 Traveler Encounter; 16–65 Meeting Engagement vs Roadside Enemies (Unknown Enemy); 66–80 Traveler Encounter, then if no battle/Contract/Quest, a Meeting Engagement vs Roadside; 81–90 Signs of danger — fight a random Threat (Meeting Engagement, Unknown Enemy) or roll Enemy Plans; 91–100 Wanderer says something odd — add an Unexplored Location, may explore it immediately. Earns 1 AP on victory."
  },
  {
    id: "rule-battle-enemy-threat",
    name: "Battle the Enemy Threat",
    tag: "rule",
    desc: "Select a Threat to engage. Roll on 3 tables: Location (D6): 1–3 current Map Area, 4 near largest settlement, 5 near random settlement, 6 in Wilderness (Travel required). Activity (D6): preparing to attack villagers, waiting in ambush, returning from raid, passing through, counting pillage, hunting your warband. End Goal (D6): determines consequences if you fail. Must engage within current or next turn; next turn adds +1 enemy. Can't reach = treated as a loss."
  },
  {
    id: "rule-delves",
    name: "Delves",
    tag: "rule",
    desc: "Multi-level dungeon locations. Each level (Depth) is a separate battle using the Lurking Foes table unless stated otherwise. After each Depth, roll D6: if result is below the completed Depth number, the Delve is cleared. Deeper Depths apply modifiers from the Delve Depth Adjustments table. Scenario type: Site Battle."
  },
  {
    id: "rule-unexplored-locations",
    name: "Unexplored Locations",
    tag: "rule",
    desc: "Known but uninvestigated points on the map (cap at 4 optional). When reached, roll D100: 01–05 Trouble brewing (Enemy Plans); 06–15 Old ruin (+Delve); 16–25 Wilderness (nothing); 26–35 Suspected monster haunt (8+ [Pathwise] = Monster Lair); 36–43 Tunnel complex (+Delve); 44–50 Small community (add hamlet); 51–58 Monster lair; 59–63 Enemy camp; 64–70 Natural resources (+3 GM); 71–75 Fey woods (optional battle vs Ice-heart Court); 76–83 Tracks to lair (optional battle, +2 AP); 84–89 Haunted site (optional battle, +1 SP + Loot roll); 90–94 Isolated community; 95–100 Treasure site (optional battle, 3 extra Loot rolls)."
  },
  {
    id: "rule-contracts",
    name: "Contracts",
    tag: "rule",
    desc: "Generated with two D100 rolls: Source (payment/reward) and Type (task). You may see details before accepting. Multiple Contracts may be active if from different sources. Completing a Contract earns 1 AP. Source rewards: Individual 1 GM + Friend, Friend D3 GM (+1 SP), Townsfolk D3+1 GM, Town Council D6 GM, Secretive Group +3 AP, Local Noble D6+2 GM, Local Clergy D6 GM + 1 AP."
  },
  {
    id: "rule-quests",
    name: "Quests",
    tag: "rule",
    desc: "Multi-encounter connected adventures; not time-sensitive. Structure: a series of tasks. After each task, roll D6 — if result is below the number of completed tasks, the Quest moves to the Finale. Up to 3 Quest Failures are allowed before the Quest ends. Quest Finds (special rewards) roll after tasks 2, 4, and 6. Finale: always in Wilderness, Site Battle with a full enemy force including a Captain and Unique Foe. Must defeat the Captain + Unique Foe OR complete a center ritual (9+ [Devotion]). Two attempts allowed."
  },
  {
    id: "rule-quest-rewards",
    name: "Quest Rewards",
    tag: "rule",
    desc: "Completing a Quest Finale awards: 3 Loot rolls, all Heroes +2 XP, a Boon of the Gods (D6: 1–3 = +1 Luck, 4–6 = +1 Will), and a Quest Talent (roll D100 for a powerful permanent ability)."
  },
  {
    id: "rule-monster-lairs",
    name: "Monster Lairs",
    tag: "rule",
    desc: "Require an 8+ [Scouting] proficiency test to breach (once breached, the lair stays open). Scenario type: Monster Lair (Scenario F). Use the Aberrations/Bestiary rules for inhabitants."
  },

  // ============================================================
  // SPELLS & MAGIC — from spells_and_magic.txt
  // ============================================================
  {
    id: "rule-spell-casting",
    name: "Casting Spells",
    tag: "rule",
    desc: "Requires the Casting Non-Combat Action (full move). Only one spell per round even with multiple actions. Target must be in line of sight unless the spell states otherwise. Roll 2D6 + Casting score vs the spell's Incantation number. Natural 2: fails, 1 Strand expended. Below Incantation: fails, no Strands expended. Equal or above Incantation: succeeds, 1 Strand expended (Simple spells cost no Strands). Natural 12: succeeds, no Strands expended."
  },
  {
    id: "rule-strands",
    name: "Strands",
    tag: "rule",
    desc: "The energy required for casting spells. A Mystic begins each battle with 3 Strands. Unused Strands evaporate at the end of battle. Congealed Strands (an item) can be saved and spent during battle. At the 3rd Spell Improvement advancement, a Mystic starts each battle with 4 Strands instead."
  },
  {
    id: "rule-desperation-casting",
    name: "Desperation Casting",
    tag: "rule",
    desc: "If a casting roll fails, the Mystic may spend 1 Will point to retroactively add +2 to the roll, potentially turning it into a success."
  },
  {
    id: "rule-ether-burn",
    name: "Ether Burn",
    tag: "rule",
    desc: "If a Mystic must expend a Strand but has none remaining, they are Wounded instead. This includes Taxing spells and natural 2 rolls on Simple spells."
  },
  {
    id: "rule-spell-durations",
    name: "Spell Durations",
    tag: "rule",
    desc: "Immediate: takes effect when cast, no lasting effect. Activation: lasts until the caster finishes their next activation. Full Round: lasts until the Tracking Phase of the following battle round. Battle: lasts for the rest of the battle."
  },
  {
    id: "rule-spell-simple-taxing",
    name: "Simple and Taxing Spells",
    tag: "rule",
    desc: "Simple (*): costs no Strands on success (but a natural 2 still costs 1 Strand). Taxing (†): can only be cast once per battle."
  },
  {
    id: "rule-spell-target-types",
    name: "Spell Target Types",
    tag: "rule",
    desc: "Ally: any warband figure or ally (including the Mystic). Personal: only the Mystic. Enemy: any enemy figure. Ground: any point on the ground. None: no target selected."
  },
  {
    id: "rule-mystic-skill-bonus",
    name: "Mystic Proficiency Test Bonus",
    tag: "rule",
    desc: "Mystics receive only +1 (not +2) from skills on proficiency tests, except for the Alchemy skill which provides the full +2 bonus."
  }
];

export default rulesData;
