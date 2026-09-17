import { routing, type AppLocale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site-url";
import { localePath } from "@/lib/seo-paths";
import type { MetadataRoute } from "next";

const PUBLIC_PATHS = ["", "/constancias"] as const;

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
  const lastModified = new Date();

  return PUBLIC_PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.75,
      alternates: {
        languages: alternatesForPath(path),
      },
    })),
  );
}
