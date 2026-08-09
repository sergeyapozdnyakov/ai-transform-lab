# Analytics events

The site uses the existing analytics environment only. `src/lib/analytics.ts` pushes to
`window.dataLayer` when it already exists and also emits a local
`pozdnyakov:analytics` browser event. No analytics vendor is installed by this change.

Tracked events:

- `primary_cta_click`
- `first_90_days_click`
- `it_diagnostic_start`
- `it_diagnostic_complete`
- `lead_form_start`
- `lead_form_submit_success`
- `lead_form_submit_error`
- `fractional_cio_page_view`
- `ai_audit_page_view`
- `ai_audit_to_fractional_cio_click`
- `fractional_cio_to_ai_audit_click`

Allowed context fields are route, CTA location, selected service, and language. The
form does not send names, contacts, company details, or free-text problems to analytics.
