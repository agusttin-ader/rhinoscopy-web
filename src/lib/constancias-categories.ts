/** Sufijos de archivo (sin acentos) → etiqueta visible en el portal. */
export const CERTIFICATE_TYPE_BY_SUFFIX: Record<string, string> = {
  participacion: "Asistente",
  asistente: "Asistente",
  disertante: "Disertante",
  disertanteinternacional: "Disertante internacional",
  disertante_internacional: "Disertante internacional",
  autoria: "Autor",
  autor: "Autor",
  premio: "Premio",
  coordinadora: "Coordinadora",
  secretaria: "Secretaria",
  presidente: "Presidente",
  vicepresidente: "Vicepresidente",
};

const TYPE_SUFFIX_KEYS = Object.keys(CERTIFICATE_TYPE_BY_SUFFIX).sort(
  (a, b) => b.length - a.length,
);

const HONORIFICS = new Set(["dr", "dra", "prof"]);

function foldSegment(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

function titleCaseWord(word: string) {
  if (!word) return word;
  const lower = word.toLowerCase();
  if (
    lower.length <= 3 &&
    /^[a-z]+$/.test(lower) &&
    lower !== "de" &&
    lower !== "del"
  ) {
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function titleCaseName(parts: string[]) {
  return parts.map(titleCaseWord).join(" ");
}

function honorificLabel(token: string) {
  const key = foldSegment(token);
  if (key === "dr") return "Dr.";
  if (key === "dra") return "Dra.";
  if (key === "prof") return "Prof.";
  return `${titleCaseWord(token)}.`;
}

function formatPersonName(nameParts: string[]) {
  if (nameParts.length === 0) return "";
  if (nameParts.length > 1 && HONORIFICS.has(foldSegment(nameParts[0]!))) {
    const prefix = honorificLabel(nameParts[0]!);
    return `${prefix} ${titleCaseName(nameParts.slice(1))}`;
  }
  return titleCaseName(nameParts);
}

function lookupCategory(typeKey: string, rawSuffix: string) {
  return (
    CERTIFICATE_TYPE_BY_SUFFIX[typeKey] ??
    CERTIFICATE_TYPE_BY_SUFFIX[rawSuffix.toLowerCase()] ??
    titleCaseWord(rawSuffix)
  );
}

/** Roles con mayor jerarquía visual en el listado. */
export function isFeaturedCertificateRole(categoryLabel: string) {
  return (
    categoryLabel === "Presidente" ||
    categoryLabel === "Vicepresidente" ||
    categoryLabel === "Coordinadora" ||
    categoryLabel === "Secretaria" ||
    categoryLabel === "Premio"
  );
}

function splitNameAndType(segments: string[]) {
  for (const key of TYPE_SUFFIX_KEYS) {
    const keyParts = key.includes("_") ? key.split("_") : [key];
    if (segments.length <= keyParts.length) continue;

    const tail = segments.slice(-keyParts.length);
    const tailCompact = tail.map(foldSegment).join("");
    const tailUnderscored = tail.map(foldSegment).join("_");

    if (tailCompact === key || tailUnderscored === key) {
      return {
        nameParts: segments.slice(0, -keyParts.length),
        typeKey: key,
        rawSuffix: tail.join("_"),
      };
    }
  }

  const rawSuffix = segments[segments.length - 1]!;
  const typeKey = foldSegment(rawSuffix);
  return {
    nameParts: segments.slice(0, -1),
    typeKey,
    rawSuffix,
  };
}

/**
 * Parsea nombres del lote Meet 2026: `005_Agustina_Garay_Participacion.pdf`
 * o `012_Nombre_Disertante_Internacional.pdf`
 */
export function parseMeet2026CertificateFile(fileName: string): {
  displayName: string;
  categoryLabel: string;
  typeSuffix: string;
} | null {
  const base = fileName.replace(/\.pdf$/i, "");
  const withoutIndex = base.replace(/^\d+_/, "");
  const segments = withoutIndex.split("_").filter(Boolean);
  if (segments.length < 2) return null;

  const { nameParts, typeKey, rawSuffix } = splitNameAndType(segments);

  return {
    displayName: formatPersonName(nameParts),
    categoryLabel: lookupCategory(typeKey, rawSuffix),
    typeSuffix: rawSuffix,
  };
}
