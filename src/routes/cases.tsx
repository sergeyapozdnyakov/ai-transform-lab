import { createFileRoute } from "@tanstack/react-router";
import { CasesPage } from "../components/advisory/AdvisoryPages";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/cases")({
  head: () =>
    createPageHead({
      locale: "ru",
      path: "/cases",
      ...routeSeo.ru.cases,
    }),
  component: () => <CasesPage locale="ru" />,
});
