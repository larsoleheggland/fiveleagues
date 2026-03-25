// Equipment rules/descriptions from the Five Leagues from the Borderlands rulebook.
// Keyed by lowercase item name. Used for info tooltips across the app.

const EQUIPMENT_INFO = {
  // --- Weapons (Basic) ---
  'light weapon': { type: 'Weapon (Basic)', stats: 'Melee, -1/+0', desc: 'A dagger, cudgel, working tool, or similar.' },
  'self bow': { type: 'Weapon (Basic)', stats: 'Ranged 18", +0/+0', desc: 'A light bow often used for hunting. Bulky; Limited Ammunition.' },
  'sling': { type: 'Weapon (Basic)', stats: 'Ranged 12", -1/+0', desc: 'Does not run out of ammunition.' },
  'staff': { type: 'Weapon (Basic)', stats: 'Melee, +0/+0', desc: 'Parry.' },
  'standard weapon': { type: 'Weapon (Basic)', stats: 'Melee, +0/+0', desc: 'A typical short sword, mace, hunting spear, or hatchet.' },

  // --- Weapons (Quality) ---
  'bastard sword': { type: 'Weapon (Quality)', stats: 'Melee, +1/+0', desc: 'Heavy sword for single- or double-handed use. Followers use as +0/+0.' },
  'crossbow': { type: 'Weapon (Quality)', stats: 'Ranged 24", +1/+0', desc: 'Bulky; Limited Ammunition. Cannot move and shoot in the same Action. Followers use as +0/+0.' },
  'fencing sword': { type: 'Weapon (Quality)', stats: 'Melee, +0/+0', desc: 'Parry. Followers use as +0/+0.' },
  'longbow': { type: 'Weapon (Quality)', stats: 'Ranged 24", +0/+0', desc: 'Bulky; Limited Ammunition. Followers use as +0/+0.' },
  'throwing knives': { type: 'Weapon (Quality)', stats: 'Ranged 9", -1/+0', desc: 'Add Combat Skill to hit roll even if moved. Single-use, recovered if you Hold the Field. Followers use as +0/+0.' },
  'warhammer': { type: 'Weapon (Quality)', stats: 'Melee, +1/+0', desc: 'A spiked hammer capable of punching through steel plate. Followers use as +0/+0.' },
  'war spear': { type: 'Weapon (Quality)', stats: 'Melee, +0/+0', desc: 'Wielder may always Counter Attack in melee. Followers use as +0/+0.' },

  // --- Armor ---
  'light armor': { type: 'Armor', stats: 'Armor 1', desc: '' },
  'partial armor': { type: 'Armor', stats: 'Armor 2', desc: 'Movement reduced by -0"/-1".' },
  'full armor': { type: 'Armor', stats: 'Armor 3', desc: 'Movement reduced by -0"/-2".' },
  'knight armor': { type: 'Armor', stats: 'Armor 3', desc: 'Cannot Dash. Enemies cannot benefit from any bonus to Overcome Armor.' },
  'shield': { type: 'Armor', stats: '+1 Armor vs ranged', desc: 'May Parry against melee strikes.' },
  'helmet': { type: 'Armor', stats: '', desc: 'If post-game Injury roll is a double (11, 22, 33...), just knocked out instead. Helmet is Damaged.' },

  // --- Consumables & Backpack Items ---
  'bandages': { type: 'Item (B, S)', stats: '', desc: 'Use Action during battle to negate 1 Wound. If fighting two battles in one turn, allows injured character to take the field (add recovery times).' },
  'brave mule': { type: 'Item (C)', stats: '', desc: 'Carry 1 additional backpack item (total 9). Cannot use multiple mules.' },
  'camp gear': { type: 'Item (B)', stats: '', desc: 'When in camp, +1 to all proficiency tests for campaign activities or camp events.' },
  'rope': { type: 'Item (B, S)', stats: '', desc: 'When making a Wilderness test, reroll one or both dice.' },
  'coil of rope': { type: 'Item (B, S)', stats: '', desc: 'When making a Wilderness test, reroll one or both dice.' },
  'fine black iron': { type: 'Item (B, S)', stats: '', desc: 'Give any one weapon or armor piece the Fine quality.' },
  'dungeoneering kit': { type: 'Item (B, S)', stats: '', desc: 'Auto-pass a failed Wits or Expertise test during a Site Battle.' },
  'foreign wine': { type: 'Item (C)', stats: '', desc: 'Give to a Disgruntled character to remove the status, or sell for D3 Gold Marks.' },
  'hard liquor': { type: 'Item (B, S)', stats: '', desc: '1 point of Will usable during battle. If character already has Will, adds to pool. Lost after battle.' },
  'fine arrows': { type: 'Item (B)', stats: '', desc: 'Increase range of self bow, longbow, or crossbow by +3".' },
  'fine bolts': { type: 'Item (B)', stats: '', desc: 'Increase range of crossbow by +3".' },
  'congealed strand': { type: 'Item (B, S)', stats: '', desc: 'Used in place of a normal Strand for casting. Does not expire until used.' },
  'holy water': { type: 'Item (B, S)', stats: '', desc: 'Use Action, target within 6". Only vs Fey or Undead. Hits automatically with +3/+1 Overcome Armor/Toughness.' },
  'icon': { type: 'Item (W)', stats: '', desc: '+1 to Devotion tests.' },
  'large quiver': { type: 'Item (B)', stats: '', desc: 'One extra ranged weapon shot when ammo runs out.' },
  'map making kit': { type: 'Item (C)', stats: '', desc: 'After traveling between areas, chart a secure route. Skip Travel roll between those locations.' },
  'misty water-flower': { type: 'Item (B, S)', stats: '', desc: 'Casualty from Poison recovers without rolling on Injury Table. No mid-battle effect.' },
  'mystic trinket': { type: 'Item (B, S)', stats: '', desc: 'A Mystic may cast a second spell in the same battle round.' },
  'mystical ring': { type: 'Item (W)', stats: '', desc: 'Worn by a Hero. On XP advancement, roll 2D6: on 11-12, receive a Quest. Bound to first wearer.' },
  'potion of fortune': { type: 'Item (B, S)', stats: '', desc: 'First time character suffers Stun, Wound, or casualty from physical damage, ignore it. No effect on magical attacks.' },
  'potion of endurance': { type: 'Item (B, S)', stats: '', desc: 'Use before encounter. +1 Toughness (max 6) for the battle.' },
  "ranger's cloak": { type: 'Item (W)', stats: '', desc: '+1 to Wilderness and Scouting tests. Not cumulative with skill bonus.' },
  'rations': { type: 'Item (C, S)', stats: '', desc: 'When rolling Upkeep Costs, consume to reduce cost by 3 Gold Marks. One set per turn.' },
  'travel rations': { type: 'Item (C, S)', stats: '', desc: 'When rolling Upkeep Costs, consume to reduce cost by 3 Gold Marks. One set per turn.' },
  'repair kit': { type: 'Item (B, S)', stats: '', desc: 'Fix any one Damaged item.' },
  "scout's cloak": { type: 'Item (W)', stats: '', desc: 'During Raid Sneak Up, rolls to spot this character are at -2.' },
  'set of alarm traps': { type: 'Item (B)', stats: '', desc: 'In Defensive Battle, +1 to every spotting roll during Enemy Infiltration.' },
  'alarm traps': { type: 'Item (B)', stats: '', desc: 'In Defensive Battle, +1 to every spotting roll during Enemy Infiltration.' },
  'spell-breaker herb': { type: 'Item (B, S)', stats: '', desc: 'When targeted by a spell, nullify all effects. Other targets of the same spell are still affected.' },
  'starberry': { type: 'Item (B, S)', stats: '', desc: 'Use before encounter. +1"/+1" Speed for the encounter.' },
  'strange map': { type: 'Item (C, S)', stats: '', desc: 'Add an Unexplored Location to the Wilderness of your campaign map.' },
  'study manual': { type: 'Item (B, S)', stats: '', desc: '+1 bonus to proficiency test for a random skill. Permanent. Cumulative with skill bonus. Book destroyed after use.' },
  'silvertree leaf': { type: 'Item (B, S)', stats: '', desc: 'Reroll post-game Injury result. If originally died, increase recovery by +D3 turns. No effect on Flight in the Dark.' },
  'talisman': { type: 'Item (W, S)', stats: '', desc: 'If post-battle Injury/Flight would kill character, roll D6: on 5-6 survive. Talisman lost either way.' },
  "thief's tools": { type: 'Item (W)', stats: '', desc: '+1 to all Expertise tests. Cumulative with skill bonus.' },
  'tonic': { type: 'Item (B, S)', stats: '', desc: 'Reduce recovery time by 1 campaign turn. One tonic per character per turn.' },
  'torch': { type: 'Item (B, S)', stats: '', desc: 'Creates 6" visibility during battle. Requires a hand (no shield or Bulky weapon).' },
  'cache of documents': { type: 'Item (B, S)', stats: '', desc: 'Roll D6: 1=reveal Hidden location, 2=D6+1 AP, 3=Quest Find Table roll, 4=negate Enemy Plans, 5=add Delve area, 6=sell for D6+1 GM.' },
  'lockpick': { type: 'Item', stats: '', desc: '' },
  'lantern': { type: 'Item', stats: '', desc: 'Provides illumination similar to a torch.' },
  'waterskin': { type: 'Item', stats: '', desc: '' },
  'enchanted weapon': { type: 'Enchanted', stats: '', desc: 'See enchanted items table for specific effects.' },
  'enchanted armor': { type: 'Enchanted', stats: '', desc: 'See enchanted items table for specific effects.' },
  'ring of protection': { type: 'Enchanted', stats: '', desc: 'See enchanted items table for specific effects.' },
  'amulet': { type: 'Enchanted', stats: '', desc: 'See enchanted items table for specific effects.' },
}

