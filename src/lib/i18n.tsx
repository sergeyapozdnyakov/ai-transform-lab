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
      widgetCaption: "Производство, 180 чел. Обработка B2B-заявок.",
      widgetLabel: "ИНТЕРАКТИВ · ПЕРЕТАЩИТЕ",
      before: "СЕЙЧАС",
      after: "С AI",
      metrics: [
        { label: "Цикл заявки", from: 3.2, to: 1.1, suffix: " дн", deltaInverted: true },
        { label: "Ошибки специф.", from: 11.8, to: 2.9, suffix: "%", deltaInverted: true },
        { label: "Конверсия", from: 17.5, to: 28.4, suffix: "%", deltaInverted: false },
        { label: "Заявок/день", from: 9, to: 24, suffix: "", deltaInverted: false },
      ],
      flowBefore: ["Заявка", "Excel", "Склад", "РОП", "КП"],
      flowAfter: ["Заявка", "AI-агент", "Авто-сверка", "Матрица", "КП"],
      captionBefore:
        "Заявки приходят по email, в чат, через форму. Менеджер копирует в Excel-спецификацию, сверяет склад через ERP, согласует цену с РОПом. 8–10 заявок в день. Ошибки находят на производстве.",
      captionAfter:
        "AI-агент извлекает данные из заявки в любом формате, сверяет спецификацию с базой, формирует черновик КП по матрице скидок. Менеджер только проверяет. 22–26 заявок в день. Ошибки — на входе.",
      stack: "STACK: GPT-4.1 + Claude · LangGraph · Postgres · n8n · ERP webhook",
      disclaimer: "Медианные показатели 6 внедрений в производственных компаниях 80–300 чел. за 2024–2025.",
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
      sub: "Реальный пример: коммерческое предложение от поставщика. Разные форматы цен, скрытые скидки, размазанные сроки — обычная боль отдела закупок.",
      tabs: ["Документ", "Анализ", "Результат"],
      docMeta: "КП-2026/318 · PDF · 1 стр.",
      statusIdle: "○ ОЖИДАНИЕ",
      statusParsing: "● АНАЛИЗ",
      statusDone: "● ИЗВЛЕЧЕНО",
      caption:
        "Извлечение данных из 50-страничного КП — 8 секунд. Точность 96% на структурированных полях, 89% на сложных условиях. Поле review_required — места, где AI намеренно просит проверки человеком, а не угадывает.",
      reviewLabel: "REVIEW REQUIRED",
      reviewItem: "items[1].vat_included — не указано явно",
      bracketLabels: [
        "supplier_info",
        "document_meta",
        "line_items × 3",
        "payment_terms",
        "validity",
        "delivery",
      ],
      techRunning: "RUNNING: gpt-4.1-mini → extraction",
      techTokens: "TOKENS: 487 / 12 000",
      techTime: "TIME: 1.34s",
      techConf: "CONFIDENCE: calculating…",
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
      label: "АГРЕССИВНАЯ ПРИКИДКА",
      title: "Прикиньте, сколько вы теряете на ручных процессах",
      sub: "Калькулятор основан на медианах исследований McKinsey, Deloitte и BCG по AI-внедрениям в среднем бизнесе. Точная цифра — после аудита.",
      teamSize: "Сотрудников в офисных ролях",
      hours: "Часов рутины в неделю на сотрудника",
      rate: "Средняя стоимость часа (₽)",
      currentCost: "Текущие затраты в год",
      saving: "Экономия с AI (62% автоматизации)",
      errorSaving: "Экономия на ошибках и переделках",
      totalSaving: "Итого экономия в год",
      implCost: "Стоимость внедрения",
      payback: "Окупаемость",
      months: "мес",
      deadZone: "ЗОНА НЕЭФФЕКТИВНОСТИ",
      currentBar: "СЕЙЧАС",
      afterBar: "С AI",
      disclaimer:
        "Расчёт использует усреднённые показатели из исследований McKinsey, Deloitte и BCG по AI-внедрениям в компаниях 50–500 чел. за 2023–2025 гг. Реальная экономия зависит от структуры процессов, готовности данных и культуры компании. Для точной оценки — 3-недельный аудит.",
      cta: "Получить персональный расчёт",
    },
    procmap: {
      label: "06 / ЧТО ВЫ ПОЛУЧИТЕ",
      title: "Карта процессов с точками внедрения AI",
      sub: "Фрагмент типовой деливерабельной карты. Узлы — процессы, красные кольца — bottleneck-и, нумерованные маркеры — рекомендации AI.",
      toggle: "Показать рекомендации",
      bottleneckLegend: "Bottleneck",
      aiPointLegend: "AI-точка",
      deliverables: [
        "Карта 12–18 ключевых процессов с метриками",
        "3–5 приоритетных точек внедрения AI",
        "Технические решения и стек по каждой точке",
        "Оценка стоимости, сроков и рисков",
        "KPI и план измерения эффекта",
        "Презентация на 1 слайд для совета директоров",
      ],
      tooltipHint: "Включите тоггл и наведите на маркер",
      tooltipLabels: {
        solution: "РЕШЕНИЕ",
        integrations: "ИНТЕГРАЦИИ",
        timeline: "СРОК ВНЕДРЕНИЯ",
        effect: "ЭФФЕКТ",
        category: "КАТЕГОРИЯ",
      },
      recommendations: [
        {
          title: "AI-квалификация лидов",
          solution: "AI-агент проверяет контрагента через 6 источников за 8 секунд: реестр ФНС, скоринг, история сделок, отзывы.",
          integrations: "AmoCRM / Bitrix · Dadata · СБИС API",
          timeline: "2–3 недели",
          effect: "+18% лидов · −89% времени",
          category: "QUICK WIN ⚡",
        },
        {
          title: "AI-ассистент для КП",
          solution: "Подбор позиций из каталога 12 000 SKU и расчёт скидок по матрице. Снижение ошибок в цене с 8% до 1%.",
          integrations: "1С · pgvector · Excel-матрица скидок",
          timeline: "4–6 недель",
          effect: "−75% времени на КП",
          category: "CORE",
        },
        {
          title: "Автосогласование скидок",
          solution: "Правила автоодобрения до 10%, эскалация только нестандартных кейсов. RAG по истории решений РОПа.",
          integrations: "AmoCRM · Telegram бот · n8n",
          timeline: "2 недели",
          effect: "−0.8 дня ожидания",
          category: "QUICK WIN ⚡",
        },
        {
          title: "AI-мониторинг заказов",
          solution: "Агент собирает статусы из ERP, CRM и склада, проактивно уведомляет о рисках просрочки.",
          integrations: "ERP · WMS · CRM · Slack",
          timeline: "5–7 недель",
          effect: "−72% просрочек",
          category: "CORE",
        },
      ],
      bottleneckReasons: [
        "Ручная проверка ИНН и реквизитов через 4 сервиса. Потеря 23% лидов.",
        "Ручной подбор позиций из 12 000 SKU. Ошибки в цене 8%.",
        "Согласование скидок свыше 10% с РОПом. Среднее ожидание 0.8 дня.",
        "Мониторинг статусов в 3 системах вручную. Просрочки в 14% заказов.",
      ],
    },
    faq: {
      label: "07 / ВОПРОСЫ",
      notFoundText: "Не нашли ответ? Напишите в Telegram — отвечу лично в течение нескольких часов.",
      notFoundCta: "Открыть Telegram",
      telegramUrl: "https://t.me/",
      groups: [
        {
          title: "Деньги и условия",
          items: [
            { q: "Сколько стоит аудит?", a: "Аудит стоит от 280 до 450 тыс. ₽ в зависимости от размера компании и количества процессов, которые нужно проанализировать. Для компаний 50–150 человек обычно 280–340 тыс., для 150–500 — 340–450 тыс.\n\nВ цену входит: до 12 интервью с руководителями и ключевыми сотрудниками, анализ существующего ИТ-ландшафта, документ-результат на 30–50 страниц, презентация для топ-менеджмента и 2 недели пост-аудит поддержки на уточняющие вопросы.\n\nЭто фиксированная цена — не почасовая. Если процесс окажется сложнее ожидаемого, вы не платите больше." },
            { q: "Это много или мало по рынку?", a: "По рынку 2026 года это нижняя граница для уровня «ИТ-директор с 25-летним опытом». Крупные интеграторы (КРОК, Lanit, Информзащита) берут за аналогичный аудит от 1.5 до 4 млн ₽ — но в их цену зашита команда из 4–6 человек, бренд и накладные расходы агентства.\n\nЯ работаю один, без агентских надбавок. Вы платите за экспертизу, а не за чужую инфраструктуру. На западном рынке аналогичный fractional CIO consulting стоит $15–25k." },
            { q: "А если после аудита я не захочу ничего внедрять?", a: "Это абсолютно нормальный исход, и я заранее предупреждаю об этом каждого клиента. Примерно 1 из 5 аудитов заканчивается рекомендацией не внедрять AI прямо сейчас — потому что у компании более приоритетные проблемы (бардак в данных, отсутствие процессов, организационные вопросы). Это тоже полезный результат.\n\nВ аудите я не заинтересован в «продаже внедрения любой ценой» — моя репутация работает на длинной дистанции, и неудачный проект мне дороже потерянного контракта." },
            { q: "Обязательно ли потом внедрять у вас?", a: "Нет. Дорожная карта в аудите написана так, чтобы её мог реализовать любой компетентный подрядчик — вы получаете технические спецификации, оценки, критерии выбора стека. Если у вас есть внутренняя команда — она внедрит сама. Если хотите выбрать другого подрядчика — отчёт ему передадите.\n\nОколо 60% клиентов после аудита заказывают внедрение у меня — потому что я уже погружён в контекст и это быстрее. Но это ваш выбор, не моё условие." },
          ],
        },
        {
          title: "Процесс и результат",
          items: [
            { q: "Что конкретно я получу в конце?", a: "Три осязаемых результата.\n\nПервый — документ-отчёт на 30–50 страниц: карта текущих процессов с метриками, выявленные точки внедрения AI с приоритизацией по ROI и сложности, оценка инвестиций и сроков по каждому направлению, анализ рисков, рекомендации по стеку и подрядчикам.\n\nВторой — дорожная карта на 6–12 месяцев: что внедрять в каком порядке, зависимости между проектами, ожидаемые метрики на каждом этапе.\n\nТретий — 1–2 quick wins, которые вы можете реализовать сразу, в течение месяца после аудита, своими силами или с минимальной помощью. Это даёт мгновенную окупаемость самого аудита.\n\nПлюс презентация для совета директоров или акционеров, если нужна." },
            { q: "Сроки реально 3 недели?", a: "Да, если со стороны компании выделен координатор, который помогает организовать интервью и собрать первичные данные. Сценарий «3 недели» подразумевает, что я провожу 8–12 интервью за первые 5–7 рабочих дней, что требует слотов в календарях руководителей.\n\nЕсли координация затягивается, реальный срок может вырасти до 4–5 недель. В договоре фиксируется и тот, и другой сценарий — вы заранее знаете, от чего зависит скорость." },
            { q: "А если у нас нет чистых данных и нормальной аналитики?", a: "Это типичная ситуация — примерно у 7 из 10 компаний среднего бизнеса с этим проблемы. И это не противопоказание к аудиту, а одна из причин его провести.\n\nЧасть аудита — оценка готовности данных. Если данные не готовы, в дорожную карту попадёт отдельный этап «data foundation» на 2–4 месяца перед основными AI-внедрениями. Без этого этапа любой AI-проект провалится, и лучше узнать это до того, как вы потратите миллионы." },
            { q: "Откуда цифры в калькуляторе ROI и в кейсах на сайте?", a: "Это важный вопрос, отвечаю развёрнуто.\n\nКалькулятор ROI использует усреднённые показатели из открытых исследований: McKinsey «State of AI» (2024), Deloitte «AI Adoption Survey» и BCG «GenAI Value Creation Report». Конкретно — медианная автоматизация рутинных задач в среднем бизнесе оценивается в 55–70%, я использую консервативные 62%. Снижение ошибок — 35–45% по тем же источникам, я беру 40%.\n\nЧисла в hero-демо (66% сокращение цикла, 75% снижение ошибок) — это медианы из 6 проектов внедрения AI в производственных компаниях 80–300 человек, которые я лично анализировал в 2024–2025. Я намеренно не использую названия конкретных клиентов — это вопрос NDA. На запросе по email готов прислать анонимизированные кейсы со ссылками на проверяющих.\n\nЧто важно: я не использую «выдающиеся» кейсы (типа «сэкономили 95%») — они нерепрезентативны и создают завышенные ожидания. На сайте намеренно показаны «хорошие, но достижимые» результаты." },
          ],
        },
        {
          title: "Доверие и риски",
          items: [
            { q: "NDA и конфиденциальность? У нас чувствительные данные.", a: "NDA подписывается до начала любых интервью, в стандартной взаимной форме. Готов работать по вашему шаблону NDA или предложить свой.\n\nВ процессе аудита я не получаю доступ к боевым системам и реальным данным клиентов вашей компании — только к описаниям процессов, метрикам в агрегированном виде и тестовым/демо-данным. Это намеренная архитектура работы: чем меньше у меня доступа к чувствительной информации, тем меньше риск для вас.\n\nВсе артефакты аудита (записи интервью, заметки, документы) хранятся в зашифрованном виде и удаляются через 90 дней после сдачи проекта, если иное не оговорено отдельно." },
            { q: "Чем вы отличаетесь от крупного интегратора?", a: "Три ключевых отличия.\n\nГлубина против ширины. Интегратор продаёт вам решение из своего портфеля и заинтересован, чтобы оно было больше. Я не продаю готовых решений — я подбираю оптимальный путь именно под вашу ситуацию, включая опцию «не внедрять AI прямо сейчас».\n\nСкорость. Аудит у интегратора — это 6–12 недель, потому что внутри ходит цепочка из аккаунт-менеджера, пресейла, архитектора, дизайнера, project-менеджера. У меня — 3 недели, потому что вся работа делается одним человеком с 25-летним опытом.\n\nЛичная ответственность. На проекте у интегратора вы общаетесь с менеджером проекта, а реальную работу делают мидл-разработчики. У меня анализ и решения делает тот же человек, с которым вы подписали договор.\n\nМинусы тоже честно: я не подойду, если вам нужен проект на 50+ человекомесяцев с одновременной разработкой по 5 направлениям. Это уже история про интегратора." },
            { q: "Работаете ли с зарубежными клиентами?", a: "Да. Английский — рабочий, опыт работы с международными командами и партнёрами есть. Для зарубежных клиентов аудит проводится по той же методологии, цена — $5–9k в зависимости от размера компании.\n\nДокументация в этом случае готовится на английском, презентация может быть на английском или билингвой. Часовые пояса — работаю комфортно в диапазоне от GMT−5 до GMT+8." },
            { q: "Что если результат меня не устроит?", a: "В договоре есть пункт о гарантии переработки: если итоговый отчёт не соответствует согласованному скоупу или содержит существенные пробелы — переработка за мой счёт, до достижения согласованного качества.\n\nВозврат денег как таковой не предусматривается, потому что работа уже выполнена и интеллектуальная собственность вам передана. Реальных кейсов, когда клиент остался недоволен и попросил переработку, за последние годы было два — оба разрешены доработкой в течение недели.\n\nПеред началом проекта мы фиксируем критерии готовности результата в техзадании — что должно быть в отчёте, до какого уровня детализации, какие вопросы должны быть закрыты. Это снимает 90% потенциальных разногласий." },
          ],
        },
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
      widgetCaption: "Manufacturing, 180 employees. B2B request processing.",
      widgetLabel: "INTERACTIVE · DRAG",
      before: "NOW",
      after: "WITH AI",
      metrics: [
        { label: "Request cycle", from: 3.2, to: 1.1, suffix: " d", deltaInverted: true },
        { label: "Spec errors", from: 11.8, to: 2.9, suffix: "%", deltaInverted: true },
        { label: "Conversion", from: 17.5, to: 28.4, suffix: "%", deltaInverted: false },
        { label: "Requests/day", from: 9, to: 24, suffix: "", deltaInverted: false },
      ],
      flowBefore: ["Request", "Excel", "Stock", "Sales lead", "Quote"],
      flowAfter: ["Request", "AI agent", "Auto-check", "Pricing", "Quote"],
      captionBefore:
        "Requests arrive by email, chat, web form. A manager copies them into an Excel spec, checks stock in the ERP, gets price approval from the sales lead. 8–10 requests/day. Errors are found in production.",
      captionAfter:
        "AI agent extracts data from a request in any format, matches the spec against the catalog, drafts a quote using the discount matrix. Manager only reviews. 22–26 requests/day. Errors caught at intake.",
      stack: "STACK: GPT-4.1 + Claude · LangGraph · Postgres · n8n · ERP webhook",
      disclaimer: "Median of 6 deployments in manufacturing companies (80–300 employees) in 2024–2025.",
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
      sub: "A real example: a supplier's commercial proposal. Mixed price formats, hidden discounts, scattered terms — the typical pain of any procurement team.",
      tabs: ["Document", "Analysis", "Result"],
      docMeta: "Proposal #2026/318 · PDF · 1 page",
      statusIdle: "○ IDLE",
      statusParsing: "● PARSING",
      statusDone: "● EXTRACTED",
      caption:
        "Extracting data from a 50-page proposal — 8 seconds. 96% accuracy on structured fields, 89% on complex terms. The review_required field marks places where the AI deliberately asks for human review instead of guessing.",
      reviewLabel: "REVIEW REQUIRED",
      reviewItem: "items[1].vat_included — not stated explicitly",
      bracketLabels: [
        "supplier_info",
        "document_meta",
        "line_items × 3",
        "payment_terms",
        "validity",
        "delivery",
      ],
      techRunning: "RUNNING: gpt-4.1-mini → extraction",
      techTokens: "TOKENS: 487 / 12 000",
      techTime: "TIME: 1.34s",
      techConf: "CONFIDENCE: calculating…",
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
      label: "AGGRESSIVE ESTIMATE",
      title: "See how much manual work is costing you",
      sub: "Calculator based on medians from McKinsey, Deloitte and BCG research on AI deployments in mid-market. Precise number — after the audit.",
      teamSize: "Employees in office roles",
      hours: "Hours of routine work per week per employee",
      rate: "Average hourly cost (₽)",
      currentCost: "Current annual cost",
      saving: "Savings with AI (62% automation)",
      errorSaving: "Savings on errors and rework",
      totalSaving: "Total annual savings",
      implCost: "Implementation cost",
      payback: "Payback",
      months: "mo",
      deadZone: "ZONE OF INEFFICIENCY",
      currentBar: "NOW",
      afterBar: "WITH AI",
      disclaimer:
        "Calculation uses averaged figures from McKinsey, Deloitte and BCG research on AI deployments in companies of 50–500 employees, 2023–2025. Actual savings depend on process structure, data readiness and company culture. For a precise estimate — a 3-week audit.",
      cta: "Get a personal estimate",
    },
    procmap: {
      label: "06 / WHAT YOU GET",
      title: "Process map with AI implementation points",
      sub: "A fragment of a typical deliverable map. Nodes are processes, red rings are bottlenecks, numbered markers are AI recommendations.",
      toggle: "Show recommendations",
      bottleneckLegend: "Bottleneck",
      aiPointLegend: "AI point",
      deliverables: [
        "Map of 12–18 key processes with metrics",
        "3–5 priority AI implementation points",
        "Technical solutions and stack per point",
        "Cost, timeline and risk estimates",
        "KPIs and a plan to measure impact",
        "A one-slide summary for the board",
      ],
      tooltipHint: "Toggle on and hover a marker",
      tooltipLabels: {
        solution: "SOLUTION",
        integrations: "INTEGRATIONS",
        timeline: "TIMELINE",
        effect: "EXPECTED EFFECT",
        category: "CATEGORY",
      },
      recommendations: [
        {
          title: "AI lead qualification",
          solution: "AI agent checks the counterparty across 6 sources in 8 seconds: tax registry, scoring, deal history, reviews.",
          integrations: "AmoCRM / Bitrix · Dadata · SBIS API",
          timeline: "2–3 weeks",
          effect: "+18% leads · −89% time",
          category: "QUICK WIN ⚡",
        },
        {
          title: "AI quote builder",
          solution: "Picks items from a 12 000-SKU catalog and applies discount-matrix pricing. Pricing errors drop from 8% to 1%.",
          integrations: "1C · pgvector · discount-matrix",
          timeline: "4–6 weeks",
          effect: "−75% time per quote",
          category: "CORE",
        },
        {
          title: "Discount auto-approval",
          solution: "Auto-approve up to 10%, escalate only edge cases. RAG over the sales lead's historical decisions.",
          integrations: "AmoCRM · Telegram bot · n8n",
          timeline: "2 weeks",
          effect: "−0.8 days of waiting",
          category: "QUICK WIN ⚡",
        },
        {
          title: "AI order monitoring",
          solution: "Agent pulls statuses from ERP, CRM and warehouse, proactively flags delay risk.",
          integrations: "ERP · WMS · CRM · Slack",
          timeline: "5–7 weeks",
          effect: "−72% late orders",
          category: "CORE",
        },
      ],
      bottleneckReasons: [
        "Manual checks of tax IDs across 4 services. 23% of leads lost.",
        "Manual selection from 12 000 SKUs. 8% pricing errors.",
        "Discounts above 10% need sales lead approval. 0.8 days of waiting on average.",
        "Status monitoring across 3 systems by hand. 14% of orders run late.",
      ],
    },
    faq: {
      label: "07 / FAQ",
      items: [
        { q: "How much does the audit cost?", a: "Fixed price — €9,500 for 3 weeks. Includes the full team, the document and the board presentation." },
        { q: "Who does the work?", a: "Me personally + 1–2 architects per engagement. No juniors, no account managers. All interviews and the final defense — by me." },
        { q: "Where do the calculator numbers come from?", a: "Averaged figures from McKinsey State of AI 2024, Deloitte AI Adoption Survey and BCG GenAI Value Report. The 62% automation share is the lower bound of optimistic benchmarks (55–70%). Real numbers get calibrated during the first audit." },
        { q: "What if we already have AI pilots?", a: "Even better. The audit will show which ones to scale and which to shut down. Savings from shutting down often beat new launches." },
        { q: "Will you sign an NDA?", a: "Yes, a standard mutual NDA before the first interview. We can use your template." },
        { q: "Remote?", a: "Yes. Interviews via Zoom. One on-site visit at our cost if needed." },
        { q: "What's your usual stack?", a: "Stack depends on the task. Often: OpenAI / Anthropic for LLM, LangGraph or custom orchestration, pgvector for RAG, n8n / Temporal for workflows." },
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
