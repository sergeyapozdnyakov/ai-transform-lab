# Интерактивный просмотрщик отчёта — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Листаемый «просмотрщик отчёта» из 7 разделов (RU/EN) внутри блока `AuditOutput` лендинга; карточки блока становятся точками входа в разделы; финальный экран открывает существующий `ContactModal`.

**Architecture:** Контент разделов — отдельный модуль `report-content.ts` (не в `i18n.tsx`, который уже ~100 КБ); презентация — новый компонент `Widget5ReportViewer.tsx` в стиле существующих виджетов; состояние активного раздела живёт в `AuditOutput`, чтобы карточки могли открывать нужный раздел. Проверки — расширение `scripts/validate-site-content.mjs` (в проекте нет тест-раннера, валидатор — единственный механизм автопроверки контента).

**Tech Stack:** React 19 + TanStack Start, Tailwind 4 (CSS-переменные темы), framer-motion (уже в зависимостях), bun.

**Спека:** `docs/superpowers/specs/2026-06-10-report-viewer-design.md`

---

## Контекст для исполнителя (прочитать до начала)

- Рабочая директория: `C:\Dev\Pozdnyakov_AI\ai-transform-lab`. Все команды запускать из неё.
- Все команды через **bun** (`bun --bun run ...`): системный Node 20.17 слишком старый для Vite 7.
- **В рабочей копии уже есть несвязанные правки** (`.gitignore`, `public/expert-photo.jpg`, `ContactModal.tsx`, `Sections.tsx` — см. `git status`). В коммиты добавлять **только файлы, перечисленные в задаче**, через явный `git add <путь>`. Никогда не использовать `git add -A` / `git add .`.
- `src/lib/i18n.tsx` проверяется валидатором на запрещённые англицизмы в русской части (регулярки вида `/\bAI\b/i`, `/\broadmap\b/i`). Все новые русские строки — только кириллицей (латиница допустима лишь из allowed-списка валидатора).
- Цветовая система — CSS-переменные (`var(--color-...)`), моноширинные лейблы — `font-mono text-[10px] uppercase tracking-[0.12em]`. Копировать паттерны из существующих виджетов, не изобретать свои.
- Деплой на прод по завершении — **только после отдельного подтверждения Сергея** (`bash redeploy.sh landing` из `C:\Dev\Pozdnyakov_AI`).

## Структура файлов

| Файл                                             | Действие | Ответственность                                                                                                     |
| ------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `src/components/landing/report-content.ts`       | создать  | Типы и контент 7 разделов отчёта, RU и EN                                                                           |
| `src/components/landing/Widget5ReportViewer.tsx` | создать  | Презентация просмотрщика: оглавление, страница, навигация, CTA                                                      |
| `src/lib/i18n.tsx`                               | изменить | Лейблы интерфейса просмотрщика (`reportViewer`), правки `auditOutput.cards` (убрать `href`, обновить `actionLabel`) |
| `src/components/landing/Sections.tsx`            | изменить | `AuditOutput`: состояние раздела, карточки-кнопки, рендер виджета                                                   |
| `scripts/validate-site-content.mjs`              | изменить | Проверки: 7 разделов RU=EN, честный консервативный сценарий, рендер виджета, CTA, англицизмы в русском контенте     |

---

### Task 0: Базовая линия

**Files:** нет изменений.

- [ ] **Step 1: Зафиксировать состояние рабочей копии**

Run: `git -C C:\Dev\Pozdnyakov_AI\ai-transform-lab status --short`
Expected: видны только уже известные несвязанные правки (`.gitignore`, `expert-photo.jpg`, `ContactModal.tsx`, `Sections.tsx`). Если появилось что-то новое — остановиться и спросить Сергея.

- [ ] **Step 2: Убедиться, что валидатор зелёный до начала работ**

Run: `bun scripts/validate-site-content.mjs`
Expected: `Site content checks passed`

- [ ] **Step 3: Убедиться, что сборка зелёная до начала работ**

Run: `bun --bun run build`
Expected: сборка завершается без ошибок.

---

### Task 1: Расширить валидатор (падающие проверки)

**Files:**

- Modify: `scripts/validate-site-content.mjs`

