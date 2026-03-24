import { useState } from 'react'
import EditableField from '../components/EditableField'
import ItemList from '../components/ItemList'

export default function Region({ campaign, updateCampaign }) {
  const [openSections, setOpenSections] = useState({})

  const region = campaign.regions[0]
  if (!region) return <p className="text-stone-500 italic">No region data.</p>

  const updateRegion = (changes) => {
    updateCampaign(c => ({
      ...c,
      regions: [{ ...c.regions[0], ...changes }]
    }))
  }

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const CollapsibleSection = ({ id, title, children }) => (
    <div className="bg-stone-800/40 border border-stone-700 rounded-lg overflow-hidden">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-stone-800/60 transition-colors"
      >
        <span className="font-display text-sm text-gold tracking-wider">{title}</span>
        <span className="text-stone-500 text-xs">{openSections[id] ? '▲' : '▼'}</span>
      </button>
      {openSections[id] && (
        <div className="px-4 pb-4 border-t border-stone-700/50 pt-3">
          {children}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Region Header */}
      <div className="bg-stone-800/40 border border-gold/30 rounded-lg p-4 space-y-3">
        <EditableField
          value={region.name}
          onChange={v => updateRegion({ name: v })}
          placeholder="Region Name"
          className="font-display text-2xl font-bold text-gold"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <EditableField value={region.settlement.name} onChange={v => updateRegion({ settlement: { ...region.settlement, name: v } })} label="Settlement" />
          <EditableField value={region.settlement.size} onChange={v => updateRegion({ settlement: { ...region.settlement, size: v } })} label="Size" />
          <EditableField value={region.settlement.type} onChange={v => updateRegion({ settlement: { ...region.settlement, type: v } })} label="Type" />
          <EditableField value={region.settlement.notes} onChange={v => updateRegion({ settlement: { ...region.settlement, notes: v } })} label="Notes" />
        </div>
      </div>

      {/* Adventure Points */}
      <div className="bg-stone-800/40 border border-stone-700 rounded-lg p-4">
        <h3 className="font-display text-sm text-gold tracking-wider mb-2">Adventure Points</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateRegion({ adventurePoints: Math.max(0, region.adventurePoints - 1) })}
            className="w-8 h-8 rounded bg-stone-700 hover:bg-stone-600 text-stone-300 font-bold transition-colors"
          >-</button>
          <span className="text-2xl font-display font-bold text-gold min-w-[3rem] text-center">
            {region.adventurePoints}
          </span>
          <button
            onClick={() => updateRegion({ adventurePoints: region.adventurePoints + 1 })}
            className="w-8 h-8 rounded bg-stone-700 hover:bg-stone-600 text-stone-300 font-bold transition-colors"
          >+</button>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-3">
        <CollapsibleSection id="friends" title="Friends">
          <ItemList items={region.friends} onChange={v => updateRegion({ friends: v })} placeholder="Add friend..." />
        </CollapsibleSection>

        <CollapsibleSection id="meetings" title="Unique Meetings">
          <ItemList items={region.uniqueMeetings} onChange={v => updateRegion({ uniqueMeetings: v })} placeholder="Add meeting..." />
        </CollapsibleSection>

        <CollapsibleSection id="locations" title="Special Locations">
          <ItemList items={region.specialLocations} onChange={v => updateRegion({ specialLocations: v })} placeholder="Add location..." />
        </CollapsibleSection>

        <CollapsibleSection id="quests" title="Quests">
          <ItemList items={region.quests} onChange={v => updateRegion({ quests: v })} placeholder="Add quest..." />
        </CollapsibleSection>

        <CollapsibleSection id="delves" title="Delves">
          <ItemList items={region.delves} onChange={v => updateRegion({ delves: v })} placeholder="Add delve..." />
        </CollapsibleSection>

        <CollapsibleSection id="contracts" title="Contracts">
          <ItemList items={region.contracts} onChange={v => updateRegion({ contracts: v })} placeholder="Add contract..." />
        </CollapsibleSection>

        <CollapsibleSection id="notes" title="Player Notes">
          <EditableField
            value={region.playerNotes}
            onChange={v => updateRegion({ playerNotes: v })}
            placeholder="Write your notes here..."
            multiline
            className="w-full"
          />
        </CollapsibleSection>
      </div>
    </div>
  )
}
