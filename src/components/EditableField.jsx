import { useState, useRef, useEffect } from 'react'

export default function EditableField({
  value, onChange, label, type = 'text', placeholder = '—',
  className = '', inputClassName = '', multiline = false
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => { setDraft(value) }, [value])
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select?.()
    }
  }, [editing])

  const commit = () => {
    setEditing(false)
    const val = type === 'number' ? Number(draft) || 0 : draft
    if (val !== value) onChange(val)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) commit()
    if (e.key === 'Escape') { setDraft(value); setEditing(false) }
  }

  if (editing) {
    const shared = {
      ref: inputRef,
      value: draft ?? '',
      onChange: e => setDraft(type === 'number' ? e.target.value : e.target.value),
      onBlur: commit,
      onKeyDown: handleKeyDown,
      className: `bg-stone-800 border border-stone-600 rounded px-2 py-1 text-stone-100 focus:outline-none focus:border-gold w-full ${inputClassName}`
    }
    return (
      <div className={className}>
        {label && <span className="text-xs text-stone-500 block mb-0.5">{label}</span>}
        {multiline
          ? <textarea {...shared} rows={3} />
          : <input type={type} {...shared} />
        }
      </div>
    )
  }

  const display = value === '' || value === null || value === undefined
    ? placeholder
    : value

  return (
    <div className={`cursor-pointer group ${className}`} onClick={() => setEditing(true)}>
      {label && <span className="text-xs text-stone-500 block mb-0.5">{label}</span>}
      <span className={`group-hover:text-gold transition-colors ${display === placeholder ? 'text-stone-600 italic' : ''}`}>
        {display}
      </span>
    </div>
  )
}
