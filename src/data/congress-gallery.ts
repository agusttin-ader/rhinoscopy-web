/** Archivos en `public/images/galeria/` (congreso Meet 2026). */

const CONGRESS_GALLERY_DAY1_FILES = [
  "_KMP0002.webp",
  "_KMP0009.webp",
  "_KMP0131.webp",
  "_KMP0171.webp",
  "_KMP0203.webp",
  "_KMP0242.webp",
  "_KMP0290.webp",
  "_KMP0323.webp",
  "_KMP0371.webp",
  "_KMP0390.webp",
  "_KMP0411.webp",
  "_KMP0455.webp",
  "_KMP0466.webp",
  "_KMP0518.webp",
  "_KMP0531.webp",
  "_KMP0561.webp",
  "_KMP0579.webp",
  "_KMP0616.webp",
  "_KMP0634.webp",
  "_KMP0709.webp",
  "_KMP0712.webp",
  "_KMP0748.webp",
  "_KMP0779.webp",
  "_KMP9236.webp",
  "_KMP9288.webp",
  "_KMP9401.webp",
  "_KMP9433.webp",
  "_KMP9440.webp",
  "_KMP9477.webp",
  "_KMP9524.webp",
  "_KMP9559.webp",
  "_KMP9622.webp",
  "_KMP9628.webp",
  "_KMP9640.webp",
  "_KMP9649.webp",
  "_KMP9708.webp",
  "_KMP9712.webp",
  "_KMP9752.webp",
  "_KMP9799.webp",
  "_KMP9876.webp",
  "_KMP9903.webp",
  "_KMP9973.webp",
  "_KMP9988.webp",
] as const;

const CONGRESS_GALLERY_DAY2_FILES = [
  "RLV_4729.webp",
  "RLV_4755.webp",
  "RLV_4763.webp",
  "RLV_4784.webp",
  "RLV_4798.webp",
  "RLV_4822.webp",
  "RLV_4854.webp",
  "RLV_4874.webp",
  "RLV_4891.webp",
  "RLV_4906.webp",
  "RLV_4933.webp",
  "RLV_4942.webp",
  "RLV_4984.webp",
  "RLV_5000.webp",
  "RLV_5035.webp",
  "RLV_5041.webp",
  "RLV_5071.webp",
  "RLV_5091.webp",
  "RLV_5114.webp",
  "RLV_5142.webp",
  "RLV_5151.webp",
  "RLV_5158.webp",
  "RLV_5171.webp",
  "RLV_5204.webp",
  "RLV_5221.webp",
  "RLV_5262.webp",
  "RLV_5265.webp",
  "RLV_5278.webp",
  "_KMP0001.webp",
] as const;

const CONGRESS_GALLERY_DAY3_FILES = [] as const;

/** Jornadas del Meet (ejemplo: día 2 y 3 listos para cargar fotos). */
export const CONGRESS_GALLERY_DAYS = [
  {
    id: "day1",
    date: "2026-09-17",
    dir: "dia-uno",
    files: CONGRESS_GALLERY_DAY1_FILES,
  },
  {
    id: "day2",
    date: "2026-09-18",
    dir: "dia-dos",
    files: CONGRESS_GALLERY_DAY2_FILES,
  },
  {
    id: "day3",
    date: "2026-09-19",
    dir: "dia-tres",
    files: CONGRESS_GALLERY_DAY3_FILES,
  },
] as const;

export type CongressGalleryDayId = (typeof CONGRESS_GALLERY_DAYS)[number]["id"];

export type CongressGalleryDayDir =
  (typeof CONGRESS_GALLERY_DAYS)[number]["dir"];

export const CONGRESS_GALLERY_FILES = CONGRESS_GALLERY_DAYS.flatMap((day) => [
  ...day.files,
]);

export const CONGRESS_GALLERY_BASE = "/images/galeria";

export const CONGRESS_GALLERY_SELECTION_SIZE = 7;

/** @deprecated Usar selecciones de 7 fotos en el mosaico. */
export const CONGRESS_GALLERY_PAGE_SIZE = 12;

export type CongressGalleryVariant = "preview" | "display" | "full";

export function congressGalleryDayDir(
  dayId: CongressGalleryDayId,
): CongressGalleryDayDir {
  const day = CONGRESS_GALLERY_DAYS.find((d) => d.id === dayId);
  return day?.dir ?? CONGRESS_GALLERY_DAYS[0].dir;
}

/** Mosaico/carrusel: `preview`. Lightbox: `display`. Archivo original: `full`. */
export function congressGallerySrc(
  file: string,
  variant: CongressGalleryVariant = "full",
  dayDir: CongressGalleryDayDir,
): string {
  const root = `${CONGRESS_GALLERY_BASE}/${dayDir}`;
  if (variant === "preview") {
    return `${root}/preview/${file}`;
  }
  if (variant === "display") {
    return `${root}/display/${file}`;
  }
  return `${root}/${file}`;
}

const prefetchedGallery = new Set<string>();

/** Precarga estática (p. ej. hover en mosaico o vecinos del lightbox). */
export function prefetchCongressGalleryImage(
  file: string,
  dayDir: CongressGalleryDayDir,
  variant: CongressGalleryVariant = "display",
): void {
  if (typeof window === "undefined") return;
  const src = congressGallerySrc(file, variant, dayDir);
  if (prefetchedGallery.has(src)) return;
  prefetchedGallery.add(src);
  const img = new window.Image();
  img.src = src;
}
