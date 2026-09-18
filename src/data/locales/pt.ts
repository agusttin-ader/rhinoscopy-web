import type { LocaleData } from "@/data/locales/es";

export const pt = {
  copy: {
    kicker: "Comunidade de educação médica",
    heroTitle: "Um evento de endoscopia nasal pura.",
    heroAccent: "Rhinoscopy Meet 2026",
    heroLead:
      "Comunidade de educação médica dedicada à rinologia e atividades relacionadas.",
    heroNote: "Próximo encontro",
    heroMeetDates: "17, 18 e 19 de setembro",
    heroMeetVenue: "Hotel Cassa Lepage · Buenos Aires",
    heroMeetSubtitle: "Jornadas teórico-práticas",
    heroCta: "Contato",
    aboutKicker: "Lorem",
    aboutTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
    aboutP1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    aboutP2:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    teamKicker: "Lorem",
    teamTitle: "Lorem ipsum dolor sit amet.",
    teamLead:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    eventsKicker: "Lorem",
    eventsTitle: "Lorem ipsum",
    eventsLead:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    certKicker: "Certificados",
    certTitleScript: "Baixe",
    certTitleDisplay: "seu certificado",
    certLead:
      "Por enquanto, os certificados disponíveis são do Rhinoscopy Meet 2026. Busque por nome ou sobrenome e baixe o PDF.",
    certCta: "Buscar certificado",
    partnersKicker: "Lorem ipsum",
    contactKicker: "Contato",
    contactTitle: "Lorem ipsum dolor sit amet.",
    contactLead:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    footerBlurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
  },
  aboutCopy: {
    kicker: "Quem somos",
    titleScript: "Somos",
    titleDisplay: "Rhinoscopy",
    lead:
      "Comunidade de educação médica em otorrinolaringologia, rinologia, rinoscopia e endoscopia nasal, com base na Argentina e alcance para profissionais de toda a região.",
    paragraphs: [
      "Nascemos para aproximar formação de qualidade em rinologia e ORL: encontros presenciais, webinars ao vivo e conteúdo para cirurgia endoscópica nasal e prática clínica. No Instagram compartilhamos novidades do congresso, avisos de webinars e material da comunidade.",
    ],
    highlights: [
      "Rhinoscopy Meet — congresso de endoscopia nasal",
      "Webinars semanais com a comunidade",
      "Certificados de participação no Meet",
    ],
    instagramCta: "Ver no Instagram",
    instagramHandle: "@rhinoscopyofficial",
    instagramUrl: "https://www.instagram.com/rhinoscopyofficial/",
  },
  brandHeroCopy: {
    kicker: "Rhinoscopy Meet 2026",
    headlineImpact: "Formação de excelência em rinologia",
    tagline: "Comunidade de educação médica em rinologia e endoscopia nasal",
    lead:
      "Webinars, congresso e recursos para profissionais que buscam aprofundar endoscopia nasal e cirurgia rinológica.",
    ctaCongress: "Ver Congresso",
    ctaWebinars: "Ver Webinars",
  },
  contactCopy: {
    kicker: "Contato",
    titleScript: "Escreva",
    titleDisplay: "para nós",
    lead:
      "Dúvidas sobre o congresso, webinars ou certificados. Escolha WhatsApp ou e-mail e responderemos em breve.",
    whatsappCta: "Enviar por WhatsApp",
    emailCta: "Enviar por e-mail",
    nameLabel: "Nome",
    emailLabel: "E-mail",
    messageLabel: "Mensagem",
  },
  congressCopy: {
    kicker: "Rhinoscopy Meet 2026",
    title: "Um evento de endoscopia nasal pura.",
    lead: "Explore o programa, conheça os palestrantes e todas as informações do encontro.",
    program: {
      kicker: "Agenda científica",
      title: "Programa.",
      lead: "A programação completa está no programa oficial em PDF.",
      blocksScheduled: (n: number) =>
        n === 1 ? "1 bloco programado" : `${n} blocos programados`,
      scientificBlock: "Bloco científico",
      presentations: (n: number) =>
        n === 1 ? "1 apresentação" : `${n} apresentações`,
      roomSecretary: "Secretário de sala",
      coordinators: "Coordenam",
      globalAlert: "Aviso geral",
      pause: "Pausa",
      social: "Encontro",
      symposium: "Simpósio",
      activity: "Atividade",
      pdfTitle: "Programa original",
      pdfLead: "Consulte o documento completo fornecido pela organização.",
      pdfCta: "Abrir PDF",
    },
    speakers: {
      kicker: "Convidados",
      title: "Palestrantes.",
      lead: "Referências nacionais e internacionais que farão parte do encontro.",
      searchPlaceholder: "Buscar por nome ou sobrenome",
      filters: {
        all: "Todos",
        international: "Internacionais",
        national: "Nacionais",
      },
      count: (n: number) => (n === 1 ? "1 palestrante" : `${n} palestrantes`),
      groupCount: (n: number) =>
        n === 1 ? "1 profissional" : `${n} profissionais`,
      showMore: (n: number) =>
        n === 1 ? "Ver 1 profissional a mais +" : `Ver ${n} profissionais a mais +`,
      showLess: "Ver menos",
      empty: "Não encontramos palestrantes com essa busca.",
      moreSpeakers: (n: number) =>
        n === 1 ? "Ver 1 profissional a mais" : `Ver ${n} profissionais a mais`,
      international: "Palestrante internacional",
      national: "Palestrante nacional",
    },
    committee: {
      kicker: "Rhinoscopy Meet 2026",
      title: "Comitê organizador.",
      lead: "A equipe que acompanha o planejamento e a coordenação do encontro.",
    },
    sponsors: {
      kicker: "Obrigado por tornar possível",
      title: "Patrocinadores.",
      lead: "Empresas e entidades que fazem parte do Rhinoscopy Meet 2026.",
      companiesLabel: "Empresas",
      companiesTitle: "Patrocinam",
      partnersLabel: "Entidades profissionais",
      partnersTitle: "Acompanham",
      provisional: "Provisório",
    },
    venue: {
      kicker: "Informações gerais",
      title: "A sede.",
      lead: "Localização e dados principais para chegar ao encontro.",
      mapsCta: "Abrir no Google Maps",
      accreditation: "Credenciamento",
      accreditationLead:
        "Horários e requisitos de credenciamento serão informados quando confirmados.",
    },
    gallery: {
      kicker: "Rhinoscopy Meet 2026",
      title: "Galeria.",
      lead: "Imagens do encontro em Buenos Aires.",
      nextSelection: "Ver próxima seleção",
      dayTabsAria: "Filtrar galeria por dia",
      dayLabel: (dayNumber: number) => `Dia ${dayNumber}`,
      dayEmpty: "Em breve, mais fotos desta jornada.",
      prevSelectionAria: "Seleção anterior",
      nextSelectionAria: "Próxima seleção",
      selectionLabel: (current: number, count: number) =>
        `Seleção ${current} de ${count}`,
      closeLightbox: "Fechar imagem",
      prevPhoto: "Foto anterior",
      nextPhoto: "Próxima foto",
      photoAlt: "Rhinoscopy Meet 2026",
      lightboxBrandBold: "Rhinoscopy",
      lightboxBrandLight: "Meet 2026",
      lightboxTitleScript: "Buenos Aires",
      lightboxTitleDisplay: "Galeria",
      swipeHint: "Deslize para ver mais fotos",
      swipeAria: "Galeria de fotos. Deslize na horizontal.",
      photoInSelection: (current: number, inSelection: number) =>
        `${current} / ${inSelection}`,
    },
  },
  constanciasCopy: {
    kicker: "Certificados",
    titleScript: "Baixe",
    titleDisplay: "seu certificado",
    lead:
      "Certificados do Rhinoscopy Meet 2026. Busque por nome ou sobrenome e baixe o PDF.",
    backToHome: "← Início",
    availableEvent: "Rhinoscopy Meet 2026",
    nameLabel: "Nome ou sobrenome",
    nameHint: "Ex.: López, Nicolás, Rodríguez… Mostramos todas as coincidências.",
    namePlaceholder: "Sobrenome ou nome",
    searchCta: "Buscar certificado",
    searching: "Buscando…",
    privacyNote:
      "Usamos sua busca apenas para localizar certificados em nossos arquivos.",
    footnote:
      "Se não aparecer nenhum resultado, tente outro sobrenome ou entre em contato.",
    contactCta: "Ir para contato",
    emptyTitle: "Não encontramos certificados",
    emptyBody:
      "Não há certificados com esse critério. Tente com menos letras ou outro sobrenome.",
    resultTitle: "Certificado de participação",
    viewCta: "Ver certificado",
    downloadCta: "Baixar PDF",
    resultsCount: (n: number) =>
      n === 1 ? "1 certificado" : `${n} certificados`,
    resultsTruncated: (shown: number, total: number) =>
      `Mostramos ${shown} de ${total}. Refine a busca (nome e sobrenome).`,
    connectionError: "Houve um problema de conexão. Tente novamente.",
    searchError: "Não foi possível completar a busca.",
    comingSoon: {
      titleScript: "Em breve",
      titleDisplay: "Certificados do Meet 2026",
      statusLine: "Preparando o acesso",
    },
  },
  footerCopy: {
    navTitle: "Site",
    meetTitle: "Rhinoscopy Meet 2026",
    contactTitle: "Contato",
    followTitle: "Siga-nos",
    blurb:
      "Comunidade de educação médica em rinologia e endoscopia nasal. Webinars, congresso e formação continuada.",
    legal:
      "Educação médica. Os conteúdos do site são informativos e não substituem o critério profissional.",
  },
  webinarsCopy: {
    kicker: "Rhinoscopy",
    titleDisplay: "Webinars",
    titleScript: "ao vivo",
    lead:
      "Palestras semanais com especialistas da comunidade. Os vídeos no YouTube serão adicionados conforme estiverem prontos.",
    watchCta: "Ver no YouTube",
    comingSoon: "YouTube — em breve",
    instagramCta: "Ver no Instagram",
    sourceNote:
      "Biblioteca reconstruída a partir do Instagram (@rhinoscopyofficial / @dr.lopezmoris.rinologia). Palestras anteriores podem não estar indexadas.",
    showLess: "Ver menos",
    moreWebinars: (n: number) =>
      n === 1 ? "Ver 1 webinar a mais" : `Ver ${n} webinars a mais`,
    visibleIntro: "Últimos webinars",
  },
  nav: {
    congress: "Congresso",
    webinars: "Webinars",
    certificates: "Certificados",
    contact: "Contato",
    contactCta: "Contato",
  },
  footerNav: [
    { href: "/#congreso", label: "Congresso" },
    { href: "/#programa", label: "Programa" },
    { href: "/#speakers", label: "Palestrantes" },
    { href: "/#galeria", label: "Galeria" },
    { href: "/#webinars", label: "Webinars" },
    { href: "/constancias", label: "Certificados" },
    { href: "/#contacto", label: "Contato" },
  ],
  meetPresentation: {
    congressPrefix: "Congresso",
    whenLabel: "Quando",
    whenValue: "17—19 Set",
    whereLabel: "Onde",
    whereValue: "Buenos Aires",
    activitiesCta: "Ver atividades",
  },
  mobileNav: {
    menu: "Menu",
    open: "Abrir menu",
    close: "Fechar menu",
  },
  language: {
    label: "Idioma",
    es: "Español",
    en: "English",
    pt: "Português",
  },
  siteTagline: "Otorrinolaringologia, rinologia e rinoscopia.",
  meet2026: {
    title: "Rhinoscopy Meet 2026",
    dates: "17, 18 e 19 de setembro",
    venue: "Hotel Cassa Lepage",
    city: "Buenos Aires, Argentina",
  },
  whatsapp: {
    defaultMessage: "Olá, gostaria de consultar sobre a Rhinoscopy.",
  },
  meta: {
    home: {
      title: "Rhinoscopy | Otorrinolaringologia, rinologia e rinoscopia",
      description:
        "Rhinoscopy é formação em otorrinolaringologia (ORL), rinologia, rinoscopia e endoscopia nasal: webinars, cirurgia rinológica, congresso Meet 2026 e recursos para profissionais.",
      keywords: [
        "Rhinoscopy",
        "rinoscopia",
        "rhinoscopy",
        "otorrinolaringologia",
        "ORL",
        "rinologia",
        "endoscopia nasal",
        "cirurgia rinológica",
        "seios paranasais",
        "congresso rinologia",
        "Rhinoscopy Meet 2026",
        "webinars médicos",
        "Buenos Aires",
      ],
    },
    constancias: {
      title: "Certificados | Rhinoscopy",
      description:
        "Certificados de participação do Rhinoscopy Meet 2026 para otorrinolaringologistas e profissionais de rinologia.",
      keywords: [
        "certificado Rhinoscopy",
        "congresso ORL",
        "Rhinoscopy Meet 2026",
        "rinologia",
        "otorrinolaringologia",
      ],
    },
  },
  api: {
    constanciasMinLength: "Digite pelo menos 2 letras do nome ou sobrenome.",
  },
  committeeRoles: {
    Presidente: "Presidente",
    Vicepresidente: "Vice-presidente",
    Coordinadora: "Coordenadora",
  },
  committeeRolesByMemberId: {
    "carlos-lopez-moris": "Presidente",
    "guido-hocsman": "Vice-presidente",
    "belen-domeg-lizardo": "Coordenadora",
  },
  footerPage: {
    viewCongress: "Ver congresso",
    rightsReserved: "Todos os direitos reservados.",
    developedBy: "Desenvolvido por",
  },
} as unknown as LocaleData;
