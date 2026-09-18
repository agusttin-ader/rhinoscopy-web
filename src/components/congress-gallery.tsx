"use client";

import { Reveal } from "@/components/motion/reveal";
import {
  CONGRESS_GALLERY_DAYS,
  CONGRESS_GALLERY_SELECTION_SIZE,
  type CongressGalleryDayDir,
  type CongressGalleryDayId,
  congressGallerySrc,
  prefetchCongressGalleryImage,
} from "@/data/congress-gallery";
import { useLocaleData } from "@/hooks/use-locale-data";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

const DESKTOP_GALLERY_MQ = "(min-width: 768px)";

function subscribeDesktopGallery(onStoreChange: () => void) {
  const mq = window.matchMedia(DESKTOP_GALLERY_MQ);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getDesktopGallerySnapshot() {
  return window.matchMedia(DESKTOP_GALLERY_MQ).matches;
}

function getDesktopGalleryServerSnapshot() {
  return false;
}

function useDesktopGallery() {
  return useSyncExternalStore(
    subscribeDesktopGallery,
    getDesktopGallerySnapshot,
    getDesktopGalleryServerSnapshot,
  );
}

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
  dayDir: CongressGalleryDayDir;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  onOpen: (file: string) => void;
};

function GalleryTile({
  file,
  alt,
  dayDir,
  className = "",
  style,
  priority,
  onOpen,
}: TileProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(file)}
      onMouseEnter={() => prefetchCongressGalleryImage(file, dayDir, "display")}
      onFocus={() => prefetchCongressGalleryImage(file, dayDir, "display")}
      style={style}
      className={`group relative min-h-0 min-w-0 overflow-hidden bg-paper transition-opacity hover:opacity-[0.92] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ${className}`}
    >
      <Image
        src={congressGallerySrc(file, "preview", dayDir)}
        alt={alt}
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1280px) 42vw, 520px"
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
  dayDir: CongressGalleryDayDir;
  dayTotal: number;
  selectionStartIndex: number;
  photoAlt: string;
  swipeAria: string;
};

