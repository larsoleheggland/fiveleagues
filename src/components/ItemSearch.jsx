import { useState, useRef, useEffect } from 'react'
import RULES_DB from '../data/rulesDb'

const TAG_COLORS = {
  weapon: 'bg-rust/20 text-rust',
  armor: 'bg-rust/20 text-rust',
  item: 'bg-forest/20 text-forest',
  trait: 'bg-purple-500/20 text-purple-400',
  rule: 'bg-sky-accent/20 text-sky-accent',
  enemy: 'bg-red-500/20 text-red-400',
  aberration: 'bg-red-500/20 text-red-400',
  skill: 'bg-gold/20 text-gold',
  spell: 'bg-violet-500/20 text-violet-400',
  faction: 'bg-orange-500/20 text-orange-400',
}

const ALL_TAGS = ['rule', 'item', 'weapon', 'armor', 'trait', 'enemy', 'aberration', 'spell', 'skill', 'faction']

function fuzzyMatch(query, entry) {
  const q = query.toLowerCase()
  const words = q.split(/\s+/).filter(Boolean)
  const searchable = `${entry.name} ${entry.tag} ${entry.stats || ''} ${entry.desc} ${entry.faction || ''}`.toLowerCase()
  return words.every(word => searchable.includes(word))
}

function search(query, activeTag) {
  if (!query.trim() && !activeTag) return []
  let results = RULES_DB
  if (activeTag) results = results.filter(e => e.tag === activeTag)
  if (query.trim()) results = results.filter(e => fuzzyMatch(query, e))
  return results.slice(0, 12)
}

function ResultCard({ entry }) {
  const tagColor = TAG_COLORS[entry.tag] || 'bg-stone-700 text-stone-400'

  return (
    <div className="bg-stone-800/60 border border-stone-700 rounded-lg p-3 space-y-1">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-stone-100 font-display font-semibold tracking-wider">{entry.name}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-display tracking-wider uppercase ${tagColor}`}>{entry.tag}</span>
        {entry.faction && (
          <span className="text-[10px] text-stone-500 italic">{entry.faction}</span>
        )}
      </div>
      {entry.stats && <p className="text-stone-300 text-sm font-bold">{entry.stats}</p>}
      {entry.desc && <p className="text-stone-400 text-sm">{entry.desc}</p>}
    </div>
  )
}

export default function ItemSearch({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveTag(null)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const results = search(query, activeTag)
  const hasQuery = query.trim() !== '' || activeTag !== null

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
        <div className="bg-stone-900 border border-stone-600 rounded-xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-700">
            <span className="text-stone-500 text-sm">🔍</span>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search rules, items, enemies, traits, spells..."
              className="bg-transparent text-stone-100 placeholder-stone-600 text-sm flex-1 focus:outline-none"
            />
            <button onClick={onClose} className="text-stone-500 hover:text-stone-300 text-xs">ESC</button>
          </div>

          {/* Tag filters */}
          <div className="flex gap-1 px-4 py-2 border-b border-stone-700/50 overflow-x-auto">
            {ALL_TAGS.map(tag => {
              const color = TAG_COLORS[tag] || ''
              const isActive = activeTag === tag
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(isActive ? null : tag)}
                  className={`text-[10px] px-2 py-0.5 rounded font-display tracking-wider uppercase transition-colors whitespace-nowrap ${
                    isActive ? `${color} ring-1 ring-current` : 'text-stone-600 hover:text-stone-400'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-2">
            {!hasQuery && (
              <p className="text-stone-600 text-sm text-center py-4">Type to search or pick a category</p>
            )}
            {hasQuery && results.length === 0 && (
              <p className="text-stone-600 text-sm text-center py-4">No results found</p>
            )}
            {results.map(entry => (
              <ResultCard key={entry.id} entry={entry} />
            ))}
            {hasQuery && results.length === 12 && (
              <p className="text-stone-600 text-xs text-center py-1">Showing first 12 results — refine your search</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
