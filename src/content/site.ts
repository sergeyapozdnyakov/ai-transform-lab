export type Locale = "ru" | "en";

export const SITE_URL = "https://pozdnyakov.io";

export const siteConfig = {
  brand: "POZDNYAKOV.IO",
  owner: {
    ru: "Сергей Поздняков",
    en: "Sergey Pozdnyakov",
  },
  contact: {
    email: "ai@pozdnyakov.io",
    telegramUrl: "https://t.me/pozdnyakov_io",
    linkedinUrl: "https://www.linkedin.com/in/sergeypozdnyakov/",
    calendarUrl: "",
    formEndpoint: "/api/contact",
    responseTimeBusinessDays: 1,
  },
  availability: {
    enabled: false,
    ru: "Открыт для ограниченного числа проектов",
    en: "Available for a limited number of engagements",
  },
  pricing: {
    showFractionalCioPricing: false,
    executiveDiagnostic: {
      ru: "300–450 тыс. ₽",
      en: "RUB 300–450k",
    },
    fractionalCio: {
      ru: "450–650 тыс. ₽ в месяц",
      en: "RUB 450–650k per month",
    },
    interimCio: {
      ru: "750 тыс.–1,2 млн ₽ в месяц",
      en: "RUB 750k–1.2m per month",
    },
    aiAudit: {
      ru: "280–450 тыс. ₽",
      en: "€3,000–€4,800",
    },
  },
  profile: {
    yearsInIt: 25,
    stores: "50+",
    warehouses: "6",
    users: "500+",
    pos: "100+",
    skus: "7 000+",
    teamFte: "≈12",
    annualItBudget: "≈$1,5 млн",
  },
} as const;

const sharedCases = {
  ru: [
    {
      slug: "retail-operating-model",
      number: "01",
      title: "ИТ-модель международной премиальной розницы",
      context:
        "Более 50 магазинов, 6 складов, 3 офиса, 500+ пользователей, 100+ кассовых терминалов, 7 000+ товарных позиций и работа в нескольких странах.",
      risk: "Рост бизнеса повышал зависимость от устойчивости систем, качества сервиса, поставщиков и прозрачного управления портфелем изменений.",
      role: "ИТ-директор: стратегия, сервис, трансформация, бюджет, команда и поставщики.",
      actions: [
        "ИТ-стратегия и дорожная карта",
        "приоритизация портфеля проектов",
        "Service Desk и практики управления ИТ-услугами",
        "мониторинг сервисов и оборудования",
        "устойчивость инфраструктуры, резервное копирование и удалённое администрирование",
        "управление доступом и регулярная перепроверка прав",
        "управление поставщиками",
      ],
      outcome:
        "Повысилась прозрачность ИТ-функции, предсказуемость сервиса и управляемость рисков. Операционная модель стала лучше подготовлена к дальнейшему росту.",
      capabilities: ["стратегия", "портфель", "ИТ-услуги", "устойчивость", "поставщики"],
    },
    {
      slug: "warehouse-data-omnichannel",
      number: "02",
      title: "Масштабирование склада, данных и омниканальных операций",
      context:
        "Розничный и интернет-бизнес с распределёнными складами, маркировкой, большим справочником товаров и несколькими каналами продаж.",
      risk: "Разрозненные данные и ручные складские операции ограничивали контроль исполнения, качество отгрузок и готовность к росту.",
      role: "Управление архитектурой, приоритетами и развитием связки 1С, касс, склада, товарных данных и аналитики.",
      actions: [
        "развитие WMS/TMS и адресного хранения",
        "контроль партий, сроков годности, комплектации и штрихкодов",
        "складские показатели и прогнозирование нагрузки",
        "интеграция с системой цифровой маркировки",
        "PIM/MDM и единая товарная карточка",
        "аналитика продаж, витрины данных и инициативы по прогнозированию",
        "планирование интеграций касс, 1С и интернет-магазина",
      ],
      outcome:
        "Улучшились операционный контроль, качество данных и дисциплина исполнения. Снизились риски ошибок отгрузки и соблюдения обязательных требований.",
      capabilities: ["склад", "данные", "интеграции", "розница", "архитектура"],
    },
    {
      slug: "estee-lauder-regional",
      number: "03",
      title: "Региональная технологическая трансформация Estée Lauder",
      context:
        "Региональная роль CIO в странах Восточной и Северной Европы, распределённые команды и поставщики, глобальные и локальные программы.",
      risk: "Разным рынкам требовались единые правила управления, устойчивый сервис и предсказуемое внедрение глобальных решений с учётом местной специфики.",
      role: "Региональный CIO: стратегия, бюджет, портфель, сервисная модель, контроль и развитие команд.",
      actions: [
        "региональная ИТ-стратегия",
        "управление бюджетом и портфелем",
        "внедрение SAP и переход розничного канала",
        "центры компетенций RPA и Power BI",
        "ИТ-академия и развитие команд",
        "контроли SOX и кибербезопасности",
        "непрерывность сервиса, цифровая маркировка и поддержка консультантов с помощью AI",
      ],
      outcome:
        "Управление в регионе стало более единообразным, лучшие практики масштабировались предсказуемее, а технологические инвестиции лучше связывались с приоритетами бизнеса.",
      capabilities: ["региональное управление", "ERP", "автоматизация", "контроли", "команды"],
    },
  ],
  en: [
    {
      slug: "retail-operating-model",
      number: "01",
      title: "International premium retail IT operating model",
      context:
        "50+ stores, 6 warehouses, 3 offices, 500+ users, 100+ POS terminals, 7,000+ SKUs, and multi-country operations.",
      risk: "Business growth increased dependence on system resilience, service quality, vendors, and transparent transformation portfolio governance.",
      role: "CIO accountability for strategy, service, transformation, budget, team, and vendors.",
      actions: [
        "IT strategy and roadmap",
        "project portfolio prioritization",
        "Service Desk and IT service management practices",
        "service and equipment monitoring",
        "infrastructure resilience, backup, and remote administration",
        "identity governance and access recertification",
        "vendor governance",
      ],
      outcome:
        "Stronger visibility, more predictable service, and better risk control created a more scalable operating model.",
      capabilities: ["strategy", "portfolio", "ITSM", "resilience", "vendors"],
    },
    {
      slug: "warehouse-data-omnichannel",
      number: "02",
      title: "Warehouse, data, and omnichannel scaling",
      context:
        "Retail and e-commerce operations with distributed warehouses, mandatory marking, a large product master, and several sales channels.",
      risk: "Fragmented data and manual warehouse steps limited execution control, fulfillment quality, and the ability to scale.",
      role: "Architecture and portfolio leadership across 1C, POS, warehouse, product data, and analytics.",
      actions: [
        "WMS/TMS development and address storage",
        "batch, shelf-life, picking, and barcode controls",
        "warehouse KPIs and load forecasting",
        "Track & Trace / DataMatrix integration",
        "PIM/MDM and a single product record",
        "sell-out analytics, data feeds, and forecasting initiatives",
        "POS, 1C, and e-commerce integration planning",
      ],
      outcome:
        "Better operational control, data quality, and fulfillment discipline reduced shipment and compliance risk.",
      capabilities: ["warehouse", "data", "integration", "retail", "architecture"],
    },
    {
      slug: "estee-lauder-regional",
      number: "03",
      title: "Regional technology transformation at Estée Lauder",
      context:
        "A regional CIO role across Eastern and Northern European markets, with distributed teams, vendors, and global and local programs.",
      risk: "Markets needed consistent governance, resilient service, and predictable rollout of global solutions with local requirements.",
      role: "Regional CIO accountability for strategy, budget, portfolio, service model, controls, and team development.",
      actions: [
        "regional IT strategy",
        "budget and portfolio governance",
        "SAP implementation and retail-channel transition",
        "RPA and Power BI Centers of Excellence",
        "IT Academy and capability development",
        "SOX and cybersecurity controls",
        "service continuity, digital marking, and AI support for frontline consultants",
      ],
      outcome:
        "More consistent regional governance, more scalable best practices, and better alignment between business priorities and technology investment.",
      capabilities: ["regional leadership", "ERP", "automation", "controls", "teams"],
    },
  ],
} as const;

