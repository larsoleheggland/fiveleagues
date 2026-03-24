import { useState, useRef, useEffect } from 'react'
import EditableField from './EditableField'

const BASE_STATS = [
  { key: 'speed', label: 'Spd', paired: 'dash' },
  { key: 'agility', label: 'Agi' },
  { key: 'combatSkill', label: 'Cbt' },
  { key: 'armor', label: 'Arm' },
  { key: 'toughness', label: 'Tou' },
  { key: 'will', label: 'Will' },
  { key: 'luck', label: 'Lck' },
  { key: 'dmg', label: 'Dmg' },
]

const MYSTIC_STATS = [
  { key: 'casting', label: 'Cast' },
]

// Compute equipment bonuses from the equipment list.
// Body armor SETS armor rating and may penalize dash.
// Order matters: knight > full > partial > light (first match wins for body armor).
export function computeEquipmentEffects(equipment) {
  const effects = {
    armor: { bonus: 0, details: [] },
    dash: { bonus: 0, noDash: false, details: [] },
  }
  if (!equipment?.length) return effects

  let bodyArmorFound = false

  for (const item of equipment) {
    const n = item.toLowerCase().trim()

    // Body armor (only one applies — first match wins)
    if (!bodyArmorFound) {
      if (n.includes('knight armor')) {
        bodyArmorFound = true
        effects.armor.bonus = 3
        effects.armor.details.push({ item, desc: 'Sets Armor to 3' })
        effects.dash.noDash = true
        effects.dash.details.push({ item, desc: 'Cannot Dash (set to 0)' })
      } else if (n.includes('full armor')) {
        bodyArmorFound = true
        effects.armor.bonus = 3
        effects.armor.details.push({ item, desc: 'Sets Armor to 3' })
        effects.dash.bonus = -2
        effects.dash.details.push({ item, desc: 'Dash −2"' })
      } else if (n.includes('partial armor')) {
        bodyArmorFound = true
        effects.armor.bonus = 2
        effects.armor.details.push({ item, desc: 'Sets Armor to 2' })
        effects.dash.bonus = -1
        effects.dash.details.push({ item, desc: 'Dash −1"' })
      } else if (n.includes('light armor')) {
        bodyArmorFound = true
        effects.armor.bonus = 1
        effects.armor.details.push({ item, desc: 'Sets Armor to 1' })
      }
    }

    // Shield and helmet — informational only (don't change stat values)
    if (n.includes('shield')) {
      effects.armor.details.push({ item, desc: '+1 Armor vs ranged, Parry (not in Arm stat)' })
    }
    if (n.includes('helmet')) {
      effects.armor.details.push({ item, desc: 'Doubles on Injury Table → knocked out (helmet Damaged)' })
    }
  }

  return effects
}

// Inline editable stat that shows a computed value (green) in view mode,
// and edits the base value on click.
function ComputedStat({ label, baseValue, bonus, noDash, details }) {
  const [editing, setEditing] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const computed = noDash ? 0 : baseValue + bonus
  const hasEffect = details.length > 0

  // Build the breakdown lines for the tooltip
  const breakdownLines = []
  breakdownLines.push(`Base: ${baseValue}`)
  for (const d of details) {
    breakdownLines.push(`${d.item}: ${d.desc}`)
  }
  breakdownLines.push(`Final: ${computed}`)

  return (
    <span className="relative">
      <span
        className={`group-hover:text-gold transition-colors ${hasEffect ? 'text-forest font-bold' : ''}`}
      >
        {computed}
      </span>
      {hasEffect && (
        <span className="relative inline-block ml-0.5">
          <span
            className="text-forest cursor-help text-[10px] font-bold align-super"
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
            onClick={(e) => { e.stopPropagation(); setShowHint(s => !s) }}
          >
            i
          </span>
          {showHint && (
            <span className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-1 bg-stone-900 border border-forest/50 rounded px-2.5 py-1.5 text-xs text-stone-200 whitespace-nowrap shadow-lg">
              {breakdownLines.map((line, i) => (
                <span key={i} className={`block ${i === breakdownLines.length - 1 ? 'text-forest font-semibold border-t border-stone-700 mt-1 pt-1' : ''}`}>
                  {line}
                </span>
              ))}
            </span>
          )}
        </span>
      )}
    </span>
  )
}

// Editable cell that shows computed value in view mode, base value when editing
function ComputedStatCell({ label, baseValue, bonus, noDash, details, onChange }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(baseValue)
  const inputRef = useRef(null)

  useEffect(() => { setDraft(baseValue) }, [baseValue])
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const commit = () => {
    setEditing(false)
    const val = Number(draft) || 0
    if (val !== baseValue) onChange(val)
  }

  if (editing) {
    return (
      <div className="text-center">
        <span className="text-xs text-stone-500 block mb-0.5">{label} <span className="text-stone-600">(base)</span></span>
        <input
          ref={inputRef}
          type="number"
          value={draft ?? ''}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => {
            if (e.key === 'Enter') commit()
            if (e.key === 'Escape') { setDraft(baseValue); setEditing(false) }
          }}
          className="bg-stone-800 border border-stone-600 rounded px-2 py-1 text-stone-100 focus:outline-none focus:border-gold text-center w-12"
        />
      </div>
    )
  }

  return (
    <div className="text-center cursor-pointer group" onClick={() => setEditing(true)}>
      <span className="text-xs text-stone-500 block mb-0.5">{label}</span>
      <ComputedStat
        label={label}
        baseValue={baseValue}
        bonus={bonus}
        noDash={noDash}
        details={details}
      />
    </div>
  )
}

