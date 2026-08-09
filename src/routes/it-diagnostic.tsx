import { createFileRoute } from "@tanstack/react-router";
import { DiagnosticPage } from "../components/advisory/AdvisoryPages";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/it-diagnostic")({
  head: () =>
    createPageHead({
      locale: "ru",
      path: "/it-diagnostic",
      ...routeSeo.ru.diagnostic,
    }),
  component: () => <DiagnosticPage locale="ru" />,
});
