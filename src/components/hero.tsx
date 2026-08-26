import { copy } from "@/data/copy";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-[100svh] overflow-hidden bg-navy"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-[28rem] w-[28rem] rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-[32rem] w-[32rem] rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-20 pt-32 md:justify-center md:pb-0">
        <p className="mb-6 text-[0.72rem] tracking-[0.32em] text-cyan-200/80 uppercase">
          {copy.kicker}
        </p>
        <h1 className="font-display max-w-3xl text-5xl leading-[0.95] text-white sm:text-7xl">
          {copy.heroTitle}
          <span className="block bg-gradient-to-r from-sky-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
            {copy.heroAccent}
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-300">
          {copy.heroLead}
        </p>

        <div className="mt-12 flex flex-wrap items-end gap-10 border-t border-white/10 pt-8">
          <div>
            <p className="text-[0.65rem] tracking-[0.22em] text-slate-400 uppercase">
              {copy.heroNote}
            </p>
            <p className="mt-2 font-display text-2xl text-white">
              Lorem ipsum dolor
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Sit amet, consectetur adipiscing elit
            </p>
          </div>
          <a
            href="#contacto"
            className="rounded-full bg-white px-6 py-3 text-[0.7rem] font-semibold tracking-[0.18em] text-navy uppercase transition hover:bg-slate-100"
          >
            {copy.heroCta}
          </a>
        </div>
      </div>
    </section>
  );
}
