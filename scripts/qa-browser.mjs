import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const root = process.cwd();
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9300 + Math.floor(Math.random() * 500);
const origin = "http://127.0.0.1:5173";
const url = origin;
const userDataDir = join(root, `.tmp-edge-qa-${Date.now()}`);
const pathsToCheck = [
  "/",
  "/docs/nda-template.html",
  "/docs/nda-template-en.html",
  "/docs/sample-audit-report.html",
  "/docs/sample-audit-report-en.html",
  "/docs/data-policy.html",
  "/docs/data-policy-en.html",
];

const server = spawn(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1", "--port", "5173"],
  {
    cwd: root,
    stdio: "ignore",
    windowsHide: true,
  },
);
let edge;

async function waitForServer() {
  for (let i = 0; i < 30; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }
    await delay(300);
  }
  throw new Error("Vite server did not start");
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

async function cdpSession() {
  const tabs = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json());
  const page = tabs.find((tab) => tab.type === "page");
  if (!page?.webSocketDebuggerUrl) throw new Error("No debuggable Edge page found");

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
}

try {
  await removeDirWithRetry(userDataDir);
  await mkdir(userDataDir, { recursive: true });
  await waitForServer();

  edge = spawn(
    edgePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      "--window-size=390,900",
      url,
    ],
    { stdio: "ignore", windowsHide: true },
  );

  await delay(1500);
  const { socket, send } = await cdpSession();
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 900,
    deviceScaleFactor: 1,
    mobile: true,
  });

  const mobilePages = [];
  for (const path of pathsToCheck) {
    await send("Page.navigate", { url: `${origin}${path}` });
    await delay(1000);
    const result = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
      const viewport = document.documentElement.clientWidth;
      const overflowing = [...document.body.querySelectorAll("*")]
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 80),
            width: Math.round(rect.width),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
          };
        })
        .filter((el) => el.width > viewport + 1 || el.left < -1 || el.right > viewport + 1)
        .slice(0, 8);
      return {
      path: location.pathname,
      lang: document.documentElement.lang,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelector("h1")?.innerText,
      hasPlaceholder: document.body.innerText.includes("REPLACE_WITH"),
      hasCta: document.body.innerText.includes("Обсудить 30 минут"),
      hasLanguageSwitch: !!document.querySelector(".lang-switch"),
      overflowing,
      telegramLinks: [...document.querySelectorAll('a[href*="t.me"]')].map((a) => a.href),
      mailtoLinks: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.href),
      linkedInLinks: [...document.querySelectorAll('a[href*="linkedin.com"]')].map((a) => a.href),
    };
    })()`,
    });
    mobilePages.push(result.result.value);
  }
  for (const page of mobilePages) {
    assert.equal(
      page.scrollWidth,
      page.clientWidth,
      `${page.path} must not create horizontal scroll`,
    );
    assert.deepEqual(page.overflowing, [], `${page.path} must not contain clipped wide elements`);
  }

  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  const screenshotPath = join(root, "qa-mobile-390.png");
  await writeFile(screenshotPath, Buffer.from(shot.data, "base64"));

  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url });
  await delay(1000);
  const desktop = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      hasSources: document.body.innerText.includes("McKinsey, исследование") && document.body.innerText.includes("BCG, разрыв"),
    }))()`,
  });

  await send("Browser.close");
  socket.close();

  console.log(
    JSON.stringify({ mobile: mobilePages, desktop: desktop.result.value, screenshotPath }, null, 2),
  );
} finally {
  edge?.kill();
  server.kill();
  await delay(500);
  try {
    await removeDirWithRetry(userDataDir);
  } catch (error) {
    console.warn(`Could not remove temporary Edge profile yet: ${error.message}`);
  }
}