Коммит этой задачи откладывается до Task 5 (зелёного состояния), чтобы не оставлять в истории заведомо падающий валидатор.

- [ ] **Step 1: Добавить чтение новых файлов**

В `scripts/validate-site-content.mjs`, после строки `const sampleReport = read("public/docs/sample-audit-report.html");` (рядом с остальными `read(...)`) добавить:

```js
const reportContentSrc = read("src/components/landing/report-content.ts");
const widget5 = read("src/components/landing/Widget5ReportViewer.tsx");
const ruReport = reportContentSrc.slice(
  reportContentSrc.indexOf("  ru: ["),
  reportContentSrc.indexOf("  en: ["),
);
const enReport = reportContentSrc.slice(reportContentSrc.indexOf("  en: ["));
```

- [ ] **Step 2: Добавить проверки просмотрщика**

После блока проверок `auditOutput` (после `assert(indexRoute.includes("<AuditOutput openModal={openModal} />"), ...)`; это около строки 143) добавить:

```js
const countReportSections = (txt) => (txt.match(/num: "/g) || []).length;
assert(countReportSections(ruReport) === 7, "Russian report demo must have 7 sections");
assert(countReportSections(enReport) === 7, "English report demo must mirror 7 sections");
assert(
  ruReport.includes("не окупается в первый год"),
  "Russian payback demo must keep the honest conservative scenario",
);
assert(
  enReport.includes("does not pay back within the first year"),
  "English payback demo must keep the honest conservative scenario",
);
assert(widget5.includes("openModal"), "Report viewer must expose the contact CTA");
assert(sections.includes("<Widget5ReportViewer"), "AuditOutput must render the report viewer");
assert(sections.includes('id="report-viewer"'), "Report viewer must have a scroll anchor");
assert(
  i18n.includes("Получить полный пример пакета"),
  "Russian viewer CTA must offer the full sample package",
);
assert(
  i18n.includes("Get the full sample package"),
  "English viewer CTA must offer the full sample package",
);
```

- [ ] **Step 3: Включить русский контент отчёта в проверку англицизмов**

В массив `russianSurfaces` (после элемента `["src/lib/i18n.tsx", ruI18n],`) добавить строку:

```js
  ["src/components/landing/report-content.ts (ru)", ruReport],
```

- [ ] **Step 4: Запустить валидатор — убедиться, что он падает по ожидаемой причине**

Run: `bun scripts/validate-site-content.mjs`
Expected: FAIL с `ENOENT ... report-content.ts` (файла ещё нет). Это корректное «красное» состояние.

---

### Task 2: Контент-модуль `report-content.ts`

**Files:**

- Create: `src/components/landing/report-content.ts`

Источники контента: `docs/client-audit-library/roi-output-examples/sample-output-report-structure.md` и `docs/client-audit-library/roi-output-examples/01-retail-stock-roi-example.md` (обезличенный розничный пример; числа — демонстрационные, включая честный консервативный сценарий, который не окупается в первый год).

- [ ] **Step 1: Создать файл с полным содержимым**

