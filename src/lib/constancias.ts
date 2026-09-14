import { readdir } from "node:fs/promises";
import path from "node:path";

export const CONSTANCIAS_PUBLIC_DIR = path.join(
  "images",
  "constancias",
);

const ROOT = path.join(process.cwd(), "public", CONSTANCIAS_PUBLIC_DIR);

export const MAX_CONSTANCIA_SEARCH_RESULTS = 40;

export type ConstanciaMatch = {
  eventId: string;
  eventLabel: string;
  fileName: string;
  displayName: string;
  downloadUrl: string;
};

export type ConstanciaSearchResult = {
  results: ConstanciaMatch[];
  total: number;
  truncated: boolean;
};

function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

function queryTokens(value: string) {
  return fold(value)
    .split(/[^a-z0-9]+/)
    .filter((part) => part.length >= 2);
}

function eventLabel(folder: string) {
  return folder.replace(/[-_]+/g, " ");
}

/** Invierte el slug del PDF a un nombre legible (heurística). */
export function displayNameFromCertificateFile(fileName: string): string {
  const base = fileName.replace(/\.pdf$/i, "");
  const parts = base.split("-").filter(Boolean);
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const p = parts.map(cap);
  if (p.length === 4) return `${p[2]} ${p[3]} ${p[0]} ${p[1]}`;
  if (p.length === 3) return `${p[2]} ${p[0]} ${p[1]}`;
  if (p.length === 2) return `${p[1]} ${p[0]}`;
  return p.join(" ");
}

export async function searchConstancias(
  query: string,
): Promise<ConstanciaSearchResult> {
  const tokens = queryTokens(query);
  if (tokens.length === 0) {
    return { results: [], total: 0, truncated: false };
  }

  let events: string[];
  try {
    const entries = await readdir(ROOT, { withFileTypes: true });
    events = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch {
    return { results: [], total: 0, truncated: false };
  }

  const matches: ConstanciaMatch[] = [];

  for (const eventId of events) {
    const dir = path.join(ROOT, eventId);
    const files = await readdir(dir);

    for (const fileName of files) {
      if (!fileName.toLowerCase().endsWith(".pdf")) continue;

      const haystack = fold(
        fileName.replace(/\.pdf$/i, "").replace(/[-_]+/g, " "),
      );
      if (!tokens.every((token) => haystack.includes(token))) continue;

      matches.push({
        eventId,
        eventLabel: eventLabel(eventId),
        fileName,
        displayName: displayNameFromCertificateFile(fileName),
        downloadUrl: `/${CONSTANCIAS_PUBLIC_DIR}/${eventId}/${encodeURIComponent(fileName)}`,
      });
    }
  }

  const sorted = matches.sort((a, b) =>
    a.displayName.localeCompare(b.displayName, "es", { sensitivity: "base" }),
  );
  const total = sorted.length;
  const truncated = total > MAX_CONSTANCIA_SEARCH_RESULTS;
  return {
    results: sorted.slice(0, MAX_CONSTANCIA_SEARCH_RESULTS),
    total,
    truncated,
  };
}
