import { useState, useRef, useCallback, useEffect } from 'react'

const CARDS = [
  {
    title: 'Will Points',
    color: 'rust',
    content: (
      <>
        <p className="text-stone-400 text-sm mb-3">Used during battles. Regained at end of an encounter.</p>
        <p className="text-stone-300 text-sm mb-2">Non-humans can have only 1 point of Will.</p>
        <p className="font-display text-sm text-stone-200 mb-2">Spend 1 point to:</p>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span>Move additional <strong className="text-parchment">4"</strong> after a normal move.</span></li>
          <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span>Activate in <strong className="text-parchment">Quick Actions Phase</strong> regardless of assigned die.</span></li>
          <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span>Remove <strong className="text-parchment">Stunned</strong> status and gain initiative at end of melee exchange.</span></li>
          <li className="flex gap-2"><span className="text-rust shrink-0">•</span><span>Add <strong className="text-parchment">+2</strong> to a proficiency test before you roll (cumulative with all other bonuses).</span></li>
        </ul>
      </>
    )
  },
  {
    title: 'Luck & Story Points',
    color: 'gold',
    content: (
      <>
        <div className="mb-5">
          <h3 className="font-display text-gold text-base mb-2">Luck</h3>
          <p className="text-sm text-stone-300">Apply when rolling for <strong className="text-parchment">post-game injuries</strong>. Each Luck point will save you from a grim fate... <strong className="text-parchment">once!</strong></p>
        </div>
        <div>
          <h3 className="font-display text-gold text-base mb-2">Story Points</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Character struck by any attack or spell — <strong className="text-parchment">avoids it</strong>.</span></li>
            <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span><strong className="text-parchment">Reroll</strong> any die roll you just made and use either result. Cannot roll a third time.</span></li>
          </ul>
        </div>
      </>
    )
  },
  {
    title: 'Casting Spells',
    color: 'sky-accent',
    content: (
      <>
        <p className="text-stone-400 text-sm mb-3">Non-Combat Action — only attempt a single spell each round. Target must be in LoS (unless spell says otherwise).</p>
        <p className="font-display text-sm text-stone-200 mb-2">Roll 2D6 + Mystic Casting ability:</p>
        <ul className="space-y-1.5 text-sm mb-4">
          <li className="flex gap-2"><span className="text-red-400 shrink-0">2</span><span>Natural 2 — <strong className="text-red-400">fails</strong>. 1 Strand expended.</span></li>
          <li className="flex gap-2"><span className="text-stone-500 shrink-0">&lt;</span><span>Below Incantation — <strong className="text-stone-400">fails</strong>; 0 strands used.</span></li>
          <li className="flex gap-2"><span className="text-forest shrink-0">≥</span><span>Meets/exceeds Incantation — <strong className="text-forest">success</strong>; 1 Strand used.</span></li>
          <li className="flex gap-2"><span className="text-gold shrink-0">12</span><span>Natural 12 — <strong className="text-gold">success</strong>; 0 strands used!</span></li>
        </ul>
        <div className="border-t border-stone-700 pt-3 space-y-2">
          <div>
            <h4 className="font-display text-sky-accent text-sm">Desperation Casting</h4>
            <p className="text-xs text-stone-400">If casting fails, spend <strong className="text-parchment">1 Will</strong> to add <strong className="text-parchment">+2</strong> retroactively.</p>
          </div>
          <div>
            <h4 className="font-display text-red-400 text-sm">Ether Burn</h4>
            <p className="text-xs text-stone-400">Must spend a Strand but have none? Mystic is <strong className="text-red-400">Wounded</strong>.</p>
          </div>
        </div>
      </>
    )
  },
  {
    title: 'Spells Overview',
    color: 'sky-accent',
    content: (
      <>
        <p className="text-sm text-stone-300 mb-3">A Mystic begins each battle with <strong className="text-parchment">3 Strands</strong>. Unused Strands evaporate at end of battle. Congealed Strands can be saved.</p>
        <div className="mb-3">
          <h4 className="font-display text-sky-accent text-sm mb-1">Special Conditions</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex gap-2"><span className="text-sky-accent shrink-0">*</span><span><strong className="text-parchment">Simple:</strong> No Strand cost, but natural 2 still expends 1.</span></li>
            <li className="flex gap-2"><span className="text-sky-accent shrink-0">†</span><span><strong className="text-parchment">Taxing:</strong> Only cast once per battle.</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sky-accent text-sm mb-1">Durations</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex gap-2"><span className="text-stone-500 shrink-0">→</span><span><strong className="text-parchment">Immediate:</strong> Takes effect when cast.</span></li>
            <li className="flex gap-2"><span className="text-stone-500 shrink-0">→</span><span><strong className="text-parchment">Activation:</strong> Until caster's next activation ends.</span></li>
            <li className="flex gap-2"><span className="text-stone-500 shrink-0">→</span><span><strong className="text-parchment">Full Round:</strong> Until Tracking Phase of next round.</span></li>
            <li className="flex gap-2"><span className="text-stone-500 shrink-0">→</span><span><strong className="text-parchment">Battle:</strong> Rest of the battle.</span></li>
          </ul>
        </div>
      </>
    )
  },
  {
    title: 'Terrain & Cover',
    color: 'forest',
    content: (
      <>
        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-display text-forest text-sm">Interaction</h4>
            <p className="text-stone-400">Block, Linear and Interior features can typically be climbed.</p>
          </div>
          <div>
            <h4 className="font-display text-forest text-sm">Area Features</h4>
            <p className="text-stone-400">LoS can pass through up to <strong className="text-parchment">3"</strong> whether shooting into, out of, or through.</p>
          </div>
          <div>
            <h4 className="font-display text-forest text-sm">Linear Features</h4>
            <p className="text-stone-400">Hedges, solid fences, walls etc. LoS blocked <strong className="text-parchment">3"</strong> beyond it, unless shooter or target within <strong className="text-parchment">1"</strong> of where LoS crosses it.</p>
          </div>
          <div>
            <h4 className="font-display text-forest text-sm">Cover</h4>
            <p className="text-stone-400 text-xs mb-1">Including rail/open fences:</p>
            <ul className="space-y-0.5 text-stone-400">
              <li className="flex gap-2"><span className="text-forest shrink-0">•</span>LoS crosses feature &gt;1" from shooter.</li>
              <li className="flex gap-2"><span className="text-forest shrink-0">•</span>Target is within an Area feature.</li>
              <li className="flex gap-2"><span className="text-forest shrink-0">•</span>Target in contact with corner of Block Terrain.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-forest text-sm">Difficult Terrain</h4>
            <p className="text-stone-400">Water, wet, marshy, swampy — <strong className="text-parchment">No Dash</strong>. Water: no ranged attacks. Thorny bushes/hedgerows only entered if <strong className="text-parchment">Armor &gt; 0</strong>.</p>
          </div>
        </div>
      </>
    )
  },
  {
    title: 'Unknown Enemies',
    color: 'rust',
    content: (
      <>
        <p className="text-sm text-stone-300 mb-3">Move in Enemy Actions Phase <strong className="text-parchment">5"</strong>/round to centre of battlefield, then random direction.</p>
        <div className="mb-4">
          <h4 className="font-display text-rust text-sm mb-2">Spotting Distance</h4>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-stone-700">
                <td className="py-1.5 text-stone-300">In sight, partially obscured</td>
                <td className="py-1.5 text-parchment text-right font-bold">6"</td>
              </tr>
              <tr className="border-b border-stone-700">
                <td className="py-1.5 text-stone-300">Unobscured Line of Sight</td>
                <td className="py-1.5 text-parchment text-right font-bold">9"</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="font-display text-rust text-sm mb-2">Number of Enemies (D6)</h4>
          <div className="grid grid-cols-5 gap-1 text-center text-sm">
            {[['1','1'],['2','2'],['3-4','3'],['5','4'],['6','5']].map(([roll, count]) => (
              <div key={roll} className="bg-stone-800 rounded p-1.5">
                <div className="text-stone-500 text-xs">D6: {roll}</div>
                <div className="text-parchment font-bold">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  },
  {
    title: 'Distance Fallen',
    color: 'rust',
    content: (
      <>
        <p className="text-sm text-stone-400 mb-3">Damage suffered from falling.</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-600">
              <th className="text-left py-2 text-stone-400 font-display text-xs">Distance</th>
              <th className="text-right py-2 text-stone-400 font-display text-xs">Damage</th>
            </tr>
          </thead>
          <tbody>
            {[['Up to 3"', '+1 / +0'], ['Up to 5"', '+2 / +1'], ['Up to 8"', '+3 / +2'], ['Over 8"', 'Automatic casualty']].map(([dist, dmg]) => (
              <tr key={dist} className="border-b border-stone-700/50">
                <td className="py-2.5 text-stone-300">{dist}</td>
                <td className={`py-2.5 text-right font-bold ${dmg === 'Automatic casualty' ? 'text-red-400' : 'text-parchment'}`}>{dmg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  },
  {
    title: 'Human',
    color: 'gold',
    icon: '👤',
    content: (
      <ul className="space-y-2 text-sm">
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Can attain more than one point of <strong className="text-parchment">Will</strong>.</span></li>
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Will advancement increases immediately <strong className="text-parchment">+2 XP</strong>.</span></li>
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Add <strong className="text-parchment">+1</strong> to all <strong className="text-sky-accent">[Speech]</strong> tests.</span></li>
      </ul>
    )
  },
  {
    title: 'Duskling',
    color: 'gold',
    icon: '🌑',
    content: (
      <ul className="space-y-2 text-sm">
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Moving into Melee — cannot Parry, may <strong className="text-parchment">reroll first exchange</strong>.</span></li>
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Add <strong className="text-parchment">+1</strong> to all <strong className="text-sky-accent">[Traveling]</strong> tests.</span></li>
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Counter Attack Bonus in melee <strong className="text-parchment">vs undead</strong>.</span></li>
        <li className="flex gap-2"><span className="text-red-400 shrink-0">✕</span><span className="text-stone-400">No spells cast on them by allies.</span></li>
        <li className="flex gap-2"><span className="text-red-400 shrink-0">✕</span><span className="text-stone-400">Carry single magic item pre/post encounter only.</span></li>
      </ul>
    )
  },
  {
    title: 'Feral',
    color: 'gold',
    icon: '🐾',
    content: (
      <ul className="space-y-2 text-sm">
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Enemy Inf step of def battle: add <strong className="text-parchment">+1</strong> to roll. Raid: add <strong className="text-parchment">-1</strong> for enemy spot roll.</span></li>
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Add <strong className="text-parchment">+1</strong> to all <strong className="text-sky-accent">[Scouting]</strong> tests.</span></li>
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span><strong className="text-parchment">Full move</strong> and ranged, or half move if normally prohibited.</span></li>
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>+1 <strong className="text-parchment">Speech, Leadership or Scholar</strong> Skills.</span></li>
      </ul>
    )
  },
  {
    title: 'Preen',
    color: 'gold',
    icon: '🦅',
    content: (
      <>
        <div className="bg-stone-800/60 rounded p-2.5 mb-3 text-sm">
          <p className="text-stone-300"><strong className="text-parchment">Angry</strong> for next activation if ally within 6" is casualty or hit by ranged/spell. Then: full move + dash to nearest enemy. If contact → melee, weapon -1/+0 becomes <strong className="text-parchment">0/+1</strong>.</p>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Add <strong className="text-parchment">+1</strong> to all <strong className="text-sky-accent">[Crafting]</strong> tests.</span></li>
          <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Increase Speed by <strong className="text-parchment">+0" / +1"</strong>.</span></li>
          <li className="flex gap-2"><span className="text-red-400 shrink-0">✕</span><span className="text-stone-400">No higher ground Counter Attack bonus.</span></li>
        </ul>
      </>
    )
  },
  {
    title: 'Fey-blood',
    color: 'gold',
    icon: '✦',
    content: (
      <ul className="space-y-2 text-sm">
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>May <strong className="text-parchment">reroll</strong> assigned initiative die &gt; Agility.</span></li>
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Add <strong className="text-parchment">+1</strong> to all <strong className="text-sky-accent">[Wits]</strong> tests.</span></li>
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Melee opponents <strong className="text-parchment">lose ally combat bonus</strong>.</span></li>
        <li className="flex gap-2"><span className="text-red-400 shrink-0">✕</span><span className="text-stone-400">No Luck points — luck increase becomes skill instead.</span></li>
      </ul>
    )
  },
  {
    title: 'Halfling',
    color: 'gold',
    icon: '🍃',
    content: (
      <ul className="space-y-2 text-sm">
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Shooting at concealed/cover target: hit on <strong className="text-parchment">5+</strong>.</span></li>
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span>Add <strong className="text-parchment">+1</strong> to all <strong className="text-sky-accent">[Wilderness]</strong> tests.</span></li>
        <li className="flex gap-2"><span className="text-gold shrink-0">•</span><span><strong className="text-parchment">Never</strong> roll on Flight in the Dark Table.</span></li>
        <li className="flex gap-2"><span className="text-red-400 shrink-0">✕</span><span className="text-stone-400">No warhammers, bastard swords, long bows.</span></li>
      </ul>
    )
  },
  {
    title: 'Stars of the Story',
    color: 'sky-accent',
    content: (
      <>
        <p className="text-stone-400 text-sm mb-3">Each can be used <strong className="text-parchment">once</strong> during a campaign.</p>
        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-display text-sky-accent text-sm">Better Part of Valor</h4>
            <p className="text-stone-400">Entire warband immediately escapes battle. Don't roll on Flight in the Dark table.</p>
          </div>
          <div>
            <h4 className="font-display text-sky-accent text-sm">A Lucky Break!</h4>
            <p className="text-stone-400">Ignore a roll just made on the Injury Table or Flight in the Dark Table.</p>
          </div>
          <div>
            <h4 className="font-display text-sky-accent text-sm">What About Old Friends?</h4>
            <p className="text-stone-400">At beginning of a battle round, roll a new Hero. Place within 6" of any edge. Acts immediately. May remain in warband after.</p>
          </div>
          <div>
            <h4 className="font-display text-sky-accent text-sm">I Don't Think That's How the Story Went...</h4>
            <p className="text-stone-400">Any random event table — roll twice, pick result, or nothing happens.</p>
          </div>
          <div>
            <h4 className="font-display text-sky-accent text-sm">Did I Ever Tell You How I Learned To Do This?</h4>
            <p className="text-stone-400">Auto succeed at a proficiency test. If skill applicable, add permanently to character.</p>
          </div>
        </div>
      </>
    )
  },
  {
    title: 'Avatar & Non-Humans',
    color: 'sky-accent',
    content: (
      <>
        <div className="mb-4">
          <h4 className="font-display text-sky-accent text-sm mb-1">Avatar</h4>
          <p className="text-sm text-stone-300">If Avatar dies, when you begin a new campaign roll <strong className="text-parchment">2D6: 9+</strong> — your existing Avatar escaped and will return to warband.</p>
        </div>
        <div>
          <h4 className="font-display text-sky-accent text-sm mb-1">Non-Humans and Will</h4>
          <p className="text-sm text-stone-300">If a non-human character would receive <strong className="text-parchment">2 Will</strong>, count as <strong className="text-parchment">1 Will and 3 XP</strong>.</p>
        </div>
      </>
    )
  }
]

const COLOR_MAP = {
  'rust': { border: 'border-rust/40', bg: 'bg-rust/10', text: 'text-rust', dot: 'bg-rust' },
  'gold': { border: 'border-gold/40', bg: 'bg-gold/10', text: 'text-gold', dot: 'bg-gold' },
  'sky-accent': { border: 'border-sky-accent/40', bg: 'bg-sky-accent/10', text: 'text-sky-accent', dot: 'bg-sky-accent' },
  'forest': { border: 'border-forest/40', bg: 'bg-forest/10', text: 'text-forest', dot: 'bg-forest' },
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
          className={`w-full rounded-xl border ${colors.border} ${colors.bg} p-5 flex flex-col ${
            swiping ? '' : 'transition-transform duration-200 ease-out'
          }`}
          style={{ transform: `translateX(${swipeOffset}px)` }}
        >
          <h2 className={`font-display text-xl tracking-wide ${colors.text} mb-4 flex items-center gap-2`}>
            {card.icon && <span>{card.icon}</span>}
            {card.title}
          </h2>
          <div className="flex-1 text-stone-300 font-body overflow-y-auto">
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
