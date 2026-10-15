import { CertificateTeaser } from "@/components/certificate-teaser";
import { CongressSection } from "@/components/congress-section";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocaleData } from "@/data/locales";
import {
  breadcrumbJsonLd,
  mergeJsonLdGraphs,
  rhinoscopyMeetEventJsonLd,
  webPageJsonLd,
} from "@/lib/seo-json-ld";
import { createLocalizedMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

type Props = PageProps<"/[locale]/congreso">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = getLocaleData(locale);
  return createLocalizedMetadata({
    locale,
    path: "/congreso",
    title: meta.congreso.title,
    description: meta.congreso.description,
    keywords: meta.congreso.keywords,
  });
}

export default async function CongresoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { meta } = getLocaleData(locale);
  const appLocale = locale as AppLocale;
  const jsonLd = mergeJsonLdGraphs(
    webPageJsonLd({
      locale: appLocale,
      path: "/congreso",
      title: meta.congreso.title,
      description: meta.congreso.description,
    }),
    breadcrumbJsonLd(appLocale, [
      { name: meta.home.title, path: "/" },
      { name: meta.congreso.title, path: "/congreso" },
    ]),
    rhinoscopyMeetEventJsonLd(appLocale),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader variant="bar" />
      <main className="flex-1">
        <CongressSection />
        <CertificateTeaser />
      </main>
      <SiteFooter />
    </>
  );
}
