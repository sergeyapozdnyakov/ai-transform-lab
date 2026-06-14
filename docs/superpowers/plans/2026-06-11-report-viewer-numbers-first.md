# Просмотрщик отчёта, итерация 2 («цифры вперёд») — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Перевернуть подачу просмотрщика: KPI-витрина с анимированными цифрами над документом, разделы открываются крупным выводом и собирательной цитатой, таблицы под раскрывашкой, мини-калькулятор «про вас» в разделе окупаемости, CTA «Посчитать такие цифры по вашей компании».

**Architecture:** Структура `report-content.ts` меняется на `{ ru: ReportLocale, en: ReportLocale }` с `kpis` и `sections`; `Widget5ReportViewer` рендерит вывод/цитату/details/калькулятор; KPI-витрина и обобщённый `Counter` (десятичные) — в `Sections.tsx`; валидатор обновляет маркеры слайса и получает новые проверки.

**Tech Stack:** как в итерации 1 (React 19, Tailwind 4, framer-motion, bun).

**Спека:** `docs/superpowers/specs/2026-06-11-report-viewer-numbers-first-design.md`

## Контекст для исполнителя

- Рабочая директория `C:\Dev\Pozdnyakov_AI\ai-transform-lab`; все команды через bun.
- Коммитить только файлы своей задачи, точечный `git add`. Запрещены `git add -A`/`git add .`, push, `bun --bun run format` по всему репо (точечно: `bunx prettier --write <файл>`).
- После сборки проверять `git status --short src/routeTree.gen.ts`; при diff — `git restore src/routeTree.gen.ts`.
- Русские строки в `i18n.tsx` и в `ru`-части `report-content.ts` — только кириллицей (валидатор бьёт латинские англицизмы).

## Структура файлов

| Файл | Действие |
|---|---|
| `scripts/validate-site-content.mjs` | маркеры `ru: {`/`en: {`, новые проверки (Task 1, коммит в Task 5) |
| `src/components/landing/report-content.ts` | новая структура + переписанный контент (Task 2) |
| `src/lib/i18n.tsx` | 6 новых ключей в `reportViewer` ru/en (Task 3) |
| `src/components/landing/Widget5ReportViewer.tsx` | вывод, цитата, details, калькулятор, ctaCalc (Task 4) |
| `src/components/landing/Sections.tsx` | KPI-витрина, Counter с decimals, openViewerSection (Task 5) |

---

### Task 1: Валидатор (красный)

- [ ] В `scripts/validate-site-content.mjs` заменить маркеры слайса:

```js
const ruReport = reportContentSrc.slice(
  reportContentSrc.indexOf("  ru: {"),
  reportContentSrc.indexOf("  en: {"),
);
const enReport = reportContentSrc.slice(reportContentSrc.indexOf("  en: {"));
```

- [ ] После существующего блока проверок просмотрщика (после assert про "Get the full sample package") добавить:

```js
const countKpis = (txt) => (txt.match(/tone: "/g) || []).length;
assert(countKpis(ruReport) === 4, "Russian report demo must have 4 KPI tiles");
assert(countKpis(enReport) === 4, "English report demo must mirror 4 KPI tiles");
assert(
  ruReport.includes("собирательная реплика"),
  "Russian quotes must be marked as composite",
);
assert(enReport.includes("composite line"), "English quotes must be marked as composite");
assert(
  i18n.includes("Посчитать такие цифры по вашей компании"),
  "Russian calc CTA must be present",
);
assert(i18n.includes("Get these numbers for your company"), "English calc CTA must be present");
assert(widget5.includes("4.3"), "Report viewer must include the manual-work calculator formula");
```

- [ ] Запустить `bun scripts/validate-site-content.mjs` — ожидается падение (старая структура `ru: [` не находится новыми маркерами → счётчики разделов = 0). Не коммитить (коммит в Task 5).

### Task 2: `report-content.ts` — новая структура и контент

- [ ] Заменить файл целиком (полный текст в приложении A ниже). Ключевые проверки самоконтроля: 7 разделов и 4 KPI на язык; `tableOpen: true` и `calc: true` только в разделе 05; цитаты в 01/03/04 с пометкой собирательности; строки «не окупается в первый год» / "does not pay back within the first year" сохранены; без имён людей и компаний.
- [ ] `bun --bun run lint` (точечно по файлу), коммит: `feat: numbers-first report content — KPIs, takeaways, composite quotes`

