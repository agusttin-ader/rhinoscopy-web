"use client";

import { CertificatePdfIcon } from "@/components/certificate-pdf-icon";
import { CertificateVisual } from "@/components/certificate-visual";
import { GradientCtaButton } from "@/components/gradient-cta-button";
import { SectionHeading } from "@/components/section-heading";
import { constanciasCopy } from "@/data/constancias-copy";
import Link from "next/link";
import { useState } from "react";

type Match = {
  eventId: string;
  eventLabel: string;
  fileName: string;
  displayName: string;
  downloadUrl: string;
};

type SearchState = {
  results: Match[];
  total: number;
  truncated: boolean;
};

export function ConstanciasExperience() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState<SearchState | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    setSearch(null);

    try {
      const response = await fetch("/api/constancias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = (await response.json()) as {
        results?: Match[];
        total?: number;
        truncated?: boolean;
        error?: string;
      };
      if (!response.ok) {
        setError(data.error ?? constanciasCopy.searchError);
        return;
      }
      setSearch({
        results: data.results ?? [],
        total: data.total ?? data.results?.length ?? 0,
        truncated: Boolean(data.truncated),
      });
    } catch {
      setError(constanciasCopy.connectionError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className="mt-8 grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-start lg:gap-12 xl:gap-16"
      >
        <div className="min-w-0 lg:max-w-[26rem]">
          <SectionHeading
            as="h1"
            align="left"
            tone="dark"
            kicker={constanciasCopy.kicker}
            titleScript={constanciasCopy.titleScript}
            titleDisplay={constanciasCopy.titleDisplay}
            lead={constanciasCopy.lead}
            size="narrow"
            titleGap="relaxed"
          />

          <div className="mt-6 flex justify-center lg:hidden">
            <CertificateVisual layout="meet-logo" />
          </div>

          <form onSubmit={onSubmit} className="mt-9 lg:mt-10">
            <p className="text-[0.62rem] font-medium tracking-[0.24em] text-cyan-300/75 uppercase">
              {constanciasCopy.availableEvent}
            </p>

            <label className="mt-6 block">
              <span className="text-[0.65rem] font-semibold tracking-[0.22em] text-cyan-300/85 uppercase">
                {constanciasCopy.nameLabel}
              </span>
              <input
                required
                minLength={2}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={constanciasCopy.namePlaceholder}
                autoComplete="name"
                className="mt-3 w-full border-0 border-b border-white/20 bg-transparent pb-2.5 text-lg font-light tracking-wide text-white outline-none transition-colors placeholder:text-white/30 focus:border-cyan-400/70"
              />
              <span className="mt-3 block text-[0.8rem] font-light leading-relaxed text-white/45">
                {constanciasCopy.nameHint}
              </span>
            </label>

            <GradientCtaButton
              type="submit"
              disabled={loading}
              className="mt-8 w-full sm:w-auto"
            >
              {loading ? constanciasCopy.searching : constanciasCopy.searchCta}
            </GradientCtaButton>

            {error ? (
              <p className="mt-4 text-sm font-light text-rose-300/95" role="alert">
                {error}
              </p>
            ) : null}

            <p className="mt-6 text-[0.75rem] font-light leading-relaxed text-white/35">
              {constanciasCopy.privacyNote}
            </p>
          </form>
        </div>

        <div
          className="hidden min-w-0 lg:flex lg:items-center lg:justify-end lg:pt-6 xl:pt-10"
          aria-hidden
        >
          <CertificateVisual layout="meet-logo" />
        </div>
      </div>

      {search ? (
        <section
          className="mt-14 sm:mt-16"
          aria-live="polite"
          aria-label="Resultados de búsqueda"
        >
          {search.results.length === 0 ? (
            <div className="py-10 text-center sm:py-12">
              <p className="font-display text-xl text-white/95 sm:text-2xl">
                {constanciasCopy.emptyTitle}
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm font-light leading-relaxed text-white/50">
                {constanciasCopy.emptyBody}
              </p>
              <Link
                href="/#contacto"
                className="mt-5 inline-block text-sm font-medium text-cyan-300/90 hover:text-white"
              >
                {constanciasCopy.contactCta}
              </Link>
            </div>
          ) : (
            <>
              <div
                className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"
              >
                <p
                  className="text-[0.72rem] font-semibold tracking-[0.28em] text-cyan-300/90 uppercase sm:text-[0.75rem]"
                >
                  {constanciasCopy.resultsCount(search.total)}
                </p>
                {search.truncated ? (
                  <p className="max-w-md text-[0.8rem] font-light leading-relaxed text-white/45">
                    {constanciasCopy.resultsTruncated(
                      search.results.length,
                      search.total,
                    )}
                  </p>
                ) : null}
              </div>

              <ul className="border-t border-white/[0.08]">
                {search.results.map((item) => (
                  <li
                    key={`${item.eventId}-${item.fileName}`}
                    className="border-b border-white/[0.08]"
                  >
                    <div
                      className="group flex items-center gap-5 py-5 sm:gap-8 sm:py-6"
                    >
                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate text-[1.05rem] font-medium tracking-[0.02em] text-white/95 sm:text-[1.15rem]"
                        >
                          {item.displayName}
                        </p>
                        <p
                          className="mt-1 truncate text-[0.7rem] font-light tracking-[0.18em] text-white/38 uppercase"
                        >
                          {item.eventLabel}
                        </p>
                      </div>
                      <a
                        href={item.downloadUrl}
                        download
                        title={constanciasCopy.downloadCta}
                        aria-label={`${constanciasCopy.downloadCta} — ${item.displayName}`}
                        className="shrink-0 text-cyan-400/75 transition-colors hover:text-cyan-300 focus-visible:text-white focus-visible:outline-none"
                      >
                        <CertificatePdfIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      ) : null}

      <p className="mt-12 max-w-md text-[0.75rem] font-light leading-relaxed text-white/38">
        {constanciasCopy.footnote}{" "}
        <Link
          href="/#contacto"
          className="font-normal text-cyan-300/80 transition-colors hover:text-cyan-200"
        >
          {constanciasCopy.contactCta}
        </Link>
        .
      </p>
    </>
  );
}