```ts
// Контент демонстрационного отчёта для Widget5ReportViewer.
// Источник: docs/client-audit-library/roi-output-examples/ (обезличенный розничный пример).
// Держится отдельно от i18n.tsx: объёмный контент, меняется независимо от строк интерфейса.

export type ReportTable = {
  head: string[];
  rows: string[][];
};

export type ReportSection = {
  num: string;
  title: string;
  pageLabel: string;
  progress: number; // 0–100, ширина прогресс-бара чтения
  paragraphs?: string[];
  table?: ReportTable;
  list?: string[];
  isCta?: boolean;
};

export const reportContent: { ru: ReportSection[]; en: ReportSection[] } = {
  ru: [
    {
      num: "01",
      title: "Управленческое резюме",
      pageLabel: "стр. 2 / 38",
      progress: 5,
      paragraphs: [
        "Розничная дистрибуция, обезличенный пример. Аудит охватил закупку, пополнение и контроль запасов: 7 000 активных товарных позиций, 4 канала продаж, средний товарный запас 120 млн ₽.",
        "Главный эффект даёт не «разговорный помощник», а связка: карта процесса, порядок в данных, автоматизация повторяемых шагов и метрики качества.",
      ],
      table: {
        head: ["Вывод", "Оценка"],
        rows: [
          ["Ручная аналитика закупки", "50 ч в неделю на команду из 5 человек"],
          ["Потерянная маржа из-за дефицита", "576 000 ₽ в месяц"],
          ["Списания и уценки", "650 000 ₽ в месяц"],
        ],
      },
    },
    {
      num: "02",
      title: "Границы аудита",
      pageLabel: "стр. 4 / 38",
      progress: 11,
      paragraphs: [
        "Анализ основан на интервью с 9 ролями, выгрузках операций за 12 месяцев и управленческой отчётности компании. Расчёты — предварительная оценка, они уточняются перед запуском пилота.",
      ],
      table: {
        head: ["Вошло в аудит", "Не вошло"],
        rows: [
          ["Закупка, пополнение, контроль запасов", "Бухгалтерия и кадровый учёт"],
          ["Каналы продаж: магазины, сайт, оптовые отгрузки", "Маркетинговые кампании"],
        ],
      },
    },
    {
      num: "03",
      title: "Карта процессов",
      pageLabel: "стр. 9 / 38",
      progress: 24,
      paragraphs: [
        "Для каждого процесса фиксируются участники, системы, ручные операции и места, где возможна автоматизация или поддержка искусственным интеллектом.",
      ],
      table: {
        head: ["Этап", "Участник", "Ручная работа", "Возможность"],
        rows: [
          [
            "Получение данных",
            "Закупщик",
            "Выгрузка и сведение таблиц",
            "Автоматическая витрина данных",
          ],
          [
            "Анализ исключений",
            "Категорийный менеджер",
            "Ручной поиск причин отклонений",
            "Пояснения к отклонениям",
          ],
          [
            "Заказ поставщику",
            "Руководитель закупок",
            "Ручная корректировка заказа",
            "Рекомендации по пополнению",
          ],
        ],
      },
    },
    {
      num: "04",
      title: "Реестр узких мест",
      pageLabel: "стр. 17 / 38",
      progress: 45,
      paragraphs: [
        "Каждое узкое место описывается как проверяемая гипотеза: как проверить, какой метрикой измерить, какой приоритет.",
      ],
      table: {
        head: ["Узкое место", "Как проверить", "Приоритет"],
        rows: [
          ["Остатки расходятся между системами", "Сверить остатки по источникам", "Высокий"],
          [
            "Ходовые позиции выпадают из наличия",
            "Связать дефицит с потерянными продажами",
            "Высокий",
          ],
          ["Деньги заморожены в неликвидах", "Доля медленного запаса (12% в примере)", "Средний"],
        ],
      },
    },
    {
      num: "05",
      title: "Расчёт окупаемости",
      pageLabel: "стр. 23 / 38",
      progress: 61,
      paragraphs: [
        "База эффекта в примере — 19,4 млн ₽ в год: ручная аналитика, потерянная маржа из-за дефицита, списания и уценки. К базе применяются осторожные коэффициенты улучшения. Стоимость запуска пилота — 2,4 млн ₽, владение — 180 000 ₽ в месяц.",
      ],
      table: {
        head: ["Сценарий", "Валовый эффект в год", "Окупаемость"],
        rows: [
          ["Консервативный", "2,24 млн ₽", "не окупается в первый год"],
          ["Базовый", "4,18 млн ₽", "около 14 месяцев"],
          ["Высокий", "6,35 млн ₽", "около 7 месяцев"],
        ],
      },
      list: [
        "Консервативный сценарий честно показывает: широкий проект с такой стоимостью запуска не оправдан — нужен более узкий пилот. Это нормальный результат аудита, он экономит бюджет.",
      ],
    },
    {
      num: "06",
      title: "Дорожная карта 90 дней",
      pageLabel: "стр. 31 / 38",
      progress: 82,
      table: {
        head: ["Недели", "Что происходит"],
        rows: [
          ["1–2", "Владельцы процессов, критерии успеха, источники данных"],
          ["3–6", "Пилот на 2–3 товарных категориях, очистка ключевых данных"],
          ["7–10", "Метрики качества, сравнение рекомендаций с решениями закупщика"],
          ["11–12", "Решение о масштабировании или остановке"],
        ],
      },
    },
    {
      num: "07",
      title: "Полный пакет — по запросу",
      pageLabel: "стр. 38 / 38",
      progress: 100,
      paragraphs: ["Выше — фрагменты. В полном примере пакета дополнительно:"],
      list: [
        "Модель окупаемости с открытыми формулами и проверкой чувствительности",
        "Черновик требований к пилоту",
        "Критерии выбора подрядчика и вопросы до подписания договора",
        "Программа интервью и список данных для подготовки",
      ],
      isCta: true,
    },
  ],
  en: [
    {
      num: "01",
      title: "Executive summary",
      pageLabel: "p. 2 / 38",
      progress: 5,
      paragraphs: [
        "Retail distribution, anonymized example. The audit covered purchasing, replenishment, and stock control: 7,000 active SKUs, 4 sales channels, average inventory of 120M ₽.",
        "The main effect comes not from a chat assistant but from the chain: process map, clean data, automation of repeatable steps, and quality metrics.",
      ],
      table: {
        head: ["Finding", "Estimate"],
        rows: [
          ["Manual purchasing analytics", "50 h/week across a team of 5"],
          ["Margin lost to stock-outs", "576,000 ₽ per month"],
          ["Write-offs and markdowns", "650,000 ₽ per month"],
        ],
      },
    },
    {
      num: "02",
      title: "Audit scope",
      pageLabel: "p. 4 / 38",
      progress: 11,
      paragraphs: [
        "The analysis is based on interviews with 9 roles, 12 months of transaction exports, and the company's management reporting. Figures are preliminary estimates refined before a pilot starts.",
      ],
      table: {
        head: ["In scope", "Out of scope"],
        rows: [
          ["Purchasing, replenishment, stock control", "Accounting and HR records"],
          ["Sales channels: stores, website, wholesale", "Marketing campaigns"],
        ],
      },
    },
    {
      num: "03",
      title: "Process map",
      pageLabel: "p. 9 / 38",
      progress: 24,
      paragraphs: [
        "For each process we record participants, systems, manual operations, and where automation or AI support is possible.",
      ],
      table: {
        head: ["Stage", "Owner", "Manual work", "Opportunity"],
        rows: [
          ["Data collection", "Buyer", "Exporting and merging spreadsheets", "Automated data mart"],
          [
            "Exception analysis",
            "Category manager",
            "Manual root-cause hunting",
            "Explained deviations",
          ],
          [
            "Supplier ordering",
            "Head of purchasing",
            "Manual order adjustments",
            "Replenishment recommendations",
          ],
        ],
      },
    },
    {
      num: "04",
      title: "Bottleneck register",
      pageLabel: "p. 17 / 38",
      progress: 45,
      paragraphs: [
        "Every bottleneck is framed as a testable hypothesis: how to verify it, which metric to use, and its priority.",
      ],
      table: {
        head: ["Bottleneck", "How to verify", "Priority"],
        rows: [
          ["Stock figures differ across systems", "Reconcile stock across sources", "High"],
          ["Best-sellers go out of stock", "Link stock-outs to lost sales", "High"],
          ["Cash frozen in slow stock", "Share of slow inventory (12% in the example)", "Medium"],
        ],
      },
    },
    {
      num: "05",
      title: "Payback calculation",
      pageLabel: "p. 23 / 38",
      progress: 61,
      paragraphs: [
        "The effect base in the example is 19.4M ₽ per year: manual analytics, margin lost to stock-outs, write-offs and markdowns. Conservative improvement factors are applied to the base. Pilot launch cost is 2.4M ₽; ownership cost is 180,000 ₽ per month.",
      ],
      table: {
        head: ["Scenario", "Gross effect per year", "Payback"],
        rows: [
          ["Conservative", "2.24M ₽", "does not pay back within the first year"],
          ["Base", "4.18M ₽", "about 14 months"],
          ["High", "6.35M ₽", "about 7 months"],
        ],
      },
      list: [
        "The conservative scenario is honest: a broad project at this launch cost is not justified — a narrower pilot is needed. That is a normal audit outcome, and it protects the budget.",
      ],
    },
    {
      num: "06",
      title: "90-day roadmap",
      pageLabel: "p. 31 / 38",
      progress: 82,
      table: {
        head: ["Weeks", "What happens"],
        rows: [
          ["1–2", "Process owners, success criteria, data sources"],
          ["3–6", "Pilot on 2–3 product categories, cleaning key data"],
          ["7–10", "Quality metrics, comparing recommendations with buyer decisions"],
          ["11–12", "Scale-up or stop decision"],
        ],
      },
    },
    {
      num: "07",
      title: "Full package — on request",
      pageLabel: "p. 38 / 38",
      progress: 100,
      paragraphs: ["Above are fragments. The full sample package additionally includes:"],
      list: [
        "Payback model with open formulas and sensitivity checks",
        "Draft pilot requirements",
        "Vendor selection criteria and questions to ask before signing",
        "Interview program and the data checklist for preparation",
      ],
      isCta: true,
    },
  ],
};
```