### Task 3: `i18n.tsx` — ключи калькулятора и нового CTA

- [ ] Заменить объект `reportViewer` в русском блоке на:

```ts
    reportViewer: {
      docLabel: "Пример отчёта · обезличено",
      back: "Назад",
      next: "Вперёд",
      cta: "Получить полный пример пакета",
      ctaCalc: "Посчитать такие цифры по вашей компании",
      fragmentLabel: "фрагмент примера · полная версия 38 страниц",
      calcTitle: "А сколько теряете вы? Грубая прикидка за 10 секунд",
      calcLabel: "Людей в ручной аналитике",
      calcResult: "Только ручной труд:",
      calcUnit: "млн ₽/год",
      calcNote: "без учёта дефицита и списаний",
    },
```

- [ ] И в английском блоке на:

```ts
    reportViewer: {
      docLabel: "Sample report · anonymized",
      back: "Back",
      next: "Next",
      cta: "Get the full sample package",
      ctaCalc: "Get these numbers for your company",
      fragmentLabel: "sample fragment · full version is 38 pages",
      calcTitle: "How much are you losing? A rough 10-second estimate",
      calcLabel: "People doing manual analytics",
      calcResult: "Manual work alone:",
      calcUnit: "M ₽/yr",
      calcNote: "excluding stock-outs and write-offs",
    },
```

- [ ] Коммит: `feat: report viewer calc/CTA strings (ru/en)`

### Task 4: `Widget5ReportViewer.tsx` — рендер новой подачи

- [ ] Заменить файл целиком (полный текст в приложении B). Самоконтроль: нижняя панель использует `rv.ctaCalc`; кнопка раздела 07 — `rv.cta`; формула `people * 10 * 1_800 * 4.3 * 12`; `details open={s.tableOpen || undefined}`.
- [ ] `bun --bun run lint`, коммит: `feat: report viewer renders takeaways, quotes, collapsible tables, mini-calc`

### Task 5: `Sections.tsx` — KPI-витрина + Counter

- [ ] Импорт: `import { reportContent } from "./report-content";`
- [ ] Обобщить `Counter` (десятичные и запятая):

```tsx
function Counter({
  to,
  decimals = 0,
  comma = false,
}: {
  to: number;
  decimals?: number;
  comma?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(eased * to);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  const txt = n.toFixed(decimals);
  return (
    <span ref={ref} className="tabular-nums">
      {comma ? txt.replace(".", ",") : txt}
    </span>
  );
}
```

(Существующий вызов `<Counter to={e.card.years} />` совместим.)

- [ ] В `AuditOutput`: получить `lang` (`const { t, lang } = useI18n();`), добавить `const locale = reportContent[lang];`, обобщить скролл:

```tsx
  const openViewerSection = (sec: number) => {
    setSection(sec);
    document
      .getElementById("report-viewer")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const openViewerAt = (card: number) => openViewerSection(cardSection[card]);
```

- [ ] Между сеткой карточек и блоком `#report-viewer` вставить KPI-витрину:

```tsx
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {locale.kpis.map((k, i) => (
            <FadeIn key={k.section} delay={i * 0.06}>
              <button
                onClick={() => openViewerSection(k.section)}
                className="group flex h-full w-full flex-col rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-4 text-left transition-colors hover:border-[var(--color-accent-indigo)] md:p-5"
              >
                <span
                  className={`font-mono text-[24px] leading-none tracking-[-0.02em] tabular-nums md:text-[28px] ${
                    k.tone === "teal"
                      ? "text-[var(--color-accent-teal)]"
                      : "text-[var(--color-accent-amber)]"
                  }`}
                >
                  {k.prefix}
                  <Counter to={k.value} decimals={k.decimals ?? 0} comma={lang === "ru"} />
                  <span className="text-[13px] text-[var(--color-text-secondary)]">{k.suffix}</span>
                </span>
                <span className="mt-3 flex-1 text-[12.5px] leading-snug text-[var(--color-text-secondary)]">
                  {k.text}
                </span>
                <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-mono)] transition-colors group-hover:text-[var(--color-accent-indigo)]">
                  → {locale.sections[k.section].num}
                </span>
              </button>
            </FadeIn>
          ))}
        </div>
```

KPI-витрина вставляется между сеткой карточек (`mt-10 grid ... lg:grid-cols-4`) и блоком `<FadeIn delay={0.1}><div id="report-viewer" ...`.

