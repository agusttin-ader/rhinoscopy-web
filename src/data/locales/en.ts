import type { LocaleData } from "@/data/locales/es";

export const en = {
  copy: {
    kicker: "Medical education community",
    heroTitle: "A pure nasal endoscopy event.",
    heroAccent: "Rhinoscopy Meet 2026",
    heroLead:
      "Medical education community dedicated to rhinology and related activities.",
    heroNote: "Upcoming event",
    heroMeetDates: "September 17, 18 and 19",
    heroMeetVenue: "Hotel Cassa Lepage · Buenos Aires",
    heroMeetSubtitle: "Theoretical and practical sessions",
    heroCta: "Contact",
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
    certKicker: "Certificates",
    certTitleScript: "Download",
    certTitleDisplay: "your certificate",
    certLead:
      "Certificates currently available are from Rhinoscopy Meet 2026. Search by first or last name and download the PDF.",
    certCta: "Find certificate",
    partnersKicker: "Lorem ipsum",
    contactKicker: "Contact",
    contactTitle: "Lorem ipsum dolor sit amet.",
    contactLead:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    footerBlurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
  },
  aboutCopy: {
    kicker: "About us",
    titleScript: "We are",
    titleDisplay: "Rhinoscopy",
    lead:
      "A medical education community in otolaryngology, rhinology, rhinoscopy and nasal endoscopy, based in Argentina and open to ENT professionals across the region.",
    paragraphs: [
      "We bring quality training in rhinology and otolaryngology closer: in-person meetings, live webinars, and content for endoscopic sinus surgery and daily ORL practice. On Instagram we share congress updates, webinar announcements, and community news.",
    ],
    highlights: [
      "Rhinoscopy Meet — nasal endoscopy congress",
      "Weekly webinars with the community",
      "Attendance certificates for the Meet",
    ],
    instagramCta: "View on Instagram",
    instagramHandle: "@rhinoscopyofficial",
    instagramUrl: "https://www.instagram.com/rhinoscopyofficial/",
  },
  brandHeroCopy: {
    kicker: "Rhinoscopy Meet 2026",
    headlineImpact: "Excellence in rhinology training",
    tagline: "Medical education community in rhinology and nasal endoscopy",
    lead:
      "Webinars, congress, and resources for professionals who want to deepen their practice in nasal endoscopy and rhinologic surgery.",
    ctaCongress: "View Congress",
    ctaWebinars: "View Webinars",
  },
  contactCopy: {
    kicker: "Contact",
    titleScript: "Write",
    titleDisplay: "to us",
    lead:
      "Questions about the congress, webinars, or certificates. Choose WhatsApp or email and we will get back to you soon.",
    whatsappCta: "Send via WhatsApp",
    emailCta: "Send via email",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
  },
  congressCopy: {
    kicker: "Rhinoscopy Meet 2026",
    title: "A pure nasal endoscopy event.",
    lead: "Explore the program, meet the speakers, and find all event information.",
    family: {
      kicker: "Community",
      titleScript: "Family",
      titleDisplay: "Rhinoscopy",
      lead:
        "Organizers, faculty, and professionals who shaped Meet 2026 in Buenos Aires.",
      imageAlt:
        "Rhinoscopy community group on stage at Meet 2026 in Buenos Aires",
    },
    program: {
      kicker: "Scientific agenda",
      title: "Program.",
      lead: "The full schedule is available in the official PDF program.",
      blocksScheduled: (n: number) =>
        n === 1 ? "1 scheduled block" : `${n} scheduled blocks`,
      scientificBlock: "Scientific block",
      presentations: (n: number) =>
        n === 1 ? "1 presentation" : `${n} presentations`,
      roomSecretary: "Room secretary",
      coordinators: "Coordinated by",
      globalAlert: "General notice",
      pause: "Break",
      social: "Social event",
      symposium: "Symposium",
      activity: "Activity",
      pdfTitle: "Original program",
      pdfLead: "View the full document provided by the organizers.",
      pdfCta: "Open PDF",
    },
    speakers: {
      kicker: "Guests",
      title: "Speakers.",
      lead: "National and international leaders taking part in the event.",
      searchPlaceholder: "Search by first or last name",
      filters: {
        all: "All",
        international: "International",
        national: "National",
      },
      count: (n: number) => (n === 1 ? "1 speaker" : `${n} speakers`),
      groupCount: (n: number) =>
        n === 1 ? "1 professional" : `${n} professionals`,
      showMore: (n: number) =>
        n === 1 ? "View 1 more professional +" : `View ${n} more professionals +`,
      showLess: "Show less",
      empty: "No speakers match your search.",
      moreSpeakers: (n: number) =>
        n === 1 ? "View 1 more professional" : `View ${n} more professionals`,
      international: "International speaker",
      national: "National speaker",
    },
    committee: {
      kicker: "Rhinoscopy Meet 2026",
      title: "Organizing committee.",
      lead: "The team supporting planning and coordination of the event.",
    },
    sponsors: {
      kicker: "Thank you for making it possible",
      title: "Sponsors.",
      lead: "Companies and institutions part of Rhinoscopy Meet 2026.",
      companiesLabel: "Companies",
      companiesTitle: "Sponsors",
      partnersLabel: "Professional entities",
      partnersTitle: "Partners",
      provisional: "Provisional",
    },
    venue: {
      kicker: "General information",
      title: "Venue.",
      lead: "Location and key details to get to the event.",
      mapsCta: "Open in Google Maps",
      accreditation: "Accreditation",
      accreditationLead:
        "Accreditation hours and requirements will be announced when confirmed.",
    },
    gallery: {
      kicker: "Rhinoscopy Meet 2026",
      title: "Gallery.",
      lead: "Photos from the event in Buenos Aires.",
      nextSelection: "See next selection",
      dayTabsAria: "Filter gallery by day",
      dayLabel: (dayNumber: number) => `Day ${dayNumber}`,
      dayEmpty: "More photos from this day coming soon.",
      prevSelectionAria: "Previous selection",
      nextSelectionAria: "Next selection",
      selectionLabel: (current: number, count: number) =>
        `Selection ${current} of ${count}`,
      closeLightbox: "Close image",
      prevPhoto: "Previous photo",
      nextPhoto: "Next photo",
      photoAlt: "Rhinoscopy Meet 2026",
      lightboxBrandBold: "Rhinoscopy",
      lightboxBrandLight: "Meet 2026",
      lightboxTitleScript: "Buenos Aires",
      lightboxTitleDisplay: "Gallery",
      swipeHint: "Swipe to see more photos",
      seeMore: "See more",
      seeMoreAria: "View all photos from this day in full screen",
      swipeAria: "Photo gallery. Swipe horizontally.",
      photoInSelection: (current: number, inSelection: number) =>
        `${current} / ${inSelection}`,
    },
  },
  constanciasCopy: {
    kicker: "Certificates",
    titleScript: "Download",
    titleDisplay: "your certificate",
    lead:
      "Rhinoscopy Meet 2026 certificates. Search by first or last name and download the PDF.",
    backToHome: "← Home",
    availableEvent: "Rhinoscopy Meet 2026",
    nameLabel: "First or last name",
    nameHint: "E.g. Lopez, Nicolas, Rodriguez… We show all matches.",
    namePlaceholder: "Last or first name",
    searchCta: "Find certificate",
    searching: "Searching…",
    privacyNote:
      "We use your search only to locate certificates in our files.",
    footnote:
      "If nothing appears, try another last name or contact us.",
    contactCta: "Go to contact",
    emptyTitle: "No certificates found",
    emptyBody:
      "No certificates match that search. Try fewer letters or another last name.",
    resultTitle: "Certificate of attendance",
    viewCta: "View certificate",
    downloadCta: "Download PDF",
    resultsCount: (n: number) =>
      n === 1 ? "1 certificate" : `${n} certificates`,
    resultsTruncated: (shown: number, total: number) =>
      `Showing ${shown} of ${total}. Narrow your search (first and last name).`,
    connectionError: "Connection problem. Please try again.",
    searchError: "Search could not be completed.",
    comingSoon: {
      titleScript: "Coming soon",
      titleDisplay: "Meet 2026 certificates",
      statusLine: "Preparing access",
    },
  },
  footerCopy: {
    navTitle: "Site",
    meetTitle: "Rhinoscopy Meet 2026",
    contactTitle: "Contact",
    followTitle: "Follow us",
    blurb:
      "Medical education community in rhinology and nasal endoscopy. Webinars, congress, and continuing education.",
    legal:
      "Medical education. Site content is informational and does not replace professional judgment.",
  },
  webinarsCopy: {
    kicker: "Rhinoscopy",
    titleDisplay: "Webinars",
    titleScript: "live",
    lead:
      "Weekly talks with community specialists. YouTube videos will be added as they become available.",
    watchCta: "Watch webinar",
    watchCtaAria: (topic: string) => `Play: ${topic}`,
    comingSoon: "YouTube — coming soon",
    openOnYoutube: "Open on YouTube",
    closePlayer: "Close player",
    instagramCta: "View on Instagram",
    sourceNote:
      "Library rebuilt from Instagram (@rhinoscopyofficial / @dr.lopezmoris.rinologia). Earlier talks may not be indexed.",
    showLess: "Show less",
    moreWebinars: (n: number) =>
      n === 1 ? "View 1 more webinar" : `View ${n} more webinars`,
    visibleIntro: "Latest webinars",
  },
  nav: {
    congress: "Congress",
    webinars: "Webinars",
    certificates: "Certificates",
    contact: "Contact",
    contactCta: "Contact",
  },
  footerNav: [
    { href: "/#congreso", label: "Congress" },
    { href: "/#programa", label: "Program" },
    { href: "/#speakers", label: "Speakers" },
    { href: "/#galeria", label: "Gallery" },
    { href: "/#webinars", label: "Webinars" },
    { href: "/constancias", label: "Certificates" },
    { href: "/#contacto", label: "Contact" },
  ],
  meetPresentation: {
    congressPrefix: "Congress",
    whenLabel: "When",
    whenValue: "Sept 17—19",
    whereLabel: "Where",
    whereValue: "Buenos Aires",
    activitiesCta: "View activities",
  },
  mobileNav: {
    menu: "Menu",
    open: "Open menu",
    close: "Close menu",
  },
  language: {
    label: "Language",
    es: "Español",
    en: "English",
    pt: "Português",
  },
  siteTagline: "Otolaryngology, rhinology and rhinoscopy.",
  meet2026: {
    title: "Rhinoscopy Meet 2026",
    dates: "September 17, 18 and 19",
    venue: "Hotel Cassa Lepage",
    city: "Buenos Aires, Argentina",
  },
  whatsapp: {
    defaultMessage: "Hello, I would like to ask about Rhinoscopy.",
  },
  meta: {
    home: {
      title: "Rhinoscopy | Otolaryngology, rhinology and rhinoscopy",
      description:
        "Rhinoscopy is medical education for otolaryngologists (ENT): rhinology, rhinoscopy, nasal endoscopy and endoscopic sinus surgery. Webinars, Rhinoscopy Meet congress, and clinical resources.",
      keywords: [
        "Rhinoscopy",
        "rhinoscopy",
        "otolaryngology",
        "ENT",
        "rhinology",
        "nasal endoscopy",
        "endoscopic sinus surgery",
        "paranasal sinuses",
        "skull base endoscopy",
        "rhinology congress",
        "Rhinoscopy Meet 2026",
        "medical webinars",
        "Buenos Aires",
      ],
    },
    constancias: {
      title: "Certificates | Rhinoscopy",
      description:
        "Rhinoscopy Meet 2026 attendance certificates for otolaryngologists and rhinology professionals.",
      keywords: [
        "Rhinoscopy certificate",
        "ENT congress certificate",
        "Rhinoscopy Meet 2026",
        "rhinology",
        "otolaryngology",
      ],
    },
  },
  api: {
    constanciasMinLength: "Enter at least 2 letters of the first or last name.",
  },
  committeeRoles: {
    Presidente: "President",
    Vicepresidente: "Vice President",
    Coordinadora: "Coordinator",
  },
  committeeRolesByMemberId: {
    "carlos-lopez-moris": "President",
    "guido-hocsman": "Vice President",
    "belen-domeg-lizardo": "Coordinator",
  },
  footerPage: {
    viewCongress: "View congress",
    rightsReserved: "All rights reserved.",
    developedBy: "Developed by",
  },
} as unknown as LocaleData;