- [ ] **Step 2: Проверить линтером**

Run: `bun --bun run lint`
Expected: ошибок по `report-content.ts` нет (предупреждения по другим файлам, если были раньше, не считаются).

- [ ] **Step 3: Коммит**

```bash
git add src/components/landing/report-content.ts
git commit -m "feat: add demo report content module (ru/en) for report viewer"
```

---

### Task 3: Строки интерфейса в `i18n.tsx`

**Files:**

- Modify: `src/lib/i18n.tsx` (русский блок `auditOutput` ~строки 150–188, английский ~строки 774–812)

- [ ] **Step 1: Обновить карточки русского блока `auditOutput.cards`**

Убрать поля `href`, обновить `actionLabel` у карточек 2–4. Было/стало (русский блок, ~строки 154–179):

```ts
      cards: [
        {
          title: "Отчёт 30–50 страниц",
          text: "Карта процессов, узкие места, приоритеты внедрения, риски, рекомендации и краткое резюме для собственника.",
          actionLabel: "Посмотреть пример отчёта",
        },
        {
          title: "Расчёт окупаемости",
          text: "Открытые формулы: затраты, ожидаемый эффект, срок окупаемости, чувствительность расчёта и допущения.",
          actionLabel: "Посмотреть пример расчёта",
        },
        {
          title: "Дорожная карта",
          text: "Что внедрять в первые 90 дней, что планировать на 6–12 месяцев, какие зависимости и метрики контролировать.",
          actionLabel: "Посмотреть дорожную карту",
        },
        {
          title: "Пакет для старта проекта",
          text: "Черновик требований, критерии выбора подрядчика, риски интеграции и вопросы, которые стоит задать до подписания договора.",
          actionLabel: "Что входит в полный пакет",
        },
      ],
```

