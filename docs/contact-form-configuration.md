# Contact form configuration

The browser submits to the same-origin `/api/contact` endpoint. The deploy-only Node
adapter validates and normalizes the request, applies a honeypot and per-IP rate limit,
then forwards it to the CRM.

Production variables:

- `CRM_CONTACT_ENDPOINT` — CRM intake URL. Existing default:
  `http://crm:3000/api/leads/contact`.
- `CRM_INTAKE_SECRET` — optional shared secret forwarded as `x-intake-secret`.
- `CONTACT_FALLBACK_EMAIL` — email stored in the CRM email field when a visitor provides
  only a Telegram handle. Existing default: `ai@pozdnyakov.io`. The Telegram handle is
  preserved at the top of the lead description.

The public contact values and client endpoint live in `src/content/site.ts`.

The server keeps no lead database. It forwards only the validated fields required by
the CRM and a bounded set of `utm_*` values. Rate-limit state is process-local and
resets when the container restarts.
