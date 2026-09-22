/** Parte inicial (cursiva) + resto (display), estilo galería / secciones Rhinoscopy. */
export function webinarTopicParts(topic: string): { lead: string; rest: string } {
  const trimmed = topic.trim();
  if (!trimmed) return { lead: "", rest: "" };

  const colon = trimmed.match(/^(.+?):\s+(.+)$/);
  if (colon) {
    return { lead: colon[1].trim(), rest: colon[2].trim() };
  }

  const dash = trimmed.match(/^(.+?)\s[-–—]\s+(.+)$/);
  if (dash) {
    return { lead: dash[1].trim(), rest: dash[2].trim() };
  }

  const words = trimmed.split(/\s+/);
  if (words.length < 5) {
    return { lead: "", rest: trimmed };
  }

  const leadWords = words.length >= 9 ? 3 : 2;
  return {
    lead: words.slice(0, leadWords).join(" "),
    rest: words.slice(leadWords).join(" "),
  };
}
