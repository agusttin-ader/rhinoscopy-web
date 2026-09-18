/** Archivos en `public/images/galeria/` (congreso Meet 2026). */

const CONGRESS_GALLERY_DAY1_FILES = [

] as const;

/** Jornadas del Meet (ejemplo: día 2 y 3 listos para cargar fotos). */
export const CONGRESS_GALLERY_DAYS = [
  {
    id: "day1",
    date: "2026-09-17",
    files: CONGRESS_GALLERY_DAY1_FILES,
  },
  {
    id: "day2",
    date: "2026-09-18",
    files: [] as const,
  },
  {
    id: "day3",
    date: "2026-09-19",
    files: [] as const,
  },
] as const;

export type CongressGalleryDayId = (typeof CONGRESS_GALLERY_DAYS)[number]["id"];

export const CONGRESS_GALLERY_FILES = CONGRESS_GALLERY_DAYS.flatMap((day) => [
  ...day.files,
]);

export const CONGRESS_GALLERY_BASE = "/images/galeria";
export const CONGRESS_GALLERY_PREVIEW_BASE = "/images/galeria/preview";
export const CONGRESS_GALLERY_DISPLAY_BASE = "/images/galeria/display";

export const CONGRESS_GALLERY_SELECTION_SIZE = 7;

/** @deprecated Usar selecciones de 7 fotos en el mosaico. */
export const CONGRESS_GALLERY_PAGE_SIZE = 12;

export type CongressGalleryVariant = "preview" | "display" | "full";

/** Mosaico/carrusel: `preview`. Lightbox: `display`. Archivo original: `full`. */
export function congressGallerySrc(
  file: string,
  variant: CongressGalleryVariant = "full",
): string {
  if (variant === "preview") {
    return `${CONGRESS_GALLERY_PREVIEW_BASE}/${file}`;
  }
  if (variant === "display") {
    return `${CONGRESS_GALLERY_DISPLAY_BASE}/${file}`;
  }
  return `${CONGRESS_GALLERY_BASE}/${file}`;
}

const prefetchedGallery = new Set<string>();

/** Precarga estática (p. ej. hover en mosaico o vecinos del lightbox). */
export function prefetchCongressGalleryImage(
  file: string,
  variant: CongressGalleryVariant = "display",
): void {
  if (typeof window === "undefined") return;
  const src = congressGallerySrc(file, variant);
  if (prefetchedGallery.has(src)) return;
  prefetchedGallery.add(src);
  const img = new window.Image();
  img.src = src;
}
