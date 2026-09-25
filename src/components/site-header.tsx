"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { useLocaleData } from "@/hooks/use-locale-data";
import { SmoothNavLink } from "@/components/smooth-nav-link";
import { Link } from "@/i18n/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const SCROLL_THRESHOLD = 72;

export function SiteHeader({ variant = "bar" }: { variant?: "overlay" | "bar" }) {
  const { nav, mobileNav } = useLocaleData();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const homeLinks = useMemo(
    () => [
      { href: "/#congreso", label: nav.congress },
      { href: "/#webinars", label: nav.webinars },
      { href: "/constancias", label: nav.certificates },
      { href: "/#contacto", label: nav.contact },
    ],
    [nav],
  );

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
      <div className="site-shell flex h-[4.25rem] min-w-0 items-center justify-between gap-2 sm:h-[4.5rem] sm:gap-3">
        <Logo
          wordmark
          className="min-w-0 flex-1 overflow-hidden pr-1 transition-opacity duration-200 hover:opacity-80 min-[1024px]:flex-none"
        />

        <div className="flex shrink-0 items-center gap-1.5 min-[375px]:gap-2 min-[1024px]:hidden">
          <LanguageSwitcher />
          <MobileNav
            links={homeLinks}
            menuLabel={mobileNav.menu}
            openLabel={mobileNav.open}
            closeLabel={mobileNav.close}
          />
        </div>

        <nav className="hidden min-w-0 items-center gap-0.5 min-[1024px]:flex min-[1024px]:gap-1">
          {homeLinks.map((link) => {
            const NavLink = link.href.startsWith("/#") ? SmoothNavLink : Link;
            return (
              <NavLink
                key={link.href}
                href={link.href}
                className="group relative px-2 py-2.5 text-[0.62rem] font-semibold tracking-[0.14em] text-navy/65 uppercase transition-colors hover:text-navy lg:px-3 lg:text-[0.68rem] lg:tracking-[0.16em]"
              >
                {link.label}
                <span
                  className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-cyan-500/70 transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </NavLink>
            );
          })}
          <LanguageSwitcher className="ml-1" />
          <SmoothNavLink
            href="/#contacto"
            className="ml-1.5 shrink-0 rounded-full bg-navy px-4 py-2.5 text-[0.62rem] font-bold tracking-[0.14em] text-white uppercase shadow-[0_10px_24px_-12px_rgba(38,36,84,0.55)] transition hover:bg-navy/90 lg:ml-2 lg:px-5 lg:text-[0.68rem] lg:tracking-[0.16em]"
          >
            {nav.contactCta}
          </SmoothNavLink>
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
