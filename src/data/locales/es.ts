import { aboutCopy } from "@/data/about-copy";
import { brandHeroCopy } from "@/data/brand-hero-copy";
import { contactCopy } from "@/data/contact-copy";
import { copy } from "@/data/copy";
import { congressCopy } from "@/data/congress-copy";
import { constanciasCopy } from "@/data/constancias-copy";
import { footerCopy } from "@/data/footer-copy";
import { webinarsCopy } from "@/data/webinars";

export const es = {
  copy,
  aboutCopy,
  brandHeroCopy,
  contactCopy,
  congressCopy,
  constanciasCopy,
  footerCopy,
  webinarsCopy,
  nav: {
    congress: "Congreso",
    webinars: "Webinars",
    certificates: "Certificados",
    contact: "Contacto",
    contactCta: "Contacto",
  },
  footerNav: [
    { href: "/#congreso", label: "Congreso" },
    { href: "/#programa", label: "Programa" },
    { href: "/#speakers", label: "Disertantes" },
    { href: "/#webinars", label: "Webinars" },
    { href: "/constancias", label: "Certificados" },
    { href: "/#contacto", label: "Contacto" },
  ],
  meetPresentation: {
    congressPrefix: "Congreso",
    whenLabel: "Cuándo",
    whenValue: "17—19 Sept",
    whereLabel: "Dónde",
    whereValue: "Buenos Aires",
    activitiesCta: "Ver actividades",
  },
  mobileNav: {
    menu: "Menú",
    open: "Abrir menú",
    close: "Cerrar menú",
  },
  language: {
    label: "Idioma",
    es: "Español",
    en: "English",
    pt: "Português",
  },
  siteTagline: "Un evento de pura endoscopía nasal",
  meet2026: {
    title: "Rhinoscopy Meet 2026",
    dates: "17, 18 y 19 de septiembre",
    venue: "Hotel Cassa Lepage",
    city: "Buenos Aires, Argentina",
  },
  whatsapp: {
    defaultMessage: "Hola, quisiera consultar sobre Rhinoscopy.",
  },
  meta: {
    home: {
      title: "Rhinoscopy",
      description:
        "Comunidad de educación médica en rinología y endoscopía nasal. Rhinoscopy Meet 2026, webinars y certificados.",
      keywords: [
        "rinología",
        "endoscopía nasal",
        "Rhinoscopy Meet",
        "webinars médicos",
        "congreso rinología",
        "Buenos Aires",
      ],
    },
    constancias: {
      title: "Certificados | Rhinoscopy",
      description:
        "Buscá y descargá tu certificado de asistencia del Rhinoscopy Meet 2026 por nombre o apellido.",
      keywords: [
        "certificado Rhinoscopy",
        "constancia asistencia",
        "Rhinoscopy Meet 2026",
      ],
    },
  },
  api: {
    constanciasMinLength: "Ingresá al menos 2 letras del nombre o apellido.",
  },
  committeeRoles: {
    Presidente: "Presidente",
    Vicepresidente: "Vicepresidente",
    Coordinadora: "Coordinadora",
  },
  committeeRolesByMemberId: {
    "carlos-lopez-moris": "Presidente",
    "guido-hocsman": "Vicepresidente",
    "belen-domeg-lizardo": "Coordinadora",
  },
  footerPage: {
    viewCongress: "Ver congreso",
    rightsReserved: "Todos los derechos reservados.",
    developedBy: "Desarrollado por",
  },
};

export type LocaleData = typeof es;
