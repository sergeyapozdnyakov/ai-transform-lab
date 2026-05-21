import { useState } from "react";
import { useI18n } from "../../lib/i18n";

type Node = { id: string; x: number; y: number; label: string; bottleneck?: boolean; ai?: number };
type Edge = [string, string];

const nodes: Node[] = [
  { id: "n1", x: 60, y: 80, label: "Lead" },
  { id: "n2", x: 200, y: 60, label: "Qual.", bottleneck: true, ai: 1 },
  { id: "n3", x: 200, y: 160, label: "Docs", bottleneck: true, ai: 2 },
  { id: "n4", x: 360, y: 80, label: "Review" },
  { id: "n5", x: 360, y: 200, label: "Pricing" },
  { id: "n6", x: 520, y: 60, label: "Approval" },
  { id: "n7", x: 520, y: 180, label: "Contract", bottleneck: true, ai: 3 },
  { id: "n8", x: 680, y: 120, label: "CRM" },
];

const edges: Edge[] = [
  ["n1", "n2"], ["n1", "n3"],
  ["n2", "n4"], ["n3", "n4"], ["n3", "n5"],
  ["n4", "n6"], ["n5", "n7"], ["n4", "n7"],
  ["n6", "n8"], ["n7", "n8"],
];

export function Widget4ProcessMap() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/80 p-6">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-text-mono)]">
          PROCESS MAP · FRAGMENT
        </span>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <span className="text-[13px] text-[var(--color-text-secondary)]">{t.procmap.toggle}</span>
          <span className="relative inline-block w-10 h-5 rounded-full border border-[var(--color-border-emphasis)] transition-colors" style={{ background: show ? "#14B8A6" : "rgba(255,255,255,0.06)" }}>
            <input type="checkbox" className="sr-only" checked={show} onChange={(e) => setShow(e.target.checked)} />
            <span className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white transition-transform" style={{ transform: show ? "translateX(20px)" : "translateX(0)" }} />
          </span>
        </label>
      </div>

      <div className="relative rounded-md border border-[var(--color-border-subtle)] bg-black/30 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <svg viewBox="0 0 760 280" className="relative w-full h-[280px]">
          {/* Edges */}
          {edges.map(([a, b], i) => {
            const A = byId[a], B = byId[b];
            const bottle = A.bottleneck || B.bottleneck;
            return (
              <line
                key={i}
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke={bottle && !show ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.15)"}
                strokeWidth={1}
                strokeDasharray={bottle ? "3 3" : "0"}
              />
            );
          })}
          {/* Nodes */}
          {nodes.map((n) => (
            <g key={n.id}>
              {n.bottleneck && (
                <circle
                  cx={n.x} cy={n.y} r={show ? 24 : 22}
                  fill="none"
                  stroke={show ? "#14B8A6" : "#EF4444"}
                  strokeWidth={1.2}
                  opacity={0.7}
                />
              )}
              <circle cx={n.x} cy={n.y} r={16} fill="#0F1422" stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
              <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="9" fill="#F9FAFB" fontFamily="JetBrains Mono">
                {n.label}
              </text>
              {/* AI marker */}
              {show && n.ai && (
                <g
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(n.ai!)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <circle cx={n.x + 22} cy={n.y - 18} r={9} fill="#14B8A6" />
                  <text x={n.x + 22} y={n.y - 15} textAnchor="middle" fontSize="9" fontWeight={600} fill="#0A0E1A" fontFamily="JetBrains Mono">
                    0{n.ai}
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>

        {hovered && (
          <div className="absolute bottom-3 left-3 right-3 rounded border border-[var(--color-accent-teal)]/40 bg-black/80 px-3 py-2 text-[12px] text-[var(--color-text-primary)] backdrop-blur-sm">
            <span className="font-mono text-[10px] text-[var(--color-accent-teal)] mr-2">REC.0{hovered}</span>
            {t.procmap.tips[hovered - 1]}
          </div>
        )}
      </div>
    </div>
  );
}
