"use client";

import { useLocaleData } from "@/hooks/use-locale-data";

const FAMILY_PHOTO = "/images/congreso/familia-rhinoscopy.webp";
const FAMILY_PHOTO_DISPLAY = "/images/congreso/familia-rhinoscopy-display.webp";

/** Momento comunidad — banda full-bleed tras el hero del Meet (#congreso). */
export function CongressFamilyBand() {
  const { congressCopy } = useLocaleData();
  const copy = congressCopy.family;

  return (
    <section
      className="congress-family-band relative scroll-mt-24 bg-navy"
      aria-labelledby="congress-family-heading"
    >
      <figure className="relative mx-auto w-full max-w-[100rem]">
        <div className="congress-family-photo-wrap relative w-full overflow-hidden">
          <picture className="congress-family-picture block w-full md:absolute md:inset-0 md:h-full md:w-full">
            <source media="(min-width: 1280px)" srcSet={FAMILY_PHOTO} />
            <img
              src={FAMILY_PHOTO_DISPLAY}
              alt={copy.imageAlt}
              width={1440}
              height={960}
              decoding="async"
              fetchPriority="high"
              className="congress-family-photo block h-auto w-full md:h-full md:object-cover"
            />
          </picture>

          <div
            className="congress-family-caption-scrim pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
            aria-hidden="true"
          />
        </div>

        <figcaption className="congress-family-caption absolute inset-x-0 bottom-0 z-[3] px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-9 md:px-12 md:pb-11 lg:px-16 lg:pb-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-2xl border-l-2 border-cyan-400/80 pl-3.5 sm:border-cyan-400/70 sm:pl-5">
              <p className="text-[0.62rem] font-semibold tracking-[0.32em] text-cyan-300/95 uppercase sm:text-[0.65rem] sm:tracking-[0.34em]">
                {copy.kicker}
              </p>
              <h2
                id="congress-family-heading"
                className="mt-1.5 text-white sm:mt-2"
              >
                <span className="font-script block text-[1.75rem] leading-none text-cyan-100/95 sm:inline sm:text-[2.35rem] md:text-[2.6rem]">
                  {copy.titleScript}
                </span>
                <span className="font-display mt-0.5 block text-[2rem] leading-none tracking-tight sm:ml-3 sm:mt-0 sm:inline sm:text-5xl md:text-[3.15rem]">
                  {copy.titleDisplay}
                </span>
              </h2>
            </div>
            <p className="max-w-md border-l border-white/10 pl-3.5 text-[0.8125rem] leading-relaxed text-white/88 sm:border-0 sm:pl-0 sm:text-sm md:pb-1 md:text-[0.9375rem]">
              {copy.lead}
            </p>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