const first90 = {
  ru: [
    {
      period: "ДНИ 1–30",
      title: "Прозрачность",
      summary: "Собираем единую управленческую картину ИТ.",
      items: [
        "интервью с генеральным, финансовым, операционным директорами и ИТ-командой",
        "карта систем, интеграций и критических зависимостей",
        "реестр поставщиков и затрат",
        "реестр критических рисков",
        "ревизия портфеля проектов",
        "первая управленческая панель для руководства",
      ],
    },
    {
      period: "ДНИ 31–60",
      title: "Модель управления",
      summary: "Определяем приоритеты, правила решений и ответственность.",
      items: [
        "ИТ-стратегия и приоритеты",
        "дорожная карта на 12 месяцев",
        "структура бюджета",
        "архитектурные принципы",
        "правила работы с поставщиками и уровень сервиса",
        "роли команды и порядок совместных решений бизнеса и ИТ",
      ],
    },
    {
      period: "ДНИ 61–90",
      title: "Исполнение",
      summary: "Запускаем изменения и закрепляем управленческий ритм.",
      items: [
        "старт двух-трёх приоритетных инициатив",
        "остановка или перепланирование проектов с низкой ценностью",
        "регулярный управленческий комитет по ИТ",
        "план развития команды",
        "план устойчивости и кибербезопасности",
        "управляемый портфель автоматизации и AI с бизнес-метриками",
      ],
    },
  ],
  en: [
    {
      period: "DAYS 1–30",
      title: "Visibility",
      summary: "Build one executive view of technology.",
      items: [
        "interviews with the CEO, CFO, COO, and IT team",
        "systems, integration, and critical dependency map",
        "vendor and cost inventory",
        "critical-risk register",
        "project portfolio review",
        "initial executive IT dashboard",
      ],
    },
    {
      period: "DAYS 31–60",
      title: "Management model",
      summary: "Set priorities, decision rules, and ownership.",
      items: [
        "IT strategy and priorities",
        "12-month roadmap",
        "budget structure",
        "architecture principles",
        "vendor governance, SLA, and escalation model",
        "team roles and business/IT decision rights",
      ],
    },
    {
      period: "DAYS 61–90",
      title: "Execution",
      summary: "Launch change and establish the governance rhythm.",
      items: [
        "launch two or three priority initiatives",
        "stop or re-plan low-value projects",
        "establish the executive IT steering cadence",
        "create the team-development plan",
        "establish the resilience and cybersecurity plan",
        "create a governed automation and AI portfolio with business metrics",
      ],
    },
  ],
} as const;

