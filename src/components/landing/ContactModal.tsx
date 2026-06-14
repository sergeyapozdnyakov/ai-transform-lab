import { useState, useEffect } from "react";
import { useI18n } from "../../lib/i18n";
import { X, Check, ChevronDown } from "lucide-react";

const CONTACT_EMAIL = "ai@pozdnyakov.io";
const CONTACT_TELEGRAM_URL = "https://t.me/pozdnyakov_io";
const CRM_CONTACT_ENDPOINT = "/api/contact";

export function ContactModal({
  open,
  onClose,
  prefill,
}: {
  open: boolean;
  onClose: () => void;
  prefill?: { team?: string; desc?: string } | null;
}) {
  const { lang, t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", team: "", desc: "" });

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setTeamOpen(false);
    }
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || !prefill) return;
    setForm((current) => ({
      ...current,
      team: prefill.team ?? current.team,
      desc: prefill.desc ?? current.desc,
    }));
  }, [open, prefill]);

  if (!open) return null;

  const buildMailto = () => {
    const subject = encodeURIComponent(`AI audit request — ${form.company.trim()}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name.trim()}`,
        `Company: ${form.company.trim()}`,
        `Email: ${form.email.trim()}`,
        `Team size: ${form.team || "-"}`,
        "",
        form.desc.trim() || "No task description provided.",
      ].join("\n"),
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const openMailFallback = () => {
    window.location.href = buildMailto();
  };

  const getUtm = () => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(
      [...params.entries()].filter(([key]) => key.toLowerCase().startsWith("utm_")),
    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim() || submitting) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      const response = await fetch(CRM_CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          team: form.team,
          desc: form.desc.trim(),
          language: lang,
          pageUrl: window.location.href,
          utm: getUtm(),
        }),
      });

      if (!response.ok) throw new Error(`CRM request failed: ${response.status}`);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitError(true);
      openMailFallback();
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)] p-6 shadow-2xl shadow-black/25 animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-mono)] hover:text-[var(--color-text-strong)]"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <h3 className="text-xl font-medium mb-1 tracking-tight">{t.modal.title}</h3>
            <p className="text-[13px] text-[var(--color-text-secondary)] mb-5">{t.modal.sub}</p>
            <form onSubmit={submit} className="space-y-3">
              <Field
                label={t.modal.name + " *"}
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Field
                label={t.modal.company + " *"}
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
              />
              <Field
                label={t.modal.email + " *"}
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.1em] text-[var(--color-text-mono)] mb-1.5">
                  {t.modal.team}
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setTeamOpen((value) => !value)}
                    aria-haspopup="listbox"
                    aria-expanded={teamOpen}
                    className="flex w-full items-center justify-between rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-input-bg)] px-3 py-2.5 text-left text-[13px] text-[var(--color-text-primary)] outline-none transition-colors hover:border-[var(--color-border-emphasis)] hover:bg-[var(--color-input-bg-hover)] focus:border-[var(--color-accent-indigo)]"
                  >
                    <span>{form.team || "—"}</span>
                    <ChevronDown
                      size={16}
                      strokeWidth={1.5}
                      className={`text-[var(--color-text-mono)] transition-transform ${teamOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {teamOpen && (
                    <div
                      role="listbox"
                      className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)] shadow-2xl shadow-black/20"
                    >
                      {["", ...t.modal.teamOpts].map((option) => (
                        <button
                          key={option || "empty"}
                          type="button"
                          role="option"
                          aria-selected={form.team === option}
                          onClick={() => {
                            setForm({ ...form, team: option });
                            setTeamOpen(false);
                          }}
                          className={`block w-full px-3 py-2.5 text-left text-[13px] transition-colors ${
                            form.team === option
                              ? "bg-[var(--color-accent-indigo)] text-white"
                              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-indigo-soft)] hover:text-[var(--color-text-primary)]"
                          }`}
                        >
                          {option || "—"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.1em] text-[var(--color-text-mono)] mb-1.5">
                  {t.modal.desc}
                </label>
                <textarea
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  rows={3}
                  maxLength={500}
                  className="w-full rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-input-bg)] px-3 py-2.5 text-[13px] text-[var(--color-text-primary)] outline-none transition-colors hover:bg-[var(--color-input-bg-hover)] focus:border-[var(--color-accent-indigo)] resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] transition-colors hover:bg-[var(--color-btn-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 mt-2"
              >
                {submitting ? "..." : t.modal.submit + " →"}
              </button>
            </form>
          </>
        ) : (
          <div className="py-10 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent-teal)]/15 mb-4 animate-in zoom-in duration-300">
              <Check size={28} className="text-[var(--color-accent-teal)]" />
            </div>
            <p className="text-[15px] text-[var(--color-text-primary)]">
              {submitError ? t.modal.crmError : t.modal.success}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 text-[13px]">
              <a
                className="text-[var(--color-accent-indigo)] hover:text-[var(--color-text-primary)]"
                href={buildMailto()}
              >
                {CONTACT_EMAIL}
              </a>
              <a
                className="text-[var(--color-accent-indigo)] hover:text-[var(--color-text-primary)]"
                href={CONTACT_TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-mono uppercase tracking-[0.1em] text-[var(--color-text-mono)] mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        maxLength={type === "email" ? 255 : 100}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-input-bg)] px-3 py-2.5 text-[13px] text-[var(--color-text-primary)] outline-none transition-colors hover:bg-[var(--color-input-bg-hover)] focus:border-[var(--color-accent-indigo)]"
      />
    </div>
  );
}
