// Weapon stats from Five Leagues from the Borderlands rulebook
// Format: +X/+Y = Overcome Armor bonus / Overcome Toughness bonus

const WEAPON_TABLE = {
  basic: [
    { name: 'Light weapon', damage: '-1/+0', range: null, notes: null, tier: 'Basic' },
    { name: 'Self bow', damage: '+0/+0', range: '18"', notes: 'Bulky, Limited Ammo', tier: 'Basic' },
    { name: 'Sling', damage: '-1/+0', range: '12"', notes: 'No ammo limit', tier: 'Basic' },
    { name: 'Staff', damage: '+0/+0', range: null, notes: 'Parry', tier: 'Basic' },
    { name: 'Standard weapon', damage: '+0/+0', range: null, notes: null, tier: 'Basic' },
  ],
  quality: [
    { name: 'Bastard sword', damage: '+1/+0', range: null, notes: 'Followers use as +0/+0', tier: 'Quality' },
    { name: 'Crossbow', damage: '+1/+0', range: '24"', notes: "Bulky, Limited Ammo, can't move & shoot. Followers use as +0/+0", tier: 'Quality' },
    { name: 'Fencing sword', damage: '+0/+0', range: null, notes: 'Parry. Followers use as +0/+0', tier: 'Quality' },
    { name: 'Longbow', damage: '+0/+0', range: '24"', notes: 'Bulky, Limited Ammo. Followers use as +0/+0', tier: 'Quality' },
    { name: 'Throwing knives', damage: '-1/+0', range: '9"', notes: 'Add Combat Skill to hit roll. Followers use as +0/+0', tier: 'Quality' },
    { name: 'Warhammer', damage: '+1/+0', range: null, notes: 'Followers use as +0/+0', tier: 'Quality' },
    { name: 'War spear', damage: '+0/+0', range: null, notes: 'Wielder always Counter Attacks. Followers use as +0/+0', tier: 'Quality' },
  ],
}

// Flatten for easy lookup
const ALL_WEAPONS = [...WEAPON_TABLE.basic, ...WEAPON_TABLE.quality]

// Lookup a weapon from an equipment string. Returns { weapon, superior } or null.
export function lookupWeapon(equipmentString) {
  if (!equipmentString) return null
  const n = equipmentString.toLowerCase().trim()

  // Check superior prefixes
  const superiorPrefixes = ['fine', 'balanced', 'quick', 'fey steel']
  let superiorTag = null
  let searchName = n
  for (const prefix of superiorPrefixes) {
    if (n.startsWith(prefix + ' ')) {
      superiorTag = prefix.charAt(0).toUpperCase() + prefix.slice(1)
      searchName = n.slice(prefix.length + 1)
      break
    }
  }

  // Match against known weapons (longest match first to avoid "light weapon" matching "light armor")
  const sorted = [...ALL_WEAPONS].sort((a, b) => b.name.length - a.name.length)
  for (const weapon of sorted) {
    if (searchName.includes(weapon.name.toLowerCase())) {
      return { weapon, superior: superiorTag }
    }
  }
  return null
}

export default WEAPON_TABLE
