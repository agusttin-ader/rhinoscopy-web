"use client";

import { useLocaleData } from "@/hooks/use-locale-data";
import Image from "next/image";

const MEET_LOGO_DARK = "/images/LOGO-RHINOSCOPY-MEET-3-FONDO-OSCURO.png";

/** Presentación visual de Rhinoscopy Meet 2026 dentro de #congreso (no es el hero de marca). */
export function CongressMeetPresentation() {
  const { copy, meetPresentation } = useLocaleData();
  return (
    <div
      id="congreso"
      className="relative isolate flex min-h-[100dvh] min-h-[100svh] scroll-mt-[4.5rem] flex-col overflow-hidden bg-navy text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-slate/40 via-navy to-navy"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 top-16 h-[26rem] w-[26rem] rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-[22rem] w-[22rem] rounded-full bg-violet-500/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-16 sm:px-6 sm:py-20 lg:max-w-4xl lg:py-28">
        <div className="flex w-full flex-col items-center text-center">
          <p className="text-[0.72rem] font-semibold tracking-[0.34em] text-brand-sky/80 uppercase">
            {meetPresentation.congressPrefix} · {copy.heroAccent}
          </p>

          <div className="mt-5 flex w-full justify-center sm:mt-7">
            <div className="w-full max-w-[min(96vw,26rem)] sm:max-w-xl lg:max-w-3xl xl:max-w-4xl">
              <Image
                src={MEET_LOGO_DARK}
                alt="Rhinoscopy Meet 2026"
                width={1200}
                height={520}
                priority
                className="h-auto w-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>

          <p className="mt-6 max-w-xl text-base font-bold leading-snug tracking-[0.04em] text-white uppercase sm:mt-8 sm:text-lg lg:max-w-2xl lg:text-xl">
            {copy.heroTitle}
          </p>

          <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-6 border-y border-white/15 py-5 sm:max-w-md sm:gap-8 lg:mt-8">
            <div>
              <p className="text-[0.62rem] font-semibold tracking-[0.3em] text-brand-sky/75 uppercase">
                {meetPresentation.whenLabel}
              </p>
              <p className="mt-2 text-lg font-extrabold tracking-[0.06em] text-white uppercase sm:text-2xl">
                {meetPresentation.whenValue}
              </p>
            </div>
            <div>
              <p className="text-[0.62rem] font-semibold tracking-[0.3em] text-brand-sky/75 uppercase">
                {meetPresentation.whereLabel}
              </p>
              <p className="mt-2 text-lg font-extrabold tracking-[0.06em] text-white uppercase sm:text-2xl">
                {meetPresentation.whereValue}
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-md text-sm font-medium leading-relaxed text-slate-300 sm:max-w-lg">
            {copy.heroMeetSubtitle}
            <span className="mx-2 text-white/20" aria-hidden="true">
              /
            </span>
            {copy.heroMeetVenue}
          </p>

          <div className="mt-7 flex w-full max-w-sm flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[0.7rem] font-bold tracking-[0.18em] text-navy uppercase transition hover:bg-cyan-50"
            >
              {copy.heroCta}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#programa"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-[0.7rem] font-bold tracking-[0.18em] text-white uppercase transition hover:border-white/40 hover:bg-white/5"
            >
              {meetPresentation.activitiesCta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
