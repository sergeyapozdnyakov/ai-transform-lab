# Industry Audit Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать локальную рабочую библиотеку для подготовки AI-аудита в трёх операционных направлениях среднего бизнеса.

**Architecture:** Материалы хранятся как независимые Markdown-документы в `docs/client-audit-library/`. Общие документы задают рыночную рамку, программу интервью и шаблон карточки процесса; отраслевые документы используют единый формат для процессов, данных, вопросов, метрик и вариантов улучшений.

**Tech Stack:** Markdown, локальные документы проекта, открытые рыночные источники.

---

## File Structure

- Create: `docs/client-audit-library/00-market-archetypes.md` — выбор трёх направлений, источники, границы применения.
- Create: `docs/client-audit-library/interview-program.md` — программа интервью по ролям и порядок клиентской диагностики.
- Create: `docs/client-audit-library/process-card-template.md` — единый шаблон карточки процесса.
- Create: `docs/client-audit-library/01-retail-distribution.md` — процессы ритейла, дистрибуции и электронной торговли.
- Create: `docs/client-audit-library/02-professional-services.md` — процессы аудиторских, юридических, бухгалтерских и консалтинговых компаний.
- Create: `docs/client-audit-library/03-logistics-warehouse.md` — процессы логистики, склада, доставки и сервисных операций.
- Create: `docs/client-audit-library/sample-report-backlog.md` — кандидаты для будущих публичных примеров отчётов на сайте.

### Task 1: Create Market Frame And Common Templates

**Files:**

- Create: `docs/client-audit-library/00-market-archetypes.md`
- Create: `docs/client-audit-library/process-card-template.md`

- [ ] **Step 1: Create the library folder**

Run: `New-Item -ItemType Directory -Force 'docs\client-audit-library'`

Expected: folder exists.

- [ ] **Step 2: Add market archetype document**

Create `00-market-archetypes.md` with:

- purpose of the library;
- selected three directions;
- source-backed rationale;
- non-claims policy;
- how to turn internal materials into public examples.

- [ ] **Step 3: Add process card template**

Create `process-card-template.md` with reusable sections:

- business goal;
- participants;
- process variants;
- systems;
- manual work;
- bottlenecks;
- interview questions;
- required data;
- metrics;
- non-AI improvements;
- AI scenarios;
- pilot readiness;
- ROI calculation.

### Task 2: Create Interview Program

**Files:**

- Create: `docs/client-audit-library/interview-program.md`

- [ ] **Step 1: Add interview structure**

Create a program for a 3-week audit:

- preparation;
- owner or CEO interview;
- COO interview;
- CFO interview;
- CIO or IT director interview;
- function-owner interviews;
- synthesis session.

- [ ] **Step 2: Add question banks**

Add role-specific questions for:

- business goals;
- process pain;
- costs and capacity;
- data and systems;
- risk;
- implementation readiness.

### Task 3: Create Three Archetype Process Libraries

**Files:**

- Create: `docs/client-audit-library/01-retail-distribution.md`
- Create: `docs/client-audit-library/02-professional-services.md`
- Create: `docs/client-audit-library/03-logistics-warehouse.md`

- [ ] **Step 1: Add retail and distribution processes**

Describe at least 8 processes:

- assortment and item data;
- demand planning;
- replenishment;
- order processing;
- marketplace operations;
- customer support;
- returns and claims;
- management reporting;
- pricing and promotions.

- [ ] **Step 2: Add professional services processes**

Describe at least 8 processes:

- lead qualification;
- client onboarding;
- document intake;
- contract review;
- research and knowledge search;
- expert conclusion preparation;
- task and deadline control;
- quality review;
- billing and utilization.

- [ ] **Step 3: Add logistics and warehouse processes**

Describe at least 8 processes:

- inbound planning;
- receiving;
- address storage;
- picking;
- packing and shipping;
- route planning;
- claims and exceptions;
- inventory control;
- operational reporting.

### Task 4: Add Sample Report Backlog And Verification

**Files:**

- Create: `docs/client-audit-library/sample-report-backlog.md`

- [ ] **Step 1: Add public-example candidates**

Create 7 candidates for future website examples:

- three from retail or distribution;
- two from professional services;
- two from logistics or warehouse operations.

- [ ] **Step 2: Verify language and claims**

Run:

- `rg -n "реальный клиент|клиенты после|гарантирован|точно сэконом|AI-аудит|русский-first|прикин" docs/client-audit-library`

Expected: no invented client-result claims, no slang, no unnecessary anglicisms.

- [ ] **Step 3: Verify file coverage**

Run:

- `rg -n "^## Процесс" docs/client-audit-library/01-retail-distribution.md docs/client-audit-library/02-professional-services.md docs/client-audit-library/03-logistics-warehouse.md`

Expected: each archetype file has at least 8 process sections.

- [ ] **Step 4: Commit only new library files and plan**

Run:

- `git add docs/superpowers/plans/2026-06-05-industry-audit-library.md docs/client-audit-library`
- `git commit -m "Add client audit library materials"`

Expected: commit contains only the new library plan and documents.
