import { defineRouting } from "next-intl/routing";

export const locales = ["es", "en", "pt"] as const;
export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "es",
  localePrefix: "as-needed",
});
