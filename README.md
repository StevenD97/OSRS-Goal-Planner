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
- **Official wiki icons** - skills (Goals, the Group Dashboard's Skills tab,
  Action Tracker skill steps) and gear items (Gear Progression, the Group
  Dashboard's Gear tab, item detail pages, Action Tracker gear/quest steps)
  show their real OSRS Wiki icon next to the name, hotlinked via
  `Special:FilePath` (`lib/wikiIcon.ts`) - see "Wiki icon accuracy" below for
  an important caveat on this one.
- **Item search & detail pages** - every Gear Progression item is searchable
  and clickable through to `/gear/:itemId`, which shows the same recursively-
  resolved acquisition plan as the Action Tracker, live, against whichever
  account or Group Ironman roster is linked - without needing to commit to a
  tracked plan first. Reachable from the Gear Progression page's search box,
  or by clicking any item name anywhere it appears (including the Group
  Dashboard's Gear tab).
- **Group Ironman support** - link a whole GIM roster (paste names in bulk,
  or add one at a time) instead of a single account. Every requirement check
  - Goals, gear-obtained state, Action Tracker steps - is satisfied if *any*
  linked member meets it, since gear and unlocks are effectively pooled on a
  real GIM team.
- **Group Dashboard** - a two-tab view built for GIM teams: **Skills** is a
  table of every skill (in the same order as the in-game skill panel) with
  each linked member's level side by side, plus a "Group Max" column;
  **Gear** is the full Gear Progression item list with a +/- counter per
  item so the team can track exactly how many of each are currently owned
  across the group, not just a per-person obtained checkbox.
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

**Requirements coverage**: 32 of the ~57 items in `data/gearProgression.ts`
have a structured `requires` array as of this writing; the rest (mostly raid
drops from CoX/ToB/ToA, which genuinely have no quest/skill gate beyond
"survive the raid") intentionally have none, so "Aim for this next" on those
correctly produces a single-step plan. If an item that *should* expand
doesn't, it's very likely missing `requires` data rather than a resolver bug
- check the item in `gearProgression.ts` first.

**Plans refresh on demand, not automatically**: a plan's `steps` are
snapshotted at creation time and won't pick up later `requires` data changes
on their own. Clicking "Aim for this next" / "In tracker" again on the same
item, or the "Refresh" button on the plan card in the Action Tracker, always
re-resolves the plan against current data (`useActionTrackerStore.addPlan`
is idempotent-but-refreshing: same plan id, freshly resolved steps). This
matters most right after pulling an update that adds more `requires`
coverage to an item you already have a plan for.

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
  Fonts via `<link>` in `client/index.html` for the normal app. The artifact
  build (`npm run build:artifact`) swaps that `<link>` for the same fonts
  self-hosted as base64 `data:` URIs (`vite.artifact.config.ts`'s `inlineFonts`
  plugin, reading `client/src/styles/embedded-fonts.css`) instead, since the
  artifact sandbox's CSP blocks the external stylesheet - regenerate that file
  with `node scripts/fetch-embedded-fonts.mjs` if the font stack ever changes.
- **Elevation**: cards (`Panel`) use a real two-layer soft shadow
  (`--shadow-panel` / `--shadow-panel-hover` on hover) rather than a flat
  border alone, tuned separately per theme since dark surfaces need more
  shadow opacity to read.
- **Color**: `canvas`/`surface`/`surface-2` for backgrounds, `ink`/`ink-2`/`muted`
  for text, `line`/`line-strong` for borders, `accent` (+ `accent-soft`/
  `accent-strong`/`on-accent`) as the brand color, `bronze` as a secondary
  accent, and `melee`/`ranged`/`magic`/`shared` as semantic combat-style
  colors used consistently on Gear Progression and Action Tracker badges.
- **Radius**: a small deliberate scale - `rounded-chip` (3px, badges),
  `rounded-row` (6px, buttons/inputs/list rows), `rounded-panel` (10px, cards).
- **Navigation**: a persistent left sidebar (`components/layout/Sidebar.tsx`)
  rather than a top bar, styled as a textured beige/parchment panel distinct
  from the main canvas - a warm cream with a subtle SVG-noise grain in light
  mode, a dark aged-leather brown (same grain, inverted to white) in dark
  mode. Tokens (`--sidebar-bg`, `--sidebar-ink`, `--sidebar-active`, etc.) and
  the `.sidebar-texture` utility live in `index.css` alongside the rest of
  the design system.

## Static UI preview

`npm run build:artifact --workspace=client` produces a single self-contained
HTML file (`client/dist-artifact/index.html`, via `vite-plugin-singlefile`)
with everything inlined - no server required. Routing uses `HashRouter` so
it works from a `file://` URL or any static host without SPA-fallback
config. Useful for sharing a click-through preview of the UI - Hiscores/
WikiSync sync won't work in this mode since there's no backend to proxy
through, but everything else (Goals, Dailies, Farm Runs, Gear Progression,
Action Tracker, Group Dashboard, Settings roster management) runs entirely
off localStorage and works normally.

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

### Wiki icon accuracy

`data/skillIcons.ts` and `data/itemIcons.ts` map skills/items to OSRS Wiki
image filenames, rendered via `Special:FilePath/<filename>` (no API call
needed - it's a plain redirect, so it works as a normal `<img src>`). Skill
icons follow the wiki's extremely well-established "`<Skill> icon.png`"
convention and should be reliable. Item icons are less certain: most map
straight to "`<item name>.png`" (the wiki's standard convention), but this
sandbox's network policy blocks `oldschool.runescape.wiki` directly, so none
of these ~80 filenames could be visually confirmed here - they're curated
best guesses, not a verified list. `WikiIcon.tsx` hides itself on a failed
image load, so a wrong filename just quietly omits that one icon rather than
showing a broken image - but it's worth a pass with real internet access
(i.e. after deploying) to spot-check the less obvious ones, especially the
tiered/combined entries in `itemIcons.ts` (e.g. "Barrows sets" pointing at
just `Dharok's platebody.png`) where one icon has to stand in for several
items.

### Gear progression data currency

`client/src/data/gearProgression.ts` and `client/src/data/quests.ts` were
originally compiled from general/training knowledge rather than a live wiki
fetch (this sandbox's network policy blocks `oldschool.runescape.wiki`
directly), and a user-reported error on the Occult necklace - it was listed
as craftable from Kraken drops, when it's actually an uncraftable Smoke
devil drop - revealed that pass contained real, non-obvious mistakes, not
just gaps. Every item and quest chain was then re-verified individually
(August 2026) via targeted search-engine queries against wiki-sourced
results (still no direct wiki fetch), which caught several more
wrong-source-entirely errors of the same kind: Dragon scimitar (wrongly
attributed to the Warriors' Guild instead of Daga on Ape Atoll), the
Fremennik rings (wrongly gated behind a quest instead of being Dagannoth
Kings drops), Desert Treasure II's prerequisite chain (had been copy-pasted
from Desert Treasure I's), and both Theatre of Blood and Tombs of Amascut
being entirely missing their entry-quest and wear-level requirements.

This is meaningfully more reliable than the original pass, but still not
verified against the primary source - a search-engine summary of the wiki
is not the wiki. Treat the newest content (Yama, Doom of Mokhaiotl, A
Kingdom Divided's Chasm of Fire) as the most likely to have drifted, since
it's both the most recently added and the most sparsely documented in
search results. If something looks off in-game, it's more likely a
remaining data gap than a resolver bug - check the item/quest entry first.

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

Gear Progression's obtained state (`useGearProgressionStore`) is actually a
per-item **count** under the hood (`counts: Record<string, number>`), with
the familiar obtained boolean derived as `count > 0` for the individual
Gear Progression checklist, Action Tracker, and DPS Calculator "gear I own"
filters. The Group Dashboard's Gear tab is the only place that exposes the
raw count, via a +/- stepper - useful for "we have 2 blowpipes, need one
more" tracking that a boolean can't represent.

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
