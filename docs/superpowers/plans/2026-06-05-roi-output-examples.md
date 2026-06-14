# ROI Output Examples Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать локальный пакет типовых расчётов окупаемости и выходных документов для аудита возможностей искусственного интеллекта.

**Architecture:** Пакет хранится в `docs/client-audit-library/roi-output-examples/` как независимые Markdown-документы. Общий шаблон расчёта задаёт формулы и правила допущений; два примера показывают методику на ритейле и профессиональных услугах; структура отчёта и запрос данных превращают примеры в рабочий клиентский инструмент.

**Tech Stack:** Markdown, локальные документы проекта, демонстрационные расчёты.

---

## File Structure

- Create: `docs/client-audit-library/roi-output-examples/00-roi-model-template.md` — универсальная модель расчёта окупаемости.
- Create: `docs/client-audit-library/roi-output-examples/01-retail-stock-roi-example.md` — пример для запасов, дефицита и неликвидов.
- Create: `docs/client-audit-library/roi-output-examples/02-document-intake-roi-example.md` — пример для первичного разбора документов.
- Create: `docs/client-audit-library/roi-output-examples/sample-output-report-structure.md` — структура выходного отчёта после аудита.
- Create: `docs/client-audit-library/roi-output-examples/client-data-request.md` — шаблон запроса данных.

### Task 1: Create Shared ROI Model

**Files:**

- Create: `docs/client-audit-library/roi-output-examples/00-roi-model-template.md`

- [ ] **Step 1: Create folder**

Run: `New-Item -ItemType Directory -Force 'docs\client-audit-library\roi-output-examples'`

Expected: folder exists.

- [ ] **Step 2: Add shared calculation model**

Add sections:

- purpose and non-promise disclaimer;
- input data groups;
- formulas for labor savings, loss reduction, revenue/margin effect, cost of ownership;
- conservative, base and high scenarios;
- payback period;
- pilot-readiness checklist.

### Task 2: Create Two ROI Examples

**Files:**

- Create: `docs/client-audit-library/roi-output-examples/01-retail-stock-roi-example.md`
- Create: `docs/client-audit-library/roi-output-examples/02-document-intake-roi-example.md`

- [ ] **Step 1: Add retail stock example**

Include:

- typical situation;
- assumptions;
- formulas;
- three scenarios;
- output documents;
- non-AI improvements;
- AI scenarios;
- risks and pilot checks.

- [ ] **Step 2: Add document intake example**

Include:

- typical situation;
- assumptions;
- formulas;
- three scenarios;
- output documents;
- non-AI improvements;
- AI scenarios;
- risks and pilot checks.

### Task 3: Create Output Report And Data Request Templates

**Files:**

- Create: `docs/client-audit-library/roi-output-examples/sample-output-report-structure.md`
- Create: `docs/client-audit-library/roi-output-examples/client-data-request.md`

- [ ] **Step 1: Add output report structure**

Include:

- executive summary;
- process map;
- bottleneck table;
- ROI model;
- solution options;
- pilot roadmap;
- risk register;
- appendix.

- [ ] **Step 2: Add client data request**

Include:

- universal data request;
- retail-specific data;
- professional-services data;
- security and anonymization notes;
- minimal package for first estimate.

### Task 4: Verify And Commit

**Files:**

- All files in `docs/client-audit-library/roi-output-examples/`
- `docs/superpowers/plans/2026-06-05-roi-output-examples.md`

- [ ] **Step 1: Verify forbidden claims and slang**

Run:

- `rg -n "гарант|точно сэконом|реальный клиент|клиенты после|волшеб|прикин|безусловно|обещаем" docs/client-audit-library/roi-output-examples`

Expected: no result, except defensive language if explicitly saying what not to claim.

- [ ] **Step 2: Verify required sections**

Run:

- `rg -n "Консервативный|Базовый|Высокий|Период окупаемости|Ограничения" docs/client-audit-library/roi-output-examples/01-retail-stock-roi-example.md docs/client-audit-library/roi-output-examples/02-document-intake-roi-example.md`

Expected: both example files contain scenario, payback and limitation sections.

- [ ] **Step 3: Verify staged files**

Run:

- `git diff --cached --name-only`

Expected: only plan and `roi-output-examples` files are staged.

- [ ] **Step 4: Commit**

Run:

- `git add docs/superpowers/plans/2026-06-05-roi-output-examples.md docs/client-audit-library/roi-output-examples`
- `git commit -m "Add ROI output example materials"`
