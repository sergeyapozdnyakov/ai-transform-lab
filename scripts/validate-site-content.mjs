import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const i18n = read("src/lib/i18n.tsx");
const sections = read("src/components/landing/Sections.tsx");
const modal = read("src/components/landing/ContactModal.tsx");
const rootRoute = read("src/routes/__root.tsx");
const errorPage = read("src/lib/error-page.ts");
const styles = read("src/styles.css");
const serverNode = read("server-node.mjs");
const nda = read("public/docs/nda-template.html");
const sampleReport = read("public/docs/sample-audit-report.html");
const dataPolicy = read("public/docs/data-policy.html");
const processChecklist = read("public/docs/ai-process-checklist.html");
const ndaEn = read("public/docs/nda-template-en.html");
const sampleReportEn = read("public/docs/sample-audit-report-en.html");
const dataPolicyEn = read("public/docs/data-policy-en.html");
const processChecklistEn = read("public/docs/ai-process-checklist-en.html");
const robots = read("public/robots.txt");
const sitemap = read("public/sitemap.xml");
const manifest = read("public/site.webmanifest");
const ruI18n = i18n.slice(i18n.indexOf("  ru: {"), i18n.indexOf("\n  en: {"));

assert(!i18n.includes("REPLACE_WITH"), "i18n must not contain contact placeholders");
assert(!sections.includes('href="https://t.me"'), "sections must not link to bare Telegram");
assert(i18n.includes("https://t.me/pozdnyakov_io"), "Telegram URL must be real");
assert(i18n.includes("https://www.linkedin.com/in/sergeypozdnyakov/"), "LinkedIn URL must be real");
assert(i18n.includes("ai@pozdnyakov.io"), "Email must be real");

assert(!i18n.includes("Q2 2026"), "Availability copy must not expire at Q2 2026");
assert(i18n.includes("Обсудить 30 минут"), "Primary Russian CTA must be low-friction");
assert(i18n.includes("Book a 30-min call"), "Primary English CTA must be low-friction");
assert(
  i18n.includes("региональный ИТ-директор (CIO) в Estée Lauder"),
  "Russian experience copy must state the regional CIO role at Estée Lauder",
);
assert(
  !i18n.includes("региональная технологическая роль"),
  "Russian experience copy must not weaken the Estée Lauder role as a generic technology role",
);
assert(
  i18n.includes("regional CIO at Estée Lauder"),
  "English experience copy must state the regional CIO role at Estée Lauder",
);

assert(rootRoute.includes('<html lang="ru">'), "Root html lang must default to ru");
assert(errorPage.includes('<html lang="ru">'), "Error page lang must default to ru");
assert(rootRoute.includes('rel: "canonical"'), "Root head must expose canonical URL");
assert(rootRoute.includes("structuredData"), "Root head must include structured data");
assert(rootRoute.includes('type="application/ld+json"'), "Root head must render JSON-LD");
assert(rootRoute.includes("og:image"), "Root head must include Open Graph image");
assert(rootRoute.includes("twitter:image"), "Root head must include Twitter image");
assert(
  robots.includes("Sitemap: https://pozdnyakov.io/sitemap.xml"),
  "robots.txt must point to sitemap",
);
assert(
  sitemap.includes("<loc>https://pozdnyakov.io/</loc>"),
  "sitemap must include canonical home URL",
);
assert(sitemap.includes("sample-audit-report.html"), "sitemap must include sample report");
assert(sitemap.includes("ai-process-checklist.html"), "sitemap must include process checklist");
assert(manifest.includes('"short_name": "AI.AUDIT"'), "web manifest must name the site");
assert(
  serverNode.includes('".html": "text/html; charset=utf-8"'),
  "Node server must serve HTML documents with text/html MIME",
);

assert(modal.includes("mailto:"), "Contact form must have an email submit fallback");
assert(modal.includes("CONTACT_TELEGRAM_URL"), "Contact modal must expose Telegram fallback");
assert(modal.includes("CONTACT_EMAIL"), "Contact modal must expose email fallback");
assert(modal.includes("CRM_CONTACT_ENDPOINT"), "Contact modal must expose CRM endpoint");
assert(modal.includes('"/api/contact"'), "Contact modal must submit to same-origin contact API");
assert(modal.includes("await fetch(CRM_CONTACT_ENDPOINT"), "Contact modal must submit via fetch");

