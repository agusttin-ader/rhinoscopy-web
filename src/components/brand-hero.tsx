import { getLocaleData } from "@/data/locales";
import { getLocale } from "next-intl/server";
import Image from "next/image";

const BRAND_LOGO = "/images/rhinoscopy-logo-hero-sombra.png";

export async function BrandHero() {
  const locale = await getLocale();
  const { brandHeroCopy } = getLocaleData(locale);
  return (
    <section
      id="inicio"
      className="brand-hero relative isolate flex flex-col overflow-hidden bg-navy text-white"
      aria-labelledby="brand-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy via-brand-slate to-navy"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(95, 198, 238, 0.22) 0%, transparent 58%), conic-gradient(from 210deg at 72% 18%, rgba(95, 198, 238, 0.12), transparent 25%, rgba(78, 80, 132, 0.35) 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="brand-hero-inner site-shell relative min-w-0 flex-1">
        <div className="brand-hero-columns">
        <div className="brand-hero-visual flex min-w-0 justify-center">
          <div className="brand-hero-logo-frame relative">
            <svg
              className="brand-hero-ring pointer-events-none absolute inset-0 h-full w-full text-brand-sky/55"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="brand-hero-ring-stroke"
                cx="100"
                cy="100"
                r="92"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>

            <span
              className="brand-hero-dot brand-hero-dot-1 absolute top-[1%] right-[14%] h-2 w-2 rounded-full bg-brand-sky"
              aria-hidden="true"
            />
            <span
              className="brand-hero-dot brand-hero-dot-2 absolute bottom-[8%] left-[2%] h-1.5 w-1.5 rounded-full bg-white/90"
              aria-hidden="true"
            />
            <span
              className="brand-hero-dot brand-hero-dot-3 absolute top-[24%] right-[1%] h-1.5 w-1.5 rounded-full bg-brand-sky/80"
              aria-hidden="true"
            />

            <div className="absolute inset-[4.5%] flex items-center justify-center">
              <Image
                src={BRAND_LOGO}
                alt="Isotipo Rhinoscopy"
                width={480}
                height={480}
                priority
                className="h-full w-full object-contain drop-shadow-[0_0_2px_rgba(255,255,255,0.4),0_0_1px_rgba(95,198,238,0.55),0_0_32px_rgba(95,198,238,0.2),0_6px_28px_rgba(0,0,0,0.38)]"
              />
            </div>
          </div>
        </div>

        <div className="brand-hero-copy flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-[0.7rem] font-semibold tracking-[0.32em] text-brand-sky/85 uppercase">
            {brandHeroCopy.kicker}
          </p>

          <h1 id="brand-hero-heading" className="mt-4 w-full max-w-xl lg:max-w-2xl xl:max-w-[34rem]">
            <span className="block text-[0.78rem] font-bold tracking-[0.42em] text-white/90 uppercase sm:text-[0.82rem] lg:text-[0.85rem]">
              Rhinoscopy
            </span>
            <span className="font-display mt-3 block text-[clamp(1.85rem,5.5vw,2.75rem)] leading-[1.05] tracking-tight text-white lg:text-[clamp(2rem,2.35vw,3rem)]">
              {brandHeroCopy.headlineImpact}
            </span>
            <span className="mt-4 block text-[clamp(1rem,2.8vw,1.2rem)] font-medium leading-snug text-brand-sky/95 lg:text-[clamp(1.05rem,1.35vw,1.35rem)]">
              {brandHeroCopy.tagline}
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70 sm:max-w-xl sm:text-base md:max-w-2xl lg:max-w-xl lg:text-[1.05rem] xl:max-w-2xl">
            {brandHeroCopy.lead}
          </p>

          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-lg sm:flex-row sm:justify-center lg:max-w-md lg:justify-start">
            <a
              href="#congreso"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[0.7rem] font-bold tracking-[0.18em] text-navy uppercase transition hover:bg-cyan-50"
            >
              {brandHeroCopy.ctaCongress}
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href="#webinars"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-[0.7rem] font-bold tracking-[0.18em] text-white uppercase backdrop-blur-sm transition hover:border-brand-sky/50 hover:bg-white/10"
            >
              {brandHeroCopy.ctaWebinars}
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
