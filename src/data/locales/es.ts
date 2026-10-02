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
    { href: "/#galeria", label: "Galería" },
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
  siteTagline: "Otorrinolaringología, rinología y rinoscopia.",
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
      title: "Rhinoscopy | Otorrinolaringología, rinología y rinoscopia",
      description:
        "Rhinoscopy es la comunidad de formación en otorrinolaringología (ORL), rinología, rinoscopia y endoscopía nasal: webinars, cirugía rinológica, congreso Meet 2026 y recursos para profesionales.",
      keywords: [
        "Rhinoscopy",
        "rinoscopia",
        "rhinoscopy",
        "otorrinolaringología",
        "ORL",
        "otorrino",
        "rinología",
        "endoscopía nasal",
        "cirugía rinológica",
        "cirugía endoscópica nasal",
        "senos paranosales",
        "rinoplastia funcional",
        "base de cráneo endoscópica",
        "webinars otorrinolaringología",
        "congreso rinología",
        "Rhinoscopy Meet 2026",
        "Argentina",
      ],
    },
    constancias: {
      title: "Certificados | Rhinoscopy",
      description:
        "Certificados de asistencia del congreso Rhinoscopy Meet 2026 para otorrinolaringólogos y profesionales de rinología y rinoscopia.",
      keywords: [
        "certificado Rhinoscopy",
        "constancia congreso ORL",
        "Rhinoscopy Meet 2026",
        "rinología",
        "otorrinolaringología",
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
