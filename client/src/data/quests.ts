import type { Requirement } from "../types/requirement";

export interface Quest {
  id: string;
  name: string;
  /** Direct prerequisites we've mapped. Quests referenced here that aren't
   * themselves keys in this registry are treated as leaf nodes - the
   * resolver (lib/actionPlan.ts) will still add them as a required step,
   * it just won't expand further into their own prerequisites. */
  requires?: Requirement[];
  notes?: string;
}

/**
 * Prerequisite chains for the quests referenced by gear in
 * data/gearProgression.ts. This is NOT a full graph of all ~200 OSRS
 * quests - only chains relevant to gear currently tracked here are mapped
 * in depth. Quests mentioned as prerequisites that don't have their own
 * entry below are still added to a generated plan as a required step, just
 * without further expansion - that's a deliberate scope boundary, not a
 * bug (see README).
 *
 * Verified via targeted research (August 2026) after a user-reported error
 * on the Occult necklace revealed the original data (compiled from
 * general/training knowledge, not a live wiki fetch - this sandbox's
 * network policy blocks the wiki directly) contained real mistakes, not
 * just gaps. Every chain below was re-checked individually; anything not
 * expanded further (a plain leaf entry) either has no mapped chain in
 * scope, or its own chain wasn't needed to unblock the gear items that
 * reference it.
 */
