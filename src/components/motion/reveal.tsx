"use client";

import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const PREMIUM_MOTION_MQ = "(max-width: 1023px)";

function subscribePremiumMotion(onStoreChange: () => void) {
  const mq = window.matchMedia(PREMIUM_MOTION_MQ);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getPremiumMotionSnapshot() {
  return window.matchMedia(PREMIUM_MOTION_MQ).matches;
}

function getPremiumMotionServerSnapshot() {
  return false;
}

function usePremiumMotion() {
  return useSyncExternalStore(
    subscribePremiumMotion,
    getPremiumMotionSnapshot,
    getPremiumMotionServerSnapshot,
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retraso en ms antes de la transición */
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
  const premiumMotion = usePremiumMotion();

  const maxDelay = premiumMotion ? 520 : 320;
  const clampedDelay = Math.min(Math.max(delay, 0), maxDelay);
  const motionOffset = premiumMotion
    ? Math.round(offset * 1.2)
    : offset;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const reveal = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    };

    const show = () => {
      if (reducedMotion) {
        reveal();
        return;
      }
      const lead = premiumMotion ? 100 : 0;
      if (lead > 0) {
        window.setTimeout(reveal, lead);
      } else {
        reveal();
      }
    };

    if (reducedMotion) {
      show();
      return;
    }

    const rootMargin = premiumMotion
      ? "0px 0px 16% 0px"
      : "0px 0px -2% 0px";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      {
        threshold: premiumMotion ? [0, 0.04, 0.1] : [0, 0.06, 0.12],
        rootMargin,
      },
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight * 0.94 &&
      rect.bottom > window.innerHeight * 0.04;
    if (inView) {
      show();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, [premiumMotion]);

  const style = {
    "--motion-delay": `${clampedDelay}ms`,
    "--motion-offset": `${motionOffset}px`,
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
