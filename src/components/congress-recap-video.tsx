"use client";

import { Reveal } from "@/components/motion/reveal";
import { WebinarPlayButton } from "@/components/webinar-play-button";
import { congressRecapVideo } from "@/data/congress-recap-video";
import { useLocaleData } from "@/hooks/use-locale-data";
import { lockBodyScroll } from "@/lib/body-scroll-lock";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { flushSync } from "react-dom";
import { createPortal } from "react-dom";

const MOBILE_VIDEO_MQ = "(max-width: 767px)";

function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_VIDEO_MQ).matches;
}

function ModalCloseIcon() {
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

function CongressRecapVideoModal({
  open,
  onClose,
  title,
  closeLabel,
  videoRef,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const unlockScroll = lockBodyScroll();
    if (!dialog.open) dialog.showModal();

    const blockBackgroundScroll = (event: Event) => {
      event.preventDefault();
    };
    document.addEventListener("wheel", blockBackgroundScroll, { passive: false });
    document.addEventListener("touchmove", blockBackgroundScroll, {
      passive: false,
    });

    return () => {
      document.removeEventListener("wheel", blockBackgroundScroll);
      document.removeEventListener("touchmove", blockBackgroundScroll);
      unlockScroll();
    };
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open) {
      videoRef.current?.pause();
      if (dialog?.open) dialog.close();
      return;
    }
    if (dialog && !dialog.open) dialog.showModal();
  }, [open, videoRef]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="congress-lightbox fixed inset-0 z-[110] m-0 h-[100dvh] max-h-[100dvh] w-full max-w-none overflow-hidden overscroll-none border-0 bg-black p-0 backdrop:bg-black"
      aria-modal="true"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="relative h-[100dvh] w-full bg-black">
        <h2 id={titleId} className="sr-only">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/75"
          aria-label={closeLabel}
        >
          <ModalCloseIcon />
        </button>
        <video
          ref={videoRef}
          className="absolute inset-0 z-10 h-full w-full object-contain bg-black"
          src={congressRecapVideo.src}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    </dialog>,
    document.body,
  );
}

function startMobilePlayback(video: HTMLVideoElement | null) {
  if (!video) return;
  video.load();
  void video.play().catch(() => {});
}

export function CongressRecapVideo() {
  const { congressCopy } = useLocaleData();
  const copy = congressCopy.recap;
  const [playingInline, setPlayingInline] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playingInline) return;
    const video = inlineVideoRef.current;
    if (!video) return;
    video.load();
    void video.play().catch(() => {});
  }, [playingInline]);

  const handlePlay = () => {
    if (isMobileViewport()) {
      flushSync(() => setMobileOpen(true));
      startMobilePlayback(modalVideoRef.current);
      requestAnimationFrame(() => {
        startMobilePlayback(modalVideoRef.current);
      });
      return;
    }
    setPlayingInline(true);
  };

  return (
    <>
      <section
        id="resumen-congreso"
        className="site-scroll-mt min-w-0 border-b border-navy/10 bg-paper pb-12 sm:pb-14 md:pb-16"
      >
        <div className="site-shell min-w-0">
          <Reveal as="div" className="min-w-0 max-w-2xl">
            <p className="text-[0.7rem] tracking-[0.28em] text-cyan-600 uppercase">
              {copy.kicker}
            </p>
            <h3 className="font-display mt-3 text-[clamp(1.75rem,5.2vw,2.25rem)] text-navy md:text-5xl">
              {copy.title.replace(".", "")}
            </h3>
            <p className="mt-4 text-slate-600">{copy.lead}</p>
          </Reveal>

          <Reveal delay={80} offset={12} className="mt-8 md:mt-10">
            <div
              className="relative mx-auto w-full max-w-4xl overflow-hidden border border-navy/10 bg-black shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] ring-1 ring-navy/5"
            >
              <div className="relative aspect-video w-full">
                <video
                  ref={inlineVideoRef}
                  className="absolute inset-0 h-full w-full object-contain"
                  poster={congressRecapVideo.poster}
                  src={playingInline ? congressRecapVideo.src : undefined}
                  controls={playingInline}
                  playsInline
                  preload="none"
                  aria-label={copy.playAria}
                />
                {!playingInline ? (
                  <button
                    type="button"
                    className="group absolute inset-0 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0"
                    onClick={handlePlay}
                    aria-label={copy.playAria}
                  >
                    <span
                      className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15 transition group-hover:from-black/45"
                      aria-hidden="true"
                    />
                    <WebinarPlayButton />
                  </button>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CongressRecapVideoModal
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title={copy.modalTitle}
        closeLabel={copy.closeModal}
        videoRef={modalVideoRef}
      />
    </>
  );
}