assert(
  sections.includes("aria-label={`${t.hero.h1a} ${t.hero.h1b}`}"),
  "Hero H1 must expose spaced text",
);
assert(sections.includes('{" "}'), "Hero animated spans must preserve spaces in DOM text");
assert(sections.includes("items-center min-w-0"), "Hero grid must allow narrow columns");
const primitives = read("src/components/landing/primitives.tsx");
const widget2 = read("src/components/landing/Widget2DocExtract.tsx");
const widget4 = read("src/components/landing/Widget4ProcessMap.tsx");
assert(primitives.includes("px-4 sm:px-6 md:px-10"), "Containers must use tighter mobile padding");
assert(widget2.includes("grid grid-cols-3"), "Document extraction tabs must fit mobile width");
assert(widget2.includes("QUOTE-2026-318.pdf"), "English document example must be translated");
assert(
  widget2.includes("Commercial proposal No. CP-2026/318"),
  "English document example must include translated commercial proposal copy",
);
assert(
  widget2.includes("TechMontage Service LLC"),
  "English structured example data must be translated",
);
assert(widget4.includes("w-full min-w-0 max-w-full"), "Process map must fit mobile width");
assert(widget4.includes('fontSize="11.5"'), "Process map node labels must be readable");
assert(widget4.includes("nodeWidth(label)"), "Process map nodes must size to their labels");

assert(
  styles.includes("overflow-x: clip"),
  "Global styles must prevent horizontal mobile overflow",
);
assert(sections.includes("w-full sm:w-auto"), "Hero CTA buttons must wrap cleanly on mobile");
assert(
  !sections.includes('filter: "brightness'),
  "New expert photo must render without dark-photo filter",
);
assert(
  statSync(join(root, "public/expert-photo.jpg")).size > 700_000,
  "Expert photo must be replaced with provided high-quality image",
);

assert(i18n.includes("sources:"), "ROI copy must include explicit sources");
assert(i18n.includes("mckinsey.com"), "ROI sources must include McKinsey link");
assert(i18n.includes("deloitte.com"), "ROI sources must include Deloitte link");
assert(i18n.includes("bcg.com"), "ROI sources must include BCG link");

assert(sections.includes("/docs/nda-template.html"), "Footer must link to NDA template");
assert(sections.includes("/docs/sample-audit-report.html"), "Footer must link to sample report");
assert(sections.includes("/docs/data-policy.html"), "Footer must link to data policy");
assert(
  sections.includes("/docs/ai-process-checklist.html"),
  "Footer must link to process checklist",
);
assert(
  sections.includes("/docs/nda-template-en.html"),
  "English footer must link to English NDA template",
);
assert(
  sections.includes("/docs/sample-audit-report-en.html"),
  "English footer must link to English sample report",
);
assert(
  sections.includes("/docs/data-policy-en.html"),
  "English footer must link to English data policy",
);
assert(
  sections.includes("/docs/ai-process-checklist-en.html"),
  "English footer must link to English process checklist",
);
assert(nda.includes("Шаблон соглашения о конфиденциальности"), "NDA document must exist");
assert(sampleReport.includes("Пример отчёта"), "Sample report document must exist");
assert(dataPolicy.includes("Политика данных"), "Data policy document must exist");
assert(processChecklist.includes("Чеклист: 20 процессов"), "Process checklist document must exist");
assert(ndaEn.includes("NDA Template"), "English NDA document must exist");
assert(sampleReportEn.includes("Sample Report"), "English sample report document must exist");
assert(dataPolicyEn.includes("Data Policy"), "English data policy document must exist");
assert(
  processChecklistEn.includes("Checklist: 20 processes"),
  "English process checklist must exist",
);

const pairedDocs = [
  [
    nda,
    ndaEn,
    ["1. Стороны", "1. Parties"],
    ["2. Конфиденциальная информация", "2. Confidential Information"],
    ["7. Контакты", "7. Contacts"],
  ],
  [
    sampleReport,
    sampleReportEn,
    ["1. Краткое резюме", "1. Executive Summary"],
    ["3. Приоритизация возможностей искусственного интеллекта", "3. AI Opportunity Prioritization"],
    ["5. Риски", "5. Risks"],
  ],
  [
    dataPolicy,
    dataPolicyEn,
    ["1. Минимизация доступа", "1. Access Minimization"],
    ["5. Использование инструментов искусственного интеллекта", "5. Use of AI Tools"],
    ["7. Контакты", "7. Contacts"],
  ],
  [
    processChecklist,
    processChecklistEn,
    ["1. Как пользоваться чеклистом", "1. How to Use the Checklist"],
    ["2. 20 процессов для первичной проверки", "2. 20 Processes for Initial Screening"],
    ["3. Что взять в первичный расчёт", "3. What to Take Into the Initial Estimate"],
  ],
];

for (const [ruDoc, enDoc, ...headingPairs] of pairedDocs) {
  for (const [ruHeading, enHeading] of headingPairs) {
    assert(ruDoc.includes(ruHeading), `Russian document missing heading: ${ruHeading}`);
    assert(enDoc.includes(enHeading), `English document missing matching heading: ${enHeading}`);
  }
}

