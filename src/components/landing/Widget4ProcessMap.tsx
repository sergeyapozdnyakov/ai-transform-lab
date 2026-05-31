import { useState } from "react";
import { useI18n } from "../../lib/i18n";

type Node = {
  id: string;
  x: number;
  y: number;
  label: string;
  bottleneck?: number; // index in bottleneckReasons (0-3)
  ai?: number;         // 1..4 — recommendation marker
};

type Edge = [string, string, boolean?]; // [from, to, isAiNew]

const nodes: Node[] = [
  // Inbound (left)
  { id: "lead", x: 60, y: 40, label: "Заявки" },
  { id: "call", x: 60, y: 90, label: "Звонки" },
  { id: "chat", x: 60, y: 140, label: "Чат" },
  { id: "mail", x: 60, y: 190, label: "Email" },

  // Routing
  { id: "route", x: 190, y: 115, label: "Распред." },

  // Qualification (bottleneck #1)
  { id: "qual", x: 320, y: 60, label: "Квалиф.", bottleneck: 0, ai: 1 },

  // Stock check & pricing branch
  { id: "stock", x: 320, y: 170, label: "Склад" },
  { id: "price", x: 450, y: 230, label: "Цена", bottleneck: 2, ai: 3 },

  // Quote building (bottleneck #2)
  { id: "kp", x: 450, y: 60, label: "КП", bottleneck: 1, ai: 2 },

  // Client agreement
  { id: "agree", x: 570, y: 140, label: "Согл." },

  // Contract
  { id: "contract", x: 690, y: 90, label: "Договор" },

  // Production / logistics
  { id: "prod", x: 690, y: 200, label: "Произв." },

  // Logistics & control (bottleneck #4)
  { id: "logi", x: 820, y: 150, label: "Достав." },
  { id: "ctrl", x: 820, y: 60, label: "Контроль", bottleneck: 3, ai: 4 },
];

const edges: Edge[] = [
  ["lead", "route"], ["call", "route"], ["chat", "route"], ["mail", "route"],
  ["route", "qual"], ["route", "stock"],
  ["qual", "kp"],
  ["stock", "price"], ["stock", "kp"],
  ["price", "kp"],
  ["kp", "agree"], ["agree", "contract"], ["agree", "prod"],
  ["contract", "ctrl"], ["prod", "logi"], ["logi", "ctrl"],
];

// Extra edges when "Show recommendations" is ON — represents new AI data flows
const aiEdges: Edge[] = [
  ["qual", "kp", true],     // AI pre-fills proposal from qualified data
  ["price", "ctrl", true],  // pricing telemetry into monitoring
  ["ctrl", "agree", true],  // proactive feedback loop
];

