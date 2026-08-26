import { copy } from "@/data/copy";
import { professionals } from "@/data/professionals";

export function Professionals() {
  return (
    <section id="equipo" className="bg-navy px-6 py-28 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-[0.7rem] tracking-[0.28em] text-cyan-200/80 uppercase">
          {copy.teamKicker}
        </p>
        <h2 className="font-display mt-4 max-w-2xl text-4xl md:text-5xl">
          {copy.teamTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-slate-400">{copy.teamLead}</p>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {professionals.map((person) => (
            <li
              key={person.name}
              className="group border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-sky-400/30 via-indigo-500/20 to-fuchsia-500/30 text-lg tracking-[0.2em] text-white">
                {person.initials}
              </div>
              <p className="text-[0.65rem] tracking-[0.22em] text-cyan-200 uppercase">
                {person.role}
              </p>
              <h3 className="font-display mt-2 text-2xl leading-tight">
                {person.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {person.credentials}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
