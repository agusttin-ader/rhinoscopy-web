import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /** Assets pre-comprimidos en /public (ver `npm run images:optimize`). */
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
