"use client";

import { Reveal } from "@/components/motion/reveal";
import { sponsorLogoList } from "@/data/congress";
import { useLocaleData } from "@/hooks/use-locale-data";
import Image from "next/image";

export function SponsorLogos() {
  const { congressCopy } = useLocaleData();

  return (
    <div className="border-t border-navy/8 bg-white py-12 sm:py-14">
      <div className="site-shell min-w-0">
        <p className="text-center text-[0.68rem] font-semibold tracking-[0.28em] text-slate-400 uppercase">
          {congressCopy.sponsors.kicker}
        </p>

        <ul
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-10 min-[375px]:gap-x-8 sm:mt-10 sm:gap-x-14 sm:gap-y-12 md:gap-x-16 lg:gap-x-20"
          aria-label="Sponsors del encuentro"
        >
          {sponsorLogoList.map((sponsor, index) => {
            const isProvisional = "provisional" in sponsor && sponsor.provisional;
            return (
              <Reveal
                as="li"
                key={sponsor.alt}
                delay={Math.min(index * 55, 440)}
                offset={10}
                className="motion-reveal--sponsor flex items-center justify-center p-1.5 sm:p-2"
              >
                <span className="sponsor-logo-hit rounded-md outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2">
                  <Image
                    src={sponsor.src}
                    alt={sponsor.alt}
                    width={180}
                    height={72}
                    unoptimized
                    className={`sponsor-logo-img h-12 w-auto max-w-[9.5rem] object-contain sm:h-14 sm:max-w-[11rem] md:h-16 md:max-w-[12.5rem] ${
                      isProvisional
                        ? "opacity-90 lg:opacity-45 lg:grayscale lg:hover:opacity-100 lg:hover:grayscale-0"
                        : "opacity-100 lg:opacity-60 lg:grayscale lg:hover:opacity-100 lg:hover:grayscale-0"
                    }`}
                    loading="lazy"
                  />
                </span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
