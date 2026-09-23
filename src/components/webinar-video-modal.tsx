"use client";

import { BrandModalWatermark } from "@/components/brand-modal-watermark";
import { WebinarTopicHeading } from "@/components/webinar-topic-heading";
import { lockBodyScroll } from "@/lib/body-scroll-lock";
import { youtubeEmbedUrl, youtubeVideoId } from "@/lib/youtube";
import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

export type WebinarPlayerState = {
  youtubeUrl: string;
  topic: string;
  speaker: string;
};

type Props = {
  player: WebinarPlayerState | null;
  onClose: () => void;
  closeLabel: string;
  openOnYoutubeLabel: string;
};

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

export function WebinarVideoModal({
  player,
  onClose,
  closeLabel,
  openOnYoutubeLabel,
}: Props) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const videoId = player ? youtubeVideoId(player.youtubeUrl) : null;
  const open = Boolean(player && videoId);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const unlockScroll = lockBodyScroll();

    if (!dialog.open) {
      dialog.showModal();
    }

    const blockBackgroundScroll = (event: Event) => {
      event.preventDefault();
    };

    document.addEventListener("wheel", blockBackgroundScroll, { passive: false });
    document.addEventListener("touchmove", blockBackgroundScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", blockBackgroundScroll);
      document.removeEventListener("touchmove", blockBackgroundScroll);
      unlockScroll();
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted || !open || !player || !videoId) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="congress-lightbox webinar-video-modal fixed inset-0 z-[110] m-0 h-[100dvh] max-h-[100dvh] w-full max-w-none overflow-hidden overscroll-none border-0 bg-[#0a0918] p-0 backdrop:bg-[#0a0918]"
      aria-modal="true"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex h-[100dvh] max-h-[100dvh] w-full flex-col overscroll-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(255,255,255,0.04)_0%,transparent_55%)]"
          aria-hidden
        />

        <div className="relative z-20 flex shrink-0 items-start justify-between gap-4 px-4 pt-[max(1.35rem,env(safe-area-inset-top,0px))] pb-1 sm:px-8 sm:pt-5 sm:pb-3">
          <div className="min-w-0 max-w-[min(100%,calc(100%-3.5rem))] bg-[#0a0918]/75 pr-2 backdrop-blur-[3px] sm:max-w-[min(72%,42rem)] sm:bg-transparent sm:pr-0 sm:backdrop-blur-none">
            <WebinarTopicHeading
              id={titleId}
              topic={player.topic}
              as="h2"
              size="modal"
            />
            <p className="mt-2 text-[0.62rem] font-medium tracking-[0.22em] text-white/45 uppercase sm:mt-2.5 sm:text-[0.68rem]">
              {player.speaker}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/90 transition hover:border-white/25 hover:bg-white/12"
            aria-label={closeLabel}
          >
            <ModalCloseIcon />
          </button>
        </div>

        <div
          className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-3 sm:grid sm:grid-cols-[minmax(0,1fr)_min(100%,56rem)_minmax(0,1fr)] sm:items-center sm:gap-x-5 sm:px-8 lg:px-16 lg:gap-x-8 xl:px-20"
        >
          <div
            className="pointer-events-none hidden h-full min-h-0 w-full items-center justify-center px-2 sm:flex sm:justify-self-center"
            aria-hidden
          >
            <BrandModalWatermark />
          </div>

          <div className="relative z-20 flex w-full max-w-[min(100%,56rem)] shrink-0 flex-col items-center justify-self-center sm:col-start-2">
            <div
              className="pointer-events-none mb-3 flex w-full justify-center sm:hidden"
              aria-hidden
            >
              <BrandModalWatermark size="compact" />
            </div>

            <div className="w-full overflow-hidden rounded-xl bg-black shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
              <div className="relative aspect-video w-full">
                <iframe
                  title={player.topic}
                  src={youtubeEmbedUrl(videoId)}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none hidden h-full min-h-0 w-full items-center justify-center px-2 sm:flex sm:justify-self-center"
            aria-hidden
          >
            <BrandModalWatermark />
          </div>
        </div>

        <p className="relative z-20 shrink-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-2 text-center sm:pb-5 sm:pt-3">
          <a
            href={player.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.62rem] font-semibold tracking-[0.18em] text-cyan-300/90 uppercase transition hover:text-cyan-200 sm:text-[0.68rem]"
          >
            {openOnYoutubeLabel}
          </a>
        </p>
      </div>
    </dialog>,
    document.body,
  );
}
