import { createFileRoute } from "@tanstack/react-router";
import { CasesPage } from "../components/advisory/AdvisoryPages";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/en/cases")({
  head: () =>
    createPageHead({
      locale: "en",
      path: "/cases",
      ...routeSeo.en.cases,
    }),
  component: () => <CasesPage locale="en" />,
});
