// Deploy-only config: builds a Node server target instead of Cloudflare Workers.
// Lovable manages vite.config.ts; this separate file survives Lovable regen.
// Build with: vite build --config vite.config.node.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  vite: {
    ssr: { noExternal: true },
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
