"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { isPageReload, smoothScrollToIdWhenReady } from "@/lib/smooth-nav";
import { useEffect } from "react";

/** Anclas que vivían en la home antes de mover el congreso a `/congreso`. */
const CONGRESS_ANCHORS = new Set([
  "congreso",
  "resumen-congreso",
  "programa",
  "comite",
  "speakers",
  "galeria",
]);

/** Al llegar a la home con #sección, scroll suave al ancla. */
export function HomeHashScroll() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;

    if (CONGRESS_ANCHORS.has(hash)) {
      router.replace(hash === "congreso" ? "/congreso" : `/congreso#${hash}`);
      if (hash !== "congreso") smoothScrollToIdWhenReady(hash);
      return;
    }

    if (isPageReload()) return;
    smoothScrollToIdWhenReady(hash);
  }, [pathname, router]);

  return null;
}
