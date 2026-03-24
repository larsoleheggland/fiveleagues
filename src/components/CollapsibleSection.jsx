export default function CollapsibleSection({ title, open, onToggle, accent = 'text-gold', children }) {
  return (
    <div className="bg-stone-800/40 border border-stone-700 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-stone-800/60 transition-colors"
      >
        <span className={`font-display text-sm ${accent} tracking-wider`}>{title}</span>
        <span className="text-stone-500 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-stone-700/50 pt-3">
          {children}
        </div>
      )}
    </div>
  )
}
