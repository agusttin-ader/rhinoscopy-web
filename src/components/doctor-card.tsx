const ACCENT_BAR = [
  "bg-gradient-to-b from-sky-300 via-cyan-200/90 to-sky-100/25 group-hover:from-sky-200 group-hover:via-cyan-100",
  "bg-gradient-to-b from-navy via-[#35336a] to-navy/15 group-hover:from-[#2f2d5c] group-hover:via-navy",
  "bg-gradient-to-b from-fuchsia-500 via-[#d4147a] to-fuchsia-400/25 group-hover:from-fuchsia-400 group-hover:via-[#e91e8c]",
] as const;

type DoctorCardProps = {
  name: string;
  subtitle: string;
  photoSrc: string;
  accentIndex?: number;
  /** Misma fila foto + texto que compact, con más tamaño (comité). */
  variant?: "compact" | "large";
};

export function DoctorCard({
  name,
  subtitle,
  photoSrc,
  accentIndex = 0,
  variant = "compact",
}: DoctorCardProps) {
  const accent = ACCENT_BAR[accentIndex % ACCENT_BAR.length];
  const large = variant === "large";

  return (
    <article
      className={`group relative flex items-center overflow-hidden border border-navy/[0.08] bg-white/90 shadow-[0_12px_32px_-28px_rgba(38,36,84,0.22)] transition duration-300 ease-out hover:-translate-y-px hover:border-navy/12 hover:bg-white hover:shadow-[0_20px_48px_-28px_rgba(38,36,84,0.28)] ${
        large
          ? "gap-4 rounded-2xl px-5 py-5 sm:gap-5 sm:px-6 sm:py-6"
          : "gap-3.5 rounded-xl px-3.5 py-3.5"
      }`}
    >
      <div
        className={`absolute left-0 rounded-r-full opacity-95 transition duration-300 ${accent} ${
          large ? "inset-y-4 w-[3px]" : "inset-y-3 w-[3px]"
        }`}
        aria-hidden="true"
      />

      <div
        className={`relative ml-1.5 shrink-0 overflow-hidden rounded-full bg-navy/[0.04] ring-1 ring-navy/10 ${
          large
            ? "h-[4.25rem] w-[4.25rem] sm:h-[4.75rem] sm:w-[4.75rem]"
            : "h-11 w-11 sm:h-12 sm:w-12"
        }`}
      >
        <img
          src={photoSrc}
          alt=""
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="min-w-0 flex-1 pr-1">
        <h4
          className={`font-semibold leading-snug tracking-[-0.01em] text-navy ${
            large
              ? "text-[0.95rem] sm:text-[1.05rem]"
              : "text-[0.8125rem] sm:text-[0.875rem]"
          }`}
        >
          {name}
        </h4>
        <p
          className={`mt-1 font-semibold uppercase text-cyan-700/90 ${
            large
              ? "text-[0.65rem] tracking-[0.17em] sm:mt-1.5 sm:text-[0.7rem]"
              : "text-[0.62rem] tracking-[0.16em]"
          }`}
        >
          {subtitle}
        </p>
      </div>
    </article>
  );
}
