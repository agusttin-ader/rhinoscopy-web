"use client";

import { useLocaleData } from "@/hooks/use-locale-data";
import Image from "next/image";

const HERO_ART_IMAGE = "/images/heromeet-art.png";

/** Presentación visual de Rhinoscopy Meet 2026 dentro de #congreso (no es el hero de marca). */
export function CongressMeetPresentation() {
  const { copy, meetPresentation } = useLocaleData();
  return (
    <div className="relative isolate overflow-hidden bg-navy text-white">
      <div
        className="pointer-events-none absolute -left-32 top-16 h-[26rem] w-[26rem] rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-[22rem] w-[22rem] rounded-full bg-violet-500/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col px-5 py-12 sm:px-6 sm:py-14 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-center md:gap-8 md:py-16 lg:gap-12">
        <div className="order-2 flex flex-col md:order-1">
          <p className="text-[0.72rem] font-semibold tracking-[0.34em] text-brand-sky/80 uppercase">
            {meetPresentation.congressPrefix} · {copy.heroAccent}
          </p>

          <h2 className="mt-4 leading-[0.9] md:mt-5">
            <span className="block text-[0.78rem] font-bold tracking-[0.42em] text-white/90 uppercase sm:text-[0.82rem]">
              Rhinoscopy
            </span>
            <span className="mt-2 block text-[clamp(2.6rem,9vw,5.2rem)] font-extrabold tracking-[0.02em] text-white uppercase">
              Meet
            </span>
            <span className="font-script -mt-1 block text-[clamp(3rem,11vw,6.5rem)] leading-none text-brand-sky">
              2026
            </span>
          </h2>

          <p className="mt-5 max-w-lg text-base font-bold leading-snug tracking-[0.04em] text-white uppercase sm:text-lg md:mt-6 md:text-xl">
            {copy.heroTitle}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 border-y border-white/15 py-5 sm:gap-8 md:mt-8">
            <div>
              <p className="text-[0.62rem] font-semibold tracking-[0.3em] text-brand-sky/75 uppercase">
                {meetPresentation.whenLabel}
              </p>
              <p className="mt-2 text-xl font-extrabold tracking-[0.06em] text-white uppercase sm:text-2xl">
                {meetPresentation.whenValue}
              </p>
            </div>
            <div>
              <p className="text-[0.62rem] font-semibold tracking-[0.3em] text-brand-sky/75 uppercase">
                {meetPresentation.whereLabel}
              </p>
              <p className="mt-2 text-xl font-extrabold tracking-[0.06em] text-white uppercase sm:text-2xl">
                {meetPresentation.whereValue}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-300">
            {copy.heroMeetSubtitle}
            <span className="mx-2 text-white/20" aria-hidden="true">/</span>
            {copy.heroMeetVenue}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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

        <div className="order-1 mb-8 flex justify-center md:order-2 md:mb-0 md:justify-end">
          <div className="relative w-full max-w-[15.5rem] sm:max-w-xs md:max-w-md lg:max-w-lg">
            <Image
              src={HERO_ART_IMAGE}
              alt="Ilustración de perfil nasal con el Obelisco y la Ciudad de Buenos Aires"
              width={525}
              height={569}
              className="h-auto w-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
