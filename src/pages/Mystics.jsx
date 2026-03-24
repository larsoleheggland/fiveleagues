import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import EditableField from '../components/EditableField'
import SPELL_TABLE from '../data/spellTable'

function createSpell(template) {
  return {
    id: uuidv4(),
    name: template?.name || '',
    school: template?.school || '',
    target: template?.target || '',
    duration: template?.duration || '',
    effects: template?.effects || '',
    incantation: template?.incantation || '',
    roll: template?.roll || ''
  }
}

export default function Mystics({ campaign, updateCampaign }) {
  const [rulesOpen, setRulesOpen] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerSearch, setPickerSearch] = useState('')
  const spells = campaign.mystics.spells

  const updateSpells = (newSpells) => {
    updateCampaign(c => ({ ...c, mystics: { ...c.mystics, spells: newSpells } }))
  }

  const updateSpell = (spellId, updated) => {
    updateSpells(spells.map(s => s.id === spellId ? updated : s))
  }

  const addSpell = () => {
    updateSpells([...spells, createSpell()])
  }

  const addFromTable = (tableEntry) => {
    updateSpells([...spells, createSpell(tableEntry)])
    setPickerOpen(false)
    setPickerSearch('')
  }

  const removeSpell = (spellId) => {
    updateSpells(spells.filter(s => s.id !== spellId))
  }

  const knownSpellNames = new Set(spells.map(s => s.name))

  const filteredSpells = SPELL_TABLE.filter(s => {
    if (pickerSearch === '') return true
    const q = pickerSearch.toLowerCase()
    return s.name.toLowerCase().includes(q) ||
      s.effects.toLowerCase().includes(q) ||
      s.target.toLowerCase().includes(q)
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="font-display text-xl text-rust tracking-wider">Mystics' Spells</h2>
        <div className="flex gap-2">
          <button
            onClick={() => { setPickerOpen(!pickerOpen); setPickerSearch('') }}
            className="bg-rust/20 text-rust-light hover:bg-rust/30 px-3 py-1 rounded text-sm font-display tracking-wider transition-colors"
          >
            {pickerOpen ? 'Close Picker' : 'Pick from Rulebook'}
          </button>
          <button
            onClick={addSpell}
            className="bg-forest/20 text-forest hover:bg-forest/30 px-3 py-1 rounded text-sm font-display tracking-wider transition-colors"
          >
            + Add Blank
          </button>
        </div>
      </div>

      {/* Spell Picker */}
      {pickerOpen && (
        <div className="bg-stone-800/50 border border-rust/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-sm text-rust-light tracking-wider shrink-0">Spell Table (d100)</h3>
            <input
              type="text"
              value={pickerSearch}
              onChange={e => setPickerSearch(e.target.value)}
              placeholder="Search spells..."
              className="bg-stone-900/60 border border-stone-700 rounded px-3 py-1 text-sm text-stone-200 placeholder-stone-500 flex-1 max-w-xs"
            />
          </div>
          <div className="max-h-96 overflow-y-auto space-y-1 pr-1">
            {filteredSpells.map(entry => {
              const alreadyKnown = knownSpellNames.has(entry.name)
              return (
                <button
                  key={entry.roll}
                  onClick={() => addFromTable(entry)}
                  disabled={alreadyKnown}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    alreadyKnown
                      ? 'bg-stone-800/30 text-stone-600 cursor-not-allowed'
                      : 'bg-stone-900/40 hover:bg-rust/20 text-stone-300 hover:text-stone-100'
                  }`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-stone-500 text-xs w-12 shrink-0">{entry.roll}</span>
                    <span className="font-display text-rust-light font-semibold">{entry.name}</span>
                    <span className="text-stone-500 text-xs">Inc. {entry.incantation}</span>
                    <span className="text-stone-500 text-xs">{entry.target}</span>
                    <span className="text-stone-500 text-xs ml-auto">{entry.duration}</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5 ml-14 line-clamp-1">{entry.effects}</p>
                  {alreadyKnown && <span className="text-xs text-forest ml-14">Already known</span>}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Casting Rules Reference */}
      <div className="bg-stone-800/30 border border-stone-700 rounded-lg overflow-hidden">
        <button
          onClick={() => setRulesOpen(!rulesOpen)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-stone-800/50 transition-colors"
        >
          <span className="font-display text-sm text-stone-400 tracking-wider">Casting Rules Reference</span>
          <span className="text-stone-500 text-xs">{rulesOpen ? '▲' : '▼'}</span>
        </button>
        {rulesOpen && (
          <div className="px-4 pb-4 text-sm text-stone-400 space-y-2 border-t border-stone-700/50 pt-3">
            <p>A Mystic begins each battle with <strong className="text-stone-200">3 Strands</strong>.</p>
            <p>Casting requires the <strong className="text-stone-200">Casting Non-Combat Action</strong>. Only 1 spell per round. Target must be in sight unless stated otherwise.</p>
            <p>Roll <strong className="text-stone-200">2D6 + Casting score</strong>. Natural 2 always fails (1 Strand expended). Below Incantation = fail (no Strand cost). Equal or above = success (1 Strand expended unless Simple*).</p>
            <p>Natural 12 always succeeds (no Strand cost). If casting fails, may spend 1 Will for a retroactive +2.</p>
            <p>If a Strand must be spent and none remain, the Mystic is <strong className="text-stone-200">Wounded</strong> instead.</p>
            <p><strong className="text-stone-200">*Simple:</strong> No Strand cost (natural 2 still costs 1). <strong className="text-stone-200">†Taxing:</strong> Once per battle only.</p>
          </div>
        )}
      </div>

      {/* Spells List */}
      {spells.length === 0 ? (
        <p className="text-stone-500 italic text-center py-8">No spells recorded yet. Pick from the rulebook or add a blank spell.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {spells.map(spell => (
            <div key={spell.id} className="bg-stone-800/40 border border-stone-700 rounded-lg p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <EditableField
                  value={spell.name}
                  onChange={v => updateSpell(spell.id, { ...spell, name: v })}
                  placeholder="Spell Name"
                  className="font-display font-bold text-rust-light flex-1"
                />
                <button
                  onClick={() => removeSpell(spell.id)}
                  className="text-stone-600 hover:text-rust text-xs shrink-0"
                >
                  x
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <EditableField value={spell.incantation || ''} onChange={v => updateSpell(spell.id, { ...spell, incantation: v })} label="Incantation" className="text-sm" />
                <EditableField value={spell.target} onChange={v => updateSpell(spell.id, { ...spell, target: v })} label="Target" className="text-sm" />
                <EditableField value={spell.duration} onChange={v => updateSpell(spell.id, { ...spell, duration: v })} label="Duration" className="text-sm" />
              </div>
              <EditableField value={spell.school} onChange={v => updateSpell(spell.id, { ...spell, school: v })} label="School" className="text-sm" />
              <EditableField value={spell.effects} onChange={v => updateSpell(spell.id, { ...spell, effects: v })} label="Effects" multiline className="text-sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
