"use client";

import { useState } from "react";
import { GradientCtaButton } from "@/components/gradient-cta-button";
import { constanciasCopy } from "@/data/constancias-copy";
import Link from "next/link";

type Match = {
  eventId: string;
  eventLabel: string;
  fileName: string;
  displayName: string;
  downloadUrl: string;
};

function PanelCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_40px_100px_-48px_rgba(0,0,0,0.85)] backdrop-blur-sm"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400/55 via-white/15 to-fuchsia-500/45"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

export function CertificateSearch({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Match[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch("/api/constancias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = (await response.json()) as {
        results?: Match[];
        error?: string;
      };
      if (!response.ok) {
        setError(data.error ?? constanciasCopy.searchError);
        return;
      }
      setResults(data.results ?? []);
    } catch {
      setError(constanciasCopy.connectionError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`w-full ${compact ? "max-w-none" : "max-w-xl"}`}>
      <PanelCard>
        <form
          onSubmit={onSubmit}
          className={compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}
        >
          <p
            className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-0.5 text-[0.58rem] font-semibold tracking-[0.18em] text-cyan-200/90 uppercase"
          >
            {constanciasCopy.availableEvent}
          </p>

          <label className={compact ? "mt-4 block" : "mt-6 block"}>
            <span className="text-[0.65rem] tracking-[0.22em] text-slate-400 uppercase">
              {constanciasCopy.nameLabel}
            </span>
            <input
              required
              minLength={2}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={constanciasCopy.namePlaceholder}
              autoComplete="name"
              className={`mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] text-white outline-none ring-0 transition-[border-color,box-shadow] duration-200 placeholder:text-white/25 focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)] ${
                compact ? "px-3.5 py-2.5 text-base" : "px-4 py-3.5 text-lg"
              }`}
            />
            <span className="mt-2 block text-xs text-white/40">
              {constanciasCopy.nameHint}
            </span>
          </label>

          <GradientCtaButton
            type="submit"
            disabled={loading}
            className={compact ? "mt-5 w-full" : "mt-8 w-full"}
          >
            {loading ? constanciasCopy.searching : constanciasCopy.searchCta}
          </GradientCtaButton>

          {error ? (
            <p className="mt-6 text-center text-sm text-rose-300" role="alert">
              {error}
            </p>
          ) : null}

          <p className={`text-xs leading-relaxed text-white/35 ${compact ? "mt-4" : "mt-6"}`}>
            {constanciasCopy.privacyNote}
          </p>
        </form>
      </PanelCard>

      {results ? (
        <div className="mt-8" role="region" aria-live="polite" aria-label="Resultados">
          {results.length === 0 ? (
            <PanelCard>
              <div className="p-6 text-center sm:p-8">
                <p className="font-display text-xl text-white">
                  {constanciasCopy.emptyTitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {constanciasCopy.emptyBody}
                </p>
                <Link
                  href="/#contacto"
                  className="mt-6 inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.18em] text-cyan-300 uppercase transition-colors hover:text-white"
                >
                  <span className="h-px w-6 bg-cyan-400/80" aria-hidden="true" />
                  {constanciasCopy.contactCta}
                </Link>
              </div>
            </PanelCard>
          ) : (
            <ul className="space-y-4">
              {results.map((item) => (
                <li key={`${item.eventId}-${item.fileName}`}>
                  <PanelCard>
                    <div
                      className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
                    >
                      <div className="min-w-0">
                        <p className="text-[0.65rem] tracking-[0.2em] text-cyan-200/80 uppercase">
                          {item.eventLabel}
                        </p>
                        <p className="font-display mt-1 text-xl text-white sm:text-2xl">
                          {item.displayName}
                        </p>
                        <p className="mt-1 text-sm text-white/45">
                          {constanciasCopy.resultTitle}
                        </p>
                      </div>
                      <a
                        href={item.downloadUrl}
                        download
                        className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 text-[0.68rem] font-bold tracking-[0.16em] text-navy uppercase transition hover:bg-cyan-50"
                      >
                        {constanciasCopy.downloadCta}
                      </a>
                    </div>
                  </PanelCard>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
