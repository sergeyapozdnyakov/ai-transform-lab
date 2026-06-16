// Deploy-only Node adapter: serves the TanStack Start SSR fetch-handler over
// node:http and serves static client assets from dist/client.
// Build first: vite build --config vite.config.node.ts
// Run: node server-node.mjs   (PORT, HOST env optional)
import { createServer } from "node:http";
import { Readable } from "node:stream";
import { stat, readFile } from "node:fs/promises";
import { join, normalize, extname } from "node:path";
import { fileURLToPath } from "node:url";
import handler from "./dist/server/server.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const CLIENT_DIR = join(__dirname, "dist", "client");
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const CRM_CONTACT_ENDPOINT =
  process.env.CRM_CONTACT_ENDPOINT || "http://crm:3000/api/leads/contact";

const MIME = {
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".wasm": "application/wasm",
  ".map": "application/json",
  ".webmanifest": "application/manifest+json",
};

async function resolveStatic(pathname) {
  const decoded = decodeURIComponent(pathname);
  const safe = normalize(decoded).replace(/^(\.\.([/\\]|$))+/, "");
  const filePath = join(CLIENT_DIR, safe);
  if (
    filePath !== CLIENT_DIR &&
    !filePath.startsWith(CLIENT_DIR + (process.platform === "win32" ? "\\" : "/"))
  ) {
    return null;
  }
  try {
    const s = await stat(filePath);
    if (s.isFile()) return filePath;
  } catch {
    /* not a static file */
  }
  return null;
}

function toWebRequest(req) {
  const url = `http://${req.headers.host || "localhost"}${req.url}`;
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (Array.isArray(v)) v.forEach((x) => headers.append(k, x));
    else if (v != null) headers.set(k, v);
  }
  const method = req.method || "GET";
  const hasBody = method !== "GET" && method !== "HEAD";
  return new Request(url, {
    method,
    headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
  });
}

async function readJsonBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 20_000) throw new Error("Payload too large");
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

function writeJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

async function handleContactApi(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400",
    });
    res.end();
    return true;
  }

  if (req.method !== "POST") {
    writeJson(res, 405, { error: "Method not allowed" });
    return true;
  }

  const payload = await readJsonBody(req);
  const crmResponse = await fetch(CRM_CONTACT_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.CRM_INTAKE_SECRET ? { "x-intake-secret": process.env.CRM_INTAKE_SECRET } : {}),
    },
    body: JSON.stringify(payload),
  });

  const text = await crmResponse.text();
  res.writeHead(crmResponse.status, {
    "content-type": crmResponse.headers.get("content-type") || "application/json; charset=utf-8",
  });
  res.end(text);
  return true;
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/api/contact") {
      await handleContactApi(req, res);
      return;
    }

    if (req.method === "GET" || req.method === "HEAD") {
      const file = await resolveStatic(url.pathname);
      if (file) {
        const type = MIME[extname(file).toLowerCase()] || "application/octet-stream";
        const immutable = url.pathname.startsWith("/assets/");
        res.writeHead(200, {
          "content-type": type,
          "cache-control": immutable
            ? "public, max-age=31536000, immutable"
            : "public, max-age=3600",
        });
        res.end(req.method === "HEAD" ? undefined : await readFile(file));
        return;
      }
    }

    const webRes = await handler.fetch(toWebRequest(req), process.env, {});
    res.statusCode = webRes.status;
    webRes.headers.forEach((value, key) => res.setHeader(key, value));
    if (webRes.body) {
      Readable.fromWeb(webRes.body).pipe(res);
    } else {
      res.end(await webRes.text());
    }
  } catch (err) {
    console.error("[server-node] request failed:", err);
    if (!res.headersSent) res.writeHead(500, { "content-type": "text/html; charset=utf-8" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[server-node] SSR listening on http://${HOST}:${PORT}`);
});
