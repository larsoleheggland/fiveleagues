import { useState, useEffect, useCallback } from 'react'
import { useCampaign } from './hooks/useCampaign'
import ItemSearch from './components/ItemSearch'
import Warband from './pages/Warband'
import Mystics from './pages/Mystics'
import Region from './pages/Region'
import TurnTracker from './pages/TurnTracker'
import Combat from './pages/Combat'
import StarsOfTheStory from './pages/StarsOfTheStory'

const TABS = [
  { id: 'warband', label: 'Warband', color: 'text-rust' },
  { id: 'combat', label: 'Combat', color: 'text-rust' },
  { id: 'region', label: 'Region', color: 'text-gold' },
  { id: 'turns', label: 'Campaign Tracker', color: 'text-sky-accent' },
  { id: 'mystics', label: 'Mystics', color: 'text-rust' },
  { id: 'stars', label: 'Stars of the Story', color: 'text-gold' }
]

export default function App() {
  const [activeTab, setActiveTab] = useState('warband')
  const [searchOpen, setSearchOpen] = useState(false)
  const { campaign, loading, saveStatus, updateCampaign } = useCampaign()

  const closeSearch = useCallback(() => setSearchOpen(false), [])

  // Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl font-display text-gold animate-pulse">Loading...</p>
      </div>
    )
  }

  const pageProps = { campaign, updateCampaign }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-stone-700 bg-stone-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-wide">
              <span className="text-stone-100">FIVE LEAGUES</span>
              <span className="text-stone-400 text-sm md:text-base ml-2">from the Borderlands</span>
            </h1>
            <SaveIndicator status={saveStatus} />
          </div>
          {/* Tab Navigation + Search */}
          <nav className="flex items-center gap-1 -mb-px overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-display text-sm tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? `${tab.color} border-current`
                    : 'text-stone-500 border-transparent hover:text-stone-300 hover:border-stone-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <div className="ml-auto flex-shrink-0 pb-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 bg-stone-800/60 border border-stone-700 hover:border-stone-500 rounded-lg px-3 py-1.5 text-stone-500 hover:text-stone-300 transition-colors cursor-text"
              >
                <span className="text-sm">🔍</span>
                <span className="text-sm">Search items, rules, enemies...</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <ItemSearch open={searchOpen} onClose={closeSearch} />

      {/* Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'warband' && <Warband {...pageProps} />}
        {activeTab === 'combat' && <Combat {...pageProps} />}
        {activeTab === 'turns' && <TurnTracker {...pageProps} />}
        {activeTab === 'region' && <Region {...pageProps} />}
        {activeTab === 'mystics' && <Mystics {...pageProps} />}
        {activeTab === 'stars' && <StarsOfTheStory {...pageProps} />}
      </main>
    </div>
  )
}

function SaveIndicator({ status }) {
  if (status === 'idle') return null
  return (
    <span className={`text-xs font-body transition-opacity ${
      status === 'saved' ? 'text-forest opacity-100' :
      status === 'unsaved' ? 'text-gold opacity-70' :
      'text-rust opacity-100'
    }`}>
      {status === 'saved' ? 'Saved' : status === 'unsaved' ? 'Saving...' : 'Save error'}
    </span>
  )
}
