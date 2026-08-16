/**
 * OSRS Wiki file-path helper. Special:FilePath redirects straight to a
 * file's real (hashed) URL by title, so this needs no API call and no CORS
 * handling - it's just an <img src>. Filenames follow the wiki's own
 * article-title convention (spaces or underscores both work; MediaWiki
 * auto-capitalizes only the first letter).
 *
 * This sandbox's network policy blocks oldschool.runescape.wiki directly,
 * so these URLs could not be visually verified here - the intended
 * filenames were curated from OSRS item/skill naming knowledge, not a live
 * fetch. Every <img> using this should have an onError fallback (see
 * WikiIcon.tsx) so a wrong guess just quietly omits the icon instead of
 * showing a broken image.
 */
export function wikiFilePath(filename: string): string {
  return `https://oldschool.runescape.wiki/w/Special:FilePath/${encodeURIComponent(
    filename.replace(/ /g, "_"),
  )}`;
}

export const QUEST_POINT_ICON = "Quest point icon.png";
