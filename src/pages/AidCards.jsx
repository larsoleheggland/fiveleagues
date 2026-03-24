import { useState, useRef, useCallback, useEffect } from 'react'

const CARDS = [
  {
    title: 'Melee Combat',
    color: 'rust',
    content: (
      <>
        <p className="text-stone-100 text-base mb-3">Series of <strong className="text-parchment">3 exchanges</strong>. Initiator = attacker in first exchange.</p>
        <div className="space-y-3 text-base">
          <div>
            <h4 className="font-display text-rust text-base mb-1">Each Exchange</h4>
            <p className="text-white">Both roll <strong className="text-parchment">D6 + Combat Skill</strong>. Attacker higher = strikes blow, stays Attacker. Defender higher = avoids harm, becomes Attacker. Draw = Defender retreats 1", melee ends.</p>
          </div>
          <div>
            <h4 className="font-display text-rust text-base mb-1">Tactics</h4>
            <ul className="space-y-1.5">
              <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span><strong className="text-parchment">Defensive:</strong> Roll twice pick best, inflict no Hits, negates Counter Attack.</span></li>
              <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span><strong className="text-parchment">Evasive:</strong> Roll normally, inflict no Hits, may move 2" ending melee.</span></li>
              <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span><strong className="text-parchment">Furious</strong> (attacker only): Win = +1 to Overcome Armor OR Toughness. Lose = suffer Hit.</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-rust text-base mb-1">The Push</h4>
            <p className="text-white">Loser retreats <strong className="text-parchment">1"</strong>. Winner may stay (end melee) or step up 1" (continue). Enemies always step up. Can't retreat = <strong className="text-parchment">Stunned</strong> + extra exchange.</p>
          </div>
          <div>
            <h4 className="font-display text-rust text-base mb-1">Combat Bonus</h4>
            <p className="text-white"><strong className="text-parchment">+1</strong> Combat Skill if opponent Stunned OR you have ally within <strong className="text-parchment">1"</strong>. Only one bonus applies. No ally bonus in confined spaces/doorways.</p>
          </div>
        </div>
        <hr className="border-stone-700 my-4" />
        <div className="space-y-3 text-base">
          <div>
            <h4 className="font-display text-rust text-base mb-1">Counter Attack</h4>
            <p className="text-white">Strike a Hit when winning exchange even as Defender. Requires: <strong className="text-parchment">higher ground</strong>, fighting across obstacle, opponent in difficult/water, or weapon/trait grants it.</p>
          </div>
          <div>
            <h4 className="font-display text-rust text-base mb-1">Parry</h4>
            <p className="text-white">Natural <strong className="text-parchment">1</strong> defending in melee = deflects blow (no damage/Stun/effects).</p>
          </div>
        </div>
      </>
    )
  },
  {
    title: 'Ranged Combat',
    color: 'rust',
    content: (
      <>
        <p className="text-stone-100 text-base mb-3">Select visible target in range. If visible opponents within <strong className="text-parchment">3"</strong>, must shoot nearest.</p>
        <div className="mb-4">
          <h4 className="font-display text-rust text-base mb-2">To Hit (D6)</h4>
          <table className="w-full text-base">
            <tbody>
              <tr className="border-b border-stone-700">
                <td className="py-2 text-white">Within 6", in open</td>
                <td className="py-2 text-parchment text-right font-bold">3+</td>
              </tr>
              <tr className="border-b border-stone-700">
                <td className="py-2 text-white">Within weapon range, in open</td>
                <td className="py-2 text-parchment text-right font-bold">5+</td>
              </tr>
              <tr className="border-b border-stone-700">
                <td className="py-2 text-white">Within range, concealed/Cover</td>
                <td className="py-2 text-parchment text-right font-bold">6+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="space-y-2 text-base mb-4">
          <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span>Stationary shooter adds <strong className="text-parchment">Combat Skill</strong>.</span></li>
          <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span>Natural <strong className="text-red-400">1</strong> always misses.</span></li>
          <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span>Moving = max <strong className="text-parchment">half</strong> movement Speed. Crossbow = must be stationary.</span></li>
          <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span><strong className="text-parchment">Limited Ammo:</strong> natural 1 to Hit = out of ammo (unless first shot).</span></li>
        </ul>
        <hr className="border-stone-700 my-4" />
        <div>
          <h4 className="font-display text-rust text-base mb-2">Resolving Hits</h4>
          <p className="text-white mb-2">Hit damage written as <strong className="text-parchment">+x/+y</strong> (Armor bonus / Toughness bonus).</p>
          <div className="space-y-2">
            <div>
              <h4 className="font-display text-white text-sm">Step 1: Overcome Armor</h4>
              <p className="text-white text-sm">Roll D6 + bonus. &gt; Armor = proceed. = Armor = Stunned. &lt; Armor = attack fails.</p>
            </div>
            <div>
              <h4 className="font-display text-white text-sm">Step 2: Overcome Toughness</h4>
              <p className="text-white text-sm">Roll D6. Natural 1 = Stunned. Add bonus: &gt; Toughness = casualty. ≤ Toughness = Wounded + Stunned.</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    title: 'Terrain & Cover',
    color: 'forest',
    content: (
      <>
        <div className="space-y-4 text-base">
          <div>
            <h4 className="font-display text-forest text-base">Interaction</h4>
            <p className="text-white">Block, Linear and Interior features can typically be climbed.</p>
          </div>
          <div>
            <h4 className="font-display text-forest text-base">Area Features</h4>
            <p className="text-white">LoS can pass through up to <strong className="text-parchment">3"</strong> whether shooting into, out of, or through.</p>
          </div>
          <div>
            <h4 className="font-display text-forest text-base">Linear Features</h4>
            <p className="text-white">Hedges, solid fences, walls etc. LoS blocked <strong className="text-parchment">3"</strong> beyond it, unless shooter or target within <strong className="text-parchment">1"</strong> of where LoS crosses it.</p>
          </div>
          <div>
            <h4 className="font-display text-forest text-base">Cover</h4>
            <p className="text-white text-sm mb-1">Including rail/open fences:</p>
            <ul className="space-y-1 text-white">
              <li className="flex gap-2"><span className="text-forest shrink-0">•</span>LoS crosses feature &gt;1" from shooter.</li>
              <li className="flex gap-2"><span className="text-forest shrink-0">•</span>Target is within an Area feature.</li>
              <li className="flex gap-2"><span className="text-forest shrink-0">•</span>Target in contact with corner of Block Terrain.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-forest text-base">Difficult Terrain</h4>
            <p className="text-white">Water, wet, marshy, swampy — <strong className="text-parchment">No Dash</strong>. Water: no ranged attacks. Thorny bushes/hedgerows only entered if <strong className="text-parchment">Armor &gt; 0</strong>.</p>
          </div>
        </div>
      </>
    )
  },
  {
    title: 'Will Points',
    color: 'rust',
    content: (
      <>
        <p className="text-stone-100 text-base mb-3">Used during battles. Regained at end of an encounter.</p>
        <p className="text-white text-base mb-2">Non-humans can have only 1 point of Will.</p>
        <p className="font-display text-base text-white mb-2">Spend 1 point to:</p>
        <ul className="space-y-3 text-base">
          <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span>Move additional <strong className="text-parchment">4"</strong> after a normal move.</span></li>
          <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span>Activate in <strong className="text-parchment">Quick Actions Phase</strong> regardless of assigned die.</span></li>
          <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span>Remove <strong className="text-parchment">Stunned</strong> status and gain initiative at end of melee exchange.</span></li>
          <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span>Add <strong className="text-parchment">+2</strong> to a proficiency test before you roll (cumulative with all other bonuses).</span></li>
        </ul>
        <hr className="border-stone-700 my-4" />
        <div className="mb-4">
          <h3 className="font-display text-gold text-lg mb-2">Luck</h3>
          <p className="text-base text-white">Apply when rolling for <strong className="text-parchment">post-game injuries</strong>. Each Luck point will save you from a grim fate... <strong className="text-parchment">once!</strong></p>
        </div>
        <div>
          <h3 className="font-display text-gold text-lg mb-2">Story Points</h3>
          <ul className="space-y-3 text-base">
            <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Character struck by any attack or spell — <strong className="text-parchment">avoids it</strong>.</span></li>
            <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span><strong className="text-parchment">Reroll</strong> any die roll you just made and use either result. Cannot roll a third time.</span></li>
          </ul>
        </div>
      </>
    )
  },
  {
    title: 'Spells',
    color: 'sky-accent',
    content: (
      <>
        <p className="text-stone-100 text-base mb-3">Non-Combat Action — only attempt a single spell each round. Mystic begins each battle with <strong className="text-parchment">3 Strands</strong>. Unused Strands evaporate at end of battle. Congealed Strands can be saved.</p>
        <p className="font-display text-base text-white mb-2">Roll 2D6 + Mystic Casting ability:</p>
        <ul className="space-y-2 text-base mb-4">
          <li className="flex gap-2"><span className="text-red-400 shrink-0">2</span><span>Natural 2 — <strong className="text-red-400">fails</strong>. 1 Strand expended.</span></li>
          <li className="flex gap-2"><span className="text-stone-300 shrink-0">&lt;</span><span>Below Incantation — <strong className="text-stone-300">fails</strong>; 0 strands used.</span></li>
          <li className="flex gap-2"><span className="text-forest shrink-0">≥</span><span>Meets/exceeds Incantation — <strong className="text-forest">success</strong>; 1 Strand used.</span></li>
          <li className="flex gap-2"><span className="text-gold shrink-0">12</span><span>Natural 12 — <strong className="text-gold">success</strong>; 0 strands used!</span></li>
        </ul>
        <div className="space-y-2 mb-4">
          <div>
            <h4 className="font-display text-sky-accent text-base">Desperation Casting</h4>
            <p className="text-sm text-white">If casting fails, spend <strong className="text-parchment">1 Will</strong> to add <strong className="text-parchment">+2</strong> retroactively.</p>
          </div>
          <div>
            <h4 className="font-display text-red-400 text-base">Ether Burn</h4>
            <p className="text-sm text-white">Must spend a Strand but have none? Mystic is <strong className="text-red-400">Wounded</strong>.</p>
          </div>
        </div>
        <hr className="border-stone-700 my-4" />
        <div className="mb-3">
          <h4 className="font-display text-sky-accent text-base mb-1">Special Conditions</h4>
          <ul className="space-y-2 text-base">
            <li className="flex gap-2"><span className="text-sky-accent shrink-0">*</span><span><strong className="text-parchment">Simple:</strong> No Strand cost, but natural 2 still expends 1.</span></li>
            <li className="flex gap-2"><span className="text-sky-accent shrink-0">†</span><span><strong className="text-parchment">Taxing:</strong> Only cast once per battle.</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sky-accent text-base mb-1">Durations</h4>
          <ul className="space-y-2 text-base">
            <li className="flex gap-2"><span className="text-stone-300 shrink-0">→</span><span><strong className="text-parchment">Immediate:</strong> Takes effect when cast.</span></li>
            <li className="flex gap-2"><span className="text-stone-300 shrink-0">→</span><span><strong className="text-parchment">Activation:</strong> Until caster's next activation ends.</span></li>
            <li className="flex gap-2"><span className="text-stone-300 shrink-0">→</span><span><strong className="text-parchment">Full Round:</strong> Until Tracking Phase of next round.</span></li>
            <li className="flex gap-2"><span className="text-stone-300 shrink-0">→</span><span><strong className="text-parchment">Battle:</strong> Rest of the battle.</span></li>
          </ul>
        </div>
      </>
    )
  },
  {
    title: 'Distance Fallen',
    color: 'rust',
    content: (
      <>
        <p className="text-base text-white mb-3">Damage suffered from falling.</p>
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-stone-600">
              <th className="text-left py-2 text-stone-300 font-display text-sm">Distance</th>
              <th className="text-right py-2 text-stone-300 font-display text-sm">Damage</th>
            </tr>
          </thead>
          <tbody>
            {[['Up to 3"', '+1 / +0'], ['Up to 5"', '+2 / +1'], ['Up to 8"', '+3 / +2'], ['Over 8"', 'Automatic casualty']].map(([dist, dmg]) => (
              <tr key={dist} className="border-b border-stone-700/50">
                <td className="py-2.5 text-white">{dist}</td>
                <td className={`py-2.5 text-right font-bold ${dmg === 'Automatic casualty' ? 'text-red-400' : 'text-parchment'}`}>{dmg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  },
  {
    title: 'Unknown Enemies',
    color: 'rust',
    content: (
      <>
        <p className="text-base text-white mb-3">Move in Enemy Actions Phase <strong className="text-parchment">5"</strong>/round to centre of battlefield, then random direction.</p>
        <div className="mb-4">
          <h4 className="font-display text-rust text-base mb-2">Spotting Distance</h4>
          <table className="w-full text-base">
            <tbody>
              <tr className="border-b border-stone-700">
                <td className="py-1.5 text-white">In sight, partially obscured</td>
                <td className="py-1.5 text-parchment text-right font-bold">6"</td>
              </tr>
              <tr className="border-b border-stone-700">
                <td className="py-1.5 text-white">Unobscured Line of Sight</td>
                <td className="py-1.5 text-parchment text-right font-bold">9"</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="font-display text-rust text-base mb-2">Number of Enemies (D6)</h4>
          <div className="grid grid-cols-5 gap-1.5 text-center text-base">
            {[['1','1'],['2','2'],['3-4','3'],['5','4'],['6','5']].map(([roll, count]) => (
              <div key={roll} className="bg-stone-800 rounded p-1.5">
                <div className="text-stone-300 text-sm">D6: {roll}</div>
                <div className="text-parchment font-bold">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  },
  {
    title: 'Races',
    color: 'gold',
    content: (
      <>
        <div className="space-y-4 text-base">
          <div>
            <h4 className="font-display text-gold text-base mb-1">👤 Human</h4>
            <ul className="space-y-1">
              <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Can attain more than one point of <strong className="text-parchment">Will</strong>. Will advancement = <strong className="text-parchment">+2 XP</strong>.</span></li>
              <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Add <strong className="text-parchment">+1</strong> to all <strong className="text-sky-accent">[Speech]</strong> tests.</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-gold text-base mb-1">🌑 Duskling</h4>
            <ul className="space-y-1">
              <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Moving into Melee — cannot Parry, may <strong className="text-parchment">reroll first exchange</strong>.</span></li>
              <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span><strong className="text-parchment">+1</strong> <strong className="text-sky-accent">[Traveling]</strong>. Counter Attack vs <strong className="text-parchment">undead</strong>.</span></li>
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✕</span><span className="text-stone-300">No ally spells. Single magic item pre/post encounter.</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-gold text-base mb-1">🐾 Feral</h4>
            <ul className="space-y-1">
              <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Def battle: <strong className="text-parchment">+1</strong> enemy inf. Raid: <strong className="text-parchment">-1</strong> enemy spot. <strong className="text-parchment">+1</strong> <strong className="text-sky-accent">[Scouting]</strong>.</span></li>
              <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span><strong className="text-parchment">Full move</strong> and ranged (or half if normally prohibited).</span></li>
              <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>+1 <strong className="text-parchment">Speech, Leadership or Scholar</strong> skill.</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-gold text-base mb-1">🦅 Preen</h4>
            <div className="bg-stone-800/60 rounded p-2 mb-1 text-sm">
              <p className="text-white"><strong className="text-parchment">Angry</strong> if ally within 6" is casualty/hit by ranged/spell. Full move + dash to nearest enemy. Weapon -1/+0 becomes <strong className="text-parchment">0/+1</strong>.</p>
            </div>
            <ul className="space-y-1">
              <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span><strong className="text-parchment">+1</strong> <strong className="text-sky-accent">[Crafting]</strong>. Speed <strong className="text-parchment">+0"/+1"</strong>.</span></li>
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✕</span><span className="text-stone-300">No higher ground Counter Attack bonus.</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-gold text-base mb-1">✦ Fey-blood</h4>
            <ul className="space-y-1">
              <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>May <strong className="text-parchment">reroll</strong> initiative die &gt; Agility. <strong className="text-parchment">+1</strong> <strong className="text-sky-accent">[Wits]</strong>.</span></li>
              <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Melee opponents <strong className="text-parchment">lose ally combat bonus</strong>.</span></li>
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✕</span><span className="text-stone-300">No Luck points — luck increase becomes skill.</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-gold text-base mb-1">🍃 Halfling</h4>
            <ul className="space-y-1">
              <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Concealed/cover target: hit on <strong className="text-parchment">5+</strong>. <strong className="text-parchment">+1</strong> <strong className="text-sky-accent">[Wilderness]</strong>.</span></li>
              <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span><strong className="text-parchment">Never</strong> roll on Flight in the Dark Table.</span></li>
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✕</span><span className="text-stone-300">No warhammers, bastard swords, long bows.</span></li>
            </ul>
          </div>
        </div>
      </>
    )
  },
  {
    title: 'Stars of the Story',
    color: 'sky-accent',
    content: (
      <>
        <p className="text-stone-100 text-base mb-3">Each can be used <strong className="text-parchment">once</strong> during a campaign.</p>
        <div className="space-y-4 text-base">
          <div>
            <h4 className="font-display text-sky-accent text-base">Better Part of Valor</h4>
            <p className="text-white">Entire warband immediately escapes battle. Don't roll on Flight in the Dark table.</p>
          </div>
          <div>
            <h4 className="font-display text-sky-accent text-base">A Lucky Break!</h4>
            <p className="text-white">Ignore a roll just made on the Injury Table or Flight in the Dark Table.</p>
          </div>
          <div>
            <h4 className="font-display text-sky-accent text-base">What About Old Friends?</h4>
            <p className="text-white">At beginning of a battle round, roll a new Hero. Place within 6" of any edge. Acts immediately. May remain in warband after.</p>
          </div>
          <div>
            <h4 className="font-display text-sky-accent text-base">I Don't Think That's How the Story Went...</h4>
            <p className="text-white">Any random event table — roll twice, pick result, or nothing happens.</p>
          </div>
          <div>
            <h4 className="font-display text-sky-accent text-base">Did I Ever Tell You How I Learned To Do This?</h4>
            <p className="text-white">Auto succeed at a proficiency test. If skill applicable, add permanently to character.</p>
          </div>
        </div>
        <hr className="border-stone-700 my-4" />
        <div className="space-y-3 text-base">
          <div>
            <h4 className="font-display text-sky-accent text-base mb-1">Avatar</h4>
            <p className="text-white">If Avatar dies, when you begin a new campaign roll <strong className="text-parchment">2D6: 9+</strong> — your existing Avatar escaped and will return to warband.</p>
          </div>
          <div>
            <h4 className="font-display text-sky-accent text-base mb-1">Non-Humans and Will</h4>
            <p className="text-white">If a non-human character would receive <strong className="text-parchment">2 Will</strong>, count as <strong className="text-parchment">1 Will and 3 XP</strong>.</p>
          </div>
        </div>
      </>
    )
  }
]

const COLOR_MAP = {
  'rust': { border: 'border-rust/30', bg: 'bg-stone-900', text: 'text-rust', dot: 'bg-rust' },
  'gold': { border: 'border-gold/30', bg: 'bg-stone-900', text: 'text-gold', dot: 'bg-gold' },
  'sky-accent': { border: 'border-sky-accent/30', bg: 'bg-stone-900', text: 'text-sky-accent', dot: 'bg-sky-accent' },
  'forest': { border: 'border-forest/30', bg: 'bg-stone-900', text: 'text-forest', dot: 'bg-forest' },
}

export default function AidCards() {
  const [current, setCurrent] = useState(0)
  const touchStart = useRef(null)
  const touchDelta = useRef(0)
  const containerRef = useRef(null)
  const [swiping, setSwiping] = useState(false)
  const [swipeOffset, setSwipeOffset] = useState(0)

  const goTo = useCallback((index) => {
    setCurrent(Math.max(0, Math.min(CARDS.length - 1, index)))
    setSwipeOffset(0)
  }, [])

  const onTouchStart = useCallback((e) => {
    touchStart.current = e.touches[0].clientX
    touchDelta.current = 0
    setSwiping(true)
  }, [])

  const onTouchMove = useCallback((e) => {
    if (touchStart.current === null) return
    const delta = e.touches[0].clientX - touchStart.current
    touchDelta.current = delta
    setSwipeOffset(delta)
  }, [])

  const onTouchEnd = useCallback(() => {
    setSwiping(false)
    const threshold = 50
    if (touchDelta.current < -threshold) {
      goTo(current + 1)
    } else if (touchDelta.current > threshold) {
      goTo(current - 1)
    } else {
      setSwipeOffset(0)
    }
    touchStart.current = null
    touchDelta.current = 0
  }, [current, goTo])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') goTo(current - 1)
      if (e.key === 'ArrowRight') goTo(current + 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current, goTo])

  const card = CARDS[current]
  const colors = COLOR_MAP[card.color]

  return (
    <div className="min-h-[100dvh] bg-stone-950 flex flex-col select-none">
      {/* Header */}
      <header className="shrink-0 px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <a href="/" className="text-stone-600 text-xs font-display tracking-wider hover:text-stone-400 transition-colors">
            &larr; TRACKER
          </a>
          <span className="text-stone-600 text-xs font-body">
            {current + 1} / {CARDS.length}
          </span>
        </div>
      </header>

      {/* Card area */}
      <div
        ref={containerRef}
        className="flex-1 flex items-stretch px-4 pb-2 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={`w-full rounded-xl border ${colors.border} ${colors.bg} p-6 flex flex-col ${
            swiping ? '' : 'transition-transform duration-200 ease-out'
          }`}
          style={{ transform: `translateX(${swipeOffset}px)` }}
        >
          <h2 className={`font-display text-2xl tracking-wide ${colors.text} mb-4 flex items-center gap-2`}>
            {card.icon && <span>{card.icon}</span>}
            {card.title}
          </h2>
          <div className="flex-1 text-white font-body overflow-y-auto">
            {card.content}
          </div>
        </div>
      </div>

      {/* Dot navigation */}
      <nav className="shrink-0 px-4 pb-5 pt-2">
        <div className="flex justify-center gap-1.5 flex-wrap">
          {CARDS.map((c, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? `w-6 h-2 ${COLOR_MAP[c.color].dot}`
                  : 'w-2 h-2 bg-stone-700 hover:bg-stone-500'
              }`}
              aria-label={`Go to card: ${c.title}`}
            />
          ))}
        </div>
      </nav>
    </div>
  )
}
