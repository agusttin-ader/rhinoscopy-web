"use client";

import { WebinarTopicHeading } from "@/components/webinar-topic-heading";
import { youtubeEmbedUrl, youtubeVideoId } from "@/lib/youtube";
import { useEffect, useId, useSyncExternalStore } from "react";
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

function CloseIcon() {
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
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const videoId = player ? youtubeVideoId(player.youtubeUrl) : null;
  const open = Boolean(player && videoId);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
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
      open
      className="webinar-video-modal fixed inset-0 z-[110] m-0 flex h-[100dvh] max-h-[100dvh] w-full max-w-none items-center justify-center border-0 bg-[#0a0918]/92 p-0 backdrop:bg-[#0a0918]"
      aria-modal="true"
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative mx-auto flex w-full max-w-5xl flex-col px-4 py-6 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0 pr-2">
            <WebinarTopicHeading
              id={titleId}
              topic={player.topic}
              as="h2"
              size="modal"
            />
            <p className="mt-2 text-[0.68rem] font-medium tracking-[0.22em] text-white/45 uppercase sm:mt-2.5">
              {player.speaker}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={closeLabel}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
          <iframe
            title={player.topic}
            src={youtubeEmbedUrl(videoId)}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <p className="mt-4 text-center">
          <a
            href={player.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.68rem] font-semibold tracking-[0.18em] text-cyan-300/90 uppercase transition hover:text-cyan-200"
          >
            {openOnYoutubeLabel}
          </a>
        </p>
      </div>
    </dialog>,
    document.body,
  );
}
