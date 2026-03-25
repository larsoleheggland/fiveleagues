import { v4 as uuidv4 } from 'uuid'
import EditableField from '../components/EditableField'
import HeroCard from '../components/HeroCard'
import ItemList, { countItems } from '../components/ItemList'
import { parseItemQuantity } from '../data/equipmentInfo'

function createHero() {
  return {
    id: uuidv4(),
    name: '',
    origin: '',
    title: '',
    background: '',
    stats: {
      speed: 4, dash: 3, agility: 1, combatSkill: 0, armor: 0,
      toughness: 3, will: 0, luck: 0, casting: 0, dmg: 0
    },
    isMystic: false,
    equipment: [],
    skills: [],
    traits: [],
    xp: 0,
    advances: 0,
    status: 'active'
  }
}

export default function Warband({ campaign, updateCampaign }) {
  const wb = campaign.warband

  const updateWarband = (changes) => {
    updateCampaign(c => ({ ...c, warband: { ...c.warband, ...changes } }))
  }

  const updateHero = (heroId, updated) => {
    updateWarband({
      heroes: wb.heroes.map(h => h.id === heroId ? updated : h)
    })
  }

  const addHero = () => {
    updateWarband({ heroes: [...wb.heroes, createHero()] })
  }

  const removeHero = (heroId) => {
    updateWarband({
      heroes: wb.heroes.filter(h => h.id !== heroId),
      infirmary: wb.infirmary.filter(e => e.heroId !== heroId),
      fallen: wb.fallen.filter(e => e.heroId !== heroId)
    })
  }

  const changeHeroStatus = (heroId, newStatus) => {
    const hero = wb.heroes.find(h => h.id === heroId)
    if (!hero) return

    let heroes = wb.heroes.map(h => h.id === heroId ? { ...h, status: newStatus } : h)
    let infirmary = wb.infirmary.filter(e => e.heroId !== heroId)
    let fallen = wb.fallen.filter(e => e.heroId !== heroId)

    if (newStatus === 'injured') {
      infirmary = [...infirmary, { heroId, recoveryTurn: 0 }]
    } else if (newStatus === 'dead') {
      fallen = [...fallen, { heroId, campaignTurn: 0 }]
    }

    updateWarband({ heroes, infirmary, fallen })
  }

  const moveHero = (heroId, direction) => {
    const heroes = [...wb.heroes]
    const idx = heroes.findIndex(h => h.id === heroId)
    if (idx < 0) return
    const status = heroes[idx].status
    // Find indices of heroes with the same status
    const sameStatus = heroes.reduce((acc, h, i) => {
      if (h.status === status) acc.push(i)
      return acc
    }, [])
    const posInGroup = sameStatus.indexOf(idx)
    const swapPos = posInGroup + direction
    if (swapPos < 0 || swapPos >= sameStatus.length) return
    const swapIdx = sameStatus[swapPos]
    ;[heroes[idx], heroes[swapIdx]] = [heroes[swapIdx], heroes[idx]]
    updateWarband({ heroes })
  }

  const activeHeroes = wb.heroes.filter(h => h.status === 'active')
  const injuredHeroes = wb.heroes.filter(h => h.status === 'injured')
  const fallenHeroes = wb.heroes.filter(h => h.status === 'dead')

  return (
    <div className="space-y-8">
      {/* Warband Header */}
      <div className="flex flex-wrap items-end gap-6">
        <EditableField
          value={wb.name}
          onChange={v => updateWarband({ name: v })}
          placeholder="Warband Name"
          className="font-display text-2xl font-bold"
        />
        <EditableField
          value={wb.goldMarks}
          onChange={v => updateWarband({ goldMarks: v })}
          label="Gold Marks"
          type="number"
          className="text-gold font-bold"
        />
        <EditableField
          value={wb.storyPoints}
          onChange={v => updateWarband({ storyPoints: v })}
          label="Story Points"
          type="number"
          className="text-sky-accent font-bold"
        />
        <EditableField
          value={wb.adventurePoints}
          onChange={v => updateWarband({ adventurePoints: v })}
          label="Adventure Points"
          type="number"
          className="text-forest font-bold"
        />
      </div>

      {/* Active Heroes */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-rust tracking-wider">Active Heroes</h2>
          <button
            onClick={addHero}
            className="bg-forest/20 text-forest hover:bg-forest/30 px-3 py-1 rounded text-sm font-display tracking-wider transition-colors"
          >
            + Add Hero
          </button>
        </div>
        {activeHeroes.length === 0 ? (
          <p className="text-stone-500 italic text-center py-8">No active heroes. Add your first hero to begin.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {activeHeroes.map((hero, i) => (
              <HeroCard
                key={hero.id}
                hero={hero}
                onChange={updated => updateHero(hero.id, updated)}
                onRemove={() => removeHero(hero.id)}
                onStatusChange={status => changeHeroStatus(hero.id, status)}
                onMoveUp={i > 0 ? () => moveHero(hero.id, -1) : null}
                onMoveDown={i < activeHeroes.length - 1 ? () => moveHero(hero.id, 1) : null}
              />
            ))}
          </div>
        )}
      </section>

      {/* Infirmary */}
      {injuredHeroes.length > 0 && (
        <section>
          <h2 className="font-display text-lg text-gold tracking-wider mb-4">Infirmary</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {injuredHeroes.map((hero, i) => {
              const inf = wb.infirmary.find(e => e.heroId === hero.id)
              return (
                <div key={hero.id}>
                  <HeroCard
                    hero={hero}
                    onChange={updated => updateHero(hero.id, updated)}
                    onRemove={() => removeHero(hero.id)}
                    onStatusChange={status => changeHeroStatus(hero.id, status)}
                    onMoveUp={i > 0 ? () => moveHero(hero.id, -1) : null}
                    onMoveDown={i < injuredHeroes.length - 1 ? () => moveHero(hero.id, 1) : null}
                  />
                  {inf && (
                    <div className="mt-1 ml-5">
                      <EditableField
                        value={inf.recoveryTurn}
                        onChange={v => {
                          updateWarband({
                            infirmary: wb.infirmary.map(e =>
                              e.heroId === hero.id ? { ...e, recoveryTurn: v } : e
                            )
                          })
                        }}
                        label="Recovery Turn"
                        type="number"
                        className="text-sm text-gold"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Fallen */}
      {fallenHeroes.length > 0 && (
        <section>
          <h2 className="font-display text-lg text-rust tracking-wider mb-4">Fallen Memorial</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {fallenHeroes.map((hero, i) => {
              const f = wb.fallen.find(e => e.heroId === hero.id)
              return (
                <div key={hero.id} className="opacity-70">
                  <HeroCard
                    hero={hero}
                    onChange={updated => updateHero(hero.id, updated)}
                    onRemove={() => removeHero(hero.id)}
                    onStatusChange={status => changeHeroStatus(hero.id, status)}
                    onMoveUp={i > 0 ? () => moveHero(hero.id, -1) : null}
                    onMoveDown={i < fallenHeroes.length - 1 ? () => moveHero(hero.id, 1) : null}
                  />
                  {f && (
                    <div className="mt-1 ml-5">
                      <EditableField
                        value={f.campaignTurn}
                        onChange={v => {
                          updateWarband({
                            fallen: wb.fallen.map(e =>
                              e.heroId === hero.id ? { ...e, campaignTurn: v } : e
                            )
                          })
                        }}
                        label="Fell on Turn"
                        type="number"
                        className="text-sm text-rust"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Stash & Backpack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-stone-800/40 border border-stone-700 rounded-lg p-4">
          <ItemList
            items={wb.equipmentStash}
            onChange={v => updateWarband({ equipmentStash: v })}
            label="Equipment Stash"
            placeholder="Add to stash..."
            onMoveItem={(index) => {
              const item = wb.equipmentStash[index]
              const itemCount = parseItemQuantity(item).quantity
              if (countItems(wb.backpack) + itemCount > 8) return
              updateWarband({
                equipmentStash: wb.equipmentStash.filter((_, i) => i !== index),
                backpack: [...wb.backpack, item]
              })
            }}
            moveLabel="→"
            moveTitle="Move to backpack"
          />
        </div>
        <div className="bg-stone-800/40 border border-stone-700 rounded-lg p-4">
          <ItemList
            items={wb.backpack}
            onChange={v => updateWarband({ backpack: v })}
            label={`Backpack (${countItems(wb.backpack)}/8)`}
            placeholder="Add to backpack..."
            onMoveItem={(index) => {
              const item = wb.backpack[index]
              updateWarband({
                backpack: wb.backpack.filter((_, i) => i !== index),
                equipmentStash: [...wb.equipmentStash, item]
              })
            }}
            moveLabel="←"
            moveTitle="Move to stash"
          />
        </div>
      </div>
    </div>
  )
}
