import { congress2026Snapshot } from "@/data/congress-2026.snapshot";

export const congress = congress2026Snapshot;

export type ProgramSession = {
  id: string;
  start: string;
  end: string;
  title: string;
  kind?: string;
  notification?: string;
  chairs?: readonly string[];
  secretaryText?: string;
  coordinators?: readonly string[];
  coordinatorText?: string;
  items?: readonly (readonly [string, string])[];
  description?: string;
  meta?: string;
};

export type ProgramDay = {
  id: string;
  date: string;
  label: string;
  shortLabel: string;
  sessions: ProgramSession[];
};

export const congressProgram = congress.program as unknown as ProgramDay[];

export const ASSETS_BASE = "https://krucho.github.io/rhinoscopy/assets";

export const countryCodes: Record<string, string> = {
  Argentina: "ar",
  Brasil: "br",
  Chile: "cl",
  Ecuador: "ec",
  Paraguay: "py",
  "Perú": "pe",
  Uruguay: "uy",
};

export const sponsorLogoList = [
  { src: "/images/sponsors/cassara.webp", alt: "Cassará" },
  { src: "/images/sponsors/caparra.webp", alt: "Claudio Caparra" },
  { src: "/images/sponsors/gsk.webp", alt: "GSK" },
  { src: "/images/sponsors/pam.webp", alt: "PAM Argentina" },
  { src: "/images/sponsors/coa-medical.webp", alt: "COA Medical" },
  { src: "/images/sponsors/johnson-johnson.webp", alt: "Johnson & Johnson" },
  { src: "/images/sponsors/sanofi.webp", alt: "Sanofi" },
  { src: "/images/sponsors/ovimed.webp", alt: "OviMed", provisional: true },
  {
    src: "/images/sponsors/dona-eustaquia.webp",
    alt: "Doña Eustaquia Fonoartículos",
    provisional: true,
  },
] as const;

export function normalizePersonName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/^\s*(?:(?:dr|dra|prof)\.?\s+)+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function speakerPhotoUrl(image: string, folder = "speakers") {
  return `${ASSETS_BASE}/${folder}/${image}`;
}

export function flagUrl(country: string) {
  const code = countryCodes[country];
  return code ? `${ASSETS_BASE}/flags/${code}.svg` : null;
}

