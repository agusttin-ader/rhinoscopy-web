"use client";

import { useLocaleData } from "@/hooks/use-locale-data";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type AppLocale } from "@/i18n/routing";
import { useLocale } from "next-intl";

const localeCodes: Record<AppLocale, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
};

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLocaleData();

  return (
    <div
      className={`flex items-center ${className}`}
      role="group"
      aria-label={language.label}
    >
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
              type="button"
              onClick={() => router.replace(pathname, { locale: code })}
              className={`group relative py-1.5 text-[0.68rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-200 ${
                active
                  ? "text-navy"
                  : "text-navy/38 hover:text-navy/65"
              }`}
              aria-current={active ? "true" : undefined}
              title={language[code]}
            >
              {localeCodes[code]}
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-cyan-500/75 transition-transform duration-300 ease-out ${
                  active
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
                aria-hidden="true"
              />
            </button>
          </span>
        );
      })}
    </div>
  );
}
