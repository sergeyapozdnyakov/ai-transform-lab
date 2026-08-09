import { SITE_URL, type Locale } from "../content/site";

export type PageSeo = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string;
};

export function createPageHead({ locale, path, title, description, keywords }: PageSeo) {
  const canonicalPath = locale === "en" ? (path === "/" ? "/en" : `/en${path}`) : path;
  const alternatePath = locale === "en" ? path : path === "/" ? "/en" : `/en${path}`;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const alternate = `${SITE_URL}${alternatePath}`;
  const image = `${SITE_URL}/og-image.png`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: locale === "ru" ? "Сергей Поздняков" : "Sergey Pozdnyakov" },
      ...(keywords ? [{ name: "keywords", content: keywords }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:site_name", content: "POZDNYAKOV.IO" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: locale === "ru" ? "ru_RU" : "en_US" },
      { property: "og:locale:alternate", content: locale === "ru" ? "en_US" : "ru_RU" },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          locale === "ru"
            ? "Сергей Поздняков — внешний ИТ-директор и консультант по AI-трансформации"
            : "Sergey Pozdnyakov — Fractional CIO and AI transformation advisor",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", hrefLang: locale === "ru" ? "en" : "ru", href: alternate },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: `${SITE_URL}${path}`,
      },
    ],
  };
}

export const routeSeo = {
  ru: {
    home: {
      title:
        "Внешний ИТ-директор (Fractional CIO) для retail, FMCG и e-commerce — Сергей Поздняков",
      description:
        "ИТ-стратегия, бюджет, архитектура, команда, поставщики, устойчивость и AI-портфель для растущего бизнеса. 25 лет опыта в ИТ.",
    },
    fractional: {
      title: "Внешний ИТ-директор для растущего бизнеса — Fractional CIO",
      description:
        "Стратегическое управление ИТ 1–3 дня в неделю: бюджет, архитектура, команда, поставщики, устойчивость и трансформации.",
    },
    aiAudit: {
      title: "AI-аудит процессов с расчётом окупаемости — Сергей Поздняков",
      description:
        "Карта процессов, приоритетные AI-сценарии, открытая модель эффекта и дорожная карта внедрения за 3 недели.",
    },
    cases: {
      title: "Кейсы ИТ-управления в retail, FMCG и e-commerce",
      description:
        "Опыт управления международной ИТ-функцией, розничными системами, складами, данными, ERP и распределёнными поставщиками.",
    },
    diagnostic: {
      title: "Экспресс-диагностика зрелости ИТ для руководителя",
      description:
        "12 вопросов за 3 минуты: стратегия, бюджет, архитектура, поставщики, устойчивость, данные, команда и AI-портфель.",
    },
    about: {
      title: "Сергей Поздняков — внешний ИТ-директор и консультант",
      description:
        "25 лет в ИТ. Региональный CIO в Estée Lauder, CIO Zielinski & Rozen, международные технологические программы.",
    },
    contact: {
      title: "Обсудить ИТ-ситуацию — Сергей Поздняков",
      description:
        "Конфиденциальный вводный разговор о Fractional CIO, диагностике ИТ, временном руководстве или AI-аудите.",
    },
  },
  en: {
    home: {
      title: "Fractional CIO for Retail, FMCG and E-commerce — Sergey Pozdnyakov",
      description:
        "External IT leadership for growing businesses: strategy, budget, architecture, vendors, resilience, transformation, data and AI portfolio.",
    },
    fractional: {
      title: "Fractional CIO for Growing Retail, FMCG and E-commerce",
      description:
        "Senior external IT leadership 1–3 days per week across strategy, budget, architecture, team, vendors, resilience, and transformation.",
    },
    aiAudit: {
      title: "AI Audit with Transparent Business Case — Sergey Pozdnyakov",
      description:
        "Process map, prioritized AI use cases, transparent economics, risks, and an implementation roadmap in three weeks.",
    },
    cases: {
      title: "Technology Leadership Cases in Retail, FMCG and E-commerce",
      description:
        "Experience leading international IT, retail systems, warehouses, data, ERP, resilience, and distributed vendors.",
    },
    diagnostic: {
      title: "Three-minute IT Maturity Check for Executives",
      description:
        "Twelve questions covering strategy, cost, architecture, vendors, resilience, data, team, governance, and AI portfolio.",
    },
    about: {
      title: "Sergey Pozdnyakov — Fractional CIO and Technology Advisor",
      description:
        "25 years in IT, including regional CIO leadership at Estée Lauder and CIO responsibility at Zielinski & Rozen.",
    },
    contact: {
      title: "Discuss Your IT Situation — Sergey Pozdnyakov",
      description:
        "A confidential starting point for Fractional CIO, Executive IT Diagnostic, Interim CIO, or AI Audit work.",
    },
  },
} as const;