// Superior weapon prefixes
const SUPERIOR_INFO = {
  'fine': 'If weapon/armor would be Damaged, ignore it. No longer Fine after.',
  'balanced': 'Enemy cannot gain Counter Attack for any reason.',
  'quick': 'Enemy cannot use Parry ability.',
  'fey steel': 'Cannot be Damaged or broken.',
}

/**
 * Look up equipment info for an item string.
 * Handles superior prefixes and quantity prefixes like "2 x silvertree leaf".
 * Returns { info, superiorNote } or null.
 */
export function lookupEquipmentInfo(itemName) {
  if (!itemName) return null
  const { name } = parseItemQuantity(itemName)
  const n = name.toLowerCase().trim()

  // Check superior prefix
  let searchName = n
  let superiorNote = null
  for (const [prefix, note] of Object.entries(SUPERIOR_INFO)) {
    if (n.startsWith(prefix + ' ')) {
      searchName = n.slice(prefix.length + 1).trim()
      superiorNote = `${prefix.charAt(0).toUpperCase() + prefix.slice(1)}: ${note}`
      break
    }
  }

  // Try exact match first, then substring
  if (EQUIPMENT_INFO[searchName]) {
    return { info: EQUIPMENT_INFO[searchName], superiorNote }
  }
  for (const [key, info] of Object.entries(EQUIPMENT_INFO)) {
    if (searchName.includes(key) || key.includes(searchName)) {
      return { info, superiorNote }
    }
  }
  return null
}

/**
 * Parse quantity prefix from item string.
 * Handles: "2 x item", "2x item", "2xitem", "3 item" patterns.
 * Returns { quantity: number, name: string }
 */
export function parseItemQuantity(itemString) {
  if (!itemString) return { quantity: 1, name: '' }
  const s = itemString.trim()

  // Match "2 x item", "2x item", "2xitem"
  const match = s.match(/^(\d+)\s*x\s*(.+)$/i)
  if (match) {
    return { quantity: parseInt(match[1], 10), name: match[2].trim() }
  }

  return { quantity: 1, name: s }
}

export default EQUIPMENT_INFO
