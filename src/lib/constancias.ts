import { readdir } from "node:fs/promises";
import path from "node:path";

export const CONSTANCIAS_PUBLIC_DIR = path.join(
  "images",
  "constancias",
);

const ROOT = path.join(process.cwd(), "public", CONSTANCIAS_PUBLIC_DIR);

export type ConstanciaMatch = {
  eventId: string;
  eventLabel: string;
  fileName: string;
  downloadUrl: string;
};

function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function extraTokens(value: string) {
  return fold(value)
    .split(/[^a-z0-9]+/)
    .filter((part) => part.length >= 2 && !/^\d+$/.test(part));
}

function eventLabel(folder: string) {
  return folder.replace(/[-_]+/g, " ");
}

export async function searchConstancias(
  matricula: string,
): Promise<ConstanciaMatch[]> {
  const number = digits(matricula);
  if (number.length < 3) return [];

  const requiredExtras = extraTokens(matricula);
  const numberPattern = new RegExp(`(?:^|[^0-9])${number}(?:$|[^0-9])`);

  let events: string[];
  try {
    const entries = await readdir(ROOT, { withFileTypes: true });
    events = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch {
    return [];
  }

  const matches: ConstanciaMatch[] = [];

  for (const eventId of events) {
    const dir = path.join(ROOT, eventId);
    const files = await readdir(dir);

    for (const fileName of files) {
      if (!fileName.toLowerCase().endsWith(".pdf")) continue;

      const haystack = fold(fileName.replace(/\.pdf$/i, "").replace(/[-_]+/g, " "));
      if (!numberPattern.test(haystack)) continue;
      if (!requiredExtras.every((token) => haystack.includes(token))) continue;

      matches.push({
        eventId,
        eventLabel: eventLabel(eventId),
        fileName,
        downloadUrl: `/${CONSTANCIAS_PUBLIC_DIR}/${eventId}/${encodeURIComponent(fileName)}`,
      });
    }
  }

  return matches.sort((a, b) => a.eventLabel.localeCompare(b.eventLabel, "es"));
}
