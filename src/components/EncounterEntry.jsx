import EditableField from './EditableField'

export default function EncounterEntry({ entry, onChange, onRemove }) {
  const update = (field, value) => {
    onChange({ ...entry, [field]: value })
  }

  return (
    <div className="bg-stone-800/40 border border-stone-700 rounded-lg p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500">Turn #{entry.turnNumber}</span>
            <EditableField
              value={entry.enemy}
              onChange={v => update('enemy', v)}
              placeholder="Enemy"
              className="font-display font-bold text-sky-accent"
            />
          </div>
        </div>
        <button onClick={onRemove} className="text-stone-600 hover:text-rust text-xs shrink-0">x</button>
      </div>

      {/* Key stats row */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        <EditableField value={entry.threat} onChange={v => update('threat', v)} label="Threat" className="text-sm" />
        <EditableField value={entry.combat} onChange={v => update('combat', v)} label="Combat" className="text-sm" />
        <EditableField value={entry.damage} onChange={v => update('damage', v)} label="Damage" className="text-sm" />
        <EditableField value={entry.speed} onChange={v => update('speed', v)} label="Speed" className="text-sm" />
        <EditableField value={entry.type} onChange={v => update('type', v)} label="Type" className="text-sm" />
      </div>

      {/* Secondary info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <EditableField value={entry.clues} onChange={v => update('clues', v)} label="Clues" className="text-sm" />
        <EditableField value={entry.hitRange} onChange={v => update('hitRange', v)} label="Hit Range" className="text-sm" />
        <EditableField value={entry.earned} onChange={v => update('earned', v)} label="Earned" className="text-sm" />
        <EditableField value={entry.extras} onChange={v => update('extras', v)} label="Extras" className="text-sm" />
      </div>
    </div>
  )
}
