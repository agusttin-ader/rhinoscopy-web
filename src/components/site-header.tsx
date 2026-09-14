"use client";

import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { useEffect, useRef, useState } from "react";

const homeLinks = [
  { href: "/#congreso", label: "Congreso" },
  { href: "/#webinars", label: "Webinars" },
  { href: "/constancias", label: "Constancias" },
  { href: "/#contacto", label: "Contacto" },
];

const SCROLL_THRESHOLD = 72;

export function SiteHeader({ variant = "bar" }: { variant?: "overlay" | "bar" }) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      if (y < SCROLL_THRESHOLD) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }

      lastScrollY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const positionClass =
    variant === "overlay"
      ? "absolute inset-x-0 top-0"
      : "sticky top-0";

  return (
    <header
      className={`${positionClass} z-40 bg-white/90 shadow-[0_8px_32px_-24px_rgba(38,36,84,0.28)] backdrop-blur-xl transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-6">
        <Logo wordmark className="transition-opacity duration-200 hover:opacity-80" />

        <div className="md:hidden">
          <MobileNav links={homeLinks} />
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {homeLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative px-3 py-2 text-[0.68rem] font-semibold tracking-[0.16em] text-navy/65 uppercase transition-colors hover:text-navy"
            >
              {link.label}
              <span
                className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-cyan-500/70 transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </a>
          ))}
          <a
            href="/#contacto"
            className="ml-3 rounded-full bg-navy px-5 py-2.5 text-[0.68rem] font-bold tracking-[0.16em] text-white uppercase shadow-[0_10px_24px_-12px_rgba(38,36,84,0.55)] transition hover:bg-navy/90"
          >
            Contacto
          </a>
        </nav>
      </div>

      <div
        className="h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent"
        aria-hidden="true"
      />
      <div
        className="h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
        aria-hidden="true"
      />
    </header>
  );
}
