import { createLocalizedMetadata } from "@/lib/seo";
import { resolveConstanciaPdfUrl } from "@/lib/constancia-pdf-url";
import { getLocaleData } from "@/data/locales";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = PageProps<"/[locale]/constancias/ver">;

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await searchParams;
  const { meta } = getLocaleData(locale);
  const title = (typeof t === "string" ? t.trim() : "") || meta.constancias.viewerTitle;

  return {
    ...createLocalizedMetadata({
      locale,
      path: "/constancias/ver",
      title,
      description: meta.constancias.description,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function ConstanciaViewerPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { u } = await searchParams;
  const pdfUrl = resolveConstanciaPdfUrl(typeof u === "string" ? u : undefined);
  if (!pdfUrl) notFound();

  const { constanciasCopy } = getLocaleData(locale);

  return (
    <div className="flex min-h-dvh flex-col bg-navy text-white">
      <header
        className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6"
      >
        <Link
          href="/constancias"
          className="text-[0.68rem] font-semibold tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-white"
        >
          {constanciasCopy.viewerBack}
        </Link>
        <a
          href={pdfUrl}
          download
          className="text-[0.68rem] font-semibold tracking-[0.2em] text-cyan-300/90 uppercase transition-colors hover:text-cyan-200"
        >
          {constanciasCopy.downloadCta}
        </a>
      </header>
      <iframe
        title={constanciasCopy.viewerIframeTitle}
        src={pdfUrl}
        className="min-h-0 flex-1 w-full border-0 bg-black"
      />
    </div>
  );
}
