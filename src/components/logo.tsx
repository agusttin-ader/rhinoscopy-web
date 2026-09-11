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
              ? "h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
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

  return (
    <a
      href="/"
      className={`group inline-flex items-center gap-2.5 sm:gap-3 ${className}`}
      aria-label="Rhinoscopy, inicio"
    >
      {mark}
      {wordmark && (
        <span className="font-brand text-[0.62rem] leading-none text-navy transition-colors group-hover:text-navy/80 sm:text-[0.72rem]">
          Rhinoscopy
        </span>
      )}
    </a>
  );
}
