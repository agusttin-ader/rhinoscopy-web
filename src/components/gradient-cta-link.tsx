import { Link } from "@/i18n/navigation";
import type { ComponentProps, ReactNode } from "react";

type GradientCtaLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
};

/** Botón pill con borde cyan–magenta (identidad Rhinoscopy). */
export function GradientCtaLink({
  children,
  className = "",
  ...props
}: GradientCtaLinkProps) {
  return (
    <Link
      className={`group relative inline-flex rounded-full bg-gradient-to-r from-cyan-400/90 via-white/25 to-fuchsia-500/90 p-px shadow-[0_24px_60px_-28px_rgba(34,211,238,0.5)] transition-shadow duration-200 hover:shadow-[0_28px_64px_-24px_rgba(217,70,239,0.35)] ${className}`}
      {...props}
    >
      <span className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-[0.7rem] font-bold tracking-[0.18em] text-white uppercase transition-colors duration-200 group-hover:bg-[#2e2c62]">
        <span className="inline-flex items-center gap-2">{children}</span>
      </span>
    </Link>
  );
}