- [ ] **Step 2: Добавить русские лейблы просмотрщика**

Сразу после закрывающей скобки объекта `auditOutput` в русском блоке (после `support: {...},` и `},` — ~строка 188) добавить новый ключ на том же уровне, что `auditOutput`:

```ts
    reportViewer: {
      docLabel: "Пример отчёта · обезличено",
      back: "Назад",
      next: "Вперёд",
      cta: "Получить полный пример пакета",
      fragmentLabel: "фрагмент примера · полная версия 38 страниц",
    },
```

- [ ] **Step 3: Обновить карточки английского блока `auditOutput.cards`**

Аналогично (~строки 778–803):

```ts
      cards: [
        {
          title: "30–50 page report",
          text: "Process map, bottlenecks, implementation priorities, risks, recommendations, and an executive summary for the owner.",
          actionLabel: "See sample report",
        },
        {
          title: "Payback calculation",
          text: "Open formulas: cost, expected effect, payback period, sensitivity, and assumptions behind the estimate.",
          actionLabel: "See sample calculation",
        },
        {
          title: "Roadmap",
          text: "What to launch in the first 90 days, what to plan for 6–12 months, and which dependencies and metrics to control.",
          actionLabel: "See the roadmap",
        },
        {
          title: "Project launch package",
          text: "Draft requirements, vendor selection criteria, integration risks, and questions to ask before signing the contract.",
          actionLabel: "What's in the full package",
        },
      ],
```

