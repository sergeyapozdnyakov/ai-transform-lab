import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../components/advisory/AdvisoryPages";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/en/")({
  head: () =>
    createPageHead({
      locale: "en",
      path: "/",
      ...routeSeo.en.home,
      keywords:
        "Fractional CIO, external IT director, IT strategy, retail technology, FMCG, e-commerce",
    }),
  component: () => <HomePage locale="en" />,
});
