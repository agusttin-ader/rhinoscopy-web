import { Logo } from "@/components/logo";

const homeLinks = [
  { href: "/#proyecto", label: "Proyecto" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/#actividades", label: "Actividades" },
  { href: "/constancias", label: "Constancias" },
  { href: "/#contacto", label: "Contacto" },
];

export function SiteHeader({ variant = "overlay" }: { variant?: "overlay" | "bar" }) {
  return (
    <header
      className={
        variant === "bar"
          ? "relative z-30 bg-navy"
          : "absolute inset-x-0 top-0 z-30"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {homeLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.7rem] font-medium tracking-[0.18em] text-slate-300 uppercase transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contacto"
            className="rounded-full border border-white/20 px-4 py-2 text-[0.68rem] tracking-[0.16em] text-white uppercase transition hover:border-white/50 hover:bg-white/5"
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
