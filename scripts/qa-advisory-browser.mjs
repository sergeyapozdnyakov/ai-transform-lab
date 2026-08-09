import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import WebSocket from "ws";

const root = process.cwd();
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const origin = process.env.QA_ORIGIN || "http://127.0.0.1:4191";
const port = 9400 + Math.floor(Math.random() * 400);
const userDataDir = join(root, `.tmp-edge-advisory-${Date.now()}`);
const outputDir = process.env.QA_OUTPUT_DIR || join(root, ".qa");
const routes = [
  "/",
  "/fractional-cio",
  "/ai-audit",
  "/cases",
  "/it-diagnostic",
  "/about",
  "/contact",
  "/en",
  "/en/fractional-cio",
  "/en/ai-audit",
  "/en/cases",
  "/en/it-diagnostic",
  "/en/about",
  "/en/contact",
];

async function waitForOrigin() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The local preview may still be starting.
    }
    await delay(250);
  }
  throw new Error(`Local site is not available at ${origin}`);
}

async function removeDirWithRetry(path) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      await rm(path, { recursive: true, force: true });
      return;
    } catch (error) {
      if (!["EBUSY", "ENOTEMPTY", "EPERM"].includes(error?.code) || attempt === 7) throw error;
      await delay(250 * (attempt + 1));
    }
  }
}

async function connectToPage() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const tabs = await fetch(`http://127.0.0.1:${port}/json`).then((response) => response.json());
      const page = tabs.find((tab) => tab.type === "page");
      if (!page?.webSocketDebuggerUrl) throw new Error("No page target");

      const socket = new WebSocket(page.webSocketDebuggerUrl);
      await new Promise((resolve, reject) => {
        socket.addEventListener("open", resolve, { once: true });
        socket.addEventListener("error", reject, { once: true });
      });

      let id = 0;
      const send = (method, params = {}) =>
        new Promise((resolve, reject) => {
          const callId = ++id;
          const onMessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.id !== callId) return;
            socket.removeEventListener("message", onMessage);
            if (message.error) reject(new Error(JSON.stringify(message.error)));
            else resolve(message.result);
          };
          socket.addEventListener("message", onMessage);
          socket.send(JSON.stringify({ id: callId, method, params }));
        });

      return { socket, send };
    } catch {
      await delay(250);
    }
  }
  throw new Error("Could not connect to the Edge debugging target");
}

async function inspect(send, route) {
  await send("Page.navigate", { url: `${origin}${route}` });
  await delay(550);
  const result = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const viewport = document.documentElement.clientWidth;
      const overflowing = [...document.body.querySelectorAll("*")]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          let ancestor = element.parentElement;
          let insideHorizontalScroller = false;
          while (ancestor && !insideHorizontalScroller) {
            const ancestorStyle = getComputedStyle(ancestor);
            insideHorizontalScroller = ["auto", "scroll"].includes(ancestorStyle.overflowX);
            ancestor = ancestor.parentElement;
          }
          return {
            tag: element.tagName.toLowerCase(),
            text: (element.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 70),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            position: style.position,
            intentionallyHidden: element.closest('[aria-hidden="true"]') !== null,
            insideHorizontalScroller,
          };
        })
        .filter((item) =>
          !item.intentionallyHidden &&
          !item.insideHorizontalScroller &&
          item.position !== "fixed" &&
          (item.width > viewport + 1 || item.left < -1 || item.right > viewport + 1)
        )
        .slice(0, 12);

      return {
        route: location.pathname,
        statusTitle: document.title,
        lang: document.documentElement.lang,
        h1: document.querySelector("h1")?.innerText || "",
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        overflowing,
        placeholderFound: document.body.innerText.includes("REPLACE_WITH"),
      };
    })()`,
  });
  return result.result.value;
}

async function screenshot(send, route, filename, width, height) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 600,
  });
  await send("Page.navigate", { url: `${origin}${route}` });
  await delay(1300);
  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  const path = join(outputDir, filename);
  await writeFile(path, Buffer.from(shot.data, "base64"));
  return path;
}

let edge;
try {
  await waitForOrigin();
  await mkdir(outputDir, { recursive: true });
  await removeDirWithRetry(userDataDir);
  await mkdir(userDataDir, { recursive: true });

  edge = spawn(
    edgePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--remote-allow-origins=*",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      "--window-size=390,900",
      `${origin}/`,
    ],
    { stdio: ["ignore", "ignore", "pipe"], windowsHide: true },
  );

  let edgeErrors = "";
  edge.stderr.on("data", (chunk) => {
    edgeErrors += chunk.toString();
  });
  await delay(1200);
  if (edge.exitCode !== null) {
    throw new Error(`Edge exited with code ${edge.exitCode}: ${edgeErrors}`);
  }

  const { socket, send } = await connectToPage();
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 900,
    deviceScaleFactor: 1,
    mobile: true,
  });

  const mobile = [];
  for (const route of routes) {
    const page = await inspect(send, route);
    mobile.push(page);
    assert.equal(page.lang, route.startsWith("/en") ? "en" : "ru", `${route}: wrong lang`);
    assert(page.h1, `${route}: missing H1`);
    assert(!page.placeholderFound, `${route}: unresolved placeholder`);
    assert.equal(page.scrollWidth, page.clientWidth, `${route}: horizontal page scroll`);
    assert.deepEqual(page.overflowing, [], `${route}: overflowing elements`);
  }

  const screenshots = [
    await screenshot(send, "/", "qa-advisory-desktop.png", 1440, 1000),
    await screenshot(send, "/", "qa-advisory-mobile.png", 390, 900),
    await screenshot(send, "/fractional-cio", "qa-fractional-mobile.png", 390, 900),
    await screenshot(send, "/ai-audit", "qa-ai-audit-mobile.png", 390, 900),
    await screenshot(send, "/contact", "qa-contact-mobile.png", 390, 900),
    await screenshot(send, "/about", "qa-about-mobile.png", 390, 900),
  ];

  await send("Browser.close");
  socket.close();
  console.log(JSON.stringify({ origin, checkedRoutes: mobile.length, screenshots }, null, 2));
} finally {
  edge?.kill();
  await delay(400);
  try {
    await removeDirWithRetry(userDataDir);
  } catch (error) {
    console.warn(`Temporary Edge profile cleanup deferred: ${error.message}`);
  }
}
