import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import EditableField from './EditableField'

function MarkdownBlock({ value, onChange, label, placeholder = 'Click to edit...' }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  const commit = () => {
    setEditing(false)
    if (draft !== value) onChange(draft)
  }

  if (editing) {
    return (
      <div>
        {label && <span className="text-xs text-stone-500 block mb-0.5">{label}</span>}
        <textarea
          autoFocus
          value={draft ?? ''}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => { if (e.key === 'Escape') { setDraft(value); setEditing(false) } }}
          rows={10}
          className="bg-stone-800 border border-stone-600 rounded px-2 py-1 text-stone-100 focus:outline-none focus:border-gold w-full font-mono text-sm"
        />
      </div>
    )
  }

  const hasContent = value && value.trim()

  return (
    <div className="cursor-pointer group" onClick={() => { setDraft(value); setEditing(true) }}>
      {label && <span className="text-xs text-stone-500 block mb-0.5">{label}</span>}
      {hasContent ? (
        <div className="prose prose-invert prose-sm max-w-none
          prose-headings:font-display prose-headings:text-gold prose-headings:tracking-wider prose-headings:mt-3 prose-headings:mb-1
          prose-h3:text-base prose-h4:text-sm
          prose-p:text-stone-300 prose-p:my-1
          prose-li:text-stone-300 prose-li:my-0
          prose-strong:text-stone-100
          prose-ul:my-1 prose-ol:my-1
          prose-hr:border-stone-700 prose-hr:my-3
          prose-table:border-collapse prose-th:border prose-th:border-stone-600 prose-th:px-2 prose-th:py-1 prose-th:text-stone-200 prose-th:bg-stone-800/60
          prose-td:border prose-td:border-stone-700 prose-td:px-2 prose-td:py-1 prose-td:text-stone-300
          transition-colors">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        </div>
      ) : (
        <span className="text-stone-600 italic group-hover:text-gold transition-colors">{placeholder}</span>
      )}
    </div>
  )
}

export default function LogEntry({ entry, onChange, onRemove }) {
  const [expanded, setExpanded] = useState(false)

  const update = (field, value) => {
    onChange({ ...entry, [field]: value })
  }

  const hasPlan = entry.sessionPlan && entry.sessionPlan.trim()

  return (
    <div className="bg-stone-800/40 border border-stone-700 rounded-lg overflow-hidden">
      {/* Collapsed header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-stone-800/60 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="font-display text-sky-accent font-bold min-w-[3rem]">
          #{entry.turnNumber}
        </span>
        <span className="text-sm text-stone-300 flex-1 truncate">
          {entry.location || entry.event || (hasPlan && entry.sessionPlan.trim().split('\n')[0].replace(/^#+\s*/, '')) || 'Empty entry'}
        </span>
        {hasPlan && <span className="text-xs text-gold/60 font-display tracking-wider">PLAN</span>}
        <button
          onClick={e => { e.stopPropagation(); onRemove() }}
          className="text-stone-600 hover:text-rust text-xs"
        >
          x
        </button>
        <span className="text-stone-500 text-xs">{expanded ? '▲' : '▼'}</span>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-2 border-t border-stone-700/50">
          {/* Session Plan */}
          <div className="pt-3">
            <MarkdownBlock
              value={entry.sessionPlan || ''}
              onChange={v => update('sessionPlan', v)}
              label="Session Plan"
              placeholder="Click to add a session plan (supports Markdown)..."
            />
          </div>

          <hr className="border-stone-700/50" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <EditableField value={entry.turnNumber} onChange={v => update('turnNumber', v)} label="Turn #" type="number" />
            <EditableField value={entry.location} onChange={v => update('location', v)} label="Location" />
          </div>
          <EditableField value={entry.event} onChange={v => update('event', v)} label="Event" />
          <EditableField value={entry.actions} onChange={v => update('actions', v)} label="Actions" multiline />
          <EditableField value={entry.goal} onChange={v => update('goal', v)} label="Goal" />
          <EditableField value={entry.notes} onChange={v => update('notes', v)} label="Notes" multiline />
          <EditableField value={entry.travelEncounters} onChange={v => update('travelEncounters', v)} label="Travel Encounters" multiline />
        </div>
      )}
    </div>
  )
}
