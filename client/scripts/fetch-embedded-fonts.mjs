// Regenerates src/styles/embedded-fonts.css: fetches the same Google Fonts
// stack used in index.html, keeps only the plain "latin" subset (this app is
// English-only - the other subsets - latin-ext/cyrillic/vietnamese/etc. -
// would multiply the payload for no benefit), and inlines each woff2 as a
// base64 data: URI so vite.artifact.config.ts can embed real typography into
// the artifact build without any network access at build *or* view time.
// Run manually and commit the result whenever the font stack changes:
//   node scripts/fetch-embedded-fonts.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const GOOGLE_FONTS_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap";

// A desktop UA is required - Google Fonts serves legacy formats to unknown/bot UAs.
const DESKTOP_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const css = await fetch(GOOGLE_FONTS_CSS_URL, { headers: { "User-Agent": DESKTOP_UA } }).then(
  (res) => res.text(),
);

const blocks = css.split(/\/\*\s*(\S+)\s*\*\//).slice(1);
const faces = [];
for (let i = 0; i < blocks.length; i += 2) {
  const label = blocks[i];
  const body = blocks[i + 1];
  if (label !== "latin") continue;
  const family = body.match(/font-family:\s*'([^']+)'/)?.[1];
  const weight = body.match(/font-weight:\s*([\d\s]+);/)?.[1]?.trim();
  const style = body.match(/font-style:\s*(\w+);/)?.[1];
  const url = body.match(/url\(([^)]+)\)/)?.[1];
  if (!family || !url) continue;
  faces.push({ family, weight, style, url });
}

if (faces.length === 0) {
  throw new Error("No latin-subset @font-face blocks found - Google Fonts CSS shape may have changed");
}

console.log(`Embedding ${faces.length} latin font faces:`, faces.map((f) => `${f.family} ${f.weight}`));

const results = await Promise.all(
  faces.map(async (f) => {
    const res = await fetch(f.url);
    const buf = Buffer.from(await res.arrayBuffer());
    return { ...f, base64: buf.toString("base64"), bytes: buf.length };
  }),
);

console.log(
  `Total payload: ${(results.reduce((sum, f) => sum + f.bytes, 0) / 1024).toFixed(0)} KB raw`,
);

const fontFaceCss = results
  .map(
    (f) => `@font-face {
  font-family: '${f.family}';
  font-style: ${f.style};
  font-weight: ${f.weight};
  font-display: swap;
  src: url(data:font/woff2;base64,${f.base64}) format('woff2');
}`,
  )
  .join("\n");

const outPath = fileURLToPath(new URL("../src/styles/embedded-fonts.css", import.meta.url));
writeFileSync(outPath, fontFaceCss);
console.log("Wrote", outPath);
