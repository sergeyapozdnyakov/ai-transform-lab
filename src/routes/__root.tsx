import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import accessibilityCss from "../accessibility.css?url";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg-base)] px-4 text-[var(--color-text-primary)]">
      <div className="max-w-lg text-center">
        <p className="font-mono text-[11px] text-[var(--color-accent-indigo)]">ERROR · 404</p>
        <h1 className="mt-5 text-[44px] font-medium">
          {isEnglish ? "Page not found" : "Страница не найдена"}
        </h1>
        <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
          {isEnglish
            ? "The page may have moved during the site update."
            : "Возможно, страница была перемещена при обновлении сайта."}
        </p>
        <Link
          to={isEnglish ? "/en" : "/"}
          className="mt-7 inline-flex min-h-11 items-center rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)]"
        >
          {isEnglish ? "Go home" : "На главную"}
        </Link>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg-base)] px-4 text-[var(--color-text-primary)]">
      <div className="max-w-lg text-center">
        <p className="font-mono text-[11px] text-[var(--color-accent-indigo)]">ERROR · 500</p>
        <h1 className="mt-5 text-[32px] font-medium">
          {isEnglish ? "This page did not load" : "Страница не загрузилась"}
        </h1>
        <p className="mt-4 text-[14px] text-[var(--color-text-secondary)]">
          {isEnglish
            ? "Try refreshing the page or return home."
            : "Попробуйте обновить страницу или вернуться на главную."}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="min-h-11 rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)]"
          >
            {isEnglish ? "Try again" : "Повторить"}
          </button>
          <a
            href={isEnglish ? "/en" : "/"}
            className="min-h-11 rounded-md border border-[var(--color-border-emphasis)] px-5 py-3 text-[14px]"
          >
            {isEnglish ? "Go home" : "На главную"}
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "application-name", content: "POZDNYAKOV.IO" },
      { name: "theme-color", content: "#0a0e1a" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: accessibilityCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";

  return (
    <html lang={lang}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:'dark'}catch(e){document.documentElement.dataset.theme='dark'}",
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
