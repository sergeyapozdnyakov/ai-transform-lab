import { createFileRoute } from "@tanstack/react-router";
import { AiAuditPage } from "../components/landing/AiAuditPage";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/en/ai-audit")({
  head: () =>
    createPageHead({
      locale: "en",
      path: "/ai-audit",
      ...routeSeo.en.aiAudit,
    }),
  component: () => <AiAuditPage locale="en" />,
});
