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
      className="relative isolate flex min-h-[calc(100dvh-4.25rem)] min-h-[calc(100svh-4.25rem)] scroll-mt-[4.5rem] flex-col overflow-hidden bg-navy text-white sm:min-h-[min(100dvh,920px)] sm:min-h-[min(100svh,920px)] md:min-h-[100dvh] md:min-h-[100svh]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-navy"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy from-35% via-[#221f4a] to-[#1a1838]"
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

      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-end px-4 pb-8 pt-20 sm:px-6 sm:pb-12 sm:pt-28 lg:max-w-4xl lg:pb-14 lg:pt-32">
        <div className="flex w-full flex-col items-center text-center">
          <p className="text-[0.72rem] font-semibold tracking-[0.34em] text-brand-sky/80 uppercase">
            {meetPresentation.congressPrefix} · {copy.heroAccent}
          </p>

          <div className="mt-4 flex w-full justify-center sm:mt-7">
            <div className="w-full max-w-[min(92vw,22rem)] sm:max-w-xl lg:max-w-3xl xl:max-w-4xl">
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

          <p className="mt-4 max-w-xl text-[0.8125rem] font-bold leading-snug tracking-[0.04em] text-white uppercase sm:mt-8 sm:text-lg lg:max-w-2xl lg:text-xl">
            {copy.heroTitle}
          </p>

          <div className="mt-5 grid w-full max-w-sm grid-cols-2 gap-4 border-y border-white/15 py-4 sm:max-w-md sm:gap-8 sm:py-5 lg:mt-8">
            <div>
              <p className="text-[0.58rem] font-semibold tracking-[0.26em] text-brand-sky/75 uppercase sm:text-[0.62rem] sm:tracking-[0.3em]">
                {meetPresentation.whenLabel}
              </p>
              <p className="mt-1.5 text-base font-extrabold tracking-[0.05em] text-white uppercase sm:mt-2 sm:text-2xl sm:tracking-[0.06em]">
                {meetPresentation.whenValue}
              </p>
            </div>
            <div>
              <p className="text-[0.58rem] font-semibold tracking-[0.26em] text-brand-sky/75 uppercase sm:text-[0.62rem] sm:tracking-[0.3em]">
                {meetPresentation.whereLabel}
              </p>
              <p className="mt-1.5 text-base font-extrabold tracking-[0.05em] text-white uppercase sm:mt-2 sm:text-2xl sm:tracking-[0.06em]">
                {meetPresentation.whereValue}
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-md text-center text-xs font-medium leading-relaxed text-slate-300 sm:max-w-lg sm:text-sm">
            <span className="block sm:inline">{copy.heroMeetSubtitle}</span>
            <span className="mx-2 hidden text-white/20 sm:inline" aria-hidden="true">
              /
            </span>
            <span className="mt-1 block text-[0.7rem] text-slate-400 sm:mt-0 sm:inline sm:text-sm sm:text-slate-300">
              {copy.heroMeetVenue}
            </span>
          </p>

          <div className="mt-6 flex w-full max-w-sm flex-col items-stretch gap-2.5 sm:mt-7 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            <a
              href="#contacto"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[0.65rem] font-bold tracking-[0.16em] text-navy uppercase transition hover:bg-cyan-50 sm:w-auto sm:px-7 sm:py-3.5 sm:text-[0.7rem] sm:tracking-[0.18em]"
            >
              {copy.heroCta}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#programa"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-[0.65rem] font-bold tracking-[0.16em] text-white uppercase transition hover:border-white/40 hover:bg-white/5 sm:w-auto sm:px-7 sm:py-3.5 sm:text-[0.7rem] sm:tracking-[0.18em]"
            >
              {meetPresentation.activitiesCta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
