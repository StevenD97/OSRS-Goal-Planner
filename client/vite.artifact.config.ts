import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Static previews (e.g. Claude Artifacts) run under a strict CSP that blocks
// the external Google Fonts <link> in index.html, silently falling back to
// system fonts. Swap it for the same fonts self-hosted as base64 data: URIs
// (client/src/styles/embedded-fonts.css, latin subset only - regenerate via
// `node scripts/fetch-embedded-fonts.mjs` if the font stack ever changes) so
// the artifact build renders the real typography with zero network calls.
function inlineFonts(): Plugin {
  return {
    name: "inline-fonts",
    transformIndexHtml(html) {
      const cssPath = fileURLToPath(
        new URL("./src/styles/embedded-fonts.css", import.meta.url),
      );
      const fontFaceCss = readFileSync(cssPath, "utf8");
      return html
        .replace(/<link rel="preconnect"[^>]*fonts\.googleapis[^>]*>\s*/, "")
        .replace(/<link rel="preconnect"[^>]*fonts\.gstatic[^>]*>\s*/, "")
        .replace(
          /<link[^>]*href="https:\/\/fonts\.googleapis\.com\/css2[^>]*>/,
          `<style>\n${fontFaceCss}\n</style>`,
        );
    },
  };
}

// One-off config for producing a single self-contained HTML file (used for
// static previews, e.g. publishing to claude.ai artifacts). Not used by the
// normal dev/build scripts - see vite.config.ts for that.
export default defineConfig({
  plugins: [react(), tailwindcss(), inlineFonts(), viteSingleFile()],
  build: {
    outDir: "dist-artifact",
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
  },
});
