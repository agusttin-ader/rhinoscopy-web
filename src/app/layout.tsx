import { Marck_Script, Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

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
        <link
          rel="preload"
          href="/images/rhinoscopy-logo-hero-sombra.png"
          as="image"
          type="image/png"
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
