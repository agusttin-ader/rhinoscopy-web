import { CertificateVisual } from "@/components/certificate-visual";
import { DarkSectionAtmosphere } from "@/components/section-atmosphere";
import { GradientCtaLink } from "@/components/gradient-cta-link";
import { SectionHeading } from "@/components/section-heading";
import { getLocaleData } from "@/data/locales";
import { getLocale } from "next-intl/server";

export async function CertificateTeaser() {
  const locale = await getLocale();
  const { copy } = getLocaleData(locale);

  return (
    <section
      id="constancias"
      className="relative scroll-mt-24 overflow-hidden bg-navy text-white"
      aria-labelledby="constancias-teaser-title"
    >
      <DarkSectionAtmosphere />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28 md:py-32">
        <div
          className="grid min-w-0 grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14 xl:gap-16"
        >
          <div className="lg:col-start-1 lg:row-start-1">
            <div id="constancias-teaser-title" className="max-w-2xl">
              <SectionHeading
                kicker={copy.certKicker}
                titleScript={copy.certTitleScript}
                titleDisplay={copy.certTitleDisplay}
                lead={copy.certLead}
                size="compact"
              />
            </div>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex lg:items-center lg:justify-end">
            <CertificateVisual />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <div className="w-full sm:w-fit">
              <GradientCtaLink
                href="/constancias"
                className="flex w-full justify-center sm:inline-flex sm:w-auto"
              >
                {copy.certCta}
                <span aria-hidden="true">→</span>
              </GradientCtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
