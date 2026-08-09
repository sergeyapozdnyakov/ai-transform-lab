import { Check, CircleAlert } from "lucide-react";
import { useEffect } from "react";
import { SITE_URL, localizedPath, siteConfig, type Locale } from "../../content/site";
import { trackEvent } from "../../lib/analytics";
import { I18nProvider } from "../../lib/i18n";
import { PrimaryCta, SiteFooter, SiteHeader } from "../advisory/SiteChrome";
import {
  Approach,
  AuditOutput,
  Cases,
  Deliverable,
  LeadMagnet,
  Problem,
  WhoFor,
  Widget2Section,
} from "./Sections";
import { Widget3ROI } from "./Widget3ROI";

function AiAuditStructuredData({ locale }: { locale: Locale }) {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "ru" ? "AI-аудит процессов" : "AI Process Audit",
    description:
      locale === "ru"
        ? "Трёхнедельный аудит процессов, данных и архитектуры с открытой моделью эффекта, рисками и дорожной картой внедрения."
        : "A three-week audit of processes, data, and architecture with transparent business-case assumptions, risks, and an implementation roadmap.",
    url: `${SITE_URL}${locale === "ru" ? "/ai-audit" : "/en/ai-audit"}`,
    serviceType:
      locale === "ru"
        ? "Аудит применения искусственного интеллекта"
        : "AI opportunity and process audit",
    provider: {
      "@type": "Person",
      name: locale === "ru" ? "Сергей Поздняков" : "Sergey Pozdnyakov",
      url: SITE_URL,
    },
    areaServed: ["RU", "Europe"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
    />
  );
}
function AiAuditHero({ locale, openContact }: { locale: Locale; openContact: () => void }) {
  const copy =
    locale === "ru"
      ? {
          eyebrow: "AI.AUDIT · СПЕЦИАЛИЗИРОВАННЫЙ ПРОДУКТ",
          title: "AI-аудит процессов с открытой моделью эффекта",
          text: "За 3 недели вы получите карту процессов, приоритетные сценарии, финансовые допущения, риски и дорожную карту. AI рассматривается вместе с данными, архитектурой и ответственностью — без обещания, что он всегда является первым приоритетом.",
          proof:
            "7–12 интервью · 3 недели · отчёт 30–50 страниц · открытые формулы · 2 недели поддержки",
          secondary: "Посмотреть пакет документов",
          panelTitle: "РЕШЕНИЕ ПО ИНИЦИАТИВЕ",
          panelItems: [
            ["01", "Владелец процесса и проблема"],
            ["02", "Исходные объёмы и стоимость"],
            ["03", "Готовность данных и архитектуры"],
            ["04", "Сценарий решения: с AI или без него"],
            ["05", "Метрика, риск и условие остановки"],
          ],
        }
      : {
          eyebrow: "AI.AUDIT · SPECIALIST PRODUCT",
          title: "AI process audit with transparent business-case assumptions",
          text: "In three weeks you receive a process map, prioritized use cases, financial assumptions, risks, and a roadmap. AI is evaluated together with data, architecture, and ownership, with no promise that it is always the first priority.",
          proof:
            "7–12 interviews · 3 weeks · 30–50 page report · transparent formulas · 2 weeks of support",
          secondary: "View the deliverable package",
          panelTitle: "INITIATIVE DECISION",
          panelItems: [
            ["01", "Process owner and problem"],
            ["02", "Volumes and current cost"],
            ["03", "Data and architecture readiness"],
            ["04", "Solution scenario: with or without AI"],
            ["05", "Metric, risk, and stop condition"],
          ],
        };

  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border-subtle)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto grid w-full max-w-[1240px] gap-12 px-4 sm:px-6 md:px-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
        <div>
          <div className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
            {copy.eyebrow}
          </div>
          <h1 className="mt-6 max-w-[800px] text-balance text-[40px] font-medium leading-[1.04] sm:text-[50px] lg:text-[58px]">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-[700px] text-[16px] leading-relaxed text-[var(--color-text-secondary)]">
            {copy.text}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openContact}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] hover:bg-[var(--color-btn-primary-hover)] sm:w-auto"
            >
              {locale === "ru" ? "Разобрать ИТ-ситуацию" : "Discuss your IT situation"}
              <span aria-hidden="true">&nbsp;→</span>
            </button>
            <a
              href="#output"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-[var(--color-border-emphasis)] px-5 py-3 text-[14px] font-medium sm:w-auto"
            >
              {copy.secondary}
            </a>
          </div>
          <p className="mt-7 font-mono text-[10px] leading-relaxed text-[var(--color-text-mono)]">
            {copy.proof}
          </p>
        </div>

        <div className="rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/70 p-5 md:p-6">
          <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
            <span className="font-mono text-[10px] text-[var(--color-text-mono)]">
              {copy.panelTitle}
            </span>
            <span className="font-mono text-[9px] text-[var(--color-accent-teal)]">GO / STOP</span>
          </div>
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {copy.panelItems.map(([number, label]) => (
              <div key={number} className="grid grid-cols-[34px_1fr] gap-3 py-4">
                <span className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
                  {number}
                </span>
                <span className="text-[13px] leading-relaxed">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AiAuditCrossLink({ locale }: { locale: Locale }) {
  return (
    <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/45 py-8">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="max-w-[820px] text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
          {locale === "ru"
            ? "Нужен не только AI-аудит, а управление всей ИТ-функцией? Посмотрите формат Fractional CIO."
            : "Need leadership across the whole IT function, not only an AI audit? Explore the Fractional CIO service."}
        </p>
        <a
          href={localizedPath(locale, "/fractional-cio")}
          onClick={() =>
            trackEvent("ai_audit_to_fractional_cio_click", {
              route: typeof window === "undefined" ? "" : window.location.pathname,
              location: "ai-page-cross-link",
              service: "fractional-cio",
              language: locale,
            })
          }
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md border border-[var(--color-border-emphasis)] px-5 py-3 text-[13px] font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft-hover)]"
        >
          Fractional CIO <span aria-hidden="true">&nbsp;→</span>
        </a>
      </div>
    </section>
  );
}

function RoiSection({ locale, openContact }: { locale: Locale; openContact: () => void }) {
  return (
    <section
      id="roi"
      className="scroll-mt-20 border-t border-[var(--color-border-subtle)] py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 md:px-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
            {locale === "ru" ? "ИЛЛЮСТРАТИВНЫЙ РАСЧЁТ" : "ILLUSTRATIVE CALCULATION"}
          </span>
          <span className="h-px flex-1 bg-[var(--color-border-subtle)]" />
        </div>
        <h2 className="max-w-[820px] text-balance text-[30px] font-medium leading-tight md:text-[42px]">
          {locale === "ru"
            ? "Введите свои исходные данные — результат не появится до явного расчёта"
            : "Enter your assumptions — no result is shown until you calculate"}
        </h2>
        <p className="mb-10 mt-5 max-w-[760px] text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
          {locale === "ru"
            ? "Это проверка масштаба возможности, а не обещание окупаемости. На аудите допущения заменяются фактическими объёмами, стоимостью внедрения и диапазоном чувствительности."
            : "This is an opportunity-sizing aid, not a payback promise. During the audit, assumptions are replaced with actual volumes, implementation cost, and sensitivity ranges."}
        </p>
        <Widget3ROI onCta={openContact} />
      </div>
    </section>
  );
}

function SafeFaq({ locale }: { locale: Locale }) {
  const items =
    locale === "ru"
      ? [
          [
            "Что именно остаётся у компании после аудита?",
            "Отчёт 30–50 страниц, карта процессов, реестр сценариев, открытая финансовая модель, риски, дорожная карта на 6–12 месяцев и материалы для выбора подрядчика.",
          ],
          [
            "Обязательно ли после аудита внедрять AI?",
            "Нет. Корректным результатом может быть решение сначала исправить процесс, данные, архитектуру или распределение ответственности. Для каждой инициативы фиксируется условие, при котором её не следует начинать.",
          ],
          [
            "Нужен ли доступ к рабочим системам и персональным данным?",
            "Обычно нет. Достаточно описаний процессов, агрегированных показателей, снимков экранов и демонстрации систем. Конкретный режим доступа фиксируется заранее и минимизируется.",
          ],
          [
            "Можно ли привлечь другого подрядчика к внедрению?",
            "Да. Пакет рассчитан на независимый выбор исполнителя. Дополнительно можно заказать проверку технического задания, сметы и предложения подрядчика до старта.",
          ],
          [
            "Как фиксируется результат?",
            "До начала работ согласуются состав материалов, вопросы, которые должен закрыть аудит, и критерии приёмки. Коммерческие и юридические условия закрепляются в договоре.",
          ],
        ]
      : [
          [
            "What remains with the company after the audit?",
            "A 30–50 page report, process map, use-case register, transparent financial model, risk assessment, 6–12 month roadmap, and vendor-selection materials.",
          ],
          [
            "Must the company implement AI after the audit?",
            "No. A valid outcome may be to fix the process, data, architecture, or ownership first. Each initiative includes a condition under which it should not be launched.",
          ],
          [
            "Is production-system or personal-data access required?",
            "Usually not. Process descriptions, aggregated measures, screenshots, and system demonstrations are normally sufficient. Any access model is agreed and minimized in advance.",
          ],
          [
            "Can another vendor implement the recommendations?",
            "Yes. The package supports an independent vendor selection. A separate review of the specification, estimate, and vendor proposal is also available before launch.",
          ],
          [
            "How is the result accepted?",
            "Deliverables, questions to be answered, and acceptance criteria are agreed before work starts. Commercial and legal terms are documented in the contract.",
          ],
        ];

  return (
    <section className="border-t border-[var(--color-border-subtle)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 md:px-10">
        <div className="font-mono text-[10px] text-[var(--color-accent-indigo)]">FAQ</div>
        <h2 className="mt-5 text-[30px] font-medium md:text-[42px]">
          {locale === "ru" ? "Вопросы до начала работы" : "Questions before starting"}
        </h2>
        <div className="mt-10 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
          {items.map(([question, answer]) => (
            <details key={question} className="py-5">
              <summary className="cursor-pointer text-[16px] font-medium">{question}</summary>
              <p className="mt-4 max-w-[840px] text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiFinal({ locale }: { locale: Locale }) {
  return (
    <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/55 py-20">
      <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-4 sm:px-6 md:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="font-mono text-[10px] text-[var(--color-accent-indigo)]">
            {locale === "ru" ? "СЛЕДУЮЩИЙ ШАГ" : "NEXT STEP"}
          </div>
          <h2 className="mt-4 text-balance text-[30px] font-medium leading-tight md:text-[42px]">
            {locale === "ru"
              ? "Проверим, нужен ли вам AI-аудит или более широкая ИТ-диагностика"
              : "Determine whether you need an AI Audit or a broader IT diagnostic"}
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
            {locale === "ru"
              ? `Конфиденциально. Ответ — в течение ${siteConfig.contact.responseTimeBusinessDays} рабочего дня.`
              : `Confidential. Response within ${siteConfig.contact.responseTimeBusinessDays} business day.`}
          </p>
        </div>
        <div className="lg:text-right">
          <PrimaryCta
            locale={locale}
            source="ai-page-final"
            service="ai-audit"
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </section>
  );
}

function AiAuditContent({ locale }: { locale: Locale }) {
  const contactPath = localizedPath(locale, "/contact");
  const currentPath = localizedPath(locale, "/ai-audit");

  useEffect(() => {
    trackEvent("ai_audit_page_view", {
      route: currentPath,
      service: "ai-audit",
      language: locale,
    });
  }, [currentPath, locale]);

  const openContact = () => {
    trackEvent("primary_cta_click", {
      route: currentPath,
      location: "ai-page",
      service: "ai-audit",
      language: locale,
    });
    window.location.href = `${contactPath}?service=ai-audit&source=ai-page`;
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
      <AiAuditStructuredData locale={locale} />
      <SiteHeader locale={locale} currentPath={currentPath} service="ai-audit" />
      <main>
        <AiAuditHero locale={locale} openContact={openContact} />
        <AiAuditCrossLink locale={locale} />
        <Problem />
        <Approach openModal={openContact} />
        <AuditOutput openModal={openContact} />
        <Widget2Section />
        <WhoFor openModal={openContact} />
        <LeadMagnet openModal={openContact} />
        <Cases openModal={openContact} />
        <RoiSection locale={locale} openContact={openContact} />
        <Deliverable />
        <SafeFaq locale={locale} />
        <AiFinal locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

export function AiAuditPage({ locale }: { locale: Locale }) {
  return (
    <I18nProvider initialLang={locale}>
      <AiAuditContent locale={locale} />
    </I18nProvider>
  );
}
