/** Fondo decorativo compartido — usar en secciones navy (webinars, constancias, etc.). */
export function DarkSectionAtmosphere() {
  return (
    <>
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-cyan-400/[0.07] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/25 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />
    </>
  );
}

/** Variante más suave para bloques CTA sobre paper / secciones claras. */
export function LightSectionAccent() {
  return (
    <>
      <div
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-cyan-400/[0.12] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-fuchsia-500/[0.08] blur-3xl"
        aria-hidden="true"
      />
    </>
  );
}
