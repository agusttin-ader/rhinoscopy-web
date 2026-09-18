import { routing, type AppLocale } from "@/i18n/routing";
import {
  absoluteUrl,
  getSiteUrl,
  shouldAllowSearchIndexing,
} from "@/lib/site-url";
import { localePath } from "@/lib/seo-paths";
import type { Metadata } from "next";

type LocalizedMetadataInput = {
  locale: string;
  /** Ruta sin locale, ej. `` o `/constancias` */
  path: string;
  title: string;
  description: string;
  /** Palabras clave opcionales por página (impacto menor en Google). */
  keywords?: string[];
};

export function hreflangAlternates(
  path: string,
  locale: string,
): Metadata["alternates"] {
  const normalizedPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = absoluteUrl(localePath(loc, normalizedPath));
  }
  languages["x-default"] = absoluteUrl(
    localePath(routing.defaultLocale, normalizedPath),
  );

  const current = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  return {
    canonical: absoluteUrl(localePath(current, normalizedPath)),
    languages,
  };
}

function searchRobots(): Metadata["robots"] {
  if (!shouldAllowSearchIndexing()) {
    return { index: false, follow: false, nocache: true };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

function siteVerification(): Metadata["verification"] | undefined {
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  if (!google) return undefined;
  return { google };
}

export function createLocalizedMetadata({
  locale,
  path,
  title,
  description,
  keywords,
}: LocalizedMetadataInput): Metadata {
  const normalizedPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  const pageUrl = absoluteUrl(localePath(locale as AppLocale, normalizedPath));

  const pageTitle =
    title.includes("|") || title.trim().toLowerCase() === "rhinoscopy"
      ? { absolute: title }
      : title;

  return {
    title: pageTitle,
    description,
    keywords,
    alternates: hreflangAlternates(normalizedPath, locale),
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      url: pageUrl,
      siteName: "Rhinoscopy",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: searchRobots(),
  };
}

export function rootMetadataBase(): Metadata {
  const verification = siteVerification();

  return {
    metadataBase: new URL(getSiteUrl()),
    applicationName: "Rhinoscopy",
    title: {
      default: "Rhinoscopy",
      template: "%s | Rhinoscopy",
    },
    description:
      "Rhinoscopy: otorrinolaringología, rinología y rinoscopia. Formación en endoscopía nasal, cirugía rinológica y ORL. Webinars y congreso Rhinoscopy Meet.",
    icons: {
      icon: [{ url: "/icon.png", type: "image/png", sizes: "48x48" }],
      apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    },
    formatDetection: {
      telephone: false,
    },
    ...(verification ? { verification } : {}),
  };
}

function ogLocale(locale: string): string {
  const map: Record<string, string> = {
    es: "es_AR",
    en: "en_US",
    pt: "pt_BR",
  };
  return map[locale] ?? "es_AR";
}

/** Imagen OG/Twitter vía `opengraph-image.tsx` (App Router). */
export function openGraphImageAlt(locale: string): string {
  const map: Record<string, string> = {
    es: "Otorrinolaringología, rinología y rinoscopia",
    en: "Otolaryngology, rhinology and rhinoscopy",
    pt: "Otorrinolaringologia, rinologia e rinoscopia",
  };
  return map[locale] ?? map.es;
}
