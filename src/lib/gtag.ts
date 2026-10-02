/** Google Analytics 4 — ID público (ej. G-XXXXXXXXXX). */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

export function isGoogleAnalyticsEnabled() {
  return GA_MEASUREMENT_ID.length > 0;
}

type GtagCommand = "config" | "event" | "js" | "set";

declare global {
  interface Window {
    gtag?: (
      command: GtagCommand,
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

export function pageview(url: string) {
  if (!isGoogleAnalyticsEnabled() || typeof window.gtag !== "function") return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    anonymize_ip: true,
  });
}
