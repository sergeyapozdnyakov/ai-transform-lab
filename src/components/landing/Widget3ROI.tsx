import { useState, useMemo } from "react";
import { useI18n } from "../../lib/i18n";

const AUTOMATION = 0.6;
const WEEKS = 48; // working weeks
const IMPL_COST = 2_500_000; // ₽ baseline implementation cost

function fmtCurrency(n: number) {
  return Math.round(n).toLocaleString("ru-RU") + " ₽";
}

export function Widget3ROI({ onCta }: { onCta: () => void }) {
  const { t } = useI18n();
  const [team, setTeam] = useState(40);
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(2000);

  const calc = useMemo(() => {
    const current = team * hours * WEEKS * rate;
    const saving = current * AUTOMATION;
    const payback = Math.max(1, Math.round((IMPL_COST / saving) * 12));
    return { current, saving, payback };
  }, [team, hours, rate]);

  return (
    <div className="rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/60 p-6 md:p-8">
      <div className="grid md:grid-cols-[1fr_1.1fr] gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <SliderRow label={t.roi.teamSize} value={team} min={5} max={200} step={1} onChange={setTeam} display={`${team}`} />
          <SliderRow label={t.roi.hours} value={hours} min={1} max={20} step={1} onChange={setHours} display={`${hours} ч`} />
          <SliderRow label={t.roi.rate} value={rate} min={500} max={5000} step={100} onChange={setRate} display={`${rate.toLocaleString("ru-RU")} ₽`} />
          <p className="text-[11px] font-mono leading-relaxed text-[var(--color-text-mono)] border-t border-[var(--color-border-subtle)] pt-4">
            {t.roi.disclaimer}
          </p>
        </div>

        {/* Outputs */}
        <div className="space-y-4">
          <Stat label={t.roi.currentCost} value={fmtCurrency(calc.current)} tone="amber" />
          <Stat label={t.roi.saving} value={fmtCurrency(calc.saving)} tone="teal" sub={`−${Math.round(AUTOMATION * 100)}%`} />

          {/* Bar chart */}
          <div className="rounded-md border border-[var(--color-border-subtle)] bg-black/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-mono)]">CURRENT → AFTER AI</span>
            </div>
            <div className="space-y-2">
              <div className="h-3 rounded-sm bg-black/30 overflow-hidden border border-[var(--color-border-subtle)]">
                <div className="h-full bg-[var(--color-accent-amber)]/80" style={{ width: "100%" }} />
              </div>
              <div className="h-3 rounded-sm bg-black/30 overflow-hidden border border-[var(--color-border-subtle)]">
                <div className="h-full bg-[var(--color-accent-teal)] transition-all duration-500" style={{ width: `${(1 - AUTOMATION) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border border-[var(--color-border-subtle)] bg-black/20 px-4 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-mono)]">{t.roi.payback}</span>
            <span className="font-mono text-xl tabular-nums text-[var(--color-text-primary)]">
              {calc.payback} <span className="text-sm text-[var(--color-text-secondary)]">{t.roi.months}</span>
            </span>
          </div>

          <button
            onClick={onCta}
            className="w-full mt-2 rounded-md bg-white px-5 py-3 text-[14px] font-medium text-black transition-all hover:bg-white/85"
          >
            {t.roi.cta} →
          </button>
        </div>
      </div>
    </div>
  );
}

function SliderRow({ label, value, min, max, step, onChange, display }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (n: number) => void; display: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[13px] text-[var(--color-text-secondary)]">{label}</span>
        <span className="font-mono text-[13px] tabular-nums text-[var(--color-text-primary)]">{display}</span>
      </div>
      <input type="range" className="techno" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

function Stat({ label, value, tone, sub }: { label: string; value: string; tone: "teal" | "amber"; sub?: string }) {
  const color = tone === "teal" ? "#14B8A6" : "#F59E0B";
  return (
    <div className="rounded-md border border-[var(--color-border-subtle)] bg-black/20 px-4 py-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-mono)] mb-1">{label}</div>
      <div className="flex items-baseline gap-3">
        <div className="font-mono text-[28px] md:text-[32px] tabular-nums leading-none" style={{ color }}>{value}</div>
        {sub && <span className="font-mono text-[12px]" style={{ color }}>{sub}</span>}
      </div>
    </div>
  );
}