// Read-only stat display for use in compact views (e.g. Combat page)
function ReadOnlyStat({ label, value, modified, size = 'base' }) {
  const labelSize = size === 'lg' ? 'text-base' : 'text-xs'
  const valueSize = size === 'lg' ? 'text-lg' : 'text-sm'
  return (
    <span className={`${labelSize} text-stone-500`}>
      {label}: <span className={`${valueSize} font-bold ${modified ? 'text-forest' : 'text-stone-100'}`}>{value}</span>
    </span>
  )
}

export default function StatBlock({ stats, onChange, isMystic, equipment, readOnly, visibleStats, size = 'base' }) {
  const statList = isMystic ? [...BASE_STATS, ...MYSTIC_STATS] : BASE_STATS
  const fx = computeEquipmentEffects(equipment)

  // Filter stats if visibleStats provided
  const filteredStats = visibleStats
    ? statList.filter(s => visibleStats.includes(s.key))
    : statList

  // Read-only compact mode
  if (readOnly) {
    // Check if shield is present for armor display
    const hasShield = (equipment || []).some(i => i.toLowerCase().includes('shield'))

    return (
      <div className="flex flex-wrap gap-3">
        {filteredStats.map(({ key, label, paired }) => {
          if (paired) {
            const dashFx = fx.dash
            const baseDash = stats[paired] ?? 0
            const effectiveDash = dashFx.noDash ? 0 : baseDash + dashFx.bonus
            const dashModified = dashFx.details.length > 0
            const labelSize = size === 'lg' ? 'text-base' : 'text-xs'
            const valueSize = size === 'lg' ? 'text-lg' : 'text-sm'
            return (
              <span key={key} className={`${labelSize} text-stone-500`}>
                {label}: <span className={`${valueSize} font-bold text-stone-100`}>{stats[key] ?? 0}</span>
                <span className="text-stone-400">/+</span>
                <span className={`${valueSize} font-bold ${dashModified ? 'text-forest' : 'text-stone-100'}`}>{effectiveDash}</span>
              </span>
            )
          }
          if (key === 'armor') {
            const armorFx = fx.armor
            const computed = (stats[key] ?? 0) + armorFx.bonus
            const shieldSuffix = hasShield ? '+S' : ''
            return <ReadOnlyStat key={key} label={label} value={`${computed}${shieldSuffix}`} modified={armorFx.details.length > 0} size={size} />
          }
          return <ReadOnlyStat key={key} label={label} value={stats[key] ?? 0} size={size} />
        })}
      </div>
    )
  }

  // Editable mode (original behavior)
  const update = (key, val) => {
    onChange({ ...stats, [key]: val })
  }

  return (
    <div className="grid grid-cols-5 gap-1">
      {filteredStats.map(({ key, label, paired }) => {
        if (paired) {
          // Speed / Dash pair
          const dashFx = fx.dash
          const hasDashEffect = dashFx.details.length > 0
          return (
            <div key={key} className="text-center">
              <span className="text-xs text-stone-500 block mb-0.5">{label}</span>
              <div className="flex items-center justify-center gap-0.5">
                <EditableField
                  value={stats[key] ?? 0}
                  type="number"
                  onChange={v => update(key, v)}
                  className=""
                  inputClassName="text-center w-8"
                />
                <span className="text-stone-500">/ +</span>
                {hasDashEffect ? (
                  <ComputedStatCell
                    label=""
                    baseValue={stats[paired] ?? 0}
                    bonus={dashFx.bonus}
                    noDash={dashFx.noDash}
                    details={dashFx.details}
                    onChange={v => update(paired, v)}
                  />
                ) : (
                  <EditableField
                    value={stats[paired] ?? 0}
                    type="number"
                    onChange={v => update(paired, v)}
                    className=""
                    inputClassName="text-center w-8"
                  />
                )}
              </div>
            </div>
          )
        }

        // Armor stat — computed from equipment
        if (key === 'armor') {
          const armorFx = fx.armor
          return (
            <ComputedStatCell
              key={key}
              label={label}
              baseValue={stats[key] ?? 0}
              bonus={armorFx.bonus}
              details={armorFx.details}
              onChange={v => update(key, v)}
            />
          )
        }

        // All other stats — plain editable
        return (
          <EditableField
            key={key}
            label={label}
            value={stats[key] ?? 0}
            type="number"
            onChange={v => update(key, v)}
            className="text-center"
            inputClassName="text-center w-12"
          />
        )
      })}
    </div>
  )
}
