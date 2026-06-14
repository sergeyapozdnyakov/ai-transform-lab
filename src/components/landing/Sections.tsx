import { Fragment, useState, useEffect, useRef } from "react";
import { useI18n } from "../../lib/i18n";
import { Container, SectionLabel, StatusPill, FadeIn } from "./primitives";
import { Widget1BeforeAfter } from "./Widget1BeforeAfter";
import { Widget2DocExtract } from "./Widget2DocExtract";
import { Widget3ROI } from "./Widget3ROI";
import { Widget4ProcessMap } from "./Widget4ProcessMap";
import { Widget5ReportViewer } from "./Widget5ReportViewer";
import { reportContent } from "./report-content";
import { motion, useInView } from "framer-motion";
import {
  AlertTriangle,
  BadgeDollarSign,
  Briefcase,
  Download,
  UserX,
  LineChart,
  Check,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  ChevronDown,
  Send,
  Moon,
  Sun,
} from "lucide-react";

const CONTACT_EMAIL = "ai@pozdnyakov.io";
const CONTACT_TELEGRAM_URL = "https://t.me/pozdnyakov_io";
const CONTACT_LINKEDIN_URL = "https://www.linkedin.com/in/sergeypozdnyakov/";

function SectionCta({ openModal }: { openModal: () => void }) {
  const { t } = useI18n();
  return (
    <FadeIn delay={0.12}>
      <div className="mt-10 flex flex-col gap-4 border-y border-[var(--color-border-subtle)] py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent-indigo)]">
            {t.sectionCta.eyebrow}
          </div>
          <p className="mt-1 max-w-[720px] text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
            {t.sectionCta.text}
          </p>
        </div>
        <button
          onClick={openModal}
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-[var(--color-border-emphasis)] bg-transparent px-5 py-3 text-[14px] font-medium text-[var(--color-text-strong)] transition-colors hover:bg-[var(--color-surface-soft-hover)]"
        >
          {t.sectionCta.button} →
        </button>
      </div>
    </FadeIn>
  );
}

