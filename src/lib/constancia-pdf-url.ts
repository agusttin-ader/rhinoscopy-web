const CONSTANCIA_PDF_PREFIX = "/images/constancias/";

/** Valida que la URL apunte a un PDF de constancias en `/public`. */
export function resolveConstanciaPdfUrl(
  candidate: string | undefined,
): string | null {
  if (!candidate) return null;

  let path: string;
  try {
    path = decodeURIComponent(candidate);
  } catch {
    return null;
  }

  if (!path.startsWith(CONSTANCIA_PDF_PREFIX)) return null;
  if (path.includes("..") || path.includes("\\")) return null;
  if (!/\.pdf$/i.test(path)) return null;

  return path;
}

export function constanciaViewPageUrl(
  downloadUrl: string,
  displayName?: string,
): string {
  const params = new URLSearchParams({ u: downloadUrl });
  const title = displayName?.trim();
  if (title) params.set("t", title);
  return `/constancias/ver?${params.toString()}`;
}
