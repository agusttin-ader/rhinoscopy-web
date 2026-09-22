import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { getLocaleData } from "@/data/locales";
import { getLocale } from "next-intl/server";

export async function Contact() {
  const locale = await getLocale();
  const { aboutCopy, contactCopy } = getLocaleData(locale);

  return (
    <section id="contacto" className="site-scroll-mt bg-paper py-16 sm:py-24 lg:py-28">
      <div
        className="site-shell grid min-w-0 gap-10 sm:gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14 lg:gap-16"
      >
        <Reveal as="div" id="quienes-somos" className="min-w-0" offset={14}>
          <SectionHeading
            as="h2"
            align="left"
            tone="light"
            kicker={aboutCopy.kicker}
            titleScript={aboutCopy.titleScript}
            titleDisplay={aboutCopy.titleDisplay}
            lead={aboutCopy.lead}
            size="narrow"
          />
          <div className="mt-8 space-y-4 text-[0.95rem] font-light leading-relaxed text-slate-600">
            {aboutCopy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-8 space-y-3 text-sm font-medium text-navy/80">
            {aboutCopy.highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={aboutCopy.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex flex-col gap-1 text-sm font-semibold text-cyan-700 transition-colors hover:text-navy"
          >
            {aboutCopy.instagramCta}
            <span className="text-xs font-normal tracking-wide text-slate-500">
              {aboutCopy.instagramHandle}
            </span>
          </a>
        </Reveal>

        <Reveal as="div" className="min-w-0" delay={70} offset={14}>
          <SectionHeading
            as="h2"
            align="left"
            tone="light"
            kicker={contactCopy.kicker}
            titleScript={contactCopy.titleScript}
            titleDisplay={contactCopy.titleDisplay}
            lead={contactCopy.lead}
            size="narrow"
          />
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