- [ ] Проверки: валидатор зелёный, lint, build, routeTree-guard.
- [ ] Коммит двух файлов: `git add src/components/landing/Sections.tsx scripts/validate-site-content.mjs`, сообщение `feat: KPI strip with animated counters opens report viewer sections`

### Task 6: Браузерный QA

Чеклист: 4 KPI-плитки кликабельны и ведут в разделы 01/03/04/05; счётчики анимируются; разделы открываются выводом+цитатой; таблицы раскрываются (05 — открыта сразу); слайдер пересчитывает «X млн ₽/год» (5 → 4,6; 20 → 18,6); нижний CTA «Посчитать…» и CTA раздела 07 открывают модал; RU/EN с сохранением раздела; 390px без переполнения (витрина 2×2); светлая тема.

---

## Приложение A: полный `report-content.ts`

```ts
// Контент демонстрационного отчёта для Widget5ReportViewer.
// Источник: docs/client-audit-library/roi-output-examples/ (обезличенный розничный пример).
// Держится отдельно от i18n.tsx: объёмный контент, меняется независимо от строк интерфейса.

export type ReportTable = {
  head: string[];
  rows: string[][];
};

export type ReportKpi = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  text: string;
  section: number; // индекс раздела, который открывает плитка
  tone: "amber" | "teal";
};

export type ReportQuote = {
  text: string;
  who: string;
};

export type ReportSection = {
  num: string;
  title: string;
  pageLabel: string;
  progress: number; // 0–100, ширина прогресс-бара чтения
  takeaway?: string; // крупная цифра-вывод в шапке раздела
  takeawayTone?: "amber" | "teal";
  takeawayText?: string;
  paragraphs?: string[];
  quote?: ReportQuote;
  table?: ReportTable;
  tableLabel?: string; // подпись раскрывашки таблицы
  tableOpen?: boolean; // раздел 05: таблица раскрыта сразу
  list?: string[];
  calc?: boolean; // раздел 05: мини-калькулятор ручного труда
  isCta?: boolean;
};

export type ReportLocale = {
  kpis: ReportKpi[];
  sections: ReportSection[];
};

export const reportContent: { ru: ReportLocale; en: ReportLocale } = {
  ru: {
    kpis: [
      {
        value: 19.4,
        decimals: 1,
        suffix: " млн ₽/год",
        text: "измеренные потери: ручной труд, дефицит, списания",
        section: 0,
        tone: "amber",
      },
      {
        value: 50,
        suffix: " ч/нед",
        text: "команда из 5 человек вручную сводит таблицы",
        section: 2,
        tone: "amber",
      },
      {
        value: 576,
        suffix: " тыс ₽/мес",
        text: "маржа, потерянная из-за «нет в наличии»",
        section: 3,
        tone: "amber",
      },
      {
        value: 7,
        prefix: "от ",
        suffix: " мес",
        text: "окупаемость пилота — с честным «не окупится» в осторожном сценарии",
        section: 4,
        tone: "teal",
      },
    ],
    sections: [
      {
        num: "01",
        title: "Управленческое резюме",
        pageLabel: "стр. 2 / 38",
        progress: 5,
        takeaway: "19,4 млн ₽",
        takeawayTone: "amber",
        takeawayText: "— столько компания теряет за год",
        paragraphs: [
          "Розничная дистрибуция, обезличенный пример: 7 000 активных товарных позиций, 4 канала продаж, средний запас 120 млн ₽. Никто не «ленится» — люди героически тащат процесс руками. Но деньги утекают в трёх местах: ручная аналитика, дефицит ходовых позиций, списания и уценки.",
        ],
        quote: {
          text: "«Каждый понедельник я полдня собираю остатки из трёх систем. К обеду цифры уже устарели.»",
          who: "закупщик · собирательная реплика из интервью",
        },
        tableLabel: "Показать расчёт базы потерь",
        table: {
          head: ["Источник потерь", "В год"],
          rows: [
            ["Ручная аналитика (5 чел × 10 ч/нед × 1 800 ₽)", "4 644 000 ₽"],
            ["Потерянная маржа из-за дефицита", "6 912 000 ₽"],
            ["Списания и уценки", "7 800 000 ₽"],
          ],
        },
      },
      {
        num: "02",
        title: "Границы аудита",
        pageLabel: "стр. 4 / 38",
        progress: 11,
        takeaway: "9 ролей · 12 мес",
        takeawayText: "— данные, на которых основан анализ",
        paragraphs: [
          "Интервью с 9 ролями, выгрузки операций за 12 месяцев, управленческая отчётность компании. Расчёты — предварительная оценка, они уточняются перед запуском пилота.",
        ],
        tableLabel: "Показать границы аудита",
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
        takeaway: "50 ч/нед",
        takeawayTone: "amber",
        takeawayText: "— ручной работы, которую видно на карте процесса",
        paragraphs: [
          "Пять человек каждую неделю выгружают, сводят и перепроверяют таблицы. На карте процесса это три узла, где машина справится лучше: витрина данных вместо выгрузок, пояснения к отклонениям вместо ручного поиска причин, рекомендации по пополнению вместо правки заказов на глаз.",
        ],
        quote: {
          text: "«Если ключевой аналитик в отпуске — отчёт по неликвидам просто не выходит.»",
          who: "коммерческий директор · собирательная реплика из интервью",
        },
        tableLabel: "Показать карту процесса",
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
        takeaway: "576 000 ₽/мес",
        takeawayTone: "amber",
        takeawayText: "— маржи съедает «нет в наличии»",
        paragraphs: [
          "Ходовые позиции выпадают из продажи: остатки в учётной системе расходятся со складом, а сигнал о дефиците приходит из жалоб, а не из данных. Параллельно 12% запаса заморожено в неликвидах — оборотные деньги лежат на полке.",
        ],
        quote: {
          text: "«Мы узнаём, что товара нет, когда звонит клиент.»",
          who: "руководитель продаж · собирательная реплика из интервью",
        },
        tableLabel: "Показать реестр узких мест",
        table: {
          head: ["Узкое место", "Как проверить", "Приоритет"],
          rows: [
            ["Остатки расходятся между системами", "Сверить остатки по источникам", "Высокий"],
            ["Ходовые позиции выпадают из наличия", "Связать дефицит с потерянными продажами", "Высокий"],
            ["Деньги заморожены в неликвидах", "Доля медленного запаса (12% в примере)", "Средний"],
          ],
        },
      },
      {
        num: "05",
        title: "Расчёт окупаемости",
        pageLabel: "стр. 23 / 38",
        progress: 61,
        takeaway: "7–14 мес",
        takeawayTone: "teal",
        takeawayText: "— окупаемость пилота в реалистичных сценариях",
        paragraphs: [
          "База эффекта — 19,4 млн ₽ в год, к ней применяются осторожные коэффициенты улучшения. Честная часть: в самом осторожном сценарии широкий проект не окупается за первый год — и отчёт прямо это говорит. Вывод: начинать с узкого пилота на 2–3 категориях, а не с «большого внедрения».",
        ],
        tableLabel: "Сценарии расчёта",
        tableOpen: true,
        table: {
          head: ["Сценарий", "Валовый эффект в год", "Окупаемость"],
          rows: [
            ["Консервативный", "2,24 млн ₽", "не окупается в первый год"],
            ["Базовый", "4,18 млн ₽", "около 14 месяцев"],
            ["Высокий", "6,35 млн ₽", "около 7 месяцев"],
          ],
        },
        calc: true,
      },
      {
        num: "06",
        title: "Дорожная карта 90 дней",
        pageLabel: "стр. 31 / 38",
        progress: 82,
        takeaway: "90 дней",
        takeawayTone: "teal",
        takeawayText: "— от решения до проверенного пилота",
        paragraphs: [
          "Не «внедрение за год», а проверка на 2–3 категориях с метриками качества и правом остановиться.",
        ],
        tableLabel: "Показать план по неделям",
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
  },
  en: {
    kpis: [
      {
        value: 19.4,
        decimals: 1,
        suffix: "M ₽/yr",
        text: "measured losses: manual work, stock-outs, write-offs",
        section: 0,
        tone: "amber",
      },
      {
        value: 50,
        suffix: " h/wk",
        text: "a team of 5 merges spreadsheets by hand",
        section: 2,
        tone: "amber",
      },
      {
        value: 576,
        suffix: "K ₽/mo",
        text: "margin lost to out-of-stock items",
        section: 3,
        tone: "amber",
      },
      {
        value: 7,
        prefix: "from ",
        suffix: " mo",
        text: "pilot payback — with an honest “won't pay back” in the conservative case",
        section: 4,
        tone: "teal",
      },
    ],
    sections: [
      {
        num: "01",
        title: "Executive summary",
        pageLabel: "p. 2 / 38",
        progress: 5,
        takeaway: "19.4M ₽",
        takeawayTone: "amber",
        takeawayText: "— what the company loses per year",
        paragraphs: [
          "Retail distribution, anonymized example: 7,000 active SKUs, 4 sales channels, average inventory of 120M ₽. Nobody is slacking — people heroically carry the process by hand. But money leaks in three places: manual analytics, stock-outs of best-sellers, write-offs and markdowns.",
        ],
        quote: {
          text: "“Every Monday I spend half a day pulling stock numbers from three systems. By lunch they are already stale.”",
          who: "buyer · composite line from interviews",
        },
        tableLabel: "Show the loss base calculation",
        table: {
          head: ["Loss source", "Per year"],
          rows: [
            ["Manual analytics (5 people × 10 h/wk × 1,800 ₽)", "4,644,000 ₽"],
            ["Margin lost to stock-outs", "6,912,000 ₽"],
            ["Write-offs and markdowns", "7,800,000 ₽"],
          ],
        },
      },
      {
        num: "02",
        title: "Audit scope",
        pageLabel: "p. 4 / 38",
        progress: 11,
        takeaway: "9 roles · 12 mo",
        takeawayText: "— the data behind the analysis",
        paragraphs: [
          "Interviews with 9 roles, 12 months of transaction exports, and the company's management reporting. Figures are preliminary estimates refined before a pilot starts.",
        ],
        tableLabel: "Show audit scope",
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
        takeaway: "50 h/wk",
        takeawayTone: "amber",
        takeawayText: "— of manual work visible on the process map",
        paragraphs: [
          "Five people export, merge, and double-check spreadsheets every week. On the process map these are three nodes where a machine does better: a data mart instead of exports, explained deviations instead of manual root-cause hunting, replenishment recommendations instead of gut-feel order edits.",
        ],
        quote: {
          text: "“If the key analyst is on vacation, the slow-stock report simply doesn't happen.”",
          who: "commercial director · composite line from interviews",
        },
        tableLabel: "Show the process map",
        table: {
          head: ["Stage", "Owner", "Manual work", "Opportunity"],
          rows: [
            ["Data collection", "Buyer", "Exporting and merging spreadsheets", "Automated data mart"],
            ["Exception analysis", "Category manager", "Manual root-cause hunting", "Explained deviations"],
            ["Supplier ordering", "Head of purchasing", "Manual order adjustments", "Replenishment recommendations"],
          ],
        },
      },
      {
        num: "04",
        title: "Bottleneck register",
        pageLabel: "p. 17 / 38",
        progress: 45,
        takeaway: "576,000 ₽/mo",
        takeawayTone: "amber",
        takeawayText: "— of margin eaten by out-of-stock",
        paragraphs: [
          "Best-sellers drop out of sale: system stock differs from the warehouse, and the out-of-stock signal comes from complaints, not data. Meanwhile 12% of inventory is frozen in slow stock — working capital sitting on a shelf.",
        ],
        quote: {
          text: "“We find out an item is gone when a customer calls.”",
          who: "head of sales · composite line from interviews",
        },
        tableLabel: "Show the bottleneck register",
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
        takeaway: "7–14 mo",
        takeawayTone: "teal",
        takeawayText: "— pilot payback in realistic scenarios",
        paragraphs: [
          "The effect base is 19.4M ₽ per year, with conservative improvement factors applied. The honest part: in the most cautious scenario a broad project does not pay back within the first year — and the report says so directly. Conclusion: start with a narrow pilot on 2–3 categories, not a “big rollout”.",
        ],
        tableLabel: "Calculation scenarios",
        tableOpen: true,
        table: {
          head: ["Scenario", "Gross effect per year", "Payback"],
          rows: [
            ["Conservative", "2.24M ₽", "does not pay back within the first year"],
            ["Base", "4.18M ₽", "about 14 months"],
            ["High", "6.35M ₽", "about 7 months"],
          ],
        },
        calc: true,
      },
      {
        num: "06",
        title: "90-day roadmap",
        pageLabel: "p. 31 / 38",
        progress: 82,
        takeaway: "90 days",
        takeawayTone: "teal",
        takeawayText: "— from decision to a tested pilot",
        paragraphs: [
          "Not a “year-long rollout”, but a test on 2–3 categories with quality metrics and the right to stop.",
        ],
        tableLabel: "Show the week-by-week plan",
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
  },
};
```

