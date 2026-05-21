import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "ru" | "en";

type Dict = typeof dict.ru;

const dict = {
  ru: {
    nav: { contact: "Связаться", links: ["Подход", "Кейсы", "Калькулятор", "FAQ"] },
    hero: {
      status: "ОТКРЫТ ДЛЯ ПРОЕКТОВ Q2 2026",
      h1a: "Внедрение AI в средний бизнес. Без хайпа.",
      h1b: "С измеримым ROI.",
      sub: "Аудит ваших процессов и дорожная карта внедрения AI за 3 недели. От эксперта с 25-летним опытом построения IT-систем.",
      cta1: "Запросить аудит",
      cta2: "Посмотреть пример аудита",
      strip: ["25 ЛЕТ", "CIO", "3 НЕД"],
      widgetCaption: "Реальный кейс. Производство, 180 чел.",
      widgetLabel: "ИНТЕРАКТИВ · ПЕРЕТАЩИТЕ",
      before: "СЕЙЧАС",
      after: "С AI",
      metrics: [
        { label: "Цикл обработки", from: 3.2, to: 1.1, suffix: " дн", deltaInverted: true },
        { label: "Ошибки в данных", from: 12, to: 3, suffix: "%", deltaInverted: true },
        { label: "Конверсия в сделку", from: 18, to: 31, suffix: "%", deltaInverted: false },
      ],
      flowBefore: ["Заявка", "Менеджер", "Excel", "Проверка", "CRM"],
      flowAfter: ["Заявка", "AI-агент", "Авто-проверка", "Скоринг", "CRM"],
      captionBefore: "Ручная обработка: менеджер копирует данные, проверяет вручную, теряет 2 из 10 заявок.",
      captionAfter: "AI извлекает данные, проверяет за секунды, передаёт в CRM с готовым скорингом.",
    },
    problem: {
      label: "01 / ПРОБЛЕМА",
      title: "Большинство внедрений AI заканчиваются презентацией",
      sub: "Команда не понимает, с чего начать. Подрядчики продают LLM как магию. Внутри — десяток процессов, где AI реально сэкономит часы, но никто их не картирует.",
      cards: [
        { t: "Хайп вместо аудита", d: "Решения подбираются под технологию, а не под процесс. Внедрение есть, эффекта нет." },
        { t: "Нет owner-а внутри", d: "Без человека, который понимает и бизнес, и архитектуру, проект превращается в пилот без продакшна." },
        { t: "Метрики придумывают потом", d: "ROI считают «на глаз». Через год — невозможно доказать, что инвестиция окупилась." },
      ],
    },
    approach: {
      label: "02 / ПОДХОД",
      title: "Три недели. Один документ. Понятные шаги.",
      steps: [
        { n: "01", week: "WEEK 1", t: "Картирование", d: "Интервью с командой, разбор процессов, фиксация цифр.", detail: "5–7 интервью с ключевыми ролями. Карта 12–18 процессов с метриками: время, ошибки, стоимость. Без анкет — живой разговор." },
        { n: "02", week: "WEEK 2", t: "Анализ и приоритизация", d: "Где AI даст эффект, где — нет. Честная матрица.", detail: "Каждый процесс оценён по 3 осям: потенциал автоматизации, сложность внедрения, бизнес-эффект. Итог — 3–5 точек запуска." },
        { n: "03", week: "WEEK 3", t: "Дорожная карта", d: "Документ на 30–40 страниц с архитектурой и сметой.", detail: "Технические решения, стек, оценка стоимости, риски, KPI. Готовый артефакт для внутренней защиты бюджета." },
      ],
    },
    widget2: {
      label: "КАК ЭТО РАБОТАЕТ НА ПРАКТИКЕ",
      title: "Из документа — в структуру. За секунды.",
      sub: "Минимальный пример того, что AI делает с входящим документом. Реальный пайплайн — на порядок сложнее.",
      tabs: ["Документ", "Анализ", "Результат"],
      docTitle: "INVOICE_2026_0418.pdf",
      fields: [
        { k: "Дата", v: "2026-04-18", conf: 99 },
        { k: "Контрагент", v: "ООО «Технопарк»", conf: 97 },
        { k: "ИНН", v: "7701234567", conf: 99 },
        { k: "Сумма", v: "1 248 500 ₽", conf: 98 },
        { k: "НДС", v: "208 083 ₽", conf: 96 },
        { k: "Позиции", v: "12 строк", conf: 94 },
      ],
    },
    whoFor: {
      label: "03 / КОМУ ПОДОЙДЁТ",
      yesTitle: "Подойдёт, если…",
      noTitle: "Не подойдёт, если…",
      yes: [
        "Компания 50–500 человек, есть данные и регламенты",
        "Цель — ROI, а не «попробовать AI»",
        "Готовы выделить 2–3 часа в неделю на интервью",
        "Решение принимает CEO / COO / CIO",
      ],
      no: [
        "Нужен «волшебный чатбот за неделю»",
        "Нет ни одного оцифрованного процесса",
        "AI должен быть «как у конкурентов», без задачи",
        "Бюджет на внедрение — менее 1 млн ₽",
      ],
    },
    expert: {
      label: "04 / ЭКСПЕРТ",
      bio: [
        "25 лет в IT-архитектуре и управлении продуктом. Прошёл путь от инженера до CIO в трёх компаниях с оборотом более 5 млрд ₽.",
        "Последние 4 года — внедрение LLM и AI-агентов в операционные процессы: обработка документов, скоринг, поддержка, аналитика.",
        "Не продаю модели. Помогаю выбрать, где AI даёт деньги, а где — нет.",
      ],
      stat1: { n: 25, label: "ЛЕТ В IT" },
      stats: [
        { k: "Внедрений AI", v: "40+" },
        { k: "Команд под управлением", v: "до 120" },
        { k: "Аудитов в 2025", v: "17" },
      ],
      skills: ["LLM", "AI-агенты", "RAG", "MLOps", "Архитектура", "Process Mining"],
    },
    cases: {
      label: "05 / КЕЙСЫ",
      title: "Что менялось у клиентов",
      items: [
        { industry: "Производство", metric: "−66%", unit: "цикл обработки", ctx: "Заявки от дилеров: с 3.2 до 1.1 дня. AI-агент + интеграция с 1С.", before: "3.2 дня", after: "1.1 дня" },
        { industry: "Логистика", metric: "3× ↑", unit: "пропускная способность", ctx: "Разбор товарных накладных: 80 → 240 документов в час на одного оператора.", before: "80/час", after: "240/час" },
        { industry: "B2B-сервис", metric: "−40%", unit: "стоимость поддержки", ctx: "RAG-ассистент закрывает 62% обращений первого уровня без человека.", before: "₽180/тикет", after: "₽108/тикет" },
      ],
    },
    roi: {
      label: "АГРЕСИВНО ПРИКИДКА",
      title: "Прикиньте, сколько вы теряете на ручных процессах",
      sub: "Калькулятор основан на медиане 40+ проектов. Точная цифра — после аудита.",
      teamSize: "Размер команды",
      hours: "Часов ручного труда в неделю на сотрудника",
      rate: "Средняя стоимость часа сотрудника",
      currentCost: "Текущие затраты в год",
      saving: "Потенциальная экономия с AI",
      payback: "Окупаемость внедрения",
      months: "мес",
      disclaimer: "Расчёт основан на медианных показателях 40+ проектов внедрения AI в среднем бизнесе. Для точной оценки — проведём аудит.",
      cta: "Получить персональный расчёт",
    },
    procmap: {
      label: "06 / ЧТО ВЫ ПОЛУЧИТЕ",
      title: "Карта процессов с точками внедрения AI",
      sub: "Так выглядит фрагмент типовой деливерабельной карты. Узлы — процессы, кольца — узкие места, нумерованные маркеры — рекомендации.",
      toggle: "Показать рекомендации",
      deliverables: [
        "Карта 12–18 ключевых процессов с метриками",
        "3–5 приоритетных точек внедрения AI",
        "Технические решения и стек по каждой точке",
        "Оценка стоимости, сроков и рисков",
        "KPI и план измерения эффекта",
        "Презентация на 1 слайд для совета директоров",
      ],
      tips: [
        "AI-агент для классификации входящих заявок. Снижение цикла на 60%.",
        "Извлечение данных из накладных через VLM. 3× к скорости.",
        "RAG-ассистент для отдела поддержки. −40% к стоимости.",
      ],
    },
    faq: {
      label: "07 / ВОПРОСЫ",
      items: [
        { q: "Сколько стоит аудит?", a: "Фиксированная стоимость — 850 000 ₽ за 3 недели работы. В цену входит вся команда, документ и презентация для совета директоров." },
        { q: "Кто будет работать?", a: "Я лично + 1–2 архитектора под задачу. Без джунов и менеджеров аккаунтов. Все интервью и финальная защита — лично." },
        { q: "Что если у нас уже есть пилоты AI?", a: "Отлично. Аудит покажет, какие пилоты стоит масштабировать, а какие — закрыть. Часто экономия от закрытия — больше, чем от запуска новых." },
        { q: "Подписываете NDA?", a: "Да, стандартный двусторонний NDA до первого интервью. Можем работать по вашему шаблону." },
        { q: "Работаете удалённо?", a: "Да. Интервью — в Zoom/Telemost. При необходимости 1 выезд на площадку за наш счёт." },
        { q: "Какой стек обычно рекомендуете?", a: "Стек подбирается под задачу. Чаще всего: OpenAI / Anthropic для LLM, LangGraph или собственная оркестрация, pgvector для RAG, n8n / Temporal для оркестрации." },
        { q: "Сопровождаете внедрение после аудита?", a: "Опционально. Могу взять роль fractional CTO/CIO на 3–6 месяцев или передать команде с регулярными ревью." },
        { q: "Когда ближайший слот?", a: "Q2 2026 открыт. Свободных слотов — 2 из 4. Старт — в течение 2 недель после подписания." },
      ],
    },
    finalCta: {
      title: "Начните с разговора, а не с контракта.",
      sub: "30 минут видеозвонка. Расскажете о процессах — получите 2–3 быстрых наблюдения и решите, нужен ли вам аудит.",
      btn1: "Забронировать звонок",
      btn2: "Telegram",
      indicators: "TYPICAL RESPONSE: 24H · NDA · RU/EN",
    },
    footer: {
      cols: [
        { t: "Услуги", links: ["AI-аудит", "Дорожная карта", "Fractional CIO"] },
        { t: "Контакты", links: ["hello@aiaudit.ru", "Telegram", "LinkedIn"] },
        { t: "Документы", links: ["NDA шаблон", "Пример отчёта", "Политика данных"] },
      ],
      status: "v.1.0 · STATUS: ● ONLINE",
    },
    modal: {
      title: "Запрос на аудит",
      sub: "Ответим в течение 24 часов в рабочие дни.",
      name: "Имя",
      company: "Компания",
      email: "Email",
      team: "Размер команды",
      teamOpts: ["до 50", "50–200", "200–500", "500+"],
      desc: "Кратко о задаче",
      submit: "Отправить",
      success: "Заявка отправлена. Свяжемся в течение 24 часов.",
    },
  },
  en: {
    nav: { contact: "Contact", links: ["Approach", "Cases", "Calculator", "FAQ"] },
    hero: {
      status: "OPEN FOR Q2 2026 PROJECTS",
      h1a: "AI for mid-market. No hype.",
      h1b: "Measurable ROI.",
      sub: "Audit of your processes and an AI implementation roadmap in 3 weeks. From a CIO with 25 years of building IT systems.",
      cta1: "Request audit",
      cta2: "See sample deliverable",
      strip: ["25 YRS", "CIO", "3 WKS"],
      widgetCaption: "Real case. Manufacturing, 180 employees.",
      widgetLabel: "INTERACTIVE · DRAG",
      before: "NOW",
      after: "WITH AI",
      metrics: [
        { label: "Processing cycle", from: 3.2, to: 1.1, suffix: " d", deltaInverted: true },
        { label: "Data errors", from: 12, to: 3, suffix: "%", deltaInverted: true },
        { label: "Conversion rate", from: 18, to: 31, suffix: "%", deltaInverted: false },
      ],
      flowBefore: ["Request", "Manager", "Excel", "Review", "CRM"],
      flowAfter: ["Request", "AI agent", "Auto-check", "Scoring", "CRM"],
      captionBefore: "Manual flow: a person copies the data, checks by hand, loses 2 of 10 requests.",
      captionAfter: "AI extracts data, validates in seconds, hands a scored lead to CRM.",
    },
    problem: {
      label: "01 / PROBLEM",
      title: "Most AI rollouts end with a slide deck",
      sub: "Teams don't know where to start. Vendors sell LLMs as magic. Inside the company a dozen processes would save real hours — nobody maps them.",
      cards: [
        { t: "Hype before audit", d: "Solutions are picked by tech, not by process. Implementation happens, impact doesn't." },
        { t: "No internal owner", d: "Without a person who understands both business and architecture, the project stalls at pilot." },
        { t: "Metrics added later", d: "ROI is estimated by feel. A year later there's no way to prove the investment paid off." },
      ],
    },
    approach: {
      label: "02 / APPROACH",
      title: "Three weeks. One document. Concrete next steps.",
      steps: [
        { n: "01", week: "WEEK 1", t: "Mapping", d: "Interviews with the team, process walk-throughs, numbers on paper.", detail: "5–7 interviews with key roles. A map of 12–18 processes with metrics: time, errors, cost. No surveys — live conversations." },
        { n: "02", week: "WEEK 2", t: "Analysis & priority", d: "Where AI pays off, where it doesn't. Honest matrix.", detail: "Each process is scored on 3 axes: automation potential, complexity, business impact. Result — 3–5 launch points." },
        { n: "03", week: "WEEK 3", t: "Roadmap", d: "A 30–40 page document with architecture and budget.", detail: "Technical solutions, stack, cost estimate, risks, KPIs. A ready artifact to defend the budget internally." },
      ],
    },
    widget2: {
      label: "HOW IT ACTUALLY WORKS",
      title: "From a document into structure. In seconds.",
      sub: "A minimal example of what AI does with an incoming document. The real pipeline is an order of magnitude harder.",
      tabs: ["Document", "Analysis", "Result"],
      docTitle: "INVOICE_2026_0418.pdf",
      fields: [
        { k: "Date", v: "2026-04-18", conf: 99 },
        { k: "Vendor", v: "Technopark LLC", conf: 97 },
        { k: "Tax ID", v: "7701234567", conf: 99 },
        { k: "Amount", v: "₽ 1,248,500", conf: 98 },
        { k: "VAT", v: "₽ 208,083", conf: 96 },
        { k: "Line items", v: "12 rows", conf: 94 },
      ],
    },
    whoFor: {
      label: "03 / WHO IT'S FOR",
      yesTitle: "Good fit if…",
      noTitle: "Not a fit if…",
      yes: [
        "Company of 50–500 people, with data and SOPs",
        "Goal is ROI, not «trying out AI»",
        "Ready to spend 2–3 hours/week on interviews",
        "Decision-maker: CEO / COO / CIO",
      ],
      no: [
        "You want a «magic chatbot in a week»",
        "Not a single process is digitized yet",
        "AI «because competitors have it», no real task",
        "Implementation budget under €10k",
      ],
    },
    expert: {
      label: "04 / EXPERT",
      bio: [
        "25 years in IT architecture and product. From engineer to CIO in three companies with revenue above €50M.",
        "Last 4 years — LLMs and AI agents in operational workflows: document processing, scoring, support, analytics.",
        "I don't sell models. I help pick the places where AI pays off — and where it doesn't.",
      ],
      stat1: { n: 25, label: "YEARS IN IT" },
      stats: [
        { k: "AI rollouts", v: "40+" },
        { k: "Teams led", v: "up to 120" },
        { k: "Audits in 2025", v: "17" },
      ],
      skills: ["LLM", "AI agents", "RAG", "MLOps", "Architecture", "Process Mining"],
    },
    cases: {
      label: "05 / CASES",
      title: "What changed for clients",
      items: [
        { industry: "Manufacturing", metric: "−66%", unit: "cycle time", ctx: "Dealer requests: from 3.2 to 1.1 day. AI agent + 1C integration.", before: "3.2 d", after: "1.1 d" },
        { industry: "Logistics", metric: "3× ↑", unit: "throughput", ctx: "Bill of lading parsing: 80 → 240 documents/hour per operator.", before: "80/h", after: "240/h" },
        { industry: "B2B services", metric: "−40%", unit: "support cost", ctx: "RAG assistant closes 62% of tier-1 tickets without a human.", before: "€2.0/ticket", after: "€1.2/ticket" },
      ],
    },
    roi: {
      label: "ROUGH ESTIMATE",
      title: "See how much manual work is costing you",
      sub: "Calculator based on the median of 40+ projects. Precise number — after the audit.",
      teamSize: "Team size",
      hours: "Hours of manual work per week per employee",
      rate: "Average hourly cost of an employee",
      currentCost: "Current annual cost",
      saving: "Potential savings with AI",
      payback: "Payback period",
      months: "mo",
      disclaimer: "Numbers based on the median of 40+ AI rollouts in mid-market companies. For a precise estimate — let's audit.",
      cta: "Get a personal estimate",
    },
    procmap: {
      label: "06 / WHAT YOU GET",
      title: "Process map with AI implementation points",
      sub: "A fragment of a typical deliverable map. Nodes are processes, rings are bottlenecks, numbered markers are recommendations.",
      toggle: "Show recommendations",
      deliverables: [
        "Map of 12–18 key processes with metrics",
        "3–5 priority AI implementation points",
        "Technical solutions and stack per point",
        "Cost, timeline and risk estimates",
        "KPIs and a plan to measure impact",
        "A one-slide summary for the board",
      ],
      tips: [
        "AI agent for inbound request triage. 60% cycle reduction.",
        "Invoice data extraction via VLM. 3× speed.",
        "RAG assistant for the support team. −40% in cost.",
      ],
    },
    faq: {
      label: "07 / FAQ",
      items: [
        { q: "How much does the audit cost?", a: "Fixed price — €9,500 for 3 weeks. Includes the full team, the document and the board presentation." },
        { q: "Who does the work?", a: "Me personally + 1–2 architects per engagement. No juniors, no account managers. All interviews and the final defense — by me." },
        { q: "What if we already have AI pilots?", a: "Even better. The audit will show which ones to scale and which to shut down. Savings from shutting down often beat new launches." },
        { q: "Will you sign an NDA?", a: "Yes, a standard mutual NDA before the first interview. We can use your template." },
        { q: "Remote?", a: "Yes. Interviews via Zoom. One on-site visit at our cost if needed." },
        { q: "What's your usual stack?", a: "Stack depends on the task. Often: OpenAI / Anthropic for LLM, LangGraph or custom orchestration, pgvector for RAG, n8n / Temporal for workflows." },
        { q: "Do you support implementation after the audit?", a: "Optional. Fractional CTO/CIO for 3–6 months, or hand-off to your team with regular reviews." },
        { q: "When's the next slot?", a: "Q2 2026 is open. 2 of 4 slots left. Start within 2 weeks of signing." },
      ],
    },
    finalCta: {
      title: "Start with a conversation, not a contract.",
      sub: "30 minutes on a call. Tell us about your processes, get 2–3 quick observations, decide if an audit makes sense.",
      btn1: "Book a call",
      btn2: "Telegram",
      indicators: "TYPICAL RESPONSE: 24H · NDA · RU/EN",
    },
    footer: {
      cols: [
        { t: "Services", links: ["AI audit", "Roadmap", "Fractional CIO"] },
        { t: "Contact", links: ["hello@aiaudit.ru", "Telegram", "LinkedIn"] },
        { t: "Documents", links: ["NDA template", "Sample report", "Data policy"] },
      ],
      status: "v.1.0 · STATUS: ● ONLINE",
    },
    modal: {
      title: "Audit request",
      sub: "We reply within 24 hours on business days.",
      name: "Name",
      company: "Company",
      email: "Email",
      team: "Team size",
      teamOpts: ["under 50", "50–200", "200–500", "500+"],
      desc: "Briefly about the task",
      submit: "Send",
      success: "Request sent. We'll reply within 24 hours.",
    },
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved === "ru" || saved === "en") setLangState(saved);
    } catch {}
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  };
  return <I18nCtx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("I18nProvider missing");
  return ctx;
}
