"use client";

import { useLocaleData } from "@/hooks/use-locale-data";
import { usePathname, useRouter } from "@/i18n/navigation";
import { runLocaleChange } from "@/lib/locale-transition-coord";
import { locales, type AppLocale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const localeCodes: Record<AppLocale, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
};

type IndicatorStyle = {
  width: number;
  transform: string;
};

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLocaleData();
  const groupRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Partial<Record<AppLocale, HTMLButtonElement>>>({});
  const [indicator, setIndicator] = useState<IndicatorStyle | null>(null);

  const measureIndicator = useCallback(() => {
    const group = groupRef.current;
    const activeBtn = buttonRefs.current[locale];
    if (!group || !activeBtn) return;

    const groupRect = group.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const left = btnRect.left - groupRect.left;

    setIndicator({
      width: btnRect.width,
      transform: `translateX(${left}px)`,
    });
  }, [locale]);

  useLayoutEffect(() => {
    measureIndicator();
  }, [measureIndicator, locale]);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => measureIndicator());
    observer.observe(group);
    return () => observer.disconnect();
  }, [measureIndicator]);

  function selectLocale(code: AppLocale) {
    if (code === locale) return;
    runLocaleChange(() => router.replace(pathname, { locale: code }));
  }

  const indicatorStyle: CSSProperties | undefined = indicator
    ? {
        width: indicator.width,
        transform: indicator.transform,
      }
    : undefined;

  return (
    <div
      ref={groupRef}
      className={`relative flex items-center ${className}`}
      role="group"
      aria-label={language.label}
    >
      {indicator ? (
        <span
          className="lang-switch-indicator pointer-events-none absolute bottom-0 left-0 h-px rounded-full bg-cyan-500/70"
          style={indicatorStyle}
          aria-hidden="true"
        />
      ) : null}

      {locales.map((code, index) => {
        const active = code === locale;
        return (
          <span key={code} className="inline-flex items-center">
            {index > 0 ? (
              <span
                className="mx-2.5 select-none text-[0.55rem] font-light text-navy/25"
                aria-hidden="true"
              >
                /
              </span>
            ) : null}
            <button
              ref={(el) => {
                buttonRefs.current[code] = el ?? undefined;
              }}
              type="button"
              onClick={() => selectLocale(code)}
              className={`relative inline-flex min-h-11 min-w-[2.25rem] items-center justify-center px-0.5 py-1.5 text-[0.68rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ease-out ${
                active ? "text-navy" : "text-navy/38 hover:text-navy/65"
              }`}
              aria-current={active ? "true" : undefined}
              title={language[code]}
            >
              {localeCodes[code]}
            </button>
          </span>
        );
      })}
    </div>
  );
}
