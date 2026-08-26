import { copy } from "@/data/copy";

export function CertificateTeaser() {
  return (
    <section id="constancias" className="bg-navy px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 border border-white/10 p-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-[0.7rem] tracking-[0.28em] text-cyan-200/80 uppercase">
            {copy.certKicker}
          </p>
          <h2 className="font-display mt-3 text-3xl text-white md:text-4xl">
            {copy.certTitle}
          </h2>
          <p className="mt-4 text-slate-400">{copy.certLead}</p>
        </div>
        <a
          href="/constancias"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[0.7rem] font-semibold tracking-[0.18em] text-navy uppercase transition hover:bg-slate-100"
        >
          {copy.certCta}
        </a>
      </div>
    </section>
  );
}
