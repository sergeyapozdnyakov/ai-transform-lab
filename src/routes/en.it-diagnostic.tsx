import { createFileRoute } from "@tanstack/react-router";
import { DiagnosticPage } from "../components/advisory/AdvisoryPages";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/en/it-diagnostic")({
  head: () =>
    createPageHead({
      locale: "en",
      path: "/it-diagnostic",
      ...routeSeo.en.diagnostic,
    }),
  component: () => <DiagnosticPage locale="en" />,
});