const services = {
  ru: [
    {
      id: "diagnostic",
      title: "Диагностика ИТ для руководства",
      format: "10–15 рабочих дней",
      description:
        "Независимая оценка систем, затрат, поставщиков, рисков, команды и портфеля проектов с приоритетами на 90 дней и дорожной картой на год.",
      price: "executiveDiagnostic",
    },
    {
      id: "fractional-cio",
      title: "Внешний ИТ-директор",
      format: "4–6 рабочих дней в месяц · минимум 3 месяца",
      description:
        "Постоянная управленческая модель: стратегия, бюджет, архитектура, команда, поставщики, устойчивость, отчётность и ключевые трансформации.",
      price: "fractionalCio",
    },
    {
      id: "interim-cio",
      title: "Временный ИТ-директор",
      format: "2–3 дня в неделю · 3–9 месяцев",
      description:
        "Руководство в переходный период: между CIO, при быстром росте, крупной замене ERP/1С/WMS/POS или подготовке постоянного руководителя.",
      price: "interimCio",
    },
    {
      id: "ai-audit",
      title: "AI-аудит и офис AI-трансформации",
      format: "3 недели или как часть ИТ-портфеля",
      description:
        "Реестр возможностей, экономические модели, готовность данных, архитектура, безопасность, выбор решений, контроль пилотов и решение о масштабировании.",
      price: "aiAudit",
    },
  ],
  en: [
    {
      id: "diagnostic",
      title: "Executive IT Diagnostic",
      format: "10–15 working days",
      description:
        "An independent view of systems, costs, vendors, risks, team, and project portfolio, with 90-day priorities and a 12-month roadmap.",
      price: "executiveDiagnostic",
    },
    {
      id: "fractional-cio",
      title: "Fractional CIO",
      format: "4–6 working days per month · minimum 3 months",
      description:
        "An ongoing management model covering strategy, budget, architecture, team, vendors, resilience, executive reporting, and key transformations.",
      price: "fractionalCio",
    },
    {
      id: "interim-cio",
      title: "Interim / Transformation CIO",
      format: "2–3 days per week · 3–9 months",
      description:
        "Leadership between CIOs, during rapid scaling, a major ERP/1C/WMS/POS replacement, or preparation for a permanent technology leader.",
      price: "interimCio",
    },
    {
      id: "ai-audit",
      title: "AI Audit and AI Transformation Office",
      format: "3 weeks or part of the IT portfolio",
      description:
        "Opportunity register, business cases, data readiness, architecture, security, vendor selection, pilot governance, and scale/stop decisions.",
      price: "aiAudit",
    },
  ],
} as const;

