import { useState, useMemo } from "react";
import { useI18n } from "../../lib/i18n";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const fmt = (n: number, dec = 0) => {
  if (dec === 0) return String(Math.round(n));
  return (Math.round(n * 10 ** dec) / 10 ** dec).toFixed(dec);
};

export function Widget1BeforeAfter() {
  const { t } = useI18n();
  const [v, setV] = useState(0);
  const tt = v / 100;

  const flow = useMemo(() => {
    return t.hero.flowBefore.map((b, i) => ({
      label: tt < 0.5 ? b : t.hero.flowAfter[i],
      mid: i > 0 && i < t.hero.flowBefore.length - 1,
    }));
  }, [t, tt]);

  return (
    <div className="relative rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/80 p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-text-mono)]">
          {t.hero.widgetLabel}
        </span>
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-text-mono)]">
          WIDGET.01
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        {t.hero.metrics.map((m, i) => {
          const cur = lerp(m.from, m.to, tt);
          const isDecimal = !Number.isInteger(m.from) || !Number.isInteger(m.to);
          const deltaPct = Math.round(((m.to - m.from) / m.from) * 100);
          const showDelta = tt > 0.5;
          const positive = m.deltaInverted ? deltaPct < 0 : deltaPct > 0;
          return (
            <div key={i} className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] p-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--color-text-mono)] mb-2 leading-tight h-6">
                {m.label}
              </div>
              <div className="font-mono text-xl md:text-2xl text-[var(--color-text-primary)] tabular-nums">
                {fmt(cur, isDecimal ? 1 : 0)}
                <span className="text-sm text-[var(--color-text-secondary)]">{m.suffix}</span>
              </div>
              <div
                className="font-mono text-[10px] mt-1 tabular-nums transition-opacity duration-300"
                style={{
                  opacity: showDelta ? 1 : 0,
                  color: positive ? "#14B8A6" : "#F59E0B",
                }}
              >
                {deltaPct > 0 ? "↑ +" : "↓ "}
                {Math.abs(deltaPct)}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider */}
      <div className="mb-1">
        <input
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          className="techno"
          aria-label="before-after"
        />
        <div className="flex justify-between mt-2 font-mono text-[10px] tracking-[0.12em] uppercase">
          <span style={{ color: tt < 0.5 ? "#F59E0B" : "#6B7280" }}>{t.hero.before}</span>
          <span style={{ color: tt >= 0.5 ? "#14B8A6" : "#6B7280" }}>{t.hero.after}</span>
        </div>
      </div>

      {/* Flow */}
      <div className="mt-5 rounded-md bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] p-3">
        <div className="flex items-center justify-between gap-1">
          {flow.map((f, i) => {
            const isMid = f.mid;
            const color = !isMid ? "#9CA3AF" : tt < 0.5 ? "#F59E0B" : "#14B8A6";
            return (
              <div key={i} className="flex items-center flex-1 min-w-0">
                <div
                  className="flex-1 rounded border px-1.5 py-1.5 text-center font-mono text-[9px] uppercase tracking-wide truncate transition-colors"
                  style={{
                    borderColor: isMid ? color + "55" : "var(--color-viz-line-soft)",
                    color,
                    background: isMid ? color + "10" : "transparent",
                  }}
                  title={f.label}
                >
                  {f.label}
                </div>
                {i < flow.length - 1 && (
                  <span className="px-1 text-[var(--color-text-mono)]">→</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Captions */}
      <div className="relative mt-4 min-h-[72px]">
        <p
          className="absolute inset-0 text-[12.5px] leading-relaxed text-[var(--color-text-secondary)] transition-opacity duration-400"
          style={{ opacity: tt < 0.5 ? 1 : 0 }}
        >
          {t.hero.captionBefore}
        </p>
        <p
          className="absolute inset-0 text-[12.5px] leading-relaxed text-[var(--color-text-primary)] transition-opacity duration-400"
          style={{ opacity: tt >= 0.5 ? 1 : 0 }}
        >
          {t.hero.captionAfter}
        </p>
      </div>

      {/* Stack + disclaimer */}
      <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] space-y-1.5">
        <div className="font-mono text-[9.5px] tracking-[0.08em] text-[var(--color-accent-indigo)] truncate">
          {t.hero.stack}
        </div>
        <div className="font-mono text-[9px] leading-snug text-[var(--color-text-mono)]">
          {t.hero.disclaimer}
        </div>
      </div>
    </div>
  );
}
