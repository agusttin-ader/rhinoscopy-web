"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DarkSectionAtmosphere } from "@/components/section-atmosphere";
import { SectionHeading } from "@/components/section-heading";
import {
  webinars,
  webinarsCopy,
  webinarsVisibleCount,
} from "@/data/webinars";

function PlayMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.75" />
      <path d="M10 8.2v7.6l6.2-3.8L10 8.2z" fill="currentColor" />
    </svg>
  );
}

function WebinarVisual({
  flyerSrc,
  topic,
  hasVideo,
  lazy,
}: {
  flyerSrc: string;
  topic: string;
  hasVideo: boolean;
  lazy?: boolean;
}) {
  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/10 transition-[box-shadow,ring-color] duration-200 group-hover:ring-white/20"
    >
      <Image
        src={flyerSrc}
        alt=""
        fill
        loading={lazy ? "lazy" : undefined}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 28rem, 34rem"
        className="!object-contain object-center"
        style={{ objectFit: "contain" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white/90 sm:h-14 sm:w-14"
        >
          <PlayMark />
        </span>
      </div>
      {!hasVideo ? (
        <span
          className="absolute bottom-2 right-2 rounded px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wide text-white/90 bg-black/75"
        >
          Próximamente
        </span>
      ) : null}
      <p className="sr-only">{topic}</p>
    </div>
  );
}

function WebinarRow({
  webinar,
  index,
  lazyImage,
}: {
  webinar: (typeof webinars)[number];
  index: number;
  lazyImage?: boolean;
}) {
  const hasVideo = Boolean(webinar.youtubeUrl);
  const flip = index % 2 === 1;
  const thumbHref = hasVideo ? webinar.youtubeUrl : webinar.instagramUrl;

  return (
    <article
      className={`group flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start lg:gap-8 xl:gap-12 ${
        flip ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div
        className={`w-full max-w-[min(100%,30rem)] shrink-0 sm:max-w-[28rem] md:max-w-[30rem] lg:w-[clamp(16.5rem,38vw,34rem)] lg:max-w-[34rem] ${
          flip ? "lg:ms-auto" : ""
        }`}
      >
        <a
          href={thumbHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          <WebinarVisual
            flyerSrc={webinar.flyerSrc}
            topic={webinar.topic}
            hasVideo={hasVideo}
            lazy={lazyImage}
          />
        </a>
      </div>

      <div className="min-w-0 flex-1 lg:max-w-[28rem] lg:pt-1 xl:max-w-[32rem]">
        <p className="text-[0.68rem] font-medium tracking-[0.28em] text-cyan-300/75 uppercase">
          {webinar.dateLabel}
        </p>
        <h3 className="font-display mt-2 text-lg leading-snug text-white line-clamp-3 sm:text-xl lg:mt-3 lg:text-2xl lg:leading-snug">
          {webinar.topic}
        </h3>
        <p className="mt-2 text-sm text-white/45 sm:mt-3 sm:text-base">{webinar.speaker}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mt-6">
          {hasVideo ? (
            <a
              href={webinar.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.22em] text-white uppercase transition-colors duration-200 hover:text-cyan-300"
            >
              <span className="h-px w-8 bg-cyan-400/80" aria-hidden="true" />
              {webinarsCopy.watchCta}
            </a>
          ) : (
            <p className="text-sm font-light italic text-white/40">
              {webinarsCopy.comingSoon}
            </p>
          )}
          <a
            href={webinar.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.68rem] tracking-[0.18em] text-white/35 uppercase underline-offset-[6px] transition-colors duration-200 hover:text-white/70 hover:underline"
          >
            {webinarsCopy.instagramCta}
          </a>
        </div>
      </div>
    </article>
  );
}

export function WebinarsSection() {
  const [expanded, setExpanded] = useState(false);
  const scrollPinY = useRef<number | null>(null);
  const featured = webinars.slice(0, webinarsVisibleCount);
  const rest = webinars.slice(webinarsVisibleCount);

  useLayoutEffect(() => {
    if (scrollPinY.current === null) return;

    const y = scrollPinY.current;
    const restore = () => window.scrollTo({ top: y, left: 0, behavior: "auto" });

    restore();
    requestAnimationFrame(() => {
      restore();
      requestAnimationFrame(restore);
    });
  }, [expanded]);

  useEffect(() => {
    if (scrollPinY.current === null) return;

    const y = scrollPinY.current;
    const restore = () => window.scrollTo({ top: y, left: 0, behavior: "auto" });
    const interval = window.setInterval(restore, 32);
    const stop = window.setTimeout(() => {
      window.clearInterval(interval);
      scrollPinY.current = null;
    }, 500);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stop);
    };
  }, [expanded]);

  const toggleWebinars = () => {
    scrollPinY.current = window.scrollY;
    setExpanded((open) => !open);
  };

  return (
    <section
      id="webinars"
      className="relative scroll-mt-24 overflow-hidden bg-navy text-white"
    >
      <DarkSectionAtmosphere />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 md:py-36">
        <SectionHeading
          kicker={webinarsCopy.kicker}
          titleScript={webinarsCopy.titleScript}
          titleDisplay={webinarsCopy.titleDisplay}
          lead={webinarsCopy.lead}
          size="full"
        />

        <div className="mt-16 md:mt-24">
          <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-white/35 uppercase">
            {webinarsCopy.visibleIntro}
          </p>

          <div className="mt-10">
            <ul className="space-y-0 [overflow-anchor:none]">
              {featured.map((webinar, index) => (
                <li
                  key={webinar.id}
                  className="border-t border-white/[0.08] py-10 md:py-14"
                >
                  <WebinarRow webinar={webinar} index={index} />
                </li>
              ))}
              {expanded
                ? rest.map((webinar, index) => (
                    <li
                      key={webinar.id}
                      className="border-t border-white/[0.08] py-10 md:py-14"
                    >
                      <WebinarRow
                        webinar={webinar}
                        index={webinarsVisibleCount + index}
                        lazyImage
                      />
                    </li>
                  ))
                : null}
            </ul>

            {rest.length > 0 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  toggleWebinars();
                }}
                aria-expanded={expanded}
                className="mt-6 flex w-full items-center justify-center gap-3 py-2 text-sm font-semibold text-white/90 transition-colors duration-200 hover:text-cyan-300 [overflow-anchor:auto]"
              >
                <span>
                  {expanded
                    ? webinarsCopy.showLess
                    : webinarsCopy.moreWebinars(rest.length)}
                </span>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-lg text-white/50 transition-[transform,background-color] duration-200 hover:bg-white/10 ${
                    expanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  ↓
                </span>
              </button>
            ) : null}
          </div>
        </div>

        {webinarsCopy.sourceNote ? (
          <p className="mt-10 max-w-2xl text-center text-xs leading-relaxed text-white/30 mx-auto">
            {webinarsCopy.sourceNote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
