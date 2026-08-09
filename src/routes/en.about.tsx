import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../components/advisory/AdvisoryPages";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/en/about")({
  head: () =>
    createPageHead({
      locale: "en",
      path: "/about",
      ...routeSeo.en.about,
    }),
  component: () => <AboutPage locale="en" />,
});