## Приложение B: полный `Widget5ReportViewer.tsx`

```tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../lib/i18n";
import { reportContent } from "./report-content";

function fmtMillions(rub: number, comma: boolean) {
  const m = (rub / 1_000_000).toFixed(1);
  return comma ? m.replace(".", ",") : m;
}

function CalcRow({
  title,
  label,
  result,
  unit,
  note,
  comma,
}: {
  title: string;
  label: string;
  result: string;
  unit: string;
  note: string;
  comma: boolean;
}) {
  const [people, setPeople] = useState(5);
  const yearly = people * 10 * 1_800 * 4.3 * 12;
  return (
    <div className="mt-5 max-w-[560px] rounded-lg border border-[var(--color-accent-teal)]/35 bg-[var(--color-accent-teal)]/5 p-4 md:p-5">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-accent-teal)]">
        {title}
      </div>
      <div className="flex items-center gap-4">
        <span className="shrink-0 text-[12.5px] text-[var(--color-text-secondary)]">{label}</span>
        <input
          type="range"
          min={2}
          max={20}
          step={1}
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          className="techno"
          aria-label={label}
        />
        <span className="w-7 shrink-0 text-right font-mono text-[14px] tabular-nums text-[var(--color-text-primary)]">
          {people}
        </span>
      </div>
      <p className="mt-3 text-[13px] text-[var(--color-text-secondary)]">
        {result}{" "}
        <span className="font-mono text-[18px] tabular-nums text-[var(--color-accent-teal)]">
          {fmtMillions(yearly, comma)} {unit}
        </span>{" "}
        <span className="text-[var(--color-text-mono)]">— {note}</span>
      </p>
    </div>
  );
}

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
  const sections = reportContent[lang].sections;
  const safe = Math.min(Math.max(active, 0), sections.length - 1);
  const s = sections[safe];
  const go = (d: number) => onSelect(Math.min(sections.length - 1, Math.max(0, safe + d)));
  const takeawayColor =
    s.takeawayTone === "teal"
      ? "text-[var(--color-accent-teal)]"
      : s.takeawayTone === "amber"
        ? "text-[var(--color-accent-amber)]"
        : "text-[var(--color-text-primary)]";

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
          {s.takeaway ? (
            <>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span
                  className={`font-mono text-[28px] leading-none tracking-[-0.02em] tabular-nums md:text-[36px] ${takeawayColor}`}
                >
                  {s.takeaway}
                </span>
                <h3 className="text-[16px] font-medium text-[var(--color-text-primary)] md:text-[17px]">
                  {s.takeawayText}
                </h3>
              </div>
              <div className="mt-2 mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-mono)]">
                {s.num} · {s.title} · {rv.fragmentLabel}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-[18px] font-medium tracking-tight text-[var(--color-text-primary)]">
                {s.title}
              </h3>
              <div className="mt-1 mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-mono)]">
                {rv.fragmentLabel}
              </div>
            </>
          )}
          {s.paragraphs?.map((p, i) => (
            <p
              key={i}
              className="mb-3 max-w-[640px] text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]"
            >
              {p}
            </p>
          ))}
          {s.quote && (
            <blockquote className="my-4 max-w-[640px] rounded-r-lg border-l-2 border-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo-soft)] px-4 py-3">
              <p className="text-[14px] italic leading-relaxed text-[var(--color-text-primary)]">
                {s.quote.text}
              </p>
              <footer className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-mono)]">
                {s.quote.who}
              </footer>
            </blockquote>
          )}
          {s.table && (
            <details
              open={s.tableOpen || undefined}
              className="mt-3 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)]"
            >
              <summary className="cursor-pointer px-4 py-2.5 text-[12.5px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">
                {s.tableLabel}
              </summary>
              <div className="overflow-x-auto border-t border-[var(--color-border-subtle)] p-3">
                <table className="w-full border-collapse text-[12.5px]">
                  <thead>
                    <tr>
                      {s.table.head.map((h) => (
                        <th
                          key={h}
                          className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] px-3 py-2 text-left font-medium text-[var(--color-text-primary)]"
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
            </details>
          )}
          {s.calc && (
            <CalcRow
              title={rv.calcTitle}
              label={rv.calcLabel}
              result={rv.calcResult}
              unit={rv.calcUnit}
              note={rv.calcNote}
              comma={lang === "ru"}
            />
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

      {/* Нижняя панель: навигация + CTA «посчитать по вашей компании» */}
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
          {rv.ctaCalc} →
        </button>
      </div>
    </div>
  );
}
```
