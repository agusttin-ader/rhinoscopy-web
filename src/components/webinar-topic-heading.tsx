import { webinarTopicParts } from "@/lib/webinar-topic-title";

type Props = {
  topic: string;
  as?: "h2" | "h3" | "p";
  size?: "list" | "modal";
  id?: string;
  className?: string;
};

export function WebinarTopicHeading({
  topic,
  as = "h3",
  size = "list",
  id,
  className = "",
}: Props) {
  const { lead, rest } = webinarTopicParts(topic);
  const Tag = as;

  const scriptClass =
    size === "modal"
      ? "font-script block text-[clamp(1.4rem,4.2vw,2.15rem)] leading-[0.95] text-cyan-400"
      : "font-script block text-[clamp(1.05rem,2.8vw,1.4rem)] leading-[0.95] text-cyan-400";

  const displayClass =
    size === "modal"
      ? "font-display mt-1.5 block text-[clamp(1.15rem,3.2vw,1.65rem)] font-bold leading-[1.08] tracking-tight text-white uppercase"
      : "font-display mt-1 block text-lg font-bold leading-snug tracking-tight text-white sm:text-xl lg:mt-1.5 lg:text-2xl lg:leading-snug";

  if (!lead) {
    return (
      <Tag id={id} className={`${displayClass} ${className}`.trim()}>
        {rest}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={`leading-[0.95] ${className}`.trim()}>
      <span className={scriptClass}>{lead}</span>
      <span className={displayClass}>{rest}</span>
    </Tag>
  );
}
