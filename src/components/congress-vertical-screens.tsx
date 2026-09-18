import Image from "next/image";

const VERTICAL_SCREEN_IMAGES = [
  {
    file: "pantallas-vertical-1.webp",
    alt: "Pantalla vertical Rhinoscopy Meet 2026 — 1",
  },
  {
    file: "pantalla-vertical-2.webp",
    alt: "Pantalla vertical Rhinoscopy Meet 2026 — 2",
  },
  {
    file: "pantalla-vertical-3.webp",
    alt: "Pantalla vertical Rhinoscopy Meet 2026 — 3",
  },
] as const;

export function CongressVerticalScreens() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5">
        {VERTICAL_SCREEN_IMAGES.map(({ file, alt }) => (
          <div key={file} className="relative aspect-[9/16] w-full overflow-hidden bg-navy/5">
            <Image
              src={`/images/${file}`}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
