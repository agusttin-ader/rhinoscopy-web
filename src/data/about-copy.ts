import { site } from "@/data/site";

/** Quiénes somos — alineado a footer, hero de marca y presencia en Instagram. */
export const aboutCopy = {
  kicker: "Quiénes somos",
  titleScript: "Somos",
  titleDisplay: "Rhinoscopy",
  lead:
    "Una comunidad de educación médica en rinología y endoscopía nasal, con base en Argentina y alcance para profesionales de toda la región.",
  paragraphs: [
    "Nacimos para acercar formación de calidad en rinología: jornadas presenciales, encuentros en vivo y contenido pensado para la práctica clínica diaria. En Instagram compartimos novedades del congreso, avisos de webinars y material de la comunidad.",
  ],
  highlights: [
    "Rhinoscopy Meet — congreso de endoscopía nasal",
    "Webinars semanales con la comunidad",
    "Certificados de asistencia al Meet",
  ],
  instagramCta: "Ver en Instagram",
  instagramHandle: site.instagramHandle,
  instagramUrl: site.instagram,
} as const;
