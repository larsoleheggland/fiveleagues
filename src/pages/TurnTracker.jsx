import { v4 as uuidv4 } from 'uuid'
import TurnEntry from '../components/TurnEntry'

function createTurn(turnNumber) {
  return {
    id: uuidv4(),
    turnNumber,
    location: '',
    locationType: '',
    activities: '',
    adventureDecision: '',
    travelEvent: '',
    heldField: false,
    achievedObjective: false,
    threatCleared: false,
    regionCleared: false,
    notes: ''
  }
}

export default function TurnTracker({ campaign, updateCampaign }) {
  const turns = campaign.turns || []
  const notes = campaign.campaignNotes || ''

  const updateTurns = (newTurns) => {
    updateCampaign(c => ({ ...c, turns: newTurns }))
  }

  const addTurn = () => {
    const maxTurn = turns.reduce((max, t) => Math.max(max, t.turnNumber || 0), 0)
    updateTurns([createTurn(maxTurn + 1), ...turns])
  }

  const updateTurn = (turnId, updated) => {
    updateTurns(turns.map(t => t.id === turnId ? updated : t))
  }

  const removeTurn = (turnId) => {
    updateTurns(turns.filter(t => t.id !== turnId))
  }

  return (
    <div className="space-y-6">
      {/* Campaign Notes */}
      <div className="bg-stone-800/40 border border-stone-700 rounded-lg p-4">
        <label className="block font-display text-sm text-stone-400 tracking-wider mb-2">Campaign Notes</label>
        <textarea
          value={notes}
          onChange={e => updateCampaign(c => ({ ...c, campaignNotes: e.target.value }))}
          placeholder="General notes, house rules, campaign goals..."
          rows={4}
          className="w-full bg-transparent border border-stone-600 rounded px-3 py-2 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-sky-accent resize-y text-sm"
        />
      </div>

      {/* Turns */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-sky-accent tracking-wider">Turns</h2>
        <button
          onClick={addTurn}
          className="bg-sky-accent/20 text-sky-accent hover:bg-sky-accent/30 px-3 py-1 rounded text-sm font-display tracking-wider transition-colors"
        >
          + New Turn
        </button>
      </div>

      {turns.length === 0 ? (
        <p className="text-stone-500 italic text-center py-8">No turns recorded yet. Start your first campaign turn.</p>
      ) : (
        <div className="space-y-2">
          {turns.map(turn => (
            <TurnEntry
              key={turn.id}
              entry={turn}
              onChange={updated => updateTurn(turn.id, updated)}
              onRemove={() => removeTurn(turn.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
