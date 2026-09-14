"use client";

import { isAppHomePath, isPageReload } from "@/lib/smooth-nav";
import { useEffect, useLayoutEffect } from "react";

/** Tras F5 / recarga: arriba del todo y sin ancla en la URL. */
export function ScrollToTopOnRefresh() {
  useLayoutEffect(() => {
    if (!isPageReload()) return;

    const { pathname, search } = window.location;
    if (!isAppHomePath(pathname)) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (window.location.hash) {
      window.history.replaceState(null, "", `${pathname}${search}`);
    }
  }, []);

  useEffect(() => {
    if (!isAppHomePath(window.location.pathname)) return;
    history.scrollRestoration = "manual";
  }, []);

  return null;
}
