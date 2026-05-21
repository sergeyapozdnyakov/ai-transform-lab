import { useState } from "react";
import { useI18n } from "../../lib/i18n";
import { FileText } from "lucide-react";

export function Widget2DocExtract() {
  const { t } = useI18n();
  const [stage, setStage] = useState(0);

  return (
    <div className="rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/80 p-6">
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 rounded-md border border-[var(--color-border-subtle)] p-1 bg-black/20 w-fit">
        {t.widget2.tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setStage(i)}
            className={`px-4 py-2 rounded text-[12px] font-mono uppercase tracking-[0.08em] transition-colors ${
              stage === i ? "bg-[var(--color-accent-indigo)] text-white" : "text-[var(--color-text-secondary)] hover:text-white"
            }`}
          >
            <span className="opacity-60 mr-2">0{i + 1}</span>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Document side */}
        <div className="relative rounded-lg border border-[var(--color-border-subtle)] bg-black/30 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border-subtle)] bg-black/30">
            <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-secondary)]">
              <FileText size={14} strokeWidth={1.5} className="text-[var(--color-accent-indigo)]" />
              <span className="font-mono text-[11px]">{t.widget2.docTitle}</span>
            </div>
            <span className="font-mono text-[10px] text-[var(--color-text-mono)]">PDF · 2 pages</span>
          </div>
          <div className="relative p-5 h-[320px] overflow-hidden">
            {/* Mock document lines */}
            <div className="space-y-2.5 font-mono text-[11px] leading-relaxed">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">INVOICE</span>
                <span className={"text-[var(--color-text-primary)] " + (stage >= 1 ? "bg-[var(--color-accent-indigo-soft)] px-1 -mx-1" : "")}>№ 2026-0418</span>
              </div>
              <div className={"text-[var(--color-text-primary)] " + (stage >= 1 ? "bg-[var(--color-accent-indigo-soft)] px-1 -mx-1 inline-block" : "")}>
                Date: 2026-04-18
              </div>
              <div className="mt-3 text-[var(--color-text-mono)]">───────────────────</div>
              <div className={(stage >= 1 ? "bg-[var(--color-accent-indigo-soft)] px-1 -mx-1" : "")}>
                <div className="text-[var(--color-text-secondary)]">From:</div>
                <div className="text-[var(--color-text-primary)]">ООО «Технопарк»</div>
                <div className="text-[var(--color-text-secondary)]">ИНН 7701234567 · КПП 770101001</div>
              </div>
              <div className="mt-3 text-[var(--color-text-mono)]">───────────────────</div>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <span className="text-[var(--color-text-mono)]">SKU</span>
                <span className="text-[var(--color-text-mono)]">QTY</span>
                <span className="text-[var(--color-text-mono)] text-right">SUM</span>
                {Array.from({ length: 4 }).flatMap((_, i) => [
                  <span key={"a" + i} className="text-[var(--color-text-secondary)]">TP-{1000 + i}</span>,
                  <span key={"b" + i} className="text-[var(--color-text-secondary)]">{12 + i}</span>,
                  <span key={"c" + i} className="text-[var(--color-text-primary)] text-right">{(12500 * (i + 1)).toLocaleString()}</span>,
                ])}
              </div>
              <div className="mt-3 flex justify-between border-t border-[var(--color-border-subtle)] pt-2">
                <span className="text-[var(--color-text-secondary)]">TOTAL</span>
                <span className={"text-[var(--color-text-primary)] " + (stage >= 1 ? "bg-[var(--color-accent-indigo-soft)] px-1 -mx-1" : "")}>1 248 500 ₽</span>
              </div>
              <div className={"flex justify-between " + (stage >= 1 ? "bg-[var(--color-accent-indigo-soft)] px-1 -mx-1" : "")}>
                <span className="text-[var(--color-text-secondary)]">VAT 20%</span>
                <span className="text-[var(--color-text-primary)]">208 083 ₽</span>
              </div>
            </div>

            {/* Scanning overlay during stage 1 */}
            {stage === 1 && (
              <>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-12 scan-sweep" style={{
                  background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.18), transparent)",
                  borderBottom: "1px solid rgba(99,102,241,0.6)",
                }} />
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute top-3 right-3 font-mono text-[9px] text-[var(--color-accent-indigo)] tracking-[0.12em] uppercase">
                    <span className="pulse-dot inline-block mr-1">●</span> SCANNING…
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Result side */}
        <div className="rounded-lg border border-[var(--color-border-subtle)] bg-black/30 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border-subtle)] bg-black/30">
            <span className="font-mono text-[11px] text-[var(--color-text-secondary)]">structured.json</span>
            <span className="font-mono text-[10px] text-[var(--color-accent-teal)]">
              {stage === 2 ? "● EXTRACTED" : stage === 1 ? "● PARSING" : "○ IDLE"}
            </span>
          </div>
          <div className="p-5 h-[320px] overflow-auto">
            {stage < 2 ? (
              <div className="font-mono text-[11px] text-[var(--color-text-mono)] space-y-2">
                <div>// waiting for extraction…</div>
                {stage === 1 && (
                  <div className="space-y-1.5 mt-4">
                    {t.widget2.fields.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent-indigo)]">[{i + 1}]</span>
                        <span>detecting</span>
                        <span className="text-[var(--color-text-mono)]">→</span>
                        <span>{f.k}</span>
                        <span className="ml-auto text-[var(--color-accent-indigo)] pulse-dot">●</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {t.widget2.fields.map((f, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[100px_1fr_auto] items-center gap-3 rounded border border-[var(--color-border-subtle)] bg-black/30 px-3 py-2 animate-in fade-in slide-in-from-right-2 duration-300"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-mono)]">{f.k}</span>
                    <span className="text-[13px] text-[var(--color-text-primary)] truncate">{f.v}</span>
                    <span className="font-mono text-[10px] text-[var(--color-accent-teal)] tabular-nums">{f.conf}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
