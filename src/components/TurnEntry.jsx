import { useState } from 'react'
import EditableField from './EditableField'
import CollapsibleSection from './CollapsibleSection'
import EnemyTable from './EnemyTable'
import HeroOutcomeTable from './HeroOutcomeTable'
import { SETTLEMENT_ACTIVITIES, CAMP_ACTIVITIES } from '../data/campaignActivities'

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="accent-sky-accent"
      />
      <span className="text-sm text-stone-400 group-hover:text-stone-200 transition-colors">{label}</span>
    </label>
  )
}

function LocationTypeToggle({ value, onChange }) {
  const options = ['settlement', 'camp']
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-stone-500 mr-1">Type:</span>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(value === opt ? '' : opt)}
          className={`px-2 py-0.5 text-xs rounded font-display tracking-wider transition-colors ${
            value === opt
              ? 'bg-gold/20 text-gold'
              : 'text-stone-500 hover:text-stone-300'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function ActivitiesReference({ locationType }) {
  const activities = locationType === 'camp' ? CAMP_ACTIVITIES
    : locationType === 'settlement' ? SETTLEMENT_ACTIVITIES
    : [...SETTLEMENT_ACTIVITIES, ...CAMP_ACTIVITIES]

  const heading = locationType === 'camp' ? 'Camp Activities'
    : locationType === 'settlement' ? 'Settlement Activities'
    : 'All Activities (select location type to filter)'

  return (
    <div className="space-y-2">
      <p className="text-xs text-stone-500 font-display tracking-wider">{heading}</p>
      {activities.map(a => (
        <div key={a.name} className="text-sm">
          <span className="text-gold font-semibold">{a.name}</span>
          <span className="text-stone-400 ml-2">{a.description}</span>
        </div>
      ))}
    </div>
  )
}

export default function TurnEntry({ entry, onChange, onRemove }) {
  const [expanded, setExpanded] = useState(false)
  const [openPhases, setOpenPhases] = useState({ prep: true, adventure: false, resolution: false })
  const [showActivitiesRef, setShowActivitiesRef] = useState(false)

  const update = (field, value) => {
    onChange({ ...entry, [field]: value })
  }

  const togglePhase = (phase) => {
    setOpenPhases(prev => ({ ...prev, [phase]: !prev[phase] }))
  }

  const summary = entry.location || entry.localEvent || entry.adventureDecision || 'Empty turn'

  return (
    <div className="bg-stone-800/40 border border-stone-700 rounded-lg overflow-hidden">
      {/* Collapsed header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-stone-800/60 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="font-display text-sky-accent font-bold min-w-[3rem]">
          #{entry.turnNumber}
        </span>
        <span className="text-sm text-stone-300 flex-1 truncate">{summary}</span>
        {entry.locationType && (
          <span className="text-xs text-gold/60 font-display tracking-wider uppercase">{entry.locationType}</span>
        )}
        <button
          onClick={e => { e.stopPropagation(); onRemove() }}
          className="text-stone-600 hover:text-rust text-xs"
        >x</button>
        <span className="text-stone-500 text-xs">{expanded ? '▲' : '▼'}</span>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-stone-700/50 pt-3">
          {/* Turn number edit */}
          <EditableField value={entry.turnNumber} onChange={v => update('turnNumber', v)} label="Turn #" type="number" />

          {/* === PREPARATION PHASE === */}
          <CollapsibleSection
            title="Preparation"
            accent="text-gold"
            open={openPhases.prep}
            onToggle={() => togglePhase('prep')}
          >
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <EditableField value={entry.location} onChange={v => update('location', v)} label="Location" className="flex-1" />
                <LocationTypeToggle value={entry.locationType} onChange={v => update('locationType', v)} />
              </div>
              <EditableField value={entry.localEvent} onChange={v => update('localEvent', v)} label="Local Event" />
              <EditableField value={entry.upkeep} onChange={v => update('upkeep', v)} label="Hard Times / Upkeep" />
              <EditableField value={entry.activities} onChange={v => update('activities', v)} label="Campaign Activities" multiline />

              {/* Activities Reference */}
              <CollapsibleSection
                title="Activities Reference"
                accent="text-stone-500"
                open={showActivitiesRef}
                onToggle={() => setShowActivitiesRef(!showActivitiesRef)}
              >
                <ActivitiesReference locationType={entry.locationType} />
              </CollapsibleSection>

              <EditableField value={entry.trade} onChange={v => update('trade', v)} label="Trade" />
              <EditableField value={entry.research} onChange={v => update('research', v)} label="Research" />
            </div>
          </CollapsibleSection>

          {/* === ADVENTURE PHASE === */}
          <CollapsibleSection
            title="Adventure"
            accent="text-rust"
            open={openPhases.adventure}
            onToggle={() => togglePhase('adventure')}
          >
            <div className="space-y-3">
              <EditableField value={entry.adventureDecision} onChange={v => update('adventureDecision', v)} label="Adventure Decision" />
              <EditableField value={entry.travelEvent} onChange={v => update('travelEvent', v)} label="Travel Event" />
              <EditableField value={entry.scenarioType} onChange={v => update('scenarioType', v)} label="Scenario Type" />
              <EnemyTable
                enemies={entry.enemies || []}
                onChange={v => update('enemies', v)}
              />
              <EditableField value={entry.scenarioNotes} onChange={v => update('scenarioNotes', v)} label="Scenario Notes" multiline />
            </div>
          </CollapsibleSection>

          {/* === RESOLUTION PHASE === */}
          <CollapsibleSection
            title="Resolution"
            accent="text-sky-accent"
            open={openPhases.resolution}
            onToggle={() => togglePhase('resolution')}
          >
            <div className="space-y-3">
              {/* Outcome flags */}
              <div className="grid grid-cols-2 gap-2">
                <Checkbox label="Held the Field" checked={entry.heldField} onChange={v => update('heldField', v)} />
                <Checkbox label="Achieved Objective" checked={entry.achievedObjective} onChange={v => update('achievedObjective', v)} />
                <Checkbox label="Threat Cleared" checked={entry.threatCleared} onChange={v => update('threatCleared', v)} />
                <Checkbox label="Region Cleared" checked={entry.regionCleared} onChange={v => update('regionCleared', v)} />
              </div>

              <EditableField value={entry.adventurePointsEarned} onChange={v => update('adventurePointsEarned', v)} label="Adventure Points Earned" />

              <HeroOutcomeTable
                outcomes={entry.heroOutcomes || []}
                onChange={v => update('heroOutcomes', v)}
              />

              <EditableField value={entry.loot} onChange={v => update('loot', v)} label="Loot" />
              <EditableField value={entry.unusualFinds} onChange={v => update('unusualFinds', v)} label="Unusual Finds" />
              <EditableField value={entry.newsAndEvents} onChange={v => update('newsAndEvents', v)} label="News & Events" />
              <EditableField value={entry.notes} onChange={v => update('notes', v)} label="Notes" multiline />
            </div>
          </CollapsibleSection>
        </div>
      )}
    </div>
  )
}
