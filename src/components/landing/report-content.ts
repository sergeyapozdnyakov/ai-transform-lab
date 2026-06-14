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
        text: "pilot payback — with an honest “won’t pay back” in the conservative case",
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
          text: "“If the key analyst is on vacation, the slow-stock report simply doesn’t happen.”",
          who: "commercial director · composite line from interviews",
        },
        tableLabel: "Show the process map",
        table: {
          head: ["Stage", "Owner", "Manual work", "Opportunity"],
          rows: [
            [
              "Data collection",
              "Buyer",
              "Exporting and merging spreadsheets",
              "Automated data mart",
            ],
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
