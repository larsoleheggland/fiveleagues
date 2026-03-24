import { useState } from 'react'
import EditableField from '../components/EditableField'
import ItemList from '../components/ItemList'

const FOES_WITHIN = [
  { id: 'theRuinWithin', label: 'The Ruin Within' },
  { id: 'theWhispersFromBeyond', label: 'The Whispers from Beyond' },
  { id: 'theGnawlingHorde', label: 'The Gnawling Horde' },
  { id: 'theIceCourt', label: 'The Ice-heart Court' }
]

const FOES_WITHOUT = [
  { id: 'dusklingWarbands', label: 'Duskling Warbands' },
  { id: 'theOldestKin', label: 'The Oldest Kin' },
  { id: 'theCurseOfWar', label: 'The Curse of War' },
  { id: 'theFacelessKingdom', label: 'The Faceless Kingdom' }
]

const EXTRA_TABLES = [
  { id: 'roadsideEncounters', label: 'Roadside Encounters' },
  { id: 'lurkingFoes', label: 'Lurking Foes' }
]

const ALL_FACTIONS = [...FOES_WITHIN, ...FOES_WITHOUT, ...EXTRA_TABLES]

const FACTION_DATA = {
  theRuinWithin: {
    rules: [
      { name: 'Bloodstained Shillings', desc: 'Gain 1 Gold Mark for each Leader slain.' },
      { name: 'Payment for the Mistress', desc: 'Buy out of battle in Tracking Phase: 1 Gold Mark per remaining enemy.' }
    ],
    enemies: [
      { range: '01-08', name: 'Desperate mob', num: '+3', spd: '4"/+2"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: '2 slingers', traits: 'Break point (flee at half casualties)' },
      { range: '09-18', name: 'Sneaky thieves', num: '+1', spd: '6"/+2"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: '2 self bows', traits: 'Sneak attack, Looted loot' },
      { range: '19-24', name: 'Slave raiders', num: '+2', spd: '4"/+3"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: '2 slingers', traits: 'Craven, Just in time' },
      { range: '25-31', name: 'Grim-faced rebels', num: '+1', spd: '5"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: '2 self bows', traits: 'Uprising' },
      { range: '32-43', name: 'Outlaw gang', num: '+2', spd: '5"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '1', rng: '2 slingers', traits: 'Outflank' },
      { range: '44-53', name: 'Deserter squad', num: '+3', spd: '4"/+2"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '2', rng: '2 self bows', traits: 'Hardened fighters' },
      { range: '54-61', name: 'Blood-stained renegades', num: '+1', spd: '5"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '1', rng: '2 self bows', traits: 'Brave, Sgts Tough' },
      { range: '62-73', name: 'Well-armed brigands', num: '+2', spd: '5"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: '2 self bows', traits: 'Lie in wait' },
      { range: '74-81', name: 'Hired murderers', num: '+1', spd: '5"/+2"', cs: '+1', dmg: '+0/+1', tgh: '4', arm: '2', rng: '3 throwing knives', traits: 'Outflank, Slippery' },
      { range: '82-88', name: 'Murder cultists', num: '+2', spd: '5"/+3"', cs: '+1', dmg: '+1/+0', tgh: '5', arm: '1', rng: '3 throwing knives', traits: 'Brave, Counter Attack' },
      { range: '89-94', name: 'Penitent zealots', num: '+3', spd: '4"/+3"', cs: '+1', dmg: '+0/+0', tgh: '5', arm: '1', rng: 'None', traits: 'Fearless, Battle Zeal' },
      { range: '95-100', name: 'Order of the snake', num: '+1', spd: '6"/+3"', cs: '+2', dmg: '+0/+0', tgh: '5', arm: '2', rng: '3 throwing knives', traits: 'Brave, Poison, Crawling, Counter Attack' }
    ]
  },
  theWhispersFromBeyond: {
    rules: [
      { name: 'Patterns Unseen', desc: 'Defeat 5+ figures = +1 Adventure Point.' },
      { name: 'The Fog that Shrouds the Land', desc: 'Warband visibility limited to 9". Enemies not affected.' }
    ],
    enemies: [
      { range: '01-08', name: 'The taken', num: '+3', spd: '4"/0"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '0', rng: 'None', traits: 'Fearless, Monsters' },
      { range: '09-17', name: 'Broken fanatics', num: '+1', spd: '4"/+3"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '0', rng: '1 crossbow', traits: 'Fearless, Driven to fury' },
      { range: '18-26', name: 'Roaming dead', num: '+4', spd: '3"/0"', cs: '+0', dmg: '+0/+0', tgh: '5', arm: '0', rng: 'None', traits: 'Undead, Unknown Enemy, Swarming' },
      { range: '27-34', name: 'The outcast', num: '+2', spd: '5"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: '2 slings', traits: 'Outflank, Bounty' },
      { range: '35-46', name: 'Cultist whisperers', num: '+3', spd: '5"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: '1 self bow', traits: 'Leaders: Poison, Outflank, Brave' },
      { range: '47-53', name: 'Coven of the half-dead', num: '+2', spd: '4"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '1', rng: 'None', traits: 'Brave, Pained ascension' },
      { range: '54-59', name: 'Maddened revenants', num: '+2', spd: '4"/0"', cs: '+1', dmg: '+0/+0', tgh: '5', arm: '1', rng: 'None', traits: 'Undead, Gruesome' },
      { range: '60-68', name: 'Collector mob', num: '+4', spd: '4"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '1', rng: '3 slings', traits: 'Outflank, Morbid pack' },
      { range: '69-77', name: 'The Corrupt', num: '+3', spd: '4"/0"', cs: '+1', dmg: '+0/+0', tgh: '5', arm: '2', rng: 'None', traits: 'Monsters, Twisting forms' },
      { range: '78-85', name: 'Fog Born', num: '+2', spd: '5"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: 'None', traits: 'Gruesome, Brave, Fog bound' },
      { range: '86-93', name: 'Grave Walkers', num: '+2', spd: '4"/0"', cs: '+2', dmg: '+1/+0', tgh: '5', arm: '2', rng: 'None', traits: 'Undead' },
      { range: '94-100', name: 'Night Folk', num: '+1', spd: '5"/+3"', cs: '+2', dmg: '+0/+0', tgh: '4', arm: '2', rng: '2 throwing knives', traits: 'Poison, Outflank, Fey' }
    ]
  },
  theGnawlingHorde: {
    rules: [
      { name: 'Driven by Hatred', desc: 'Morale roll of 6 causes figure to rush toward nearest warband member.' },
      { name: 'Mob Tactics', desc: "Can't claim ally combat bonus when fighting Gnawlings with allies within 1\"." }
    ],
    enemies: [
      { range: '01-09', name: 'Skirmisher pack', num: '+4', spd: '7"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: '4 slings', traits: 'Skirmisher, Crawling' },
      { range: '10-19', name: 'Gibbering horde', num: '+6', spd: '6"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: 'None', traits: 'Unknown Enemy, No Wound recovery' },
      { range: '20-28', name: 'Gnawling raiders', num: '+5', spd: '6"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: '3 slings', traits: 'Skirmisher, Crawling' },
      { range: '29-35', name: 'Curse-Bound', num: '+4', spd: '5"/+2"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: 'None', traits: 'Gruesome' },
      { range: '36-45', name: 'Gnawling warriors', num: '+4', spd: '6"/+3"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: '2 crossbows', traits: 'Skirmisher, Counter Attack' },
      { range: '46-53', name: 'Knife-breakers', num: '+5', spd: '6"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: 'None', traits: 'Outflank, Break the knife' },
      { range: '54-63', name: 'Tunnel fighters', num: '+4', spd: '6"/+3"', cs: '+1', dmg: '+1/+0', tgh: '4', arm: '2', rng: '2 crossbows', traits: 'Slippery' },
      { range: '64-72', name: 'Seething infiltrators', num: '+5', spd: '7"/+3"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: '3 slings', traits: 'Outflank, Unknown Enemy, Poison, Crawling' },
      { range: '73-80', name: 'The Silenced', num: '+4', spd: '6"/+4"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '1', rng: 'None', traits: 'Poison, +2/+0 vs isolated' },
      { range: '81-87', name: 'Shield-bearers', num: '+4', spd: '5"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: '2 crossbows', traits: 'Parry, Return shots' },
      { range: '88-94', name: 'Hate-sworn', num: '+4', spd: '6"/+3"', cs: '+1', dmg: '+0/+0', tgh: '5', arm: '1', rng: '2 crossbows', traits: 'Counter Attack, Death Frenzy' },
      { range: '95-100', name: 'The Ascended', num: '+3', spd: '6"/+3"', cs: '+2', dmg: '+0/+0', tgh: '5', arm: '1', rng: 'None', traits: 'Fey, Energy bolts' }
    ]
  },
  theIceCourt: {
    rules: [
      { name: 'Entrancing Lights', desc: 'Roll 1 die less than warband size; character without die is Entranced (acts in Slow Actions Phase).' },
      { name: 'Elfin Trickery', desc: 'Outflank rolls 2D6-1; Defensive Battle setup 2D6+9 instead of 2D6+12.' }
    ],
    enemies: [
      { range: '01-11', name: 'Goblin raiders', num: '+5', spd: '5"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: 'None', traits: 'Outflank, Fey, Goblin cruelty' },
      { range: '12-23', name: 'Forest folk', num: '+2', spd: '5"/+2"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '0', rng: '2 self bows', traits: 'Forest fighting (no cover)' },
      { range: '24-32', name: 'Elfin hounds', num: '+4', spd: '6"/+4"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '0', rng: 'None', traits: 'Awareness, Outflank, Fey' },
      { range: '33-40', name: 'Spider-touched', num: '+3', spd: '5"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '1', rng: '2 self bows', traits: 'Poison, Outflank, Brave' },
      { range: '41-49', name: 'Time-lost warriors', num: '+2', spd: '4"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: '2 crossbows', traits: 'Brave' },
      { range: '50-57', name: 'War dryads', num: '+3', spd: '6"/+2"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '2', rng: 'None', traits: 'Counter Attack, Fey, Painful Lure' },
      { range: '58-63', name: 'Tree wardens', num: '+2', spd: '5"/+2"', cs: '+1', dmg: '+0/+1', tgh: '5', arm: '2', rng: 'None', traits: 'Tough, Regeneration, Fey' },
      { range: '64-71', name: 'Fey spirits', num: '+3', spd: '6"/+3"', cs: '+1', dmg: '+0/+0', tgh: '5', arm: '1', rng: '3 self bows', traits: 'Terrifying, Flying, Fey' },
      { range: '72-81', name: 'Fey soldiers', num: '+3', spd: '6"/+3"', cs: '+1', dmg: '+1/+0', tgh: '4', arm: '3', rng: '3 crossbows', traits: 'Skirmisher, Fey' },
      { range: '82-89', name: 'Winter Legion', num: '+3', spd: '6"/+2"', cs: '+1', dmg: '+0/+0', tgh: '5', arm: '3', rng: '3 crossbows', traits: 'Brave, Fey, Winter Mist' },
      { range: '90-95', name: 'Fey knights', num: '+2', spd: '6"/+2"', cs: '+2', dmg: '+1/+0', tgh: '4', arm: '3', rng: 'None', traits: 'Fearless, Tough, Fey' },
      { range: '96-100', name: "Queen's own", num: '+2', spd: '6"/+2"', cs: '+2', dmg: '+1/+1', tgh: '4', arm: '3', rng: '3 crossbows', traits: 'Parry, Counter Attack, Fey' }
    ]
  },
  dusklingWarbands: {
    rules: [
      { name: 'Pain-fury', desc: 'Dusklings get Counter Attack while Wounded.' },
      { name: 'Hatred of Magic', desc: 'Always target spell-casters/Fey-blood; close to melee if possible.' },
      { name: 'The Long Walk', desc: 'Spell-casting Unique Foes exempt from Hatred of Magic.' }
    ],
    enemies: [
      { range: '01-09', name: 'Unforgiven warband', num: '+3', spd: '5"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: '2 self bows', traits: 'Unknown Enemy' },
      { range: '10-20', name: 'Aspiring war party', num: '+1', spd: '5"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '1', rng: '2 self bows', traits: 'Brave, Aspire to glory' },
      { range: '21-30', name: 'Warband remnants', num: '+2', spd: '5"/+3"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: '1 self bow', traits: 'Gather the spoils' },
      { range: '31-39', name: 'Hunting band', num: '+1', spd: '6"/+3"', cs: '+1', dmg: '+1/+0', tgh: '4', arm: '1', rng: '3 self bows', traits: 'Slippery, Hunters' },
      { range: '40-48', name: 'Blood-streaked band', num: '+3', spd: '5"/+4"', cs: '+0', dmg: '+0/+1', tgh: '4', arm: '1', rng: '2 self bows', traits: 'Tough' },
      { range: '49-57', name: 'Maddened wave', num: '+4', spd: '6"/+2"', cs: '+0', dmg: '+0/+1', tgh: '4', arm: '1', rng: 'None', traits: 'Status through glory' },
      { range: '58-65', name: 'Mist-clad warband', num: '+1', spd: '6"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '0', rng: '2 self bows', traits: 'Poor Shot, Unknown Enemy' },
      { range: '66-75', name: 'Prowling renegades', num: '+2', spd: '5"/+3"', cs: '+1', dmg: '+0/+1', tgh: '4', arm: '1', rng: '2 self bows', traits: 'Skirmisher, Brave, Poor Shot, Crawling' },
      { range: '76-82', name: 'Death-sworn warriors', num: '+2', spd: '5"/+3"', cs: '+1', dmg: '+1/+1', tgh: '4', arm: '2', rng: 'None', traits: 'Parry, Terrifying' },
      { range: '83-87', name: 'Winding Path warband', num: '+2', spd: '6"/+4"', cs: '+1', dmg: '+0/+1', tgh: '5', arm: '1', rng: '2 self bows', traits: 'Poison, Poor Shot, Crawling' },
      { range: '88-94', name: 'Notched blades', num: '+1', spd: '5"/+4"', cs: '+2', dmg: '+1/+0', tgh: '5', arm: '1', rng: 'None', traits: 'Parry, Relentless' },
      { range: '95-100', name: 'Skull-taker warband', num: '+1', spd: '6"/+3"', cs: '+2', dmg: '+1/+1', tgh: '4', arm: '2', rng: '2 self bows', traits: 'Poor Shot, Gruesome, Relentless, Terrifying' }
    ]
  },
  theOldestKin: {
    rules: [
      { name: 'Old Kin Javelins', desc: '9" range, -1/+0 damage, thrower adds Combat Skill, can move.' },
      { name: 'Slow-moving Blood', desc: 'All Old Kin are Brave and immune to poison.' },
      { name: 'Clad in Scales and Silver', desc: 'Valuables worth +1 Gold Mark per item.' }
    ],
    enemies: [
      { range: '01-11', name: 'Spawned brood', num: '+1', spd: '4"/+2"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: '2 javelins', traits: 'Skirmisher' },
      { range: '12-24', name: 'Kin-blooded', num: '+1', spd: '5"/+2"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: '2 self bows', traits: 'Unknown Enemy, Thin blood' },
      { range: '25-35', name: 'Warrior brood', num: '+2', spd: '5"/+2"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: '2 javelins', traits: 'Silver jewelry' },
      { range: '36-40', name: 'Relict brood', num: '+2', spd: '5"/+2"', cs: '+0', dmg: '+0/+1', tgh: '5', arm: '1', rng: 'None', traits: 'Regeneration' },
      { range: '41-47', name: 'Needle Fang pack', num: '+4', spd: '5"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: 'None', traits: 'Awareness' },
      { range: '48-55', name: 'Raider brood', num: '+2', spd: '4"/+2"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: '3 javelins', traits: 'Crawling, Ranged Poison' },
      { range: '56-65', name: 'Ravager brood', num: '+1', spd: '5"/+2"', cs: '+1', dmg: '+0/+0', tgh: '5', arm: '2', rng: '2 javelins', traits: 'Awareness' },
      { range: '66-73', name: 'Hunter beast pack', num: '+4', spd: '5"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '1', rng: 'None', traits: 'Slippery, Jungle tactics' },
      { range: '74-82', name: 'War-strong brood', num: '+2', spd: '4"/+2"', cs: '+1', dmg: '+1/+0', tgh: '5', arm: '2', rng: 'None', traits: 'Relentless' },
      { range: '83-88', name: 'Deep coven', num: '+2', spd: '4"/+2"', cs: '+1', dmg: '+0/+1', tgh: '5', arm: '1', rng: 'None', traits: 'Terrifying, Poison, Call the kindred' },
      { range: '89-94', name: 'Cold blooded priest band', num: '+2', spd: '4"/+2"', cs: '+2', dmg: '+0/+0', tgh: '5', arm: '2', rng: '2 sorcerous bolts', traits: 'Tough, Fearless, Skirmisher' },
      { range: '95-100', name: 'Battle champion band', num: '+2', spd: '5"/+2"', cs: '+2', dmg: '+1/+1', tgh: '5', arm: '2', rng: '2 javelins', traits: 'Relentless, Fearless' }
    ]
  },
  theCurseOfWar: {
    rules: [
      { name: 'The Slow Grind of War', desc: 'Timed objectives get +1 battle round.' },
      { name: 'Tattered Banners, Bloody Flags', desc: 'If 2+ enemies flee at round start, rest become Fearless.' }
    ],
    enemies: [
      { range: '01-09', name: 'Craven deserters', num: '+3', spd: '4"/+2"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: '2 slings', traits: 'Not dying today (morale 1-3)' },
      { range: '10-19', name: 'Opportunistic pillagers', num: '+3', spd: '5"/+2"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '1', rng: '2 slings', traits: 'Slippery, Pillagers' },
      { range: '20-28', name: 'Cruel deserters', num: '+3', spd: '4"/+2"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '1', rng: '2 self bows', traits: 'Skirmisher, Gruesome' },
      { range: '29-35', name: 'Torch bearers', num: '+3', spd: '5"/+2"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: '3 slings', traits: 'Outflank, Tip of spear' },
      { range: '36-45', name: 'Gibbering corpse-crawlers', num: '+4', spd: '5"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '0', rng: 'None', traits: 'Drawn by blood (spawn on casualties)' },
      { range: '46-53', name: 'Soot-stained fiends', num: '+2', spd: '6"/+2"', cs: '+1', dmg: '+0/+1', tgh: '4', arm: '2', rng: 'None', traits: 'Flying, Dampening aura' },
      { range: '54-64', name: 'Forsaken infantry', num: '+3', spd: '4"/+2"', cs: '+0', dmg: '+1/+0', tgh: '4', arm: '1', rng: '2 crossbows', traits: 'Tough, Gruesome' },
      { range: '65-70', name: 'War-mad roamers', num: '+3', spd: '4"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: '3 self bows', traits: 'Awareness, Hunted in gloom' },
      { range: '71-80', name: 'Battlefield stalkers', num: '+3', spd: '6"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: 'None', traits: 'Dark blood (no mid-battle heal)' },
      { range: '81-87', name: 'War cultists', num: '+3', spd: '4"/+2"', cs: '+1', dmg: '+1/+0', tgh: '5', arm: '2', rng: 'None', traits: 'Brave, May summon Minotaur' },
      { range: '88-93', name: 'Torn flags', num: '+2', spd: '5"/+2"', cs: '+2', dmg: '+1/+0', tgh: '4', arm: '2', rng: 'None', traits: 'Parry, Counter Attack' },
      { range: '94-100', name: 'Forsaken elite', num: '+2', spd: '5"/+2"', cs: '+2', dmg: '+0/+1', tgh: '5', arm: '2', rng: '2 crossbows', traits: 'Relentless, Tough, Gruesome' }
    ]
  },
  theFacelessKingdom: {
    rules: [
      { name: 'For the Beast Totems', desc: 'Initiating melee grants Counter Attack for the duration.' },
      { name: 'Iron Discipline', desc: 'Morale removal causes furthest figure to move forward instead.' }
    ],
    enemies: [
      { range: '01-12', name: 'Unmarked legion', num: '+3', spd: '6"/+2"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '0', rng: '2 slings', traits: 'Brave' },
      { range: '13-22', name: 'Legion of the Weasel', num: '+3', spd: '6"/+2"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '1', rng: '2 slings', traits: 'Slippery' },
      { range: '23-29', name: 'Legion of the Owl', num: '+2', spd: '5"/+2"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: '2 crossbows', traits: 'Awareness' },
      { range: '30-36', name: 'Legion of the Raven', num: '+2', spd: '5"/+2"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: '3 crossbows', traits: 'Hit and run' },
      { range: '37-46', name: 'Legion of the Swine', num: '+2', spd: '4"/+2"', cs: '+1', dmg: '+0/+1', tgh: '4', arm: '1', rng: '2 crossbows', traits: 'We stand alone' },
      { range: '47-53', name: 'Legion of the Ox', num: '+2', spd: '4"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: '2 crossbows', traits: 'Outflank' },
      { range: '54-67', name: 'Legion of the Lion', num: '+3', spd: '4"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: '2 crossbows', traits: 'Parry' },
      { range: '68-75', name: 'Legion of the Viper', num: '+2', spd: '4"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: '3 crossbows', traits: 'Skirmisher' },
      { range: '76-83', name: 'Legion of the Wolverine', num: '+2', spd: '4"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: '3 crossbows', traits: 'Awareness, Counter Attack' },
      { range: '84-89', name: 'Legion of the Mole', num: '+2', spd: '4"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: '4 crossbows', traits: 'Brave, Combined arms' },
      { range: '90-95', name: 'Legion of the Eagle', num: '+2', spd: '5"/+2"', cs: '+2', dmg: '+1/+0', tgh: '4', arm: '2', rng: '2 crossbows', traits: 'Brave' },
      { range: '96-100', name: 'Legion of Iron', num: '+2', spd: '4"/+2"', cs: '+2', dmg: '+0/+0', tgh: '5', arm: '3', rng: '3 crossbows', traits: 'Relentless, Brave' }
    ]
  },
  roadsideEncounters: {
    rules: [
      { name: 'Poor Prospects', desc: 'Valuables worth 1 Gold Mark less (min 1).' },
      { name: 'Not Worth the Risk', desc: '1-2 remaining foes flee (not Undead or Unknown Enemy).' }
    ],
    enemies: [
      { range: '01-08', name: 'Dust Hounds', num: '+3', spd: '6"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: 'None', traits: 'Awareness' },
      { range: '09-16', name: 'Petty robbers', num: '+3', spd: '4"/+2"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: '2 slings', traits: 'Untrained rabble (morale 1-3)' },
      { range: '17-23', name: 'Roving fiends', num: '+4', spd: '4"/+2"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '2', rng: 'None', traits: 'Regeneration' },
      { range: '24-31', name: 'Rag-tag brigands', num: '+4', spd: '5"/+2"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '1', rng: '1 self bow', traits: 'Duke pays bounty' },
      { range: '32-41', name: 'Goblin war party', num: '+3', spd: '5"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '1', rng: '3 slings', traits: 'Skirmisher, Fey' },
      { range: '42-53', name: 'Stumbling dead', num: '+4', spd: '4"/0"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: 'None', traits: 'Undead, They rarely come alone' },
      { range: '54-61', name: 'Organized robbers', num: '+3', spd: '5"/+2"', cs: '+1', dmg: '+0/+0', tgh: '3', arm: '1', rng: '2 self bows', traits: 'Skirmisher, Crime does pay' },
      { range: '62-69', name: 'Northern wolves', num: '+2', spd: '6"/+3"', cs: '+1', dmg: '+0/+1', tgh: '4', arm: '1', rng: 'None', traits: 'Awareness, Outflank' },
      { range: '70-79', name: 'Robber baron patrol', num: '+2', spd: '4"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: '2 crossbows', traits: 'Tax the taxman' },
      { range: '80-86', name: 'Strange troops', num: '+2', spd: '5"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: '2 self bows', traits: 'Brave, Parry' },
      { range: '87-94', name: 'Infamous marauders', num: '+1', spd: '5"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '1', rng: '2 self bows', traits: 'Counter Attack, Raiders' },
      { range: '95-100', name: 'Half-Fey raiders', num: '+1', spd: '6"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '1', rng: '3 longbows', traits: 'Fey, Parry' }
    ]
  },
  lurkingFoes: {
    rules: [
      { name: 'The Lure of Magic', desc: 'D6 during Tracking Phase if spell cast; on 6, additional enemy spawns at random edge.' }
    ],
    enemies: [
      { range: '01-14', name: 'Giant rats', num: '+5', spd: '6"/+4"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '0', rng: 'None', traits: 'Slippery, Crawling' },
      { range: '15-24', name: 'Giant bugs', num: '+4', spd: '6"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '1', rng: 'None', traits: 'Brave, Crawling' },
      { range: '25-31', name: 'Winged Imps', num: '+3', spd: '5"/0"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '2', rng: 'None', traits: 'Flying, Monsters' },
      { range: '32-44', name: 'Skeletal defenders', num: '+4', spd: '4"/0"', cs: '+0', dmg: '+0/+0', tgh: '4', arm: '1', rng: 'None', traits: 'Undead' },
      { range: '45-50', name: 'Decrepit worshippers', num: '+3', spd: '4"/+3"', cs: '+1', dmg: '+0/+0', tgh: '3', arm: '1', rng: 'None', traits: 'Crawling, Soaked in blood' },
      { range: '51-61', name: 'Goblin infestation', num: '+5', spd: '5"/+3"', cs: '+0', dmg: '+0/+0', tgh: '3', arm: '1', rng: 'None', traits: 'Fey, Gruesome, Crawling, Gremlin aura' },
      { range: '62-69', name: 'Cave Runners', num: '+3', spd: '7"/+2"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: 'None', traits: 'Brave, Crawling, Charge bonus' },
      { range: '70-75', name: 'Gargoyle sentries', num: '+2', spd: '4"/+4"', cs: '+1', dmg: '+0/+1', tgh: '4', arm: '2', rng: 'None', traits: 'Fearless, Tough, Crawling' },
      { range: '76-81', name: 'Tomb shades', num: '+2', spd: '5"/0"', cs: '+1', dmg: '+1/+0', tgh: '4', arm: '2', rng: 'None', traits: 'Undead, Regeneration, Terrifying' },
      { range: '82-90', name: 'Delve crawlers', num: '+2', spd: '6"/+3"', cs: '+1', dmg: '+0/+0', tgh: '4', arm: '2', rng: 'None', traits: 'Poison, Slippery, Crawling, Webbed' },
      { range: '91-94', name: 'Crystal wards', num: '+1', spd: '4"/+2"', cs: '+2', dmg: '+1/+0', tgh: '5', arm: '2', rng: 'None', traits: 'Relentless, Fearless, Crawling' },
      { range: '95-100', name: 'Eternal Guard', num: '+2', spd: '4"/0"', cs: '+2', dmg: '+0/+1', tgh: '4', arm: '2', rng: 'None', traits: 'Undead, Counter Attack, Guardian legion' }
    ]
  }
}

function ThreatLevelCounter({ value, onChange, isPrimary }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-7 h-7 rounded bg-stone-700 hover:bg-stone-600 text-stone-300 text-sm font-bold transition-colors"
      >-</button>
      <span className={`text-xl font-display font-bold min-w-[2rem] text-center ${
        value === 0 ? 'text-forest' : isPrimary ? 'text-rust' : 'text-gold'
      }`}>
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-7 h-7 rounded bg-stone-700 hover:bg-stone-600 text-stone-300 text-sm font-bold transition-colors"
      >+</button>
    </div>
  )
}

function EncounterLevelCounter({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-6 h-6 rounded bg-stone-700 hover:bg-stone-600 text-stone-300 text-xs font-bold transition-colors"
      >-</button>
      <span className="text-sm font-bold min-w-[2rem] text-center text-gold">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-6 h-6 rounded bg-stone-700 hover:bg-stone-600 text-stone-300 text-xs font-bold transition-colors"
      >+</button>
    </div>
  )
}

function EnemyTable({ enemies }) {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-stone-500 border-b border-stone-700/50">
            <th className="text-left py-1 pr-2 font-normal">D100</th>
            <th className="text-left py-1 pr-2 font-normal">Enemy</th>
            <th className="text-center py-1 px-1 font-normal">Num</th>
            <th className="text-center py-1 px-1 font-normal">Spd</th>
            <th className="text-center py-1 px-1 font-normal">CS</th>
            <th className="text-center py-1 px-1 font-normal">Dmg</th>
            <th className="text-center py-1 px-1 font-normal">Tgh</th>
            <th className="text-center py-1 px-1 font-normal">Arm</th>
            <th className="text-left py-1 px-1 font-normal">Ranged</th>
            <th className="text-left py-1 pl-2 font-normal">Traits</th>
          </tr>
        </thead>
        <tbody>
          {enemies.map((e, i) => (
            <tr key={i} className="border-b border-stone-800/50 hover:bg-stone-800/30">
              <td className="py-1.5 pr-2 text-stone-500 whitespace-nowrap">{e.range}</td>
              <td className="py-1.5 pr-2 text-stone-200 whitespace-nowrap">{e.name}</td>
              <td className="py-1.5 px-1 text-center text-gold">{e.num}</td>
              <td className="py-1.5 px-1 text-center text-stone-300 whitespace-nowrap">{e.spd}</td>
              <td className="py-1.5 px-1 text-center text-stone-300">{e.cs}</td>
              <td className="py-1.5 px-1 text-center text-stone-300">{e.dmg}</td>
              <td className="py-1.5 px-1 text-center text-stone-300">{e.tgh}</td>
              <td className="py-1.5 px-1 text-center text-stone-300">{e.arm}</td>
              <td className="py-1.5 px-1 text-stone-300 whitespace-nowrap">{e.rng}</td>
              <td className="py-1.5 pl-2 text-stone-400 italic">{e.traits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ThreatCard({ threat, threats, updateThreats, openSections, toggleSection }) {
  const factionId = threat.factionId
  const factionData = FACTION_DATA[factionId]
  const factionLabel = ALL_FACTIONS.find(f => f.id === factionId)?.label || factionId

  return (
    <div className={`bg-stone-800/40 border rounded-lg overflow-hidden ${
      threat.isPrimary ? 'border-rust/50' : 'border-stone-700'
    }`}>
      {/* Threat Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-lg text-gold tracking-wider">{factionLabel}</h3>
            {threat.isPrimary && (
              <span className="text-[10px] uppercase tracking-widest text-rust bg-rust/10 px-2 py-0.5 rounded">Primary</span>
            )}
            {threat.threatLevel === 0 && (
              <span className="text-[10px] uppercase tracking-widest text-forest bg-forest/10 px-2 py-0.5 rounded">Defeated</span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <EditableField
            value={threat.description || ''}
            onChange={v => updateThreats(
              threats.map(t => t.factionId === factionId ? { ...t, description: v } : t)
            )}
            placeholder="Describe your minis / flavor..."
            multiline
            className="text-sm italic text-stone-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-stone-500 block mb-1">Threat Level</span>
            <ThreatLevelCounter
              value={threat.threatLevel}
              onChange={v => updateThreats(
                threats.map(t => t.factionId === factionId ? { ...t, threatLevel: v } : t)
              )}
              isPrimary={threat.isPrimary}
            />
          </div>
          <div>
            <span className="text-xs text-stone-500 block mb-1">Encounter Level (Escalating)</span>
            <EncounterLevelCounter
              value={threat.encounterLevel}
              onChange={v => updateThreats(
                threats.map(t => t.factionId === factionId ? { ...t, encounterLevel: v } : t)
              )}
            />
          </div>
        </div>

        {/* Camps & Hideouts */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={threat.campDiscovered}
              onChange={() => updateThreats(
                threats.map(t => t.factionId === factionId ? { ...t, campDiscovered: !t.campDiscovered } : t)
              )}
              className="w-4 h-4 rounded border-stone-600 bg-stone-800 accent-gold cursor-pointer"
            />
            <span className="text-xs text-stone-400">Camp discovered</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={threat.hideoutDiscovered}
              onChange={() => updateThreats(
                threats.map(t => t.factionId === factionId ? { ...t, hideoutDiscovered: !t.hideoutDiscovered } : t)
              )}
              className="w-4 h-4 rounded border-stone-600 bg-stone-800 accent-gold cursor-pointer"
            />
            <span className="text-xs text-stone-400">Hideout revealed</span>
          </label>
        </div>

        {/* Notes */}
        <div className="mt-3">
          <EditableField
            value={threat.notes}
            onChange={v => updateThreats(
              threats.map(t => t.factionId === factionId ? { ...t, notes: v } : t)
            )}
            placeholder="Notes..."
            className="text-sm"
          />
        </div>
      </div>

      {/* Faction Rules (collapsible) */}
      {factionData && (
        <>
          <button
            onClick={() => toggleSection(`rules-${factionId}`)}
            className="w-full flex items-center justify-between px-4 py-2 border-t border-stone-700/50 hover:bg-stone-800/60 transition-colors"
          >
            <span className="text-xs text-stone-500 uppercase tracking-wider">Faction Rules</span>
            <span className="text-stone-600 text-xs">{openSections[`rules-${factionId}`] ? '\u25B2' : '\u25BC'}</span>
          </button>
          {openSections[`rules-${factionId}`] && (
            <div className="px-4 pb-3 space-y-2">
              {factionData.rules.map((rule, i) => (
                <div key={i}>
                  <span className="text-xs font-bold text-gold">{rule.name}:</span>{' '}
                  <span className="text-xs text-stone-300">{rule.desc}</span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => toggleSection(`enemies-${factionId}`)}
            className="w-full flex items-center justify-between px-4 py-2 border-t border-stone-700/50 hover:bg-stone-800/60 transition-colors"
          >
            <span className="text-xs text-stone-500 uppercase tracking-wider">Enemy Table</span>
            <span className="text-stone-600 text-xs">{openSections[`enemies-${factionId}`] ? '\u25B2' : '\u25BC'}</span>
          </button>
          {openSections[`enemies-${factionId}`] && (
            <div className="px-4 pb-3">
              <EnemyTable enemies={factionData.enemies} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

function AddThreatForm({ existingIds, onAdd, foesWithinCount, foesWithoutCount }) {
  const [adding, setAdding] = useState(false)

  if (!adding) {
    return (
      <button
        onClick={() => setAdding(true)}
        className="w-full py-3 border-2 border-dashed border-stone-700 rounded-lg text-stone-500 hover:text-gold hover:border-gold/30 transition-colors font-display text-sm tracking-wider"
      >
        + Add Threat
      </button>
    )
  }

  const availableWithin = FOES_WITHIN.filter(f => !existingIds.includes(f.id))
  const availableWithout = FOES_WITHOUT.filter(f => !existingIds.includes(f.id))

  return (
    <div className="bg-stone-800/40 border border-stone-700 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm text-gold tracking-wider">Select Faction</span>
        <button onClick={() => setAdding(false)} className="text-stone-500 hover:text-stone-300 text-sm">Cancel</button>
      </div>

      {availableWithin.length > 0 && (
        <div>
          <span className="text-xs text-stone-500 uppercase tracking-wider block mb-2">
            Foes Within ({foesWithinCount}/2 selected)
          </span>
          <div className="grid grid-cols-2 gap-2">
            {availableWithin.map(f => (
              <button
                key={f.id}
                onClick={() => { onAdd(f.id, false); setAdding(false) }}
                className="text-left px-3 py-2 rounded bg-stone-800 hover:bg-stone-700 text-sm text-stone-300 hover:text-gold transition-colors"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableWithout.length > 0 && (
        <div>
          <span className="text-xs text-stone-500 uppercase tracking-wider block mb-2">
            Foes Without ({foesWithoutCount}/1 selected)
          </span>
          <div className="grid grid-cols-2 gap-2">
            {availableWithout.map(f => (
              <button
                key={f.id}
                onClick={() => { onAdd(f.id, false); setAdding(false) }}
                className="text-left px-3 py-2 rounded bg-stone-800 hover:bg-stone-700 text-sm text-stone-300 hover:text-gold transition-colors"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableWithin.length === 0 && availableWithout.length === 0 && (
        <p className="text-sm text-stone-500 italic">All factions already added.</p>
      )}
    </div>
  )
}

export default function Threats({ campaign, updateCampaign }) {
  const [openSections, setOpenSections] = useState({})
  const [showExtraTables, setShowExtraTables] = useState(false)

  const threats = campaign.threats || []

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const updateThreats = (newThreats) => {
    updateCampaign(c => ({ ...c, threats: newThreats }))
  }

  const addThreat = (factionId, isPrimary) => {
    updateThreats([
      ...threats,
      {
        factionId,
        isPrimary: threats.length === 0, // first added is primary
        threatLevel: threats.length === 0 ? 6 : 5,
        encounterLevel: 0,
        campDiscovered: false,
        hideoutDiscovered: false,
        description: '',
        notes: ''
      }
    ])
  }

  const removeThreat = (factionId) => {
    updateThreats(threats.filter(t => t.factionId !== factionId))
  }

  const togglePrimary = (factionId) => {
    updateThreats(threats.map(t => ({
      ...t,
      isPrimary: t.factionId === factionId
    })))
  }

  const existingIds = threats.map(t => t.factionId)
  const foesWithinCount = threats.filter(t => FOES_WITHIN.some(f => f.id === t.factionId)).length
  const foesWithoutCount = threats.filter(t => FOES_WITHOUT.some(f => f.id === t.factionId)).length

  // Extra encounter tables (Roadside / Lurking Foes)
  const extraEncounterLevels = campaign.extraEncounterLevels || { roadsideEncounters: 0, lurkingFoes: 0 }
  const updateExtraLevels = (changes) => {
    updateCampaign(c => ({ ...c, extraEncounterLevels: { ...extraEncounterLevels, ...changes } }))
  }

  return (
    <div className="space-y-6">
      {/* Overview Bar */}
      <div className="bg-stone-800/40 border border-rust/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display text-xl text-rust tracking-wider">Active Threats</h2>
          <span className="text-xs text-stone-500">
            Goal: reduce all Threat Levels to 0
          </span>
        </div>
        {threats.length === 0 && (
          <p className="text-sm text-stone-500 italic">No threats added yet. Add your campaign's enemy factions below.</p>
        )}
        {threats.length > 0 && (
          <div className="flex flex-wrap gap-4 text-sm">
            {threats.map(t => {
              const label = ALL_FACTIONS.find(f => f.id === t.factionId)?.label || t.factionId
              return (
                <div key={t.factionId} className="flex items-center gap-2">
                  <span className={t.threatLevel === 0 ? 'text-forest line-through' : t.isPrimary ? 'text-rust' : 'text-stone-300'}>
                    {label}
                  </span>
                  <span className={`font-display font-bold ${
                    t.threatLevel === 0 ? 'text-forest' : t.isPrimary ? 'text-rust' : 'text-gold'
                  }`}>
                    {t.threatLevel}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Threat Cards */}
      <div className="space-y-4">
        {threats.map(t => (
          <div key={t.factionId} className="relative">
            <ThreatCard
              threat={t}
              threats={threats}
              updateThreats={updateThreats}
              openSections={openSections}
              toggleSection={toggleSection}
            />
            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              {!t.isPrimary && (
                <button
                  onClick={() => togglePrimary(t.factionId)}
                  className="text-[10px] uppercase tracking-wider text-stone-500 hover:text-rust transition-colors"
                  title="Set as primary threat"
                >
                  Set Primary
                </button>
              )}
              <button
                onClick={() => removeThreat(t.factionId)}
                className="text-stone-600 hover:text-rust text-sm transition-colors"
                title="Remove threat"
              >
                x
              </button>
            </div>
          </div>
        ))}

        <AddThreatForm
          existingIds={existingIds}
          onAdd={addThreat}
          foesWithinCount={foesWithinCount}
          foesWithoutCount={foesWithoutCount}
        />
      </div>

      {/* Extra Encounter Tables */}
      <div className="space-y-3">
        <button
          onClick={() => setShowExtraTables(!showExtraTables)}
          className={`px-3 py-1 rounded text-sm font-display tracking-wider transition-colors ${
            showExtraTables
              ? 'bg-gold/20 text-gold'
              : 'bg-stone-800 text-stone-400 hover:text-stone-300'
          }`}
        >
          {showExtraTables ? 'Extra Tables (Active)' : 'Show Extra Encounter Tables'}
        </button>

        {showExtraTables && (
          <div className="space-y-4">
            {EXTRA_TABLES.map(table => {
              const data = FACTION_DATA[table.id]
              return (
                <div key={table.id} className="bg-stone-800/40 border border-stone-700 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-sm text-gold tracking-wider">{table.label}</h3>
                      <div>
                        <span className="text-xs text-stone-500 mr-2">Encounter Level</span>
                        <EncounterLevelCounter
                          value={extraEncounterLevels[table.id] || 0}
                          onChange={v => updateExtraLevels({ [table.id]: v })}
                        />
                      </div>
                    </div>
                    {data?.rules.map((rule, i) => (
                      <div key={i} className="mb-1">
                        <span className="text-xs font-bold text-gold">{rule.name}:</span>{' '}
                        <span className="text-xs text-stone-300">{rule.desc}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => toggleSection(`enemies-${table.id}`)}
                    className="w-full flex items-center justify-between px-4 py-2 border-t border-stone-700/50 hover:bg-stone-800/60 transition-colors"
                  >
                    <span className="text-xs text-stone-500 uppercase tracking-wider">Enemy Table</span>
                    <span className="text-stone-600 text-xs">{openSections[`enemies-${table.id}`] ? '\u25B2' : '\u25BC'}</span>
                  </button>
                  {openSections[`enemies-${table.id}`] && data && (
                    <div className="px-4 pb-3">
                      <EnemyTable enemies={data.enemies} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
