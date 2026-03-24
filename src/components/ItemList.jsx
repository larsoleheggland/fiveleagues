import { useState, useRef, useEffect } from 'react'
import { isKnownEquipment } from '../data/knownEquipment'

function EditableItem({ value, onSave, onRemove, recognized }) {
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
      <button
        onClick={() => onRemove()}
        className="text-stone-600 hover:text-rust text-xs opacity-0 group-hover:opacity-100 transition-opacity"
      >
        x
      </button>
    </div>
  )
}

export default function ItemList({ items, onChange, label, placeholder = 'Add item...' }) {
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
