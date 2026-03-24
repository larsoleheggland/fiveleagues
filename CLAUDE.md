# Five Leagues from the Borderlands — Web Tracker

## Project Overview
A React + Tailwind web app that digitally replaces the paper sheets from the tabletop game "Five Leagues from the Borderlands". A tiny Express backend persists all data to a single `db.json` file.

## Tech Stack
- **Frontend**: React 19, Tailwind CSS 4 (with Vite plugin, CSS-based `@theme` config)
- **Backend**: Express (minimal JSON file server on port 3001)
- **Build**: Vite 6
- **Fonts**: Cinzel (headings), Crimson Text (body) via Google Fonts
- **Run**: `npm start` boots both server and client via `concurrently`

## How to Run
```
npm install
npm start        # starts Express (port 3001) + Vite dev (port 5173)
```
You must run `npm start` (not just `npm run dev`) — the Express API server is required for saving.

## Project Structure
```
server.js                  # Express backend (GET/POST /api/data → db.json)
db.json                    # Persisted campaign data
src/
  main.jsx                 # React entry point
  index.css                # Tailwind imports + @theme (custom colors/fonts)
  App.jsx                  # Layout shell + tab navigation + save indicator
  api.js                   # fetch helpers (loadData, saveData)
  hooks/
    useCampaign.js         # Main data hook (load, save, debounced auto-save)
  pages/
    Warband.jsx            # Hero roster, stash, backpack, infirmary, fallen
    Combat.jsx             # Combat rules reference + warband weapon stats + spells
    Mystics.jsx            # Spells list + casting rules reference
    Region.jsx             # Settlement, threats, encounters, collapsible sections
    CampaignLog.jsx        # Turn-by-turn log entries
    Encounters.jsx         # Encounter records grouped by turn
  components/
    EditableField.jsx      # Click-to-edit text/number field (Enter/Escape)
    StatBlock.jsx          # 9-stat grid for heroes
    HeroCard.jsx           # Full hero display with status, stats, equipment, skills
    ItemList.jsx           # Generic add/remove string list (green highlight for recognized items)
    LogEntry.jsx           # Expandable campaign log row
    EncounterEntry.jsx     # Encounter card with key stats
  data/
    spellTable.js          # 100 spells with incantation, target, duration, effects
    weaponTable.js         # Weapon stats (basic + quality) with damage/range/notes
    knownEquipment.js      # Known item names for green recognition highlight
```

## Key Architecture Decisions

### Data Flow
- Single `useCampaign` hook manages all state
- `updateCampaign(updater)` accepts a function that receives the current campaign and returns the updated one
- Auto-save is debounced (1s) using refs, triggered directly from `updateCampaign` (not via useEffect)
- Save status indicator shows "Saving..." / "Saved" / "Save error"

### Known Gotchas
- **db.json must be excluded from Vite's file watcher** (`watch.ignored` in vite.config.js) — otherwise saving triggers a page reload loop
- **Express must bind to `0.0.0.0`** — Node 18+ resolves `localhost` to `::1` (IPv6) but the Vite proxy defaults to IPv4, causing ECONNREFUSED
- **Vite proxy must use `127.0.0.1`** (not `localhost`) for the same IPv4/IPv6 reason
- **Save logic must not live inside `setData` updaters or `useEffect`** — React 19 StrictMode double-fires both, causing save loops

## Custom Theme Colors
Defined in `src/index.css` via `@theme`:
- `parchment` / `parchment-dark` — light background tones
- `rust` / `rust-light` — Warband/Mystics accent (red-orange)
- `gold` / `gold-light` — Region accent
- `sky-accent` / `sky-light` — Campaign Log/Encounters accent (blue)
- `forest` — success/active state (green)
- `ink` — dark text

## Reference Material
The `page_*.png` files and `5L_fan_made_sheets_V1.6.pdf` are the original paper sheets this app digitizes.
