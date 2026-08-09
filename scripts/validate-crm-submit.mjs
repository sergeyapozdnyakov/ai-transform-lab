import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const modal = read("src/components/landing/ContactModal.tsx");
const advisoryForm = read("src/components/advisory/ContactForm.tsx");
const i18n = read("src/lib/i18n.tsx");
const siteChecks = read("scripts/validate-site-content.mjs");
const nodeServer = read("server-node.mjs");

assert(
  modal.includes('const CRM_CONTACT_ENDPOINT = "/api/contact"'),
  "Contact modal must target same-origin landing contact API",
);
assert(modal.includes("await fetch(CRM_CONTACT_ENDPOINT"), "Contact form must submit to CRM API");
assert(modal.includes('method: "POST"'), "CRM submit must use POST");
assert(modal.includes('"content-type": "application/json"'), "CRM submit must send JSON");
assert(modal.includes("pageUrl: window.location.href"), "CRM submit must include source page URL");
assert(modal.includes("language:"), "CRM submit must include current language");
assert(modal.includes("utm:"), "CRM submit must include UTM parameters");
assert(modal.includes("openMailFallback"), "Contact form must keep email fallback");
assert(modal.includes("setSubmitError"), "Contact form must expose submit failure state");

assert(
  nodeServer.includes('process.env.CRM_CONTACT_ENDPOINT || "http://crm:3000/api/leads/contact"'),
  "Landing Node server must proxy contact requests to CRM inside Docker network",
);
assert(
  nodeServer.includes('url.pathname === "/api/contact"'),
  "Landing server must expose /api/contact",
);
assert(nodeServer.includes("handleContactApi"), "Landing server must handle contact API requests");

assert(i18n.includes("crmError"), "Translations must include CRM failure fallback copy");
assert(
  advisoryForm.includes("siteConfig.contact.formEndpoint"),
  "Qualified contact form must use the centralized same-origin endpoint",
);
assert(advisoryForm.includes('method: "POST"'), "Qualified contact form must use POST");
assert(advisoryForm.includes("pageUrl:"), "Qualified contact form must include source page URL");
assert(advisoryForm.includes("utm,"), "Qualified contact form must include UTM parameters");
assert(advisoryForm.includes('setStatus("error")'), "Qualified contact form must expose failures");
assert(
  siteChecks.includes("same-origin CRM adapter"),
  "Site content checks must cover CRM endpoint",
);

console.log("CRM submit checks passed");
