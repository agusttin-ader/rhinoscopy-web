import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site-url";
import { localePath } from "@/lib/seo-paths";
import type { MetadataRoute } from "next";

const PUBLIC_PATHS = ["", "/congreso", "/constancias"] as const;

const PRIORITY: Record<(typeof PUBLIC_PATHS)[number], number> = {
  "": 1,
  "/congreso": 0.9,
  "/constancias": 0.75,
};

/** Último cambio real de contenido, no la fecha de cada build. */
const LAST_MODIFIED: Record<(typeof PUBLIC_PATHS)[number], Date> = {
  "": new Date("2026-10-23"),
  "/congreso": new Date("2026-10-15"),
  "/constancias": new Date("2026-09-19"),
};

function alternatesForPath(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(localePath(locale, path));
  }
  languages["x-default"] = absoluteUrl(
    localePath(routing.defaultLocale, path),
  );
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified: LAST_MODIFIED[path],
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: PRIORITY[path],
      alternates: {
        languages: alternatesForPath(path),
      },
    })),
  );
}
