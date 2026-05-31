import { useState, useEffect } from "react";
import { useI18n } from "../../lib/i18n";
import { X, Check } from "lucide-react";

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", team: "", desc: "" });

  useEffect(() => {
    if (!open) setSubmitted(false);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)] p-6 animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--color-text-mono)] hover:text-[var(--color-text-strong)]">
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <h3 className="text-xl font-medium mb-1 tracking-tight">{t.modal.title}</h3>
            <p className="text-[13px] text-[var(--color-text-secondary)] mb-5">{t.modal.sub}</p>
            <form onSubmit={submit} className="space-y-3">
              <Field label={t.modal.name + " *"} value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label={t.modal.company + " *"} value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
              <Field label={t.modal.email + " *"} type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.1em] text-[var(--color-text-mono)] mb-1.5">{t.modal.team}</label>
                <select value={form.team} onChange={(e) => setForm({ ...form, team: e.target.value })} className="w-full rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-input-bg)] px-3 py-2.5 text-[13px] outline-none focus:border-[var(--color-accent-indigo)]">
                  <option value="">—</option>
                  {t.modal.teamOpts.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.1em] text-[var(--color-text-mono)] mb-1.5">{t.modal.desc}</label>
                <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} maxLength={500} className="w-full rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-input-bg)] px-3 py-2.5 text-[13px] outline-none focus:border-[var(--color-accent-indigo)] resize-none" />
              </div>
              <button type="submit" className="w-full rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] transition-all hover:bg-[var(--color-btn-primary-hover)] mt-2">
                {t.modal.submit} →
              </button>
            </form>
          </>
        ) : (
          <div className="py-10 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent-teal)]/15 mb-4 animate-in zoom-in duration-300">
              <Check size={28} className="text-[var(--color-accent-teal)]" />
            </div>
            <p className="text-[15px] text-[var(--color-text-primary)]">{t.modal.success}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-[11px] font-mono uppercase tracking-[0.1em] text-[var(--color-text-mono)] mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        maxLength={type === "email" ? 255 : 100}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-input-bg)] px-3 py-2.5 text-[13px] outline-none focus:border-[var(--color-accent-indigo)] transition-colors"
      />
    </div>
  );
}
