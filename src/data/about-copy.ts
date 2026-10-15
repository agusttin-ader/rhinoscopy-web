import { site } from "@/data/site";

/** Quiénes somos — textos tomados de la bio de Instagram y de la app del Meet. */
export const aboutCopy = {
  kicker: "Quiénes somos",
  titleScript: "Somos",
  titleDisplay: "Rhinoscopy",
  lead: "Comunidad médica dedicada a la rinología y actividades conexas.",
  paragraphs: [
    "Endoscopía nasal, rinoplastia, base de cráneo y actividades conexas. En Instagram compartimos novedades del congreso y avisos de webinars.",
  ],
  highlights: [
    "Rhinoscopy Meet — un evento de pura endoscopía nasal",
    "Webinars en YouTube",
    "Certificados de asistencia al Meet",
  ],
  instagramCta: "Ver en Instagram",
  instagramHandle: site.instagramHandle,
  instagramUrl: site.instagram,
} as const;
