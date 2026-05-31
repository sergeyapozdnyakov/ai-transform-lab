import { useState } from "react";
import { useI18n } from "../../lib/i18n";
import { FileText } from "lucide-react";

// Bracket marker positions (relative to the document area)
const BRACKETS = [
  { top: 8, height: 56, color: "#6366F1", key: "supplier_info" },
  { top: 70, height: 30, color: "#14B8A6", key: "document_meta" },
  { top: 108, height: 96, color: "#F59E0B", key: "line_items" },
  { top: 212, height: 22, color: "#A78BFA", key: "payment_terms" },
  { top: 238, height: 18, color: "#22D3EE", key: "validity" },
  { top: 260, height: 18, color: "#F472B6", key: "delivery" },
];

export function Widget2DocExtract() {
  const { t } = useI18n();
  const [stage, setStage] = useState(0);

  const statusText =
    stage === 2 ? t.widget2.statusDone : stage === 1 ? t.widget2.statusParsing : t.widget2.statusIdle;
  const statusColor =
    stage === 2 ? "var(--color-accent-teal)" : stage === 1 ? "var(--color-accent-indigo)" : "var(--color-text-mono)";

  return (
    <div className="rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/80 p-6">
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 rounded-md border border-[var(--color-border-subtle)] p-1 bg-[var(--color-surface-sunken)] w-fit">
        {t.widget2.tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setStage(i)}
            className={`px-4 py-2 rounded text-[12px] font-mono uppercase tracking-[0.08em] transition-colors ${
              stage === i ? "bg-[var(--color-accent-indigo)] text-white" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-strong)]"
            }`}
          >
            <span className="opacity-60 mr-2">0{i + 1}</span>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Document side */}
        <div className="relative rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-input-bg)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border-subtle)] bg-[var(--color-input-bg)]">
            <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-secondary)]">
              <FileText size={14} strokeWidth={1.5} className="text-[var(--color-accent-indigo)]" />
              <span className="font-mono text-[11px]">КП-2026-318.pdf</span>
            </div>
            <span className="font-mono text-[10px] text-[var(--color-text-mono)]">{t.widget2.docMeta}</span>
          </div>

          <div className="relative p-5 h-[440px] overflow-hidden">
            {/* Mock KP document */}
            <pre className="font-mono text-[10.5px] leading-[1.55] text-[var(--color-text-primary)] whitespace-pre-wrap">
{`ООО «ТехМонтажСервис»
ИНН 7728456789  ·  +7 (495) 234-56-78
ул. Профсоюзная, 84/32, Москва

Коммерческое предложение № КП-2026/318
от 14 мая 2026 г.

Уважаемые партнёры! Направляем КП
на поставку комплектующих по заявке
от 11.05.2026:

  1. Подшипник радиальный SKF 6205-2RS1
     240 шт. · 487 ₽/шт без НДС
     срок поставки: 14 рабочих дней

  2. Манжета армированная 25×42×7
     500 шт. · 92.50 ₽
     наличие на складе, отгрузка ~3 дн.

  3. Подшипник упорный 8205, 80 шт.
     цена со скидкой 5% — 1124 ₽/ед
     срок изготовления: до 21 дн.

Оплата: 50% предоплата, 50% по факту.
Цены действительны до 30.06.2026.
Доставка ТК «Деловые Линии» — покупатель.

Менеджер: Иванов И.С.
i.ivanov@tehmontaj.ru`}
            </pre>

            {/* Bracket markers — stage 1+ */}
            {stage >= 1 && (
              <div className="pointer-events-none absolute inset-y-0 right-3 w-32">
                {BRACKETS.map((b, i) => (
                  <div
                    key={b.key}
                    className="absolute left-0 right-0 animate-in fade-in slide-in-from-right-2"
                    style={{
                      top: b.top + 16,
                      height: b.height,
                      animationDelay: `${i * 90}ms`,
                      animationDuration: "320ms",
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 rounded-sm"
                      style={{ background: b.color, opacity: 0.55 }}
                    />
                    <div
                      className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.08em] px-1.5 py-0.5 rounded"
                      style={{ background: "var(--color-tooltip-bg)", color: b.color, border: `1px solid ${b.color}55` }}
                    >
                      [{t.widget2.bracketLabels[i]}]
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Scanning overlay during stage 1 */}
            {stage === 1 && (
              <>
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-14 scan-sweep"
                  style={{
                    background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.20), transparent)",
                    borderBottom: "1px solid rgba(99,102,241,0.7)",
                  }}
                />
                <div className="pointer-events-none absolute top-3 right-3 space-y-0.5 font-mono text-[9px] tracking-[0.08em] text-right">
                  <div className="text-[var(--color-accent-indigo)]">
                    <span className="pulse-dot inline-block mr-1">●</span>{t.widget2.techRunning}
                  </div>
                  <div className="text-[var(--color-text-mono)]">{t.widget2.techTokens}</div>
                  <div className="text-[var(--color-text-mono)]">{t.widget2.techTime}</div>
                  <div className="text-[var(--color-text-mono)]">{t.widget2.techConf}</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Result side */}
        <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-input-bg)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border-subtle)] bg-[var(--color-input-bg)]">
            <span className="font-mono text-[11px] text-[var(--color-text-secondary)]">structured.json</span>
            <span className="font-mono text-[10px]" style={{ color: statusColor }}>{statusText}</span>
          </div>

          <div className="p-5 h-[440px] overflow-auto">
            {stage < 2 ? (
              <div className="font-mono text-[11px] text-[var(--color-text-mono)] space-y-2">
                <div>// waiting for extraction…</div>
                {stage === 1 && (
                  <div className="space-y-1.5 mt-4">
                    {t.widget2.bracketLabels.map((label, i) => (
                      <div key={i} className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent-indigo)]">[{i + 1}]</span>
                        <span>detecting</span>
                        <span className="text-[var(--color-text-mono)]">→</span>
                        <span>{label}</span>
                        <span className="ml-auto text-[var(--color-accent-indigo)] pulse-dot">●</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="animate-in fade-in duration-300">
                <pre className="font-mono text-[10.5px] leading-[1.5] text-[var(--color-text-primary)] whitespace-pre">
{`{
  `}<span style={{ color: "#6366F1" }}>"supplier"</span>{`: {
    "name": `}<span style={{ color: "#86efac" }}>"ООО ТехМонтажСервис"</span>{`,
    "inn": `}<span style={{ color: "#86efac" }}>"7728456789"</span>{`,
    "phone": `}<span style={{ color: "#86efac" }}>"+74952345678"</span>{`,
    "email": `}<span style={{ color: "#86efac" }}>"i.ivanov@tehmontaj.ru"</span>{`
  },
  `}<span style={{ color: "#14B8A6" }}>"document"</span>{`: {
    "number": `}<span style={{ color: "#86efac" }}>"КП-2026/318"</span>{`,
    "date": `}<span style={{ color: "#86efac" }}>"2026-05-14"</span>{`,
    "valid_until": `}<span style={{ color: "#86efac" }}>"2026-06-30"</span>{`
  },
  `}<span style={{ color: "#F59E0B" }}>"items"</span>{`: [
    { "name": "Подшипник SKF 6205-2RS1",
      "qty": `}<span style={{ color: "#fde047" }}>240</span>{`, "price": `}<span style={{ color: "#fde047" }}>487.00</span>{`,
      "vat_included": `}<span style={{ color: "#fca5a5" }}>false</span>{`, "lead_days": 14,
      "confidence": `}<span style={{ color: "#14B8A6" }}>0.97</span>{` },
    { "name": "Манжета 25×42×7",
      "qty": `}<span style={{ color: "#fde047" }}>500</span>{`, "price": `}<span style={{ color: "#fde047" }}>92.50</span>{`,
      "vat_included": `}<span style={{ color: "#fde047" }}>null</span>{`, "in_stock": true,
      "confidence": `}<span style={{ color: "#14B8A6" }}>0.94</span>{` },
    { "name": "Подшипник упорный 8205",
      "qty": `}<span style={{ color: "#fde047" }}>80</span>{`, "price": `}<span style={{ color: "#fde047" }}>1124.00</span>{`,
      "discount_pct": 5, "lead_days": 21,
      "confidence": `}<span style={{ color: "#F59E0B" }}>0.89</span>{` }
  ],
  `}<span style={{ color: "#A78BFA" }}>"payment"</span>{`: { "prepay_pct": 50, "trigger": "shipment" },
  `}<span style={{ color: "#F472B6" }}>"delivery"</span>{`: { "carrier": "Деловые Линии", "paid_by": "buyer" },
  "total_rub": `}<span style={{ color: "#fde047" }}>253220.00</span>{`,
  `}<span style={{ color: "#F59E0B" }}>"review_required"</span>{`: [
    `}<span style={{ color: "#fca5a5" }}>"items[1].vat_included"</span>{`
  ]
}`}
                </pre>

                <div className="mt-4 rounded border border-[var(--color-accent-amber)]/40 bg-[var(--color-accent-amber)]/5 px-3 py-2">
                  <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--color-accent-amber)] mb-1">
                    {t.widget2.reviewLabel}
                  </div>
                  <div className="font-mono text-[10.5px] text-[var(--color-text-primary)]">
                    {t.widget2.reviewItem}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="mt-5 text-[13px] leading-relaxed text-[var(--color-text-secondary)] max-w-[820px]">
        {t.widget2.caption}
      </p>
    </div>
  );
}
