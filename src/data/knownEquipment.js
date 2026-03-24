// Known equipment names from the Five Leagues from the Borderlands rulebook.
// Used to highlight recognized items in equipment lists.
// Each entry is a lowercase substring to match against.

const KNOWN_EQUIPMENT = [
  // Weapons — Basic
  'light weapon',
  'self bow',
  'sling',
  'staff',
  'standard weapon',
  // Weapons — Quality
  'bastard sword',
  'crossbow',
  'fencing sword',
  'longbow',
  'throwing knives',
  'warhammer',
  'war spear',
  // Superior prefixes (combined with weapon names)
  // Recognized via prefix: fine, balanced, quick, fey steel

  // Armor
  'light armor',
  'partial armor',
  'full armor',
  'knight armor',
  'shield',
  'helmet',

  // Consumables / Backpack items
  'bandages',
  'hard liquor',
  'holy water',
  'large quiver',
  'misty water-flower',
  'potion of fortune',
  'potion of endurance',
  'repair kit',
  'silvertree leaf',
  'talisman',
  'rope',
  'lockpick',
  'lantern',
  'torch',
  'travel rations',
  'waterskin',

  // Enchanted items (common)
  'enchanted weapon',
  'enchanted armor',
  'ring of protection',
  'amulet',
]

// Superior weapon prefixes that are valid modifiers
const SUPERIOR_PREFIXES = ['fine', 'balanced', 'quick', 'fey steel']

/**
 * Check if an equipment string matches a known item.
 * Returns true if the item is recognized.
 */
export function isKnownEquipment(itemName) {
  if (!itemName) return false
  const n = itemName.toLowerCase().trim()

  // Strip superior prefix if present
  let searchName = n
  for (const prefix of SUPERIOR_PREFIXES) {
    if (n.startsWith(prefix + ' ')) {
      searchName = n.slice(prefix.length + 1).trim()
      break
    }
  }

  return KNOWN_EQUIPMENT.some(known => searchName.includes(known))
}

export default KNOWN_EQUIPMENT
