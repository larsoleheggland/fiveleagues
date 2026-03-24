import { useState } from 'react'
import EditableField from '../components/EditableField'
import ItemList from '../components/ItemList'
import CollapsibleSection from '../components/CollapsibleSection'

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
        <CollapsibleSection title="Friends" open={openSections.friends} onToggle={() => toggleSection('friends')}>
          <ItemList items={region.friends} onChange={v => updateRegion({ friends: v })} placeholder="Add friend..." />
        </CollapsibleSection>

        <CollapsibleSection title="Unique Meetings" open={openSections.meetings} onToggle={() => toggleSection('meetings')}>
          <ItemList items={region.uniqueMeetings} onChange={v => updateRegion({ uniqueMeetings: v })} placeholder="Add meeting..." />
        </CollapsibleSection>

        <CollapsibleSection title="Special Locations" open={openSections.locations} onToggle={() => toggleSection('locations')}>
          <ItemList items={region.specialLocations} onChange={v => updateRegion({ specialLocations: v })} placeholder="Add location..." />
        </CollapsibleSection>

        <CollapsibleSection title="Quests" open={openSections.quests} onToggle={() => toggleSection('quests')}>
          <ItemList items={region.quests} onChange={v => updateRegion({ quests: v })} placeholder="Add quest..." />
        </CollapsibleSection>

        <CollapsibleSection title="Delves" open={openSections.delves} onToggle={() => toggleSection('delves')}>
          <ItemList items={region.delves} onChange={v => updateRegion({ delves: v })} placeholder="Add delve..." />
        </CollapsibleSection>

        <CollapsibleSection title="Contracts" open={openSections.contracts} onToggle={() => toggleSection('contracts')}>
          <ItemList items={region.contracts} onChange={v => updateRegion({ contracts: v })} placeholder="Add contract..." />
        </CollapsibleSection>

        <CollapsibleSection title="Player Notes" open={openSections.notes} onToggle={() => toggleSection('notes')}>
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
