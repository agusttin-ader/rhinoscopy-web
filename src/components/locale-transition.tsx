"use client";

import { consumeLocaleViewTransition } from "@/lib/locale-transition-coord";
import { useLocale } from "next-intl";
import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

const ENTER_MS_DESKTOP = 520;
const ENTER_MS_MOBILE = 680;

function localeEnterMs() {
  if (typeof window === "undefined") return ENTER_MS_DESKTOP;
  return window.matchMedia("(max-width: 1023px)").matches
    ? ENTER_MS_MOBILE
    : ENTER_MS_DESKTOP;
}

type LocaleTransitionProps = {
  children: ReactNode;
};

/** Fade suave al cambiar idioma (fallback si no hay View Transitions). */
export function LocaleTransition({ children }: LocaleTransitionProps) {
  const locale = useLocale();
  const skipNext = useRef(true);
  const [entering, setEntering] = useState(false);

  useLayoutEffect(() => {
    if (skipNext.current) {
      skipNext.current = false;
      return;
    }

    if (consumeLocaleViewTransition()) return;

    const frame = requestAnimationFrame(() => {
      setEntering(true);
    });
    const timeout = window.setTimeout(() => setEntering(false), localeEnterMs());
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [locale]);

  return (
    <div
      className={`locale-content-root flex min-h-full flex-1 flex-col ${
        entering ? "locale-content-enter" : ""
      }`}
    >
      {children}
    </div>
  );
}
