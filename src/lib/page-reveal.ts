import { locales } from "@/i18n/routing";

export const SPLASH_STORAGE_KEY = "rhinoscopy-intro-splash-v1";

/** Intro total ~1,5s + reveal ~0,65s — breve y no intrusiva */
export const SPLASH_HOLD_MS = 820;
export const SPLASH_EXIT_MS = 380;
export const PAGE_REVEAL_MS = 650;

export const PAGE_REVEAL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function isHomePathname(pathname: string): boolean {
  if (pathname === "/") return true;
  for (const locale of locales) {
    if (pathname === `/${locale}`) return true;
  }
  return false;
}

export function hasSeenSplash(): boolean {
  try {
    return sessionStorage.getItem(SPLASH_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markSplashSeen(): void {
  try {
    sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function lockSplashGate(): void {
  document.documentElement.dataset.splashLock = "";
}

export function unlockSplashGate(): void {
  delete document.documentElement.dataset.splashLock;
}

export function lockPageScroll(): void {
  document.documentElement.classList.add("splash-scroll-locked");
}

export function unlockPageScroll(): void {
  document.documentElement.classList.remove("splash-scroll-locked");
}

export function setPageRevealWaiting(): void {
  document.documentElement.dataset.pageReveal = "waiting";
}

export function setPageRevealActive(): void {
  document.documentElement.dataset.pageReveal = "active";
}

export function clearPageReveal(): void {
  delete document.documentElement.dataset.pageReveal;
}
