"use client";

import { usePathname } from "@/i18n/navigation";
import { isPageReload, smoothScrollToIdWhenReady } from "@/lib/smooth-nav";
import { useEffect } from "react";

/** Al llegar a la home con #sección, scroll suave al ancla. */
export function HomeHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    if (isPageReload()) return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    smoothScrollToIdWhenReady(hash);
  }, [pathname]);

  return null;
}
