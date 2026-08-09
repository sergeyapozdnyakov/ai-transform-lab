import type { Locale } from "../content/site";

export const analyticsEvents = [
  "primary_cta_click",
  "first_90_days_click",
  "it_diagnostic_start",
  "it_diagnostic_complete",
  "lead_form_start",
  "lead_form_submit_success",
  "lead_form_submit_error",
  "fractional_cio_page_view",
  "ai_audit_page_view",
  "ai_audit_to_fractional_cio_click",
  "fractional_cio_to_ai_audit_click",
] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];

type AnalyticsContext = {
  route: string;
  location?: string;
  service?: string;
  language: Locale;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: AnalyticsEvent, context: AnalyticsContext) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    route: context.route,
    cta_location: context.location,
    selected_service: context.service,
    language: context.language,
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  window.dispatchEvent(new CustomEvent("pozdnyakov:analytics", { detail: payload }));
}
