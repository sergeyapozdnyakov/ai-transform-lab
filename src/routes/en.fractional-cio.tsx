import { createFileRoute } from "@tanstack/react-router";
import { FractionalCioPage } from "../components/advisory/AdvisoryPages";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/en/fractional-cio")({
  head: () =>
    createPageHead({
      locale: "en",
      path: "/fractional-cio",
      ...routeSeo.en.fractional,
    }),
  component: () => <FractionalCioPage locale="en" />,
});
