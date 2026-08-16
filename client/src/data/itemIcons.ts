/**
 * OSRS Wiki file names for each Gear Progression item's official icon, used
 * with lib/wikiIcon.ts. Most gear items map straight to "<item name>.png"
 * (the wiki's standard detail-image convention), but several entries in
 * gearProgression.ts describe a tier/alternative of items rather than one
 * exact wiki page (e.g. "Rune scimitar -> Dragon scimitar"), so those are
 * manually pointed at one representative icon (usually the best/last one)
 * instead. Could not be visually verified from this sandbox (wiki access
 * is blocked here) - see WikiIcon.tsx for the graceful-failure behaviour
 * if a name is ever off, and re-check any that look wrong once deployed
 * somewhere with real wiki access.
 */
export const ITEM_ICON: Record<string, string> = {
  "eg-melee-weapon": "Dragon scimitar.png",
  "eg-melee-armor": "Rune platebody.png",
  "eg-melee-shield": "Dragon square shield.png",
  "eg-ranged-weapon": "Rune crossbow.png",
  "eg-ranged-armor": "Red d'hide body.png",
  "eg-magic-weapon": "Iban's staff.png",
  "eg-magic-armor": "Mystic robe top.png",
  "eg-neck": "Amulet of glory.png",

  "fg-gloves": "Barrows gloves.png",
  "fg-torso": "Fighter torso.png",
  "fg-defender": "Dragon defender.png",
  "fg-cape-melee": "Fire cape.png",
  "fg-ring": "Berserker ring.png",
  "fg-ranged-armor": "Karil's leathertop.png",
  "fg-magic-neck": "Occult necklace.png",

  "prps-ranged-weapon": "Toxic blowpipe.png",
  "prps-magic-weapon": "Trident of the seas.png",
  "prps-jewelry": "Amulet of torture.png",

  "gc-weapon": "Bow of faerdhinen (c).png",
  "gc-armor": "Crystal body.png",

  "prb-barrows": "Dharok's platebody.png",
  "prb-bandos": "Bandos chestplate.png",
  "prb-armadyl": "Armadyl chestplate.png",
  "prb-moons": "Blood moon chestplate.png",
  "prb-magic-armor": "Staff of the dead.png",

  "cox-magic-armor": "Ancestral robe top.png",
  "cox-magic-weapon": "Kodai wand.png",
  "cox-ranged-weapon": "Twisted bow.png",
  "cox-melee-weapon": "Dragon claws.png",
  "cox-shield": "Dinh's bulwark.png",
  "cox-prayers": "Rigour.png",

  "tob-weapon-large": "Scythe of vitur.png",
  "tob-weapon-accurate": "Ghrazi rapier.png",
  "tob-magic-weapon": "Sanguinesti staff.png",
  "tob-armor": "Justiciar faceguard.png",
  "tob-defender": "Avernic defender.png",

  "toa-melee-weapon": "Osmumten's fang.png",
  "toa-ranged-armor": "Masori mask.png",
  "toa-magic-weapon": "Tumeken's shadow.png",
  "toa-magic-shield": "Elidinis' ward.png",
  "toa-ring": "Lightbearer.png",

  "dt2-magic-armor": "Virtus mask.png",
  "dt2-ring-melee": "Ultor ring.png",
  "dt2-ring-ranged": "Venator ring.png",
  "dt2-ring-magic": "Magus ring.png",
  "dt2-ring-hybrid": "Bellator ring.png",
  "dt2-melee-weapon": "Soulreaper axe.png",

  "sb-weapon": "Noxious halberd.png",
  "sb-neck": "Amulet of rancour.png",
  "sb-ranged-weapon": "Scorching bow.png",

  "eg2-melee-armor": "Torva full helm.png",
  "eg2-ranged-weapon": "Zaryte crossbow.png",
  "eg2-ranged-gloves": "Zaryte vambraces.png",
  "eg2-cape": "Infernal cape.png",
  "eg2-yama-armor": "Oathplate helm.png",
  "eg2-yama-support": "Soulflame horn.png",
  "eg2-dom-boots": "Avernic treads.png",
};
