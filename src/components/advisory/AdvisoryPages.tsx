import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CircleAlert,
  ClipboardCheck,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  getSiteContent,
  localizedPath,
  SITE_URL,
  siteConfig,
  type Locale,
} from "../../content/site";
import { trackEvent } from "../../lib/analytics";
import { AnimatedHeading, MotionArticle, Reveal } from "./AdvisoryMotion";
import { ContactForm } from "./ContactForm";
import { PrimaryCta, SecondaryCta, SiteShell } from "./SiteChrome";

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="font-mono text-[10px] uppercase text-[var(--color-accent-indigo)]">
        {children}
      </span>
      <span className="h-px flex-1 bg-[var(--color-border-subtle)]" />
    </div>
  );
}

function SectionTitle({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <Reveal>
      <div>
        <SectionLabel>{label}</SectionLabel>
        <h2 className="max-w-[840px] text-balance text-[30px] font-medium leading-[1.12] md:text-[42px]">
          {title}
        </h2>
        {intro && (
          <p className="mt-5 max-w-[760px] text-[15px] leading-relaxed text-[var(--color-text-secondary)] md:text-[16px]">
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}

function StructuredData({
  locale,
  path,
  serviceName,
  description,
}: {
  locale: Locale;
  path: string;
  serviceName?: string;
  description: string;
}) {
  const url = `${SITE_URL}${localizedPath(locale, path)}`;
  const owner = siteConfig.owner[locale];
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: owner,
      url: SITE_URL,
      image: `${SITE_URL}/sergey-pozdnyakov-2026.jpg`,
      email: siteConfig.contact.email,
      jobTitle: locale === "ru" ? "Внешний ИТ-директор" : "Fractional CIO",
      sameAs: [siteConfig.contact.linkedinUrl, siteConfig.contact.telegramUrl],
      knowsAbout: [
        "IT strategy",
        "retail technology",
        "enterprise architecture",
        "business continuity",
        "AI transformation",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#professional-service`,
      name: "POZDNYAKOV.IO",
      url: SITE_URL,
      email: siteConfig.contact.email,
      description,
      areaServed: [
        { "@type": "Country", name: "Russia" },
        { "@type": "Place", name: "International" },
      ],
      founder: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "ru" ? "Главная" : "Home",
          item: `${SITE_URL}${localizedPath(locale, "/")}`,
        },
        ...(path === "/"
          ? []
          : [
              {
                "@type": "ListItem",
                position: 2,
                name: serviceName ?? owner,
                item: url,
              },
            ]),
      ],
    },
  ];

  if (serviceName) {
    graph.push({
      "@type": "Service",
      name: serviceName,
      url,
      description,
      provider: { "@id": `${SITE_URL}/#professional-service` },
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

function ExecutivePanel({ locale }: { locale: Locale }) {
  const rows =
    locale === "ru"
      ? [
          ["ПОРТФЕЛЬ", "7 инициатив", "2 требуют решения"],
          ["РИСКИ", "4 критических", "владелец назначен"],
          ["БЮДЖЕТ", "план / факт", "прогноз на год"],
          ["СЕРВИС", "критические системы", "уровень доступности"],
        ]
      : [
          ["PORTFOLIO", "7 initiatives", "2 need a decision"],
          ["RISK", "4 critical", "owners assigned"],
          ["BUDGET", "plan / actual", "full-year forecast"],
          ["SERVICE", "critical systems", "availability view"],
        ];

  return (
    <div className="rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/75 p-5 md:p-6">
      <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
        <span className="font-mono text-[10px] uppercase text-[var(--color-text-mono)]">
          {locale === "ru" ? "УПРАВЛЕНЧЕСКИЙ КОНТУР" : "EXECUTIVE CONTROL LOOP"}
        </span>
        <span className="h-2 w-2 rounded-full bg-[var(--color-accent-teal)]" aria-hidden="true" />
      </div>
      <div className="divide-y divide-[var(--color-border-subtle)]">
        {rows.map(([label, value, note], index) => (
          <div key={label} className="grid grid-cols-[86px_1fr] gap-4 py-4">
            <span className="font-mono text-[9px] text-[var(--color-text-mono)]">{label}</span>
            <div>
              <div className="flex items-center justify-between gap-3 text-[13px]">
                <span>{value}</span>
                <span
                  className={
                    index === 0
                      ? "text-[var(--color-accent-amber)]"
                      : "text-[var(--color-accent-teal)]"
                  }
                >
                  {index === 0 ? "●" : "✓"}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[var(--color-text-secondary)]">{note}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          [siteConfig.profile.stores, locale === "ru" ? "магазинов" : "stores"],
          [siteConfig.profile.warehouses, locale === "ru" ? "складов" : "warehouses"],
          [siteConfig.profile.users, locale === "ru" ? "пользователей" : "users"],
        ].map(([value, label]) => (
          <div key={label} className="border-l border-[var(--color-border-emphasis)] pl-3">
            <div className="font-mono text-[18px]">{value}</div>
            <div className="mt-1 text-[9px] text-[var(--color-text-mono)]">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function First90Days({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const content = getSiteContent(locale);
  const stages = content.first90[locale];

  return (
    <section
      id="first-90-days"
      className="scroll-mt-20 border-t border-[var(--color-border-subtle)] py-20 md:py-28"
    >
      <Container>
        <SectionTitle
          label={locale === "ru" ? "ПЕРВЫЕ 90 ДНЕЙ" : "THE FIRST 90 DAYS"}
          title={
            locale === "ru"
              ? "От непрозрачности — к управляемому портфелю и первым решениям"
              : "From limited visibility to a governed portfolio and first decisions"
          }
          intro={
            locale === "ru"
              ? "План уточняется после диагностики, но управленческая логика остаётся одинаковой: увидеть, договориться о правилах и начать исполнение."
              : "The plan is refined after the diagnostic, but the management logic remains the same: see clearly, agree the rules, and begin execution."
          }
        />

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
          {stages.map((stage, index) => (
            <MotionArticle
              delay={index * 0.07}
              key={stage.period}
              className="flex h-full flex-col rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] p-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[11px] text-[var(--color-accent-indigo)]">
                  {stage.period}
                </span>
                <span className="font-mono text-[10px] text-[var(--color-text-mono)]">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-[22px] font-medium">{stage.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                {stage.summary}
              </p>
              {!compact && (
                <ul className="mt-5 space-y-3">
                  {stage.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[13px] leading-relaxed">
                      <Check
                        size={14}
                        className="mt-1 shrink-0 text-[var(--color-accent-teal)]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </MotionArticle>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`/docs/first-90-days${locale === "en" ? "-en" : ""}.html`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-[var(--color-text-secondary)] underline decoration-[var(--color-border-emphasis)] underline-offset-4 hover:text-[var(--color-text-primary)]"
          >
            <ExternalLink size={14} aria-hidden="true" />
            {locale === "ru" ? "Открыть версию для печати" : "Open the print-friendly version"}
          </a>
        </div>
      </Container>
    </section>
  );
}

function ServiceFormats({ locale, detailed = false }: { locale: Locale; detailed?: boolean }) {
  const content = getSiteContent(locale);
  const items = content.services[locale];
  const hiddenPrice =
    locale === "ru"
      ? "Стоимость зависит от масштаба и формата участия. Диапазон определяется после вводного разговора."
      : "Pricing depends on scale and involvement. The range is agreed after the initial discussion.";

  const getPrice = (price: string, id: string) => {
    if (id === "ai-audit") return siteConfig.pricing.aiAudit[locale];
    if (!siteConfig.pricing.showFractionalCioPricing) return hiddenPrice;
    if (price === "executiveDiagnostic") return siteConfig.pricing.executiveDiagnostic[locale];
    if (price === "fractionalCio") return siteConfig.pricing.fractionalCio[locale];
    return siteConfig.pricing.interimCio[locale];
  };

  return (
    <div className="mt-12 grid items-stretch gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <MotionArticle
          delay={index * 0.06}
          key={item.id}
          className="flex h-full flex-col rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] p-6 md:p-7"
        >
          <div className="flex items-start justify-between gap-5">
            <span className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
              0{index + 1}
            </span>
            <span className="text-right font-mono text-[10px] text-[var(--color-text-mono)]">
              {item.format}
            </span>
          </div>
          <h3 className="mt-6 text-[22px] font-medium">{item.title}</h3>
          <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
            {item.description}
          </p>
          <p className="mt-5 border-t border-[var(--color-border-subtle)] pt-4 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
            {getPrice(item.price, item.id)}
          </p>
          {detailed && item.id === "ai-audit" && (
            <a
              href={localizedPath(locale, "/ai-audit")}
              onClick={() =>
                trackEvent("fractional_cio_to_ai_audit_click", {
                  route: typeof window === "undefined" ? "" : window.location.pathname,
                  location: "service-formats",
                  service: "ai-audit",
                  language: locale,
                })
              }
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-accent-indigo)] hover:text-[var(--color-text-primary)]"
            >
              {locale === "ru" ? "Подробнее об AI-аудите" : "Explore the AI Audit"}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </MotionArticle>
      ))}
    </div>
  );
}

function CasesPreview({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);

  return (
    <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
      {content.cases[locale].map((item, index) => (
        <MotionArticle
          delay={index * 0.07}
          key={item.slug}
          className="flex h-full flex-col rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] p-6"
        >
          <span className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
            CASE.{item.number}
          </span>
          <h3 className="mt-5 text-[19px] font-medium leading-snug">{item.title}</h3>
          <p className="mt-3 flex-1 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
            {item.context}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.capabilities.slice(0, 3).map((capability) => (
              <span
                key={capability}
                className="rounded border border-[var(--color-border-subtle)] px-2 py-1 font-mono text-[9px] text-[var(--color-text-mono)]"
              >
                {capability}
              </span>
            ))}
          </div>
        </MotionArticle>
      ))}
    </div>
  );
}

function FinalContact({
  locale,
  source,
  service = "fractional-cio",
}: {
  locale: Locale;
  source: string;
  service?: string;
}) {
  return (
    <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/55 py-20 md:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
              {locale === "ru" ? "СЛЕДУЮЩИЙ ШАГ" : "NEXT STEP"}
            </div>
            <h2 className="mt-4 max-w-[720px] text-balance text-[30px] font-medium leading-tight md:text-[42px]">
              {locale === "ru"
                ? "Сначала разберём ситуацию, затем выберем формат"
                : "Start with the situation, then choose the right format"}
            </h2>
            <p className="mt-4 max-w-[680px] text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
              {locale === "ru"
                ? "Конфиденциальный разговор без обязательства покупать услугу. Цель — понять управленческую задачу и честно определить следующий шаг."
                : "A confidential conversation with no obligation to buy. The goal is to understand the management problem and identify the right next step."}
            </p>
          </div>
          <div className="lg:text-right">
            <PrimaryCta
              locale={locale}
              source={source}
              service={service}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);
  const home = content.home;
  const path = localizedPath(locale, "/");

  return (
    <SiteShell locale={locale} currentPath={path}>
      <StructuredData locale={locale} path="/" description={home.support} />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--color-border-subtle)] py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
          <Container className="relative">
            <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              <div>
                <div className="font-mono text-[10px] uppercase text-[var(--color-accent-indigo)]">
                  {home.eyebrow}
                </div>
                <AnimatedHeading className="mt-6 max-w-[780px] text-balance text-[40px] font-medium leading-[1.04] sm:text-[50px] lg:text-[60px]">
                  {home.title}
                </AnimatedHeading>
                <Reveal delay={0.28} y={12}>
                  <p className="mt-6 max-w-[680px] text-[16px] leading-relaxed text-[var(--color-text-secondary)] md:text-[17px]">
                    {home.support}
                  </p>
                </Reveal>
                <Reveal delay={0.4} y={10} className="mt-8">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <PrimaryCta locale={locale} source="hero" className="w-full sm:w-auto" />
                    <SecondaryCta
                      href="#first-90-days"
                      className="w-full sm:w-auto"
                      onClick={() =>
                        trackEvent("first_90_days_click", {
                          route: path,
                          location: "hero",
                          service: "fractional-cio",
                          language: locale,
                        })
                      }
                    >
                      {content.cta.first90}
                    </SecondaryCta>
                  </div>
                </Reveal>
                <p className="mt-4 max-w-[650px] text-[12px] leading-relaxed text-[var(--color-text-mono)]">
                  {home.microcopy}
                </p>
                <p className="mt-8 font-mono text-[10px] leading-relaxed text-[var(--color-text-mono)]">
                  {home.proof}
                </p>
              </div>
              <Reveal delay={0.24} y={24}>
                <ExecutivePanel locale={locale} />
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "КОГДА НУЖЕН ВНЕШНИЙ CIO" : "WHEN YOU NEED A FRACTIONAL CIO"}
              title={home.situationsTitle}
              intro={home.situationsIntro}
            />
            <div className="mt-12 grid gap-x-10 gap-y-0 md:grid-cols-2">
              {home.situations.map(([title, text], index) => (
                <MotionArticle
                  delay={index * 0.06}
                  key={title}
                  className="grid grid-cols-[40px_1fr] gap-4 border-t border-[var(--color-border-subtle)] py-6"
                >
                  <span className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-medium">{title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                      {text}
                    </p>
                  </div>
                </MotionArticle>
              ))}
            </div>
          </Container>
        </section>

        <First90Days locale={locale} />

        <section className="border-t border-[var(--color-border-subtle)] py-20 md:py-28">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "ЗОНА ОТВЕТСТВЕННОСТИ" : "ACCOUNTABILITY"}
              title={home.responsibilityTitle}
              intro={home.responsibilityIntro}
            />
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {home.responsibilities.map((item, index) => (
                <div
                  key={item}
                  className="flex min-h-24 items-start gap-4 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-5"
                >
                  <span className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-[760px] text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
              {locale === "ru"
                ? "Fractional CIO — не внешний Service Desk и не круглосуточная первая линия. Это управленческая ответственность за направление, решения и результат."
                : "A Fractional CIO is not an outsourced Service Desk or 24/7 first line. It is executive accountability for direction, decisions, and outcomes."}
            </p>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/35 py-20 md:py-28">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "ФОРМАТЫ" : "ENGAGEMENT FORMATS"}
              title={home.formatsTitle}
            />
            <ServiceFormats locale={locale} />
            <div className="mt-8">
              <PrimaryCta locale={locale} source="service-formats" />
            </div>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] py-20 md:py-28">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "ВЫБРАННЫЕ КЕЙСЫ" : "SELECTED CASES"}
              title={home.casesTitle}
            />
            <CasesPreview locale={locale} />
            <SecondaryCta href={localizedPath(locale, "/cases")} className="mt-8">
              {locale === "ru" ? "Посмотреть подробные кейсы" : "View detailed cases"}
            </SecondaryCta>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/45 py-20 md:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <SectionLabel>AI · PORTFOLIO</SectionLabel>
                <h2 className="max-w-[800px] text-balance text-[30px] font-medium leading-tight md:text-[42px]">
                  {home.aiTitle}
                </h2>
                <p className="mt-5 max-w-[760px] text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                  {home.aiText}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <SecondaryCta
                  href={localizedPath(locale, "/ai-audit")}
                  onClick={() =>
                    trackEvent("fractional_cio_to_ai_audit_click", {
                      route: path,
                      location: "ai-cross-sell",
                      service: "ai-audit",
                      language: locale,
                    })
                  }
                >
                  {locale === "ru" ? "Подробнее об AI-аудите" : "Explore the AI Audit"}
                </SecondaryCta>
                <PrimaryCta locale={locale} source="ai-strategy" service="fractional-cio">
                  {locale === "ru"
                    ? "Обсудить AI в рамках ИТ-стратегии"
                    : "Discuss AI within the IT strategy"}
                </PrimaryCta>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] py-20 md:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <figure>
                <div className="aspect-[4/5] max-w-[360px] overflow-hidden rounded-md border border-[var(--color-border-emphasis)]">
                  <img
                    src="/sergey-pozdnyakov-2026.jpg"
                    alt={
                      locale === "ru"
                        ? "Сергей Поздняков, внешний ИТ-директор"
                        : "Sergey Pozdnyakov, Fractional CIO"
                    }
                    width={768}
                    height={960}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "50% 18%" }}
                  />
                </div>
              </figure>
              <div>
                <SectionTitle
                  label={locale === "ru" ? "ПРОФЕССИОНАЛЬНЫЙ ОПЫТ" : "PROFESSIONAL EXPERIENCE"}
                  title={home.credibilityTitle}
                  intro={home.credibilityText}
                />
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    [siteConfig.profile.yearsInIt, locale === "ru" ? "лет в ИТ" : "years in IT"],
                    [siteConfig.profile.stores, locale === "ru" ? "магазинов" : "stores"],
                    [siteConfig.profile.users, locale === "ru" ? "пользователей" : "users"],
                    [siteConfig.profile.skus, "SKU"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="border-t border-[var(--color-border-emphasis)] pt-4"
                    >
                      <div className="font-mono text-[26px]">{value}</div>
                      <div className="mt-1 text-[10px] text-[var(--color-text-mono)]">{label}</div>
                    </div>
                  ))}
                </div>
                <SecondaryCta href={localizedPath(locale, "/about")} className="mt-8">
                  {locale === "ru" ? "Подробнее обо мне" : "More about me"}
                </SecondaryCta>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] py-20 md:py-24">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "ПРИНЦИПЫ И ГРАНИЦЫ" : "PRINCIPLES AND BOUNDARIES"}
              title={home.principlesTitle}
            />
            <div className="mt-10 grid gap-x-10 md:grid-cols-2">
              {home.principles.map((item) => (
                <div
                  key={item}
                  className="flex gap-4 border-t border-[var(--color-border-subtle)] py-5 text-[14px] leading-relaxed"
                >
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-[var(--color-accent-teal)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <FinalContact locale={locale} source="home-final" />
      </main>
    </SiteShell>
  );
}

export function FractionalCioPage({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);
  const page = content.fractional;
  const path = localizedPath(locale, "/fractional-cio");

  useEffect(() => {
    trackEvent("fractional_cio_page_view", {
      route: path,
      service: "fractional-cio",
      language: locale,
    });
  }, [locale, path]);

  return (
    <SiteShell locale={locale} currentPath={path}>
      <StructuredData
        locale={locale}
        path="/fractional-cio"
        serviceName="Fractional CIO"
        description={page.support}
      />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--color-border-subtle)] py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
          <Container className="relative">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <div className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                  {page.eyebrow}
                </div>
                <AnimatedHeading className="mt-6 max-w-[880px] text-balance text-[40px] font-medium leading-[1.04] sm:text-[50px] lg:text-[58px]">
                  {page.title}
                </AnimatedHeading>
                <Reveal delay={0.28} y={12}>
                  <p className="mt-6 max-w-[720px] text-[16px] leading-relaxed text-[var(--color-text-secondary)] md:text-[17px]">
                    {page.support}
                  </p>
                </Reveal>
                <Reveal delay={0.4} y={10} className="mt-8">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <PrimaryCta
                      locale={locale}
                      source="fractional-hero"
                      className="w-full sm:w-auto"
                    />
                    <SecondaryCta
                      href="#first-90-days"
                      className="w-full sm:w-auto"
                      onClick={() =>
                        trackEvent("first_90_days_click", {
                          route: path,
                          location: "fractional-hero",
                          service: "fractional-cio",
                          language: locale,
                        })
                      }
                    >
                      {content.cta.first90}
                    </SecondaryCta>
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.3} y={20}>
                <div className="border-l border-[var(--color-border-emphasis)] pl-6">
                  <p className="font-mono text-[10px] text-[var(--color-text-mono)]">
                    {locale === "ru" ? "РАБОЧИЙ МАСШТАБ" : "OPERATING SCALE"}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                    {locale === "ru"
                      ? "50+ магазинов · 6 складов · 500+ пользователей · 100+ касс · международные команды и поставщики"
                      : "50+ stores · 6 warehouses · 500+ users · 100+ POS terminals · international teams and vendors"}
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "ДЛЯ КОГО" : "WHO IT IS FOR"}
              title={page.whoTitle}
              intro={page.who}
            />
            <div className="mt-10 flex flex-wrap gap-2">
              {(locale === "ru"
                ? [
                    "розничные сети",
                    "FMCG и beauty",
                    "e-commerce",
                    "омниканальный бизнес",
                    "дистрибуция",
                    "несколько стран",
                  ]
                : [
                    "retail networks",
                    "FMCG and beauty",
                    "e-commerce",
                    "omnichannel",
                    "distribution",
                    "multi-country",
                  ]
              ).map((item) => (
                <span
                  key={item}
                  className="rounded border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] px-3 py-2 font-mono text-[10px] text-[var(--color-text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/35 py-20 md:py-28">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "ДЕЛОВОЙ РЕЗУЛЬТАТ" : "BUSINESS OUTCOMES"}
              title={page.outcomesTitle}
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {page.outcomes.map(([title, text], index) => (
                <MotionArticle
                  delay={index * 0.07}
                  key={title}
                  className="rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] p-5"
                >
                  <span className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-[18px] font-medium">{title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                    {text}
                  </p>
                </MotionArticle>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] py-20 md:py-28">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "ОТВЕТСТВЕННОСТЬ" : "SCOPE"}
              title={content.home.responsibilityTitle}
              intro={content.home.responsibilityIntro}
            />
            <div className="mt-10 grid gap-x-10 md:grid-cols-2">
              {content.home.responsibilities.map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[34px_1fr] gap-3 border-t border-[var(--color-border-subtle)] py-5"
                >
                  <span className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <First90Days locale={locale} />

        <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/35 py-20 md:py-28">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "УПРАВЛЕНЧЕСКИЙ РИТМ" : "WORKING CADENCE"}
              title={page.cadenceTitle}
            />
            <div className="mt-10 grid gap-x-10 md:grid-cols-2">
              {page.cadence.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 border-t border-[var(--color-border-subtle)] py-5 text-[14px]"
                >
                  <span className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] py-20 md:py-28">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "ФОРМАТЫ РАБОТЫ" : "ENGAGEMENT FORMATS"}
              title={content.home.formatsTitle}
            />
            <ServiceFormats locale={locale} detailed />
            <div className="mt-8">
              <PrimaryCta locale={locale} source="fractional-formats" />
            </div>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/45 py-20 md:py-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionTitle
                label={locale === "ru" ? "СОВМЕСТНАЯ РАБОТА" : "COLLABORATION"}
                title={page.collaborationTitle}
              />
              <p className="text-[16px] leading-[1.8] text-[var(--color-text-secondary)]">
                {page.collaboration}
              </p>
            </div>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] py-20 md:py-28">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "ОПЫТ" : "EXPERIENCE"}
              title={content.home.casesTitle}
            />
            <CasesPreview locale={locale} />
            <SecondaryCta href={localizedPath(locale, "/cases")} className="mt-8">
              {locale === "ru" ? "Все кейсы" : "All cases"}
            </SecondaryCta>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/35 py-20 md:py-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionTitle
                label={locale === "ru" ? "ГРАНИЦЫ" : "BOUNDARIES"}
                title={page.boundariesTitle}
              />
              <p className="text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
                {page.boundaries}
              </p>
            </div>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] py-20 md:py-28">
          <Container>
            <SectionTitle label="FAQ" title={page.faqTitle} />
            <div className="mt-10 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
              {page.faq.map(([question, answer]) => (
                <details key={question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[16px] font-medium">
                    {question}
                    <ArrowDown
                      size={16}
                      className="shrink-0 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-4 max-w-[820px] text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/55 py-20 md:py-28">
          <Container>
            <SectionTitle
              label={content.contact.eyebrow}
              title={content.contact.title}
              intro={content.contact.intro}
            />
            <div className="mt-10 max-w-[860px]">
              <ContactForm
                locale={locale}
                defaultService="fractional-cio"
                source="fractional-page"
              />
            </div>
          </Container>
        </section>
      </main>
    </SiteShell>
  );
}

export function CasesPage({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);
  const page = content.casesPage;
  const path = localizedPath(locale, "/cases");

  return (
    <SiteShell locale={locale} currentPath={path}>
      <StructuredData locale={locale} path="/cases" description={page.intro} />
      <main>
        <section className="border-b border-[var(--color-border-subtle)] py-16 md:py-24">
          <Container>
            <div className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
              {page.eyebrow}
            </div>
            <h1 className="mt-6 max-w-[920px] text-balance text-[40px] font-medium leading-[1.05] sm:text-[50px] lg:text-[58px]">
              {page.title}
            </h1>
            <p className="mt-6 max-w-[760px] text-[16px] leading-relaxed text-[var(--color-text-secondary)]">
              {page.intro}
            </p>
          </Container>
        </section>

        {content.cases[locale].map((item, caseIndex) => (
          <article
            key={item.slug}
            id={item.slug}
            className={`border-b border-[var(--color-border-subtle)] py-20 md:py-28 ${
              caseIndex % 2 ? "bg-[var(--color-bg-elevated)]/30" : ""
            }`}
          >
            <Container>
              <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <span className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                    CASE.{item.number}
                  </span>
                  <h2 className="mt-5 text-balance text-[30px] font-medium leading-tight md:text-[40px]">
                    {item.title}
                  </h2>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {item.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="rounded border border-[var(--color-border-emphasis)] px-2.5 py-1 font-mono text-[9px] text-[var(--color-text-mono)]"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <CaseRow label={page.context}>{item.context}</CaseRow>
                  <CaseRow label={page.risk}>{item.risk}</CaseRow>
                  <CaseRow label={page.role}>{item.role}</CaseRow>
                  <div className="grid grid-cols-[110px_1fr] gap-5 border-t border-[var(--color-border-subtle)] py-5">
                    <h3 className="font-mono text-[10px] uppercase text-[var(--color-text-mono)]">
                      {page.actions}
                    </h3>
                    <ul className="space-y-2">
                      {item.actions.map((action) => (
                        <li key={action} className="flex gap-3 text-[14px] leading-relaxed">
                          <Check
                            size={14}
                            className="mt-1 shrink-0 text-[var(--color-accent-teal)]"
                            aria-hidden="true"
                          />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <CaseRow label={page.outcome}>{item.outcome}</CaseRow>
                </div>
              </div>
            </Container>
          </article>
        ))}

        <section className="py-12">
          <Container>
            <p className="max-w-[900px] text-[12px] leading-relaxed text-[var(--color-text-mono)]">
              {page.note}
            </p>
          </Container>
        </section>
        <FinalContact locale={locale} source="cases" />
      </main>
    </SiteShell>
  );
}

function CaseRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-5 border-t border-[var(--color-border-subtle)] py-5">
      <h3 className="font-mono text-[10px] uppercase text-[var(--color-text-mono)]">{label}</h3>
      <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)]">{children}</p>
    </div>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);
  const page = content.about;
  const path = localizedPath(locale, "/about");

  return (
    <SiteShell locale={locale} currentPath={path}>
      <StructuredData locale={locale} path="/about" description={page.opening} />
      <main>
        <section className="border-b border-[var(--color-border-subtle)] py-16 md:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <figure>
                <div className="aspect-[4/5] max-w-[390px] overflow-hidden rounded-md border border-[var(--color-border-emphasis)]">
                  <img
                    src="/sergey-pozdnyakov-2026.jpg"
                    alt={siteConfig.owner[locale]}
                    width={768}
                    height={960}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "50% 18%" }}
                  />
                </div>
              </figure>
              <div>
                <div className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                  {page.eyebrow}
                </div>
                <h1 className="mt-6 max-w-[880px] text-balance text-[38px] font-medium leading-[1.05] sm:text-[48px] lg:text-[56px]">
                  {page.title}
                </h1>
                <p className="mt-7 text-[18px] leading-[1.7] text-[var(--color-text-primary)]">
                  {page.opening}
                </p>
                <div className="mt-7 space-y-5">
                  {page.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[15px] leading-[1.75] text-[var(--color-text-secondary)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "ОПЫТ В ЦИФРАХ" : "OPERATING EXPERIENCE"}
              title={page.factsTitle}
            />
            <div className="mt-12 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {page.facts.map(([label, value]) => (
                <div
                  key={label}
                  className="border-t border-[var(--color-border-emphasis)] px-0 py-6 sm:px-5"
                >
                  <div className="font-mono text-[24px]">{value}</div>
                  <div className="mt-2 text-[11px] text-[var(--color-text-mono)]">{label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/35 py-20 md:py-28">
          <Container>
            <SectionTitle
              label={locale === "ru" ? "РАБОЧИЕ ПРИНЦИПЫ" : "OPERATING PRINCIPLES"}
              title={page.philosophyTitle}
            />
            <div className="mt-10 max-w-[900px]">
              {page.philosophy.map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[40px_1fr] gap-4 border-t border-[var(--color-border-subtle)] py-5"
                >
                  <span className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                    0{index + 1}
                  </span>
                  <p className="text-[15px] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <FinalContact locale={locale} source="about" />
      </main>
    </SiteShell>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);
  const page = content.contact;
  const path = localizedPath(locale, "/contact");

  return (
    <SiteShell locale={locale} currentPath={path}>
      <StructuredData locale={locale} path="/contact" description={page.intro} />
      <main>
        <section className="py-16 md:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <div className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                  {page.eyebrow}
                </div>
                <h1 className="mt-6 text-balance text-[40px] font-medium leading-[1.05] sm:text-[50px]">
                  {page.title}
                </h1>
                <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                  {page.intro}
                </p>
                <div className="mt-8 border-t border-[var(--color-border-subtle)] pt-6">
                  <h2 className="font-mono text-[10px] uppercase text-[var(--color-text-mono)]">
                    {page.alternatives}
                  </h2>
                  <div className="mt-4 space-y-3 text-[13px]">
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="block text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    >
                      {siteConfig.contact.email}
                    </a>
                    <a
                      href={siteConfig.contact.telegramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    >
                      Telegram · @pozdnyakov_io
                    </a>
                    <a
                      href={siteConfig.contact.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/55 p-5 sm:p-7 md:p-9">
                <ContactForm locale={locale} />
              </div>
            </div>
          </Container>
        </section>
      </main>
    </SiteShell>
  );
}

export function DiagnosticPage({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);
  const page = content.diagnostic;
  const path = localizedPath(locale, "/it-diagnostic");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const complete = answers.length === page.questions.length;
  const score = answers.reduce((total, answer) => total + answer, 0);
  const band = useMemo(
    () => page.bands.find((item) => score <= item.max) ?? page.bands[page.bands.length - 1],
    [page.bands, score],
  );

  const start = () => {
    setStarted(true);
    trackEvent("it_diagnostic_start", {
      route: path,
      location: "diagnostic-start",
      service: "it-diagnostic",
      language: locale,
    });
  };

  const answer = (value: number) => {
    const next = [...answers, value];
    setAnswers(next);
    if (next.length < page.questions.length) {
      setIndex((current) => current + 1);
    } else {
      trackEvent("it_diagnostic_complete", {
        route: path,
        location: "diagnostic-result",
        service: "it-diagnostic",
        language: locale,
      });
    }
  };

  const restart = () => {
    setStarted(false);
    setIndex(0);
    setAnswers([]);
  };

  return (
    <SiteShell locale={locale} currentPath={path}>
      <StructuredData locale={locale} path="/it-diagnostic" description={page.intro} />
      <main>
        <section className="py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-[900px]">
              <div className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                {page.eyebrow}
              </div>
              <h1 className="mt-6 max-w-[840px] text-balance text-[40px] font-medium leading-[1.05] sm:text-[50px]">
                {page.title}
              </h1>
              <p className="mt-5 max-w-[760px] text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                {page.intro}
              </p>

              {!started && (
                <div className="mt-10 rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/55 p-6 md:p-8">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      ["12", locale === "ru" ? "вопросов" : "questions"],
                      ["≈3", locale === "ru" ? "минуты" : "minutes"],
                      ["0", locale === "ru" ? "сохранённых ответов" : "stored answers"],
                    ].map(([value, label]) => (
                      <div
                        key={label}
                        className="border-l border-[var(--color-border-emphasis)] pl-4"
                      >
                        <div className="font-mono text-[24px]">{value}</div>
                        <div className="mt-1 text-[10px] text-[var(--color-text-mono)]">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={start}
                    className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)]"
                  >
                    {page.start} <span aria-hidden="true">&nbsp;→</span>
                  </button>
                </div>
              )}

              {started && !complete && (
                <div className="mt-10 rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/55 p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] text-[var(--color-text-mono)]">
                      {page.question} {index + 1} {page.of} {page.questions.length}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                      {Math.round(((index + 1) / page.questions.length) * 100)}%
                    </span>
                  </div>
                  <div
                    className="mt-3 h-1 overflow-hidden rounded-full bg-[var(--color-viz-line-soft)]"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full bg-[var(--color-accent-indigo)] transition-[width]"
                      style={{ width: `${((index + 1) / page.questions.length) * 100}%` }}
                    />
                  </div>
                  <fieldset className="mt-9">
                    <legend className="text-balance text-[22px] font-medium leading-snug md:text-[28px]">
                      {page.questions[index]}
                    </legend>
                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      {page.answers.map((label, value) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => answer(value)}
                          className="min-h-14 rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] px-4 text-[14px] transition-colors hover:border-[var(--color-accent-indigo)] hover:bg-[var(--color-accent-indigo-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)]"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {complete && (
                <div
                  className="mt-10 rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/55 p-6 md:p-8"
                  aria-live="polite"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                        {page.resultTitle}
                      </div>
                      <h2 className="mt-3 text-[28px] font-medium">{band.title}</h2>
                    </div>
                    <div className="font-mono text-[30px]">
                      {score}
                      <span className="text-[14px] text-[var(--color-text-mono)]"> / 24</span>
                    </div>
                  </div>
                  <ul className="mt-8 space-y-4">
                    {band.observations.map((observation) => (
                      <li key={observation} className="flex gap-3 text-[14px] leading-relaxed">
                        <ClipboardCheck
                          size={17}
                          className="mt-0.5 shrink-0 text-[var(--color-accent-teal)]"
                          aria-hidden="true"
                        />
                        {observation}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 border-t border-[var(--color-border-subtle)] pt-6 text-[15px] font-medium">
                    {band.next}
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <PrimaryCta locale={locale} source="diagnostic-result" />
                    <button
                      type="button"
                      onClick={restart}
                      className="min-h-11 rounded-md border border-[var(--color-border-emphasis)] px-5 py-3 text-[14px]"
                    >
                      {page.restart}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>
    </SiteShell>
  );
}
