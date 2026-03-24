// Origin (race) traits from Five Leagues from the Borderlands rulebook

const ORIGIN_TRAITS = {
  human: {
    name: 'Human',
    traits: [
      { name: 'Skill Expertise', desc: '+1 to all [Speech] tests.' },
      { name: 'Driven', desc: 'Only characters that can ever attain more than 1 Will. If a Human Hero obtains a Will increase from Advancement, immediately gain 2 XP.', combat: false },
    ],
  },
  'fey-blood': {
    name: 'Fey-blood',
    traits: [
      { name: 'Skill Expertise', desc: '+1 to all [Wits] tests.' },
      { name: 'Foresight', desc: 'If assigned initiative die is above Agility, may reroll it. New roll must stay assigned.', combat: true },
      { name: 'Aura of Winter', desc: 'Melee opponents cannot gain Combat Bonus for allies.', combat: true },
      { name: 'Cursed', desc: 'Cannot ever attain Luck points. Treat Luck increase as a skill instead.', combat: false },
    ],
  },
  duskling: {
    name: 'Duskling',
    traits: [
      { name: 'Skill Expertise', desc: '+1 to all [Traveling] tests.' },
      { name: 'Brute Charge', desc: 'When moving into melee: cannot Parry; may choose to reroll die in first exchange.', combat: true },
      { name: 'Oath of Life', desc: 'In melee against undead, receive Counter Attack ability.', combat: true },
      { name: 'Distrust', desc: 'Cannot have spells cast on them by warband. May carry only a single magical item at any time.', combat: true },
    ],
  },
  preen: {
    name: 'Preen',
    traits: [
      { name: 'Skill Expertise', desc: '+1 to all [Crafting] tests.' },
      { name: 'Outburst', desc: 'Become Angry if ally within 6" becomes a casualty or is Hit by ranged/targeted by a spell. When Angry, must move full Speed+Dash towards nearest enemy and engage melee. If weapon is -1/+0 or +0/+0, treat as +0/+1. Ceases being Angry at end of activation.', combat: true },
      { name: 'Swift-footed', desc: 'Increase Speed by +0"/+1".', combat: true },
      { name: 'Slight', desc: 'Cannot use higher ground for Counter Attack.', combat: true },
    ],
  },
  halfling: {
    name: 'Halfling',
    traits: [
      { name: 'Skill Expertise', desc: '+1 to all [Wilderness] tests.' },
      { name: 'Lucky Shot', desc: 'When shooting, hit concealed/Cover targets on 5+.', combat: true },
      { name: 'Slip Away', desc: 'Never roll on Flight in the Dark Table.', combat: false },
      { name: 'Lacking Strength', desc: 'Cannot use warhammers, bastard swords, or longbows.', combat: true },
    ],
  },
  feral: {
    name: 'Feral',
    traits: [
      { name: 'Skill Expertise', desc: '+1 to all [Scouting] tests.' },
      { name: 'Hunting Instincts', desc: '+1 to Defensive Battle spotting roll. -1 to enemy spotting roll during Raid Sneak Up.', combat: true },
      { name: 'Loping Run', desc: 'May move full move and still make ranged attacks (half if weapon normally prohibits movement).', combat: true },
      { name: 'Alien', desc: 'Only +1 bonus (not +2) from Leadership, Speech, and Scholar skills on proficiency tests.', combat: false },
    ],
  },
}

/**
 * Look up origin traits by name (case-insensitive, fuzzy).
 * Returns the origin object or null.
 */
export function lookupOrigin(originName) {
  if (!originName) return null
  const n = originName.toLowerCase().trim().replace(/[-\s]/g, '')
  for (const [key, origin] of Object.entries(ORIGIN_TRAITS)) {
    const normalized = key.replace(/[-\s]/g, '')
    if (n === normalized || n.includes(normalized) || normalized.includes(n)) {
      return origin
    }
  }
  return null
}

export default ORIGIN_TRAITS
