import { routing, type AppLocale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site-url";
import type { MetadataRoute } from "next";

const PUBLIC_PATHS = ["", "/constancias"] as const;

function pathForLocale(locale: AppLocale, path: string): string {
  if (locale === routing.defaultLocale) {
    return path || "/";
  }
  return path ? `/${locale}${path}` : `/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    PUBLIC_PATHS.map((path) => ({
      url: absoluteUrl(pathForLocale(locale, path)),
      lastModified,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.75,
    })),
  );
}
