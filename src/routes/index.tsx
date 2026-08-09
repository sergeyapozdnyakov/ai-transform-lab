import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../components/advisory/AdvisoryPages";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    createPageHead({
      locale: "ru",
      path: "/",
      ...routeSeo.ru.home,
      keywords:
        "внешний ИТ-директор, Fractional CIO, ИТ-стратегия, управление ИТ, retail, FMCG, e-commerce",
    }),
  component: () => <HomePage locale="ru" />,
});