function GalleryMobileSwipe({
  slideIndex,
  files,
  dayDir,
  dayTotal,
  selectionStartIndex,
  photoAlt,
  swipeAria,
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
              <div className="relative h-full w-full overflow-hidden bg-navy/5">
                <Image
                  src={congressGallerySrc(file, "preview", dayDir)}
                  alt={`${photoAlt} (${photoNumber}/${dayTotal})`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
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
  dayDir: CongressGalleryDayDir;
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
  dayDir,
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
        dayDir={dayDir}
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
            dayDir={dayDir}
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
  dayDir,
  selectionStartIndex,
  dayTotal,
  photoAlt,
  mosaicClassName,
  slideClassName,
  slideEnter,
  onPrevSlide,
  onNextSlide,
  prevAria,
  nextAria,
  onOpen,
}: MosaicProps & {
  selectionCount: number;
  slideClassName: string;
  slideEnter: LightboxPhotoEnter;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  prevAria: string;
  nextAria: string;
}) {
  const showArrows = selectionCount > 1;

  const slideEnterClass =
    slideEnter === "prev"
      ? "congress-gallery-slide--prev"
      : slideEnter === "next"
        ? "congress-gallery-slide--next"
        : "";

  return (
    <div className="congress-gallery-controls flex items-center">
      {showArrows ? (
        <CarouselArrow direction="prev" onClick={onPrevSlide} ariaLabel={prevAria} />
      ) : (
        <span className="hidden w-11 shrink-0 md:block md:w-12" aria-hidden />
      )}

      <div
        key={slideIndex}
        className={`${slideClassName} ${slideEnterClass} min-w-0 flex-1`.trim()}
      >
        <GalleryMosaic
          slideIndex={slideIndex}
          hero={hero}
          rest={rest}
          dayDir={dayDir}
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

function LightboxBrandLine({
  bold,
  light,
}: {
  bold: string;
  light: string;
}) {
  return (
    <p className="mt-1.5 uppercase leading-none">
      <span className="text-[0.62rem] font-semibold tracking-[0.24em] text-white/70 sm:text-[0.68rem]">
        {bold}
      </span>{" "}
      <span className="text-[0.62rem] font-light tracking-[0.38em] text-white/38 sm:text-[0.68rem]">
        {light}
      </span>
    </p>
  );
}

function LightboxCloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 5l10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type LightboxPhotoEnter = "initial" | "prev" | "next";

type GalleryLightboxProps = {
  file: string;
  index: number;
  total: number;
  photoAlt: string;
  brandBold: string;
  brandLight: string;
  titleScript: string;
  titleDisplay: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  swipeAria: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  photoEnter: LightboxPhotoEnter;
  dayDir: CongressGalleryDayDir;
};

const MEET_LOGO_DARK = "/images/LOGO-RHINOSCOPY-MEET-3-FONDO-OSCURO.png";

function LightboxMeetWatermark({ className }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[1200/520] w-full max-w-[240px] opacity-[0.12] brightness-[0.85] sm:max-w-[280px] ${className ?? ""}`}
    >
      <Image
        src={MEET_LOGO_DARK}
        alt=""
        fill
        sizes="280px"
        className="object-contain"
        unoptimized
      />
    </div>
  );
}

function LightboxPhotoStage({
  file,
  photoAlt,
  index,
  total,
  dayDir,
  enter,
}: {
  file: string;
  photoAlt: string;
  index: number;
  total: number;
  dayDir: CongressGalleryDayDir;
  enter: LightboxPhotoEnter;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<{
    frame: { w: number; h: number };
    stageW: number;
  } | null>(null);

  const fullSrc = congressGallerySrc(file, "full", dayDir);
  const displaySrc = congressGallerySrc(file, "display", dayDir);
  const previewSrc = congressGallerySrc(file, "preview", dayDir);

  const [photoSrc, setPhotoSrc] = useState(previewSrc);

  const handlePhotoError = useCallback(() => {
    setPhotoSrc((current) => {
      if (current === previewSrc) return displaySrc;
      if (current === displaySrc) return fullSrc;
      return current;
    });
  }, [previewSrc, displaySrc, fullSrc]);

  const updateLayoutFromImage = useCallback(
    (naturalWidth: number, naturalHeight: number) => {
      const stage = stageRef.current;
      if (!stage || naturalWidth <= 0 || naturalHeight <= 0) return;

      const maxW = Math.max(1, stage.clientWidth);
      const maxH = Math.max(1, stage.clientHeight);
      const scale = Math.min(maxW / naturalWidth, maxH / naturalHeight);
      setLayout({
        stageW: stage.clientWidth,
        frame: {
          w: Math.floor(naturalWidth * scale),
          h: Math.floor(naturalHeight * scale),
        },
      });
    },
    [],
  );

  const photoClassName =
    "congress-lightbox-photo-img relative z-30 max-h-[calc(100dvh-10.5rem)] max-w-[calc(100vw-2.5rem)] object-contain object-center drop-shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:max-h-[calc(100dvh-7rem)] sm:max-w-[calc(100vw-12rem)]";

  const frameClass =
    enter === "prev"
      ? "congress-lightbox-photo-frame congress-lightbox-photo-frame--prev"
      : enter === "next"
        ? "congress-lightbox-photo-frame congress-lightbox-photo-frame--next"
        : "congress-lightbox-photo-frame";

  const isPreview = photoSrc === previewSrc;

  return (
    <div
      ref={stageRef}
      className="absolute inset-x-3 bottom-3 top-[max(9rem,calc(env(safe-area-inset-top,0px)+7.25rem))] flex items-center justify-center sm:inset-x-20 sm:inset-y-5 sm:top-auto"
    >
      {layout && layout.stageW - layout.frame.w >= 100 ? (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-0 flex items-center justify-center px-2"
            style={{ width: (layout.stageW - layout.frame.w) / 2 }}
            aria-hidden
          >
            <LightboxMeetWatermark />
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-0 flex items-center justify-center px-2"
            style={{ width: (layout.stageW - layout.frame.w) / 2 }}
            aria-hidden
          >
            <LightboxMeetWatermark />
          </div>
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          aria-hidden
        >
          <LightboxMeetWatermark className="max-w-[min(55vw,420px)] opacity-[0.09] sm:opacity-[0.11]" />
        </div>
      )}

      <div className={`relative z-20 flex items-center justify-center ${frameClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt={`${photoAlt} (${index + 1}/${total})`}
          decoding="async"
          fetchPriority="high"
          className={`${photoClassName} ${
            isPreview ? "congress-lightbox-photo-img--preview" : "congress-lightbox-photo-img--sharp"
          }`}
          onLoad={(e) => {
            const img = e.currentTarget;
            updateLayoutFromImage(img.naturalWidth, img.naturalHeight);
            if (img.src.includes("/preview/")) {
              setPhotoSrc(displaySrc);
            }
          }}
          onError={handlePhotoError}
        />
      </div>
    </div>
  );
}

function useLightboxSwipe(onPrev: () => void, onNext: () => void) {
  const startRef = useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart: (event: React.TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      startRef.current = { x: touch.clientX, y: touch.clientY };
    },
    onTouchEnd: (event: React.TouchEvent) => {
      const start = startRef.current;
      const touch = event.changedTouches[0];
      startRef.current = null;
      if (!start || !touch) return;

      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.15) return;

      if (dx > 0) onPrev();
      else onNext();
    },
  };
}

function GalleryLightbox({
  file,
  index,
  total,
  photoAlt,
  brandBold,
  brandLight,
  titleScript,
  titleDisplay,
  closeLabel,
  prevLabel,
  nextLabel,
  swipeAria,
  onClose,
  onPrev,
  onNext,
  photoEnter,
  dayDir,
}: GalleryLightboxProps) {
  const swipe = useLightboxSwipe(onPrev, onNext);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <dialog
      open
      className="congress-lightbox fixed inset-0 z-[100] m-0 h-[100dvh] max-h-[100dvh] w-full max-w-none overflow-hidden border-0 bg-[#0a0918] p-0 backdrop:bg-[#0a0918]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal
      aria-label={`${photoAlt}. ${swipeAria}`}
    >
      <div
        className="relative h-[100dvh] max-h-[100dvh] w-full touch-pan-y"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={swipe.onTouchStart}
        onTouchEnd={swipe.onTouchEnd}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(255,255,255,0.04)_0%,transparent_55%)]"
          aria-hidden
        />

        <LightboxPhotoStage
          key={file}
          file={file}
          photoAlt={photoAlt}
          index={index}
          total={total}
          enter={photoEnter}
          dayDir={dayDir}
        />

        <button
          type="button"
          onClick={onPrev}
          className="absolute top-1/2 left-2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0a0918]/55 text-2xl leading-none text-white/90 backdrop-blur-sm transition hover:border-white/20 hover:bg-[#0a0918]/75 sm:flex sm:left-5 sm:h-12 sm:w-12"
          aria-label={prevLabel}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={onNext}
          className="absolute top-1/2 right-2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0a0918]/55 text-2xl leading-none text-white/90 backdrop-blur-sm transition hover:border-white/20 hover:bg-[#0a0918]/75 sm:flex sm:right-5 sm:h-12 sm:w-12"
          aria-label={nextLabel}
        >
          ›
        </button>

        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 px-4 pt-[max(1.35rem,env(safe-area-inset-top,0px))] pb-2 sm:px-8 sm:pt-5 sm:pb-3">
          <div className="min-w-0">
            <h2 className="leading-[0.92]">
              <span className="font-script block text-[clamp(1.75rem,5vw,2.35rem)] leading-none text-cyan-400">
                {titleScript}
              </span>
              <span className="font-display -mt-0.5 block text-[clamp(1.35rem,3.8vw,1.85rem)] uppercase tracking-[0.03em] text-white">
                {titleDisplay}
              </span>
            </h2>
            <LightboxBrandLine bold={brandBold} light={brandLight} />
          </div>
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <span className="text-[0.7rem] font-medium tabular-nums text-white/45 sm:text-xs">
              {index + 1}
              <span className="mx-1 text-white/25">/</span>
              {total}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/90 transition hover:border-white/25 hover:bg-white/12"
              aria-label={closeLabel}
            >
              <LightboxCloseIcon />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export function CongressGallery() {
  const locale = useLocale();
  const { congressCopy } = useLocaleData();
  const copy = congressCopy.gallery;
  const isDesktopGallery = useDesktopGallery();

  const [dayId, setDayId] = useState<CongressGalleryDayId>("day1");
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideEnter, setSlideEnter] = useState<LightboxPhotoEnter>("initial");
  const [lightbox, setLightbox] = useState<{
    file: string;
    scope: readonly string[];
    enter: LightboxPhotoEnter;
    dayDir: CongressGalleryDayDir;
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
    setSlideEnter("initial");
  };

  const goToSlide = (next: number) => {
    if (selectionCount === 0) return;
    const target = (next + selectionCount) % selectionCount;
    if (target === slideIndex) return;
    const forward =
      target > slideIndex ||
      (slideIndex === selectionCount - 1 && target === 0);
    setSlideEnter(forward ? "next" : "prev");
    setSlideIndex(target);
  };

  const openLightbox = (file: string) => {
    if (!getDesktopGallerySnapshot()) return;
    prefetchCongressGalleryImage(file, activeDay.dir, "display");
    setLightbox({
      file,
      scope: dayFiles,
      enter: "initial",
      dayDir: activeDay.dir,
    });
  };
  const closeLightbox = () => setLightbox(null);

  const goPrevPhoto = useCallback(() => {
    setLightbox((state) => {
      if (!state) return null;
      const index = state.scope.indexOf(state.file);
      if (index < 0) return state;
      const next = (index - 1 + state.scope.length) % state.scope.length;
      return {
        file: state.scope[next],
        scope: state.scope,
        enter: "prev",
        dayDir: state.dayDir,
      };
    });
  }, []);

  const goNextPhoto = useCallback(() => {
    setLightbox((state) => {
      if (!state) return null;
      const index = state.scope.indexOf(state.file);
      if (index < 0) return state;
      const next = (index + 1) % state.scope.length;
      return {
        file: state.scope[next],
        scope: state.scope,
        enter: "next",
        dayDir: state.dayDir,
      };
    });
  }, []);

  useEffect(() => {
    if (lightbox === null || !isDesktopGallery) return;

    const index = lightbox.scope.indexOf(lightbox.file);
    if (index < 0) return;
    const len = lightbox.scope.length;
    prefetchCongressGalleryImage(
      lightbox.scope[(index - 1 + len) % len],
      lightbox.dayDir,
      "display",
    );
    prefetchCongressGalleryImage(
      lightbox.scope[(index + 1) % len],
      lightbox.dayDir,
      "display",
    );
  }, [lightbox, isDesktopGallery]);

  useEffect(() => {
    if (lightbox === null || !isDesktopGallery) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goPrevPhoto();
      if (event.key === "ArrowRight") goNextPhoto();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox, isDesktopGallery, goPrevPhoto, goNextPhoto]);

  const mosaicShared = hero
    ? {
        slideIndex,
        hero,
        rest,
        selectionStartIndex,
        dayTotal,
        photoAlt: copy.photoAlt,
        dayDir: activeDay.dir,
        onOpen: openLightbox,
      }
    : null;

  const lightboxIndex =
    lightbox === null ? -1 : lightbox.scope.indexOf(lightbox.file);

  return (
    <section id="galeria" className="scroll-mt-24 overflow-x-clip">
      <Reveal as="div" className="max-w-2xl border-b border-navy/10 pb-8">
        <p className="text-[0.7rem] tracking-[0.28em] text-cyan-600 uppercase">
          {copy.kicker}
        </p>
        <h3 className="font-display mt-3 text-4xl text-navy md:text-5xl">
          {copy.title.replace(".", "")}
        </h3>
        <p className="mt-4 text-slate-600">{copy.lead}</p>
      </Reveal>

      <div
        className="mt-10 mb-1 grid w-full grid-cols-3 gap-3 md:mt-8 md:mb-2 md:flex md:justify-start md:gap-4"
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
        <p className="mt-12 text-left text-sm text-slate-500">{copy.dayEmpty}</p>
      ) : null}

      {mosaicShared ? (
        <>
      <div className="mt-8 md:mt-10 md:hidden">
        <GalleryMobileSwipe
          key={`${dayId}-${slideIndex}`}
          slideIndex={slideIndex}
          files={mobileFiles}
          dayDir={activeDay.dir}
          dayTotal={dayTotal}
          selectionStartIndex={selectionStartIndex}
          photoAlt={copy.photoAlt}
          swipeAria={copy.swipeAria}
        />
      </div>

      <div className="congress-gallery-bleed mt-10 hidden md:block">
        <div className="congress-gallery-frame">
          <GalleryCarousel
            {...mosaicShared}
            selectionCount={selectionCount}
            mosaicClassName="congress-gallery-mosaic"
            slideClassName="congress-gallery-slide"
            slideEnter={slideEnter}
            onPrevSlide={() => goToSlide(slideIndex - 1)}
            onNextSlide={() => goToSlide(slideIndex + 1)}
            prevAria={copy.prevSelectionAria}
            nextAria={copy.nextSelectionAria}
          />
        </div>
      </div>
        </>
      ) : null}

      {lightbox !== null && lightboxIndex >= 0 && isDesktopGallery ? (
        <GalleryLightbox
          file={lightbox.file}
          index={lightboxIndex}
          total={lightbox.scope.length}
          photoAlt={copy.photoAlt}
          brandBold={copy.lightboxBrandBold}
          brandLight={copy.lightboxBrandLight}
          titleScript={copy.lightboxTitleScript}
          titleDisplay={copy.lightboxTitleDisplay}
          closeLabel={copy.closeLightbox}
          prevLabel={copy.prevPhoto}
          nextLabel={copy.nextPhoto}
          swipeAria={copy.swipeAria}
          onClose={closeLightbox}
          onPrev={goPrevPhoto}
          onNext={goNextPhoto}
          photoEnter={lightbox.enter}
          dayDir={lightbox.dayDir}
        />
      ) : null}
    </section>
  );
}
