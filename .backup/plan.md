# Five Leagues from the Borderlands — Web Tracker

## Overview
A React + Tailwind web app to digitally replace the paper sheets from Five Leagues from the Borderlands. A tiny Express backend persists all data to a single `db.json` file in the project root.

## Tech Stack
- **Frontend**: React 19, React Router, Tailwind CSS 4
- **Backend**: Express (minimal JSON file server)
- **Build**: Vite
- **Data**: Single `db.json` file on disk
- **Run**: One `npm start` command boots both server and client (concurrently)

## Data Model (`db.json`)

```jsonc
{
  "campaigns": [
    {
      "id": "uuid",
      "name": "Campaign Name",
      "createdAt": "ISO date",
      "updatedAt": "ISO date",

      // Warband Roster
      "warband": {
        "name": "",
        "goldMarks": 0,
        "storyPoints": 0,
        "equipmentStash": [],
        "backpack": [],
        "heroes": [
          {
            "id": "uuid",
            "name": "",
            "origin": "",
            "title": "",
            "background": "",
            "stats": {
              "speed": 0,
              "agility": 0,
              "clear": 0,    // Clr (toughness/clarity)
              "armor": 0,
              "toughness": 0,
              "will": 0,
              "luck": 0,
              "casting": 0,
              "drag": 0      // not always used
            },
            "equipment": [],
            "skills": [],
            "xp": 0,
            "advances": 0,
            "status": "active" // "active" | "injured" | "dead"
          }
        ],
        "infirmary": [
          {
            "heroId": "uuid",
            "recoveryTurn": 0
          }
        ],
        "fallen": [
          {
            "heroId": "uuid",
            "campaignTurn": 0
          }
        ]
      },

      // Mystics
      "mystics": {
        "spells": [
          {
            "id": "uuid",
            "name": "",
            "school": "",
            "target": "",
            "duration": "",
            "effects": ""
          }
        ]
      },

      // Region (one active region at a time, but stored as array)
      "regions": [
        {
          "id": "uuid",
          "name": "",
          "settlement": {
            "name": "",
            "size": "",
            "type": "",
            "notes": ""
          },
          "adventurePoints": 0,
          "threatLevels": [false, false, false],
          "encounterLevels": {
            "theRuinWithin": 0,
            "theWhispersFromBeyond": 0,
            "theGnawlingHorde": 0,
            "theIceCourt": 0,
            "dusklingWarbands": 0,
            "theOledtKin": 0,
            "theCurseOfWar": 0,
            "theFacelessKingdom": 0,
            "roadsideEncounters": 0,
            "lurkingFoes": 0
          },
          "friends": [],
          "uniqueMeetings": [],
          "specialLocations": [],
          "quests": [],
          "delves": [],
          "contracts": [],
          "playerNotes": ""
        }
      ],

      // Campaign Log
      "campaignLog": [
        {
          "id": "uuid",
          "turnNumber": 1,
          "location": "",
          "event": "",
          "actions": "",
          "goal": "",
          "notes": "",
          "travelEncounters": ""
        }
      ],

      // Encounters Log
      "encountersLog": [
        {
          "id": "uuid",
          "turnNumber": 1,
          "enemy": "",
          "threat": "",
          "combat": "",
          "damage": "",
          "speed": "",
          "type": "",
          "clues": "",
          "hitRange": "",
          "earned": "",
          "extras": ""
        }
      ]
    }
  ]
}
```

## App Structure

```
/
├── server.js              # Express backend (~30 lines)
├── db.json                # Persisted data
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx            # Layout shell + tab navigation
│   ├── api.js             # fetch helpers (GET/POST to server)
│   ├── hooks/
│   │   └── useCampaign.js # Main data hook (load, save, auto-save)
│   ├── pages/
│   │   ├── Warband.jsx    # Roster, stash, infirmary, fallen
│   │   ├── Mystics.jsx    # Spells list
│   │   ├── Region.jsx     # Settlement, threats, locations, quests
│   │   ├── CampaignLog.jsx
│   │   └── Encounters.jsx
│   └── components/
│       ├── StatBlock.jsx      # Inline-editable stat group
│       ├── HeroCard.jsx       # Single hero display/edit
│       ├── EditableField.jsx  # Click-to-edit text field
│       ├── ItemList.jsx       # Generic add/remove list
│       ├── LogEntry.jsx       # Single campaign log row
│       └── EncounterEntry.jsx # Single encounter record
```

## Implementation Steps

### Step 1: Project scaffold
- `npm create vite` with React template
- Install dependencies: `tailwindcss`, `express`, `concurrently`, `uuid`
- Configure Vite proxy to forward `/api` to Express
- Set up `tailwind.config.js` and base styles
- Create `server.js` with two endpoints:
  - `GET /api/data` — reads and returns `db.json`
  - `POST /api/data` — writes request body to `db.json`
- Add `npm start` script using concurrently

### Step 2: Data layer & app shell
- Create `api.js` with `loadData()` and `saveData()` helpers
- Create `useCampaign` hook:
  - Loads data on mount
  - Provides campaign state + updater functions
  - Auto-saves on changes (debounced, ~1s)
  - Creates a default campaign if `db.json` is empty
- Build `App.jsx` shell with tab navigation across the 5 sections
- Style the shell: dark fantasy-ish theme, clean layout

### Step 3: Warband Roster page
- Hero cards in a responsive grid
- Each card shows: name, origin/title/background, stats, equipment, skills, XP
- Click-to-edit fields (inline editing, no modal dialogs)
- Add/remove heroes
- Hero status toggle: active / injured / dead
  - Setting "injured" moves to infirmary with recovery turn input
  - Setting "dead" moves to fallen memorial
- Equipment stash and backpack as editable lists
- Warband-level fields: name, gold marks, story points

### Step 4: Mystics page
- Spell list as editable cards/rows
- Fields: name, school, target, duration, effects
- Add/remove spells
- Casting rules reference as a collapsible panel

### Step 5: Region page
- Region header: name, settlement info (size, type, notes)
- Adventure points counter (increment/decrement)
- Threat levels as 3 checkboxes
- Encounter levels as labeled sliders/counters (for leveled variant)
- Toggle between standard and leveled encounter views
- Sections as collapsible panels:
  - Friends (list)
  - Unique Meetings (list)
  - Special Locations (list with notes)
  - Quests (list with notes)
  - Delves (list with notes)
  - Contracts (list with notes)
  - Player Notes (textarea)

### Step 6: Campaign Log page
- Chronological list of turn entries, newest first
- Each entry: turn number, location, event, actions, goal, notes, travel encounters
- Add new turn entry (auto-increments turn number)
- Expandable/collapsible entries (show summary in collapsed state)

### Step 7: Encounters Log page
- List of encounter records, grouped by campaign turn
- Each record: enemy, threat, combat, damage, speed, type, clues, hit range, earned, extras
- Add new encounter (auto-links to current campaign turn)
- Card-based layout — each encounter is a compact card with the key stats prominent and secondary info below

### Step 8: Polish
- Responsive layout (works on tablet too)
- Empty states with helpful prompts ("Add your first hero", etc.)
- Keyboard shortcuts for common actions (Escape to cancel edit, Enter to confirm)
- Visual feedback on auto-save (subtle "saved" indicator)
- Fantasy-themed accent colors and typography in Tailwind
