import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import {
  alternateLocalePath,
  getSiteContent,
  localizedPath,
  siteConfig,
  type Locale,
} from "../../content/site";
import { trackEvent } from "../../lib/analytics";

export function PrimaryCta({
  locale,
  source,
  service = "fractional-cio",
  className = "",
  children,
}: {
  locale: Locale;
  source: string;
  service?: string;
  className?: string;
  children?: ReactNode;
}) {
  const content = getSiteContent(locale);
  const href = `${localizedPath(locale, "/contact")}?service=${encodeURIComponent(service)}&source=${encodeURIComponent(source)}`;

  return (
    <a
      href={href}
      onClick={() =>
        trackEvent("primary_cta_click", {
          route: typeof window === "undefined" ? "" : window.location.pathname,
          location: source,
          service,
          language: locale,
        })
      }
      className={`inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-center text-[14px] font-medium text-[var(--color-btn-primary-fg)] transition-colors hover:bg-[var(--color-btn-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)] ${className}`}
    >
      {children ?? content.cta.primary} <span aria-hidden="true">&nbsp;→</span>
    </a>
  );
}

export function SecondaryCta({
  href,
  children,
  onClick,
  className = "",
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center rounded-md border border-[var(--color-border-emphasis)] bg-transparent px-5 py-3 text-center text-[14px] font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-soft-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)] ${className}`}
    >
      {children}
    </a>
  );
}

function ThemeToggle({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Theme persistence is optional.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        locale === "ru"
          ? theme === "dark"
            ? "Включить светлую тему"
            : "Включить тёмную тему"
          : theme === "dark"
            ? "Switch to light theme"
            : "Switch to dark theme"
      }
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-emphasis)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)]"
    >
      {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}

export function SiteHeader({
  locale,
  currentPath,
  service = "fractional-cio",
}: {
  locale: Locale;
  currentPath: string;
  service?: string;
}) {
  const content = getSiteContent(locale);
  const [menuOpen, setMenuOpen] = useState(false);
  const alternatePath = alternateLocalePath(currentPath, locale);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 md:px-10">
        <a
          href={localizedPath(locale, "/")}
          className="min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)]"
          aria-label={locale === "ru" ? "POZDNYAKOV.IO — на главную" : "POZDNYAKOV.IO — home"}
        >
          <span className="block font-mono text-[12px] font-semibold text-[var(--color-text-primary)]">
            POZDNYAKOV<span className="text-[var(--color-accent-indigo)]">.</span>IO
          </span>
          <span className="hidden text-[9px] text-[var(--color-text-mono)] sm:block">
            {content.descriptor}
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={currentPath === item.href ? "page" : undefined}
              className="text-[13px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={alternatePath}
            hrefLang={locale === "ru" ? "en" : "ru"}
            className="hidden min-h-9 items-center px-2 font-mono text-[11px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)] sm:inline-flex"
          >
            {locale === "ru" ? "EN" : "RU"}
          </a>
          <ThemeToggle locale={locale} />
          <div className="hidden xl:block">
            <PrimaryCta locale={locale} source="header" service={service} />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              locale === "ru"
                ? menuOpen
                  ? "Закрыть меню"
                  : "Открыть меню"
                : menuOpen
                  ? "Close menu"
                  : "Open menu"
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border-emphasis)] text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)] lg:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-4 py-5 lg:hidden"
        >
          <nav
            className="mx-auto flex max-w-[1240px] flex-col"
            aria-label={locale === "ru" ? "Мобильная навигация" : "Mobile navigation"}
          >
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-[var(--color-border-subtle)] py-3 text-[15px] text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={localizedPath(locale, "/it-diagnostic")}
              className="border-b border-[var(--color-border-subtle)] py-3 text-[15px] text-[var(--color-text-primary)]"
            >
              {content.cta.diagnostic}
            </a>
            <a
              href={alternatePath}
              className="py-3 font-mono text-[12px] text-[var(--color-text-secondary)]"
            >
              {locale === "ru" ? "English version" : "Русская версия"}
            </a>
            <PrimaryCta
              locale={locale}
              source="mobile-menu"
              service={service}
              className="mt-3 w-full"
            />
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);
  const docsSuffix = locale === "en" ? "-en" : "";

  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/45">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-10">
        <div>
          <div className="font-mono text-[12px] font-semibold text-[var(--color-text-primary)]">
            POZDNYAKOV<span className="text-[var(--color-accent-indigo)]">.</span>IO
          </div>
          <p className="mt-3 max-w-[340px] text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
            {content.footer.note}
          </p>
        </div>
        <FooterColumn
          title={content.footer.services}
          links={[
            ["Fractional CIO", localizedPath(locale, "/fractional-cio")],
            [locale === "ru" ? "AI-аудит" : "AI Audit", localizedPath(locale, "/ai-audit")],
            [content.footer.diagnostic, localizedPath(locale, "/it-diagnostic")],
          ]}
        />
        <FooterColumn
          title={content.footer.resources}
          links={[
            [content.footer.first90, `/docs/first-90-days${docsSuffix}.html`],
            [content.footer.nda, `/docs/nda-template${docsSuffix}.html`],
            [content.footer.aiReport, `/docs/sample-audit-report${docsSuffix}.html`],
            [content.footer.dataPolicy, `/docs/data-policy${docsSuffix}.html`],
          ]}
        />
        <FooterColumn
          title={content.footer.contact}
          links={[
            [siteConfig.contact.email, `mailto:${siteConfig.contact.email}`],
            ["Telegram", siteConfig.contact.telegramUrl],
            ["LinkedIn", siteConfig.contact.linkedinUrl],
          ]}
        />
      </div>
      <div className="border-t border-[var(--color-border-subtle)]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-3 px-4 py-5 font-mono text-[10px] text-[var(--color-text-mono)] sm:px-6 md:px-10">
          <span>© 2026 {siteConfig.owner[locale]}</span>
          <span>{content.descriptor}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <div>
      <h2 className="font-mono text-[10px] uppercase text-[var(--color-text-mono)]">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <li key={`${label}-${href}`}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="text-[13px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-indigo)]"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteShell({
  locale,
  currentPath,
  service,
  children,
}: {
  locale: Locale;
  currentPath: string;
  service?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
      <SiteHeader locale={locale} currentPath={currentPath} service={service} />
      {children}
      <SiteFooter locale={locale} />
    </div>
  );
}
