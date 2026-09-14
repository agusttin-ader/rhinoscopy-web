import { en } from "@/data/locales/en";
import { es, type LocaleData } from "@/data/locales/es";
import { pt } from "@/data/locales/pt";
import type { AppLocale } from "@/i18n/routing";

const dictionaries: Record<AppLocale, LocaleData> = {
  es,
  en,
  pt,
};

export function getLocaleData(locale: string): LocaleData {
  if (locale in dictionaries) {
    return dictionaries[locale as AppLocale];
  }
  return dictionaries.es;
}

export type { LocaleData };
