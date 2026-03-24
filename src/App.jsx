import { useState } from 'react'
import { useCampaign } from './hooks/useCampaign'
import Warband from './pages/Warband'
import Mystics from './pages/Mystics'
import Region from './pages/Region'
import CampaignLog from './pages/CampaignLog'
import Encounters from './pages/Encounters'
import Threats from './pages/Threats'
import Combat from './pages/Combat'
import StarsOfTheStory from './pages/StarsOfTheStory'

const TABS = [
  { id: 'warband', label: 'Warband', color: 'text-rust' },
  { id: 'combat', label: 'Combat', color: 'text-rust' },
  { id: 'mystics', label: 'Mystics', color: 'text-rust' },
  { id: 'threats', label: 'Threats', color: 'text-rust' },
  { id: 'region', label: 'Region', color: 'text-gold' },
  { id: 'stars', label: 'Stars of the Story', color: 'text-gold' },
  { id: 'log', label: "Campaign Log", color: 'text-sky-accent' },
  { id: 'encounters', label: 'Encounters', color: 'text-sky-accent' }
]

export default function App() {
  const [activeTab, setActiveTab] = useState('warband')
  const { campaign, loading, saveStatus, updateCampaign } = useCampaign()

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
            <div className="flex items-center gap-3">
              <SaveIndicator status={saveStatus} />
            </div>
          </div>
          {/* Tab Navigation */}
          <nav className="flex gap-1 -mb-px overflow-x-auto">
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
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'warband' && <Warband {...pageProps} />}
        {activeTab === 'combat' && <Combat {...pageProps} />}
        {activeTab === 'mystics' && <Mystics {...pageProps} />}
        {activeTab === 'threats' && <Threats {...pageProps} />}
        {activeTab === 'region' && <Region {...pageProps} />}
        {activeTab === 'stars' && <StarsOfTheStory {...pageProps} />}
        {activeTab === 'log' && <CampaignLog {...pageProps} />}
        {activeTab === 'encounters' && <Encounters {...pageProps} />}
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
