import { LocaleTransition } from "@/components/locale-transition";
import { GoogleAnalytics } from "@/components/google-analytics";
import { ScrollToTopOnRefresh } from "@/components/scroll-to-top-on-refresh";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { routing } from "@/i18n/routing";
import { rootMetadataBase } from "@/lib/seo";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Marck_Script, Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  ...rootMetadataBase(),
  description: "Medical education in rhinology and nasal endoscopy.",
};

type Props = LayoutProps<"/[locale]">;

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${marckScript.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <GoogleAnalytics />
        <SeoJsonLd />
        <NextIntlClientProvider messages={messages}>
          <ScrollToTopOnRefresh />
          <LocaleTransition>{children}</LocaleTransition>
          <WhatsappFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
