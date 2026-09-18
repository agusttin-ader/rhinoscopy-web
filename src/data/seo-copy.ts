import type { AppLocale } from "@/i18n/routing";

/** Temas que Google puede asociar a la organización (schema.org `knowsAbout`). */
export const SEO_KNOWS_ABOUT: Record<AppLocale, string[]> = {
  es: [
    "Otorrinolaringología",
    "Rinología",
    "Rinoscopia",
    "Endoscopía nasal",
    "Cirugía rinológica",
    "Cirugía endoscópica nasal",
    "Senos paranasales",
    "Educación médica continua",
  ],
  en: [
    "Otolaryngology",
    "Rhinology",
    "Rhinoscopy",
    "Nasal endoscopy",
    "Endoscopic sinus surgery",
    "Paranasal sinuses",
    "Continuing medical education",
  ],
  pt: [
    "Otorrinolaringologia",
    "Rinologia",
    "Rinoscopia",
    "Endoscopia nasal",
    "Cirurgia rinológica",
    "Seios paranasais",
    "Educação médica continuada",
  ],
};
