import { createFileRoute } from "@tanstack/react-router";
import { FractionalCioPage } from "../components/advisory/AdvisoryPages";
import { createPageHead, routeSeo } from "../lib/seo";

export const Route = createFileRoute("/fractional-cio")({
  head: () =>
    createPageHead({
      locale: "ru",
      path: "/fractional-cio",
      ...routeSeo.ru.fractional,
      keywords:
        "внешний ИТ-директор, Fractional CIO, временный CIO, ИТ-стратегия, ИТ-бюджет, управление подрядчиками",
    }),
  component: () => <FractionalCioPage locale="ru" />,
});
