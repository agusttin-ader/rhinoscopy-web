import { track } from "@vercel/analytics";

export type FileAnalyticsCategory = "certificate" | "program" | "other";

export type FileAnalyticsAction = "download" | "view";

function fileExtension(url: string): string {
  try {
    const path = new URL(url, "https://www.rhinoscopy.com.ar").pathname;
    const match = path.match(/\.([a-z0-9]+)$/i);
    return match ? match[1].toLowerCase() : "";
  } catch {
    return "";
  }
}

/** Eventos de archivos → Vercel Analytics (pestaña Events en el dashboard). */
export function trackFileEvent(
  action: FileAnalyticsAction,
  options: {
    fileName: string;
    fileUrl: string;
    category: FileAnalyticsCategory;
  },
) {
  if (typeof window === "undefined") return;

  const { fileName, fileUrl, category } = options;
  const extension = fileExtension(fileUrl) || "pdf";

  track(action === "download" ? "File Download" : "File View", {
    category,
    file: fileName,
    extension,
    path: fileUrl,
  });
}
