import { ConstanciasExperience } from "@/components/constancias-experience";
import { DarkSectionAtmosphere } from "@/components/section-atmosphere";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { constanciasCopy } from "@/data/constancias-copy";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certificados | Rhinoscopy",
  description:
    "Buscá y descargá tu certificado de asistencia del Rhinoscopy Meet 2026 por nombre o apellido.",
};

export default function ConstanciasPage() {
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