- [ ] **Step 4: Добавить английские лейблы просмотрщика**

После закрывающей скобки английского `auditOutput` (~строка 812):

```ts
    reportViewer: {
      docLabel: "Sample report · anonymized",
      back: "Back",
      next: "Next",
      cta: "Get the full sample package",
      fragmentLabel: "sample fragment · full version is 38 pages",
    },
```

- [ ] **Step 5: Проверить, что TypeScript-формы ru/en совпадают**

Run: `bun --bun run lint`
Expected: нет новых ошибок. (Тип словаря выводится из объекта `ru`; если формы ru/en разошлись — линт/сборка укажет на это в Task 5.)

**Важно:** `Sections.tsx` пока обращается к `card.href` — сборка/линт могут падать по этому месту до выполнения Task 4 (карточки переписываются там). Это ожидаемо; коммит i18n делаем сразу, он самостоятельный по смыслу.

- [ ] **Step 6: Коммит**

```bash
git add src/lib/i18n.tsx
git commit -m "feat: add report viewer labels, retarget audit output cards to viewer"
```

---

### Task 4: Компонент `Widget5ReportViewer.tsx`

**Files:**

- Create: `src/components/landing/Widget5ReportViewer.tsx`

Компонент контролируемый: активный раздел и его смена приходят из `AuditOutput` (Task 5), чтобы карточки могли открывать конкретный раздел. Смена языка не сбрасывает активный раздел (state живёт у родителя, контент берётся по `lang`).

- [ ] **Step 1: Создать файл с полным содержимым**

