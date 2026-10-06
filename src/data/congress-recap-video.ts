/** Resumen en video del Meet 2026 (archivos en `/public`). */
const ASSET_VERSION = "720p-cr20-2026-10";

/** Bump `ASSET_VERSION` al reemplazar el MP4 para evitar caché del archivo anterior. */
export const congressRecapVideo = {
  src: `/videos/resumenrhinoscopy-congreso.mp4?v=${ASSET_VERSION}`,
  poster: `/images/congress/recap-resumen-2026.webp?v=${ASSET_VERSION}`,
} as const;
