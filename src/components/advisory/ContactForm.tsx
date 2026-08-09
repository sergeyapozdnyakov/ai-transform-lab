import { Check, Send } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { getSiteContent, siteConfig, type Locale } from "../../content/site";
import { trackEvent } from "../../lib/analytics";

type FormState = {
  nameRole: string;
  companyWebsite: string;
  complexity: string;
  problem: string;
  contact: string;
  situation: string;
  consent: boolean;
  websiteFax: string;
};

const initialForm: FormState = {
  nameRole: "",
  companyWebsite: "",
  complexity: "",
  problem: "",
  contact: "",
  situation: "",
  consent: false,
  websiteFax: "",
};

function isValidContact(value: string) {
  const normalized = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) || /^@?[a-zA-Z0-9_]{5,}$/.test(normalized);
}

export function ContactForm({
  locale,
  defaultService = "fractional-cio",
  source = "contact-page",
}: {
  locale: Locale;
  defaultService?: string;
  source?: string;
}) {
  const content = getSiteContent(locale);
  const copy = content.contact;
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const started = useRef(false);

  const queryContext = useMemo(() => {
    if (typeof window === "undefined") return { service: defaultService, source };
    const params = new URLSearchParams(window.location.search);
    return {
      service: params.get("service") || defaultService,
      source: params.get("source") || source,
    };
  }, [defaultService, source]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (!started.current) {
      started.current = true;
      trackEvent("lead_form_start", {
        route: typeof window === "undefined" ? "" : window.location.pathname,
        location: queryContext.source,
        service: queryContext.service,
        language: locale,
      });
    }
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.nameRole.trim()) next.nameRole = copy.required;
    if (!form.companyWebsite.trim()) next.companyWebsite = copy.required;
    if (!form.complexity.trim()) next.complexity = copy.required;
    if (!form.problem.trim()) next.problem = copy.required;
    if (!form.situation) next.situation = copy.required;
    if (!form.contact.trim()) next.contact = copy.required;
    else if (!isValidContact(form.contact)) next.contact = copy.invalidContact;
    if (!form.consent) next.consent = copy.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildMailto = () => {
    const subject = encodeURIComponent(
      `${locale === "ru" ? "ИТ-ситуация" : "IT situation"} — ${form.companyWebsite}`,
    );
    const body = encodeURIComponent(
      [
        `${copy.fields.nameRole}: ${form.nameRole}`,
        `${copy.fields.companyWebsite}: ${form.companyWebsite}`,
        `${copy.fields.complexity}: ${form.complexity}`,
        `${copy.fields.situation}: ${form.situation}`,
        `${copy.fields.contact}: ${form.contact}`,
        "",
        `${copy.fields.problem}:`,
        form.problem,
      ].join("\n"),
    );
    return `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading" || !validate()) return;
    setStatus("loading");

    const utm =
      typeof window === "undefined"
        ? {}
        : Object.fromEntries(
            [...new URLSearchParams(window.location.search).entries()].filter(([key]) =>
              key.toLowerCase().startsWith("utm_"),
            ),
          );

    try {
      const response = await fetch(siteConfig.contact.formEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.nameRole.trim(),
          company: form.companyWebsite.trim(),
          email: form.contact.trim(),
          team: form.complexity.trim(),
          desc: form.problem.trim(),
          role: form.nameRole.trim(),
          website: form.companyWebsite.trim(),
          complexity: form.complexity.trim(),
          situation: form.situation,
          service: queryContext.service,
          source: queryContext.source,
          language: locale,
          pageUrl: typeof window === "undefined" ? "" : window.location.href,
          utm,
          websiteFax: form.websiteFax,
        }),
      });

      if (!response.ok) throw new Error(`Contact request failed: ${response.status}`);
      setStatus("success");
      trackEvent("lead_form_submit_success", {
        route: typeof window === "undefined" ? "" : window.location.pathname,
        location: queryContext.source,
        service: queryContext.service,
        language: locale,
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
      trackEvent("lead_form_submit_error", {
        route: typeof window === "undefined" ? "" : window.location.pathname,
        location: queryContext.source,
        service: queryContext.service,
        language: locale,
      });
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-md border border-[var(--color-accent-teal)]/40 bg-[var(--color-accent-teal)]/8 p-6"
        role="status"
      >
        <Check className="text-[var(--color-accent-teal)]" aria-hidden="true" />
        <p className="mt-4 max-w-[680px] text-[16px] leading-relaxed">{copy.success}</p>
        {siteConfig.contact.calendarUrl && (
          <a
            href={siteConfig.contact.calendarUrl}
            className="mt-5 inline-flex rounded-md border border-[var(--color-border-emphasis)] px-4 py-2 text-[14px]"
          >
            {locale === "ru" ? "Выбрать время" : "Choose a time"}
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          id="nameRole"
          label={copy.fields.nameRole}
          value={form.nameRole}
          onChange={(value) => update("nameRole", value)}
          error={errors.nameRole}
          autoComplete="name"
        />
        <Field
          id="companyWebsite"
          label={copy.fields.companyWebsite}
          value={form.companyWebsite}
          onChange={(value) => update("companyWebsite", value)}
          error={errors.companyWebsite}
          autoComplete="organization"
        />
      </div>

      <TextAreaField
        id="complexity"
        label={copy.fields.complexity}
        value={form.complexity}
        onChange={(value) => update("complexity", value)}
        error={errors.complexity}
        hint={copy.complexityHint}
        rows={2}
      />

      <div>
        <label
          htmlFor="situation"
          className="mb-2 block font-mono text-[11px] uppercase text-[var(--color-text-mono)]"
        >
          {copy.fields.situation} <span aria-hidden="true">*</span>
        </label>
        <select
          id="situation"
          value={form.situation}
          onChange={(event) => update("situation", event.target.value)}
          aria-invalid={Boolean(errors.situation)}
          aria-describedby={errors.situation ? "situation-error" : undefined}
          className="min-h-12 w-full rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-input-bg)] px-3 text-[14px] text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)]"
        >
          <option value="">{locale === "ru" ? "Выберите вариант" : "Select an option"}</option>
          {copy.situations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.situation && (
          <p id="situation-error" className="mt-1 text-[12px] text-red-400">
            {errors.situation}
          </p>
        )}
      </div>

      <TextAreaField
        id="problem"
        label={copy.fields.problem}
        value={form.problem}
        onChange={(value) => update("problem", value)}
        error={errors.problem}
        hint={copy.problemHint}
        rows={4}
      />

      <Field
        id="contact"
        label={copy.fields.contact}
        value={form.contact}
        onChange={(value) => update("contact", value)}
        error={errors.contact}
        autoComplete="email"
      />

      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="websiteFax">Website fax</label>
        <input
          id="websiteFax"
          name="websiteFax"
          tabIndex={-1}
          autoComplete="off"
          value={form.websiteFax}
          onChange={(event) => update("websiteFax", event.target.value)}
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[13px] text-[var(--color-text-secondary)]">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) => update("consent", event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[var(--color-accent-indigo)]"
          />
          <span>
            {copy.fields.consent}{" "}
            <a
              href={`/docs/data-policy${locale === "en" ? "-en" : ""}.html`}
              className="underline underline-offset-4 hover:text-[var(--color-text-primary)]"
              target="_blank"
              rel="noreferrer"
            >
              {locale === "ru" ? "Открыть документ" : "Open policy"}
            </a>
          </span>
        </label>
        {errors.consent && <p className="mt-1 text-[12px] text-red-400">{errors.consent}</p>}
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <div className="mb-4 rounded-md border border-red-400/40 bg-red-400/5 p-4 text-[13px] leading-relaxed">
            <p>{copy.error}</p>
            <a
              href={buildMailto()}
              className="mt-2 inline-block font-medium underline underline-offset-4"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] transition-colors hover:bg-[var(--color-btn-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)] disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        <Send size={16} aria-hidden="true" />
        {status === "loading" ? (locale === "ru" ? "Отправляю…" : "Sending…") : copy.fields.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] uppercase text-[var(--color-text-mono)]"
      >
        {label} <span aria-hidden="true">*</span>
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={autoComplete}
        maxLength={200}
        className="min-h-12 w-full rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-input-bg)] px-3 text-[14px] text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)]"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[12px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  rows,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint: string;
  rows: number;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] uppercase text-[var(--color-text-mono)]"
      >
        {label} <span aria-hidden="true">*</span>
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-hint${error ? ` ${id}-error` : ""}`}
        maxLength={1500}
        className="w-full resize-y rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-input-bg)] px-3 py-3 text-[14px] leading-relaxed text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)]"
      />
      <p
        id={`${id}-hint`}
        className="mt-1 text-[11px] leading-relaxed text-[var(--color-text-mono)]"
      >
        {hint}
      </p>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[12px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
