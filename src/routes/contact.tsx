import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "../components/advisory/AdvisoryPages";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    createPageHead({
      locale: "ru",
      path: "/contact",
      ...routeSeo.ru.contact,
    }),
  component: () => <ContactPage locale="ru" />,
});
