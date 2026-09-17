import { routing, type AppLocale } from "@/i18n/routing";
import { meet2026, site } from "@/data/site";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import { localePath } from "@/lib/seo-paths";

export type JsonLdGraph = Record<string, unknown> | Record<string, unknown>[];

export function organizationJsonLdGraph(): JsonLdGraph {
  const base = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "EducationalOrganization"],
        "@id": `${base}/#organization`,
        name: site.name,
        url: base,
        logo: absoluteUrl("/images/rhinoscopy-logo-hero-sombra.png"),
        description:
          "Comunidad de educación médica en rinología y endoscopía nasal.",
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
        publisher: { "@id": `${base}/#organization` },
        inLanguage: ["es-AR", "en", "pt-BR"],
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
    description: site.tagline,
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
    image: absoluteUrl("/images/rhinoscopy-logo-hero-sombra.png"),
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
      const { "@context": _context, ...node } = graph;
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
