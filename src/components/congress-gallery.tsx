"use client";

import { Reveal } from "@/components/motion/reveal";
import {
  CONGRESS_GALLERY_DAYS,
  CONGRESS_GALLERY_SELECTION_SIZE,
  type CongressGalleryDayId,
  congressGallerySrc,
} from "@/data/congress-gallery";
import { useLocaleData } from "@/hooks/use-locale-data";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

function formatGalleryDayDate(isoDate: string, locale: string): string {
  const tag = locale === "en" ? "en-US" : locale === "pt" ? "pt-BR" : "es-AR";
  return new Intl.DateTimeFormat(tag, {
    day: "numeric",
    month: "short",
  }).format(new Date(`${isoDate}T12:00:00`));
}

function gallerySelections(files: readonly string[], size: number): string[][] {
  const chunks: string[][] = [];
  for (let i = 0; i < files.length; i += size) {
    chunks.push([...files.slice(i, i + size)]);
  }
  return chunks;
}

/** Staggered 6-tile mosaic (cols 2–3), matching Alo Patagonia–style collage. */
const SIDE_TILE_LAYOUT: ReadonlyArray<{
  col: 2 | 3;
  rowStart: number;
  rowSpan: number;
}> = [
  { col: 2, rowStart: 1, rowSpan: 3 },
  { col: 2, rowStart: 4, rowSpan: 2 },
  { col: 2, rowStart: 6, rowSpan: 1 },
  { col: 3, rowStart: 1, rowSpan: 2 },
  { col: 3, rowStart: 3, rowSpan: 2 },
  { col: 3, rowStart: 5, rowSpan: 2 },
];

type TileProps = {
  file: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  onOpen: (file: string) => void;
};

function GalleryTile({
  file,
  alt,
  className = "",
  style,
  priority,
  onOpen,
}: TileProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(file)}
      style={style}
      className={`group relative min-h-0 min-w-0 overflow-hidden bg-paper transition-opacity hover:opacity-[0.92] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ${className}`}
    >
      <Image
        src={congressGallerySrc(file)}
        alt={alt}
        fill
        sizes="(max-width: 767px) 45vw, (max-width: 1920px) 24vw, 20vw"
        className="object-cover"
        loading={priority ? "eager" : "lazy"}
      />
    </button>
  );
}

function CarouselArrow({
  direction,
  onClick,
  ariaLabel,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="congress-gallery-arrow flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-500/35 text-2xl leading-none text-white/95 shadow-sm backdrop-blur-[2px] transition hover:bg-neutral-600/45 sm:h-12 sm:w-12"
      aria-label={ariaLabel}
    >
      {direction === "prev" ? "‹" : "›"}
    </button>
  );
}

type GalleryMobileSwipeProps = {
  slideIndex: number;
  files: string[];
  dayTotal: number;
  selectionStartIndex: number;
  photoAlt: string;
  swipeAria: string;
  onOpen: (file: string) => void;
};

