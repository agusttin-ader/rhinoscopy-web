import { copy } from "@/data/copy";
import { events } from "@/data/events";

export function Events() {
  return (
    <section id="actividades" className="bg-paper px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[0.7rem] tracking-[0.28em] text-indigo-500 uppercase">
              {copy.eventsKicker}
            </p>
            <h2 className="font-display mt-4 text-4xl text-navy md:text-5xl">
              {copy.eventsTitle}
            </h2>
          </div>
          <p className="max-w-md text-slate-500">{copy.eventsLead}</p>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {events.map((event) => (
            <li
              key={event.title}
              className="flex flex-col border border-navy/10 bg-white p-8 shadow-[0_20px_50px_-30px_rgba(10,25,47,0.35)]"
            >
              <span className="text-[0.65rem] tracking-[0.2em] text-fuchsia-600 uppercase">
                {event.kind}
              </span>
              <h3 className="font-display mt-4 text-2xl text-navy">
                {event.title}
              </h3>
              <p className="mt-3 text-sm text-slate-500">{event.date}</p>
              <p className="mt-1 text-sm text-slate-400">{event.place}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
