import { JsonLd } from "@/components/json-ld";
import { routing, type AppLocale } from "@/i18n/routing";
import { organizationJsonLdGraph } from "@/lib/seo-json-ld";
import { getLocale } from "next-intl/server";

export async function SeoJsonLd() {
  const locale = await getLocale();
  const appLocale = (routing.locales as readonly string[]).includes(locale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  return <JsonLd data={organizationJsonLdGraph(appLocale)} />;
}
