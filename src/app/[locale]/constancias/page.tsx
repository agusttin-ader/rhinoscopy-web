import { ConstanciasExperience } from "@/components/constancias-experience";
import { DarkSectionAtmosphere } from "@/components/section-atmosphere";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocaleData } from "@/data/locales";
import { Link } from "@/i18n/navigation";
import { createLocalizedMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

type Props = PageProps<"/[locale]/constancias">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = getLocaleData(locale);
  return createLocalizedMetadata({
    locale,
    path: "/constancias",
    title: meta.constancias.title,
    description: meta.constancias.description,
  });
}

export default async function ConstanciasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { constanciasCopy } = getLocaleData(locale);

  return (
    <>
      <SiteHeader variant="bar" />
      <main
        className="relative isolate flex flex-1 flex-col overflow-hidden bg-navy text-white"
      >
        <DarkSectionAtmosphere />

        <div className="relative mx-auto w-full max-w-6xl flex-1 px-5 pb-20 pt-10 sm:px-6 md:pb-24 md:pt-14">
          <Link
            href="/"
            className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase transition-colors hover:text-cyan-300"
          >
            {constanciasCopy.backToHome}
          </Link>

          <ConstanciasExperience />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
