"use client";

import { SmoothNavLink } from "@/components/smooth-nav-link";
import type { ComponentProps } from "react";

const desktopClassName =
  "group relative px-2 py-2.5 text-[0.62rem] font-semibold tracking-[0.14em] text-navy uppercase transition-colors hover:text-navy lg:px-3 lg:text-[0.68rem] lg:tracking-[0.16em]";

const mobileClassName =
  "relative block border-b border-white/10 py-4 pl-5 text-2xl font-bold tracking-[0.08em] text-white uppercase transition-colors hover:text-cyan-100";

type HeaderWebinarsNavLinkProps = {
  label: string;
  variant: "desktop" | "mobile";
  onAfterNavigate?: () => void;
  onClick?: ComponentProps<typeof SmoothNavLink>["onClick"];
};

export function HeaderWebinarsNavLink({
  label,
  variant,
  onAfterNavigate,
  onClick,
}: HeaderWebinarsNavLinkProps) {
  if (variant === "mobile") {
    return (
      <SmoothNavLink
        href="/#webinars"
        className={mobileClassName}
        onAfterNavigate={onAfterNavigate}
        onClick={onClick}
      >
        <span
          className="absolute top-1/2 left-0 h-9 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-cyan-300/95 via-brand-sky to-fuchsia-300/75"
          aria-hidden="true"
        />
        {label}
      </SmoothNavLink>
    );
  }

  return (
    <SmoothNavLink
      href="/#webinars"
      className={desktopClassName}
      onAfterNavigate={onAfterNavigate}
      onClick={onClick}
    >
      {label}
      <span
        className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-cyan-500 via-brand-sky to-fuchsia-400/85 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-x-1 -bottom-1 h-1 rounded-full bg-gradient-to-r from-cyan-400/50 via-brand-sky/40 to-fuchsia-400/35 opacity-0 blur-[3px] transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-0"
        aria-hidden="true"
      />
    </SmoothNavLink>
  );
}
