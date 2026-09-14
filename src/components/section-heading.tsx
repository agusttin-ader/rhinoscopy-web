type SectionHeadingProps = {
  kicker: string;
  titleScript?: string;
  titleDisplay: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  /** Tamaño del bloque: full (webinars), compact (CTA) o narrow (constancias). */
  size?: "full" | "compact" | "narrow";
  /** Separación entre script y display (webinars usa tight). */
  titleGap?: "tight" | "relaxed";
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  kicker,
  titleScript,
  titleDisplay,
  lead,
  align = "left",
  tone = "dark",
  size = "full",
  titleGap = "tight",
  as = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";
  const TitleTag = as;

  const kickerClass =
    tone === "dark"
      ? "text-[0.72rem] font-semibold tracking-[0.38em] text-cyan-300/80 uppercase"
      : "text-[0.7rem] font-semibold tracking-[0.28em] text-cyan-600 uppercase";

  const scriptSize =
    size === "full"
      ? "text-[clamp(3.5rem,12vw,6.5rem)]"
      : size === "narrow"
        ? "text-[clamp(2.1rem,5.5vw,3rem)]"
        : "text-[clamp(2.75rem,8vw,4.25rem)]";
  const displaySize =
    size === "full"
      ? "text-[clamp(2.75rem,9vw,5.5rem)]"
      : size === "narrow"
        ? "text-[clamp(1.65rem,4.5vw,2.5rem)]"
        : "text-[clamp(2rem,6vw,3.25rem)]";

  const displayColor = tone === "dark" ? "text-white" : "text-navy";
  const leadColor =
    tone === "dark"
      ? "text-lg font-light leading-relaxed text-white/55"
      : "leading-relaxed text-slate-600";

  return (
    <header
      className={
        centered
          ? "mx-auto max-w-3xl text-center"
          : size === "compact" || size === "narrow"
            ? "max-w-xl"
            : "max-w-3xl"
      }
    >
      <p className={kickerClass}>{kicker}</p>
      <TitleTag
        className={`leading-[0.95] ${
          size === "narrow" ? "mt-3 sm:mt-4" : "mt-5 sm:mt-6"
        }`}
      >
        {titleScript ? (
          <span
            className={`font-script block leading-none ${
              tone === "dark" ? "text-cyan-400" : "text-cyan-600"
            } ${scriptSize}`}
          >
            {titleScript}
          </span>
        ) : null}
        <span
          className={`font-display block uppercase tracking-[0.02em] ${displayColor} ${displaySize} ${
            titleScript
              ? titleGap === "relaxed"
                ? "mt-2 sm:mt-3"
                : "-mt-0.5"
              : ""
          }`}
        >
          {titleDisplay}
        </span>
      </TitleTag>
      {lead ? (
        <p
          className={`max-w-lg ${leadColor} ${centered ? "mx-auto" : ""} ${
            size === "full"
              ? "mt-8 text-lg"
              : size === "narrow"
                ? "mt-4 text-sm leading-relaxed"
                : "mt-6 text-base"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