export function Nav({ openModal }: { openModal: () => void }) {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
        document.documentElement.dataset.theme = saved;
        return;
      }
    } catch {
      // Theme persistence is optional.
    }
    document.documentElement.dataset.theme = "dark";
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Theme persistence is optional.
    }
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[var(--color-bg-base)]/75 border-b border-[var(--color-border-subtle)]"
          : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between h-14">
        <a
          href="#top"
          className="font-mono text-[13px] font-semibold tracking-[0.04em] text-[var(--color-text-primary)]"
        >
          AI<span className="text-[var(--color-accent-indigo)]">.</span>AUDIT
        </a>
        <div className="hidden md:flex items-center gap-7">
          {t.nav.links.map((l, i) => (
            <a
              key={i}
              href={["#approach", "#cases", "#roi", "#faq"][i]}
              className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center text-[11px] font-mono">
            <button
              onClick={() => setLang("ru")}
              className={`px-1.5 py-1 transition-colors ${lang === "ru" ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-mono)]"}`}
            >
              RU
            </button>
            <span className="text-[var(--color-text-mono)]">|</span>
            <button
              onClick={() => setLang("en")}
              className={`px-1.5 py-1 transition-colors ${lang === "en" ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-mono)]"}`}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
            className="relative h-7 w-12 rounded-full border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] transition-colors"
          >
            <span
              className={`absolute top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] shadow-sm ring-1 ring-[var(--color-border-subtle)] transition-transform ${
                theme === "light" ? "translate-x-5" : "translate-x-1"
              }`}
            >
              {theme === "light" ? (
                <Sun size={12} strokeWidth={1.8} />
              ) : (
                <Moon size={12} strokeWidth={1.8} />
              )}
            </span>
          </button>
          <button
            onClick={openModal}
            className="rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] px-3.5 py-1.5 text-[12px] font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-elevated)]"
          >
            {t.nav.contact}
          </button>
        </div>
      </Container>
    </nav>
  );
}

export function Hero({ openModal }: { openModal: () => void }) {
  const { t } = useI18n();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    let tx = -1000,
      ty = -1000;
    const fn = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const loop = () => {
      setGlow((p) => ({ x: p.x + (tx - p.x) * 0.12, y: p.y + (ty - p.y) * 0.12 }));
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", fn);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", fn);
    };
  }, []);

  const words = t.hero.h1a.split(" ");

  return (
    <section
      id="top"
      ref={wrapRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div
        className="absolute pointer-events-none rounded-full hidden md:block"
        style={{
          width: 600,
          height: 600,
          left: glow.x - 300,
          top: glow.y - 300,
          background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 60%)",
          transition: "background 200ms",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border-emphasis)] to-transparent" />

      <Container className="relative">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center min-w-0">
          <div className="min-w-0">
            <div className="mb-6">
              <StatusPill>{t.hero.status}</StatusPill>
            </div>
            <h1
              aria-label={`${t.hero.h1a} ${t.hero.h1b}`}
              className="text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.05] font-medium tracking-[-0.025em] text-balance"
            >
              {words.map((w, i) => (
                <Fragment key={i}>
                  <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {w}
                  </motion.span>{" "}
                </Fragment>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: words.length * 0.05, duration: 0.5 }}
                className="block gradient-accent mt-1"
              >
                {t.hero.h1b}
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-[16px] md:text-[17px] leading-[1.6] text-[var(--color-text-secondary)] max-w-[560px]"
            >
              {t.hero.sub}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={openModal}
                className="w-full sm:w-auto rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] transition-colors hover:bg-[var(--color-btn-primary-hover)]"
              >
                {t.hero.cta1} →
              </button>
              <a
                href="#output"
                className="w-full sm:w-auto text-center rounded-md border border-[var(--color-border-emphasis)] bg-transparent px-5 py-3 text-[14px] font-medium text-[var(--color-text-strong)] transition-colors hover:bg-[var(--color-surface-soft-hover)]"
              >
                {t.hero.cta2}
              </a>
            </motion.div>
            <div className="mt-10 flex items-center gap-5 font-mono text-[11px] tracking-[0.12em] text-[var(--color-text-mono)] uppercase">
              {t.hero.strip.map((s, i) => (
                <div key={i} className="flex items-center gap-5">
                  <span>{s}</span>
                  {i < t.hero.strip.length - 1 && (
                    <span className="h-3 w-px bg-[var(--color-border-emphasis)]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <Widget1BeforeAfter />
              <p className="mt-3 font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-text-mono)] text-right">
                {t.hero.widgetCaption}
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Problem() {
  const { t } = useI18n();
  const Icons = [AlertTriangle, UserX, LineChart];
  return (
    <section className="py-24 md:py-32 border-t border-[var(--color-border-subtle)]">
      <Container>
        <FadeIn>
          <SectionLabel>{t.problem.label}</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.025em] font-medium max-w-[720px] mb-4 text-balance">
            {t.problem.title}
          </h2>
          <p className="text-[15px] md:text-[16px] text-[var(--color-text-secondary)] max-w-[640px] leading-relaxed mb-12">
            {t.problem.sub}
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.problem.cards.map((c, i) => {
            const Icon = Icons[i];
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative h-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-6 transition-colors hover:border-[var(--color-border-emphasis)] group min-h-[200px]">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-[var(--color-accent-indigo)] mb-5 transition-transform duration-500 group-hover:scale-110"
                  />
                  <h3 className="text-[15px] font-medium mb-2 text-[var(--color-text-primary)]">
                    {c.t}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                    {c.d}
                  </p>
                  <div className="absolute bottom-3 right-4 font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--color-text-mono)]">
                    ISSUE 0{i + 1}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function Approach({ openModal }: { openModal: () => void }) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  const step = t.approach.steps[active];

  return (
    <section id="approach" className="py-24 md:py-32 border-t border-[var(--color-border-subtle)]">
      <Container>
        <FadeIn>
          <SectionLabel>{t.approach.label}</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.025em] font-medium max-w-[880px] mb-4 text-balance">
            {t.approach.title}
          </h2>
          <p className="text-[15px] md:text-[16px] text-[var(--color-text-secondary)] max-w-[760px] leading-relaxed mb-12">
            {t.approach.sub}
          </p>
        </FadeIn>

        {/* Week selector tabs */}
        <div className="grid items-stretch md:grid-cols-3 gap-3 mb-6">
          {t.approach.steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <button
                onClick={() => setActive(i)}
                className={`relative flex h-full min-h-[260px] w-full flex-col text-left rounded-lg border p-5 transition-colors ${
                  active === i
                    ? "border-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo-soft)]"
                    : "border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-emphasis)]"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[20px] tracking-[-0.02em] text-[var(--color-text-primary)] tabular-nums">
                    {s.n}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-text-mono)]">
                    {s.week}
                  </span>
                </div>
                <h3 className="text-[18px] font-medium mb-1 tracking-tight">{s.t}</h3>
                <p className="flex-1 text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
                  {s.d}
                </p>
                <div className="mt-4 flex min-w-0 items-center gap-4 font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--color-text-mono)]">
                  <span>
                    {t.approach.durationLabel} {s.duration}
                  </span>
                  <span className="h-3 w-px bg-[var(--color-border-emphasis)]" />
                  <span className="truncate">{s.workType}</span>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>

        {/* Active week detail */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)] overflow-hidden"
        >
          <div className="grid md:grid-cols-[1.4fr_1fr] divide-y md:divide-y-0 md:divide-x divide-[var(--color-border-subtle)]">
            {/* Doing */}
            <div className="p-6 md:p-8">
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-accent-indigo)] mb-4">
                {t.approach.doingLabel} · {step.week}
              </div>
              <div className="space-y-4">
                {step.doing.split("\n\n").map((p, i) => (
                  <p
                    key={i}
                    className="text-[14px] md:text-[15px] leading-[1.7] text-[var(--color-text-primary)]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
            {/* Artifacts + risk */}
            <div className="p-6 md:p-8 bg-[var(--color-surface-sunken-soft)]">
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-accent-teal)] mb-4">
                {t.approach.artifactsLabel}
              </div>
              <ul className="space-y-2.5 mb-7">
                {step.artifacts.map((a, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[13.5px] leading-snug text-[var(--color-text-primary)]"
                  >
                    <span className="font-mono text-[10px] text-[var(--color-text-mono)] mt-1 tabular-nums">
                      0{i + 1}
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-5 border-t border-[var(--color-border-subtle)]">
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E0B048] mb-3 flex items-center gap-2">
                  <AlertTriangle size={12} strokeWidth={1.8} />
                  {t.approach.riskLabel}
                </div>
                <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                  {step.risk}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary strip */}
        <FadeIn delay={0.1}>
          <div className="mt-10 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-5 md:p-6">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-text-mono)] mb-4">
              {t.approach.summary.title}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-4">
              {t.approach.summary.items.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--color-text-mono)]">
                    {s.k}
                  </span>
                  <span className="font-mono text-[20px] md:text-[22px] tracking-[-0.02em] text-[var(--color-text-primary)] tabular-nums mt-1">
                    {s.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--color-text-secondary)] max-w-[640px]">
              {t.approach.summary.note}
            </p>
            <button
              onClick={openModal}
              className="rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] transition-colors hover:bg-[var(--color-btn-primary-hover)] self-start md:self-auto whitespace-nowrap"
            >
              {t.approach.summary.cta} →
            </button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

export function AuditOutput({ openModal }: { openModal: () => void }) {
  const { t, lang } = useI18n();
  const locale = reportContent[lang];
  const Icons = [Briefcase, BadgeDollarSign, Workflow, ShieldCheck];
  // Карточка -> раздел просмотрщика: отчёт 01, расчёт 05, дорожная карта 06, пакет 07.
  const cardSection = [0, 4, 5, 6];
  const [section, setSection] = useState(0);
  const openViewerSection = (sec: number) => {
    setSection(sec);
    document
      .getElementById("report-viewer")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const openViewerAt = (card: number) => openViewerSection(cardSection[card]);

  return (
    <section
      id="output"
      className="scroll-mt-20 py-24 md:py-32 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/35"
    >
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

export function Widget2Section() {
  const { t } = useI18n();
  return (
    <section className="py-24 md:py-32 border-t border-[var(--color-border-subtle)]">
      <Container>
        <FadeIn>
          <SectionLabel>{t.widget2.label}</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.025em] font-medium max-w-[720px] mb-4 text-balance">
            {t.widget2.title}
          </h2>
          <p className="text-[15px] text-[var(--color-text-secondary)] max-w-[640px] leading-relaxed mb-10">
            {t.widget2.sub}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Widget2DocExtract />
        </FadeIn>
      </Container>
    </section>
  );
}

export function WhoFor({ openModal }: { openModal: () => void }) {
  const { t } = useI18n();
  const RoleIcons = [Briefcase, Workflow, ShieldCheck, BadgeDollarSign];
  return (
    <section id="who-for" className="py-24 md:py-32 border-t border-[var(--color-border-subtle)]">
      <Container>
        <FadeIn>
          <SectionLabel>{t.whoFor.label}</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="max-w-[760px] text-balance text-[28px] font-medium leading-[1.15] tracking-[-0.025em] md:text-[36px]">
            {t.whoFor.title}
          </h2>
          <p className="mt-4 max-w-[720px] text-[15px] leading-relaxed text-[var(--color-text-secondary)] md:text-[16px]">
            {t.whoFor.sub}
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.whoFor.roles.map((role, i) => {
            const Icon = RoleIcons[i];
            return (
              <FadeIn key={role.role} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-5">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] text-[var(--color-accent-indigo)]">
                      <Icon size={17} strokeWidth={1.7} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-mono)]">
                      {role.role}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-medium leading-tight text-[var(--color-text-primary)]">
                    {role.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                    {role.pain}
                  </p>
                  <div className="mt-auto pt-5">
                    <div className="border-t border-[var(--color-border-subtle)] pt-4 text-[13px] leading-relaxed text-[var(--color-text-primary)]">
                      {role.outcome}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 mt-12 relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border-subtle)]" />
          <FadeIn>
            <h3 className="flex items-center gap-3 text-[18px] font-medium mb-6 text-[var(--color-accent-teal)]">
              <span className="font-mono text-[11px] tracking-[0.12em]">+</span>
              {t.whoFor.yesTitle}
            </h3>
            <ul className="space-y-3">
              {t.whoFor.yes.map((x, i) => (
                <li key={i} className="flex gap-3 text-[15px] text-[var(--color-text-primary)]">
                  <Check
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[var(--color-accent-teal)]"
                  />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="flex items-center gap-3 text-[18px] font-medium mb-6 text-[var(--color-text-secondary)]">
              <span className="font-mono text-[11px] tracking-[0.12em]">−</span>
              {t.whoFor.noTitle}
            </h3>
            <ul className="space-y-3">
              {t.whoFor.no.map((x, i) => (
                <li key={i} className="flex gap-3 text-[15px] text-[var(--color-text-secondary)]">
                  <X
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[var(--color-text-mono)]"
                  />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
        <SectionCta openModal={openModal} />
      </Container>
    </section>
  );
}

export function LeadMagnet({ openModal }: { openModal: () => void }) {
  const { t } = useI18n();
  return (
    <section
      id="checklist"
      className="py-24 md:py-32 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/35"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <FadeIn>
            <SectionLabel>{t.leadMagnet.label}</SectionLabel>
            <h2 className="mt-8 max-w-[720px] text-balance text-[28px] font-medium leading-[1.12] tracking-[-0.025em] md:text-[40px]">
              {t.leadMagnet.title}
            </h2>
            <p className="mt-5 max-w-[620px] text-[15px] leading-relaxed text-[var(--color-text-secondary)] md:text-[16px]">
              {t.leadMagnet.sub}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] transition-colors hover:bg-[var(--color-btn-primary-hover)]"
              >
                <Sparkles size={15} strokeWidth={1.7} />
                {t.leadMagnet.primary}
              </button>
              <a
                href={t.leadMagnet.docUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-surface-soft)] px-5 py-3 text-[14px] font-medium text-[var(--color-text-strong)] transition-colors hover:bg-[var(--color-surface-soft-hover)]"
              >
                <Download size={15} strokeWidth={1.7} />
                {t.leadMagnet.secondary}
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-[var(--color-border-subtle)] pb-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-mono)]">
                  {t.leadMagnet.previewLabel}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent-teal)]">
                  20
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {t.leadMagnet.items.map((item, i) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] p-3"
                  >
                    <span className="font-mono text-[10px] text-[var(--color-accent-indigo)] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] leading-snug text-[var(--color-text-primary)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 border-t border-[var(--color-border-subtle)] pt-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                {t.leadMagnet.note}
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

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
      setN(decimals ? eased * to : Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, decimals]);
  const txt = n.toFixed(decimals);
  return (
    <span ref={ref} className="tabular-nums">
      {comma ? txt.replace(".", ",") : txt}
    </span>
  );
}

export function Expert({ openModal }: { openModal: () => void }) {
  const { t } = useI18n();
  const e = t.expert;
  return (
    <section className="border-t border-[var(--color-border-subtle)]">
      <div className="py-24 md:py-32">
        <Container>
          <FadeIn>
            <SectionLabel>{e.label}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.025em] font-medium max-w-[920px] mb-12 text-balance">
              {e.title}
            </h2>
          </FadeIn>

          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14 items-start">
            <FadeIn>
              <div>
                <figure className="float-none md:float-left md:mr-7 md:mb-3 mx-auto md:mx-0 w-[200px] md:w-[240px] mb-5">
                  <div className="relative rounded-xl overflow-hidden border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] aspect-square">
                    <img
                      src="/expert-photo.jpg"
                      alt="Сергей Поздняков — AI-консультант"
                      width={768}
                      height={768}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "50% 18%" }}
                    />
                  </div>
                </figure>
                <div className="space-y-4">
                  {e.bio.map((p, i) => (
                    <p
                      key={i}
                      className="text-[15px] md:text-[15.5px] leading-[1.65] text-[var(--color-text-primary)]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
                <div className="clear-both" />
              </div>
              <div className="mt-8 pt-8 border-t border-[var(--color-border-subtle)] flex flex-wrap gap-1.5">
                {e.skills.map((sk) => (
                  <span
                    key={sk}
                    className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] px-2.5 py-1 font-mono text-[10.5px] tracking-[0.08em] text-[var(--color-text-secondary)]"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)] p-6 lg:sticky lg:top-24">
                <div className="flex items-baseline gap-3 pb-5 border-b border-[var(--color-border-subtle)]">
                  <span className="font-mono text-[72px] leading-none tracking-[-0.04em] text-[var(--color-text-primary)] tabular-nums">
                    <Counter to={e.card.years} />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-text-mono)]">
                    {e.card.yearsLabel}
                  </span>
                </div>
                <div className="mt-5 space-y-3.5">
                  {e.card.rows.map((r, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-[var(--color-text-mono)]">
                        {r.k}
                      </span>
                      <span className="font-mono text-[14px] text-[var(--color-text-primary)] tabular-nums text-right">
                        {r.v}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-[var(--color-border-subtle)] flex items-center gap-2.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span
                      className="absolute inset-0 rounded-full pulse-dot"
                      style={{ background: "#14B8A6" }}
                    />
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--color-accent-teal)]">
                    {e.card.status}
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </div>

      <div className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] py-20 md:py-28">
        <Container>
          <FadeIn>
            <SectionLabel>{e.boundaries.subLabel}</SectionLabel>
          </FadeIn>
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 mt-6">
            <FadeIn>
              <h3 className="text-[24px] md:text-[30px] leading-[1.15] tracking-[-0.02em] font-medium text-balance">
                {e.boundaries.title}
              </h3>
              <p className="mt-5 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                {e.boundaries.intro}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <ul className="divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
                {e.boundaries.items.map((it, i) => (
                  <li key={i} className="py-5 flex gap-5">
                    <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--color-text-mono)] tabular-nums pt-1 shrink-0 w-10">
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <X size={15} strokeWidth={2} className="mt-1 shrink-0 text-[#E0B048]" />
                        <h4 className="text-[15.5px] font-medium text-[var(--color-text-primary)] leading-snug">
                          {it.t}
                        </h4>
                      </div>
                      <p className="mt-2 pl-[26px] text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                        {it.d}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <p className="text-[14.5px] md:text-[15px] leading-relaxed text-[var(--color-text-primary)] max-w-[680px]">
                {e.boundaries.closing}
              </p>
              <button
                onClick={openModal}
                className="rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-surface-soft)] px-5 py-3 text-[14px] font-medium text-[var(--color-text-strong)] transition-colors hover:bg-[var(--color-surface-soft-hover)] self-start md:self-auto whitespace-nowrap"
              >
                {e.boundaries.cta} →
              </button>
            </div>
          </FadeIn>
        </Container>
      </div>
    </section>
  );
}

export function Cases({
  openModal,
}: {
  openModal: (prefill?: { team?: string; desc?: string }) => void;
}) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [activeSize, setActiveSize] = useState(1);
  const group = t.cases.groups[active];
  const selectedSize = t.cases.sizeOptions[activeSize];
  return (
    <section id="cases" className="py-24 md:py-32 border-t border-[var(--color-border-subtle)]">
      <Container>
        <FadeIn>
          <SectionLabel>{t.cases.label}</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.025em] font-medium max-w-[760px] text-balance">
            {t.cases.title}
          </h2>
          <p className="mt-4 max-w-[720px] text-[15px] leading-relaxed text-[var(--color-text-secondary)] md:text-[16px]">
            {t.cases.sub}
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
            {t.cases.groups.map((g, i) => (
              <button
                key={g.industry}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-medium transition-colors ${
                  active === i
                    ? "border-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo-soft)] text-[var(--color-text-primary)]"
                    : "border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-emphasis)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {g.industry}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-5 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-5 md:p-7">
            <div className="grid gap-4 border-b border-[var(--color-border-subtle)] pb-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent-indigo)]">
                  {t.cases.scenarioLabel}
                </div>
                <h3 className="mt-3 text-[24px] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] md:text-[30px]">
                  {group.industry}
                </h3>
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                {group.signal}
              </p>
            </div>

            <div className="mt-6 grid gap-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] p-4 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent-indigo)]">
                  {t.cases.sizeLabel}
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {t.cases.sizeSub}
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {t.cases.sizeOptions.map((size, i) => (
                  <button
                    key={size.label}
                    type="button"
                    onClick={() => setActiveSize(i)}
                    className={`rounded-lg border p-3 text-left transition-colors ${
                      activeSize === i
                        ? "border-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo-soft)]"
                        : "border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-emphasis)]"
                    }`}
                  >
                    <span className="block font-mono text-[13px] leading-none text-[var(--color-text-primary)]">
                      {size.label}
                    </span>
                    <span className="mt-2 block text-[11.5px] leading-snug text-[var(--color-text-mono)]">
                      {size.caption}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {group.examples.map((c, i) => {
                const money = Array.isArray(c.money) ? c.money[activeSize] : c.money;
                return (
                  <div
                    key={c.title}
                    className="flex h-full flex-col rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] p-5"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <span className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-mono)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="max-w-[150px] text-right font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-accent-teal)]">
                        {c.roi}
                      </span>
                    </div>
                    <h4 className="text-[17px] font-medium leading-tight text-[var(--color-text-primary)]">
                      {c.title}
                    </h4>
                    <div className="mt-4 grid gap-2">
                      <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-3">
                        <div className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--color-text-mono)]">
                          {t.cases.effectLabel}
                        </div>
                        <p className="mt-1 text-[17px] font-medium leading-tight text-[var(--color-accent-teal)]">
                          {c.effect}
                        </p>
                      </div>
                      <div className="rounded-lg border border-[var(--color-accent-amber)]/25 bg-[var(--color-accent-amber)]/8 p-3">
                        <div className="flex items-center justify-between gap-2 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--color-text-mono)]">
                          <span>{t.cases.moneyLabel}</span>
                          <span>{selectedSize.badge}</span>
                        </div>
                        <p className="mt-1 text-[16px] font-medium leading-tight text-[var(--color-text-primary)]">
                          {money}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-4 text-[13.5px] leading-relaxed">
                      <div>
                        <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-accent-amber)]">
                          {t.cases.painLabel}
                        </div>
                        <p className="text-[var(--color-text-secondary)]">{c.pain}</p>
                      </div>
                      <div>
                        <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-accent-teal)]">
                          {t.cases.solutionLabel}
                        </div>
                        <p className="text-[var(--color-text-secondary)]">{c.solution}</p>
                      </div>
                    </div>
                    <div className="mt-5 grid gap-2 border-t border-[var(--color-border-subtle)] pt-4 text-[12.5px] leading-snug text-[var(--color-text-secondary)]">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-text-mono)]">
                          {t.cases.metricLabel}
                        </span>
                        <p className="mt-1 text-[var(--color-text-primary)]">{c.metric}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-text-mono)]">
                          {t.cases.dataLabel}
                        </span>
                        <p className="mt-1">{c.data}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-4 md:flex-row md:items-center md:justify-between">
              <p className="max-w-[720px] text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                {t.cases.ctaText}
              </p>
              <button
                type="button"
                onClick={() =>
                  openModal({
                    team: selectedSize.label,
                    desc: `${t.cases.ctaPrefill}: ${group.industry}; ${selectedSize.label}`,
                  })
                }
                className="inline-flex shrink-0 items-center justify-center rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] transition-colors hover:bg-[var(--color-btn-primary-hover)]"
              >
                {t.cases.ctaButton} →
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="mt-5 max-w-[860px] text-[13.5px] leading-relaxed text-[var(--color-text-mono)]">
            {t.cases.note}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}

export function ROISection({ openModal }: { openModal: () => void }) {
  const { t } = useI18n();
  return (
    <section
      id="roi"
      className="relative py-24 md:py-32 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40"
    >
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <Container className="relative">
        <FadeIn>
          <SectionLabel>{t.roi.label}</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.025em] font-medium max-w-[680px] mb-4 text-balance">
            {t.roi.title}
          </h2>
          <p className="text-[15px] text-[var(--color-text-secondary)] max-w-[560px] mb-10">
            {t.roi.sub}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Widget3ROI onCta={openModal} />
        </FadeIn>
      </Container>
    </section>
  );
}

export function Deliverable() {
  const { t } = useI18n();
  return (
    <section
      id="deliverable"
      className="py-24 md:py-32 border-t border-[var(--color-border-subtle)]"
    >
      <Container>
        <FadeIn>
          <SectionLabel>{t.procmap.label}</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.025em] font-medium max-w-[680px] mb-4 text-balance">
            {t.procmap.title}
          </h2>
          <p className="text-[15px] text-[var(--color-text-secondary)] max-w-[640px] mb-10 leading-relaxed">
            {t.procmap.sub}
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-6 min-w-0">
          <FadeIn>
            <div className="min-w-0">
              <Widget4ProcessMap />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-6 h-full">
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-text-mono)] mb-4">
                DELIVERABLE
              </div>
              <ul className="space-y-3">
                {t.procmap.deliverables.map((d, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[14px] leading-relaxed text-[var(--color-text-primary)]"
                  >
                    <span className="font-mono text-[11px] text-[var(--color-accent-indigo)] mt-0.5 tabular-nums">
                      0{i + 1}
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

export function FAQ() {
  const { t } = useI18n();
  // Default open: Q.01 (group 0, item 0) and Q.10 (group 2, item 1)
  const [open, setOpen] = useState<Record<string, boolean>>({ "0-0": true, "2-1": true });
  const toggle = (key: string) => setOpen((s) => ({ ...s, [key]: !s[key] }));

  // Compute global Q numbers across groups
  let globalIdx = 0;
  const groups = t.faq.groups.map((g) => ({
    ...g,
    items: g.items.map((it) => ({ ...it, n: ++globalIdx })),
  }));

  return (
    <section id="faq" className="py-24 md:py-32 border-t border-[var(--color-border-subtle)]">
      <Container>
        <FadeIn>
          <SectionLabel>{t.faq.label}</SectionLabel>
        </FadeIn>
        <div className="grid md:grid-cols-[1fr_2fr] gap-10">
          <FadeIn>
            <h2 className="text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.025em] font-medium text-balance">
              FAQ
            </h2>
          </FadeIn>
          <div className="space-y-10">
            {groups.map((group, gi) => (
              <FadeIn key={gi} delay={gi * 0.05}>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-text-mono)]">
                      {String(gi + 1).padStart(2, "0")} · {group.title}
                    </span>
                    <span className="h-px flex-1 bg-[var(--color-border-subtle)]" />
                  </div>
                  <div className="space-y-1">
                    {group.items.map((q, ii) => {
                      const key = `${gi}-${ii}`;
                      const isOpen = !!open[key];
                      return (
                        <div
                          key={key}
                          className={`border-l-2 transition-colors ${isOpen ? "border-[var(--color-accent-indigo)]" : "border-transparent"}`}
                        >
                          <button
                            onClick={() => toggle(key)}
                            className="w-full flex items-start justify-between gap-4 py-4 pl-5 pr-2 text-left hover:text-[var(--color-text-strong)] transition-colors"
                          >
                            <span className="flex items-start gap-4">
                              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-text-mono)] tabular-nums mt-1 shrink-0">
                                Q.{String(q.n).padStart(2, "0")}
                              </span>
                              <span className="text-[15px] text-[var(--color-text-primary)]">
                                {q.q}
                              </span>
                            </span>
                            <ChevronDown
                              size={16}
                              strokeWidth={1.5}
                              className="shrink-0 mt-1 text-[var(--color-text-mono)] transition-transform"
                              style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                            />
                          </button>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="pl-[72px] pr-6 pb-5 space-y-3 text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                                {q.a.split("\n\n").map((p, pi) => (
                                  <p key={pi}>{p}</p>
                                ))}
                              </div>
                            </motion.div>
                          )}
                          <div className="border-b border-[var(--color-border-subtle)]" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={0.1}>
              <div className="mt-4 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[13px] text-[var(--color-text-secondary)] max-w-xl">
                  {t.faq.notFoundText}
                </p>
                <a
                  href={t.faq.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-surface-soft)] px-4 py-2.5 text-[13px] font-medium text-[var(--color-text-strong)] hover:bg-[var(--color-surface-soft-hover)] transition-colors"
                >
                  {t.faq.notFoundCta} →
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FinalCTA({ openModal }: { openModal: () => void }) {
  const { t } = useI18n();
  return (
    <section className="relative py-32 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <Container className="relative text-center">
        <FadeIn>
          <h2 className="text-[34px] md:text-[48px] leading-[1.1] tracking-[-0.025em] font-medium mb-5 text-balance">
            {t.finalCta.title}
          </h2>
          <p className="text-[16px] md:text-[17px] text-[var(--color-text-secondary)] max-w-[560px] mx-auto mb-10 leading-relaxed">
            {t.finalCta.sub}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              onClick={openModal}
              className="rounded-md bg-[var(--color-btn-primary)] px-6 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] transition-colors hover:bg-[var(--color-btn-primary-hover)]"
            >
              {t.finalCta.btn1} →
            </button>
            <a
              href={CONTACT_TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-[var(--color-border-emphasis)] px-6 py-3 text-[14px] font-medium text-[var(--color-text-strong)] transition-colors hover:bg-[var(--color-surface-soft-hover)]"
            >
              <Send size={14} strokeWidth={1.5} /> {t.finalCta.btn2}
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-text-mono)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full pulse-dot bg-[var(--color-accent-teal)]" />
            </span>
            {t.finalCta.indicators}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-[var(--color-border-subtle)] py-12">
      <Container>
        <div className="grid md:grid-cols-[1fr_3fr] gap-10 mb-10">
          <div>
            <div className="font-mono text-[14px] font-semibold tracking-[0.04em]">
              AI<span className="text-[var(--color-accent-indigo)]">.</span>AUDIT
            </div>
            <p className="mt-2 text-[12px] text-[var(--color-text-mono)] max-w-[220px] leading-relaxed">
              © 2026
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {t.footer.cols.map((col, i) => (
              <div key={i}>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-text-mono)] mb-3">
                  {col.t}
                </div>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href={footerHref(l)}
                        target={footerTarget(l)}
                        rel={footerTarget(l) ? "noreferrer" : undefined}
                        className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-strong)] transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function footerHref(label: string) {
  if (label === CONTACT_EMAIL) return `mailto:${CONTACT_EMAIL}`;
  if (label === "Telegram") return CONTACT_TELEGRAM_URL;
  if (label === "LinkedIn") return CONTACT_LINKEDIN_URL;
  if (label === "Аудит ИИ") return "#approach";
  if (label === "AI audit") return "#approach";
  if (label === "Дорожная карта") return "#deliverable";
  if (label === "Roadmap") return "#deliverable";
  if (label === "Внешний ИТ-директор") return "#who-for";
  if (label === "Fractional CIO") return "#who-for";
  if (label === "Чеклист процессов") return "/docs/ai-process-checklist.html";
  if (label === "Process checklist") return "/docs/ai-process-checklist-en.html";
  if (label === "Шаблон соглашения") return "/docs/nda-template.html";
  if (label === "NDA template") return "/docs/nda-template-en.html";
  if (label === "Пример отчёта") return "/docs/sample-audit-report.html";
  if (label === "Sample report") return "/docs/sample-audit-report-en.html";
  if (label === "Политика данных") return "/docs/data-policy.html";
  if (label === "Data policy") return "/docs/data-policy-en.html";
  return "#top";
}

function footerTarget(label: string) {
  return label === "Telegram" ||
    label === "LinkedIn" ||
    label === "Чеклист процессов" ||
    label === "Process checklist" ||
    label === "Шаблон соглашения" ||
    label === "NDA template" ||
    label === "Пример отчёта" ||
    label === "Sample report" ||
    label === "Политика данных" ||
    label === "Data policy"
    ? "_blank"
    : undefined;
}
