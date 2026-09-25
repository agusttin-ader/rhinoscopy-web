import { GoogleAnalytics } from "@/components/google-analytics";
import { PageRevealProvider } from "@/components/page-reveal-provider";
import { HtmlLang } from "@/components/html-lang";
import { LocaleTransition } from "@/components/locale-transition";
import { ScrollToTopOnRefresh } from "@/components/scroll-to-top-on-refresh";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { routing } from "@/i18n/routing";
import { rootMetadataBase } from "@/lib/seo";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

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
    <>
      <HtmlLang locale={locale} />
      <GoogleAnalytics />
      <SeoJsonLd />
      <NextIntlClientProvider messages={messages}>
        <PageRevealProvider>
          <ScrollToTopOnRefresh />
          <LocaleTransition>{children}</LocaleTransition>
          <WhatsappFloat />
        </PageRevealProvider>
      </NextIntlClientProvider>
    </>
  );
}
