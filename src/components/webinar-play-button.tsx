type Props = {
  className?: string;
};

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.5 7.4v9.2c0 .55.58.9 1.05.62l7.8-4.6c.5-.3.5-1 0-1.28l-7.8-4.6c-.47-.28-1.05.07-1.05.66z" />
    </svg>
  );
}

/** Botón play sobre flyer (gradiente marca Rhinoscopy). */
export function WebinarPlayButton({ className = "" }: Props) {
  return (
    <span
      className={`pointer-events-none relative flex h-[3.75rem] w-[3.75rem] items-center justify-center sm:h-[4.25rem] sm:w-[4.25rem] ${className}`}
      aria-hidden="true"
    >
      <span
        className="absolute inset-0 rounded-full bg-cyan-400/25 blur-xl motion-reduce:blur-md"
      />
      <span
        className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/95 via-white/30 to-fuchsia-500/90 p-[2.5px] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_16px_48px_-12px_rgba(34,211,238,0.55)] transition-transform duration-300 group-hover:scale-[1.06] motion-reduce:transition-none"
      >
        <span
          className="flex h-full w-full items-center justify-center rounded-full bg-navy/80 text-white backdrop-blur-md"
        >
          <PlayGlyph className="ml-0.5 h-7 w-7 sm:h-8 sm:w-8" />
        </span>
      </span>
    </span>
  );
}
