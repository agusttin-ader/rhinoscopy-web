export const constanciasCopy = {
  kicker: "Certificados",
  titleScript: "Descargá",
  titleDisplay: "tu certificado",
  lead:
    "Certificados del Rhinoscopy Meet 2026. Buscá por nombre o apellido y descargá el PDF.",
  backToHome: "← Inicio",
  availableEvent: "Rhinoscopy Meet 2026",
  nameLabel: "Nombre o apellido",
  nameHint: "Ej.: López, Belen, Domeg… Mostramos todas las coincidencias.",
  namePlaceholder: "Apellido o nombre",
  searchCta: "Buscar certificado",
  searching: "Buscando…",
  privacyNote:
    "Usamos tu búsqueda solo para localizar certificados en nuestros archivos.",
  footnote:
    "Si no aparece ningún resultado, probá otro apellido o escribinos por contacto.",
  contactCta: "Ir a contacto",
  emptyTitle: "No encontramos certificados",
  emptyBody:
    "No hay certificados con ese criterio. Probá con menos letras o otro apellido.",
  resultTitle: "Certificado de asistencia",
  viewCta: "Ver certificado",
  downloadCta: "Descargar PDF",
  resultsCount: (n: number) =>
    n === 1 ? "1 certificado" : `${n} certificados`,
  resultsTruncated: (shown: number, total: number) =>
    `Mostramos ${shown} de ${total}. Acotá la búsqueda (nombre y apellido).`,
  connectionError: "Hubo un problema de conexión. Intentá de nuevo.",
  searchError: "No se pudo completar la búsqueda.",
} as const;
