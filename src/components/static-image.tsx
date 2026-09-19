import type { CSSProperties } from "react";

type StaticImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
  /** Ocupa el contenedor `relative` del padre (sin Next Image / sin Vercel). */
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  objectFit?: "cover" | "contain";
};

/** Imagen estática desde `/public` — lazy por defecto, sin Image Optimization de Vercel. */
export function StaticImage({
  src,
  alt,
  className = "",
  style,
  width,
  height,
  fill,
  priority = false,
  sizes,
  objectFit = "cover",
}: StaticImageProps) {
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? ("high" as const) : undefined;
  const fit =
    objectFit === "contain" ? "object-contain" : "object-cover";

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={`absolute inset-0 h-full w-full ${fit} ${className}`.trim()}
        style={style}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      className={className}
      style={style}
    />
  );
}
