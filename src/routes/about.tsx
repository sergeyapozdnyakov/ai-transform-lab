import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../components/advisory/AdvisoryPages";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    createPageHead({
      locale: "ru",
      path: "/about",
      ...routeSeo.ru.about,
    }),
  component: () => <AboutPage locale="ru" />,
});
