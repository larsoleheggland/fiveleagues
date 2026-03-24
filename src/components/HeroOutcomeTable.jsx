import { v4 as uuidv4 } from 'uuid'
import EditableField from './EditableField'

const COLUMNS = [
  { key: 'name', label: 'Name', wide: true },
  { key: 'casualty', label: 'Casualty' },
  { key: 'injury', label: 'Injury' },
  { key: 'recovery', label: 'Recovery' },
  { key: 'xp', label: 'XP' },
  { key: 'advancement', label: 'Advancement', wide: true }
]

function createOutcome() {
  return {
    id: uuidv4(),
    name: '', casualty: '', injury: '', recovery: '', xp: '', advancement: ''
  }
}

export default function HeroOutcomeTable({ outcomes, onChange }) {
  const addRow = () => onChange([...outcomes, createOutcome()])
  const removeRow = (id) => onChange(outcomes.filter(o => o.id !== id))
  const updateRow = (id, field, value) => {
    onChange(outcomes.map(o => o.id === id ? { ...o, [field]: value } : o))
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-stone-500">Hero Outcomes</span>
        <button
          onClick={addRow}
          className="text-xs text-sky-accent hover:text-sky-light transition-colors"
        >+ Add Hero</button>
      </div>

      {outcomes.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-700 text-stone-500 text-xs">
                {COLUMNS.map(col => (
                  <th key={col.key} className={`pb-1 text-left font-normal ${col.wide ? 'min-w-[6rem]' : 'min-w-[3.5rem]'}`}>
                    {col.label}
                  </th>
                ))}
                <th className="pb-1 w-6"></th>
              </tr>
            </thead>
            <tbody>
              {outcomes.map(outcome => (
                <tr key={outcome.id} className="border-b border-stone-800">
                  {COLUMNS.map(col => (
                    <td key={col.key} className="py-0.5 pr-1">
                      <EditableField
                        value={outcome[col.key]}
                        onChange={v => updateRow(outcome.id, col.key, v)}
                        className="text-sm"
                        inputClassName="text-sm py-0.5 px-1"
                      />
                    </td>
                  ))}
                  <td className="py-0.5">
                    <button
                      onClick={() => removeRow(outcome.id)}
                      className="text-stone-600 hover:text-rust text-xs"
                    >x</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
