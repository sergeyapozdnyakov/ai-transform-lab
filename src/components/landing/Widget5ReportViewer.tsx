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
