# Five Leagues from the Borderlands — Rulebook Reference

## Purpose
The `rulebook/` directory contains the game rules for "Five Leagues from the Borderlands" (3rd edition), split into topic-focused files for efficient AI lookup. The original `rulebook.txt` is preserved untouched as the single source of truth.

## How to Answer Rule Questions

**Start with the right file.** Do not read `rulebook.txt` — it is 8000+ lines and will waste context. Instead, pick the smallest file that covers the topic:

| Question about... | Read this file |
|---|---|
| Character origins, ability scores, backgrounds, skills, warband creation | `character_creation.txt` |
| Battle rounds, initiative, movement, ranged/melee combat, hits, damage, morale | `combat_rules.txt` |
| Spell casting, strands, specific spell effects | `spells_and_magic.txt` |
| Campaign setup, map, threats, preparation stage, campaign activities | `campaign_structure.txt` |
| Travel, contracts, quests, patrol, encounter locations, unexplored locations | `adventures_and_travel.txt` |
| Specific enemy faction stats, faction special rules, enemy profiles | `enemy_tables.txt` |
| Aberrations/monsters, Monster Points, bestiary stats, aberration traits | `aberrations_bestiary.txt` |
| Weapons, armor, mundane items, trade tables, equipment storage | `equipment_and_items.txt` |
| Enchanted weapons/armor/potions/jewelry/clothing/apparatus/uniques | `enchanted_items.txt` |
| Post-battle injuries, XP, advancement, loot, unusual finds, victory/defeat | `resolution_and_advancement.txt` |
| "Which table do I roll on?" / finding the right table by name or dice type | `roll_tables_reference.txt` |
| Official errata, rule changes, v2.0 clarifications | `v2_clarifications.txt` |

**If a question spans two topics** (e.g., "what happens when a Mystic casts Heal on a Wounded character in melee?"), read both relevant files (`spells_and_magic.txt` for the spell, `combat_rules.txt` for Wounded/melee rules).

## File Conventions
- Files contain the actual rule text, not summaries. Treat them as authoritative.
- If a file says "see main rulebook" for a detail, fall back to `rulebook.txt` and read only the relevant lines using offset/limit.
- `roll_tables_reference.txt` is an index only — it lists every table with dice type and purpose but not the table contents. Use it to find which file has the full table.
- `enemy_tables.txt` is the largest split file (~58KB) because it contains all 10 factions. When answering about a specific faction, read only that section.

## Common Multi-File Lookups

| Scenario | Files needed |
|---|---|
| "How do I create a character?" | `character_creation.txt` |
| "What do I roll after a battle?" | `resolution_and_advancement.txt` |
| "How does melee combat work?" | `combat_rules.txt` |
| "What enemies might I face in a Delve?" | `adventures_and_travel.txt` (Delve rules) + `enemy_tables.txt` (Lurking Foes) |
| "What loot can I find?" | `resolution_and_advancement.txt` (loot tables) + `enchanted_items.txt` (enchanted loot details) |
| "What can I do in the preparation stage?" | `campaign_structure.txt` |
| "How does this enchanted weapon work?" | `enchanted_items.txt` |
| "What spells should my Mystic pick?" | `spells_and_magic.txt` |
| "How do Quests work?" | `adventures_and_travel.txt` |
| "What are the Gnawling Horde's special rules?" | `enemy_tables.txt` (Gnawling Horde section) |

## Important Notes
- The rulebook is for personal reference only. Do not reproduce large sections verbatim when answering — paraphrase and cite the specific rule.
- When the user asks about a rule, give a concise answer with the mechanical details they need, then offer to look up related rules if relevant.
- The game uses D6 for combat, D100 (percentile) for most campaign tables, D20 for character backgrounds, and D10 for random direction.
- "Hold the Field" means all enemies are removed from the table. "Achieve the Objective" is scenario-specific.
