import { createFileRoute } from "@tanstack/react-router";
import { AiAuditPage } from "../components/landing/AiAuditPage";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/ai-audit")({
  head: () =>
    createPageHead({
      locale: "ru",
      path: "/ai-audit",
      ...routeSeo.ru.aiAudit,
      keywords:
        "AI-аудит, аудит ИИ, внедрение искусственного интеллекта, оценка окупаемости AI, автоматизация процессов",
    }),
  component: () => <AiAuditPage locale="ru" />,
});
