/** Copy del congreso Rhinoscopy Meet 2026. */
export const congressCopy = {
  kicker: "Rhinoscopy Meet 2026",
  title: "Un evento de pura endoscopía nasal.",
  lead:
    "Explorá el programa, conocé a los speakers y toda la información del encuentro.",
  family: {
    kicker: "Comunidad",
    titleScript: "Familia",
    titleDisplay: "Rhinoscopy",
    lead:
      "Organización, disertantes y profesionales del Meet 2026 en Buenos Aires.",
    imageAlt:
      "Grupo de la comunidad Rhinoscopy en el escenario del Meet 2026 en Buenos Aires",
  },
  program: {
    kicker: "Agenda científica",
    title: "Programa.",
    lead: "El cronograma completo está disponible en el programa oficial en PDF.",
    blocksScheduled: (n: number) =>
      n === 1 ? "1 bloque programado" : `${n} bloques programados`,
    scientificBlock: "Bloque científico",
    presentations: (n: number) =>
      n === 1 ? "1 presentación" : `${n} presentaciones`,
    roomSecretary: "Secretario de sala",
    coordinators: "Coordinan",
    globalAlert: "Aviso general",
    pause: "Pausa",
    social: "Encuentro",
    symposium: "Simposio",
    activity: "Actividad",
    pdfTitle: "Programa original",
    pdfLead: "Consultá el documento completo entregado por la organización.",
    pdfCta: "Abrir PDF",
  },
  speakers: {
    kicker: "Invitados",
    title: "Speakers.",
    lead:
      "Referentes nacionales e internacionales que formarán parte del encuentro.",
    searchPlaceholder: "Buscar por nombre o apellido",
    filters: {
      all: "Todos",
      international: "Internacionales",
      national: "Nacionales",
    },
    count: (n: number) => (n === 1 ? "1 speaker" : `${n} speakers`),
    groupCount: (n: number) =>
      n === 1 ? "1 profesional" : `${n} profesionales`,
    showMore: (n: number) =>
      n === 1 ? "Ver 1 profesional más +" : `Ver ${n} profesionales más +`,
    showLess: "Ver menos",
    empty: "No encontramos speakers con esa búsqueda.",
    moreSpeakers: (n: number) =>
      n === 1 ? "Ver 1 profesional más" : `Ver ${n} profesionales más`,
    international: "Speaker internacional",
    national: "Speaker nacional",
  },
  committee: {
    kicker: "Rhinoscopy Meet 2026",
    title: "Comité organizador.",
    lead:
      "El equipo que acompaña la planificación y coordinación del encuentro.",
  },
  sponsors: {
    kicker: "Gracias por hacerlo posible",
    title: "Sponsors.",
    lead: "Empresas y entidades que forman parte de Rhinoscopy Meet 2026.",
    companiesLabel: "Empresas",
    companiesTitle: "Auspician",
    partnersLabel: "Entidades profesionales",
    partnersTitle: "Acompañan",
    provisional: "Provisional",
  },
  venue: {
    kicker: "Información general",
    title: "La sede.",
    lead: "La ubicación y los datos principales para llegar al encuentro.",
    mapsCta: "Abrir en Google Maps",
    accreditation: "Acreditación",
    accreditationLead:
      "Los horarios y requisitos de acreditación se informarán cuando estén confirmados.",
  },
  gallery: {
    kicker: "Rhinoscopy Meet 2026",
    title: "Galería.",
    lead: "Imágenes del encuentro en Buenos Aires.",
    nextSelection: "Ver siguiente selección",
    dayTabsAria: "Filtrar galería por jornada",
    dayLabel: (dayNumber: number) => `Día ${dayNumber}`,
    dayEmpty: "Próximamente más fotos de esta jornada.",
    prevSelectionAria: "Selección anterior",
    nextSelectionAria: "Siguiente selección",
    selectionLabel: (current: number, count: number) =>
      `Selección ${current} de ${count}`,
    closeLightbox: "Cerrar imagen",
    prevPhoto: "Foto anterior",
    nextPhoto: "Foto siguiente",
    photoAlt: "Rhinoscopy Meet 2026",
    lightboxBrandBold: "Rhinoscopy",
    lightboxBrandLight: "Meet 2026",
    lightboxTitleScript: "Buenos Aires",
    lightboxTitleDisplay: "Galería",
    swipeHint: "Deslizá para ver más fotos",
    seeMore: "Ver más",
    seeMoreAria: "Ver todas las fotos de la jornada en pantalla completa",
    swipeAria: "Galería de fotos. Deslizá horizontalmente.",
    photoInSelection: (current: number, inSelection: number) =>
      `${current} / ${inSelection}`,
  },
} as const;
