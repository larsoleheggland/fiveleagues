import { useState } from 'react'
import WEAPON_TABLE, { lookupWeapon } from '../data/weaponTable'
import SPELL_TABLE from '../data/spellTable'
import { lookupOrigin } from '../data/originTraits'
import StatBlock from '../components/StatBlock'
import CollapsibleSection from '../components/CollapsibleSection'

function HeroCombatCard({ hero, casualty, onToggle }) {
  const weapons = []
  const armor = []
  const other = []

  for (const item of hero.equipment || []) {
    const match = lookupWeapon(item)
    if (match) {
      weapons.push({ name: item, ...match })
    } else {
      const n = item.toLowerCase()
      if (n.includes('armor') || n.includes('shield') || n.includes('helmet')) {
        armor.push(item)
      } else {
        other.push(item)
      }
    }
  }

  const hasShield = (hero.equipment || []).some(i => i.toLowerCase().includes('shield'))
  const hasHelmet = (hero.equipment || []).some(i => i.toLowerCase().includes('helmet'))

  const hasParry = weapons.some(w =>
    w.weapon.notes?.includes('Parry')
  ) || hasShield

  const hasCounterAttack = weapons.some(w =>
    w.weapon.notes?.includes('Counter Attack')
  )

  const originData = lookupOrigin(hero.origin)
  const combatTraits = originData?.traits.filter(t => t.combat) || []

  return (
    <div
      onClick={onToggle}
      className={`bg-stone-800/50 border border-stone-700 rounded-lg p-3 space-y-2 cursor-pointer select-none transition-opacity ${casualty ? 'opacity-35' : 'hover:bg-stone-800/70'}`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-display text-rust-light font-semibold">
          {hero.name || 'Unnamed'}
          {originData && <span className="text-stone-500 text-xs font-normal ml-1.5">{originData.name}</span>}
          {casualty && <span className="text-rust text-xs font-normal ml-2">— Casualty</span>}
        </span>
        <StatBlock
          stats={hero.stats || {}}
          equipment={hero.equipment}
          readOnly
          visibleStats={['speed', 'agility', 'combatSkill', 'armor', 'toughness']}
          size="lg"
        />
      </div>

      {weapons.length > 0 ? (
        <div className="space-y-1">
          {weapons.map((w, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-stone-300">{w.name}</span>
              <span className="text-gold font-bold ml-auto shrink-0">{w.weapon.damage}</span>
              {w.weapon.range && <span className="text-stone-500 text-xs">{w.weapon.range}</span>}
              {w.superior && <span className="text-sky-accent text-xs">{w.superior}</span>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-stone-600 italic">No recognized weapons</p>
      )}

      {/* Special abilities from gear */}
      {(hasParry || hasCounterAttack || hasHelmet) && (
        <div className="flex flex-wrap gap-1.5">
          {hasParry && <span className="text-xs bg-forest/20 text-forest px-1.5 py-0.5 rounded">Parry</span>}
          {hasCounterAttack && <span className="text-xs bg-sky-accent/20 text-sky-accent px-1.5 py-0.5 rounded">Counter Attack</span>}
          {hasHelmet && <span className="text-xs bg-gold/20 text-gold px-1.5 py-0.5 rounded">Helmet</span>}
        </div>
      )}

      {/* Origin combat traits */}
      {combatTraits.length > 0 && (
        <div className="border-t border-stone-700/50 pt-1.5 space-y-0.5">
          {combatTraits.map((t, i) => (
            <p key={i} className="text-xs text-stone-500">
              <span className="text-stone-400 font-semibold">{t.name}:</span> {t.desc}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Combat({ campaign }) {
  const [showWarband, setShowWarband] = useState(true)
  const [showSpells, setShowSpells] = useState(false)
  const [showRound, setShowRound] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const [showRanged, setShowRanged] = useState(false)
  const [showMelee, setShowMelee] = useState(false)
  const [showDamage, setShowDamage] = useState(false)
  const [showWeapons, setShowWeapons] = useState(false)
  const [showArmor, setShowArmor] = useState(false)
  const [showModifiers, setShowModifiers] = useState(false)
  const [showMorale, setShowMorale] = useState(false)
  const [casualties, setCasualties] = useState(new Set())

  const toggleCasualty = (heroId) => {
    setCasualties(prev => {
      const next = new Set(prev)
      if (next.has(heroId)) next.delete(heroId)
      else next.add(heroId)
      return next
    })
  }

  const activeHeroes = (campaign.warband?.heroes || []).filter(h => h.status === 'active')
  const knownSpells = campaign.mystics?.spells || []

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl text-rust tracking-wider">Combat Reference</h2>

      {/* Warband Combat Stats — open by default */}
      <CollapsibleSection title="Your Warband — Combat Stats" open={showWarband} onToggle={() => setShowWarband(!showWarband)} accent="text-forest">
        {activeHeroes.length === 0 ? (
          <p className="text-stone-500 italic text-sm">No active heroes.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeHeroes.map(hero => (
              <HeroCombatCard key={hero.id} hero={hero} casualty={casualties.has(hero.id)} onToggle={() => toggleCasualty(hero.id)} />
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Mystic Spells */}
      {knownSpells.length > 0 && (
        <CollapsibleSection title={`Mystic Spells (${knownSpells.length})`} open={showSpells} onToggle={() => setShowSpells(!showSpells)} accent="text-rust-light">
          <div className="space-y-1">
            <p className="text-xs text-stone-500 mb-2">3 Strands per battle. Roll 2D6 + Casting. Natural 2 = fail (−1 Strand). Natural 12 = free success.</p>
            {knownSpells.map(spell => (
              <div key={spell.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-sm py-1 border-b border-stone-800 last:border-0">
                <span className="font-display text-rust-light font-semibold w-28 shrink-0">{spell.name}</span>
                <span className="text-stone-400 text-xs">Inc. <span className="text-stone-200">{spell.incantation}</span></span>
                <span className="text-stone-400 text-xs">{spell.target}</span>
                <span className="text-stone-500 text-xs">{spell.duration}</span>
                <p className="text-xs text-stone-400 w-full">{spell.effects}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Battle Round Structure */}
      <CollapsibleSection title="Battle Round — 5 Phases" open={showRound} onToggle={() => setShowRound(!showRound)} accent="text-rust-light">
        <ol className="space-y-2 text-sm text-stone-400">
          <li><strong className="text-stone-200">1. Initiative Roll</strong> — Roll D6 per character. Roll ≤ Agility → Quick Actions; otherwise Slow Actions.</li>
          <li><strong className="text-stone-200">2. Quick Actions Phase</strong> — Player characters that qualified activate in any order.</li>
          <li><strong className="text-stone-200">3. Enemy Actions Phase</strong> — All enemies activate (ranged fires before melee moves).</li>
          <li><strong className="text-stone-200">4. Slow Actions Phase</strong> — Remaining player characters activate.</li>
          <li><strong className="text-stone-200">5. Tracking Phase</strong> — Morale checks, Stun recovery, scenario effects.</li>
        </ol>
      </CollapsibleSection>

      {/* Actions Reference */}
      <CollapsibleSection title="Character Actions" open={showActions} onToggle={() => setShowActions(!showActions)} accent="text-rust-light">
        <div className="text-sm text-stone-400 space-y-3">
          <p>Each activation: <strong className="text-stone-200">Move Action</strong> (up to Speed) + <strong className="text-stone-200">Combat Action</strong> or <strong className="text-stone-200">Non-Combat Action</strong>.</p>
          <div className="space-y-1.5">
            <p><strong className="text-gold">Dash</strong> — Move extra Dash distance. Cannot enter melee.</p>
            <p><strong className="text-gold">Use</strong> — Activate a backpack item.</p>
            <p><strong className="text-gold">Ready Weapon</strong> — Draw or stow a backpack weapon.</p>
            <p><strong className="text-gold">Casting</strong> — Mystic casts one spell.</p>
            <p><strong className="text-gold">Interact</strong> — Half-move; touch objectives, pick locks, search.</p>
            <p><strong className="text-gold">Keep Down!</strong> — Move only 1″. In cover from ranged &gt;6″ away.</p>
            <p><strong className="text-gold">Anticipate</strong> — Mark position. Auto Quick Actions next round.</p>
          </div>
          <p className="text-xs text-stone-500">Ranged attack: max half Speed movement. Crossbows must be stationary.</p>
        </div>
      </CollapsibleSection>

      {/* Ranged Combat */}
      <CollapsibleSection title="Ranged Combat" open={showRanged} onToggle={() => setShowRanged(!showRanged)} accent="text-rust-light">
        <div className="text-sm text-stone-400 space-y-3">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stone-700 text-stone-500 text-xs">
                <th className="pb-1">Situation</th>
                <th className="pb-1 text-right">Roll Needed</th>
              </tr>
            </thead>
            <tbody className="text-stone-300">
              <tr className="border-b border-stone-800"><td className="py-1">Within 6″, open target</td><td className="text-right text-gold font-bold">3+</td></tr>
              <tr className="border-b border-stone-800"><td className="py-1">Within weapon range, open</td><td className="text-right text-gold font-bold">5+</td></tr>
              <tr className="border-b border-stone-800"><td className="py-1">Within range, target in cover</td><td className="text-right text-gold font-bold">6+</td></tr>
              <tr><td className="py-1">Stationary shooter</td><td className="text-right text-forest">+Combat Skill</td></tr>
            </tbody>
          </table>
          <p><strong className="text-stone-200">Natural 1</strong> always misses.</p>
          <p><strong className="text-stone-200">Limited Ammo:</strong> Natural 1 to Hit = out of ammo (unless first shot of battle).</p>
        </div>
      </CollapsibleSection>

      {/* Melee Combat */}
      <CollapsibleSection title="Melee Combat — 3 Exchanges" open={showMelee} onToggle={() => setShowMelee(!showMelee)} accent="text-rust-light">
        <div className="text-sm text-stone-400 space-y-3">
          <p>Bases touching (within 0.5″) triggers melee. Series of <strong className="text-stone-200">3 exchanges</strong>.</p>
          <div className="space-y-2">
            <div>
              <p className="text-stone-200 font-semibold">Each Exchange:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Select weapon (first exchange only)</li>
                <li>Optionally choose a tactic</li>
                <li>Both roll <strong className="text-stone-200">D6 + Combat Skill</strong></li>
                <li>Higher roll strikes; equal = defender retreats 1″, melee ends</li>
                <li><strong className="text-gold">The Push:</strong> Loser retreats 1″. Winner may stay (end) or step up (continue).</li>
              </ol>
            </div>
            <div>
              <p className="text-stone-200 font-semibold">Tactics:</p>
              <p><strong className="text-gold">Defensively</strong> — Roll twice, pick best. Inflict no hits. Negates Counter Attack.</p>
              <p><strong className="text-gold">Evasively</strong> — Roll normally, inflict no hits. May move 2″ and end melee.</p>
              <p><strong className="text-gold">Furiously</strong> — If you win: +1 to Overcome Armor or Toughness. If you lose: take a Hit.</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Damage Resolution */}
      <CollapsibleSection title="Damage Resolution (Hits)" open={showDamage} onToggle={() => setShowDamage(!showDamage)} accent="text-rust-light">
        <div className="text-sm text-stone-400 space-y-3">
          <p>Hit format: <strong className="text-gold">+X/+Y</strong> (Overcome Armor / Overcome Toughness)</p>
          <div>
            <p className="text-stone-200 font-semibold">Step 1 — Overcome Armor:</p>
            <p className="ml-2">If Armor = 0, skip to Step 2.</p>
            <p className="ml-2">Roll D6 + Armor bonus (+X).</p>
            <ul className="ml-4 space-y-0.5">
              <li>Total &gt; Armor → proceed to Step 2</li>
              <li>Total = Armor → <strong className="text-gold">Stunned</strong> (attack fails)</li>
              <li>Total &lt; Armor → attack fails</li>
            </ul>
          </div>
          <div>
            <p className="text-stone-200 font-semibold">Step 2 — Overcome Toughness:</p>
            <p className="ml-2">Roll D6. Natural 1 = <strong className="text-gold">Stunned</strong> only.</p>
            <p className="ml-2">Otherwise add Toughness bonus (+Y).</p>
            <ul className="ml-4 space-y-0.5">
              <li>Total &gt; Toughness → <strong className="text-rust-light">Casualty</strong> (removed)</li>
              <li>Total ≤ Toughness → <strong className="text-gold">Wounded + Stunned</strong></li>
            </ul>
          </div>
          <div>
            <p className="text-stone-200 font-semibold">Status Effects:</p>
            <p><strong className="text-gold">Stunned</strong> — Must fight as Defender, opponent +1 Combat Bonus. Auto-recovers end of phase.</p>
            <p><strong className="text-gold">Wounded</strong> — May act normally. Second Wound = casualty. Doesn't carry between battles.</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Weapon Reference */}
      <CollapsibleSection title="Weapon Reference" open={showWeapons} onToggle={() => setShowWeapons(!showWeapons)} accent="text-gold">
        <div className="space-y-4 text-sm">
          {[
            { label: 'Basic Weapons', desc: 'Followers can use', weapons: WEAPON_TABLE.basic },
            { label: 'Quality Weapons', desc: 'Heroes only; Followers use as +0/+0', weapons: WEAPON_TABLE.quality },
          ].map(group => (
            <div key={group.label}>
              <p className="text-stone-200 font-semibold mb-1">{group.label} <span className="text-stone-500 font-normal text-xs">({group.desc})</span></p>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-stone-700 text-stone-500 text-xs">
                    <th className="pb-1">Weapon</th>
                    <th className="pb-1 text-center">Damage</th>
                    <th className="pb-1 text-center">Range</th>
                    <th className="pb-1">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-stone-300">
                  {group.weapons.map(w => (
                    <tr key={w.name} className="border-b border-stone-800">
                      <td className="py-1">{w.name}</td>
                      <td className="py-1 text-center text-gold font-bold">{w.damage}</td>
                      <td className="py-1 text-center text-stone-500">{w.range || '—'}</td>
                      <td className="py-1 text-xs text-stone-500">{w.notes || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <div>
            <p className="text-stone-200 font-semibold mb-1">Superior Modifiers <span className="text-stone-500 font-normal text-xs">(one per weapon)</span></p>
            <div className="space-y-1 text-stone-400">
              <p><strong className="text-sky-accent">Fine</strong> — Ignores first Damage; no longer Fine after.</p>
              <p><strong className="text-sky-accent">Balanced</strong> — Enemy can't gain Counter Attack.</p>
              <p><strong className="text-sky-accent">Quick</strong> — Enemy can't use Parry.</p>
              <p><strong className="text-sky-accent">Fey Steel</strong> — Can't be Damaged or broken.</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Armor Reference */}
      <CollapsibleSection title="Armor Reference" open={showArmor} onToggle={() => setShowArmor(!showArmor)} accent="text-gold">
        <div className="space-y-3 text-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stone-700 text-stone-500 text-xs">
                <th className="pb-1">Armor</th>
                <th className="pb-1 text-center">Rating</th>
                <th className="pb-1">Penalty</th>
              </tr>
            </thead>
            <tbody className="text-stone-300">
              <tr className="border-b border-stone-800"><td className="py-1">Unarmored</td><td className="text-center text-gold font-bold">0</td><td className="text-stone-500">—</td></tr>
              <tr className="border-b border-stone-800"><td className="py-1">Light armor</td><td className="text-center text-gold font-bold">1</td><td className="text-stone-500">—</td></tr>
              <tr className="border-b border-stone-800"><td className="py-1">Partial armor</td><td className="text-center text-gold font-bold">2</td><td className="text-stone-500">Dash −1″</td></tr>
              <tr className="border-b border-stone-800"><td className="py-1">Full armor</td><td className="text-center text-gold font-bold">3</td><td className="text-stone-500">Dash −2″</td></tr>
              <tr><td className="py-1">Knight armor</td><td className="text-center text-gold font-bold">3</td><td className="text-stone-500">Cannot Dash. Enemies get no Overcome Armor bonus.</td></tr>
            </tbody>
          </table>
          <div className="text-stone-400">
            <p><strong className="text-stone-200">Shield</strong> — +1 Armor vs ranged attacks. Grants Parry.</p>
            <p><strong className="text-stone-200">Helmet</strong> — Doubles on Injury Table = knocked out (helmet Damaged), no negative effect.</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Combat Modifiers */}
      <CollapsibleSection title="Combat Modifiers & Special Rules" open={showModifiers} onToggle={() => setShowModifiers(!showModifiers)} accent="text-rust-light">
        <div className="text-sm text-stone-400 space-y-2">
          <p><strong className="text-stone-200">Combat Bonus (+1)</strong> — Opponent is Stunned OR you have an ally within 1″.</p>
          <p><strong className="text-stone-200">Parry</strong> — Natural 1 when defending deflects the blow (no damage, no stun).</p>
          <p><strong className="text-stone-200">Counter Attack</strong> — Even as defender, if you win the exchange you may strike.</p>
          <p><strong className="text-stone-200">Difficult Terrain</strong> — 1″ of movement costs 2″ of allowance.</p>
        </div>
      </CollapsibleSection>

      {/* Enemy Morale */}
      <CollapsibleSection title="Enemy Morale" open={showMorale} onToggle={() => setShowMorale(!showMorale)} accent="text-rust-light">
        <div className="text-sm text-stone-400 space-y-2">
          <p>In the <strong className="text-stone-200">Tracking Phase</strong>, roll D6 per enemy casualty this round:</p>
          <p className="ml-2"><strong className="text-gold">1–2</strong> = Morale Failure → remove one enemy (closest to table edge first).</p>
          <p className="ml-2"><strong className="text-stone-200">Leaders</strong> don't flee unless fewer than 4 enemies remain.</p>
          <p className="ml-2"><strong className="text-stone-200">Aberrations / Undead</strong> fight to the death.</p>
        </div>
      </CollapsibleSection>
    </div>
  )
}
