import { v4 as uuidv4 } from 'uuid'
import EditableField from './EditableField'

const COLUMNS = [
  { key: 'name', label: 'Name', wide: true },
  { key: 'type', label: 'Type' },
  { key: 'num', label: '#' },
  { key: 'speed', label: 'Spd' },
  { key: 'range', label: 'Rng' },
  { key: 'combat', label: 'Cbt' },
  { key: 'damage', label: 'Dmg' },
  { key: 'toughness', label: 'Tgh' },
  { key: 'armor', label: 'Arm' },
  { key: 'traits', label: 'Traits', wide: true }
]

function createEnemy() {
  return {
    id: uuidv4(),
    name: '', type: '', num: '', speed: '', range: '',
    combat: '', damage: '', toughness: '', armor: '', traits: ''
  }
}

export default function EnemyTable({ enemies, onChange }) {
  const addRow = () => onChange([...enemies, createEnemy()])
  const removeRow = (id) => onChange(enemies.filter(e => e.id !== id))
  const updateRow = (id, field, value) => {
    onChange(enemies.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-stone-500">Enemy Forces</span>
        <button
          onClick={addRow}
          className="text-xs text-rust hover:text-rust-light transition-colors"
        >+ Add Enemy</button>
      </div>

      {enemies.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-700 text-stone-500 text-xs">
                {COLUMNS.map(col => (
                  <th key={col.key} className={`pb-1 text-left font-normal ${col.wide ? 'min-w-[6rem]' : 'min-w-[2.5rem]'}`}>
                    {col.label}
                  </th>
                ))}
                <th className="pb-1 w-6"></th>
              </tr>
            </thead>
            <tbody>
              {enemies.map(enemy => (
                <tr key={enemy.id} className="border-b border-stone-800">
                  {COLUMNS.map(col => (
                    <td key={col.key} className="py-0.5 pr-1">
                      <EditableField
                        value={enemy[col.key]}
                        onChange={v => updateRow(enemy.id, col.key, v)}
                        className="text-sm"
                        inputClassName="text-sm py-0.5 px-1"
                      />
                    </td>
                  ))}
                  <td className="py-0.5">
                    <button
                      onClick={() => removeRow(enemy.id)}
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
