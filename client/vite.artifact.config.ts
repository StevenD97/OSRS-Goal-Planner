import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// One-off config for producing a single self-contained HTML file (used for
// static previews, e.g. publishing to claude.ai artifacts). Not used by the
// normal dev/build scripts - see vite.config.ts for that.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    outDir: "dist-artifact",
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
  },
});
