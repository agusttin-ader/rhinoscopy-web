import { routing, type AppLocale } from "@/i18n/routing";

/** Ruta pública sin locale (`/`, `/constancias`). */
export function localePath(locale: AppLocale, path: string): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  const suffix = normalized === "/" ? "" : normalized;

  if (locale === routing.defaultLocale) {
    return suffix || "/";
  }
  return `/${locale}${suffix}`;
}
