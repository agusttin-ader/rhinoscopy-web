import { CertificateSearch } from "@/components/certificate-search";
import { DarkSectionAtmosphere } from "@/components/section-atmosphere";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { constanciasCopy } from "@/data/constancias-copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Constancias | Rhinoscopy",
  description:
    "Buscá y descargá tu certificado de asistencia con tu número de matrícula.",
};

export default function ConstanciasPage() {
  return (
    <>
      <SiteHeader variant="bar" />
      <main className="relative isolate flex-1 overflow-hidden bg-navy text-white">
        <DarkSectionAtmosphere />

        <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-16 md:pt-24">
          <SectionHeading
            as="h1"
            align="center"
            kicker={constanciasCopy.kicker}
            titleScript={constanciasCopy.titleScript}
            titleDisplay={constanciasCopy.titleDisplay}
            lead={constanciasCopy.lead}
            size="full"
          />

          <div className="mt-14 md:mt-16">
            <CertificateSearch />
          </div>

          <p className="mx-auto mt-16 max-w-lg text-center text-xs leading-relaxed text-white/35">
            {constanciasCopy.footnote}
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