function GalleryMobileSwipe({
  slideIndex,
  files,
  dayTotal,
  selectionStartIndex,
  photoAlt,
  swipeAria,
  onOpen,
}: GalleryMobileSwipeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [nudge, setNudge] = useState(() => files.length > 1);

  useLayoutEffect(() => {
    trackRef.current?.scrollTo({ left: 0, behavior: "instant" });
  }, []);

  const updateFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || files.length === 0) return;
    const width = track.clientWidth;
    if (width <= 0) return;
    const index = Math.min(
      files.length - 1,
      Math.max(0, Math.round(track.scrollLeft / width)),
    );
    setActiveIndex(index);
    if (track.scrollLeft > 8) setNudge(false);
  }, [files.length]);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={updateFromScroll}
        className="congress-gallery-mobile-track congress-gallery-slide"
        aria-roledescription="carousel"
        aria-label={swipeAria}
      >
        {files.map((file, index) => {
          const photoNumber = selectionStartIndex + index + 1;
          const isNudge = nudge && index === 0;
          return (
            <div
              key={`${slideIndex}-${file}`}
              className={`congress-gallery-mobile-slide relative aspect-[4/5] w-full shrink-0 snap-center ${
                isNudge ? "congress-gallery-mobile-nudge" : ""
              }`}
              aria-hidden={index !== activeIndex}
              onAnimationEnd={
                index === 0 ? () => setNudge(false) : undefined
              }
            >
              <button
                type="button"
                onClick={() => onOpen(file)}
                className="relative block h-full w-full overflow-hidden bg-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                <Image
                  src={congressGallerySrc(file)}
                  alt={`${photoAlt} (${photoNumber}/${dayTotal})`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </button>
            </div>
          );
        })}
      </div>

      {files.length > 1 ? (
        <div
          className="mt-3 flex justify-center gap-1.5"
          aria-hidden
        >
          {files.map((file, index) => (
            <span
              key={file}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-5 bg-cyan-600"
                  : "w-1.5 bg-navy/20"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

type MosaicProps = {
  slideIndex: number;
  hero: string;
  rest: string[];
  selectionStartIndex: number;
  dayTotal: number;
  photoAlt: string;
  mosaicClassName: string;
  onOpen: (file: string) => void;
};

function GalleryMosaic({
  slideIndex,
  hero,
  rest,
  selectionStartIndex,
  dayTotal,
  photoAlt,
  mosaicClassName,
  onOpen,
}: MosaicProps) {
  return (
    <div
      className={`grid w-full grid-cols-[minmax(0,1.06fr)_minmax(0,0.47fr)_minmax(0,0.47fr)] grid-rows-6 ${mosaicClassName}`}
    >
      <GalleryTile
        file={hero}
        alt={`${photoAlt} (${selectionStartIndex + 1}/${dayTotal})`}
        className="col-start-1 row-start-1 row-span-6"
        priority
        onOpen={onOpen}
      />

      {rest.map((file, index) => {
        const layout = SIDE_TILE_LAYOUT[index];
        if (!layout) return null;
        const photoNumber = selectionStartIndex + index + 2;
        return (
          <GalleryTile
            key={`${slideIndex}-${file}`}
            file={file}
            alt={`${photoAlt} (${photoNumber}/${dayTotal})`}
            style={{
              gridRow: `${layout.rowStart} / span ${layout.rowSpan}`,
              gridColumn: layout.col,
            }}
            onOpen={onOpen}
          />
        );
      })}
    </div>
  );
}

function GalleryCarousel({
  slideIndex,
  selectionCount,
  hero,
  rest,
  selectionStartIndex,
  dayTotal,
  photoAlt,
  mosaicClassName,
  slideClassName,
  onPrevSlide,
  onNextSlide,
  prevAria,
  nextAria,
  onOpen,
}: MosaicProps & {
  selectionCount: number;
  slideClassName: string;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  prevAria: string;
  nextAria: string;
}) {
  const showArrows = selectionCount > 1;

  return (
    <div className="congress-gallery-controls flex items-center">
      {showArrows ? (
        <CarouselArrow direction="prev" onClick={onPrevSlide} ariaLabel={prevAria} />
      ) : (
        <span className="hidden w-11 shrink-0 md:block md:w-12" aria-hidden />
      )}

      <div key={slideIndex} className={`${slideClassName} min-w-0 flex-1`}>
        <GalleryMosaic
          slideIndex={slideIndex}
          hero={hero}
          rest={rest}
          selectionStartIndex={selectionStartIndex}
          dayTotal={dayTotal}
          photoAlt={photoAlt}
          mosaicClassName={mosaicClassName}
          onOpen={onOpen}
        />
      </div>

      {showArrows ? (
        <CarouselArrow direction="next" onClick={onNextSlide} ariaLabel={nextAria} />
      ) : (
        <span className="hidden w-11 shrink-0 md:block md:w-12" aria-hidden />
      )}
    </div>
  );
}

export function CongressGallery() {
  const locale = useLocale();
  const { congressCopy } = useLocaleData();
  const copy = congressCopy.gallery;

  const [dayId, setDayId] = useState<CongressGalleryDayId>("day1");
  const [slideIndex, setSlideIndex] = useState(0);
  const [lightbox, setLightbox] = useState<{
    file: string;
    scope: readonly string[];
  } | null>(null);

  const activeDay = useMemo(
    () =>
      CONGRESS_GALLERY_DAYS.find((day) => day.id === dayId) ??
      CONGRESS_GALLERY_DAYS[0],
    [dayId],
  );

  const dayFiles = useMemo(() => [...activeDay.files], [activeDay]);

  const selections = useMemo(
    () => gallerySelections(dayFiles, CONGRESS_GALLERY_SELECTION_SIZE),
    [dayFiles],
  );
  const selectionCount = selections.length;
  const dayTotal = dayFiles.length;

  const current = selections[slideIndex] ?? selections[0];
  const hero = current?.[0];
  const rest = current?.slice(1, 7) ?? [];
  const selectionStartIndex = slideIndex * CONGRESS_GALLERY_SELECTION_SIZE;

  const mobileFiles = useMemo(() => current ?? [], [current]);

  const selectDay = (id: CongressGalleryDayId) => {
    setDayId(id);
    setSlideIndex(0);
  };

  const goToSlide = (next: number) => {
    if (selectionCount === 0) return;
    setSlideIndex((next + selectionCount) % selectionCount);
  };

  const openLightbox = (file: string) => {
    setLightbox({ file, scope: dayFiles });
  };
  const closeLightbox = () => setLightbox(null);

  const goPrevPhoto = useCallback(() => {
    setLightbox((state) => {
      if (!state) return null;
      const index = state.scope.indexOf(state.file);
      if (index < 0) return state;
      const next = (index - 1 + state.scope.length) % state.scope.length;
      return { file: state.scope[next], scope: state.scope };
    });
  }, []);

  const goNextPhoto = useCallback(() => {
    setLightbox((state) => {
      if (!state) return null;
      const index = state.scope.indexOf(state.file);
      if (index < 0) return state;
      const next = (index + 1) % state.scope.length;
      return { file: state.scope[next], scope: state.scope };
    });
  }, []);

  useEffect(() => {
    if (lightbox === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goPrevPhoto();
      if (event.key === "ArrowRight") goNextPhoto();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox, goPrevPhoto, goNextPhoto]);

  const mosaicShared = hero
    ? {
        slideIndex,
        hero,
        rest,
        selectionStartIndex,
        dayTotal,
        photoAlt: copy.photoAlt,
        onOpen: openLightbox,
      }
    : null;

  const lightboxIndex =
    lightbox === null ? -1 : lightbox.scope.indexOf(lightbox.file);

  return (
    <section id="galeria" className="scroll-mt-24 overflow-x-clip">
      <Reveal as="div" className="mx-auto max-w-2xl border-b border-navy/10 pb-8">
        <p className="text-[0.7rem] tracking-[0.28em] text-cyan-600 uppercase">
          {copy.kicker}
        </p>
        <h3 className="font-display mt-3 text-4xl text-navy md:text-5xl">
          {copy.title.replace(".", "")}
        </h3>
        <p className="mt-4 text-slate-600">{copy.lead}</p>
      </Reveal>

      <div
        className="mt-10 mb-1 grid w-full grid-cols-3 gap-3 px-2 md:mt-8 md:mb-2 md:flex md:justify-center md:gap-4 md:px-0"
        role="tablist"
        aria-label={copy.dayTabsAria}
      >
        {CONGRESS_GALLERY_DAYS.map((day, index) => {
          const selected = day.id === dayId;
          const dateLabel = formatGalleryDayDate(day.date, locale);
          return (
            <button
              key={day.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectDay(day.id)}
              className={`w-full border px-2 py-2.5 text-center text-[0.65rem] font-semibold tracking-wide uppercase transition sm:text-xs md:w-auto md:px-5 md:py-2.5 ${
                selected
                  ? "border-navy bg-navy text-white"
                  : "border-navy/15 bg-white text-navy/70 hover:border-navy/30 hover:text-navy"
              }`}
            >
              <span className="md:hidden">{copy.dayLabel(index + 1)}</span>
              <span className="hidden md:inline">
                {copy.dayLabel(index + 1)} · {dateLabel}
              </span>
            </button>
          );
        })}
      </div>

      {dayTotal === 0 ? (
        <p className="mt-12 text-center text-sm text-slate-500">{copy.dayEmpty}</p>
      ) : null}

      {mosaicShared ? (
        <>
      <div className="mt-8 md:mt-10 md:hidden">
        <GalleryMobileSwipe
          key={`${dayId}-${slideIndex}`}
          slideIndex={slideIndex}
          files={mobileFiles}
          dayTotal={dayTotal}
          selectionStartIndex={selectionStartIndex}
          photoAlt={copy.photoAlt}
          swipeAria={copy.swipeAria}
          onOpen={openLightbox}
        />
      </div>

      <div className="congress-gallery-bleed mt-10 hidden md:block">
        <div className="congress-gallery-frame">
          <GalleryCarousel
            {...mosaicShared}
            selectionCount={selectionCount}
            mosaicClassName="congress-gallery-mosaic"
            slideClassName="congress-gallery-slide"
            onPrevSlide={() => goToSlide(slideIndex - 1)}
            onNextSlide={() => goToSlide(slideIndex + 1)}
            prevAria={copy.prevSelectionAria}
            nextAria={copy.nextSelectionAria}
          />
        </div>
      </div>

      {selectionCount > 1 ? (
        <button
          type="button"
          onClick={() => goToSlide(slideIndex + 1)}
          className="mx-auto mt-8 block text-center text-sm font-medium text-slate-500 transition hover:text-slate-700"
        >
          {copy.nextSelection}
        </button>
      ) : null}
        </>
      ) : null}

      {lightbox !== null && lightboxIndex >= 0 ? (
        <dialog
          open
          className="fixed inset-0 z-[100] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center border-0 bg-navy/92 p-4 backdrop:bg-navy/92 sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          aria-modal
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 px-4 py-2 text-[0.65rem] font-bold tracking-[0.14em] text-white uppercase transition hover:bg-white/20 sm:top-6 sm:right-6"
          >
            {copy.closeLightbox}
          </button>

          <button
            type="button"
            onClick={goPrevPhoto}
            className="absolute top-1/2 left-2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20 sm:flex sm:left-4"
            aria-label={copy.prevPhoto}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNextPhoto}
            className="absolute top-1/2 right-2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20 sm:flex sm:right-4"
            aria-label={copy.nextPhoto}
          >
            ›
          </button>

          <div className="relative h-[min(78vh,720px)] w-full max-w-5xl">
            <Image
              src={congressGallerySrc(lightbox.file)}
              alt={`${copy.photoAlt} (${lightboxIndex + 1}/${lightbox.scope.length})`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </dialog>
      ) : null}
    </section>
  );
}
