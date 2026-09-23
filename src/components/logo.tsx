"use client";

import { SmoothNavLink } from "@/components/smooth-nav-link";
import Image from "next/image";

const LOGO_SRC = "/images/logo-RHINOSCOPY-1.png";
const LOGO_HERO_SRC = "/images/logo-RHINOSCOPY-hero.png";

type LogoProps = {
  className?: string;
  size?: "header" | "hero";
  elevated?: boolean;
  badge?: boolean;
  badgeSize?: "sm" | "md";
  wordmark?: boolean;
};

export function Logo({
  className = "",
  size = "header",
  elevated = false,
  badge = false,
  badgeSize = "sm",
  wordmark = false,
}: LogoProps) {
  const isHero = size === "hero";
  const isMdBadge = badge && badgeSize === "md";

  const image = (
    <Image
      src={isHero ? LOGO_HERO_SRC : LOGO_SRC}
      alt={wordmark ? "" : "Rhinoscopy"}
      width={isHero ? 420 : badge ? (isMdBadge ? 52 : 40) : wordmark ? 44 : 162}
      height={isHero ? 298 : badge ? (isMdBadge ? 52 : 40) : wordmark ? 44 : 115}
      className={
        isHero
          ? "w-full max-w-[min(100%,20rem)] sm:max-w-sm md:max-w-md lg:max-w-xl"
          : badge
            ? isMdBadge
              ? "h-10 w-10 object-contain"
              : "h-8 w-8 object-contain"
            : wordmark
              ? "h-8 w-8 shrink-0 object-contain min-[375px]:h-9 min-[375px]:w-9 sm:h-10 sm:w-10"
              : "h-9 w-auto sm:h-10"
      }
      priority={!badge}
      aria-hidden={wordmark}
    />
  );

  const mark = badge ? (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-10px_rgba(38,36,84,0.35)] ring-1 ring-navy/10 ${
        isMdBadge ? "h-14 w-14" : "h-11 w-11"
      }`}
    >
      {image}
    </span>
  ) : elevated ? (
    <span
      className="inline-flex rounded-[2rem] bg-white p-6 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.45)] ring-1 ring-white/80 sm:p-8"
    >
      {image}
    </span>
  ) : (
    image
  );

  if (isHero) {
    return <span className={`inline-flex ${className}`}>{mark}</span>;
  }

  return (
    <SmoothNavLink
      href="/"
      className={`group inline-flex min-w-0 max-w-full items-center gap-1.5 min-[375px]:gap-2 sm:gap-3 ${className}`}
      aria-label="Rhinoscopy, inicio"
    >
      {mark}
      {wordmark && (
        <span
          className="font-brand min-w-0 truncate leading-none text-navy transition-colors group-hover:text-navy/80 text-[0.48rem] tracking-[0.14em] min-[360px]:text-[0.52rem] min-[390px]:text-[0.55rem] sm:text-[0.58rem] min-[1024px]:text-[0.62rem] min-[1280px]:text-[0.72rem] min-[1024px]:tracking-normal"
        >
          Rhinoscopy
        </span>
      )}
    </SmoothNavLink>
  );
}
