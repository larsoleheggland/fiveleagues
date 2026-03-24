import { useState, useEffect, useRef, useCallback } from 'react'
import { loadData, saveData } from '../api'
import { v4 as uuidv4 } from 'uuid'

function createDefaultCampaign() {
  return {
    id: uuidv4(),
    name: 'New Campaign',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    warband: {
      name: '',
      goldMarks: 0,
      storyPoints: 0,
      equipmentStash: [],
      backpack: [],
      heroes: [],
      infirmary: [],
      fallen: []
    },
    mystics: {
      spells: []
    },
    regions: [
      {
        id: uuidv4(),
        name: '',
        settlement: { name: '', size: '', type: '', notes: '' },
        adventurePoints: 0,
        threatLevels: [false, false, false],
        encounterLevels: {
          theRuinWithin: 0,
          theWhispersFromBeyond: 0,
          theGnawlingHorde: 0,
          theIceCourt: 0,
          dusklingWarbands: 0,
          theOledtKin: 0,
          theCurseOfWar: 0,
          theFacelessKingdom: 0,
          roadsideEncounters: 0,
          lurkingFoes: 0
        },
        friends: [],
        uniqueMeetings: [],
        specialLocations: [],
        quests: [],
        delves: [],
        contracts: [],
        playerNotes: ''
      }
    ],
    campaignLog: [],
    encountersLog: [],
    turns: []
  }
}

export function useCampaign() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState('idle')
  const saveTimer = useRef(null)
  const pendingData = useRef(null)

  useEffect(() => {
    let cancelled = false
    loadData().then(d => {
      if (cancelled) return
      if (!d.campaigns || d.campaigns.length === 0) {
        d = { campaigns: [createDefaultCampaign()] }
        saveData(d)
      }
      setData(d)
      setLoading(false)
    }).catch(() => {
      if (cancelled) return
      const d = { campaigns: [createDefaultCampaign()] }
      setData(d)
      saveData(d)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  const scheduleSave = useCallback((newData) => {
    pendingData.current = newData
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSaveStatus('unsaved')
    saveTimer.current = setTimeout(() => {
      saveData(pendingData.current).then(() => {
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      }).catch(() => setSaveStatus('error'))
    }, 1000)
  }, [])

  const updateCampaign = useCallback((updater) => {
    setData(prev => {
      const campaign = { ...prev.campaigns[0] }
      const updated = typeof updater === 'function' ? updater(campaign) : { ...campaign, ...updater }
      updated.updatedAt = new Date().toISOString()
      const newData = { ...prev, campaigns: [updated] }
      pendingData.current = newData
      return newData
    })
    // Schedule save outside the state updater
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSaveStatus('unsaved')
    saveTimer.current = setTimeout(() => {
      saveData(pendingData.current).then(() => {
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      }).catch(() => setSaveStatus('error'))
    }, 1000)
  }, [])

  const campaign = data?.campaigns?.[0] || null

  return { campaign, loading, saveStatus, updateCampaign }
}
