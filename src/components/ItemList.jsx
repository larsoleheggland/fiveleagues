import { useState, useRef, useEffect } from 'react'
import { isKnownEquipment } from '../data/knownEquipment'
import { lookupEquipmentInfo, parseItemQuantity } from '../data/equipmentInfo'

function ItemInfoButton({ itemName }) {
  const [open, setOpen] = useState(false)
  const result = lookupEquipmentInfo(itemName)
  if (!result) return null

  const { info, superiorNote } = result
  if (!info.desc && !info.stats && !superiorNote) return null

  return (
    <span className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        className="text-sky-accent/60 hover:text-sky-accent text-xs w-4 h-4 rounded-full border border-sky-accent/30 hover:border-sky-accent/60 inline-flex items-center justify-center transition-colors leading-none cursor-help"
      >i</span>
      {open && (
        <div className="absolute left-0 bottom-full mb-1 z-50 bg-stone-900 border border-stone-600 rounded-lg p-3 shadow-xl min-w-[240px] max-w-[320px]">
          <div className="text-xs space-y-1">
            <p className="text-gold font-display tracking-wider font-semibold">{info.type}</p>
            {info.stats && <p className="text-stone-300 font-bold">{info.stats}</p>}
            {info.desc && <p className="text-stone-400">{info.desc}</p>}
            {superiorNote && <p className="text-forest italic">{superiorNote}</p>}
          </div>
        </div>
      )}
    </span>
  )
}

function EditableItem({ value, onSave, onRemove, recognized, onMove, moveLabel, moveTitle }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const commit = () => {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== value) {
      onSave(trimmed)
    } else if (!trimmed) {
      onRemove()
    }
    setEditing(false)
  }

  const cancel = () => {
    setDraft(value)
    setEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') commit()
    if (e.key === 'Escape') cancel()
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          className="bg-stone-800/50 border border-gold rounded px-2 py-1 text-sm text-stone-100 flex-1 focus:outline-none focus:border-gold"
        />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 group">
      <span
        className={`text-sm flex-1 cursor-pointer hover:text-gold transition-colors ${recognized ? 'text-forest' : ''}`}
        onClick={() => { setDraft(value); setEditing(true) }}
      >
        {value}
      </span>
      {recognized && <ItemInfoButton itemName={value} />}
      {onMove && (
        <button
          onClick={() => onMove()}
          title={moveTitle}
          className="text-stone-500 hover:text-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {moveLabel}
        </button>
      )}
      <button
        onClick={() => onRemove()}
        className="text-stone-600 hover:text-rust text-xs opacity-0 group-hover:opacity-100 transition-opacity"
      >
        x
      </button>
    </div>
  )
}

/**
 * Count total items accounting for quantity prefixes like "2 x silvertree leaf".
 */
export function countItems(items) {
  return items.reduce((total, item) => {
    const { quantity } = parseItemQuantity(item)
    return total + quantity
  }, 0)
}

export default function ItemList({ items, onChange, label, placeholder = 'Add item...', onMoveItem, moveLabel, moveTitle }) {
  const [newItem, setNewItem] = useState('')

  const add = () => {
    if (!newItem.trim()) return
    onChange([...items, newItem.trim()])
    setNewItem('')
  }

  const remove = (index) => {
    onChange(items.filter((_, i) => i !== index))
  }

  const update = (index, newValue) => {
    onChange(items.map((item, i) => i === index ? newValue : item))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') add()
  }

  return (
    <div>
      {label && <h4 className="text-xs text-stone-500 uppercase tracking-wider mb-1">{label}</h4>}
      <div className="space-y-1">
        {items.map((item, i) => (
          <EditableItem
            key={i}
            value={item}
            onSave={(val) => update(i, val)}
            onRemove={() => remove(i)}
            recognized={isKnownEquipment(item)}
            onMove={onMoveItem ? () => onMoveItem(i) : undefined}
            moveLabel={moveLabel}
            moveTitle={moveTitle}
          />
        ))}
        <div className="flex gap-1">
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={add}
            placeholder={placeholder}
            className="bg-stone-800/50 border border-stone-700 rounded px-2 py-1 text-sm text-stone-100 flex-1 focus:outline-none focus:border-gold placeholder-stone-600"
          />
          <button
            onClick={add}
            className="text-gold hover:text-gold-light text-sm px-2"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
