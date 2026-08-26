import { copy } from "@/data/copy";

export function About() {
  return (
    <section id="proyecto" className="bg-paper px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-[0.7rem] tracking-[0.28em] text-indigo-500 uppercase">
            {copy.aboutKicker}
          </p>
          <h2 className="font-display mt-4 text-4xl text-navy md:text-5xl">
            {copy.aboutTitle}
          </h2>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-slate-600">
          <p>{copy.aboutP1}</p>
          <p>{copy.aboutP2}</p>
          <ul className="grid gap-4 pt-4 sm:grid-cols-3">
            {[
              { n: "Lorem", d: "Ipsum dolor sit" },
              { n: "Ipsum", d: "Amet consectetur" },
              { n: "Dolor", d: "Adipiscing elit" },
            ].map((item) => (
              <li key={item.n} className="border-t border-navy/10 pt-4">
                <p className="font-display text-xl text-navy">{item.n}</p>
                <p className="mt-1 text-sm text-slate-500">{item.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
