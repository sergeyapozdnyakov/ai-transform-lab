# syntax=docker/dockerfile:1
# Deploy-only. Builds the Node SSR target and runs it under Node 22.
# Two stages: bun builds (fast installs), node:22 runs (matches verified runtime).

FROM oven/bun:1.3 AS build
WORKDIR /app
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun --bun run vite build --config vite.config.node.ts

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/server-node.mjs ./server-node.mjs
EXPOSE 3000
CMD ["node", "server-node.mjs"]