```tsx
import { motion } from "framer-motion";
import { useI18n } from "../../lib/i18n";
import { reportContent } from "./report-content";

export function Widget5ReportViewer({
  active,
  onSelect,
  openModal,
}: {
  active: number;
  onSelect: (index: number) => void;
  openModal: () => void;
}) {
  const { lang, t } = useI18n();
  const rv = t.reportViewer;
  const sections = reportContent[lang];
  const safe = Math.min(Math.max(active, 0), sections.length - 1);
  const s = sections[safe];
  const go = (d: number) => onSelect(Math.min(sections.length - 1, Math.max(0, safe + d)));

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]">
      {/* Шапка документа */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] px-4 py-3 md:px-5">
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-mono)]">
          {rv.docLabel}
        </span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-accent-teal)] tabular-nums">
          {s.pageLabel}
        </span>
      </div>
      <div className="h-0.5 bg-[var(--color-border-subtle)]">
        <div
          className="h-full bg-[var(--color-accent-indigo)] transition-all duration-300"
          style={{ width: `${s.progress}%` }}
        />
      </div>

      <div className="grid md:grid-cols-[240px_1fr]">
        {/* Оглавление: колонка на десктопе, горизонтальная лента на мобайле */}
        <nav className="flex overflow-x-auto border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] md:flex-col md:overflow-visible md:border-b-0 md:border-r md:py-3">
          {sections.map((sec, i) => (
            <button
              key={sec.num}
              onClick={() => onSelect(i)}
              className={`shrink-0 whitespace-nowrap border-l-2 px-4 py-2.5 text-left text-[12.5px] transition-colors md:whitespace-normal ${
                i === safe
                  ? "border-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo-soft)] text-[var(--color-text-primary)]"
                  : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <span className="mr-2 font-mono text-[10px] text-[var(--color-text-mono)] tabular-nums">
                {sec.num}
              </span>
              {sec.title}
            </button>
          ))}
        </nav>

        {/* Страница раздела */}
        <motion.div
          key={`${lang}-${safe}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[420px] min-w-0 p-5 md:p-7"
        >
          <h3 className="text-[18px] font-medium tracking-tight text-[var(--color-text-primary)]">
            {s.title}
          </h3>
          <div className="mt-1 mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-mono)]">
            {rv.fragmentLabel}
          </div>
          {s.paragraphs?.map((p, i) => (
            <p
              key={i}
              className="mb-3 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]"
            >
              {p}
            </p>
          ))}
          {s.table && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[12.5px]">
                <thead>
                  <tr>
                    {s.table.head.map((h) => (
                      <th
                        key={h}
                        className="border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] px-3 py-2 text-left font-medium text-[var(--color-text-primary)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="border border-[var(--color-border-subtle)] px-3 py-2 align-top text-[var(--color-text-secondary)]"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {s.list && (
            <ul className="mt-3 space-y-2.5">
              {s.list.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[13.5px] leading-snug text-[var(--color-text-primary)]"
                >
                  <span className="mt-0.5 font-mono text-[10px] text-[var(--color-accent-indigo)] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {s.isCta && (
            <button
              onClick={openModal}
              className="mt-6 rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] transition-colors hover:bg-[var(--color-btn-primary-hover)]"
            >
              {rv.cta} →
            </button>
          )}
        </motion.div>
      </div>

      {/* Нижняя панель: навигация + дублирующий CTA */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] px-4 py-3 md:px-5">
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            disabled={safe === 0}
            className="rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] px-3.5 py-2 text-[13px] text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← {rv.back}
          </button>
          <button
            onClick={() => go(1)}
            disabled={safe === sections.length - 1}
            className="rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] px-3.5 py-2 text-[13px] text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {rv.next} →
          </button>
        </div>
        <button
          onClick={openModal}
          className="text-[13px] font-medium text-[var(--color-text-strong)] transition-colors hover:text-[var(--color-accent-indigo)]"
        >
          {rv.cta} →
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Линт**

Run: `bun --bun run lint`
Expected: нет ошибок по `Widget5ReportViewer.tsx`.

- [ ] **Step 3: Коммит**

```bash
git add src/components/landing/Widget5ReportViewer.tsx
git commit -m "feat: add interactive report viewer widget"
```

---

### Task 5: Подключение в `AuditOutput` (`Sections.tsx`)

**Files:**

- Modify: `src/components/landing/Sections.tsx` (функция `AuditOutput`, ~строки 499–590; импорты ~строки 1–7)
- Commit also: `scripts/validate-site-content.mjs` (изменения из Task 1)

- [ ] **Step 1: Добавить импорты**

После строки `import { Widget4ProcessMap } from "./Widget4ProcessMap";` добавить:

```tsx
import { Widget5ReportViewer } from "./Widget5ReportViewer";
```

В первой строке файла к импорту React-хуков ничего добавлять не нужно (`useState` уже импортирован).

- [ ] **Step 2: Переписать `AuditOutput`**

Заменить существующую функцию `export function AuditOutput({ openModal }...)` целиком на:

```tsx
export function AuditOutput({ openModal }: { openModal: () => void }) {
  const { t } = useI18n();
  const Icons = [Briefcase, BadgeDollarSign, Workflow, ShieldCheck];
  // Карточка → раздел просмотрщика: отчёт 01, расчёт 05, дорожная карта 06, пакет 07 (CTA).
  const cardSection = [0, 4, 5, 6];
  const [section, setSection] = useState(0);
  const openViewerAt = (card: number) => {
    setSection(cardSection[card]);
    document
      .getElementById("report-viewer")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-24 md:py-32 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/35">
      <Container>
        <FadeIn>
          <SectionLabel>{t.auditOutput.label}</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="max-w-[820px] text-balance text-[28px] font-medium leading-[1.12] tracking-[-0.025em] md:text-[40px]">
            {t.auditOutput.title}
          </h2>
          <p className="mt-5 max-w-[720px] text-[15px] leading-relaxed text-[var(--color-text-secondary)] md:text-[16px]">
            {t.auditOutput.sub}
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.auditOutput.cards.map((card, i) => {
            const Icon = Icons[i];
            return (
              <FadeIn key={card.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-5">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] text-[var(--color-accent-indigo)]">
                      <Icon size={17} strokeWidth={1.7} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-mono)] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-medium leading-tight text-[var(--color-text-primary)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                    {card.text}
                  </p>
                  <div className="mt-5 border-t border-[var(--color-border-subtle)] pt-4">
                    <button
                      onClick={() => openViewerAt(i)}
                      className="text-left text-[13px] font-medium text-[var(--color-text-strong)] transition-colors hover:text-[var(--color-accent-indigo)]"
                    >
                      {card.actionLabel} →
                    </button>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.1}>
          <div id="report-viewer" className="mt-10 scroll-mt-24">
            <Widget5ReportViewer active={section} onSelect={setSection} openModal={openModal} />
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-6 rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] p-5 md:p-6">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent-teal)]">
                  {t.auditOutput.support.title}
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-text-primary)]">
                  {t.auditOutput.support.included}
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {t.auditOutput.support.separate}
                </p>
              </div>
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-surface-soft)] px-5 py-3 text-[14px] font-medium text-[var(--color-text-strong)] transition-colors hover:bg-[var(--color-surface-soft-hover)]"
              >
                {t.auditOutput.support.button} →
              </button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
