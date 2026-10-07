"use client";

import { Analytics } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics (App Router: pageviews en cada cambio de ruta).
 * Los datos aparecen en Vercel → proyecto → Analytics (tras activar Web Analytics y deploy).
 */
export function VercelAnalytics() {
  const debug = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_DEBUG === "true";

  const onVercel = Boolean(process.env.NEXT_PUBLIC_VERCEL_URL);

  return (
    <Analytics
      debug={debug}
      mode={onVercel || process.env.NODE_ENV === "production" ? "production" : "auto"}
    />
  );
}
