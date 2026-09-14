import { FooterFollow } from "@/components/footer-follow";
import { Reveal } from "@/components/motion/reveal";
import { getLocaleData } from "@/data/locales";
import { site } from "@/data/site";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import Image from "next/image";

export async function SiteFooter() {
  const locale = await getLocale();
  const { footerCopy, footerNav, meet2026, siteTagline, whatsapp, footerPage } =
    getLocaleData(locale);
  const year = new Date().getFullYear();

  const whatsappPrefill = `${site.whatsapp.href}?text=${encodeURIComponent(
    whatsapp.defaultMessage,
  )}`;

  return (
    <footer className="relative bg-navy text-slate-400">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        aria-hidden="true"
      />

      <Reveal className="mx-auto max-w-6xl px-5 pb-8 pt-14 sm:px-6 sm:pt-16" offset={14}>
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-90 sm:gap-3"
              aria-label="Rhinoscopy, inicio"
            >
              <Image
                src="/images/rhinoscopy-logo-hero-sombra.png"
                alt=""
                width={200}
                height={200}
                className="h-16 w-16 object-contain drop-shadow-[0_0_2px_rgba(255,255,255,0.35),0_0_28px_rgba(95,198,238,0.2),0_8px_24px_rgba(0,0,0,0.35)] sm:h-[4.5rem] sm:w-[4.5rem]"
                aria-hidden
              />
              <span
                className="font-brand text-[0.62rem] leading-none text-white transition-colors group-hover:text-white/85 sm:text-[0.72rem]"
              >
                Rhinoscopy
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50">
              {footerCopy.blurb}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/40">
              {siteTagline}
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-white uppercase">
              {footerCopy.navTitle}
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition-colors duration-200 hover:text-cyan-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-white uppercase">
              {footerCopy.meetTitle}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/55">
              <li>{meet2026.dates}</li>
              <li>{meet2026.venue}</li>
              <li>{meet2026.city}</li>
              <li>
                <Link
                  href="/#congreso"
                  className="text-cyan-300/90 transition-colors hover:text-cyan-200"
                >
                  {footerPage.viewCongress}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-white uppercase">
              {footerCopy.contactTitle}
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-white/55 transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappPrefill}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 transition-colors hover:text-[#25D366]"
                >
                  {site.whatsapp.display}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 transition-colors hover:text-white"
                >
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
            <FooterFollow />
          </div>
        </div>

        <div
          className="mt-8 flex flex-col gap-6 text-xs sm:gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl space-y-2">
            <p className="text-white/70">
              © {year} {site.name}. {footerPage.rightsReserved}
            </p>
            <p className="leading-relaxed text-white/40">{footerCopy.legal}</p>
          </div>
          <a
            href="https://www.agustinaderdev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2.5 text-white/65 transition hover:text-white/80"
          >
            <img
              src="/images/logo-dev/logo-dev.webp"
              alt=""
              width={256}
              height={202}
              className="h-7 w-auto object-contain drop-shadow-[0_0_1.5px_rgba(255,255,255,0.85)] sm:h-8"
            />
            <span>
              {footerPage.developedBy}{" "}
              <span className="font-medium text-white/85">Agustin Ader</span>
            </span>
          </a>
        </div>
      </Reveal>
    </footer>
  );
}
