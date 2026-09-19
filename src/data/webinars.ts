/** Webinars Rhinoscopy — listado desde flyers @rhinoscopyofficial (abr.–sept. 2026). */
export type Webinar = {
  id: string;
  topic: string;
  speaker: string;
  dateLabel: string;
  /** Flyer guardado en /public (desde Instagram) */
  flyerSrc: string;
  /** Vacío = placeholder hasta publicar en YouTube */
  youtubeUrl: string;
  instagramUrl: string;
};

export const webinarsCopy = {
  kicker: "Rhinoscopy",
  titleDisplay: "Webinars",
  titleScript: "en vivo",
  lead:
    "Charlas semanales con especialistas de la comunidad. Los videos en YouTube se irán sumando a medida que estén listos.",
  watchCta: "Ver en YouTube",
  comingSoon: "YouTube — próximamente",
  instagramCta: "Ver en Instagram",
  sourceNote:
    "Biblioteca reconstruida desde Instagram (@rhinoscopyofficial / @dr.lopezmoris.rinologia). Puede haber charlas anteriores no indexadas.",
  showLess: "Ver menos",
  moreWebinars: (n: number) =>
    n === 1 ? "Ver 1 webinar más" : `Ver ${n} webinars más`,
  visibleIntro: "Últimos webinars",
} as const;

/** Cuántos se muestran antes del desplegable */
export const webinarsVisibleCount = 3;

