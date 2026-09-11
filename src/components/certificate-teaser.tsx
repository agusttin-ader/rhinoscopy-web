import Image from "next/image";
import { copy } from "@/data/copy";
import { DarkSectionAtmosphere } from "@/components/section-atmosphere";
import { GradientCtaLink } from "@/components/gradient-cta-link";
import { SectionHeading } from "@/components/section-heading";

const CONSTANCIAS_HREF = "/constancias";
const MEET_ART = "/images/heromeet-art.png";

function Meet2026Mark() {
  return (
    <div className="text-left leading-[0.92]">
      <p className="text-[0.52rem] font-bold tracking-[0.38em] text-white/85 uppercase sm:text-[0.62rem] sm:tracking-[0.44em]">
        Rhinoscopy
      </p>
      <p className="mt-1.5 text-[clamp(2.1rem,9vw,3.75rem)] font-extrabold tracking-[0.02em] text-white uppercase sm:mt-2.5">
        Meet
      </p>
      <p className="font-script -mt-1 text-[clamp(2.5rem,10vw,4.5rem)] leading-none text-cyan-400 sm:-mt-1.5">
        2026
      </p>
    </div>
  );
}

function CertificateVisual() {
  return (
    <div
      className="pointer-events-none relative mx-auto w-full max-w-[19rem] select-none sm:max-w-[23rem] lg:mx-0 lg:ml-auto lg:max-w-[25rem] xl:max-w-[27rem]"
      aria-hidden="true"
    >
      <div className="relative aspect-[5/4] w-full max-w-full">
        <div
          className="absolute bottom-0 left-0 z-10 w-[62%] max-w-[12rem] sm:max-w-[15rem] lg:w-[58%] lg:max-w-[16rem]"
        >
          <Image
            src={MEET_ART}
            alt=""
            width={525}
            height={569}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 16rem"
            className="h-auto w-full max-w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
          />
        </div>

        <div className="absolute right-0 top-[8%] z-20 sm:top-[12%] lg:top-[10%]">
          <Meet2026Mark />
        </div>

        <div
          className="absolute bottom-[17%] left-[48%] z-0 h-px w-[42%] bg-gradient-to-r from-cyan-400/25 via-white/10 to-transparent sm:bottom-[18%]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function CertificateTeaser() {
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
                href={CONSTANCIAS_HREF}
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
