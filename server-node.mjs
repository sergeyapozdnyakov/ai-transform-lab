// Deploy-only Node adapter: serves the TanStack Start SSR handler and static client assets.
import { createServer } from "node:http";
import { Readable } from "node:stream";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import handler from "./dist/server/server.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const CLIENT_DIR = join(__dirname, "dist", "client");
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const CRM_CONTACT_ENDPOINT =
  process.env.CRM_CONTACT_ENDPOINT || "http://crm:3000/api/leads/contact";
const CONTACT_FALLBACK_EMAIL = process.env.CONTACT_FALLBACK_EMAIL || "ai@pozdnyakov.io";
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const requestLog = new Map();

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
    const value = await stat(filePath);
    if (value.isFile()) return filePath;
  } catch {
    // The request may be an application route.
  }
  return null;
}

function toWebRequest(request) {
  const url = `http://${request.headers.host || "localhost"}${request.url}`;
  const headers = new Headers();
  for (const [key, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) value.forEach((item) => headers.append(key, item));
    else if (value != null) headers.set(key, value);
  }
  const method = request.method || "GET";
  const hasBody = method !== "GET" && method !== "HEAD";
  return new Request(url, {
    method,
    headers,
    body: hasBody ? Readable.toWeb(request) : undefined,
    duplex: hasBody ? "half" : undefined,
  });
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 20_000) throw new Error("Payload too large");
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

function writeJson(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(body));
}

function clientKey(request) {
  const forwarded = String(request.headers["x-forwarded-for"] || "")
    .split(",")[0]
    .trim();
  return forwarded || request.socket.remoteAddress || "unknown";
}

function isRateLimited(key) {
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  requestLog.set(key, recent);
  return false;
}

function limitedString(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function safeUtm(value) {
  if (!value || Array.isArray(value) || typeof value !== "object") return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, item]) => key.toLowerCase().startsWith("utm_") && typeof item === "string")
      .slice(0, 8)
      .map(([key, item]) => [key.slice(0, 64), item.trim().slice(0, 200)]),
  );
}

function validateContactPayload(input) {
  if (!input || Array.isArray(input) || typeof input !== "object") {
    return { error: "Invalid request body" };
  }

  const payload = {
    name: limitedString(input.name, 200),
    company: limitedString(input.company, 300),
    contact: limitedString(input.email, 255),
    team: limitedString(input.team, 500),
    desc: limitedString(input.desc, 2000),
    situation: limitedString(input.situation, 300),
    service: limitedString(input.service, 80),
    source: limitedString(input.source, 80),
    language: limitedString(input.language, 8),
    pageUrl: limitedString(input.pageUrl, 1000),
    websiteFax: limitedString(input.websiteFax, 200),
    utm: safeUtm(input.utm),
  };

  if (payload.websiteFax) return { spam: true };
  if (!payload.name || !payload.company || !payload.team || !payload.desc || !payload.situation) {
    return { error: "Missing required fields" };
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.contact);
  const isTelegram = /^@?[a-zA-Z0-9_]{5,}$/.test(payload.contact);
  if (!isEmail && !isTelegram) return { error: "Invalid contact" };

  const contactNote = isTelegram ? `Telegram: ${payload.contact.replace(/^@?/, "@")}\n` : "";
  return {
    payload: {
      name: payload.name,
      company: payload.company,
      email: isEmail ? payload.contact : CONTACT_FALLBACK_EMAIL,
      team: payload.team,
      desc: [
        contactNote,
        payload.situation ? `Situation: ${payload.situation}` : "",
        payload.service ? `Service: ${payload.service}` : "",
        payload.source ? `Source: ${payload.source}` : "",
        "",
        payload.desc,
      ]
        .filter(Boolean)
        .join("\n"),
      language: payload.language,
      pageUrl: payload.pageUrl,
      utm: payload.utm,
    },
  };
}

async function handleContactApi(request, response) {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400",
    });
    response.end();
    return true;
  }

  if (request.method !== "POST") {
    writeJson(response, 405, { error: "Method not allowed" });
    return true;
  }

  if (isRateLimited(clientKey(request))) {
    writeJson(response, 429, { error: "Too many requests" });
    return true;
  }

  const result = validateContactPayload(await readJsonBody(request));
  if (result.spam) {
    writeJson(response, 202, { ok: true });
    return true;
  }
  if (result.error) {
    writeJson(response, 400, { error: result.error });
    return true;
  }

  const crmResponse = await fetch(CRM_CONTACT_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.CRM_INTAKE_SECRET
        ? { "x-intake-secret": process.env.CRM_INTAKE_SECRET }
        : {}),
    },
    body: JSON.stringify(result.payload),
  });

  const text = await crmResponse.text();
  response.writeHead(crmResponse.status, {
    "content-type": crmResponse.headers.get("content-type") || "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(text);
  return true;
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

    if (url.pathname === "/api/contact") {
      await handleContactApi(request, response);
      return;
    }

    if (request.method === "GET" || request.method === "HEAD") {
      const file = await resolveStatic(url.pathname);
      if (file) {
        const type = MIME[extname(file).toLowerCase()] || "application/octet-stream";
        const immutable = url.pathname.startsWith("/assets/");
        response.writeHead(200, {
          "content-type": type,
          "cache-control": immutable
            ? "public, max-age=31536000, immutable"
            : "public, max-age=3600",
        });
        response.end(request.method === "HEAD" ? undefined : await readFile(file));
        return;
      }
    }

    const webResponse = await handler.fetch(toWebRequest(request), process.env, {});
    response.statusCode = webResponse.status;
    webResponse.headers.forEach((value, key) => response.setHeader(key, value));
    if (webResponse.body) {
      Readable.fromWeb(webResponse.body).pipe(response);
    } else {
      response.end(await webResponse.text());
    }
  } catch (error) {
    console.error("[server-node] request failed:", error);
    if (!response.headersSent) {
      response.writeHead(500, { "content-type": "text/html; charset=utf-8" });
    }
    response.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[server-node] SSR listening on http://${HOST}:${PORT}`);
});
