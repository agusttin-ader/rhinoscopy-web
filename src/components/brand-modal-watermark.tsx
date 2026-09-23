import { StaticImage } from "@/components/static-image";

const BRAND_LOGO_SOMBRA = "/images/rhinoscopy-logo-hero-sombra.png";

type BrandModalWatermarkProps = {
  className?: string;
  /** Marca chica tipo agua (p. ej. mobile sobre el video). */
  size?: "watermark" | "compact";
};

/** Marca de agua Rhinoscopy (no Meet) para modales a pantalla completa. */
export function BrandModalWatermark({
  className = "",
  size = "watermark",
}: BrandModalWatermarkProps) {
  const sizeClass =
    size === "compact"
      ? "w-[4.5rem] max-w-[4.5rem] opacity-[0.24]"
      : "w-[min(94%,17.5rem)] max-w-[17.5rem] opacity-[0.26] sm:w-[min(94%,21rem)] sm:max-w-[21rem] lg:max-w-[23.5rem]";

  return (
    <div
      className={`relative mx-auto aspect-square ${sizeClass} ${className}`.trim()}
      aria-hidden
    >
      <StaticImage
        src={BRAND_LOGO_SOMBRA}
        alt=""
        fill
        sizes="320px"
        objectFit="contain"
        className={
          size === "compact"
            ? "brightness-[0.95] drop-shadow-[0_0_24px_rgba(95,198,238,0.12)]"
            : "brightness-[1.08] drop-shadow-[0_0_52px_rgba(95,198,238,0.28),0_0_28px_rgba(255,255,255,0.1)]"
        }
      />
    </div>
  );
}
