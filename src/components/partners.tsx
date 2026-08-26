import { copy } from "@/data/copy";

const partners = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet", "Elit"];

export function Partners() {
  return (
    <section className="border-y border-navy/10 bg-white px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[0.68rem] tracking-[0.28em] text-slate-400 uppercase">
          {copy.partnersKicker}
        </p>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((name) => (
            <li
              key={name}
              className="text-sm font-medium tracking-[0.12em] text-slate-400 uppercase"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