```

Изменения относительно текущей версии: добавлены `cardSection`/`section`/`openViewerAt`; блок действия карточки сведён к одной кнопке (`isModalAction` и ветка `<a href=...>` удалены); добавлен блок `#report-viewer` с виджетом между сеткой карточек и панелью сопровождения. Остальная разметка не тронута.

- [ ] **Step 3: Валидатор — теперь зелёный**

Run: `bun scripts/validate-site-content.mjs`
Expected: `Site content checks passed`

- [ ] **Step 4: Линт и прод-сборка**

Run: `bun --bun run lint && bun --bun run build`
Expected: обе команды зелёные.

- [ ] **Step 5: Проверить, что сборка не оставила хвост в `routeTree.gen.ts`**

Run: `git diff --stat src/routeTree.gen.ts`
Expected: пустой вывод (файл не изменён).

- [ ] **Step 6: Коммит (вместе с валидатором из Task 1)**

```bash
git add src/components/landing/Sections.tsx scripts/validate-site-content.mjs
git commit -m "feat: wire report viewer into AuditOutput, cards open viewer sections"
```

**Внимание:** в `Sections.tsx` есть посторонние незакоммиченные правки, сделанные до этого проекта. Перед коммитом выполнить `git diff src/components/landing/Sections.tsx` и убедиться, что в diff попали только изменения `AuditOutput` и импорта. Если посторонние правки смешались — остановиться и согласовать с Сергеем (например, закоммитить их отдельно до этого шага).

---

### Task 6: Ручная проверка в браузере

**Files:** нет изменений.

- [ ] **Step 1: Запустить dev-сервер**

Run: `bun --bun run dev`
Expected: сайт на `http://localhost:8080`.

- [ ] **Step 2: Пройти чеклист**

1. Блок «На выходе»: видны 4 карточки и просмотрщик под ними.
2. Клик «Посмотреть пример отчёта» (карточка 1) — плавный скролл к просмотрщику, открыт раздел 01.
3. Клик «Посмотреть пример расчёта» (карточка 2) — открыт раздел 05 с таблицей трёх сценариев, в консервативном — «не окупается в первый год».
4. Клик «Посмотреть дорожную карту» (карточка 3) — раздел 06.
5. Клик «Что входит в полный пакет» (карточка 4) — раздел 07, кнопка «Получить полный пример пакета» открывает `ContactModal`.
6. Кнопки «Назад/Вперёд» листают разделы; на первом разделе «Назад» неактивна, на последнем неактивна «Вперёд»; CTA в нижней панели открывает модал из любого раздела.
7. Переключить RU → EN: контент просмотрщика на английском, активный раздел сохранился.
8. Сузить окно до 390px: оглавление стало горизонтальной лентой, таблицы скроллятся внутри, горизонтального переполнения страницы нет.
9. Переключить светлую тему: просмотрщик читабелен (цвета — через переменные темы).

Expected: все 9 пунктов проходят. Любой непроход — исправить до перехода дальше.

- [ ] **Step 3: Финальный прогон всех проверок**

Run: `bun scripts/validate-site-content.mjs && bun --bun run lint && bun --bun run build`
Expected: всё зелёное.

- [ ] **Step 4: Коммит плана (если ещё не закоммичен) и завершение**

```bash
git add docs/superpowers/plans/2026-06-10-report-viewer.md
git commit -m "docs: implementation plan for report viewer"
```

Деплой (`bash redeploy.sh landing`) — **только после отдельного подтверждения Сергея**.
