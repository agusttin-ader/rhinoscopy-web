import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /**
   * Imágenes servidas tal cual desde `/public` (WebP/PNG pre-comprimidos con
   * `npm run images:optimize`). No usamos `/_next/image` ni Image Optimization de Vercel.
   */
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
