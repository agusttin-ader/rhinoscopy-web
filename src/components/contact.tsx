import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { aboutCopy } from "@/data/about-copy";
import { contactCopy } from "@/data/contact-copy";

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-[4.5rem] bg-paper px-5 py-20 sm:px-6 sm:py-28">
      <div
        className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14 lg:gap-16"
      >
        <div id="quienes-somos" className="min-w-0">
          <SectionHeading
            as="h2"
            align="left"
            tone="light"
            size="compact"
            titleGap="relaxed"
            kicker={aboutCopy.kicker}
            titleScript={aboutCopy.titleScript}
            titleDisplay={aboutCopy.titleDisplay}
            lead={aboutCopy.lead}
          />

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {aboutCopy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-8 space-y-3 border-t border-navy/10 pt-8">
            {aboutCopy.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm text-slate-600 sm:text-[0.95rem]"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={aboutCopy.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.18em] text-cyan-700 uppercase transition-colors hover:text-navy"
          >
            <span className="h-px w-6 bg-cyan-500/70" aria-hidden="true" />
            {aboutCopy.instagramCta}
            <span className="font-normal tracking-normal text-slate-500 normal-case">
              {aboutCopy.instagramHandle}
            </span>
          </a>
        </div>

        <div className="min-w-0 border-t border-navy/10 pt-10 md:border-t-0 md:border-l md:pt-0 md:pl-12 lg:pl-14">
          <SectionHeading
            as="h3"
            align="left"
            tone="light"
            size="narrow"
            titleGap="relaxed"
            kicker={contactCopy.kicker}
            titleScript={contactCopy.titleScript}
            titleDisplay={contactCopy.titleDisplay}
            lead={contactCopy.lead}
          />

          <div className="mt-8 md:mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
