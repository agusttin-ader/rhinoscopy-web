"use client";

import { IntroSplash } from "@/components/intro-splash";
import {
  clearPageReveal,
  hasSeenSplash,
  isHomePathname,
  lockPageScroll,
  lockSplashGate,
  markSplashSeen,
  PAGE_REVEAL_MS,
  prefersReducedMotion,
  setPageRevealActive,
  setPageRevealWaiting,
  SPLASH_EXIT_MS,
  SPLASH_HOLD_MS,
  unlockPageScroll,
  unlockSplashGate,
} from "@/lib/page-reveal";
import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

type SplashPhase = "visible" | "exit";

type SplashState = {
  phase: SplashPhase;
};

type PageRevealProviderProps = {
  children: ReactNode;
};

export function PageRevealProvider({ children }: PageRevealProviderProps) {
  const [splash, setSplash] = useState<SplashState | null>(null);
  const timersRef = useRef<number[]>([]);

  useLayoutEffect(() => {
    const isHome = isHomePathname(window.location.pathname);

    if (!isHome || hasSeenSplash() || prefersReducedMotion()) {
      return;
    }

    lockSplashGate();
    lockPageScroll();
    setPageRevealWaiting();

    const showFrame = requestAnimationFrame(() => {
      setSplash({ phase: "visible" });
    });

    const exitTimer = window.setTimeout(() => {
      setSplash((current) =>
        current ? { ...current, phase: "exit" } : { phase: "exit" },
      );
    }, SPLASH_HOLD_MS);

    const revealStartTimer = window.setTimeout(() => {
      markSplashSeen();
      unlockSplashGate();
      setSplash(null);
      setPageRevealActive();
    }, SPLASH_HOLD_MS + SPLASH_EXIT_MS);

    const unlockTimer = window.setTimeout(() => {
      clearPageReveal();
      unlockPageScroll();
    }, SPLASH_HOLD_MS + SPLASH_EXIT_MS + PAGE_REVEAL_MS);

    timersRef.current = [exitTimer, revealStartTimer, unlockTimer];

    return () => {
      cancelAnimationFrame(showFrame);
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
      unlockSplashGate();
      clearPageReveal();
      unlockPageScroll();
    };
  }, []);

  return (
    <>
      {splash ? <div className="splash-lock-screen" aria-hidden="true" /> : null}
      <IntroSplash phase={splash?.phase ?? null} />
      <div className="splash-gated-content">{children}</div>
    </>
  );
}
