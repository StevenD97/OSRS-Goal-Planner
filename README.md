# OSRS Goal Planner

A goal tracker, daily checklist, and farm run guide for Old School RuneScape.

## What's here

- **Goal tracker** - skill level targets, boss/activity KC targets, and quest /
  achievement diary / combat achievement / collection log goals, plus free-form
  custom goals.
- **Dailies checklist** - a curated set of daily/near-daily tasks (farm runs,
  Managing Miscellania, Bert's sand, Wyson's seaweed, the amylase pack, etc.),
  resetting automatically at the OSRS daily reset (00:00 UTC). You can add your
  own custom daily tasks too.
- **Farm Runs** - step-by-step checklists with preset loadouts for Herb, Tree,
  Fruit Tree, Calquat, Celastrus, Hardwood, Allotment, and Flower runs, compiled
  from the [OSRS Wiki's Farming runs guide](https://oldschool.runescape.wiki/w/Farming_runs).
  Each checklist persists and auto-resets daily, same as the Dailies page.
- **Gear Progression** - an ironman-focused gear progression guide (11 tiers,
  early game through 2026 endgame content), with an "All Gear" view plus
  Melee/Ranged/Magic/Shared tabs. Each item lists how an ironman actually
  obtains it (drop/quest/minigame/craft) and can be checked off as obtained -
  progress persists and shows on the Dashboard.
- **Action Tracker** - click "Aim for this next" on any Gear Progression item
  and it recursively expands every unmet requirement - quests, and the
  quests those quests need, and skill levels - into an ordered, step-by-step
  plan ending in the item itself. Quest/skill steps auto-check themselves
  against synced Hiscores/WikiSync data; everything else is a manual
  checkbox. See "How the Action Tracker works" below.
- **Group Ironman support** - link a whole GIM roster (paste names in bulk,
  or add one at a time) instead of a single account. Every requirement check
  - Goals, gear-obtained state, Action Tracker steps - is satisfied if *any*
  linked member meets it, since gear and unlocks are effectively pooled on a
  real GIM team.
- **WikiSync integration** - link your RSN and the app pulls your live quest,
  achievement diary, combat achievement, and collection log completion status
  from [WikiSync](https://oldschool.runescape.wiki/w/RuneScape:WikiSync) (the
  same community-run service behind the OSRS Wiki's "type your username" quest
  checklists), plus skill levels and boss KC from the official Hiscores.
- **DPS Calculator** - standard OSRS accuracy-roll/max-hit combat formulas
  (verified against the wiki's worked examples) for Melee/Ranged/Magic: set
  levels, prayer, potion boost, stance, and a per-slot loadout to see max
  hit, accuracy, DPS, and time to kill against a curated monster (or a
  fully custom target). "Suggest loadout" auto-equips the best gear you
  actually have, filtered against Gear Progression's obtained state. See
  "DPS Calculator scope" below for what isn't modeled.

## Architecture

```
client/   React + TypeScript + Vite + Tailwind v4 SPA (zustand + localStorage
          for all state - no account/database yet, see "Next steps")
server/   Express + TypeScript proxy for the two external data sources
```

The server exists because neither the official Hiscores nor WikiSync send
CORS headers, so the browser can't call them directly. It also adds a small
in-memory cache and a descriptive `User-Agent` header, since WikiSync in
particular is a free, volunteer-run service - see "Being a good API citizen"
below.

### Data flow

```
Settings page -> useAccountStore.syncAll() (loops every linked GroupMember)
  -> GET /api/hiscores/:rsn   -> server -> secure.runescape.com (official, no auth)
  -> GET /api/wikisync/:rsn   -> server -> sync.runescape.wiki (community, no auth)
       -> normalized by lib/wikisyncMapper.ts
Goals / Dashboard read useAccountStore.members + lib/goalProgress.ts, which
delegates to lib/groupAggregate.ts to decide whether ANY member satisfies a
given goal.
```

### How the Action Tracker works

`client/src/lib/actionPlan.ts` walks a gear item's `requires: Requirement[]`
(quest / skill / other) depth-first against the quest registry in
`client/src/data/quests.ts`: a quest's own prerequisite quests are resolved
before the quest itself, skill mentions are merged to their highest required
level, and the target item is always the final step. The result is a flat,
ordered, deduplicated `PlanStep[]` - quest and skill steps auto-check
themselves against `lib/groupAggregate.ts` (met by any linked group member),
the final `gearItem` step mirrors the Gear Progression "obtained" checkbox
directly (checking either one checks both), and everything else falls back
to a manual per-step checkbox in `useActionTrackerStore`.

The quest registry is **not** a full graph of all ~200 OSRS quests - it only
maps prerequisite chains for quests referenced by tracked gear (Recipe for
Disaster, Monkey Madness II, Song of the Elves, Desert Treasure I & II, The
Frozen Door, The Final Dawn, While Guthix Sleeps, etc.), researched via the
OSRS Wiki. A quest not in the registry still gets added as a required step -
it just won't expand into its own sub-prerequisites. While Guthix Sleeps is
the deepest chain currently mapped (27 prerequisite quests, needed for the
Scorching bow's Tormented Demons access) and those 27 are deliberately left
as leaves rather than expanded further - see the comment at the top of
`data/quests.ts` before extending this.

## Design system

Light-first, defined as CSS custom properties in `client/src/index.css` and
wired into Tailwind v4 via `@theme` (so `bg-canvas`, `text-ink`,
`border-line`, `rounded-panel`, etc. are real utility classes, not one-off
hex values). Dark mode follows `prefers-color-scheme`, with `data-theme`
overrides ready for a manual toggle if one gets added later.

- **Type**: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque)
  for headings (`font-display`), [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans)
  for body text (the default), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
  for stat numbers and counters (`font-mono tabular-nums`). Loaded from Google
  Fonts in `client/index.html` - blocked by CSP inside the sandboxed artifact
  preview (falls back to system fonts there), loads normally everywhere else.
- **Color**: `canvas`/`surface`/`surface-2` for backgrounds, `ink`/`ink-2`/`muted`
  for text, `line`/`line-strong` for borders, `accent` (+ `accent-soft`/
  `accent-strong`/`on-accent`) as the brand color, `bronze` as a secondary
  accent, and `melee`/`ranged`/`magic`/`shared` as semantic combat-style
  colors used consistently on Gear Progression and Action Tracker badges.
- **Radius**: a small deliberate scale - `rounded-chip` (3px, badges),
  `rounded-row` (6px, buttons/inputs/list rows), `rounded-panel` (10px, cards).

## Static UI preview

`npm run build:artifact --workspace=client` produces a single self-contained
HTML file (`client/dist-artifact/index.html`, via `vite-plugin-singlefile`)
with everything inlined - no server required. Routing uses `HashRouter` so
it works from a `file://` URL or any static host without SPA-fallback
config. Useful for sharing a click-through preview of the UI - Hiscores/
WikiSync sync won't work in this mode since there's no backend to proxy
through, but everything else (Goals, Dailies, Farm Runs, Gear Progression,
Action Tracker, Settings roster management) runs entirely off localStorage
and works normally.

## Running it

```bash
npm install --workspaces
npm run dev            # runs both client (5173) and server (8787)
# or individually:
npm run dev:server
npm run dev:client
```

The Vite dev server proxies `/api/*` to the Express server (see
`client/vite.config.ts`), so the client always talks to `/api/...` regardless
of environment.

## Important caveats

### DPS Calculator scope

The formula engine (`client/src/lib/combatFormulas.ts`) implements the
standard OSRS accuracy-roll/max-hit/DPS formulas exactly as documented on
the wiki - verified against a worked example (Abyssal whip, 85% accuracy,
max 30 → 5.31 DPS) and hand-checked against the calculator's own output
(Piety + whip + 99s → 29 max hit, 83.7% accuracy, 5.06 DPS, all confirmed
by manual calculation). What it deliberately does **not** model:

- **Twisted bow**'s unique accuracy/damage scaling against the target's
  Magic level - it's included with base stats only, so treat its numbers
  as a floor, not the real output, against magic-heavy targets.
- **Scythe of Vitur**'s 3-hit cleave and **Osmumten's fang**'s
  reroll-low-rolls mechanic - both are modeled as a single ordinary hit.
- Boss-specific mechanics (phases, prayer switches, special attacks).
- The **equipment database** (`data/dpsEquipment.ts`, ~45 items) and
  **monster database** (`data/monsters.ts`, ~18 targets) are curated
  subsets with researched-but-approximate stats, not exhaustive or
  independently verified against every value in the game's item/monster
  database - especially monster defence *bonuses* (vs. defence *level*,
  which is well-documented and reliable). Use "Custom target" and the
  "Override with custom numbers" bonuses panel to plug in exact figures
  from the wiki when precision matters.

### WikiSync only has data for opted-in accounts

WikiSync is populated by players who've installed the WikiSync plugin
(RuneLite or HDOS) and logged in at least once. There's no way to pull
quest/diary/CA/collection-log data for an arbitrary account that hasn't done
this - it's opt-in, just like on the wiki itself. The Hiscores sync (skills,
boss KC) works for any account with public hiscores, no opt-in required.

### WikiSync's response shape is inferred, not documented

WikiSync has no public API documentation. `server/src/lib/wikisyncClient.ts`
and `client/src/lib/wikisyncMapper.ts` are written from inspecting the
open-source backend
([weirdgloop/wikisync-api](https://github.com/weirdgloop/wikisync-api)) and
plugin ([weirdgloop/WikiSync](https://github.com/weirdgloop/WikiSync)) source,
not a real sample response - this sandbox's network policy blocks
`sync.runescape.wiki`, so it couldn't be tested end-to-end here. Before
relying on this in production:

1. Sync a real, WikiSync-opted-in RSN from the Settings page.
2. Open the browser devtools Network tab and inspect the actual
   `/api/wikisync/:username` response.
3. Adjust `client/src/lib/wikisyncMapper.ts` (the single seam this was
   designed around) to match the real shape if needed.

### Farm run data was compiled from training knowledge + web research, not a live fetch

This sandbox's egress policy also blocks `oldschool.runescape.wiki` directly,
so the checklists in `client/src/data/farmRuns/` were written from general
OSRS knowledge and cross-checked via web search rather than a direct fetch of
the wiki page. The overall structure (patch locations, run order, which
patches need protection payments) is stable, long-standing game content, but
some specifics - exact protection-payment items for hardwood trees and the
calquat patch in particular - are flagged inline as worth double-checking
in-game or against the wiki. Everything else (herb run, tree run, fruit tree
run, celastrus's 8x potato cactus payment) was corroborated via research.

### Gear progression data currency

`client/src/data/gearProgression.ts` was compiled via web research in mid-2026
(OSRS Wiki item/boss pages + current ironman progression guides), not a live
wiki fetch - this sandbox's network policy blocked direct access to most
gear-guide sites, including the wiki itself. Core raid/GWD/DT2 content is
well-established and stable; the newest tier ("Endgame" - Yama, Doom of
Mokhaiotl) is flagged as worth double-checking in-game since it's the part
most likely to drift as the game updates. OSRS gets new bosses/gear every
few months, so this file will need periodic re-review regardless.

### Group Ironman is modeled as a pooled resource, not simulated per-account

Quest completion and skill levels are technically per-character in the real
game - one member can't inherit another's Fletching level. This planner
deliberately simplifies that: any requirement (quest, skill level, item) is
treated as "met" if *any* linked member satisfies it, because in practice a
GIM team divides labor and trades gear/materials freely. That's the right
model for "can our group get this," but it won't tell you *which* member
still needs to personally do something (e.g. reach 74 Fletching to attach
the Tormented synapse) - you'll need to track that division of labor
yourselves.

### Being a good API citizen

WikiSync is free, unauthenticated, and run by a small volunteer team (Weird
Gloop, who also run the OSRS Wiki) - there's no formal rate limit or SLA
published, just wiki-wide norms of "use a custom user-agent, be reasonable
with request volume." The server sets a descriptive `User-Agent` (see
`server/src/config.ts` - please fill in real contact info before deploying)
and caches both Hiscores and WikiSync responses for 60 seconds. If this ever
gets real traffic, consider reaching out to Weird Gloop first, or standing up
your own WikiSync-plugin fork (like [TempleOSRS](https://templeosrs.com) does)
so you're not dependent on their infrastructure.

## Next steps (not yet built)

- **Persistence beyond localStorage** - goals/dailies/farm-run progress are
  per-browser right now. A real backend + auth would let goals follow a user
  across devices.
- **Fuller Hiscores activity name list** - `server/src/lib/hiscoresClient.ts`
  only names the first ~19 activity rows; the rest come through as
  `Activity <n>`. Worth filling in the full boss/minigame list.
- **Your own sync plugin** - forking WikiSync to point at your own backend
  (see "Being a good API citizen" above) removes the opt-in-to-a-third-party
  dependency entirely.