export const QUESTS: Record<string, Quest> = {
  "cooks-assistant": {
    id: "cooks-assistant",
    name: "Cook's Assistant",
  },
  "desert-treasure-1": {
    id: "desert-treasure-1",
    name: "Desert Treasure I",
    requires: [
      { type: "quest", questId: "the-dig-site" },
      { type: "quest", questId: "temple-of-ikov" },
      { type: "quest", questId: "the-tourist-trap" },
      { type: "quest", questId: "troll-stronghold" },
      { type: "quest", questId: "priest-in-peril" },
      { type: "quest", questId: "waterfall-quest" },
      { type: "skill", skill: "Thieving", level: 53 },
      { type: "skill", skill: "Magic", level: 50 },
      { type: "skill", skill: "Firemaking", level: 50 },
      { type: "skill", skill: "Slayer", level: 10 },
    ],
    notes: "Unlocks the Ancient Magicks spellbook. 10 Slayer can be substituted with the gas mask from Plague City.",
  },
  "horror-from-the-deep": {
    id: "horror-from-the-deep",
    name: "Horror from the Deep",
  },
  "recipe-for-disaster": {
    id: "recipe-for-disaster",
    name: "Recipe for Disaster",
    requires: [
      { type: "quest", questId: "cooks-assistant" },
      { type: "quest", questId: "desert-treasure-1" },
      { type: "quest", questId: "horror-from-the-deep" },
      { type: "skill", skill: "Cooking", level: 10 },
      { type: "other", label: "Complete all 8 Recipe for Disaster subquests (freeing each NPC)" },
      { type: "other", label: "175 total Quest Points" },
    ],
    notes:
      "Unlocks buying Barrows gloves (130,000gp, 104,000gp with the Elite Lumbridge & Draynor Diary) from the Culinaromancer's Chest in the Lumbridge Castle cellar. The final boss (Culinaromancer) can't be fought with Prayer active.",
  },
  "eyes-of-glouphrie": { id: "eyes-of-glouphrie", name: "The Eyes of Glouphrie" },
  "enlightened-journey": { id: "enlightened-journey", name: "Enlightened Journey" },
  "troll-stronghold": {
    id: "troll-stronghold",
    name: "Troll Stronghold",
    requires: [{ type: "quest", questId: "death-plateau" }],
  },
  watchtower: { id: "watchtower", name: "Watchtower" },
  "monkey-madness-1": { id: "monkey-madness-1", name: "Monkey Madness I" },
  "monkey-madness-2": {
    id: "monkey-madness-2",
    name: "Monkey Madness II",
    requires: [
      { type: "quest", questId: "eyes-of-glouphrie" },
      { type: "quest", questId: "recipe-for-disaster" },
      { type: "quest", questId: "enlightened-journey" },
      { type: "quest", questId: "troll-stronghold" },
      { type: "quest", questId: "watchtower" },
      { type: "quest", questId: "monkey-madness-1" },
      { type: "skill", skill: "Agility", level: 55 },
      { type: "skill", skill: "Thieving", level: 55 },
      { type: "skill", skill: "Hunter", level: 60 },
      { type: "skill", skill: "Slayer", level: 69 },
      { type: "skill", skill: "Crafting", level: 70 },
      { type: "skill", skill: "Firemaking", level: 60 },
      { type: "other", label: "Balloon Transport to Gnome Stronghold opened" },
    ],
    notes: "Unlocks Demonic Gorillas, the source of Zenyte shards.",
  },
  "dragon-slayer-1": {
    id: "dragon-slayer-1",
    name: "Dragon Slayer I",
    notes:
      "Has its own short prerequisite chain not mapped here - check the wiki. Required to wear a rune platebody and green d'hide body (among other mid-level dragonhide/rune-tier gear gates).",
  },
  "legends-quest": {
    id: "legends-quest",
    name: "Legends' Quest",
    notes:
      "Has its own substantial prerequisite chain (skills + several quests) not mapped here - check the wiki. Required to wield a Dragon square shield.",
  },
  "plague-city": { id: "plague-city", name: "Plague City" },
  biohazard: { id: "biohazard", name: "Biohazard" },
  "underground-pass": { id: "underground-pass", name: "Underground Pass" },
  regicide: { id: "regicide", name: "Regicide" },
  "roving-elves": { id: "roving-elves", name: "Roving Elves" },
  "mournings-end-1": {
    id: "mournings-end-1",
    name: "Mourning's End Part I",
    requires: [
      { type: "quest", questId: "roving-elves" },
      { type: "quest", questId: "underground-pass" },
      { type: "quest", questId: "regicide" },
    ],
  },
  "mournings-end-2": {
    id: "mournings-end-2",
    name: "Mourning's End Part II",
    requires: [
      { type: "quest", questId: "mournings-end-1" },
      { type: "quest", questId: "plague-city" },
      { type: "quest", questId: "biohazard" },
    ],
  },
  "making-history": {
    id: "making-history",
    name: "Making History",
    notes: "Has its own short prerequisite chain not mapped here - check the wiki.",
  },
  "song-of-the-elves": {
    id: "song-of-the-elves",
    name: "Song of the Elves",
    requires: [
      { type: "quest", questId: "mournings-end-2" },
      { type: "quest", questId: "making-history" },
      { type: "skill", skill: "Agility", level: 70 },
      { type: "skill", skill: "Construction", level: 70 },
      { type: "skill", skill: "Farming", level: 70 },
      { type: "skill", skill: "Herblore", level: 70 },
      { type: "skill", skill: "Hunter", level: 70 },
      { type: "skill", skill: "Mining", level: 70 },
      { type: "skill", skill: "Smithing", level: 70 },
      { type: "skill", skill: "Woodcutting", level: 70 },
    ],
    notes: "Unlocks Prifddinas, and with it the Corrupted Gauntlet (Bowfa/crystal armour).",
  },
  "the-dig-site": { id: "the-dig-site", name: "The Dig Site" },
  "temple-of-ikov": { id: "temple-of-ikov", name: "Temple of Ikov" },
  "the-tourist-trap": { id: "the-tourist-trap", name: "The Tourist Trap" },
  "death-plateau": { id: "death-plateau", name: "Death Plateau" },
  "priest-in-peril": { id: "priest-in-peril", name: "Priest in Peril" },
  "waterfall-quest": { id: "waterfall-quest", name: "Waterfall Quest" },
  "secrets-of-the-north": { id: "secrets-of-the-north", name: "Secrets of the North" },
  "making-friends-with-my-arm": { id: "making-friends-with-my-arm", name: "Making Friends with My Arm" },
  "enakhras-lament": { id: "enakhras-lament", name: "Enakhra's Lament" },
  "temple-of-the-eye": { id: "temple-of-the-eye", name: "Temple of the Eye" },
  "the-garden-of-death": { id: "the-garden-of-death", name: "The Garden of Death" },
  "his-faithful-servants": { id: "his-faithful-servants", name: "His Faithful Servants" },
  "desert-treasure-2": {
    id: "desert-treasure-2",
    name: "Desert Treasure II - The Fallen Empire",
    requires: [
      { type: "quest", questId: "desert-treasure-1" },
      { type: "quest", questId: "secrets-of-the-north" },
      { type: "quest", questId: "making-friends-with-my-arm" },
      { type: "quest", questId: "enakhras-lament" },
      { type: "quest", questId: "temple-of-the-eye" },
      { type: "quest", questId: "the-garden-of-death" },
      { type: "quest", questId: "below-ice-mountain" },
      { type: "quest", questId: "his-faithful-servants" },
      { type: "skill", skill: "Firemaking", level: 75 },
      { type: "skill", skill: "Magic", level: 75 },
      { type: "skill", skill: "Thieving", level: 70 },
      { type: "skill", skill: "Herblore", level: 62 },
      { type: "skill", skill: "Runecraft", level: 60 },
      { type: "skill", skill: "Construction", level: 60 },
    ],
    notes:
      "Unlocks Duke Sucellus, the Leviathan, Vardorvis, and the Whisperer - Virtus robes and the four DT2 rings. Its own direct prerequisites are Desert Treasure I, Secrets of the North, Making Friends with My Arm, Enakhra's Lament, Temple of the Eye, The Garden of Death, Below Ice Mountain, and His Faithful Servants - not a copy of Desert Treasure I's chain (those quests are indirect, via Desert Treasure I itself, which is already listed).",
  },
  "heart-of-darkness": { id: "heart-of-darkness", name: "The Heart of Darkness" },
  "perilous-moons": { id: "perilous-moons", name: "Perilous Moons" },
  "the-final-dawn": {
    id: "the-final-dawn",
    name: "The Final Dawn",
    requires: [
      { type: "quest", questId: "heart-of-darkness" },
      { type: "quest", questId: "perilous-moons" },
      { type: "skill", skill: "Thieving", level: 66 },
      { type: "skill", skill: "Fletching", level: 52 },
      { type: "skill", skill: "Runecraft", level: 52 },
    ],
    notes:
      "Final quest in the Twilight Emissaries series (Children of the Sun -> Twilight's Promise -> The Heart of Darkness -> The Final Dawn) - unlocks Doom of Mokhaiotl.",
  },
  "while-guthix-sleeps": {
    id: "while-guthix-sleeps",
    name: "While Guthix Sleeps",
    requires: [
      { type: "quest", questId: "defender-of-varrock" },
      { type: "quest", questId: "shield-of-arrav" },
      { type: "quest", questId: "temple-of-ikov" },
      { type: "quest", questId: "below-ice-mountain" },
      { type: "quest", questId: "family-crest" },
      { type: "quest", questId: "what-lies-below" },
      { type: "quest", questId: "romeo-and-juliet" },
      { type: "quest", questId: "demon-slayer" },
      { type: "quest", questId: "path-of-glouphrie" },
      { type: "quest", questId: "eyes-of-glouphrie" },
      { type: "quest", questId: "the-grand-tree" },
      { type: "quest", questId: "waterfall-quest" },
      { type: "quest", questId: "tree-gnome-village" },
      { type: "quest", questId: "fight-arena" },
      { type: "quest", questId: "dream-mentor" },
      { type: "quest", questId: "lunar-diplomacy" },
      { type: "quest", questId: "fremennik-trials" },
      { type: "quest", questId: "lost-city" },
      { type: "quest", questId: "rune-mysteries" },
      { type: "quest", questId: "shilo-village" },
      { type: "quest", questId: "jungle-potion" },
      { type: "quest", questId: "hand-in-the-sand" },
      { type: "quest", questId: "wanted" },
      { type: "quest", questId: "recruitment-drive" },
      { type: "quest", questId: "black-knights-fortress" },
      { type: "quest", questId: "druidic-ritual" },
      { type: "quest", questId: "the-lost-tribe" },
      { type: "quest", questId: "goblin-diplomacy" },
      { type: "skill", skill: "Thieving", level: 72 },
      { type: "skill", skill: "Magic", level: 67 },
      { type: "skill", skill: "Agility", level: 66 },
      { type: "skill", skill: "Farming", level: 65 },
      { type: "skill", skill: "Herblore", level: 65 },
      { type: "skill", skill: "Hunter", level: 62 },
      { type: "skill", skill: "Defence", level: 40 },
      { type: "other", label: "180 total Quest Points" },
      {
        type: "other",
        label: "Warriors' Guild entry (Attack + Strength combined 130 unboosted, or 99 in either)",
      },
    ],
    notes:
      "One of the most requirement-heavy quests in the game (28 prerequisite quests). Unlocks the Ancient Guthixian Temple and Tormented Demons. The 28 prerequisite quests below are added as individual steps but not expanded further - see README.",
  },
  "defender-of-varrock": { id: "defender-of-varrock", name: "Defender of Varrock" },
  "shield-of-arrav": { id: "shield-of-arrav", name: "Shield of Arrav" },
  "below-ice-mountain": { id: "below-ice-mountain", name: "Below Ice Mountain" },
  "family-crest": { id: "family-crest", name: "Family Crest" },
  "what-lies-below": { id: "what-lies-below", name: "What Lies Below" },
  "romeo-and-juliet": { id: "romeo-and-juliet", name: "Romeo & Juliet" },
  "demon-slayer": { id: "demon-slayer", name: "Demon Slayer" },
  "path-of-glouphrie": { id: "path-of-glouphrie", name: "The Path of Glouphrie" },
  "the-grand-tree": { id: "the-grand-tree", name: "The Grand Tree" },
  "tree-gnome-village": { id: "tree-gnome-village", name: "Tree Gnome Village" },
  "fight-arena": { id: "fight-arena", name: "Fight Arena" },
  "dream-mentor": { id: "dream-mentor", name: "Dream Mentor" },
  "lunar-diplomacy": { id: "lunar-diplomacy", name: "Lunar Diplomacy" },
  "fremennik-trials": { id: "fremennik-trials", name: "The Fremennik Trials" },
  "lost-city": { id: "lost-city", name: "Lost City" },
  "rune-mysteries": { id: "rune-mysteries", name: "Rune Mysteries" },
  "shilo-village": { id: "shilo-village", name: "Shilo Village" },
  "jungle-potion": { id: "jungle-potion", name: "Jungle Potion" },
  "hand-in-the-sand": { id: "hand-in-the-sand", name: "The Hand in the Sand" },
  wanted: { id: "wanted", name: "Wanted!" },
  "recruitment-drive": { id: "recruitment-drive", name: "Recruitment Drive" },
  "black-knights-fortress": { id: "black-knights-fortress", name: "Black Knights' Fortress" },
  "druidic-ritual": { id: "druidic-ritual", name: "Druidic Ritual" },
  "the-lost-tribe": { id: "the-lost-tribe", name: "The Lost Tribe" },
  "goblin-diplomacy": { id: "goblin-diplomacy", name: "Goblin Diplomacy" },
  "the-frozen-door": {
    id: "the-frozen-door",
    name: "The Frozen Door",
    requires: [
      { type: "quest", questId: "desert-treasure-1" },
      { type: "skill", skill: "Hitpoints", level: 70 },
      { type: "skill", skill: "Ranged", level: 70 },
      { type: "skill", skill: "Strength", level: 70 },
      { type: "skill", skill: "Agility", level: 70 },
      {
        type: "other",
        label: "Collect frozen key pieces from the GWD generals/bodyguards (Graardor, K'ril, Zilyana, Kree'arra)",
      },
    ],
    notes: "Miniquest that unlocks Nex's Ancient Prison.",
  },
  "client-of-kourend": { id: "client-of-kourend", name: "Client of Kourend" },
  "x-marks-the-spot": { id: "x-marks-the-spot", name: "X Marks the Spot" },
  "the-depths-of-despair": { id: "the-depths-of-despair", name: "The Depths of Despair" },
  "the-queen-of-thieves": { id: "the-queen-of-thieves", name: "The Queen of Thieves" },
  "the-ascent-of-arceuus": { id: "the-ascent-of-arceuus", name: "The Ascent of Arceuus" },
  "the-forsaken-tower": { id: "the-forsaken-tower", name: "The Forsaken Tower" },
  "tale-of-the-righteous": { id: "tale-of-the-righteous", name: "Tale of the Righteous" },
  "architectural-alliance": { id: "architectural-alliance", name: "Architectural Alliance" },
  "a-kingdom-divided": {
    id: "a-kingdom-divided",
    name: "A Kingdom Divided",
    requires: [
      { type: "quest", questId: "client-of-kourend" },
      { type: "quest", questId: "x-marks-the-spot" },
      { type: "quest", questId: "the-depths-of-despair" },
      { type: "quest", questId: "the-queen-of-thieves" },
      { type: "quest", questId: "the-ascent-of-arceuus" },
      { type: "quest", questId: "the-forsaken-tower" },
      { type: "quest", questId: "tale-of-the-righteous" },
      { type: "quest", questId: "architectural-alliance" },
      { type: "skill", skill: "Agility", level: 54 },
      { type: "skill", skill: "Thieving", level: 52 },
      { type: "skill", skill: "Woodcutting", level: 52 },
      { type: "skill", skill: "Herblore", level: 50 },
      { type: "skill", skill: "Mining", level: 42 },
      { type: "skill", skill: "Crafting", level: 38 },
      { type: "skill", skill: "Magic", level: 35 },
    ],
    notes:
      "Part of the Kourend & Kebos storyline. Unlocks the Chasm of Fire and, afterward, Yama.",
  },
  "children-of-the-sun": {
    id: "children-of-the-sun",
    name: "Children of the Sun",
    notes:
      "Opening quest of the Twilight Emissaries (Varlamore) storyline, with no prerequisites of its own - unlocks Civitas illa Fortis. Despite the thematic tie-in, it does NOT unlock the Royal Titans (Eldric the Ice King / Branda the Fire Queen) - they're unrelated bosses with no quest requirement at all, in the Asgarnian Ice Dungeon and beneath the Karamja Volcano respectively.",
  },
  "in-search-of-the-myreque": { id: "in-search-of-the-myreque", name: "In Search of the Myreque" },
  "in-aid-of-the-myreque": { id: "in-aid-of-the-myreque", name: "In Aid of the Myreque" },
  "the-restless-ghost": { id: "the-restless-ghost", name: "The Restless Ghost" },
  "nature-spirit": { id: "nature-spirit", name: "Nature Spirit" },
  "darkness-of-hallowvale": { id: "darkness-of-hallowvale", name: "Darkness of Hallowvale" },
  "a-taste-of-hope": { id: "a-taste-of-hope", name: "A Taste of Hope" },
  "a-night-at-the-theatre": {
    id: "a-night-at-the-theatre",
    name: "A Night at the Theatre",
    requires: [
      { type: "quest", questId: "priest-in-peril" },
      { type: "quest", questId: "in-search-of-the-myreque" },
      { type: "quest", questId: "in-aid-of-the-myreque" },
      { type: "quest", questId: "the-restless-ghost" },
      { type: "quest", questId: "nature-spirit" },
      { type: "quest", questId: "darkness-of-hallowvale" },
      { type: "quest", questId: "a-taste-of-hope" },
    ],
    notes: "Required to enter Theatre of Blood at all, on any mode.",
  },
  "beneath-cursed-sands": {
    id: "beneath-cursed-sands",
    name: "Beneath Cursed Sands",
    notes:
      "4th quest in the Desert quest series - has its own prerequisite chain not mapped here. Required to unlock Tombs of Amascut.",
  },
};
