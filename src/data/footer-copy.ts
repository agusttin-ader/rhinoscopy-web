export const footerCopy = {
  navTitle: "Sitio",
  meetTitle: "Rhinoscopy Meet 2026",
  contactTitle: "Contacto",
  followTitle: "Seguinos",
  blurb:
    "Comunidad de educación médica en rinología y endoscopía nasal. Webinars, congreso y formación continua.",
  legal:
    "Educación médica. Los contenidos del sitio son informativos y no reemplazan el criterio profesional.",
} as const;

export const footerNav = [
  { href: "/#congreso", label: "Congreso" },
  { href: "/#programa", label: "Programa" },
  { href: "/#speakers", label: "Disertantes" },
  { href: "/#webinars", label: "Webinars" },
  { href: "/constancias", label: "Constancias" },
  { href: "/#contacto", label: "Contacto" },
] as const;
