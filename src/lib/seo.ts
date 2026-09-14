import { routing, type AppLocale } from "@/i18n/routing";
import {
  absoluteUrl,
  getSiteUrl,
  shouldAllowSearchIndexing,
  SOMBRA_LOGO_PATH,
} from "@/lib/site-url";
import type { Metadata } from "next";

type LocalizedMetadataInput = {
  locale: string;
  /** Ruta sin locale, ej. `` o `/constancias` */
  path: string;
  title: string;
  description: string;
};

function localePath(locale: AppLocale, path: string): string {
  const suffix = path === "/" ? "" : path;
  if (locale === routing.defaultLocale) {
    return suffix || "/";
  }
  return `/${locale}${suffix}`;
}

export function hreflangAlternates(
  path: string,
  locale: string,
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = absoluteUrl(localePath(loc, path));
  }
  languages["x-default"] = absoluteUrl(
    localePath(routing.defaultLocale, path),
  );

  const current =
    routing.locales.includes(locale as AppLocale)
      ? (locale as AppLocale)
      : routing.defaultLocale;

  return {
    canonical: absoluteUrl(localePath(current, path)),
    languages,
  };
}

export function createLocalizedMetadata({
  locale,
  path,
  title,
  description,
}: LocalizedMetadataInput): Metadata {
  const normalizedPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  const pageUrl = absoluteUrl(localePath(locale as AppLocale, normalizedPath));
  const ogImage = absoluteUrl(SOMBRA_LOGO_PATH);

  const pageTitle =
    title.includes("|") || title.trim().toLowerCase() === "rhinoscopy"
      ? { absolute: title }
      : title;

  return {
    title: pageTitle,
    description,
    alternates: hreflangAlternates(normalizedPath, locale),
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      url: pageUrl,
      siteName: "Rhinoscopy",
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Rhinoscopy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: shouldAllowSearchIndexing()
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
  };
}

export function rootMetadataBase(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: "Rhinoscopy",
      template: "%s | Rhinoscopy",
    },
    icons: {
      icon: [{ url: SOMBRA_LOGO_PATH, type: "image/png" }],
      apple: SOMBRA_LOGO_PATH,
    },
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

export function organizationJsonLd() {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: "Rhinoscopy",
        url: base,
        logo: absoluteUrl(SOMBRA_LOGO_PATH),
        description:
          "Comunidad de educación médica en rinología y endoscopía nasal.",
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "Rhinoscopy",
        publisher: { "@id": `${base}/#organization` },
        inLanguage: ["es-AR", "en", "pt-BR"],
      },
    ],
  };
}