for (const doc of [
  nda,
  sampleReport,
  dataPolicy,
  processChecklist,
  ndaEn,
  sampleReportEn,
  dataPolicyEn,
  processChecklistEn,
]) {
  assert(
    doc.includes('class="lang-switch"'),
    "Every document must link to its paired language version",
  );
  assert(doc.includes("@media (max-width: 640px)"), "Every document must include mobile styles");
}

const unsupportedExperienceClaims = [
  "Около 60% клиентов после аудита",
  "About 60% of clients do continue",
  "Примерно 1 из 5 аудитов",
  "Roughly 1 in 5 audits",
  "каждого клиента",
  "every client",
  "за последние годы было два",
  "there have been two real cases",
  "Что менялось у клиентов",
  "What changed for clients",
  "Сегодня я работаю с основателями",
  "Today I work with founders",
  "внедрения у меня не закажут",
  "Do you work with international clients?",
  "Работаете ли с зарубежными клиентами?",
];

for (const claim of unsupportedExperienceClaims) {
  assert(!i18n.includes(claim), `Unsupported experience claim must be removed: ${claim}`);
}

const russianSurfaces = [
  ["src/lib/i18n.tsx", ruI18n],
  ["src/routes/__root.tsx", rootRoute],
  ["public/docs/nda-template.html", nda],
  ["public/docs/sample-audit-report.html", sampleReport],
  ["public/docs/data-policy.html", dataPolicy],
  ["public/docs/ai-process-checklist.html", processChecklist],
];

const allowedRussianSurfaceLatin = [
  "AI.AUDIT",
  "Panasonic",
  "Estée Lauder",
  "Zielinski & Rozen",
  "Power BI",
  "Python",
  "Telegram",
  "LinkedIn",
  "McKinsey",
  "Deloitte",
  "BCG",
  "CEO",
  "COO",
  "CIO",
  "CFO",
  "State of AI",
  "ai@pozdnyakov.io",
  "pozdnyakov.io",
  "pozdnyakov_io",
  "sergeypozdnyakov",
  "mailto",
  "https",
  "href",
  "docs",
  "nda-template-en",
  "sample-audit-report-en",
  "data-policy-en",
  "ai-process-checklist",
  "ai-process-checklist-en",
  "html",
  "lang",
  "aria",
  "label",
  "class",
  "target",
  "rel",
  "noopener",
  "noreferrer",
  "const",
  "sources",
  "contact",
  "links",
  "email",
  "siteUrl",
  "telegramUrl",
  "linkedinUrl",
  "from",
  "to",
  "suffix",
  "deltaInverted",
  "true",
  "false",
  "title",
  "ru",
  "en",
  "RU",
  "EN",
  "CSS",
  "SEO",
  "URL",
  "roi",
  "faq",
  "stack",
  "bottleneckLegend",
  "bottleneckReasons",
  "mapLabel",
  "nodes",
  "lead",
  "call",
  "chat",
  "mail",
  "route",
  "qual",
  "stock",
  "price",
  "kp",
  "agree",
  "contract",
  "prod",
  "logi",
  "ctrl",
];

const bannedRussianAnglicisms = [
  /\bAI\b/i,
  /\bROI\b/i,
  /\bCIO\b/i,
  /\bCEO\b/i,
  /\bCOO\b/i,
  /\bHRD\b/i,
  /\bIT\b/i,
  /\bNDA\b/i,
  /\bAPI\b/i,
  /\bLLM\b/i,
  /\bRAG\b/i,
  /\bMVP\b/i,
  /\bFAQ\b/i,
  /\bExecutive summary\b/i,
  /\bkick[- ]off\b/i,
  /\bquick wins?\b/i,
  /\bproduction\b/i,
  /\bread[- ]only\b/i,
  /\bfollow[- ]up\b/i,
  /\broadmap\b/i,
  /\bworkshop\b/i,
  /\bpilot\b/i,
  /\bdashboard\b/i,
  /\bdata lake\b/i,
  /\bSKU\b/i,
  /\bstack\b/i,
  /\bback[- ]office\b/i,
  /\buse cases?\b/i,
  /\blead\b/i,
  /\bhigh[- ]ticket\b/i,
  /\bchatbot\b/i,
];

for (const [path, text] of russianSurfaces) {
  let checkedText = text.replace(/https?:\/\/[^\s"']+/g, "");
  for (const allowed of allowedRussianSurfaceLatin) {
    checkedText = checkedText.replaceAll(allowed, "");
  }
  for (const term of bannedRussianAnglicisms) {
    assert(!term.test(checkedText), `Russian surface must avoid anglicism ${term} in ${path}`);
  }
}

console.log("Site content checks passed");
