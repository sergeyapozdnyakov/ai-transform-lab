import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "../components/advisory/AdvisoryPages";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/en/contact")({
  head: () =>
    createPageHead({
      locale: "en",
      path: "/contact",
      ...routeSeo.en.contact,
    }),
  component: () => <ContactPage locale="en" />,
});
