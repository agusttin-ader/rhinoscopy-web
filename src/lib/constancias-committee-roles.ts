import { congress2026Snapshot } from "@/data/congress-2026.snapshot";
import { parseMeet2026CertificateFile } from "@/lib/constancias-categories";

function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

const GENERIC_ATTENDEE_KEYS = new Set(["participacion", "asistente"]);

function isGenericAttendeeSuffix(
  meet: ReturnType<typeof parseMeet2026CertificateFile>,
) {
  if (!meet) return false;
  const key = fold(meet.typeSuffix).replace(/_/g, "");
  return GENERIC_ATTENDEE_KEYS.has(key);
}

function tokensFromPersonId(id: string) {
  return id.split("-").filter((part) => part.length >= 2);
}

function roleFromIdMatchers(
  haystack: string,
  matchers: { role: string; tokens: string[] }[],
): string | null {
  const folded = fold(haystack);
  for (const { role, tokens } of matchers) {
    if (tokens.length === 0) continue;
    if (tokens.every((token) => folded.includes(token))) return role;
  }
  return null;
}

/** Comité organizador: Presidente, Vicepresidente, Coordinadora… */
const COMMITTEE_MATCHERS = congress2026Snapshot.organizingCommittee.map(
  (member) => ({
    role: member.role,
    tokens: tokensFromPersonId(member.id),
  }),
);

/** Disertantes del Meet (snapshot del sitio del congreso). */
const SPEAKER_MATCHERS = congress2026Snapshot.speakers.map((speaker) => ({
  role:
    speaker.group === "international"
      ? "Disertante internacional"
      : "Disertante",
  tokens: tokensFromPersonId(speaker.id),
}));

export function committeeRoleFromCertificateHaystack(
  haystack: string,
): string | null {
  return roleFromIdMatchers(haystack, COMMITTEE_MATCHERS);
}

export function speakerRoleFromCertificateHaystack(
  haystack: string,
): string | null {
  return roleFromIdMatchers(haystack, SPEAKER_MATCHERS);
}

/**
 * Rol mostrado en el portal: sufijo explícito del PDF, luego comité, luego
 * disertantes del programa, y por último asistente (Participacion).
 */
export function resolveCertificateCategoryLabel(fileName: string): string {
  const meet = parseMeet2026CertificateFile(fileName);
  const haystack = fileName.replace(/\.pdf$/i, "").replace(/[-_]+/g, " ");

  if (meet && !isGenericAttendeeSuffix(meet)) {
    return meet.categoryLabel;
  }

  const committeeRole = committeeRoleFromCertificateHaystack(haystack);
  if (committeeRole) return committeeRole;

  const speakerRole = speakerRoleFromCertificateHaystack(haystack);
  if (speakerRole) return speakerRole;

  if (meet) return meet.categoryLabel;
  return "Certificado";
}
