"use client";

import { SmoothNavLink } from "@/components/smooth-nav-link";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const MOBILE_MENU_LOGO = "/images/rhinoscopy-logo-hero-sombra.png";

type NavLink = {
  href: string;
  label: string;
};

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-4 w-5 items-center justify-center" aria-hidden="true">
      <span
        className={`absolute block h-[2px] w-5 rounded-full bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          open ? "translate-y-0 rotate-45" : "-translate-y-[6px] rotate-0"
        }`}
      />
      <span
        className={`absolute block h-[2px] w-5 rounded-full bg-current transition-[transform,opacity] duration-200 ease-out ${
          open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
        }`}
      />
      <span
        className={`absolute block h-[2px] w-5 rounded-full bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          open ? "translate-y-0 -rotate-45" : "translate-y-[6px] rotate-0"
        }`}
      />
    </span>
  );
}

type MobileNavProps = {
  links: NavLink[];
  menuLabel: string;
  openLabel: string;
  closeLabel: string;
};

export function MobileNav({
  links,
  menuLabel,
  openLabel,
  closeLabel,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const drawer =
    mounted &&
    createPortal(
      <div
        id="mobile-nav-drawer"
        className={`fixed inset-0 z-[100] md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <nav
          className={`absolute inset-0 flex flex-col bg-navy transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(95,198,238,0.14),transparent_35%),radial-gradient(circle_at_0%_100%,rgba(139,92,246,0.12),transparent_40%)]"
            aria-hidden="true"
          />

          <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
            <p
              className={`text-[0.65rem] font-semibold tracking-[0.28em] text-cyan-300/80 uppercase transition-all duration-300 delay-100 ${
                open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
              }`}
            >
              {menuLabel}
            </p>
            <button
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:bg-white/10 ${
                open ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
              aria-label={closeLabel}
              onClick={() => setOpen(false)}
            >
              <MenuIcon open />
            </button>
          </div>

          <ul className="relative flex min-h-0 flex-1 flex-col justify-center gap-1 overflow-y-auto px-6 py-6">
            {links.map((link, index) => (
              <li
                key={link.href}
                className={`transition-all duration-300 ease-out ${
                  open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${120 + index * 55}ms` : "0ms" }}
              >
                {link.href.startsWith("/#") ? (
                  <SmoothNavLink
                    href={link.href}
                    className="block border-b border-white/10 py-4 text-2xl font-bold tracking-[0.08em] text-white uppercase transition-colors hover:text-cyan-200"
                    onAfterNavigate={() => setOpen(false)}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </SmoothNavLink>
                ) : (
                  <Link
                    href={link.href}
                    className="block border-b border-white/10 py-4 text-2xl font-bold tracking-[0.08em] text-white uppercase transition-colors hover:text-cyan-200"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div
            className={`relative shrink-0 px-6 pt-2 pb-[max(1.75rem,env(safe-area-inset-bottom))] transition-all duration-500 ease-out ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: open ? "320ms" : "0ms" }}
          >
            <Link
              href="/"
              className="mx-auto flex max-w-[11rem] flex-col items-center gap-3 opacity-90 transition hover:opacity-100"
              onClick={() => setOpen(false)}
              aria-label="Rhinoscopy, inicio"
            >
              <Image
                src={MOBILE_MENU_LOGO}
                alt=""
                width={280}
                height={280}
                unoptimized
                className="h-auto w-full max-w-[9.5rem] object-contain drop-shadow-[0_0_24px_rgba(95,198,238,0.2)]"
              />
              <span className="text-[0.62rem] font-semibold tracking-[0.32em] text-white/45 uppercase">
                Rhinoscopy
              </span>
            </Link>
          </div>
        </nav>
      </div>,
      document.body,
    );

  return (
    <>
      <button
        type="button"
        className={`relative z-[101] inline-flex h-10 w-10 items-center justify-center rounded-full text-navy transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          open
            ? "bg-navy text-white shadow-[0_10px_28px_-10px_rgba(38,36,84,0.55)]"
            : "bg-navy/[0.04] ring-1 ring-navy/10 hover:bg-navy/[0.08]"
        }`}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
      >
        <MenuIcon open={open} />
      </button>

      {drawer}
    </>
  );
}