/** Más reciente primero (temporada 2026 en IG). */
export const webinars: Webinar[] = [
  {
    id: "poliposis-nasosinusal",
    topic: "Manejo quirúrgico de la poliposis nasosinusal",
    speaker: "Dr. Carlos López Moris",
    dateLabel: "Jueves 10 de septiembre",
    flyerSrc: "/images/webinars/poliposis-nasosinusal.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/reel/DdE7QUBuwk-/",
  },
  {
    id: "otoplastia-pabellones",
    topic: "Otoplastia en pabellones en asa",
    speaker: "Dr. Ernesto Desio",
    dateLabel: "Jueves 3 de septiembre",
    flyerSrc: "/images/webinars/otoplastia-pabellones.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/Dcv3YYEuzf_/",
  },
  {
    id: "sinusitis-odontogena",
    topic: "Sinusitis odontógena",
    speaker: "Dr. Carlos Marino",
    dateLabel: "Jueves 27 de agosto",
    flyerSrc: "/images/webinars/sinusitis-odontogena.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DceoROch3wy/",
  },
  {
    id: "transorbitarios-arteaga",
    topic: "Abordajes endoscópicos transorbitarios: revisión, clasificación y actualización",
    speaker: "Dra. Patricia Arteaga",
    dateLabel: "Jueves 20 de agosto",
    flyerSrc: "/images/webinars/transorbitarios-arteaga.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DcOUfHmuSaS/",
  },
  {
    id: "valvula-nasal-cpap",
    topic: "Válvula nasal y terapia con CPAP",
    speaker: "Dr. Rodolfo Lugo Saldaña",
    dateLabel: "Jueves 13 de agosto",
    flyerSrc: "/images/webinars/valvula-nasal-cpap.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/Db6OoZ1O-RU/",
  },
  {
    id: "accesos-transorbitarios",
    topic: "Accesos endoscópicos transorbitarios",
    speaker: "Dr. Daniel Paez Moya",
    dateLabel: "Jueves 6 de agosto",
    flyerSrc: "/images/webinars/accesos-transorbitarios.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DbnjByZOKhJ/",
  },
  {
    id: "piel-gruesa-punta-nasal",
    topic: "Manejo de la piel gruesa: definición y soporte de la punta nasal",
    speaker: "Dr. Jonathan Cordero",
    dateLabel: "Jueves 30 de julio",
    flyerSrc: "/images/webinars/piel-gruesa-punta-nasal.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DbT5le_hJVP/",
  },
  {
    id: "dorso-nasal-sousa",
    topic: "Tratamiento del dorso nasal: un abordaje escultural",
    speaker: "Dr. Renato Sousa",
    dateLabel: "Jueves 23 de julio",
    flyerSrc: "/images/webinars/dorso-nasal-sousa.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DbBwosuhq3E/",
  },
  {
    id: "oxigeno-hiperbarico-yapur",
    topic: "Oxígeno terapia hiperbárica en complicaciones de rellenos faciales",
    speaker: "Dr. Javier Yapur",
    dateLabel: "Jueves 16 de julio",
    flyerSrc: "/images/webinars/oxigeno-hiperbarico-yapur.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/Da0asdMOlNt/",
  },
  {
    id: "abordaje-endonasal-tepedino",
    topic: "Abordaje endoscópico endonasal basado en anatomía y estrategias quirúrgicas",
    speaker: "Dr. Miguel Tepedino",
    dateLabel: "Jueves 25 de junio",
    flyerSrc: "/images/webinars/abordaje-endonasal-tepedino.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DZ-MMGQuj8E/",
  },
  {
    id: "rehabilitacion-respiratoria-nasal",
    topic: "Rehabilitación respiratoria nasal tras cirugía funcional",
    speaker: "Dr. Raúl Martínez Vite",
    dateLabel: "Jueves 11 de junio",
    flyerSrc: "/images/webinars/rehabilitacion-respiratoria-nasal.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DZYWwT7BePd/",
  },
  {
    id: "endo-dcr",
    topic: "Endo-DCR: de la consulta al quirófano",
    speaker: "Dr. Matías García",
    dateLabel: "Jueves 4 de junio",
    flyerSrc: "/images/webinars/endo-dcr.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DZITq9WuNHk/",
  },
  {
    id: "fosa-pterigopalatina",
    topic: "Cirugía de fosa pterigopalatina / fosa infratemporal",
    speaker: "Dr. Juan Ramón Curi",
    dateLabel: "Jueves 28 de mayo",
    flyerSrc: "/images/webinars/fosa-pterigopalatina.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DY2zjX7B_iE/",
  },
  {
    id: "revision-rinosinusal",
    topic: "Desafíos y causas de revisión en cirugía endoscópica rinosinusal",
    speaker: "Dra. Valeria Cugnu",
    dateLabel: "Jueves 21 de mayo",
    flyerSrc: "/images/webinars/revision-rinosinusal.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DYj2ZyfOnbN/",
  },
  {
    id: "septoplastia-endoscopica",
    topic: "Septoplastia endoscópica: utilidades en rinoplastia y desvíos posteriores",
    speaker: "Dr. Marcel Dauvallle Ceballos",
    dateLabel: "Jueves 14 de mayo",
    flyerSrc: "/images/webinars/septoplastia-endoscopica.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DYQG6orB212/",
  },
  {
    id: "perforaciones-septales",
    topic: "Perforaciones septales",
    speaker: "Dr. Pablo Fernández",
    dateLabel: "Jueves 7 de mayo",
    flyerSrc: "/images/webinars/perforaciones-septales.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DYAL_7fjjG6/",
  },
  {
    id: "derecho-salud",
    topic: "Derecho a la salud y acceso de los pacientes",
    speaker: "Federico Ferrari",
    dateLabel: "Jueves 23 de abril",
    flyerSrc: "/images/webinars/derecho-salud.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DXXUSSEDtQV/",
  },
  {
    id: "laterorrinia-cajelli-diorio",
    topic: "Laterorrinias por preservación de dorso y rinoplastia en piel gruesa",
    speaker: "Dra. Laura Cajelli y Dra. Romina Di Iorio",
    dateLabel: "Jueves 9 de abril",
    flyerSrc: "/images/webinars/laterorrinia-cajelli-diorio.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DW4CXuuDm3s/",
  },
  {
    id: "redes-sociales-santos",
    topic: "Las redes sociales como aliadas en tu consultorio médico",
    speaker: "Lic. Soledad Santos",
    dateLabel: "Jueves 6 de noviembre",
    flyerSrc: "/images/webinars/redes-sociales-santos.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DQmbp6qDrRj/",
  },
  {
    id: "preservacion-doble-chinski",
    topic: "Preservación con doble reemplazo",
    speaker: "Dr. Hernán Chinski",
    dateLabel: "Jueves 31 de julio",
    flyerSrc: "/images/webinars/preservacion-doble-chinski.webp",
    youtubeUrl: "",
    instagramUrl: "https://www.instagram.com/p/DMoQkZcu4uN/",
  },
];
