"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CongressFamilyBand } from "@/components/congress-family-band";
import { CongressGallery } from "@/components/congress-gallery";
import { CongressVerticalScreens } from "@/components/congress-vertical-screens";
import { CongressMeetPresentation } from "@/components/congress-meet-presentation";
import { Reveal } from "@/components/motion/reveal";
import { DoctorCard } from "@/components/doctor-card";
import { SponsorLogos } from "@/components/sponsor-logos";
import { useLocaleData } from "@/hooks/use-locale-data";
import { congress, normalizePersonName, speakerPhotoUrl } from "@/data/congress";

function SectionIntro({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <Reveal
      as="div"
      className="flex flex-col gap-6 border-b border-navy/10 pb-8 md:flex-row md:items-end md:justify-between"
    >
      <div className="max-w-2xl">
        <p className="text-[0.7rem] tracking-[0.28em] text-cyan-600 uppercase">{kicker}</p>
        <h3 className="font-display mt-3 text-4xl text-navy md:text-5xl">{title}</h3>
        {lead ? <p className="mt-4 text-slate-600">{lead}</p> : null}
      </div>
      {children}
    </Reveal>
  );
}

function CongressProgram() {
  const { congressCopy } = useLocaleData();

  return (
    <section id="programa" className="scroll-mt-24">
      <SectionIntro
        kicker={congressCopy.program.kicker}
        title={congressCopy.program.title.replace(".", "")}
        lead={congressCopy.program.lead}
      />

      <Reveal delay={80} offset={14}>
        <a
          href={congress.assets.programPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-[0.7rem] font-bold tracking-[0.16em] text-white uppercase transition hover:bg-navy/90"
        >
          {congressCopy.program.pdfCta}
          <span aria-hidden="true">↗</span>
        </a>
        <p className="mt-4 max-w-xl text-sm text-slate-500">
          {congressCopy.program.pdfLead}
        </p>
      </Reveal>
    </section>
  );
}

function CongressSpeakers() {
  const { congressCopy } = useLocaleData();
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollToTopOnCollapse = useRef(false);

  const { featured, rest, totalCount } = useMemo(() => {
    const terms = normalizePersonName(query).split(" ").filter(Boolean);
    const filtered = congress.speakers.filter((speaker) => {
      const nameWords = normalizePersonName(speaker.name).split(" ").filter(Boolean);
      return terms.every((term) => nameWords.some((word) => word.startsWith(term)));
    });

    const byCountry = new Map<string, (typeof congress.speakers)[number][]>();
    for (const speaker of filtered) {
      const list = byCountry.get(speaker.country) ?? [];
      list.push(speaker);
      byCountry.set(speaker.country, list);
    }

    for (const list of byCountry.values()) {
      list.sort((a, b) => a.name.localeCompare(b.name, "es"));
    }

    const featuredSpeakers = [...byCountry.values()]
      .map((list) => list[0])
      .sort((a, b) => a.name.localeCompare(b.name, "es"));

    const featuredIds = new Set(featuredSpeakers.map((speaker) => speaker.id));
    const restSpeakers = filtered
      .filter((speaker) => !featuredIds.has(speaker.id))
      .sort((a, b) => a.name.localeCompare(b.name, "es"));

    return {
      featured: featuredSpeakers,
      rest: restSpeakers,
      totalCount: filtered.length,
    };
  }, [query]);

  useEffect(() => {
    if (!expanded && scrollToTopOnCollapse.current) {
      scrollToTopOnCollapse.current = false;
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [expanded]);

  const toggleSpeakers = () => {
    if (expanded) scrollToTopOnCollapse.current = true;
    setExpanded((open) => !open);
  };

  return (
    <section id="speakers" ref={sectionRef} className="scroll-mt-24">
      <SectionIntro
        kicker={congressCopy.speakers.kicker}
        title={congressCopy.speakers.title.replace(".", "")}
        lead={congressCopy.speakers.lead}
      >
        <label className="w-full md:w-72">
          <span className="sr-only">{congressCopy.speakers.searchPlaceholder}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setExpanded(false);
            }}
            placeholder={congressCopy.speakers.searchPlaceholder}
            className="w-full border-b border-navy/15 bg-transparent py-2 text-sm text-navy outline-none placeholder:text-slate-400 focus:border-cyan-500"
          />
        </label>
      </SectionIntro>

      <p className="mt-6 text-sm text-slate-500" aria-live="polite">
        {congressCopy.speakers.count(totalCount)}
      </p>

      {totalCount === 0 ? (
        <p className="mt-12 text-center text-slate-500">{congressCopy.speakers.empty}</p>
      ) : (
        <div className="mt-10">
          <ul className="grid gap-3 sm:gap-3.5 lg:grid-cols-2 xl:grid-cols-3">
            {featured.map((speaker, index) => (
              <li key={speaker.id}>
                <Reveal delay={Math.min(index, 6) * 42} offset={12}>
                <DoctorCard
                  name={speaker.name}
                  subtitle={speaker.country}
                  photoSrc={speakerPhotoUrl(speaker.image)}
                  accentIndex={index}
                />
                </Reveal>
              </li>
            ))}
            {expanded
              ? rest.map((speaker, index) => (
                  <li
                    key={speaker.id}
                    className="speaker-reveal"
                    style={{ animationDelay: `${Math.min(index, 12) * 36}ms` }}
                  >
                    <DoctorCard
                      name={speaker.name}
                      subtitle={speaker.country}
                      photoSrc={speakerPhotoUrl(speaker.image)}
                      accentIndex={featured.length + index}
                    />
                  </li>
                ))
              : null}
          </ul>

          {rest.length > 0 ? (
            <button
              type="button"
              onClick={toggleSpeakers}
              aria-expanded={expanded}
              className="mt-6 flex w-full items-center justify-center gap-3 py-2 text-sm font-semibold text-navy transition hover:text-cyan-700"
            >
              <span>
                {expanded
                  ? congressCopy.speakers.showLess
                  : congressCopy.speakers.moreSpeakers(rest.length)}
              </span>
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-navy/5 text-lg text-navy/50 transition hover:bg-navy/10 ${
                  expanded ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                ↓
              </span>
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}

function CongressCommittee() {
  const { congressCopy, committeeRoles, committeeRolesByMemberId } =
    useLocaleData();

  return (
    <section id="comite" className="scroll-mt-24">
      <SectionIntro
        kicker={congressCopy.committee.kicker}
        title={congressCopy.committee.title.replace(".", "")}
        lead={congressCopy.committee.lead}
      />

      <ul className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-3">
        {congress.organizingCommittee.map((member, index) => (
          <li key={member.id}>
            <Reveal delay={index * 48} offset={12} className="h-full">
            <DoctorCard
              variant="large"
              name={member.name}
              subtitle={
                committeeRolesByMemberId[
                  member.id as keyof typeof committeeRolesByMemberId
                ] ??
                committeeRoles[
                  member.role as keyof typeof committeeRoles
                ] ??
                member.role
              }
              photoSrc={speakerPhotoUrl(
                member.image,
                member.assetFolder ?? "comite",
              )}
              accentIndex={index}
            />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CongressSection() {
  const { congressCopy } = useLocaleData();

  return (
    <section className="overflow-x-clip bg-paper">
      <Reveal offset={16}>
        <CongressMeetPresentation />
      </Reveal>

      <CongressFamilyBand />

      <Reveal delay={60} offset={12}>
      <div className="border-b border-navy/10 bg-paper px-5 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <p className="max-w-2xl text-slate-600">{congressCopy.lead}</p>
          <p className="mt-3 text-sm text-slate-500">
            {congress.event.venue} · {congress.event.address}
          </p>
          <a
            href={congress.event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-cyan-700 hover:text-navy"
          >
            {congressCopy.venue.mapsCta} →
          </a>
        </div>
      </div>
      </Reveal>

      <div className="mx-auto max-w-6xl space-y-24 px-6 py-20 sm:py-28">
        <CongressProgram />
        <CongressCommittee />
        <CongressSpeakers />
        <CongressGallery />
      </div>

      <div className="flex justify-center px-8 py-8 sm:px-10 sm:py-10">
        <div className="congress-section-rule" role="presentation" aria-hidden="true" />
      </div>

      <div className="overflow-x-clip px-6 pb-20 pt-6 sm:pb-28 sm:pt-8">
        <CongressVerticalScreens />
      </div>

      <Reveal offset={16}>
        <SponsorLogos />
      </Reveal>
    </section>
  );
}
