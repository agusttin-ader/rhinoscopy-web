"use client";

import { GA_MEASUREMENT_ID, pageview } from "@/lib/gtag";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/** Envía page_view en navegación del App Router (cambios de ruta sin recarga). */
export function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
