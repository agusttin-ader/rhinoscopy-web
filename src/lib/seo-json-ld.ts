import type { AppLocale } from "@/i18n/routing";
import { meet2026, site } from "@/data/site";
import { SEO_KNOWS_ABOUT } from "@/data/seo-copy";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import { localePath } from "@/lib/seo-paths";

export type JsonLdGraph = Record<string, unknown> | Record<string, unknown>[];

export function organizationJsonLdGraph(
  locale: AppLocale = "es",
): JsonLdGraph {
  const base = getSiteUrl();
  const knowsAbout = SEO_KNOWS_ABOUT[locale] ?? SEO_KNOWS_ABOUT.es;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "EducationalOrganization", "MedicalOrganization"],
        "@id": `${base}/#organization`,
        name: site.name,
        url: base,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/logo-rhinoscopy-hd.png"),
          width: 1024,
          height: 1024,
        },
        description: site.brandDescription,
        alternateName: ["Rhinoscopy Meet"],
        knowsAbout,
        audience: {
          "@type": "MedicalAudience",
          audienceType: "Physician",
        },
        email: site.email,
        sameAs: [site.instagram],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: site.email,
            availableLanguage: ["Spanish", "English", "Portuguese"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: site.name,
        description: site.brandDescription,
        publisher: { "@id": `${base}/#organization` },
        inLanguage: ["es-AR", "en", "pt-BR"],
        about: knowsAbout.map((topic) => ({
          "@type": "Thing",
          name: topic,
        })),
      },
    ],
  };
}

export function webPageJsonLd(input: {
  locale: AppLocale;
  path: string;
  title: string;
  description: string;
}): JsonLdGraph {
  const base = getSiteUrl();
  const pageUrl = absoluteUrl(localePath(input.locale, input.path));
  const pageId = `${pageUrl}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageId,
        url: pageUrl,
        name: input.title,
        description: input.description,
        isPartOf: { "@id": `${base}/#website` },
        inLanguage: localeToSchemaLanguage(input.locale),
      },
    ],
  };
}

export function breadcrumbJsonLd(
  locale: AppLocale,
  items: { name: string; path: string }[],
): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.path)),
    })),
  };
}

export function rhinoscopyMeetEventJsonLd(locale: AppLocale): JsonLdGraph {
  const base = getSiteUrl();
  const eventUrl = absoluteUrl(localePath(locale, "/#congreso"));

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: meet2026.title,
    description: site.meetTagline,
    startDate: meet2026.startDate,
    endDate: meet2026.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: meet2026.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Buenos Aires",
        addressCountry: "AR",
      },
    },
    organizer: { "@id": `${base}/#organization` },
    url: eventUrl,
    image: absoluteUrl("/images/logo-rhinoscopy-hd.png"),
  };
}

export function mergeJsonLdGraphs(...graphs: JsonLdGraph[]): JsonLdGraph {
  const merged: Record<string, unknown>[] = [];

  for (const graph of graphs) {
    if (Array.isArray(graph)) {
      merged.push(...graph);
      continue;
    }
    const inner = graph["@graph"];
    if (Array.isArray(inner)) {
      merged.push(...(inner as Record<string, unknown>[]));
    } else {
      const node = { ...graph } as Record<string, unknown>;
      delete node["@context"];
      merged.push(node);
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": merged,
  };
}

function localeToSchemaLanguage(locale: AppLocale): string {
  const map: Record<AppLocale, string> = {
    es: "es-AR",
    en: "en",
    pt: "pt-BR",
  };
  return map[locale];
}
