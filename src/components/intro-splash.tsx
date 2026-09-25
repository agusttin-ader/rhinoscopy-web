"use client";

import Image from "next/image";

const LOGO_SRC = "/images/rhinoscopy-logo-hero-sombra.png";

export type IntroSplashPhase = "visible" | "exit";

type IntroSplashProps = {
  phase: IntroSplashPhase | null;
};

export function IntroSplash({ phase }: IntroSplashProps) {
  if (!phase) return null;

  return (
    <div
      className={`intro-splash${phase === "exit" ? " intro-splash--exit" : ""}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="intro-splash__bg" aria-hidden="true">
        <div className="intro-splash__gradient" />
        <svg
          className="intro-splash__mesh"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="intro-splash-grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="rgba(147, 210, 255, 0.4)"
                strokeWidth="0.12"
              />
              <circle cx="0" cy="0" r="0.25" fill="rgba(167, 139, 250, 0.45)" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#intro-splash-grid)" />
        </svg>
      </div>

      <div className="intro-splash__inner">
        <div className="intro-splash__mark">
          <div className="intro-splash__vignette" aria-hidden="true" />
          <Image
            src={LOGO_SRC}
            alt=""
            width={420}
            height={298}
            priority
            fetchPriority="high"
            className="intro-splash__logo"
            sizes="(max-width: 640px) 52vw, 12rem"
          />
        </div>
      </div>
    </div>
  );
}
