const APP_HOME_PATHS = new Set(["/", "/en", "/pt"]);

/** Ruta de la landing (una sola página), sin `/constancias` ni otras rutas. */
export function isAppHomePath(pathname: string): boolean {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return APP_HOME_PATHS.has(normalized);
}

export function isPageReload(): boolean {
  if (typeof performance === "undefined") return false;
  const entry = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  return entry?.type === "reload";
}

export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function splitHref(href: string): { pathname: string; hash: string | null } {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    return { pathname: href || "/", hash: null };
  }
  const pathname = href.slice(0, hashIndex) || "/";
  const hash = href.slice(hashIndex + 1);
  return { pathname, hash: hash || null };
}

export function smoothScrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: scrollBehavior() });
}

export function smoothScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  return true;
}

/** Tras navegar a otra ruta, espera al ancla en el DOM y hace scroll suave. */
export function smoothScrollToIdWhenReady(
  id: string,
  maxFrames = 48,
): void {
  let frames = 0;
  const tick = () => {
    if (smoothScrollToId(id)) return;
    frames += 1;
    if (frames < maxFrames) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
