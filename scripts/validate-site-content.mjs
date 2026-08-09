import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

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

const content = read("src/content/site.ts");
const chrome = read("src/components/advisory/SiteChrome.tsx");
const form = read("src/components/advisory/ContactForm.tsx");
const pages = read("src/components/advisory/AdvisoryPages.tsx");
const advisoryMotion = read("src/components/advisory/AdvisoryMotion.tsx");
const aiAuditPage = read("src/components/landing/AiAuditPage.tsx");
const analytics = read("src/lib/analytics.ts");
const seo = read("src/lib/seo.ts");
const server = read("server-node.mjs");
const sitemap = read("public/sitemap.xml");
const manifest = read("public/site.webmanifest");
const rootRoute = read("src/routes/__root.tsx");

for (const route of routes) {
  assert(
    sitemap.includes(`<loc>https://pozdnyakov.io${route === "/" ? "/" : route}</loc>`),
    `Sitemap is missing ${route}`,
  );
}

assert(content.includes("Fractional CIO"), "Fractional CIO must be the primary positioning");
assert(content.includes("Разобрать ИТ-ситуацию"), "Russian primary CTA is missing");
assert(content.includes("Discuss your IT situation"), "English primary CTA is missing");
assert(
  content.includes("регионального CIO для рынков Восточной и Северной Европы"),
  "Estée Lauder regional CIO role must be stated precisely",
);
assert(
  content.includes("в Panasonic вёл технологические проекты"),
  "Panasonic project manager role must be stated precisely",
);
assert(!content.includes("~40"), "Unverified public project-count claim must not be present");
assert(!content.includes("60% клиентов"), "Unverified client-conversion claim must not be present");

assert(chrome.includes("POZDNYAKOV.IO"), "Shared site brand is missing");
assert(chrome.includes("aria-label"), "Shared chrome must expose accessible controls");
assert(pages.includes("showFractionalCioPricing"), "Pricing visibility must be configurable");
assert(pages.includes("AnimatedHeading"), "Advisory hero headings must retain entrance motion");
assert(pages.includes("MotionArticle"), "Advisory cards must retain staggered reveal motion");
assert(pages.includes("<Reveal"), "Advisory sections must retain scroll reveal motion");
assert(
  advisoryMotion.includes("useReducedMotion"),
  "Advisory motion must respect reduced-motion preferences",
);
assert(pages.includes("first-90-days"), "First 90 days document must be linked");
assert(aiAuditPage.includes("Widget3ROI"), "AI Audit must preserve the ROI interaction");
assert(aiAuditPage.includes("<Deliverable />"), "AI Audit must preserve the process map");

assert(form.includes('name="websiteFax"'), "Contact honeypot is missing");
assert(form.includes("form.consent"), "Privacy consent is missing");
assert(
  form.includes("siteConfig.contact.formEndpoint"),
  "Contact form must use the same-origin CRM adapter",
);
assert(form.includes("aria-live"), "Contact form must announce submission state");
assert(server.includes("isRateLimited"), "Contact endpoint must be rate limited");
assert(server.includes("validateContactPayload"), "Contact endpoint must sanitize input");
assert(
  server.includes("CONTACT_FALLBACK_EMAIL"),
  "Telegram-only CRM fallback must be configurable",
);

assert(
  analytics.includes("window.dataLayer"),
  "Analytics adapter must support the existing dataLayer",
);
assert(
  analytics.includes("pozdnyakov:analytics"),
  "Analytics adapter must expose a vendor-neutral local event",
);
assert(seo.includes("canonical"), "SEO helper must generate canonical URLs");
assert(seo.includes("hrefLang"), "SEO helper must generate language alternates");
assert(rootRoute.includes("NotFoundComponent"), "The root route must provide a branded 404");
assert(manifest.includes('"name": "POZDNYAKOV.IO'), "Web manifest must use the new brand");

console.log("Advisory site content checks passed");
