"use client";

import { StaticImage } from "@/components/static-image";
import { localizeWebinars } from "@/data/webinars-i18n";
import { useLocaleData } from "@/hooks/use-locale-data";
import { useLocale } from "next-intl";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { DarkSectionAtmosphere } from "@/components/section-atmosphere";
import { SectionHeading } from "@/components/section-heading";
import { WebinarPlayButton } from "@/components/webinar-play-button";
import { WebinarTopicHeading } from "@/components/webinar-topic-heading";
import {
  WebinarVideoModal,
  type WebinarPlayerState,
} from "@/components/webinar-video-modal";
import { webinars, webinarsVisibleCount, type Webinar } from "@/data/webinars";

/** Mismo ancho de miniatura que las filas del listado (desktop). */
const WEBINAR_THUMB_CLASS =
  "w-full max-w-[min(100%,30rem)] shrink-0 sm:max-w-[28rem] md:max-w-[30rem] lg:w-[clamp(16.5rem,38vw,34rem)] lg:max-w-[34rem]";

function WebinarVisual({
  flyerSrc,
  topic,
  hasVideo,
  lazy,
  comingSoonLabel,
}: {
  flyerSrc: string;
  topic: string;
  hasVideo: boolean;
  lazy?: boolean;
  comingSoonLabel: string;
}) {
  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/10 transition-[box-shadow,ring-color] duration-200 group-hover:ring-white/20"
    >
      <StaticImage
        src={flyerSrc}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 28rem, 34rem"
        objectFit="contain"
        priority={!lazy}
      />
      {hasVideo ? (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/15 to-navy/10 transition-opacity duration-300 group-hover:via-navy/25"
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <WebinarPlayButton />
          </div>
        </>
      ) : null}
      {!hasVideo ? (
        <span
          className="absolute bottom-2 right-2 rounded px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wide text-white/90 bg-black/75"
        >
          {comingSoonLabel}
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
  placement = "list",
  onPlay,
}: {
  webinar: Webinar;
  index: number;
  lazyImage?: boolean;
  placement?: "list" | "header";
  onPlay: (webinar: Webinar) => void;
}) {
  const { webinarsCopy } = useLocaleData();
  const hasVideo = Boolean(webinar.youtubeUrl);
  const isHeader = placement === "header";
  const flip = !isHeader && index % 2 === 1;

  const thumbClassName =
    "block w-full cursor-pointer rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400";

  return (
    <article
      className={
        isHeader
          ? "group flex flex-col gap-4 sm:gap-5"
          : `group flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start lg:gap-8 xl:gap-12 ${
              flip ? "lg:flex-row-reverse" : ""
            }`
      }
    >
      <div
        className={`${WEBINAR_THUMB_CLASS} ${!isHeader && flip ? "lg:ms-auto" : ""} ${
          isHeader ? "max-w-full" : ""
        }`}
      >
        {hasVideo ? (
          <button
            type="button"
            onClick={() => onPlay(webinar)}
            className={thumbClassName}
            aria-label={webinarsCopy.watchCtaAria(webinar.topic)}
          >
            <WebinarVisual
              flyerSrc={webinar.flyerSrc}
              topic={webinar.topic}
              hasVideo={hasVideo}
              lazy={lazyImage}
              comingSoonLabel={webinarsCopy.comingSoon}
            />
          </button>
        ) : (
          <a
            href={webinar.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={thumbClassName}
          >
            <WebinarVisual
              flyerSrc={webinar.flyerSrc}
              topic={webinar.topic}
              hasVideo={hasVideo}
              lazy={lazyImage}
              comingSoonLabel={webinarsCopy.comingSoon}
            />
          </a>
        )}
      </div>

      <div
        className={
          isHeader
            ? "min-w-0 flex-1 md:pt-1 lg:max-w-none xl:max-w-none"
            : "min-w-0 flex-1 lg:max-w-[28rem] lg:pt-1 xl:max-w-[32rem]"
        }
      >
        <p className="text-[0.68rem] font-medium tracking-[0.28em] text-cyan-300/75 uppercase">
          {webinar.dateLabel}
        </p>
        <WebinarTopicHeading
          topic={webinar.topic}
          className="mt-2 line-clamp-4 lg:mt-3"
        />
        <p className="mt-2 text-sm text-white/45 sm:mt-3 sm:text-base">{webinar.speaker}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mt-6">
          {hasVideo ? (
            <>
              <button
                type="button"
                onClick={() => onPlay(webinar)}
                className="inline-flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.22em] text-white uppercase transition-colors duration-200 hover:text-cyan-300"
              >
                <span className="h-px w-8 bg-cyan-400/80" aria-hidden="true" />
                {webinarsCopy.watchCta}
              </button>
              <a
                href={webinar.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.68rem] tracking-[0.18em] text-white/35 uppercase underline-offset-[6px] transition-colors duration-200 hover:text-white/70 hover:underline"
              >
                {webinarsCopy.openOnYoutube}
              </a>
            </>
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

function WebinarsDesktopHeader({
  latestWebinar,
  onPlay,
}: {
  latestWebinar: Webinar | undefined;
  onPlay: (webinar: Webinar) => void;
}) {
  const { webinarsCopy } = useLocaleData();

  return (
    <div
      className="hidden md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-start md:gap-x-8 lg:gap-x-12"
    >
      <div className="min-w-0">
        <p className="text-[0.72rem] font-semibold tracking-[0.38em] text-cyan-300/80 uppercase">
          {webinarsCopy.kicker}
        </p>

        <h2 className="mt-5 leading-[0.95] sm:mt-6">
          {webinarsCopy.titleScript ? (
            <span
              className="font-script block text-[clamp(2.85rem,11vw,6.5rem)] leading-none text-cyan-400"
            >
              {webinarsCopy.titleScript}
            </span>
          ) : null}
          <span
            className="font-display -mt-0.5 block text-[clamp(2.35rem,8.5vw,5.5rem)] uppercase tracking-[0.02em] text-white"
          >
            {webinarsCopy.titleDisplay}
          </span>
        </h2>

        <p className="mt-8 max-w-lg text-lg font-light leading-relaxed text-white/55">
          {webinarsCopy.lead}
        </p>
      </div>

      {latestWebinar ? (
        <div className="min-w-0 pt-6 sm:pt-[1.625rem]">
          <div className="mx-auto w-full lg:max-w-[clamp(16.5rem,38vw,34rem)]">
            <WebinarRow
              webinar={latestWebinar}
              index={0}
              placement="header"
              onPlay={onPlay}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function WebinarsSection() {
  const locale = useLocale();
  const { webinarsCopy } = useLocaleData();
  const [expanded, setExpanded] = useState(false);
  const [player, setPlayer] = useState<WebinarPlayerState | null>(null);

  const openPlayer = (webinar: Webinar) => {
    if (!webinar.youtubeUrl) return;
    setPlayer({
      youtubeUrl: webinar.youtubeUrl,
      topic: webinar.topic,
      speaker: webinar.speaker,
    });
  };
  const sectionRef = useRef<HTMLElement>(null);
  const scrollPinY = useRef<number | null>(null);
  const scrollToSectionTopRef = useRef(false);

  const localizedWebinars = useMemo(
    () => localizeWebinars(webinars, locale),
    [locale],
  );
  const latestWebinar = localizedWebinars[0];
  const featured = localizedWebinars.slice(0, webinarsVisibleCount);
  const rest = localizedWebinars.slice(webinarsVisibleCount);

  useLayoutEffect(() => {
    if (scrollToSectionTopRef.current) {
      scrollToSectionTopRef.current = false;
      scrollPinY.current = null;
      sectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }

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
    setExpanded((open) => {
      if (open) {
        scrollToSectionTopRef.current = true;
      } else {
        scrollPinY.current = window.scrollY;
      }
      return !open;
    });
  };

  return (
    <section
      ref={sectionRef}
      id="webinars"
      className="site-scroll-mt relative overflow-x-clip bg-navy text-white"
    >
      <DarkSectionAtmosphere />

      <div className="site-shell relative min-w-0 py-16 sm:py-24 md:py-32 lg:py-36">
        <Reveal className="md:hidden">
          <SectionHeading
            kicker={webinarsCopy.kicker}
            titleScript={webinarsCopy.titleScript}
            titleDisplay={webinarsCopy.titleDisplay}
            lead={webinarsCopy.lead}
            size="full"
          />
        </Reveal>
        <Reveal delay={50} offset={14}>
          <WebinarsDesktopHeader
            latestWebinar={latestWebinar}
            onPlay={openPlayer}
          />
        </Reveal>

        <div className="mt-12 sm:mt-16 md:mt-24">
          <Reveal offset={14}>
          <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-white/35 uppercase">
            {webinarsCopy.visibleIntro}
          </p>
          </Reveal>

          <div className="mt-10">
            <ul className="space-y-0 [overflow-anchor:none]">
              {featured.map((webinar, index) => (
                <li
                  key={webinar.id}
                  className={`border-t border-white/[0.08] py-10 md:py-14 ${
                    webinar.id === latestWebinar?.id ? "md:hidden" : ""
                  }`}
                >
                  <Reveal delay={Math.min(index, 5) * 40} offset={12}>
                    <WebinarRow
                      webinar={webinar}
                      index={index}
                      onPlay={openPlayer}
                    />
                  </Reveal>
                </li>
              ))}
              {expanded
                ? rest.map((webinar, index) => (
                    <li
                      key={webinar.id}
                      className="border-t border-white/[0.08] py-10 md:py-14"
                    >
                      <Reveal delay={Math.min(index, 8) * 38} offset={12}>
                      <WebinarRow
                        webinar={webinar}
                        index={webinarsVisibleCount + index}
                        lazyImage
                        onPlay={openPlayer}
                      />
                      </Reveal>
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
          <Reveal delay={100} offset={10}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-white/30">
              {webinarsCopy.sourceNote}
            </p>
          </Reveal>
        ) : null}
      </div>

      <WebinarVideoModal
        player={player}
        onClose={() => setPlayer(null)}
        closeLabel={webinarsCopy.closePlayer}
        openOnYoutubeLabel={webinarsCopy.openOnYoutube}
      />
    </section>
  );
}
