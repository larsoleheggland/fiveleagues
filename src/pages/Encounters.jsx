import { v4 as uuidv4 } from 'uuid'
import EncounterEntry from '../components/EncounterEntry'

function createEncounter(turnNumber) {
  return {
    id: uuidv4(),
    turnNumber,
    enemy: '',
    threat: '',
    combat: '',
    damage: '',
    speed: '',
    type: '',
    clues: '',
    hitRange: '',
    earned: '',
    extras: ''
  }
}

export default function Encounters({ campaign, updateCampaign }) {
  const entries = campaign.encountersLog

  const updateEntries = (newEntries) => {
    updateCampaign(c => ({ ...c, encountersLog: newEntries }))
  }

  const addEncounter = () => {
    const maxTurn = Math.max(
      entries.reduce((max, e) => Math.max(max, e.turnNumber || 0), 0),
      campaign.campaignLog.reduce((max, e) => Math.max(max, e.turnNumber || 0), 0)
    )
    updateEntries([createEncounter(maxTurn || 1), ...entries])
  }

  const updateEntry = (entryId, updated) => {
    updateEntries(entries.map(e => e.id === entryId ? updated : e))
  }

  const removeEntry = (entryId) => {
    updateEntries(entries.filter(e => e.id !== entryId))
  }

  // Group by turn number
  const grouped = {}
  entries.forEach(entry => {
    const turn = entry.turnNumber || 0
    if (!grouped[turn]) grouped[turn] = []
    grouped[turn].push(entry)
  })
  const sortedTurns = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-sky-accent tracking-wider">Encounters Log</h2>
        <button
          onClick={addEncounter}
          className="bg-sky-accent/20 text-sky-accent hover:bg-sky-accent/30 px-3 py-1 rounded text-sm font-display tracking-wider transition-colors"
        >
          + Add Encounter
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="text-stone-500 italic text-center py-8">No encounters recorded yet. Add your first encounter.</p>
      ) : (
        <div className="space-y-6">
          {sortedTurns.map(turn => (
            <div key={turn}>
              <h3 className="font-display text-sm text-stone-400 tracking-wider mb-2 border-b border-stone-700/50 pb-1">
                Campaign Turn #{turn}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {grouped[turn].map(entry => (
                  <EncounterEntry
                    key={entry.id}
                    entry={entry}
                    onChange={updated => updateEntry(entry.id, updated)}
                    onRemove={() => removeEntry(entry.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
