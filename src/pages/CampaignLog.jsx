import { v4 as uuidv4 } from 'uuid'
import LogEntry from '../components/LogEntry'

function createLogEntry(turnNumber) {
  return {
    id: uuidv4(),
    turnNumber,
    sessionPlan: '',
    location: '',
    event: '',
    actions: '',
    goal: '',
    notes: '',
    travelEncounters: ''
  }
}

export default function CampaignLog({ campaign, updateCampaign }) {
  const entries = campaign.campaignLog

  const updateEntries = (newEntries) => {
    updateCampaign(c => ({ ...c, campaignLog: newEntries }))
  }

  const addEntry = () => {
    const maxTurn = entries.reduce((max, e) => Math.max(max, e.turnNumber || 0), 0)
    updateEntries([createLogEntry(maxTurn + 1), ...entries])
  }

  const updateEntry = (entryId, updated) => {
    updateEntries(entries.map(e => e.id === entryId ? updated : e))
  }

  const removeEntry = (entryId) => {
    updateEntries(entries.filter(e => e.id !== entryId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-sky-accent tracking-wider">Campaign Log</h2>
        <button
          onClick={addEntry}
          className="bg-sky-accent/20 text-sky-accent hover:bg-sky-accent/30 px-3 py-1 rounded text-sm font-display tracking-wider transition-colors"
        >
          + New Turn
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="text-stone-500 italic text-center py-8">No campaign log entries yet. Start your first turn.</p>
      ) : (
        <div className="space-y-2">
          {entries.map(entry => (
            <LogEntry
              key={entry.id}
              entry={entry}
              onChange={updated => updateEntry(entry.id, updated)}
              onRemove={() => removeEntry(entry.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
