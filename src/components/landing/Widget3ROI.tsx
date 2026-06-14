import { useState, useMemo } from "react";
import { useI18n } from "../../lib/i18n";
import { fmtNum } from "../../lib/format";

const AUTOMATION = 0.62; // McKinsey benchmark, conservative lower bound
const QUALITY_LOSS = 0.18; // share of cost lost to errors/rework
const QUALITY_RECOV = 0.4; // fraction of quality loss recovered with AI
const WEEKS = 47; // working weeks/year
const IMPL_BASE = 850_000; // base implementation cost (₽)
const IMPL_PER_PERSON = 34_000; // ≈ size × 0.04 of base

function fmtRub(n: number) {
  return `${fmtNum(n)} ₽`;
}

export function Widget3ROI({ onCta }: { onCta: () => void }) {
  const { t } = useI18n();
  const [team, setTeam] = useState(35);
  const [hours, setHours] = useState(12);
  const [rate, setRate] = useState(1800);

  const calc = useMemo(() => {
    const current = team * hours * WEEKS * rate;
    const automationSaving = current * AUTOMATION;
    const errorSaving = current * QUALITY_LOSS * QUALITY_RECOV;
    const total = automationSaving + errorSaving;
    const impl = Math.min(4_500_000, IMPL_BASE + team * IMPL_PER_PERSON);
    const payback = Math.max(1, Math.round((impl / total) * 12));
    const afterPct = Math.max(8, Math.round((1 - AUTOMATION) * 100));
    return { current, automationSaving, errorSaving, total, impl, payback, afterPct };
  }, [team, hours, rate]);

  return (
    <div className="rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/60 p-6 md:p-8">
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <SliderRow
            label={t.roi.teamSize}
            value={team}
            min={5}
            max={200}
            step={1}
            onChange={setTeam}
            display={`${team}`}
          />
          <SliderRow
            label={t.roi.hours}
            value={hours}
            min={2}
            max={25}
            step={1}
            onChange={setHours}
            display={`${hours} ч`}
          />
          <SliderRow
            label={t.roi.rate}
            value={rate}
            min={500}
            max={5000}
            step={100}
            onChange={setRate}
            display={`${fmtNum(rate)} ₽`}
          />

          {/* Inefficiency bar */}
          <div className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] p-4 space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.1em] uppercase">
                <span className="text-[var(--color-accent-amber)]">{t.roi.currentBar}</span>
                <span className="text-[var(--color-text-mono)] tabular-nums">100%</span>
              </div>
              <div className="h-3 rounded-sm bg-[var(--color-surface-sunken-soft)] overflow-hidden border border-[var(--color-border-subtle)]">
                <div
                  className="h-full bg-[var(--color-accent-amber)]/80"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="relative pl-3">
              <div className="absolute left-0 top-0 bottom-0 w-px border-l border-dashed border-[var(--color-accent-amber)]/40 animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--color-text-mono)]">
                {t.roi.deadZone}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.1em] uppercase">
                <span className="text-[var(--color-accent-teal)]">{t.roi.afterBar}</span>
                <span className="text-[var(--color-text-mono)] tabular-nums">{calc.afterPct}%</span>
              </div>
              <div className="h-3 rounded-sm bg-[var(--color-surface-sunken-soft)] overflow-hidden border border-[var(--color-border-subtle)]">
                <div
                  className="h-full bg-[var(--color-accent-teal)] transition-all duration-500"
                  style={{ width: `${calc.afterPct}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono leading-relaxed text-[var(--color-text-mono)] border-t border-[var(--color-border-subtle)] pt-4">
            {t.roi.disclaimer}
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-mono text-[var(--color-text-mono)]">
            {t.roi.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--color-border-emphasis)] underline-offset-4 hover:text-[var(--color-text-strong)]"
              >
                {source.label}
              </a>
            ))}
          </div>
        </div>

        {/* Outputs */}
        <div className="space-y-3">
          <Stat label={t.roi.currentCost} value={fmtRub(calc.current)} tone="amber" />
          <Stat label={t.roi.saving} value={fmtRub(calc.automationSaving)} tone="teal" sub="−62%" />
          <Stat label={t.roi.errorSaving} value={fmtRub(calc.errorSaving)} tone="teal" small />

          <div className="rounded-md border border-[var(--color-accent-teal)]/40 bg-[var(--color-accent-teal)]/8 px-4 py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-accent-teal)] mb-1">
              {t.roi.totalSaving}
            </div>
            <div className="font-mono text-[30px] md:text-[36px] tabular-nums leading-none text-[var(--color-text-primary)]">
              {fmtRub(calc.total)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] px-4 py-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--color-text-mono)] mb-1">
                {t.roi.implCost}
              </div>
              <div className="font-mono text-[16px] tabular-nums text-[var(--color-text-primary)]">
                {fmtRub(calc.impl)}
              </div>
            </div>
            <div className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] px-4 py-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--color-text-mono)] mb-1">
                {t.roi.payback}
              </div>
              <div className="font-mono text-[16px] tabular-nums text-[var(--color-text-primary)]">
                {calc.payback}{" "}
                <span className="text-[12px] text-[var(--color-text-secondary)]">
                  {t.roi.months}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onCta}
            className="w-full mt-2 rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] transition-colors hover:bg-[var(--color-btn-primary-hover)]"
          >
            {t.roi.cta} →
          </button>
        </div>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  display: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[13px] text-[var(--color-text-secondary)]">{label}</span>
        <span className="font-mono text-[13px] tabular-nums text-[var(--color-text-primary)]">
          {display}
        </span>
      </div>
      <input
        type="range"
        className="techno"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
  sub,
  small,
}: {
  label: string;
  value: string;
  tone: "teal" | "amber";
  sub?: string;
  small?: boolean;
}) {
  const color = tone === "teal" ? "#14B8A6" : "#F59E0B";
  return (
    <div className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] px-4 py-3">
      <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--color-text-mono)] mb-1">
        {label}
      </div>
      <div className="flex items-baseline gap-3">
        <div
          className="font-mono tabular-nums leading-none"
          style={{ color, fontSize: small ? "20px" : "24px" }}
        >
          {value}
        </div>
        {sub && (
          <span className="font-mono text-[12px]" style={{ color }}>
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}
