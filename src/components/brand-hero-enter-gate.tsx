"use client";

import { type ReactNode, useLayoutEffect, useState } from "react";

type BrandHeroEnterGateProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

export function BrandHeroEnterGate({
  children,
  className = "",
  id,
  "aria-labelledby": ariaLabelledBy,
}: BrandHeroEnterGateProps) {
  const [play, setPlay] = useState(false);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPlay(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const playClass = play ? "brand-hero--enter-play" : "";

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`brand-hero brand-hero--animate-in ${playClass} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
