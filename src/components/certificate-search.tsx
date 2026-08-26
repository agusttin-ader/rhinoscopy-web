"use client";

import { useState } from "react";

type Match = {
  eventId: string;
  eventLabel: string;
  fileName: string;
  downloadUrl: string;
};

export function CertificateSearch() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
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
        body: JSON.stringify({ nombre, apellido }),
      });
      const data = (await response.json()) as {
        results?: Match[];
        error?: string;
      };
      if (!response.ok) {
        setError(data.error ?? "No se pudo completar la búsqueda.");
        return;
      }
      setResults(data.results ?? []);
    } catch {
      setError("Hubo un problema de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form
        onSubmit={onSubmit}
        className="border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-sm md:p-10"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="text-[0.65rem] tracking-[0.22em] text-slate-400 uppercase">
              Nombre
            </span>
            <input
              required
              minLength={2}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Juan"
              autoComplete="given-name"
              className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-lg text-white outline-none placeholder:text-slate-600 focus:border-cyan-300"
            />
          </label>
          <label className="block">
            <span className="text-[0.65rem] tracking-[0.22em] text-slate-400 uppercase">
              Apellido
            </span>
            <input
              required
              minLength={2}
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Domínguez"
              autoComplete="family-name"
              className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-lg text-white outline-none placeholder:text-slate-600 focus:border-cyan-300"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-10 w-full rounded-full bg-white py-3.5 text-[0.72rem] font-semibold tracking-[0.2em] text-navy uppercase transition hover:bg-slate-100 disabled:opacity-60"
        >
          {loading ? "Buscando…" : "Buscar constancia"}
        </button>

        {error ? (
          <p className="mt-6 text-center text-sm text-rose-300">{error}</p>
        ) : null}
      </form>

      {results ? (
        <div className="mt-12">
          {results.length === 0 ? (
            <p className="text-center text-slate-400">
              No encontramos constancias con ese nombre y apellido.
            </p>
          ) : (
            <ul className="space-y-4">
              {results.map((item) => (
                <li
                  key={`${item.eventId}-${item.fileName}`}
                  className="flex flex-col gap-4 border border-white/10 bg-white/[0.03] px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-[0.65rem] tracking-[0.2em] text-cyan-200/80 uppercase">
                      {item.eventLabel}
                    </p>
                    <p className="font-display mt-1 text-2xl text-white">
                      Constancia de asistencia
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {nombre} {apellido}
                    </p>
                  </div>
                  <a
                    href={item.downloadUrl}
                    download
                    className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2.5 text-[0.68rem] tracking-[0.16em] text-white uppercase transition hover:border-white hover:bg-white/5"
                  >
                    Descargar PDF
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
