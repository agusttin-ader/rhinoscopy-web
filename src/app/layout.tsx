import { rootMetadataBase } from "@/lib/seo";
import { VercelAnalytics } from "@/components/vercel-analytics";
import { Marck_Script, Montserrat } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = rootMetadataBase();

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const marckScript = Marck_Script({
  variable: "--font-script",
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${marckScript.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/icon-32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <link
          rel="preload"
          href="/images/rhinoscopy-logo-hero-sombra.png"
          as="image"
          type="image/png"
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
