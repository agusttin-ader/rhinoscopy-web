export const site = {
  name: "Rhinoscopy",
  /** Marca / sitio (SEO, Organization schema). */
  brandDescription:
    "Rhinoscopy: educación médica para otorrinolaringólogos y especialistas en rinología, rinoscopia, endoscopía nasal y cirugía rinológica. Webinars, congresos y recursos.",
  /** Copy del congreso (Event schema, no confundir con la marca). */
  meetTagline: "Un evento de pura endoscopía nasal",
  /** @deprecated Usar brandDescription o meetTagline según contexto. */
  tagline: "Un evento de pura endoscopía nasal",
  email: "rhinoscopy.srl@gmail.com",
  whatsapp: {
    display: "+54 9 11 7200 3461",
    href: "https://wa.me/5491172003461",
  },
  instagram: "https://www.instagram.com/rhinoscopyofficial/",
  instagramHandle: "@rhinoscopyofficial",
  youtube: "https://www.youtube.com/@RhinoscopyArg",
  youtubeHandle: "@RhinoscopyArg",
} as const;

export const meet2026 = {
  title: "Rhinoscopy Meet 2026",
  dates: "17, 18 y 19 de septiembre",
  /** ISO 8601 — JSON-LD Event, SEO. */
  startDate: "2026-09-17",
  endDate: "2026-09-19",
  venue: "Hotel Cassa Lepage",
  city: "Buenos Aires, Argentina",
} as const;