export const siteContent = {
  ru: {
    locale: "ru",
    descriptor: "Fractional CIO & AI-трансформация",
    nav: [
      { label: "Fractional CIO", href: "/fractional-cio" },
      { label: "AI-аудит", href: "/ai-audit" },
      { label: "Кейсы", href: "/cases" },
      { label: "Обо мне", href: "/about" },
    ],
    cta: {
      primary: "Разобрать ИТ-ситуацию",
      first90: "Посмотреть первые 90 дней",
      diagnostic: "Пройти экспресс-диагностику ИТ",
    },
    home: {
      eyebrow: "ВНЕШНИЙ ИТ-ДИРЕКТОР · FRACTIONAL CIO",
      title: "Технологическое управление для бизнеса, который вырос быстрее своей ИТ-функции",
      support:
        "Беру на себя ИТ-стратегию, бюджет, архитектуру, команду, поставщиков, устойчивость и портфель AI-инициатив — 1–3 дня в неделю, без немедленного найма CIO в штат.",
      proof:
        "25 лет в ИТ · Estée Lauder · Zielinski & Rozen · 50+ магазинов · 6 складов · международные проекты",
      microcopy:
        "30 минут, конфиденциально. Определим, нужен ли вам внешний CIO, точечная диагностика или специализированный AI-аудит.",
      situationsTitle: "Когда бизнесу нужен внешний ИТ-директор",
      situationsIntro:
        "Не по числу сотрудников, а по сложности: несколько каналов продаж, магазины и склады, 1С или ERP, интернет-магазин, критические подрядчики и зависимость выручки от систем.",
      situations: [
        [
          "ИТ держится на одном человеке",
          "Знания, решения и отношения с поставщиками сосредоточены у одного сотрудника.",
        ],
        [
          "Проекты конкурируют, но приоритетов нет",
          "ERP, интернет-магазин, склад, аналитика, инфраструктура и AI претендуют на один бюджет и одну команду.",
        ],
        [
          "ИТ-бюджет растёт, а эффект неясен",
          "Руководство видит счета и аварии, но не видит прозрачного портфеля технологических инвестиций.",
        ],
        [
          "Системы не складываются в единый контур",
          "1С, кассы, WMS, интернет-магазин, данные и решения подрядчиков развиваются отдельно.",
        ],
        [
          "Сбои и киберриски стали риском для выручки",
          "Доступность систем, права доступа, резервные копии и качество подрядчиков влияют на непрерывность бизнеса.",
        ],
        [
          "Нужен временный руководитель или поддержка ИТ-лидеру",
          "Компания находится между CIO, быстро растёт или готовит крупную трансформацию.",
        ],
      ],
      responsibilityTitle: "Одна точка ответственности за технологическую функцию",
      responsibilityIntro:
        "Внешний CIO связывает решения по системам, людям, поставщикам и рискам с экономикой и приоритетами бизнеса.",
      responsibilities: [
        "ИТ-стратегия и инвестиционная дорожная карта",
        "бюджет и контроль получения ценности",
        "архитектура и состав прикладных систем",
        "команда, роли и развитие компетенций",
        "поставщики, договоры, уровень сервиса и закупки",
        "надёжность, непрерывность и кибербезопасность",
        "ERP, 1С, кассы, WMS, интернет-магазин, данные и аналитика",
        "портфель трансформаций и AI-инициатив",
        "управленческая отчётность и поддержка решений",
      ],
      formatsTitle: "Формат зависит от управленческой задачи",
      casesTitle: "Опыт управления сложной ИТ-средой",
      aiTitle: "AI — часть технологического портфеля, а не самостоятельная магия",
      aiText:
        "Я помогаю определить, где AI действительно изменит экономику процесса, а где сначала нужно привести в порядок данные, ответственность, архитектуру или сам процесс.",
      credibilityTitle: "CIO, который понимает и совет директоров, и техническую команду",
      credibilityText:
        "Опыт управления международной ИТ-функцией в FMCG и премиальной рознице, корпоративными системами, складами, кассами, данными, инфраструктурой, рисками и распределёнными поставщиками.",
      principlesTitle: "Независимая позиция на стороне бизнеса",
      principles: [
        "Не получаю комиссий от поставщиков и не перепродаю лицензии.",
        "Работаю совместно с действующим ИТ-руководителем, а не провожу скрытый аудит против него.",
        "Для каждой инициативы фиксируются владелец, метрика, деловое обоснование и условие остановки.",
        "Первая линия и круглосуточная поддержка остаются у внутренней команды и профильных подрядчиков.",
      ],
    },
    fractional: {
      eyebrow: "FRACTIONAL CIO · ВНЕШНИЙ ИТ-ДИРЕКТОР",
      title: "Внешний ИТ-директор для растущих retail, FMCG и e-commerce компаний",
      support:
        "Стратегия, бюджет, архитектура, команда, поставщики, устойчивость и портфель трансформаций — на уровне опытного CIO без немедленного найма постоянного руководителя в штат.",
      whoTitle: "Для бизнеса со сложностью, которую уже нельзя вести по остаточному принципу",
      who: "Розничные сети, бренды FMCG и индустрии красоты, интернет-торговля, омниканальные компании и дистрибьюторы с магазинами, складами, 1С/ERP, кассами, WMS, данными и несколькими критическими поставщиками.",
      outcomesTitle: "Что меняется для руководства",
      outcomes: [
        [
          "Прозрачность",
          "Понятны полная стоимость ИТ, риски, зависимости, владельцы и статус приоритетных инициатив.",
        ],
        [
          "Приоритеты",
          "Бюджет и команда направлены на ограниченное число изменений с измеримым деловым эффектом.",
        ],
        [
          "Устойчивость",
          "Критические системы, доступы, резервное копирование и подрядчики управляются как риски для выручки.",
        ],
        [
          "Исполнение",
          "Решения документированы: у каждого есть владелец, срок, метрика и порядок эскалации.",
        ],
      ],
      cadenceTitle: "Вы покупаете управленческую модель, а не набор часов",
      cadence: [
        "1–3 рабочих дня в неделю в зависимости от формата",
        "еженедельная оперативная или проектная сверка",
        "регулярный комитет с генеральным, финансовым и операционным директорами",
        "ежемесячная управленческая панель по ИТ",
        "обзоры поставщиков и портфеля проектов",
        "наставничество и поддержка внутреннего ИТ-руководителя",
        "зафиксированные решения, владельцы, даты, риски и метрики",
      ],
      collaborationTitle: "Усиление внутреннего ИТ-лидера, а не борьба за влияние",
      collaboration:
        "Если ИТ-руководитель уже есть, я помогаю ему поднять разговор на уровень стратегии, бюджета, архитектуры и совета руководителей. Оценка проводится открыто, с согласованной ролью и без политической игры вокруг команды.",
      boundariesTitle: "Границы ответственности",
      boundaries:
        "Работаю как внешний ИТ-директор 1–3 дня в неделю на горизонте 3–12 месяцев. Беру ответственность за стратегию, управленческую модель, портфель, бюджет, поставщиков и ключевые трансформации. Ежедневная первая линия и круглосуточная поддержка остаются у внутренней команды и профильных подрядчиков.",
      faqTitle: "Вопросы о формате",
      faq: [
        [
          "Заменяет ли внешний CIO штатного руководителя?",
          "Не всегда. Формат подходит как временное руководство, как альтернатива немедленному найму или как стратегическая поддержка действующего ИТ-лидера.",
        ],
        [
          "Как начинается работа?",
          "С вводного разговора и диагностики текущей ситуации. До договора фиксируются зона ответственности, управленческий ритм, ожидаемые материалы и критерии результата.",
        ],
        [
          "Можно ли поручить вам крупное внедрение?",
          "Я могу сформировать требования, выбрать и контролировать интегратора от имени клиента. Для программы на десятки специалистов исполнение остаётся у профильной команды.",
        ],
        [
          "Всегда ли AI входит в программу?",
          "Нет. AI рассматривается как часть портфеля. Если первым приоритетом должны быть данные, архитектура, ответственность или устойчивость, это будет отражено в дорожной карте.",
        ],
      ],
    },
    first90,
    services,
    cases: sharedCases,
    casesPage: {
      eyebrow: "КЕЙСЫ · ПРОФЕССИОНАЛЬНЫЙ ОПЫТ",
      title: "Технологическое управление в рознице, FMCG и распределённых операциях",
      intro:
        "Кейсы показывают контекст, управленческую роль и характер изменений. Результаты сформулированы качественно там, где публичные точные метрики не подтверждены.",
      note: "Некоторые кейсы описаны в обезличенном или агрегированном виде. Названия работодателей указаны как часть профессионального опыта, а не как коммерческая рекомендация.",
      context: "Контекст",
      risk: "Риск для бизнеса",
      role: "Роль",
      actions: "Что было сделано",
      outcome: "Результат",
      capabilities: "Компетенции Fractional CIO",
    },
    about: {
      eyebrow: "ОБО МНЕ · СЕРГЕЙ ПОЗДНЯКОВ",
      title: "Опытный CIO, который понимает AI — а не AI-консультант, случайно знакомый с ИТ",
      opening:
        "Я прошёл путь от прикладных ИТ-проектов и корпоративных систем до управления международной ИТ-функцией. Моя специализация — превращать технологии в управляемую бизнес-функцию: со стратегией, бюджетом, ответственностью, архитектурой, устойчивостью и измеримым результатом.",
      paragraphs: [
        "В Estée Lauder я работал в роли регионального CIO для рынков Восточной и Северной Европы: отвечал за стратегию, сервисную модель, бюджет, автоматизацию, аналитику и крупные внедрения. Ранее в Panasonic вёл технологические проекты для России, СНГ и Финляндии. В Zielinski & Rozen был ИТ-директором международного премиального розничного и интернет-бизнеса.",
        "Я одинаково предметно обсуждаю приоритеты с собственником и архитектурные ограничения с инженерами. Могу проверить решение на уровне прототипа, но оцениваю его как руководитель: по владельцу, риску, полной стоимости, устойчивости и эффекту для бизнеса.",
        "Не связан комиссиями поставщиков и не защищаю заранее выбранную платформу. Иногда правильный вывод — отложить AI и сначала исправить процесс, данные или ответственность.",
        "В 2025 году я принял решение перейти к независимому консалтингу, а в феврале 2026 года завершил работу в корпоративной роли CIO.",
      ],
      factsTitle: "Рабочий масштаб",
      facts: [
        ["Магазины", "50+"],
        ["Склады", "6"],
        ["Пользователи", "500+"],
        ["Кассовые терминалы", "100+"],
        ["Товарные позиции", "7 000+"],
        ["ИТ-команда", "≈12 FTE + подрядчики"],
        ["Годовой ИТ-бюджет", "≈$1,5 млн"],
        ["Языки", "русский · English"],
      ],
      philosophyTitle: "Как я работаю",
      philosophy: [
        "Сначала деловая проблема и ответственность, затем технология.",
        "Решения и допущения фиксируются письменно.",
        "Поставщики конкурируют по прозрачным критериям.",
        "Риски обсуждаются с руководством на языке последствий для бизнеса.",
        "AI-пилот не продолжается без метрики и решения о масштабировании или остановке.",
      ],
    },
    diagnostic: {
      eyebrow: "ЭКСПРЕСС-ДИАГНОСТИКА · 3 МИНУТЫ",
      title: "Насколько управляемой стала ваша ИТ-функция",
      intro:
        "12 вопросов дадут ориентир для разговора с руководством. Это не сертификация и не научно валидированная оценка; ответы не сохраняются.",
      start: "Начать диагностику",
      question: "Вопрос",
      of: "из",
      answers: ["Нет", "Частично", "Да"],
      questions: [
        "Есть ли утверждённая ИТ-стратегия или дорожная карта на 12 месяцев?",
        "Видит ли руководство полную стоимость ИТ, включая лицензии и подрядчиков?",
        "Есть ли один владелец портфеля ИТ-проектов и правил приоритизации?",
        "Существует ли актуальная карта критических систем и зависимостей?",
        "Пересматриваются ли уровень сервиса и качество ключевых поставщиков?",
        "Проверяется ли восстановление из резервных копий и план непрерывности?",
        "Проводится ли регулярная проверка доступов и базовых киберрисков?",
        "Есть ли дисциплина управления изменениями в критических системах?",
        "Назначены ли владельцы данных и показатели их качества?",
        "Проводится ли регулярная встреча бизнеса и ИТ по приоритетам и рискам?",
        "Понятны ли роли, загрузка и дефицит компетенций ИТ-команды?",
        "Есть ли у AI-инициатив владелец, метрика и деловое обоснование?",
      ],
      resultTitle: "Предварительный результат",
      bands: [
        {
          max: 8,
          title: "Реактивное ИТ",
          observations: [
            "Критические решения, вероятно, принимаются после сбоев или по срочности.",
            "Руководству сложно сравнивать технологические инвестиции между собой.",
            "Первый шаг — получить карту систем, затрат, рисков и владельцев.",
          ],
          next: "Рекомендуемый шаг: диагностика ИТ для руководства.",
        },
        {
          max: 17,
          title: "Частично управляемое ИТ с рисками масштабирования",
          observations: [
            "Отдельные практики работают, но не образуют единую управленческую модель.",
            "Рост числа проектов и поставщиков может снижать предсказуемость.",
            "Основная задача — связать стратегию, бюджет, архитектуру и ритм решений.",
          ],
          next: "Рекомендуемый шаг: обсудить формат Fractional CIO.",
        },
        {
          max: 24,
          title: "Зрелое ИТ, которому нужна точечная внешняя поддержка",
          observations: [
            "Базовые механизмы управления уже сформированы.",
            "Внешний CIO может быть полезен для независимой проверки или крупной трансформации.",
            "AI-аудит уместен, если портфель и данные уже имеют владельцев.",
          ],
          next: "Рекомендуемый шаг: сфокусированная диагностика или AI-аудит.",
        },
      ],
      restart: "Пройти ещё раз",
    },
    contact: {
      eyebrow: "КОНТАКТ · КОНФИДЕНЦИАЛЬНО",
      title: "Разберём вашу ИТ-ситуацию",
      intro:
        "Опишите контекст без чувствительных данных. Я изучу вводные и в течение одного рабочего дня подтвержу встречу либо честно скажу, если задача находится вне моей специализации.",
      fields: {
        nameRole: "Имя и роль",
        companyWebsite: "Компания и сайт",
        complexity: "Масштаб или операционная сложность",
        problem: "Что сейчас не работает или неясно в ИТ",
        contact: "Электронная почта или Telegram",
        situation: "Что ближе к вашей ситуации?",
        consent: "Я согласен с политикой обработки данных",
        submit: "Отправить вводные",
      },
      situations: [
        "Нет ИТ-директора",
        "ИТ-руководитель есть, но нужна стратегическая поддержка",
        "Нужна временная замена CIO",
        "Предстоит ERP / 1С / WMS / POS / трансформация данных",
        "Нужно привести в порядок подрядчиков и ИТ-бюджет",
        "Нужна AI-стратегия или AI-аудит",
        "Пока не уверен",
      ],
      complexityHint:
        "Например: 80 сотрудников, 12 магазинов, склад, 1С, интернет-магазин и пять критических подрядчиков.",
      problemHint:
        "Например: бюджет растёт, проекты конкурируют, а у руководства нет общей картины рисков и приоритетов.",
      success:
        "Спасибо. Я изучу вводные и в течение одного рабочего дня подтвержу встречу либо честно скажу, если задача находится вне моей специализации.",
      error:
        "CRM сейчас не приняла заявку. Вводные не потеряны: отправьте их письмом по ссылке ниже.",
      required: "Заполните обязательное поле.",
      invalidContact: "Укажите корректную электронную почту или имя Telegram.",
      alternatives: "Другие способы связи",
    },
    footer: {
      note: "Независимое технологическое управление для растущей розницы, FMCG, индустрии красоты, интернет-торговли и дистрибуции.",
      services: "Услуги",
      resources: "Материалы",
      contact: "Контакты",
      diagnostic: "Экспресс-диагностика ИТ",
      first90: "Первые 90 дней",
      dataPolicy: "Политика данных",
      nda: "Шаблон NDA",
      aiReport: "Пример AI-отчёта",
    },
  },
  en: {
    locale: "en",
    descriptor: "Fractional CIO & AI Transformation",
    nav: [
      { label: "Fractional CIO", href: "/en/fractional-cio" },
      { label: "AI Audit", href: "/en/ai-audit" },
      { label: "Cases", href: "/en/cases" },
      { label: "About", href: "/en/about" },
    ],
    cta: {
      primary: "Discuss your IT situation",
      first90: "See the first 90 days",
      diagnostic: "Take the IT maturity check",
    },
    home: {
      eyebrow: "FRACTIONAL CIO · EXTERNAL IT LEADERSHIP",
      title: "Technology leadership for a business that has outgrown its IT function",
      support:
        "I take ownership of IT strategy, budget, architecture, team, vendors, resilience, and the AI initiative portfolio — 1–3 days per week, without an immediate full-time CIO hire.",
      proof:
        "25 years in IT · Estée Lauder · Zielinski & Rozen · 50+ stores · 6 warehouses · international programs",
      microcopy:
        "A confidential 30-minute conversation to determine whether you need a Fractional CIO, a focused diagnostic, or a specialist AI audit.",
      situationsTitle: "When an external CIO becomes necessary",
      situationsIntro:
        "The signal is operational complexity rather than headcount: several channels, stores and warehouses, ERP or 1C, e-commerce, critical vendors, and revenue dependence on system availability.",
      situations: [
        [
          "IT depends on one person",
          "Knowledge, decisions, and vendor relationships are concentrated in one employee.",
        ],
        [
          "Projects compete without clear priorities",
          "ERP, e-commerce, warehouse, analytics, infrastructure, and AI compete for the same budget and team.",
        ],
        [
          "IT spend grows while value remains unclear",
          "Management sees invoices and incidents, but not a transparent technology investment portfolio.",
        ],
        [
          "Systems do not form one landscape",
          "1C, POS, WMS, e-commerce, data, and vendor solutions evolve independently.",
        ],
        [
          "Incidents and cyber risk threaten revenue",
          "Availability, access, backup, and vendor quality directly affect business continuity.",
        ],
        [
          "A temporary leader or support for the current IT lead is needed",
          "The company is between CIOs, scaling rapidly, or preparing a major transformation.",
        ],
      ],
      responsibilityTitle: "One point of accountability for the technology function",
      responsibilityIntro:
        "A Fractional CIO connects systems, people, vendors, and risk to the economics and priorities of the business.",
      responsibilities: [
        "IT strategy and investment roadmap",
        "budget and value realization",
        "architecture and application landscape",
        "team, roles, and capability development",
        "vendors, contracts, SLA, and sourcing",
        "reliability, continuity, and cybersecurity",
        "ERP, 1C, POS, WMS, e-commerce, data, and analytics",
        "transformation and AI initiative portfolio",
        "executive reporting and decision support",
      ],
      formatsTitle: "The format follows the management problem",
      casesTitle: "Experience leading complex technology environments",
      aiTitle: "AI is part of the technology portfolio, not a standalone magic trick",
      aiText:
        "I help determine where AI can change process economics and where data, ownership, architecture, or the process itself must be fixed first.",
      credibilityTitle: "A CIO who can work with both the board and the engineering team",
      credibilityText:
        "Technology leadership across international FMCG and premium retail, enterprise systems, warehouses, POS, data, infrastructure, risk, and distributed vendors.",
      principlesTitle: "Independent advice aligned with the business",
      principles: [
        "No vendor commission and no hidden license resale incentive.",
        "Partnership with the existing IT leader, never a secret audit against them.",
        "Every initiative has an owner, metric, business case, and stop condition.",
        "First-line and 24/7 support remain with the internal team and specialist providers.",
      ],
    },
    fractional: {
      eyebrow: "FRACTIONAL CIO · EXTERNAL IT LEADERSHIP",
      title: "Fractional CIO for growing retail, FMCG, and e-commerce companies",
      support:
        "Strategy, budget, architecture, team, vendors, resilience, and transformation portfolio — at experienced CIO level without an immediate permanent executive hire.",
      whoTitle: "For businesses whose technology can no longer be managed as a side responsibility",
      who: "Retail networks, FMCG and beauty brands, e-commerce, omnichannel businesses, and distributors with stores, warehouses, ERP or 1C, POS, WMS, data, and several critical vendors.",
      outcomesTitle: "What changes for the executive team",
      outcomes: [
        [
          "Visibility",
          "Total IT cost, risk, dependencies, ownership, and priority initiative status become clear.",
        ],
        [
          "Priorities",
          "Budget and capacity are focused on a limited number of changes with measurable business value.",
        ],
        [
          "Resilience",
          "Critical systems, access, backup, and vendors are managed as revenue continuity risks.",
        ],
        ["Execution", "Decisions are documented with an owner, date, metric, and escalation path."],
      ],
      cadenceTitle: "You buy a management model, not a bundle of hours",
      cadence: [
        "1–3 working days per week depending on the format",
        "weekly operational or transformation checkpoint",
        "regular CEO, CFO, and COO steering meeting",
        "monthly executive IT dashboard",
        "vendor and portfolio reviews",
        "coaching and support for the internal IT manager",
        "documented decisions, owners, dates, risks, and metrics",
      ],
      collaborationTitle:
        "Strengthening the internal IT leader rather than competing for influence",
      collaboration:
        "Where an IT manager already exists, I help elevate the conversation to strategy, budget, architecture, and executive governance. The assessment is transparent, with an agreed role and no political work around the team.",
      boundariesTitle: "Accountability boundaries",
      boundaries:
        "I work as a Fractional CIO 1–3 days per week over a 3–12 month horizon, taking ownership of strategy, the management model, portfolio, budget, vendors, and key transformations. Daily first-line and 24/7 support remain with the internal team and specialist providers.",
      faqTitle: "Questions about the format",
      faq: [
        [
          "Does a Fractional CIO replace a permanent leader?",
          "Not necessarily. The format works as interim leadership, an alternative to an immediate hire, or strategic support for the current IT leader.",
        ],
        [
          "How does the engagement start?",
          "With a context discussion and current-state diagnostic. Responsibility, cadence, deliverables, and acceptance criteria are agreed before contracting.",
        ],
        [
          "Can you run a major implementation?",
          "I can shape requirements, select an integrator, and govern delivery on the client's behalf. A program requiring dozens of specialists remains with a dedicated delivery team.",
        ],
        [
          "Is AI always part of the program?",
          "No. AI is considered as part of the portfolio. If data, architecture, ownership, or resilience must come first, the roadmap will say so.",
        ],
      ],
    },
    first90,
    services,
    cases: sharedCases,
    casesPage: {
      eyebrow: "CASES · PROFESSIONAL EXPERIENCE",
      title: "Technology leadership across retail, FMCG, and distributed operations",
      intro:
        "These cases show context, leadership accountability, and the nature of change. Outcomes remain qualitative where approved public metrics are unavailable.",
      note: "Some cases are anonymized or aggregated. Former employer names are shown as career history, not as commercial endorsement.",
      context: "Context",
      risk: "Business risk",
      role: "Role",
      actions: "Actions",
      outcome: "Outcome",
      capabilities: "Fractional CIO capabilities",
    },
    about: {
      eyebrow: "ABOUT · SERGEY POZDNYAKOV",
      title:
        "An experienced CIO who understands AI, not an AI consultant who happened to work in IT",
      opening:
        "I progressed from applied technology programs and enterprise systems to leading an international IT function. My specialization is turning technology into a managed business capability with strategy, budget, accountability, architecture, resilience, and measurable outcomes.",
      paragraphs: [
        "At Estée Lauder I worked in a regional CIO role across Eastern and Northern European markets, accountable for strategy, service model, budget, automation, analytics, and major rollouts. Earlier at Panasonic I led technology programs for Russia, CIS, and Finland. At Zielinski & Rozen I served as CIO of an international premium retail and e-commerce business.",
        "I can discuss priorities with an owner and architecture constraints with engineers. I can test a solution at prototype level, but evaluate it as an executive: through ownership, risk, total cost, resilience, and business value.",
        "I am independent of vendor commissions and do not defend a preselected platform. Sometimes the right recommendation is to postpone AI and fix the process, data, or accountability first.",
        "In 2025, I decided to transition into independent advisory work, and in February 2026 I completed my corporate CIO role.",
      ],
      factsTitle: "Operating scale",
      facts: [
        ["Stores", "50+"],
        ["Warehouses", "6"],
        ["Users", "500+"],
        ["POS terminals", "100+"],
        ["SKUs", "7,000+"],
        ["IT team", "≈12 FTE + vendors"],
        ["Annual IT budget", "≈$1.5m"],
        ["Languages", "English · русский"],
      ],
      philosophyTitle: "How I work",
      philosophy: [
        "Business problem and ownership before technology.",
        "Decisions and assumptions are documented.",
        "Vendors compete against transparent criteria.",
        "Risk is discussed with executives in terms of business consequences.",
        "An AI pilot does not continue without a metric and a scale-or-stop decision.",
      ],
    },
    diagnostic: {
      eyebrow: "IT MATURITY CHECK · 3 MINUTES",
      title: "How managed has your IT function become?",
      intro:
        "Twelve questions provide a useful starting point for an executive discussion. This is not a certification or a scientifically validated assessment, and answers are not stored.",
      start: "Start the check",
      question: "Question",
      of: "of",
      answers: ["No", "Partly", "Yes"],
      questions: [
        "Is there an approved IT strategy or 12-month roadmap?",
        "Does management see total IT cost, including licenses and vendors?",
        "Is there one owner for the project portfolio and prioritization rules?",
        "Is there a current map of critical systems and dependencies?",
        "Are key-vendor SLA and performance reviewed regularly?",
        "Are backup restoration and continuity plans tested?",
        "Are access rights and basic cybersecurity risks reviewed regularly?",
        "Is there change-management discipline for critical systems?",
        "Are data owners and data-quality measures assigned?",
        "Is there a regular business/IT steering meeting?",
        "Are IT team roles, capacity, and capability gaps clear?",
        "Do AI initiatives have an owner, metric, and business case?",
      ],
      resultTitle: "Indicative result",
      bands: [
        {
          max: 8,
          title: "Reactive IT",
          observations: [
            "Critical decisions are likely driven by incidents or urgency.",
            "Management may struggle to compare technology investments.",
            "The first step is a map of systems, cost, risk, and ownership.",
          ],
          next: "Recommended next step: Executive IT Diagnostic.",
        },
        {
          max: 17,
          title: "Partially managed IT with scaling risks",
          observations: [
            "Individual practices exist but do not form one management model.",
            "More projects and vendors can reduce predictability.",
            "The priority is to connect strategy, budget, architecture, and governance cadence.",
          ],
          next: "Recommended next step: discuss the Fractional CIO format.",
        },
        {
          max: 24,
          title: "Mature IT requiring focused external support",
          observations: [
            "Core management mechanisms are already in place.",
            "A Fractional CIO can add value through independent challenge or major transformation.",
            "An AI Audit is appropriate where portfolio and data ownership already exist.",
          ],
          next: "Recommended next step: focused diagnostic or AI Audit.",
        },
      ],
      restart: "Run again",
    },
    contact: {
      eyebrow: "CONTACT · CONFIDENTIAL",
      title: "Discuss your IT situation",
      intro:
        "Share the context without sensitive data. I will review it and respond within one business day to confirm a meeting or explain honestly if the task is outside my area of expertise.",
      fields: {
        nameRole: "Name and role",
        companyWebsite: "Company and website",
        complexity: "Business size or operational complexity",
        problem: "What is currently not working or not clear in IT",
        contact: "Email or Telegram",
        situation: "Which situation is closest?",
        consent: "I agree to the data policy",
        submit: "Send context",
      },
      situations: [
        "There is no IT director",
        "There is an IT leader, but strategic support is needed",
        "A temporary CIO replacement is needed",
        "An ERP / 1C / WMS / POS / data transformation is ahead",
        "Vendors and IT budget need to be brought under control",
        "An AI strategy or AI Audit is needed",
        "Not sure yet",
      ],
      complexityHint:
        "For example: 80 people, 12 stores, a warehouse, 1C, e-commerce, and five critical vendors.",
      problemHint:
        "For example: spend is growing, projects compete, and management lacks one view of risks and priorities.",
      success:
        "Thank you. I will review the context and respond within one business day to confirm a meeting or explain honestly if the task is outside my area of expertise.",
      error:
        "The CRM did not accept the request. Your context is still available: send it by email using the link below.",
      required: "Please complete this field.",
      invalidContact: "Enter a valid email address or Telegram handle.",
      alternatives: "Alternative contact methods",
    },
    footer: {
      note: "Independent technology leadership for growing retail, FMCG, beauty, e-commerce, and distribution businesses.",
      services: "Services",
      resources: "Resources",
      contact: "Contact",
      diagnostic: "IT maturity check",
      first90: "First 90 days",
      dataPolicy: "Data policy",
      nda: "NDA template",
      aiReport: "AI Audit report example",
    },
  },
} as const;

export function getSiteContent(locale: Locale) {
  return siteContent[locale];
}

export function localizedPath(locale: Locale, path: string) {
  if (locale === "en") {
    return path === "/" ? "/en" : `/en${path}`;
  }
  return path;
}

export function alternateLocalePath(pathname: string, locale: Locale) {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (locale === "en") {
    const ruPath = normalized.startsWith("/en") ? normalized.slice(3) || "/" : normalized;
    return ruPath;
  }
  return normalized.startsWith("/en")
    ? normalized
    : normalized === "/"
      ? "/en"
      : `/en${normalized}`;
}
