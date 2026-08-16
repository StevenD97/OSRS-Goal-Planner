import type { GearProgressionTier } from "../types/gearProgression";

/**
 * Ironman-focused gear progression, current as of mid-2026. Every "source"
 * describes how an ironman actually gets the item (drop / quest / minigame
 * / craft) since buying from the GE isn't an option. Ordered roughly the
 * way an ironman would hit these milestones, not strictly by GP value.
 *
 * Individually fact-checked (August 2026) after a user-reported error on
 * the Occult necklace revealed the original data (compiled from general/
 * training knowledge, not a live wiki fetch - this sandbox's network
 * policy blocks the wiki directly) contained real, non-obvious mistakes -
 * not just missing detail, but wrong acquisition methods entirely (e.g.
 * the Occult necklace was listed as a craftable Kraken item; it's actually
 * an uncraftable Smoke devil drop). Every item's source, requirements, and
 * requires[] were re-verified via targeted research and corrected where
 * wrong. Items still marked "verify in-game" are recent content where
 * search results were less conclusive than the rest of the dataset.
 */
export const GEAR_PROGRESSION: GearProgressionTier[] = [
  {
    id: "early-game",
    order: 1,
    name: "Early Game",
    description:
      "Questing and early Smithing/Slayer get you out of bronze fast. Focus on quest cape requirements and unlocking Barbarian Assault / Warriors' Guild access.",
    items: [
      {
        id: "eg-melee-weapon",
        slot: "weapon",
        item: "Rune scimitar -> Dragon scimitar",
        style: "melee",
        source:
          "Rune scimitar (40 Attack) from Smithing/Blast Furnace or monster drops; Dragon scimitar purchased from Daga's Scimitar Smithy on Ape Atoll for 100,000 coins - Daga only sells it after Monkey Madness I is completed",
        requirements: "40 Attack for rune scimitar; 60 Attack + Monkey Madness I completion for dragon scimitar",
        requires: [
          { type: "skill", skill: "Attack", level: 60 },
          { type: "quest", questId: "monkey-madness-1" },
        ],
      },
      {
        id: "eg-melee-armor",
        slot: "body",
        item: "Rune platebody + legs",
        style: "melee",
        source: "Smithing (Blast Furnace) or monster drops",
        requirements:
          "40 Defence to wear; the platebody (not the platelegs) also requires Dragon Slayer I completion; 99 Smithing to self-smith (or buy from other iron income)",
        requires: [
          { type: "skill", skill: "Defence", level: 40 },
          { type: "quest", questId: "dragon-slayer-1" },
        ],
      },
      {
        id: "eg-melee-shield",
        slot: "shield",
        item: "Dragon square shield",
        style: "melee",
        source:
          "Assembled from a Shield left half (rare drop - best source Skotizo ~1/100, also Goraks, or the general Rare Drop Table) and a Shield right half (bought for 750,000 coins from the Legends' Guild or Myths' Guild), combined at an anvil with a hammer",
        requirements: "60 Defence + Legends' Quest completion to wield; 60 Smithing to assemble the halves",
        requires: [
          { type: "skill", skill: "Defence", level: 60 },
          { type: "quest", questId: "legends-quest" },
          { type: "skill", skill: "Smithing", level: 60 },
        ],
      },
      {
        id: "eg-ranged-weapon",
        slot: "weapon",
        item: "Rune crossbow + Broad bolts",
        style: "ranged",
        source:
          "Crossbow from Fletching/Slayer/drops; broad bolts bought directly for 35 Slayer points per 250 bolts from any Slayer master, or fletched at 55 Fletching after unlocking Broader Fletching (300 Slayer points)",
        requirements: "61 Ranged to wield rune crossbow",
        requires: [{ type: "skill", skill: "Ranged", level: 61 }],
      },
      {
        id: "eg-ranged-armor",
        slot: "body",
        item: "Green -> Blue -> Red d'hide armor",
        style: "ranged",
        source: "Crafted from dragon leather (Slayer task drops) or monster drops",
        requirements:
          "40 Defence for all three tiers; Ranged scales per tier (40/50/60 for green/blue/red); the green tier also requires Dragon Slayer I completion",
        requires: [
          { type: "skill", skill: "Defence", level: 40 },
          { type: "skill", skill: "Ranged", level: 40 },
          { type: "quest", questId: "dragon-slayer-1" },
        ],
      },
      {
        id: "eg-magic-weapon",
        slot: "weapon",
        item: "Iban's staff / Slayer's staff",
        style: "magic",
        source:
          "Iban's staff - defeat Iban at the end of Underground Pass (its only source). Slayer's staff - bought directly from any Slayer Master's shop for 21,000 coins.",
        requires: [
          { type: "quest", questId: "underground-pass" },
          { type: "skill", skill: "Magic", level: 50 },
          { type: "skill", skill: "Attack", level: 50 },
        ],
        notes:
          "Slayer's staff needs 50 Magic + 55 Slayer to wield and is a straightforward shop purchase - it isn't tied to Nightmare Zone points.",
      },
      {
        id: "eg-magic-armor",
        slot: "body",
        item: "Mystic robes",
        style: "magic",
        source:
          "Blue mystic robes bought from the Magic Guild Store (Wizards' Guild, requires 66 Magic to enter), or a Blue Mystic Robe Top from Oziach in Edgeville after Dragon Slayer I; dark mystic pieces drop from Slayer Tower monsters, light mystic pieces from the Fremennik Slayer Dungeon",
        requirements: "40 Magic + 20 Defence to wear",
        requires: [
          { type: "skill", skill: "Magic", level: 40 },
          { type: "skill", skill: "Defence", level: 20 },
        ],
      },
      {
        id: "eg-neck",
        slot: "neck",
        item: "Amulet of Glory",
        style: "shared",
        source:
          "Craft a dragonstone amulet (80 Crafting: gold bar + cut dragonstone + amulet mould, strung with a ball of wool), then cast Lvl-5 Enchant (68 Magic). Free recharges at the Fountain of Rune in the Wilderness - each recharge has a 1/25,000 chance to become an Amulet of Eternal Glory with unlimited charges. Mounting a glory in a POH Quest Hall (47 Construction) also gives unlimited teleports.",
        requirements: "80 Crafting + 68 Magic to make",
        requires: [
          { type: "skill", skill: "Crafting", level: 80 },
          { type: "skill", skill: "Magic", level: 68 },
        ],
      },
    ],
  },
  {
    id: "foundation-gear",
    order: 2,
    name: "Foundation Gear",
    description:
      "The universal quality-of-life gear every account wants before pushing into serious bossing - hits across all three combat styles.",
    items: [
      {
        id: "fg-gloves",
        slot: "hands",
        item: "Barrows gloves",
        style: "shared",
        source:
          "Recipe for Disaster (quest) unlocks purchasing them from the Culinaromancer's Chest in the Lumbridge Castle cellar (130,000 coins, 104,000 with the Elite Lumbridge & Draynor Diary) - best gloves in the game until Ferocious/Zaryte specialise by style",
        requirements: "Recipe for Disaster completion",
        requires: [{ type: "quest", questId: "recipe-for-disaster" }],
      },
      {
        id: "fg-torso",
        slot: "body",
        item: "Fighter torso",
        style: "melee",
        source:
          "Barbarian Assault - purchased from Commander Connad after earning 375 honour points in each of the 4 roles (Attacker/Defender/Collector/Healer) plus at least 1 Penance Queen kill",
        requirements: "40 Defence to equip; Barbarian Assault minigame progress",
        requires: [
          { type: "skill", skill: "Defence", level: 40 },
          { type: "other", label: "Barbarian Assault: 375 honour points in each role + a Penance Queen kill" },
        ],
      },
      {
        id: "fg-defender",
        slot: "shield",
        item: "Dragon defender",
        style: "melee",
        source:
          "Rare drop (~1/100) from the level-106 Cyclopes in the Warriors' Guild basement - gated behind looting all 6 lower-tier defenders first (bronze through rune); showing a rune defender to Lorelai grants permanent basement access. Warriors' Guild tokens (from feeding armour sets to the animated armour stand) only grant timed access to the Cyclops chamber, not the defender itself.",
        requirements: "60 Attack, 60 Strength for Warriors' Guild access",
        requires: [
          { type: "skill", skill: "Attack", level: 60 },
          { type: "skill", skill: "Strength", level: 60 },
        ],
      },
      {
        id: "fg-cape-melee",
        slot: "cape",
        item: "Fire cape",
        style: "melee",
        source: "Fight Caves (TzHaar minigame) - solo, defeat TzTok-Jad",
        requirements: "No formal level gate; reasonable melee/ranged/magic gear to survive waves + Jad",
      },
      {
        id: "fg-ring",
        slot: "ring",
        item: "Berserker ring / Archers' ring / Seers' ring (i)",
        style: "shared",
        source:
          "Dropped by the Dagannoth Kings in the Waterbirth Island Dungeon - Berserker ring from Dagannoth Rex, Archers' ring from Dagannoth Supreme, Seers' ring from Dagannoth Prime. No quest is required - imbued (i) versions cost 650,000 Nightmare Zone points (325,000 with hard-tier Combat Achievements), 260 Soul Wars Zeal tokens, or a Scroll of Imbuing (200 Emir's Arena points).",
        requirements: "Defeat the relevant Dagannoth King (multi-combat, ~level 303)",
        requires: [
          { type: "other", label: "Defeat the relevant Dagannoth King - no quest required" },
          { type: "other", label: "Earn enough Nightmare Zone/Soul Wars/Emir's Arena points to imbue the ring" },
        ],
      },
      {
        id: "fg-ranged-armor",
        slot: "body",
        item: "Karil's leathertop + skirt",
        style: "ranged",
        source: "Barrows reward chest (not a direct kill-drop off Karil himself)",
        requirements: "70 Defence + 70 Ranged to wear",
        requires: [
          { type: "skill", skill: "Defence", level: 70 },
          { type: "skill", skill: "Ranged", level: 70 },
        ],
        notes: "Solid ranged armour tier before Black d'hide/Crystal/Masori.",
      },
      {
        id: "fg-magic-neck",
        slot: "neck",
        item: "Occult necklace",
        style: "magic",
        source:
          "Dropped by Smoke devils, superior smoke devils, and the boss Thermonuclear smoke devil in the Smoke Devil Dungeon - these are the only sources; there is no crafting recipe.",
        requirements: "93 Slayer (active task required) to damage smoke devils; 70 Magic to wear",
        requires: [
          { type: "skill", skill: "Slayer", level: 93 },
          { type: "skill", skill: "Magic", level: 70 },
        ],
      },
    ],
  },
  {
    id: "pre-raid-power-spike",
    order: 3,
    name: "Pre-Raid Power Spike",
    description:
      "The single biggest DPS jumps most ironmen will ever feel. These three unlock efficient Slayer, bossing, and raiding.",
    items: [
      {
        id: "prps-ranged-weapon",
        slot: "weapon",
        item: "Toxic blowpipe",
        style: "ranged",
        source:
          "Zulrah drops a Tanzanite fang; using a chisel on the fang alone (78 Fletching, boostable) creates the toxic blowpipe (uncharged) directly - no second drop is needed to assemble it",
        requirements: "75 Ranged; Regicide for Zul-Andra access; solid ranged/magic gear to solo Zulrah",
        notes: "Usually the single biggest ranged power spike on an ironman account.",
        requires: [
          { type: "quest", questId: "regicide" },
          { type: "skill", skill: "Ranged", level: 75 },
        ],
      },
      {
        id: "prps-magic-weapon",
        slot: "weapon",
        item: "Trident of the Seas / Swamp",
        style: "magic",
        source:
          "Trident of the Seas is a Kraken/cave kraken drop (task-only). Trident of the Swamp is made by upgrading a Seas trident with a Magic fang (a Zulrah drop) plus a chisel (59 Crafting) - not with Kraken tentacles.",
        requirements: "87 Slayer for Kraken, 75 Magic to wield (verify the Swamp variant's wield level in-game - sources gave slightly conflicting figures around 75-78)",
        requires: [
          { type: "skill", skill: "Slayer", level: 87 },
          { type: "skill", skill: "Magic", level: 75 },
        ],
      },
      {
        id: "prps-jewelry",
        slot: "neck",
        item: "Zenyte jewelry (Torture / Necklace of Anguish / Tormented bracelet / Ring of suffering)",
        style: "shared",
        source:
          "Zenyte shard from Demonic Gorillas (~1/300 per shard) - each of the 4 items needs its own shard (4 shards total for the full set). Each shard is fused with a cut onyx into an uncut zenyte (70 Crafting), cut (89 Crafting), combined with a gold bar + mould at a furnace (92-98 Crafting depending on slot), then enchanted with Lvl-7 Enchant (93 Magic) to finish.",
        requirements: "Monkey Madness II for Demonic Gorilla access; 89 Crafting to cut zenyte; 93 Magic to enchant",
        notes:
          "Torture = melee neck, Necklace of Anguish = ranged neck, Tormented bracelet = magic wrist, Ring of Suffering = universal defensive ring.",
        requires: [
          { type: "quest", questId: "monkey-madness-2" },
          { type: "skill", skill: "Crafting", level: 89 },
          { type: "skill", skill: "Magic", level: 93 },
        ],
      },
    ],
  },
  {
    id: "gauntlet-crystal",
    order: 4,
    name: "The Gauntlet",
    description: "Unlocks the best sustained ranged setup available before raids drops start rolling in.",
    items: [
      {
        id: "gc-weapon",
        slot: "weapon",
        item: "Bow of faerdhinen (c) - \"Bowfa\"",
        style: "ranged",
        source:
          "Made at a singing bowl from an enhanced crystal weapon seed (Gauntlet reward chest, ~1/2,000 regular or ~1/400 Corrupted - most farm Corrupted for the rate) plus 100 crystal shards, then corrupted for ~1,900-2,000 more shards",
        requirements: "Song of the Elves; Crystal shards from repeated Gauntlet completions",
        requires: [
          { type: "quest", questId: "song-of-the-elves" },
          { type: "other", label: "Repeat the Corrupted Gauntlet for Crystal shards to fund the bow/armour" },
        ],
      },
      {
        id: "gc-armor",
        slot: "body",
        item: "Crystal helm / body / legs",
        style: "ranged",
        source:
          "Crafted from crystal armour seeds + crystal shards at a singing bowl (6 seeds + 300 shards for a full set) - seeds/shards drop from both the regular Gauntlet and the Corrupted Gauntlet reward chests, degrades with use and is recharged with crystal shards",
        requirements: "Song of the Elves; 70 Defence + 50 Agility to equip",
        notes: "Crystal armour + Bowfa out-DPSes Masori when using the Bowfa specifically.",
        requires: [
          { type: "quest", questId: "song-of-the-elves" },
          { type: "skill", skill: "Defence", level: 70 },
          { type: "skill", skill: "Agility", level: 50 },
        ],
      },
    ],
  },
  {
    id: "pre-raid-bossing",
    order: 5,
    name: "Pre-Raid Bossing",
    description:
      "Barrows, the God Wars Dungeon, and the newer Varlamore bosses fill out mid-game gear while you build raid-readiness.",
    items: [
      {
        id: "prb-barrows",
        slot: "body",
        item: "Barrows sets (Dharok's / Verac's / Torag's / Guthan's / Ahrim's / Karil's)",
        style: "melee",
        source: "Barrows minigame (Morytania) - each of the 6 brothers drops pieces of their own set",
        notes: "Ahrim's pieces also useful as early magic armour; Karil's pieces useful as early ranged armour.",
      },
      {
        id: "prb-bandos",
        slot: "body",
        item: "Bandos armour (chestplate + tassets)",
        style: "melee",
        source: "General Graardor (God Wars Dungeon)",
        requirements:
          "70 Strength (unboostable) to enter Bandos' Stronghold within GWD; 40 Bandos-aligned kill-count or an Ecumenical key for Graardor's room; GWD itself needs Troll Stronghold ('Dad') or Easy Combat Achievements + 60 Strength/Agility",
        requires: [
          { type: "skill", skill: "Strength", level: 70 },
          { type: "other", label: "40 Bandos-aligned kill-count or an Ecumenical key for Graardor's room" },
        ],
      },
      {
        id: "prb-armadyl",
        slot: "body",
        item: "Armadyl armour (chestplate + chainskirt)",
        style: "ranged",
        source: "Kree'arra (God Wars Dungeon)",
        requirements:
          "70 Ranged to cross the chasm into the Armadyl encampment (plus a mithril grapple + any crossbow); 40 Armadyl-aligned kill-count or an Ecumenical key for Kree'arra's room",
        requires: [
          { type: "skill", skill: "Ranged", level: 70 },
          { type: "other", label: "40 Armadyl-aligned kill-count or an Ecumenical key for Kree'arra's room" },
        ],
      },
      {
        id: "prb-moons",
        slot: "body",
        item: "Moon armour sets - Blood (melee), Eclipse (ranged), Blue (magic-support)",
        style: "shared",
        source: "Moons of Peril (Neypotzli, beneath Cam Torum) - one Nagua boss drops one full set",
        requirements: "Perilous Moons quest completion required to access Neypotzli; 75+ combat recommended",
        requires: [{ type: "quest", questId: "perilous-moons" }],
      },
      {
        id: "prb-royal-titans",
        slot: "weapon",
        item: "Royal Titans drops (Eldric the Ice King / Branda the Fire Queen) - hybrid pouches, runes",
        style: "shared",
        source: "Eldric the Ice King (Asgarnian Ice Dungeon) and Branda the Fire Queen (beneath the Karamja Volcano)",
        notes:
          "More of a resource/GP boss for ironmen than a gear boss, but worth farming pre-raids. Despite the shared 'titan' theming, these are unrelated to the Varlamore storyline - no quest is required to access or fight them.",
      },
      {
        id: "prb-magic-armor",
        slot: "body",
        item: "Ancient staves (Staff of the Dead / Kodai-tier precursors)",
        style: "magic",
        source:
          "Staff of the Dead drops from K'ril Tsutsaroth, the Zamorak general/boss at God Wars Dungeon (~1/508) - not connected to the King Black Dragon; used until the Kodai wand from Chambers of Xeric",
        requirements:
          "75 Magic + 75 Attack to wield; GWD entry plus Zamorak's Fortress access (70 Hitpoints to cross the river) and 40 Zamorakian kill-count or an Ecumenical key",
        requires: [
          { type: "skill", skill: "Magic", level: 75 },
          { type: "skill", skill: "Attack", level: 75 },
        ],
      },
    ],
  },
  {
    id: "chambers-of-xeric",
    order: 6,
    name: "Chambers of Xeric (First Raid)",
    description:
      "The most ironman-friendly raid - it scales to your own DPS and forgives mistakes better than ToB/ToA. Most guides recommend doing this before the other two raids. No quest is required to enter.",
    items: [
      {
        id: "cox-magic-armor",
        slot: "body",
        item: "Ancestral robes (hat / top / bottom)",
        style: "magic",
        source: "Chambers of Xeric raid drop",
        requirements: "75 Magic, 65 Defence to wear",
        requires: [
          { type: "skill", skill: "Magic", level: 75 },
          { type: "skill", skill: "Defence", level: 65 },
        ],
        notes: "Highest magic-bonus robes in the game; BIS alongside Tumeken's Shadow.",
      },
      {
        id: "cox-magic-weapon",
        slot: "weapon",
        item: "Kodai wand",
        style: "magic",
        source: "Chambers of Xeric raid drop (Kodai insignia, applied to a purchasable master wand)",
        requirements: "80 Magic to wield",
        requires: [{ type: "skill", skill: "Magic", level: 80 }],
      },
      {
        id: "cox-ranged-weapon",
        slot: "weapon",
        item: "Twisted bow",
        style: "ranged",
        source: "Chambers of Xeric raid drop (very rare, ~1/thousands of points)",
        requirements: "85 Ranged to wield",
        requires: [{ type: "skill", skill: "Ranged", level: 85 }],
        notes: "BIS ranged weapon against high-magic targets; scales off target's magic level.",
      },
      {
        id: "cox-melee-weapon",
        slot: "weapon",
        item: "Dragon claws / Elder maul",
        style: "melee",
        source: "Chambers of Xeric raid drops",
        requirements: "60 Attack for Dragon claws; 75 Attack + 75 Strength for Elder maul",
      },
      {
        id: "cox-shield",
        slot: "shield",
        item: "Dinh's bulwark",
        style: "melee",
        source: "Chambers of Xeric raid drop",
        requirements: "75 Attack, 75 Defence to wield",
        requires: [
          { type: "skill", skill: "Attack", level: 75 },
          { type: "skill", skill: "Defence", level: 75 },
        ],
        notes: "Defensive tank weapon, big Strength-bonus special attack.",
      },
      {
        id: "cox-prayers",
        slot: "prayer",
        item: "Rigour + Augury prayers",
        style: "shared",
        source:
          "Chambers of Xeric points reward - dexterous/arcane prayer scrolls, tradeable, consumed on reading but the prayer unlock is permanent",
        requirements: "70 Defence, 74 Prayer for Rigour; 70 Defence, 77 Prayer for Augury",
        requires: [
          { type: "skill", skill: "Defence", level: 70 },
          { type: "skill", skill: "Prayer", level: 77 },
        ],
        notes: "Major ranged/magic damage prayer upgrade over Eagle Eye/Mystic Might - budget for these early.",
      },
    ],
  },
  {
    id: "theatre-of-blood",
    order: 7,
    name: "Theatre of Blood",
    description:
      "Melee's home raid - most of its uniques are melee-defining upgrades. Requires completing A Night at the Theatre to enter, on any mode.",
    items: [
      {
        id: "tob-weapon-large",
        slot: "weapon",
        item: "Scythe of Vitur",
        style: "melee",
        source: "Theatre of Blood raid drop",
        requirements: "80 Attack, 90 Strength to wield",
        requires: [
          { type: "quest", questId: "a-night-at-the-theatre" },
          { type: "skill", skill: "Attack", level: 80 },
          { type: "skill", skill: "Strength", level: 90 },
        ],
        notes: "BIS for large (3x3+) targets; degrades with charges, recharged with Vials of blood.",
      },
      {
        id: "tob-weapon-accurate",
        slot: "weapon",
        item: "Ghrazi rapier",
        style: "melee",
        source: "Theatre of Blood raid drop",
        requirements: "80 Attack to wield",
        requires: [
          { type: "quest", questId: "a-night-at-the-theatre" },
          { type: "skill", skill: "Attack", level: 80 },
        ],
        notes: "Best stab weapon before Osmumten's fang (ToA).",
      },
      {
        id: "tob-magic-weapon",
        slot: "weapon",
        item: "Sanguinesti staff",
        style: "magic",
        source: "Theatre of Blood raid drop",
        requirements: "82 Magic to wield",
        requires: [
          { type: "quest", questId: "a-night-at-the-theatre" },
          { type: "skill", skill: "Magic", level: 82 },
        ],
        notes: "Heals the wielder - strong sustained-DPS weapon, degrades and recharges with Vials of blood.",
      },
      {
        id: "tob-armor",
        slot: "body",
        item: "Justiciar armour (helm/chest/legs)",
        style: "melee",
        source: "Theatre of Blood raid drop",
        requirements: "75 Defence to wear",
        requires: [
          { type: "quest", questId: "a-night-at-the-theatre" },
          { type: "skill", skill: "Defence", level: 75 },
        ],
        notes: "Defensive tank set - damage reduction scales with your total defensive bonus.",
      },
      {
        id: "tob-defender",
        slot: "shield",
        item: "Avernic defender",
        style: "melee",
        source: "Theatre of Blood raid drop (Avernic defender hilt, combined with a Dragon defender)",
        requirements: "70 Attack, 70 Defence to wield",
        requires: [
          { type: "quest", questId: "a-night-at-the-theatre" },
          { type: "skill", skill: "Attack", level: 70 },
          { type: "skill", skill: "Defence", level: 70 },
        ],
      },
    ],
  },
  {
    id: "tombs-of-amascut",
    order: 8,
    name: "Tombs of Amascut",
    description:
      "The most recent of the three raids, and the source of current BIS ranged and magic gear. Requires completing Beneath Cursed Sands to enter.",
    items: [
      {
        id: "toa-melee-weapon",
        slot: "weapon",
        item: "Osmumten's fang",
        style: "melee",
        source: "Tombs of Amascut raid drop",
        requirements: "82 Attack to wield",
        requires: [
          { type: "quest", questId: "beneath-cursed-sands" },
          { type: "skill", skill: "Attack", level: 82 },
        ],
        notes: "Best stab weapon in the game; excellent general-purpose Slayer/bossing weapon.",
      },
      {
        id: "toa-ranged-armor",
        slot: "body",
        item: "Masori armour (mask/chest/chaps)",
        style: "ranged",
        source: "Tombs of Amascut raid drop",
        requirements: "80 Ranged, 30 Defence to wear (fortified variant raises Defence to 80)",
        requires: [
          { type: "quest", questId: "beneath-cursed-sands" },
          { type: "skill", skill: "Ranged", level: 80 },
          { type: "skill", skill: "Defence", level: 30 },
        ],
        notes: "BIS ranged armour outside a Bowfa+crystal setup.",
      },
      {
        id: "toa-magic-weapon",
        slot: "weapon",
        item: "Tumeken's shadow",
        style: "magic",
        source: "Tombs of Amascut raid drop",
        requirements: "85 Magic to wield",
        requires: [
          { type: "quest", questId: "beneath-cursed-sands" },
          { type: "skill", skill: "Magic", level: 85 },
        ],
        notes: "Triples worn magic-attack/damage bonuses - highest magic DPS in the game where usable.",
      },
      {
        id: "toa-magic-shield",
        slot: "shield",
        item: "Elidinis' ward",
        style: "magic",
        source: "Tombs of Amascut raid drop",
        requirements: "80 Magic, 80 Defence, 80 Prayer to wield",
        requires: [
          { type: "quest", questId: "beneath-cursed-sands" },
          { type: "skill", skill: "Magic", level: 80 },
          { type: "skill", skill: "Defence", level: 80 },
          { type: "skill", skill: "Prayer", level: 80 },
        ],
      },
      {
        id: "toa-ring",
        slot: "ring",
        item: "Lightbearer",
        style: "shared",
        source: "Tombs of Amascut raid drop",
        requires: [{ type: "quest", questId: "beneath-cursed-sands" }],
        notes: "Recharges special attack energy passively - great for spec-heavy melee/ranged weapons. No wear-level requirement of its own.",
      },
    ],
  },
  {
    id: "desert-treasure-2",
    order: 9,
    name: "Desert Treasure II Bosses",
    description:
      "Duke Sucellus, the Leviathan, Vardorvis, and the Whisperer each drop a unique ring component plus pieces of Virtus robes.",
    items: [
      {
        id: "dt2-magic-armor",
        slot: "body",
        item: "Virtus robes (mask/top/legs)",
        style: "magic",
        source: "Drops from all four DT2 bosses",
        requirements: "Desert Treasure II completion",
        notes: "BIS for powered staves and Ancient Magicks (e.g. paired with Shadow or an Ancient sceptre); Ancestral still edges it out for standard-spellbook damage%.",
        requires: [{ type: "quest", questId: "desert-treasure-2" }],
      },
      {
        id: "dt2-ring-melee",
        slot: "ring",
        item: "Ultor ring",
        style: "melee",
        source: "Vardorvis vestige + 90 Magic/80 Crafting (both boostable) to craft",
        notes: "Highest Strength bonus of any ring.",
        requires: [
          { type: "quest", questId: "desert-treasure-2" },
          { type: "skill", skill: "Magic", level: 90 },
          { type: "skill", skill: "Crafting", level: 80 },
        ],
      },
      {
        id: "dt2-ring-ranged",
        slot: "ring",
        item: "Venator ring",
        style: "ranged",
        source: "The Leviathan vestige + crafting",
        notes: "First ring to offer Ranged Strength.",
        requires: [
          { type: "quest", questId: "desert-treasure-2" },
          { type: "skill", skill: "Magic", level: 90 },
          { type: "skill", skill: "Crafting", level: 80 },
        ],
      },
      {
        id: "dt2-ring-magic",
        slot: "ring",
        item: "Magus ring",
        style: "magic",
        source: "Duke Sucellus vestige + crafting",
        notes: "First ring to offer Magic Damage.",
        requires: [
          { type: "quest", questId: "desert-treasure-2" },
          { type: "skill", skill: "Magic", level: 90 },
          { type: "skill", skill: "Crafting", level: 80 },
        ],
      },
      {
        id: "dt2-ring-hybrid",
        slot: "ring",
        item: "Bellator ring",
        style: "melee",
        source: "The Whisperer vestige + crafting",
        notes: "Slash-focused melee accuracy/strength ring.",
        requires: [
          { type: "quest", questId: "desert-treasure-2" },
          { type: "skill", skill: "Magic", level: 90 },
          { type: "skill", skill: "Crafting", level: 80 },
        ],
      },
      {
        id: "dt2-melee-weapon",
        slot: "weapon",
        item: "Soulreaper axe",
        style: "melee",
        source:
          "Assembled from 4 boss-specific components: Executioner's axe head (Vardorvis), Eye of the duke (Duke Sucellus), Siren's staff, and Leviathan's lure (Leviathan) - combined with ~2,000 blood runes",
        requirements: "80 Attack + 80 Strength to wield the assembled axe; kill all four DT2 bosses for the components",
        requires: [
          { type: "quest", questId: "desert-treasure-2" },
          { type: "skill", skill: "Attack", level: 80 },
          { type: "skill", skill: "Strength", level: 80 },
        ],
      },
    ],
  },
  {
    id: "slayer-bosses",
    order: 10,
    name: "Slayer Bosses",
    description: "Araxxor is the standout upgrade source from this tier for melee accounts; the Scorching bow is a strong ranged demonbane pickup.",
    items: [
      {
        id: "sb-weapon",
        slot: "weapon",
        item: "Noxious halberd",
        style: "melee",
        source: "Araxxor - assembled from noxious point + blade + pommel drops (each 1/200, no duplicates until the set completes)",
        requirements: "92 Slayer to fight Araxxor",
        requires: [{ type: "skill", skill: "Slayer", level: 92 }],
      },
      {
        id: "sb-neck",
        slot: "neck",
        item: "Amulet of rancour",
        style: "melee",
        source: "Combine Araxyte fang (Araxxor drop) with an Amulet of torture",
        requirements: "92 Slayer to fight Araxxor; 90 Hitpoints to wear",
        requires: [
          { type: "skill", skill: "Slayer", level: 92 },
          { type: "skill", skill: "Hitpoints", level: 90 },
        ],
      },
      {
        id: "sb-ranged-weapon",
        slot: "weapon",
        item: "Scorching bow",
        style: "ranged",
        source: "Craft: use a Tormented synapse (rare Tormented Demon drop, ~1/500) on a Magic longbow (u), after reading Duradel's notes",
        requirements: "While Guthix Sleeps completion; 74 Fletching (boostable)",
        notes: "Demonbane weapon - 30% accuracy/damage vs demons, stacking with a Slayer helm(i)/black mask(i) for 45% total on demon tasks and demon bosses (Tormented Demons, Yama).",
        requires: [
          { type: "quest", questId: "while-guthix-sleeps" },
          { type: "skill", skill: "Fletching", level: 74 },
          { type: "other", label: "Kill Tormented Demons (Ancient Guthixian Temple) for a Tormented synapse drop" },
        ],
      },
    ],
  },
  {
    id: "endgame",
    order: 11,
    name: "Endgame",
    description:
      "Nex, the Inferno, and the newest 2026 bosses (Yama, Doom of Mokhaiotl) round out true best-in-slot. Mostly optional flexes rather than requirements - late game is nonlinear.",
    items: [
      {
        id: "eg2-melee-armor",
        slot: "body",
        item: "Torva armour (full helm/platebody/platelegs)",
        style: "melee",
        source: "Nex (God Wars Dungeon, Ancient Prison) - drops in broken form, repaired via Bandosian components",
        notes: "Highest non-degrading Strength bonus of any armour.",
        requires: [{ type: "quest", questId: "the-frozen-door" }],
      },
      {
        id: "eg2-ranged-weapon",
        slot: "weapon",
        item: "Zaryte crossbow",
        style: "ranged",
        source:
          "Nex drops a nihil horn (~1/258); combine with an Armadyl crossbow + 250 nihil shards (also obtained in the Ancient Prison) to create the finished crossbow",
        notes: "Where Tbow accuracy falls off, and essential for enchanted-bolt-special content.",
        requires: [{ type: "quest", questId: "the-frozen-door" }],
      },
      {
        id: "eg2-ranged-gloves",
        slot: "hands",
        item: "Zaryte vambraces",
        style: "ranged",
        source: "Nex drop - ready to wear, no crafting step",
        requirements: "70 Ranged, 45 Defence to wear",
        notes: "Only gloves with a Ranged Strength bonus.",
        requires: [{ type: "quest", questId: "the-frozen-door" }],
      },
      {
        id: "eg2-cape",
        slot: "cape",
        item: "Infernal cape",
        style: "melee",
        source: "The Inferno (TzHaar solo minigame, harder successor to the Fight Caves)",
        notes: "BIS melee cape; a true solo skill-check more than a gear check.",
        requires: [{ type: "other", label: "Complete the Fight Caves for a Fire cape first (sacrificed to enter the Inferno)" }],
      },
      {
        id: "eg2-yama-armor",
        slot: "body",
        item: "Oathplate armour (helm/chest/legs)",
        style: "melee",
        source: "Yama drop, or smithed from Oathplate shards (Yama drop) + crushed Infernal shale (mined in the Chasm of Fire)",
        requirements: "A Kingdom Divided completion; 78 Defence to wear; 78 Mining/83 Smithing to self-smith (both boostable)",
        notes: "BIS slash armour - a strong alternative to Torva depending on attack style.",
        requires: [
          { type: "quest", questId: "a-kingdom-divided" },
          { type: "skill", skill: "Defence", level: 78 },
        ],
      },
      {
        id: "eg2-yama-support",
        slot: "weapon",
        item: "Soulflame horn",
        style: "shared",
        source: "Yama drop",
        notes: "Support special attack that boosts allies' next melee hit - group content utility.",
        requires: [{ type: "quest", questId: "a-kingdom-divided" }],
      },
      {
        id: "eg2-dom-boots",
        slot: "feet",
        item: "Avernic treads (max cape boots)",
        style: "shared",
        source:
          "Doom of Mokhaiotl drop (Ruins of Mokhaiotl, beneath the Tlati Rainforest, reached via the Tonali Cavern) - drops only from delve level 4 and deeper",
        requirements: "80 Defence, Strength, Ranged, and Magic to wear",
        notes: "Hybrid boots that overtook Primordial boots as the general-purpose choice.",
        requires: [{ type: "quest", questId: "the-final-dawn" }],
      },
    ],
  },
];

export const GEAR_PROGRESSION_BY_ID = Object.fromEntries(
  GEAR_PROGRESSION.flatMap((tier) => tier.items).map((item) => [item.id, item]),
);
