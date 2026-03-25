import { useState } from 'react'
import EditableField from './EditableField'
import StatBlock from './StatBlock'
import ItemList from './ItemList'
import { lookupOrigin } from '../data/originTraits'

const STATUS_COLORS = {
  active: 'border-forest',
  injured: 'border-gold',
  dead: 'border-rust'
}

function OriginTooltip({ origin }) {
  const [show, setShow] = useState(false)
  const data = lookupOrigin(origin)
  if (!data) return null

  return (
    <span className="relative inline-block ml-1 align-middle">
      <span
        className="text-forest cursor-help text-[10px] font-bold bg-forest/20 rounded-full w-3.5 h-3.5 inline-flex items-center justify-center"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={(e) => { e.stopPropagation(); setShow(s => !s) }}
      >
        i
      </span>
      {show && (
        <span className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-1 bg-stone-900 border border-forest/50 rounded-lg px-3 py-2 text-xs text-stone-300 shadow-lg w-64">
          <span className="block font-display text-forest font-semibold mb-1">{data.name} Traits</span>
          {data.traits.map((t, i) => (
            <span key={i} className="block py-0.5 border-b border-stone-800 last:border-0">
              <span className="text-stone-200 font-semibold">{t.name}:</span> {t.desc}
            </span>
          ))}
        </span>
      )}
    </span>
  )
}

export default function HeroCard({ hero, onChange, onRemove, onStatusChange, onMoveUp, onMoveDown }) {
  const update = (field, value) => {
    onChange({ ...hero, [field]: value })
  }

  return (
    <div className={`bg-stone-800/60 border-l-4 ${STATUS_COLORS[hero.status]} rounded-lg p-4 space-y-3`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <EditableField
            value={hero.name}
            onChange={v => update('name', v)}
            placeholder={hero.role === 'follower' ? 'Follower Name' : hero.role === 'avatar' ? 'Avatar Name' : 'Hero Name'}
            className="font-display text-lg font-bold"
          />
          <div className="flex flex-wrap gap-x-3 gap-y-0 items-center">
            <span className="flex items-center">
              <EditableField value={hero.origin} onChange={v => update('origin', v)} label="Origin" className="text-sm" />
              <OriginTooltip origin={hero.origin} />
            </span>
            <EditableField value={hero.title} onChange={v => update('title', v)} label="Title" className="text-sm" />
            <EditableField value={hero.background} onChange={v => update('background', v)} label="Background" className="text-sm" />
            <EditableField value={hero.warbandRole || ''} onChange={v => update('warbandRole', v)} label="Role" className="text-sm" placeholder="e.g. Tank, DPS" />
            {(hero.role === 'follower') && (
              <EditableField value={hero.followerType || ''} onChange={v => update('followerType', v)} label="Type" className="text-sm" placeholder="e.g. Brave villager" />
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <select
            value={hero.role || 'hero'}
            onChange={e => onChange({ ...hero, role: e.target.value })}
            className="text-xs bg-stone-900 border border-stone-700 rounded px-2 py-1 cursor-pointer focus:outline-none text-stone-300"
          >
            <option value="avatar">Avatar</option>
            <option value="hero">Hero</option>
            <option value="follower">Follower</option>
          </select>
          <select
            value={hero.status}
            onChange={e => onStatusChange(e.target.value)}
            className={`text-xs bg-stone-900 border border-stone-700 rounded px-2 py-1 cursor-pointer focus:outline-none ${
              hero.status === 'active' ? 'text-forest' :
              hero.status === 'injured' ? 'text-gold' : 'text-rust'
            }`}
          >
            <option value="active">Active</option>
            <option value="injured">Injured</option>
            <option value="dead">Dead</option>
          </select>
          <div className="flex items-center gap-1">
            {(onMoveUp || onMoveDown) && (
              <>
                <button
                  onClick={onMoveUp}
                  disabled={!onMoveUp}
                  className={`text-xs w-5 h-5 flex items-center justify-center rounded ${onMoveUp ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-700' : 'text-stone-700 cursor-default'}`}
                  title="Move up"
                >
                  ▲
                </button>
                <button
                  onClick={onMoveDown}
                  disabled={!onMoveDown}
                  className={`text-xs w-5 h-5 flex items-center justify-center rounded ${onMoveDown ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-700' : 'text-stone-700 cursor-default'}`}
                  title="Move down"
                >
                  ▼
                </button>
              </>
            )}
            <button
              onClick={onRemove}
              className="text-stone-600 hover:text-rust text-xs"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="bg-stone-900/50 border border-stone-700/50 rounded-md px-3 py-2.5 -mx-1 space-y-2">
        <StatBlock stats={hero.stats} onChange={s => update('stats', s)} isMystic={true} equipment={hero.equipment} />
        <div className="flex gap-2 pt-1 border-t border-stone-700/40">
          <EditableField value={hero.xp} onChange={v => update('xp', v)} label="XP" type="number" className="text-xs text-gold" />
          <EditableField value={hero.advances} onChange={v => update('advances', v)} label="Advances" type="number" className="text-xs text-gold" />
        </div>
      </div>

      {/* Equipment, Skills & Traits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ItemList items={hero.equipment} onChange={v => update('equipment', v)} label="Equipment" placeholder="Add equipment..." />
        <ItemList items={hero.skills} onChange={v => update('skills', v)} label="Skills & Proficiencies" placeholder="Add skill..." />
      </div>

      {/* Notes */}
      <EditableField
        value={hero.notes || ''}
        onChange={v => update('notes', v)}
        label="Notes"
        placeholder="Jot down notes..."
        multiline
        className="text-sm"
      />
    </div>
  )
}
