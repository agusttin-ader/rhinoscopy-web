import { getSiteUrl } from "@/lib/site-url";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const base = getSiteUrl();

  return {
    name: "Rhinoscopy",
    short_name: "Rhinoscopy",
    description:
      "Rhinoscopy: otorrinolaringología, rinología y rinoscopia. Webinars, congreso Meet y formación en endoscopía nasal y ORL.",
    start_url: base,
    display: "standalone",
    background_color: "#262454",
    theme_color: "#262454",
    lang: "es-AR",
    icons: [
      {
        src: "/icon.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logo-rhinoscopy-hd.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
