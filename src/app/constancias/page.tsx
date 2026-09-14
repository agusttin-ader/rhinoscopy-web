import { CertificateSearch } from "@/components/certificate-search";
import { CertificateVisual } from "@/components/certificate-visual";
import { DarkSectionAtmosphere } from "@/components/section-atmosphere";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { constanciasCopy } from "@/data/constancias-copy";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Constancias | Rhinoscopy",
  description:
    "Buscá y descargá tu certificado de asistencia con tu número de matrícula.",
};

export default function ConstanciasPage() {
  return (
    <>
      <SiteHeader variant="bar" />
      <main
        className="relative isolate flex min-h-[calc(100dvh-4.5rem)] flex-1 flex-col overflow-hidden bg-navy text-white"
      >
        <DarkSectionAtmosphere />

        <div className="relative mx-auto w-full max-w-6xl flex-1 px-5 pb-24 pt-12 sm:px-6 md:pb-28 md:pt-16">
          <Link
            href="/"
            className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase transition-colors duration-200 hover:text-cyan-300"
          >
            {constanciasCopy.backToHome}
          </Link>

          <div
            className="mt-8 grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-10 xl:gap-14"
          >
            <div className="min-w-0 lg:max-w-[24rem] xl:max-w-[26rem]">
              <SectionHeading
                as="h1"
                align="left"
                kicker={constanciasCopy.kicker}
                titleScript={constanciasCopy.titleScript}
                titleDisplay={constanciasCopy.titleDisplay}
                lead={constanciasCopy.lead}
                size="narrow"
                titleGap="relaxed"
              />

              <div className="mt-6 flex justify-center lg:hidden">
                <CertificateVisual size="page" />
              </div>

              <div className="mt-6 lg:mt-7">
                <CertificateSearch compact />
              </div>

              <p className="mt-6 max-w-md text-xs leading-relaxed text-white/45">
                {constanciasCopy.footnote}{" "}
                <Link
                  href="/#contacto"
                  className="font-semibold text-cyan-300/90 underline-offset-4 transition-colors hover:text-cyan-200 hover:underline"
                >
                  {constanciasCopy.contactCta}
                </Link>
                .
              </p>
            </div>

            <div className="hidden w-full min-w-0 lg:flex lg:items-center lg:justify-end lg:self-stretch lg:pl-4">
              <CertificateVisual size="page" />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
