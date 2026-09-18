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

export const CONGRESS_GALLERY_SELECTION_SIZE = 7;

/** @deprecated Usar selecciones de 7 fotos en el mosaico. */
export const CONGRESS_GALLERY_PAGE_SIZE = 12;

export function congressGallerySrc(file: string): string {
  return `${CONGRESS_GALLERY_BASE}/${file}`;
}