export function Widget4ProcessMap() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const labels = t.procmap.tooltipLabels;
  const rec = hovered ? t.procmap.recommendations[hovered - 1] : null;
  const bottleneckHovered = hovered && t.procmap.bottleneckReasons[hovered - 1];

  return (
    <div className="rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/80 p-6">
      <div className="flex items-center justify-between mb-5 gap-4">
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-text-mono)]">
          PROCESS MAP · FRAGMENT
        </span>
        <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.08em] uppercase">
          <span className="flex items-center gap-1.5 text-[var(--color-text-mono)]">
            <span className="inline-block w-2 h-2 rounded-full border" style={{ borderColor: "#EF4444" }} />
            {t.procmap.bottleneckLegend}
          </span>
          <span className="flex items-center gap-1.5 text-[var(--color-text-mono)]">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#14B8A6" }} />
            {t.procmap.aiPointLegend}
          </span>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <span className="text-[12px] text-[var(--color-text-secondary)] normal-case tracking-normal">{t.procmap.toggle}</span>
            <span
              className="relative inline-block w-10 h-5 rounded-full border border-[var(--color-border-emphasis)] transition-colors"
              style={{ background: show ? "#14B8A6" : "rgba(255,255,255,0.06)" }}
            >
              <input type="checkbox" className="sr-only" checked={show} onChange={(e) => setShow(e.target.checked)} />
              <span
                className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-[var(--color-btn-primary)] transition-transform"
                style={{ transform: show ? "translateX(20px)" : "translateX(0)" }}
              />
            </span>
          </label>
        </div>
      </div>

      <div className="relative rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-input-bg)] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <svg viewBox="0 0 900 280" className="relative w-full h-[340px]">
          {/* Base edges */}
          {edges.map(([a, b], i) => {
            const A = byId[a]; const B = byId[b];
            const bottle = (A.bottleneck !== undefined) || (B.bottleneck !== undefined);
            return (
              <line
                key={i}
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke={bottle && !show ? "rgba(245,158,11,0.45)" : "rgba(255,255,255,0.15)"}
                strokeWidth={1}
                strokeDasharray={bottle ? "3 3" : "0"}
              />
            );
          })}

          {/* AI-added edges */}
          {show && aiEdges.map(([a, b], i) => {
            const A = byId[a]; const B = byId[b];
            return (
              <line
                key={"ai" + i}
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke="#14B8A6"
                strokeWidth={1.2}
                strokeDasharray="2 4"
                opacity={0.7}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((n) => (
            <g key={n.id}>
              {n.bottleneck !== undefined && (
                <circle
                  cx={n.x} cy={n.y} r={show ? 22 : 20}
                  fill="none"
                  stroke={show ? "#14B8A6" : "#EF4444"}
                  strokeWidth={1.3}
                  opacity={0.75}
                />
              )}
              <circle cx={n.x} cy={n.y} r={14} fill="#0F1422" stroke="rgba(255,255,255,0.22)" strokeWidth={1} />
              <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="8.5" fill="#F9FAFB" fontFamily="JetBrains Mono">
                {n.label}
              </text>

              {/* AI recommendation marker */}
              {show && n.ai && (
                <g
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(n.ai!)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <circle cx={n.x + 20} cy={n.y - 18} r={9} fill="#14B8A6" />
                  <text x={n.x + 20} y={n.y - 15} textAnchor="middle" fontSize="9" fontWeight={600} fill="#0A0E1A" fontFamily="JetBrains Mono">
                    0{n.ai}
                  </text>
                </g>
              )}

              {/* Bottleneck hover trigger (when not in show mode) */}
              {!show && n.bottleneck !== undefined && (
                <circle
                  cx={n.x} cy={n.y} r={22}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(n.bottleneck! + 1)}
                  onMouseLeave={() => setHovered(null)}
                />
              )}
            </g>
          ))}
        </svg>

        {/* Tooltip — recommendation (when toggle ON) */}
        {show && rec && (
          <div className="absolute bottom-3 left-3 right-3 rounded border border-[var(--color-accent-teal)]/40 bg-black/85 px-4 py-3 text-[12px] text-[var(--color-text-primary)] backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[var(--color-accent-teal)] tracking-[0.1em]">
                REC.0{hovered} · {rec.title}
              </span>
              <span className="font-mono text-[10px] tracking-[0.08em] text-[var(--color-accent-teal)]">
                {rec.category}
              </span>
            </div>
            <div className="grid sm:grid-cols-[1fr_auto] gap-3 text-[12px]">
              <div className="space-y-1.5">
                <KV label={labels.solution} value={rec.solution} />
                <KV label={labels.integrations} value={rec.integrations} mono />
              </div>
              <div className="space-y-1.5 sm:text-right">
                <KV label={labels.timeline} value={rec.timeline} mono />
                <KV label={labels.effect} value={rec.effect} mono accent />
              </div>
            </div>
          </div>
        )}

        {/* Tooltip — bottleneck reason (when toggle OFF) */}
        {!show && bottleneckHovered && (
          <div className="absolute bottom-3 left-3 right-3 rounded border border-[var(--color-accent-amber)]/40 bg-black/85 px-3 py-2 text-[12px] text-[var(--color-text-primary)] backdrop-blur-sm">
            <span className="font-mono text-[10px] text-[var(--color-accent-amber)] mr-2 tracking-[0.1em]">
              BOTTLENECK.0{hovered}
            </span>
            {bottleneckHovered}
          </div>
        )}

        {/* Hint */}
        {!hovered && (
          <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.1em] uppercase text-[var(--color-text-mono)]">
            {t.procmap.tooltipHint}
          </div>
        )}
      </div>
    </div>
  );
}

function KV({ label, value, mono, accent }: { label: string; value: string; mono?: boolean; accent?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[9px] tracking-[0.1em] text-[var(--color-text-mono)]">{label}</div>
      <div
        className={`${mono ? "font-mono" : ""} text-[12px] leading-snug`}
        style={{ color: accent ? "#14B8A6" : "var(--color-text-primary)" }}
      >
        {value}
      </div>
    </div>
  );
}
