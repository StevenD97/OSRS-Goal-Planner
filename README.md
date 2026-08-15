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
- **WikiSync integration** - link your RSN and the app pulls your live quest,
  achievement diary, combat achievement, and collection log completion status
  from [WikiSync](https://oldschool.runescape.wiki/w/RuneScape:WikiSync) (the
  same community-run service behind the OSRS Wiki's "type your username" quest
  checklists), plus skill levels and boss KC from the official Hiscores.

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
Settings page -> useAccountStore.sync()
  -> GET /api/hiscores/:rsn   -> server -> secure.runescape.com (official, no auth)
  -> GET /api/wikisync/:rsn   -> server -> sync.runescape.wiki (community, no auth)
       -> normalized by lib/wikisyncMapper.ts
Goals / Dashboard read from useAccountStore + lib/goalProgress.ts to decide
whether a given goal is complete.
```

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
