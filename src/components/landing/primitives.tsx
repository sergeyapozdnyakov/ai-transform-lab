import { ReactNode } from "react";
import { motion } from "framer-motion";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-[11px] tracking-[0.12em] text-[var(--color-accent-indigo)] uppercase">
        {children}
      </span>
      <span className="h-px flex-1 bg-[var(--color-border-subtle)]" />
    </div>
  );
}

export function StatusPill({
  children,
  color = "indigo",
}: {
  children: ReactNode;
  color?: "indigo" | "teal";
}) {
  const c = color === "teal" ? "#14B8A6" : "#6366F1";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] px-3 py-1.5">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full pulse-dot" style={{ background: c }} />
      </span>
      <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-text-secondary)]">
        {children}
      </span>
    </span>
  );
}

export function FadeIn({
  children,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function CornerMeta({ children }: { children: ReactNode }) {
  return (
    <div className="absolute bottom-3 right-4 font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-text-mono)]">
      {children}
    </div>
  );
}
