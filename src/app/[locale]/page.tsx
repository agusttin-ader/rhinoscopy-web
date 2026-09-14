import { HomeHashScroll } from "@/components/home-hash-scroll";
import { CertificateTeaser } from "@/components/certificate-teaser";
import { CongressSection } from "@/components/congress-section";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WebinarsSection } from "@/components/webinars-section";
import { getLocaleData } from "@/data/locales";
import { createLocalizedMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

type Props = PageProps<"/[locale]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = getLocaleData(locale);
  return createLocalizedMetadata({
    locale,
    path: "/",
    title: meta.home.title,
    description: meta.home.description,
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader variant="bar" />
      <main className="flex-1">
        <HomeHashScroll />
        <Hero />
        <CongressSection />
        <WebinarsSection />
        <CertificateTeaser />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
