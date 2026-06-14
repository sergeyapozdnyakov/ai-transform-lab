import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

const SITE_URL = "https://pozdnyakov.io";
const SITE_NAME = "AI.AUDIT";
const SEO_TITLE = "Аудит ИИ для среднего бизнеса — внедрение с измеримой окупаемостью";
const SEO_DESCRIPTION =
  "Аудит процессов и дорожная карта внедрения искусственного интеллекта за 3 недели. Сергей Поздняков: 25 лет в ИТ, региональный CIO в Estée Lauder, проекты Panasonic, ИТ-директор Zielinski & Rozen.";
const SEO_IMAGE = `${SITE_URL}/og-image.png`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "ru-RU",
      publisher: { "@id": `${SITE_URL}/#person` },
      potentialAction: {
        "@type": "ContactAction",
        target: `${SITE_URL}/#top`,
        name: "Обсудить аудит ИИ",
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Сергей Поздняков",
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/expert-photo.jpg`,
      email: "ai@pozdnyakov.io",
      jobTitle: "ИТ-директор, консультант по внедрению искусственного интеллекта",
      sameAs: ["https://www.linkedin.com/in/sergeypozdnyakov/"],
      knowsAbout: [
        "ИТ-стратегия",
        "цифровая трансформация",
        "искусственный интеллект в бизнесе",
        "автоматизация процессов",
        "розница и потребительские бренды",
      ],
      alumniOf: [
        { "@type": "Organization", name: "Panasonic" },
        { "@type": "Organization", name: "Estée Lauder" },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Аудит ИИ с оценкой окупаемости",
      alternateName: "Аудит процессов и дорожная карта внедрения ИИ",
      url: `${SITE_URL}/`,
      image: SEO_IMAGE,
      description: SEO_DESCRIPTION,
      areaServed: { "@type": "Country", name: "Россия" },
      founder: { "@id": `${SITE_URL}/#person` },
      provider: { "@id": `${SITE_URL}/#person` },
      serviceType: [
        "Аудит ИИ",
        "дорожная карта внедрения ИИ",
        "оценка окупаемости ИИ",
        "автоматизация бизнес-процессов",
      ],
      offers: {
        "@type": "Offer",
        priceCurrency: "RUB",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "RUB",
          minPrice: 350000,
          maxPrice: 600000,
        },
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq-schema`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Что получает компания после аудита ИИ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Карту процессов, список приоритетных сценариев внедрения ИИ, оценку экономического эффекта, риски и дорожную карту на 90 дней.",
          },
        },
        {
          "@type": "Question",
          name: "Сколько длится аудит?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Базовый формат занимает 3 недели: погружение, интервью, анализ процессов, расчет эффекта и защита дорожной карты.",
          },
        },
        {
          "@type": "Question",
          name: "Нужен ли доступ к продуктивным системам?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Нет. Для аудита достаточно описаний процессов, агрегированных показателей, демонстрационных данных, скриншотов или демонстрации систем.",
          },
        },
      ],
    },
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: SEO_TITLE,
      },
      {
        name: "description",
        content: SEO_DESCRIPTION,
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "Сергей Поздняков" },
      { name: "application-name", content: SITE_NAME },
      {
        name: "keywords",
        content:
          "аудит ИИ, внедрение ИИ, искусственный интеллект для бизнеса, ИТ-директор, цифровая трансформация, автоматизация процессов, оценка окупаемости",
      },
      { name: "theme-color", content: "#0a0e1a" },
      {
        property: "og:title",
        content: SEO_TITLE,
      },
      {
        property: "og:description",
        content: SEO_DESCRIPTION,
      },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:image", content: SEO_IMAGE },
      { property: "og:image:secure_url", content: SEO_IMAGE },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Аудит ИИ для среднего бизнеса — Сергей Поздняков",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SEO_TITLE },
      { name: "twitter:description", content: SEO_DESCRIPTION },
      { name: "twitter:image", content: SEO_IMAGE },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "manifest", href: "/site.webmanifest" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:'dark'}catch(e){document.documentElement.dataset.theme='dark'}",
          }}
        />
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
