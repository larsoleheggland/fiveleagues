import { v4 as uuidv4 } from 'uuid'
import TurnEntry from '../components/TurnEntry'

function createTurn(turnNumber) {
  return {
    id: uuidv4(),
    turnNumber,
    // Preparation
    location: '',
    locationType: '',
    localEvent: '',
    upkeep: '',
    activities: '',
    trade: '',
    research: '',
    // Adventure
    adventureDecision: '',
    travelEvent: '',
    enemies: [],
    scenarioType: '',
    scenarioNotes: '',
    // Resolution
    heldField: false,
    achievedObjective: false,
    threatCleared: false,
    regionCleared: false,
    adventurePointsEarned: '',
    heroOutcomes: [],
    loot: '',
    unusualFinds: '',
    newsAndEvents: '',
    notes: ''
  }
}

export default function TurnTracker({ campaign, updateCampaign }) {
  const turns = campaign.turns || []

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
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-sky-accent tracking-wider">Turn Tracker</h2>
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
