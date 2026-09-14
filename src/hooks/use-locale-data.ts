"use client";

import { getLocaleData, type LocaleData } from "@/data/locales";
import { useLocale } from "next-intl";

export function useLocaleData(): LocaleData {
  const locale = useLocale();
  return getLocaleData(locale);
}
