"use client";

import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const MAX_DELAY_MS = 320;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retraso en ms antes de la transición (máx. 320) */
  delay?: number;
  /** Desplazamiento vertical inicial en px */
  offset?: number;
  as?: ElementType;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style">;

export function Reveal({
  children,
  className = "",
  delay = 0,
  offset = 14,
  as: Tag = "div",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const clampedDelay = Math.min(Math.max(delay, 0), MAX_DELAY_MS);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const show = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      {
        threshold: [0, 0.06, 0.12],
        rootMargin: "0px 0px -2% 0px",
      },
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.04;
    if (inView) {
      show();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, []);

  const style = {
    "--motion-delay": `${clampedDelay}ms`,
    "--motion-offset": `${offset}px`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      className={`motion-reveal ${visible ? "motion-reveal--visible" : ""} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
