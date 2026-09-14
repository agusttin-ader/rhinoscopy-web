/** Dominio de producción (canonical, sitemap, OG). */
export const PRODUCTION_SITE_URL = "https://www.rhinoscopy.com.ar";

export const SOMBRA_LOGO_PATH = "/images/rhinoscopy-logo-hero-sombra.png";

/** URL base pública sin barra final. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return PRODUCTION_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/**
 * Indexación en buscadores: activa solo en producción con dominio Rhinoscopy
 * o si `SEO_ALLOW_INDEXING=true` (útil al conectar www.rhinoscopy.com.ar).
 */
export function shouldAllowSearchIndexing(): boolean {
  const flag = process.env.SEO_ALLOW_INDEXING?.trim().toLowerCase();
  if (flag === "true") return true;
  if (flag === "false") return false;

  const site = getSiteUrl();
  try {
    const host = new URL(site).hostname;
    return host === "www.rhinoscopy.com.ar" || host === "rhinoscopy.com.ar";
  } catch {
    return false;
  }
}

export function isProductionDomainConfigured(): boolean {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!fromEnv) return false;
  try {
    const host = new URL(fromEnv).hostname;
    return host === "www.rhinoscopy.com.ar" || host === "rhinoscopy.com.ar";
  } catch {
    return false;
  }
}
