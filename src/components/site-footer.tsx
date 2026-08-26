import { Logo } from "@/components/logo";
import { copy } from "@/data/copy";
import { site } from "@/data/site";

const links = [
  { href: "/#proyecto", label: "Proyecto" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/#actividades", label: "Actividades" },
  { href: "/constancias", label: "Constancias" },
  { href: "/#contacto", label: "Contacto" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy px-6 pt-16 pb-8 text-slate-400">
      <div className="mx-auto grid max-w-6xl gap-12 border-b border-white/10 pb-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            {copy.footerBlurb}
          </p>
        </div>
        <div>
          <p className="text-[0.65rem] tracking-[0.22em] text-white uppercase">
            Lorem
          </p>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[0.65rem] tracking-[0.22em] text-white uppercase">
            Contacto
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-col items-start gap-3 text-xs md:flex-row md:items-center md:justify-between">
        <p className="text-white/65">
          © {year} {site.name}. Lorem ipsum dolor sit amet.
        </p>
        <a
          href="https://www.agustinaderdev.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 text-white/65 transition hover:text-white/80"
        >
          <img
            src="/images/logo-dev/logo-dev.webp"
            alt=""
            width={256}
            height={202}
            className="h-7 w-auto object-contain drop-shadow-[0_0_1.5px_rgba(255,255,255,0.85)] sm:h-8"
          />
          <span>
            Desarrollado por{" "}
            <span className="font-medium text-white/85">Agustin Ader</span>
          </span>
        </a>
      </div>
    </footer>
  );
}
